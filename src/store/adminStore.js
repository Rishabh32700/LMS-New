// src/store/adminStore.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    reports: {
      userStats: null,
      courseStats: null,
      revenueStats: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchReportsSuccess: (state, action) => {
      state.reports = { ...state.reports, ...action.payload };
      state.loading = false;
    },
    adminActionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStatusSuccess: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchReportsSuccess,
  adminActionFailure,
  updateUserStatusSuccess,
} = adminSlice.actions;
export default adminSlice.reducer;