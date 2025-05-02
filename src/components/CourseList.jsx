// src/components/CourseList.jsx
import React from 'react';
import CourseCard from './CourseCard';

function CourseList({ courses, role = 'guest', emptyMessage = 'No courses available' }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} role={role} />
      ))}
    </div>
  );
}

export default CourseList;