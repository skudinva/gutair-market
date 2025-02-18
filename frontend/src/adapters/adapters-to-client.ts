import { OfferListRdo } from '../dto/offer/offer-list-rdo';
import { OfferRdo } from '../dto/offer/offer-rdo';
import { UserRdo } from '../dto/user/user-rdo';
import { Product, User } from '../types/types';

export const adaptLoginToClient = (user: UserRdo): User => ({
  name: user.name,
  email: user.email,
});

export const adaptUserToClient = (user: UserRdo): User => ({
  name: user.name,
  email: user.email,
});

export const adaptProductDetailToClient = (product: OfferRdo): Product => ({
  id: product.id,
  price: product.price,
});

export const adaptProductToClient = (product: OfferListRdo): Product => ({
  id: product.id,
  price: product.price,
});

export const adaptProductsToClient = (products: OfferListRdo[]): Product[] =>
  products.map((product) => adaptProductToClient(product));
