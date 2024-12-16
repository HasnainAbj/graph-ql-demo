import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtHelper, SaltHelper } from '../../utils';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthQueryBuilder } from './auth.query.builder';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtTokenInterface } from '../../interfaces/jwt.token.interface';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerQueryModule: AuthQueryBuilder,
    private readonly saltHelper: SaltHelper,
    private readonly jwtHelper: JwtHelper,
  ) {}

  public async registerUser(
    registerRequestDto: RegisterRequestDto,
  ): Promise<any> {
    try {
      registerRequestDto.email = registerRequestDto?.email
        ? registerRequestDto?.email.toLowerCase()
        : null;
      registerRequestDto.userName = registerRequestDto?.userName
        ? registerRequestDto?.userName.replace(' ', '')
        : null;

      const user =
        await this.registerQueryModule.findUserByEmailAndUsername(
          registerRequestDto,
        );

      if (
        user &&
        registerRequestDto.email &&
        user.email === registerRequestDto.email
      ) {
        throw new ConflictException(
          'An account with this email already exists.',
        );
      } else if (
        user &&
        registerRequestDto.userName &&
        user.userName === registerRequestDto.userName
      ) {
        throw new ConflictException('Username already exists.');
      }

      // Encrypt the password
      const encryptedPassword = await this.saltHelper.generateSaltAndHash(
        registerRequestDto.password,
      );

      await this.registerQueryModule.createUser(
        registerRequestDto,
        encryptedPassword,
      );

      return await this.loginUser({
        email: registerRequestDto.email,
        password: registerRequestDto.password,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async loginUser(loginRequestDto: LoginRequestDto): Promise<any> {
    const existingUser = await this.registerQueryModule.findUser(
      loginRequestDto.email,
    );

    if (!existingUser) {
      throw new BadRequestException('Invalid email or User Name!');
    }

    if (existingUser.password) {
      const validPassword = this.saltHelper.compare(
        loginRequestDto.password,
        existingUser.password,
      );

      if (!validPassword) throw new BadRequestException('Incorrect password.');
    }
    const tokenDto: JwtTokenInterface = {
      id: existingUser.id,
      email: existingUser.email,
      userName: existingUser.userName,
    };

    const accessToken = this.jwtHelper.generateToken(tokenDto);

    return new LoginResponseDto(accessToken, existingUser);
  }
}
