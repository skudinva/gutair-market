import { UserType } from '../const';
import CreateOfferDto from '../dto/offer/create-offer-dto';
import CreateUserDto from '../dto/user/create-user-dto';
import { UserRdo } from '../dto/user/user-rdo';
import { NewOffer, User, UserRegister } from '../types/types';

const adaptUserTypeToServer = (userType: UserType): boolean => {
  switch (userType) {
    case UserType.Regular:
      return false;
    case UserType.Pro:
      return true;
    default:
      return false;
  }
};

export const adaptSignupToServer = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  isPro: adaptUserTypeToServer(user.type),
  email: user.email,
  password: user.password,
});

export const adaptUserToServer = (user: User): UserRdo => ({
  name: user.name,
  isPro: adaptUserTypeToServer(user.type),
  email: user.email,
  avatarUrl: user.avatarUrl,
});

export const adaptNewOfferToServer = (offer: NewOffer): CreateOfferDto => ({
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
  city: offer.city,
  createdDate: new Date(),
  rating: 0,
  userId: '',
});
