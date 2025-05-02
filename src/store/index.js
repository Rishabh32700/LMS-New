// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userStore';
import courseReducer from './courseStore';
import adminReducer from './adminStore';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
    admin: adminReducer,
  },
});

