import store from '../store';

import { AuthorizationStatus } from '../const';
import type { Product, ProductWithPagination, SortByType, User } from './types';

export type SiteData = {
  products: ProductWithPagination;
  isProductsLoading: boolean;
  product: Product | null;
  isProductLoading: boolean;
};

export type SiteProcess = {
  sorting: SortByType;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: User['email'];
  name: User['name'];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
