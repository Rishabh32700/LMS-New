import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading route components
const Home = lazy(() => import('@/pages/guest/Home'));
const Login = lazy(() => import('@/pages/guest/Login'));
const Register = lazy(() => import('@/pages/guest/Register'));
const ForgetPassword = lazy(() => import('@/pages/guest/ForgetPassword'));
const BrowseCourses = lazy(() => import('@/pages/guest/BrowseCourses'));
const CourseDetail = lazy(() => import('@/pages/guest/CourseDetail'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/browse-courses" element={<BrowseCourses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
