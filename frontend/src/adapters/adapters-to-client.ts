import { UserRdo } from '../dto/user/user-rdo';
import { User } from '../types/types';

export const adaptLoginToClient = (user: UserRdo): User => ({
  name: user.name,
  email: user.email,
});

export const adaptUserToClient = (user: UserRdo): User => ({
  name: user.name,
  email: user.email,
});
