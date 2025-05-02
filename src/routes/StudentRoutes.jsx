import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Student Pages
import StudentDashboard from '@/pages/student/Dashboard';
// import EnrolledCourses from '@/pages/student/EnrolledCourses';
// import PurchaseCourse from '@/pages/student/PurchaseCourse'; // Later

const StudentRoutes = (
  <Route element={<ProtectedRoute allowedRoles={['student']} />}>
    <Route path="/student/dashboard" element={<StudentDashboard />} />
    {/* <Route path="/student/enrolled-courses" element={<EnrolledCourses />} /> */}
    {/* <Route path="/student/purchase-course/:id" element={<PurchaseCourse />} /> */}
  </Route>
);

export default StudentRoutes;
