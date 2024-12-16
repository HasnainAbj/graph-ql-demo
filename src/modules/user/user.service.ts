import { Injectable } from '@nestjs/common';
import { JwtTokenInterface } from '../../interfaces/jwt.token.interface';
import { UserQueryBuilder } from './user.query.builder';

@Injectable()
export class UserService {
  constructor(private readonly queryBuilder: UserQueryBuilder) {}

  public async getUserProfile(user: JwtTokenInterface) {
    return await this.queryBuilder.getUserProfile(user.id);
  }
}
