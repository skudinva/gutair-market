import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@prisma/client';
import { IsIn, IsISO8601, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsIn(Object.values(PostType))
  @IsOptional()
  @ApiProperty({
    description: 'Post type',
    example: 'Video',
    enum: PostType,
    enumName: 'PostType',
  })
  postType?: PostType;

  userId?: string;

  @IsIn(Object.values(PostState))
  @IsOptional()
  @ApiProperty({
    description: 'Post state',
    example: 'Published',
    enum: PostState,
    enumName: 'PostState',
  })
  state?: PostState;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ description: 'Date of publication' })
  publicDate?: Date;
}
