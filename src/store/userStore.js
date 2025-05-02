
// src/store/userStore.js
import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../utils/auth';

const initialUser = getUser();

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialUser,
    isAuthenticated: !!initialUser,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;