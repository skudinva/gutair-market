import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError, AxiosInstance } from 'axios';
import type { History } from 'history';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { ProductWithPaginationRdo } from '../dto/product/product-with-pagination.rdo';
import { ProductRdo } from '../dto/product/product.rdo';
import { RegisteredUserRdo } from '../dto/user/registered-user-rdo';
import { UserRdo } from '../dto/user/user-rdo';
import type { Product, UserAuth, UserRegister } from '../types/types';
import { Token } from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_PRODUCTS: 'products/fetch',
  FETCH_PRODUCT: 'product/fetch',
  POST_PRODUCT: 'product/post-product',
  EDIT_PRODUCT: 'product/edit-product',
  DELETE_PRODUCT: 'product/delete-product',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
};

export const fetchProducts = createAsyncThunk<
  ProductWithPaginationRdo,
  string,
  { extra: Extra }
>(Action.FETCH_PRODUCTS, async (searchParams: string, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<ProductWithPaginationRdo>(
    `${ApiRoute.Shop}?${searchParams}`
  );
  return data;
});

export const fetchProduct = createAsyncThunk<
  Product,
  Product['id'],
  { extra: Extra }
>(Action.FETCH_PRODUCT, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<ProductRdo>(`${ApiRoute.Shop}/${id}`);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const postProduct = createAsyncThunk<
  Product,
  FormData,
  { extra: Extra }
>(Action.POST_PRODUCT, async (newProduct, { extra }) => {
  const { api, history } = extra;
  const { data } = await api.post<ProductRdo>(ApiRoute.Shop, newProduct);
  history.push(`${AppRoute.Products}/${data.id}`);

  return data;
});

export const editProduct = createAsyncThunk<Product, Product, { extra: Extra }>(
  Action.EDIT_PRODUCT,
  async (product, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<ProductRdo>(
      `${ApiRoute.Shop}/${product.id}`,
      product
    );
    history.push(`${AppRoute.Products}/${data.id}`);
    return data;
  }
);

export const deleteProduct = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_PRODUCT,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Shop}/${id}`);
    history.push(AppRoute.Root);
  }
);

export const fetchUserStatus = createAsyncThunk<
  UserRdo,
  undefined,
  { extra: Extra }
>(Action.FETCH_USER_STATUS, async (_, { extra }) => {
  const { api } = extra;

  try {
    const { data } = await api.post<UserRdo>(ApiRoute.CheckLogin);
    const { email, name } = data;
    return { email, name };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
      Token.drop();
    }

    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<UserRdo, UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({ email, password }, { extra }) => {
    const { api, history } = extra;

    const { data } = await api.post<UserRdo & { accessToken: string }>(
      ApiRoute.Login,
      {
        email,
        password,
      }
    );
    const { accessToken, name } = data;

    Token.save(accessToken);
    history.push(AppRoute.Products);

    return { email, name };
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(ApiRoute.Logout);

    Token.drop();
  }
);

export const registerUser = createAsyncThunk<
  void,
  UserRegister,
  { extra: Extra }
>(Action.REGISTER_USER, async ({ email, password, name }, { extra }) => {
  const { api, history } = extra;

  await api.post<RegisteredUserRdo>(ApiRoute.Register, {
    email,
    password,
    name,
  });
  history.push(AppRoute.Login);
});
