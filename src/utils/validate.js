// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password validation (at least 8 characters, containing numbers and letters)
  export const validatePassword = (password) => {
    return password.length >= 8 && 
           /[A-Za-z]/.test(password) && 
           /[0-9]/.test(password);
  };
  
  // Form validation
  export const validateForm = (formData, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = formData[field];
      const fieldRules = rules[field];
      
      // Required field check
      if (fieldRules.required && (!value || value.trim() === '')) {
        errors[field] = `${fieldRules.name || field} is required`;
        return;
      }
      
      // Minimum length check
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[field] = `${fieldRules.name || field} must be at least ${fieldRules.minLength} characters`;
        return;
      }
      
      // Email format check
      if (fieldRules.isEmail && !validateEmail(value)) {
        errors[field] = 'Please enter a valid email address';
        return;
      }
      
      // Password strength check
      if (fieldRules.isPassword && !validatePassword(value)) {
        errors[field] = 'Password must be at least 8 characters and contain both letters and numbers';
        return;
      }
      
      // Password match check
      if (fieldRules.matches && value !== formData[fieldRules.matches]) {
        errors[field] = 'Passwords do not match';
        return;
      }
    });
    
    return errors;
  };