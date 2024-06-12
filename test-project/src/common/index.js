import { configureStore } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
//import { userApi } from '../users/userApiSlice';

const staticReducers = {
    
  };
  
  const reducerManager = createReducerManager(staticReducers);
  
  const store = configureStore({
    reducer: reducerManager.reduce,
  });

  // export const store = configureStore({
  //   reducer: {
  //     [userApi.reducerPath]: userApi.reducer,
  //   },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(userApi.middleware),
  // })
  
  store.reducerManager = reducerManager;
  
  export const injectReducer = (key, asyncReducer) => {
    store.reducerManager.add(key, asyncReducer);
    store.replaceReducer(store.reducerManager.reduce);
  };
  
  export const removeReducer = (key) => {
    store.reducerManager.remove(key);
    store.replaceReducer(store.reducerManager.reduce);
  };
  
  export default store;