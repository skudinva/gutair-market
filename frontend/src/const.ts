export const PRODUCT_TYPES = ['Electro', 'Acoustic', 'Ukulele'] as const;
export const PRODUCT_TYPES_NAMES = {
  [PRODUCT_TYPES[0]]: 'Электрогитара',
  [PRODUCT_TYPES[1]]: 'Акустическая гитара',
  [PRODUCT_TYPES[2]]: 'Укулеле',
};
export const PRODUCT_TYPES_WEB = ['el-guitar', 'guitar', 'ukulele'] as const;

export const CORDS_COUNT = [4, 6, 7, 12] as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Register = '/register',
  Products = '/products',
  Add = '/add',
  Edit = '/edit',
  NotFound = '/404',
}

export enum ApiRoute {
  Shop = '/api/shop',
  CheckLogin = '/api/users/check',
  Login = '/api/users/login',
  Logout = '/api/users/logout',
  Register = '/api/users/register',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Sorting {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum SubmitStatus {
  Still = 'STILL',
  Pending = 'PENDING',
  Fullfilled = 'FULLFILLED',
  Rejected = 'REJECTED',
}
