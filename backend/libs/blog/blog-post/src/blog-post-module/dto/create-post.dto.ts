import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@prisma/client';
import { IsIn, IsMongoId, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post type',
    example: 'Video',
    enum: PostType,
    enumName: 'PostType',
  })
  @IsIn(Object.values(PostType))
  postType!: PostType;

  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: 'Author id of the post',
    example: '677cd8d75ff92067f1de5911',
  })
  userId!: string;

  @IsIn(Object.values(PostState))
  @ApiProperty({
    description: 'Post state',
    example: 'Published',
    enum: PostState,
    enumName: 'PostState',
  })
  state!: PostState;
}
