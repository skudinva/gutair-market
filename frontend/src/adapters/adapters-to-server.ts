import CreateOfferDto from '../dto/offer/create-offer-dto';
import CreateUserDto from '../dto/user/create-user-dto';
import { UserRdo } from '../dto/user/user-rdo';
import { NewProduct, User, UserRegister } from '../types/types';

export const adaptSignupToServer = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  email: user.email,
  password: user.password,
});

export const adaptUserToServer = (user: User): UserRdo => ({
  name: user.name,
  email: user.email,
});

export const adaptNewOfferToServer = (offer: NewProduct): CreateOfferDto => ({
  price: offer.price,
  title: offer.title,
  isPremium: offer.isPremium,
  previewImage: offer.previewImage,
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  images: offer.images,
  maxAdults: offer.maxAdults,
  type: offer.type,
  location: offer.location,
  createdDate: new Date(),
  rating: 0,
  userId: '',
});
