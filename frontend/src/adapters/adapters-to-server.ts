import CreateUserDto from '../dto/user/create-user-dto';
import { UserRdo } from '../dto/user/user-rdo';
import { User, UserRegister } from '../types/types';

export const adaptSignupToServer = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  email: user.email,
  password: user.password,
});

export const adaptUserToServer = (user: User): UserRdo => ({
  name: user.name,
  email: user.email,
});
