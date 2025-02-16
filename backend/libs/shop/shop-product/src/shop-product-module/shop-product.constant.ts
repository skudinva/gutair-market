import { SortDirection, SortType } from '@backend/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.DATE;
export const DEFAULT_PAGE_COUNT = 1;

export const ShopProductResponse = {
  ProductCreated: 'New product created',
  ProductUpdated: 'Product updated',
  Unauthorized: 'Need authorization',
  ProductsFound: 'Products found',
  ProductFound: 'Product found',
  ProductNotFound: 'Product not found',
  AccessDeny: 'AccessDeny',
  ProductDeleted: 'Product deleted',
};
