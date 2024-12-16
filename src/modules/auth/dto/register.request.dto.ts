import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ title: 'First Name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ title: 'Last Name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ title: 'User Name' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ title: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ title: 'Password' })
  @IsNotEmpty()
  @Matches(
    /^(?=.{6,})(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.+[`~()',;_\[\]|\\/.<>?:"{}@#$%^&+*!=-]).*$/,
    { message: 'Weak Password' },
  )
  password: string;
}
