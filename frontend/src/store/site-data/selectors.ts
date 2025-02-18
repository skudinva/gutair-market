import { StoreSlice } from '../../const';
import type { State } from '../../types/state';
import type { Product, ProductWithPagination } from '../../types/types';

export const getIsProductsLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State): boolean => SITE_DATA.isProductsLoading;

export const getProducts = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State): ProductWithPagination => SITE_DATA.products;

export const getIsProductLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State): boolean => SITE_DATA.isProductLoading;

export const getProduct = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State): Product | null => SITE_DATA.product;
