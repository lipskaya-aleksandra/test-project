import { configureStore, Reducer } from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager.ts";
import { userApi } from "../../users/userApiSlice.ts";
import { postApi } from "../../posts/postApiSlice.ts";

const staticReducers = {};

const reducerManager = createReducerManager(staticReducers);

export const store = configureStore({
  reducerManager,
  reducer: reducerManager.reduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
  //.concat(postApi.middleware),
});

//store.reducerManager = reducerManager;

export const injectReducer = (key: string, asyncReducer: Reducer) => {
  store.reducerManager.add(key, asyncReducer);
  store.replaceReducer(store.reducerManager.reduce);
};

export const removeReducer = (key: string) => {
  store.reducerManager.remove(key);
  store.replaceReducer(store.reducerManager.reduce);
};

export default store;
