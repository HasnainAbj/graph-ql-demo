import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from '../../dispatchers/transform.interceptor';
import { SuccessResponse } from '../../interfaces/success.response';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/auth.guard';
import { JwtTokenInterface } from '../../interfaces/jwt.token.interface';
import { Caller } from '../../decorator/user.decorator';

@ApiTags('User')
@Controller('v1/user')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get all notifications for the user' })
  @ApiOkResponse({
    description: 'Notifications retrieved successfully',
  })
  protected async getUserProfile(
    @Caller() user: JwtTokenInterface,
  ): Promise<SuccessResponse<any>> {
    const data = await this.userService.getUserProfile(user);
    return { data };
  }
}
