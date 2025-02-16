import { SortDirection, SortType } from '@backend/shared/core';

export const DEFAULT_PRODUCT_COUNT_LIMIT = 7;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.DATE;
export const DEFAULT_PAGE_COUNT = 1;

export const ProductResponse = {
  ProductCreated: 'New product created',
  ProductUpdated: 'Product updated',
  Unauthorized: 'Need authorization',
  ProductsFound: 'Products found',
  ProductFound: 'Product found',
  ProductNotFound: 'Product not found',
  AccessDeny: 'AccessDeny',
  ProductDeleted: 'Product deleted',
};
