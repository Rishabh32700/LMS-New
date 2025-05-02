import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageUsers from '@/pages/admin/ManageUsers';
import Reports from '@/pages/admin/Reports';

const AdminRoutes = (
  <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/manage-users" element={<ManageUsers />} />
    <Route path="/admin/reports" element={<Reports />} />
  </Route>
);

export default AdminRoutes;
