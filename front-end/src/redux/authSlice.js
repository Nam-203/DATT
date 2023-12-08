import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../util';
import jwt from 'jsonwebtoken';

const initialState = {
  user_token: auth.getUser() || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user_token = action.payload;
      auth.setUser(action.payload);
    },
    deleteUser: (state, action) => {
      state.user_token = null;
      auth.deleteUser();
    },
  },
});

export const getUserToken = (state) => state.auth.user_token;
export const getUserDecode = (state) =>
  state.auth.user_token !== null ? jwt.decode(state.auth.user_token) : null;

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
