import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import 'multer';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  public name: string;
}
