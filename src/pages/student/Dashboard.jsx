// src/pages/Student/Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledCoursesSuccess, fetchCoursesFailure, fetchCoursesStart } from '../../store/courseStore';
import { getEnrolledCourses } from '../../services/courseService';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import CourseList from '../../components/CourseList';

function Dashboard() {
  const dispatch = useDispatch();
  const { enrolledCourses, loading, error } = useSelector((state) => state.courses);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        dispatch(fetchCoursesStart());
        const courses = await getEnrolledCourses();
        dispatch(fetchEnrolledCoursesSuccess(courses));
      } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
      }
    };

    fetchStudentCourses();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
          
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Welcome back, {currentUser?.name}!</h2>
              <p className="text-gray-600">Continue your learning journey.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Your Courses</h2>
            {loading ? (
              <p>Loading your courses...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <CourseList 
                courses={enrolledCourses} 
                role="student" 
                emptyMessage="You're not enrolled in any courses yet. Browse our catalog to get started."
              />
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Find New Courses</h3>
                <p className="text-gray-600 mb-4">Discover courses to expand your skills.</p>
                <a href="/student/browse-courses" className="text-primary">Browse Courses →</a>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">Update Your Profile</h3>
                <p className="text-gray-600 mb-4">Keep your information up to date.</p>
                <a href="/student/profile" className="text-primary">View Profile →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
