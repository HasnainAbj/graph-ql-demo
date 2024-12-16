import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/models';

export class LoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  constructor(token: string, userData: User) {
    this.id = userData.id;
    this.userName = userData.userName;
    this.email = userData.email;
    this.token = token;
  }
}
