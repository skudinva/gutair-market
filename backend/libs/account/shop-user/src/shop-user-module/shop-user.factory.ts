import { AuthUser, EntityFactory } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { ShopUserEntity } from './shop-user.entity';

@Injectable()
export class ShopUserFactory implements EntityFactory<ShopUserEntity> {
  create(entityPlainData: AuthUser): ShopUserEntity {
    return new ShopUserEntity(entityPlainData);
  }
}
