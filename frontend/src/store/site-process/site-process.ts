import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StoreSlice } from '../../const';
import type { SiteProcess } from '../../types/state';
import { SortByType } from '../../types/types';

const initialState: SiteProcess = {
  sorting: 'Date',
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortByType>) => {
      state.sorting = action.payload;
    },
  },
});

export const { setSorting } = siteProcess.actions;
