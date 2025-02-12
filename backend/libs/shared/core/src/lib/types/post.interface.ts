import { PostState, PostType } from '@prisma/client';

export interface Post {
  id?: string;
  postType: PostType;
  userId: string;
  isRepost: boolean;
  originUserId?: string | null;
  originPostId?: string | null;
  state: PostState;
  createdAt: Date;
  publicDate: Date;
}
