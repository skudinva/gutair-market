import store from '../store';

import { AuthorizationStatus } from '../const';
import type { Product, SortName, User } from './types';

export type SiteData = {
  products: Product[];
  isProductsLoading: boolean;
  product: Product | null;
  isProductLoading: boolean;
};

export type SiteProcess = {
  sorting: SortName;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User['email'];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
