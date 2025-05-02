
// src/services/courseService.js
import api from './api';

export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch courses' };
  }
};

export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch course details' };
  }
};

export const getEnrolledCourses = async () => {
  try {
    const response = await api.get('/users/enrolled-courses');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch enrolled courses' };
  }
};

export const getInstructorCourses = async () => {
  try {
    const response = await api.get('/instructor/courses');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch instructor courses' };
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/instructor/courses', courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create course' };
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/instructor/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update course' };
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await api.delete(`/instructor/courses/${courseId}`);
    return { success: true };
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete course' };
  }
};

export const enrollInCourse = async (courseId) => {
  try {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to enroll in course' };
  }
};