export enum ProductTab {
  Characteristics = 'characteristics',
  Description = 'description',
}

export const DEFAULT_ACTIVE_PRODUCT_TAB = ProductTab.Characteristics;

export enum ProductType {
  Electric = 'electric',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele',
}

export const PRODUCT_TYPES_NAMES = {
  [ProductType.Acoustic]: 'Акустическая гитара',
  [ProductType.Electric]: 'Электрогитара',
  [ProductType.Ukulele]: 'Укулеле',
} as const;

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

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export const DEFAULT_SORT_DIRECTION = SortDirection.Asc;

export enum SortBy {
  Date = 'createdAt',
  Price = 'price',
}

export const DEFAULT_SORT_BY = SortBy.Date;

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
