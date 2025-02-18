import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '../api';
import history from '../history';
import { fetchProducts, fetchUserStatus } from './action';
import { rootReducer } from './root-reducer';

const api = createAPI();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          history,
        },
      },
    }),
});

store.dispatch(fetchUserStatus());
store.dispatch(fetchProducts());

export default store;
