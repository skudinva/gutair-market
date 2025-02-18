import { Sorting, TYPES } from '../const';

export type Type = (typeof TYPES)[number];
export type SortName = keyof typeof Sorting;

export type User = {
  name: string;
  email: string;
};

export type Product = {
  id: string;
  price: number;
};

export type NewProduct = {
  title: string;
  description: string;
  previewImage: string;
  isPremium: boolean;
  type: Type;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  location: Location;
  images: string[];
};

export type UserAuth = Pick<User, 'email'> & { password: string };
export type UserRegister = Omit<User, ''> & Pick<UserAuth, 'password'>;
