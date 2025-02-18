import { createSlice } from '@reduxjs/toolkit';

import { StoreSlice } from '../../const';
import type { SiteData } from '../../types/state';
import {
  editProduct,
  fetchProduct,
  fetchProducts,
  postProduct,
} from '../action';

const initialState: SiteData = {
  products: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
  isProductsLoading: false,
  product: null,
  isProductLoading: false,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isProductsLoading = false;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.products.entities.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.products.entities = state.products.entities.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      });
  },
});
