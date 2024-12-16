import { JwtHelper } from '../../utils';
import { UserController } from './user.controller';
import { UserQueryBuilder } from './user.query.builder';
import { UserService } from './user.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserQueryBuilder, JwtHelper],
})
export class UserModule {}
