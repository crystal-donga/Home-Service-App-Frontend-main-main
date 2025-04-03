import { configureStore } from '@reduxjs/toolkit';
import providerApi  from "./api/providerApi.jsx"
import userApi  from "./api/userApi.jsx"
import serviceApi from "./api/serviceApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authenticationApi from './api/authenticationApi.jsx';
export const store = configureStore({
  reducer: {
    [providerApi.reducerPath]: providerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [authenticationApi.reducerPath] : authenticationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(providerApi.middleware, userApi.middleware,authenticationApi.middleware,  serviceApi.middleware ),
});

//automatic refetching the data
setupListeners(store.dispatch);
export default store;