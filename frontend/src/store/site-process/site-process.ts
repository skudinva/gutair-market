import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting, StoreSlice } from '../../const';
import type { SiteProcess } from '../../types/state';
import type { SortName } from '../../types/types';

const initialState: SiteProcess = {
  sorting: Sorting.Popular,
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortName>) => {
      state.sorting = action.payload;
    },
  },
});

export const { setSorting } = siteProcess.actions;
