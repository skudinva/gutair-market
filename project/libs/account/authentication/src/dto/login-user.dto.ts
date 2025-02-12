import { FieldValidate } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user2@notfound.local',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(FieldValidate.MinPasswordLength, FieldValidate.MaxPasswordLength, {
    message: AuthenticationValidateMessage.PasswordNotValid,
  })
  public password: string;
}
