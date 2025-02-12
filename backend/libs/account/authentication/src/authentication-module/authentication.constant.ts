export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  Unauthorized: 'Need authorization',
  PasswordUpdated: 'The user password has been successfully updated.',
} as const;

export const AuthenticationValidateMessage = {
  NameNotValid: 'The name is not valid',
  EmailNotValid: 'The email is not valid',
  DateBirthNotValid: 'The user date birth is not valid',
  PasswordNotValid: 'The password is not valid',
} as const;
