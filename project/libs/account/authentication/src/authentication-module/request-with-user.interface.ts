import { BlogUserEntity } from '@backend/blog-user';

export interface RequestWithUser {
  user?: BlogUserEntity;
}
