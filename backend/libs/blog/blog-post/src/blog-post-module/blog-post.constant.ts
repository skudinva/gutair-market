import { SortDirection, SortType } from '@backend/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.DATE;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostResponse = {
  PostCreated: 'New post created',
  PostUpdated: 'Post updated',
  Unauthorized: 'Need authorization',
  PostsFound: 'Posts found',
  PostFound: 'Post found',
  PostNotFound: 'Post not found',
  AccessDeny: 'AccessDeny',
  PostDeleted: 'Post deleted',
};
