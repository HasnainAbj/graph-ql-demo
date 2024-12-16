import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';

@Injectable()
export class UserQueryBuilder {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly USER_REPOSITORY: typeof User,
  ) {}

  public async getUserProfile(userId: string) {
    return await this.USER_REPOSITORY.findOne({
      where: {
        id: userId,
      },
    });
  }
}
