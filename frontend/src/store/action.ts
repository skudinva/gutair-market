import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError, AxiosInstance } from 'axios';
import type { History } from 'history';
import {
  adaptProductDetailToClient,
  adaptProductsToClient,
} from '../adapters/adapters-to-client';
import {
  adaptNewOfferToServer,
  adaptSignupToServer,
} from '../adapters/adapters-to-server';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { OfferListRdo } from '../dto/offer/offer-list-rdo';
import { OfferRdo } from '../dto/offer/offer-rdo';
import { RegisteredUserRdo } from '../dto/user/registered-user-rdo';
import { UserRdo } from '../dto/user/user-rdo';
import type {
  NewProduct,
  Product,
  UserAuth,
  UserRegister,
} from '../types/types';
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
  Product[],
  undefined,
  { extra: Extra }
>(Action.FETCH_PRODUCTS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferListRdo[]>(ApiRoute.Shop);

  return adaptProductsToClient(data);
});

export const fetchProduct = createAsyncThunk<
  Product,
  Product['id'],
  { extra: Extra }
>(Action.FETCH_PRODUCT, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<OfferRdo>(`${ApiRoute.Shop}/${id}`);

    return adaptProductDetailToClient(data);
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
  NewProduct,
  { extra: Extra }
>(Action.POST_PRODUCT, async (newProduct, { extra }) => {
  const { api, history } = extra;
  const { data } = await api.post<OfferRdo>(
    ApiRoute.Shop,
    adaptNewOfferToServer(newProduct)
  );
  history.push(`${AppRoute.Products}/${data.id}`);

  return adaptProductDetailToClient(data);
});

export const editProduct = createAsyncThunk<Product, Product, { extra: Extra }>(
  Action.EDIT_PRODUCT,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<OfferRdo>(
      `${ApiRoute.Shop}/${offer.id}`,
      offer
    );
    history.push(`${AppRoute.Products}/${data.id}`);

    return adaptProductDetailToClient(data);
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
  UserAuth['email'],
  undefined,
  { extra: Extra }
>(Action.FETCH_USER_STATUS, async (_, { extra }) => {
  const { api } = extra;

  try {
    const { data } = await api.post<UserRdo>(ApiRoute.CheckLogin);

    return data.email;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
      Token.drop();
    }

    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  UserAuth['email'],
  UserAuth,
  { extra: Extra }
>(Action.LOGIN_USER, async ({ email, password }, { extra }) => {
  const { api, history } = extra;

  const { data } = await api.post<UserRdo & { accessToken: string }>(
    ApiRoute.Login,
    {
      email,
      password,
    }
  );
  const { accessToken } = data;

  Token.save(accessToken);
  history.push(AppRoute.Products);

  return email;
});

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
  const body = adaptSignupToServer({
    email,
    password,
    name,
  });
  await api.post<RegisteredUserRdo>(ApiRoute.Register, body);
  history.push(AppRoute.Login);
});
