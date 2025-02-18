import { CORDS_COUNT, PRODUCT_TYPES, Sorting } from '../const';

export type ProductType = (typeof PRODUCT_TYPES)[number];
export type CordsCountType = (typeof CORDS_COUNT)[number];
export type SortName = keyof typeof Sorting;

export type User = {
  name: string;
  email: string;
};

export type Product = {
  id: string;
  name: string;
  describe: string;
  createdAt: Date;
  photoPath: string;
  productType: ProductType;
  article: string;
  cordsCount: CordsCountType;
  price: number;
};

export type ProductWithPagination = {
  entities: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

export type NewProduct = Omit<Product, 'id'>;

export type UserAuth = Pick<User, 'email'> & { password: string };
export type UserRegister = Omit<User, ''> & Pick<UserAuth, 'password'>;
