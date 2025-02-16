export enum ApplicationServiceURL {
  Auth = 'http://localhost:3001/api/auth',
  Users = 'http://localhost:3001/api/user',
  Blog = 'http://localhost:3002/api/products',
  File = 'http://localhost:3003',
}

export enum ApiSection {
  Product = 'Product API',
  User = 'User API',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;
