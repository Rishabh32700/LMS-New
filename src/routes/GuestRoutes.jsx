import React from 'react';
import { Route } from 'react-router-dom';
import Home from "@/pages/guest/Home"
import Login from "@/pages/guest/Login"
import Register from "@/pages/guest/Register"
import ForgetPassword from "@/pages/guest/ForgetPassword"
import BrowseCourses from "@/pages/guest/BrowseCourses"
import CourseDetail from "@/pages/guest/CourseDetail"
// Wrap components with Suspense
const GuestRoutes = (
  <>
    <Route path="/" element={
        <Home />
    } />
    <Route path="/login" element={
        <Login />
    } />
    <Route path="/register" element={
        <Register />
    } />
    <Route path="/forget-password" element={
        <ForgetPassword />
    } />
    <Route path="/browse-courses" element={
        <BrowseCourses />
    } />
    <Route path="/course/:id" element={
        <CourseDetail />
    } />
  </>
);

export default GuestRoutes;