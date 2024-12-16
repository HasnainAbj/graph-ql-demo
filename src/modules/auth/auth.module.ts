import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthQueryBuilder } from './auth.query.builder';
import { JwtHelper, SaltHelper } from '../../utils';
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthQueryBuilder, SaltHelper, JwtHelper],
})
export class AuthModule {}
