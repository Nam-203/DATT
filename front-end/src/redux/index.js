import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
