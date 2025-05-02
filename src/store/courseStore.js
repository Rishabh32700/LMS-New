

// src/store/courseStore.js
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    availableCourses: [],
    enrolledCourses: [],
    instructorCourses: [],
    currentCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      state.availableCourses = action.payload;
      state.loading = false;
    },
    fetchEnrolledCoursesSuccess: (state, action) => {
      state.enrolledCourses = action.payload;
      state.loading = false;
    },
    fetchInstructorCoursesSuccess: (state, action) => {
      state.instructorCourses = action.payload;
      state.loading = false;
    },
    fetchCourseDetailsSuccess: (state, action) => {
      state.currentCourse = action.payload;
      state.loading = false;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCourseSuccess: (state, action) => {
      state.instructorCourses.push(action.payload);
    },
    updateCourseSuccess: (state, action) => {
      const index = state.instructorCourses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.instructorCourses[index] = action.payload;
      }
      if (state.currentCourse && state.currentCourse.id === action.payload.id) {
        state.currentCourse = action.payload;
      }
    },
    deleteCourseSuccess: (state, action) => {
      state.instructorCourses = state.instructorCourses.filter(course => course.id !== action.payload);
    },
  },
});

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchEnrolledCoursesSuccess,
  fetchInstructorCoursesSuccess,
  fetchCourseDetailsSuccess,
  fetchCoursesFailure,
  createCourseSuccess,
  updateCourseSuccess,
  deleteCourseSuccess,
} = courseSlice.actions;
export default courseSlice.reducer;