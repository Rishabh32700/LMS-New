// src/pages/Student/CourseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetailsSuccess, fetchCoursesFailure, fetchCoursesStart } from '../../store/courseStore';
import { getCourseById, enrollInCourse } from '../../services/courseService';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector((state) => state.courses);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        dispatch(fetchCoursesStart());
        const course = await getCourseById(courseId);
        dispatch(fetchCourseDetailsSuccess(course));
      } catch (error) {
        dispatch(fetchCoursesFailure(error.message));
      }
    };

    fetchCourseDetails();
  }, [courseId, dispatch]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollmentError('');
    
    try {
      await enrollInCourse(courseId);
      navigate('/student/dashboard', { state: { message: 'Successfully enrolled in course!' } });
    } catch (error) {
      setEnrollmentError(error.message || 'Failed to enroll in this course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-grow p-6">
            <p>Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-grow p-6">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-grow p-6">
            <p>Course not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img 
              loading='lazy'
                src={currentCourse.image || '/api/placeholder/800/300'} 
                alt={currentCourse.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">{currentCourse.title}</h1>
              </div>
            </div>
            
            <div className="p-6">
              {enrollmentError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {enrollmentError}
                </div>
              )}
              
              <div className="flex flex-wrap justify-between mb-6">
                <div>
                  <p className="text-gray-600 mb-2">Instructor: {currentCourse.instructor?.name}</p>
                  <p className="text-gray-600 mb-2">Duration: {currentCourse.duration}</p>
                  <p className="text-gray-600">Category: {currentCourse.category}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {currentCourse.price > 0 ? `$${currentCourse.price.toFixed(2)}` : 'Free'}
                  </p>
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">About This Course</h2>
                <p className="text-gray-600">{currentCourse.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">What You'll Learn</h2>
                <ul className="list-disc pl-5">
                  {currentCourse.learningObjectives?.map((objective, index) => (
                    <li key={index} className="text-gray-600 mb-1">{objective}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-2">Course Content</h2>
                <div className="border rounded">
                  {currentCourse.lessons?.map((lesson, index) => (
                    <div key={index} className="p-3 border-b last:border-b-0">
                      <p className="font-medium">{`${index + 1}. ${lesson.title}`}</p>
                      <p className="text-sm text-gray-500">{lesson.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;