// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

function Sidebar() {
  const userRole = getUserRole();

  // Define menu items based on user role
  const getMenuItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { path: '/student/dashboard', label: 'Dashboard' },
          { path: '/student/browse-courses', label: 'Browse Courses' },
          { path: '/student/my-courses', label: 'My Courses' },
          { path: '/student/profile', label: 'Profile' },
        ];
      case 'instructor':
        return [
          { path: '/instructor/dashboard', label: 'Dashboard' },
          { path: '/instructor/create-course', label: 'Create Course' },
          { path: '/instructor/view-courses', label: 'My Courses' },
          { path: '/instructor/profile', label: 'Profile' },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard' },
          { path: '/admin/manage-users', label: 'Manage Users' },
          { path: '/admin/manage-courses', label: 'Manage Courses' },
          { path: '/admin/reports', label: 'Reports' },
        ];
      default:
        return [{ path: '/', label: 'Home' }];

    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar bg-white p-4 shadow-md h-screen">
      <div className="sidebar-header mb-6">
        <h3 className="text-xl font-bold">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Panel</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "block p-2 bg-primary text-white rounded" : "block p-2 hover:bg-gray-100 rounded"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;