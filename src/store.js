import { configureStore } from '@reduxjs/toolkit';
import providerApi  from "./api/providerApi.jsx"
import userApi  from "./api/userApi.jsx"
import serviceApi from "./api/serviceApi";
import orderApi from './api/orderApi.jsx';
import { setupListeners } from "@reduxjs/toolkit/query";
import authenticationApi from './api/authenticationApi.jsx';
import forgotPasswordApi from './api/forgotPasswordApi.jsx';
export const store = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [authenticationApi.reducerPath] : authenticationApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [forgotPasswordApi.reducerPath]:forgotPasswordApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(providerApi.middleware, userApi.middleware,
      authenticationApi.middleware,  serviceApi.middleware,orderApi.middleware , forgotPasswordApi.middleware),
});

//automatic refetching the data
setupListeners(store.dispatch);
export default store;