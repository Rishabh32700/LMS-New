
// src/pages/Guest/ForgetPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/userService';
import Navbar from '../../components/Navbar';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await forgotPassword(email);
      setMessage('Password reset instructions have been sent to your email.');
      setEmail('');
    } catch (error) {
      setError(error.message || 'Failed to request password reset. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="container py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <p className="mb-4 text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full mt-4" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/login" className="text-primary">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;