import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { RegisterRequestDto } from './dto/register.request.dto';
import { User } from '../../models';

@Injectable()
export class AuthQueryBuilder {
  constructor(
    @Inject('USER_REPOSITORY') private readonly USER_REPOSITORY: typeof User,
  ) {}

  public async createUser(
    registerRequestDto: RegisterRequestDto,
    encPassword: string,
  ): Promise<User> {
    return await this.USER_REPOSITORY.create({
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      userName: registerRequestDto.userName,
      email: registerRequestDto.email,
      password: encPassword,
    });
  }

  public async findUserByEmailAndUsername(
    registerRequestDto: RegisterRequestDto,
  ): Promise<User> {
    const userData = await this.USER_REPOSITORY.findOne({
      where: {
        [Op.or]: [
          {
            email: registerRequestDto.email,
          },
          {
            userName: registerRequestDto.userName,
          },
        ],
      },
    });
    return userData ? userData : null;
  }

  public async findUser(email: string) {
    const userData = await this.USER_REPOSITORY.findOne({
      where: {
        [Op.or]: [
          {
            email: email.toLocaleLowerCase(),
          },
          {
            userName: { [Op.iLike]: email },
          },
        ],
      },
    });
    return userData ? userData : null;
  }
}
