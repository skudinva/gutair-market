import { FieldValidate } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag for the post',
    example: '#sometag',
  })
  @IsString()
  @Length(FieldValidate.MinTagLength, FieldValidate.MaxTagLength)
  public title!: string;
}
