import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Instructor Pages
import InstructorDashboard from '@/pages/instructor/Dashboard';
import CreateCourse from '@/pages/instructor/CreateCourse';
import ViewCourses from '@/pages/instructor/ViewCourses';

const InstructorRoutes = (
  <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
    <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
    <Route path="/instructor/create-course" element={<CreateCourse />} />
    <Route path="/instructor/view-courses" element={<ViewCourses />} />
  </Route>
);

export default InstructorRoutes;
