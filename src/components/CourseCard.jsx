// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course, role = 'guest' }) {
  return (
    <div className="card">
      <div className="relative">
        <img 
       loading="lazy"
          src={course.image || '/api/placeholder/400/200'} 
          alt={course.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        {course.price > 0 ? (
          <div className="absolute top-2 right-2 bg-white py-1 px-2 rounded font-bold text-primary">
            ${course.price.toFixed(2)}
          </div>
        ) : (
          <div className="absolute top-2 right-2 bg-success py-1 px-2 rounded font-bold text-white">
            Free
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description?.substring(0, 100)}...</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {course.lessons?.length || 0} lessons • {course.duration || '0h 0m'}
          </span>
          <span className="text-sm font-medium">
            {course.instructor?.name || 'Unknown Instructor'}
          </span>
        </div>
        
        {role === 'guest' && (
          <Link to={`/course/${course.id}`} className="btn btn-primary w-full text-center">
            View Details
          </Link>
        )}
        
        {role === 'student' && course.enrolled && (
          <Link to={`/student/course/${course.id}`} className="btn btn-secondary w-full text-center">
            Continue Learning
          </Link>
        )}
        
        {role === 'student' && !course.enrolled && (
          <Link to={`/course/${course.id}`} className="btn btn-primary w-full text-center">
            Enroll Now
          </Link>
        )}
        
        {role === 'instructor' && (
          <div className="flex gap-2">
            <Link to={`/instructor/course/${course.id}/edit`} className="btn btn-secondary flex-1 text-center">
              Edit
            </Link>
            <Link to={`/instructor/course/${course.id}/manage`} className="btn btn-primary flex-1 text-center">
              Manage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;