import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

type InitialState = {
  userInfo: {
    _id: string;
    name: string;
    email: string;
  } | null;
};

const initialState: InitialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default slice.reducer;
