import { ShopUserEntity } from '@backend/shop-user';

export interface RequestWithUser {
  user?: ShopUserEntity;
}
