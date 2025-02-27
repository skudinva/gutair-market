import { FieldValidate } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @Length(FieldValidate.MinUserNameLength, FieldValidate.MaxUserNameLength, {
    message: AuthenticationValidateMessage.NameNotValid,
  })
  public name: string;
}
