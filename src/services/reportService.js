
// src/services/reportService.js
import api from './api';

export const getUsersReport = async () => {
  try {
    const response = await api.get('/admin/reports/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users report' };
  }
};

export const getCoursesReport = async () => {
  try {
    const response = await api.get('/admin/reports/courses');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch courses report' };
  }
};

export const getRevenueReport = async () => {
  try {
    const response = await api.get('/admin/reports/revenue');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch revenue report' };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user status' };
  }
};