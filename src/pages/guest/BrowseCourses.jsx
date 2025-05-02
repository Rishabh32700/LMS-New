
// src/pages/Student/BrowseCourses.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../../store/courseStore';
import { getAllCourses } from '../../services/courseService';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import CourseList from '../../components/CourseList';

function BrowseCourses() {
  const dispatch = useDispatch();
  const { availableCourses, loading, error } = useSelector((state) => state.courses);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Mock categories - replace with actual categories from your API
  const categories = [
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Design' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Marketing' },
    { id: 5, name: 'Personal Development' },
  ];
  
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        dispatch(fetchCoursesStart());
        const courses = await getAllCourses();
        dispatch(fetchCoursesSuccess(courses));
      } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
      }
    };

    fetchAllCourses();
  }, [dispatch]);
  
  // Filter courses based on search term and category
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow p-6">
          <h1 className="text-2xl font-bold mb-6">Browse Courses</h1>
          
          <div className="bg-white p-4 rounded shadow mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select 
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <p>Loading courses...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p className="mb-4">{filteredCourses.length} courses found</p>
              <CourseList 
                courses={filteredCourses} 
                role="student" 
                emptyMessage="No courses match your search criteria."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseCourses;