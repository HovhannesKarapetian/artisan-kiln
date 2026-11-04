import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cart from './cartSlice';
import grid from './gridSlice';
import checkout from './checkoutSlice';

export const rootReducer = combineReducers({ cart, grid, checkout });

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
