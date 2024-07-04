import {
  Action,
  AnyAction,
  combineReducers,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit";
import { ReducerState } from "react";

export function createReducerManager<S extends {}>(
  initialReducers: ReducersMapObject<S>
) {
  const reducers = { ...initialReducers } as ReducersMapObject<S>;
  let combinedReducer = combineReducers(reducers);
  let keysToRemove: string[] = [];

  return {
    getReducerMap: () => reducers,
    reduce: (state: S, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key as keyof S];
        }
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: <ReducerState>(key: string, reducer: Reducer<ReducerState>) => {
      if (!key || reducers[key as keyof S]) {
        return;
      }
      reducers[key as keyof S] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: string) => {
      if (!key || !reducers[key as keyof S]) {
        return;
      }
      delete reducers[key as keyof S];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
