import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from '../../dispatchers/transform.interceptor';
import { SuccessResponse } from '../../interfaces/success.response';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';

@ApiTags('Auth')
@Controller('v1/auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register New User' })
  @ApiOkResponse({
    description: 'User registered successfully',
  })
  protected async registerUser(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<SuccessResponse<any>> {
    const data = await this.authService.registerUser(registerRequestDto);
    return { data };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to Existing Account' })
  @ApiResponse({
    description: 'User/Admin logged in successfully',
    type: LoginResponseDto,
  })
  protected async loginUser(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<SuccessResponse<LoginResponseDto>> {
    const data = await this.authService.loginUser(loginRequestDto);
    return { data };
  }
}
