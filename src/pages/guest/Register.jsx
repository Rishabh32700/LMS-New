// src/pages/Guest/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/userService';
import { loginSuccess } from '../../store/userStore';
import { setToken, setUser } from '../../utils/auth';
import { TextField, Button, FormControl, FormControlLabel, Radio, RadioGroup, CircularProgress, Typography, Box } from '@mui/material';
import Navbar from '../../components/Navbar';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Remove confirmPassword from the data sent to API
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      
      // If registration includes auto-login
      if (response.token) {
        setToken(response.token);
        setUser(response.user);
        dispatch(loginSuccess(response.user));
        
        // Redirect based on role
        if (response.user.role === 'student') {
          navigate('/student/dashboard');
        } else if (response.user.role === 'instructor') {
          navigate('/instructor/dashboard');
        } else if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        // Registration successful, redirect to login
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      }
    } catch (error) {
      setErrors({ form: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create an Account
        </Typography>

        {errors.form && (
          <Box sx={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb', color: '#721c24', padding: 2, borderRadius: 1, marginBottom: 2 }}>
            {errors.form}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            sx={{ marginBottom: 2 }}
          />

          <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
            <Typography variant="body1">I want to register as:</Typography>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="instructor"
                control={<Radio />}
                label="Instructor"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            sx={{ marginBottom: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </div>
  );
}

export default Register;
