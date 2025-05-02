// src/utils/auth.js
// Store JWT token in localStorage
export const setToken = (token) => {
    localStorage.setItem('lmsToken', token);
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('lmsToken');
  };
  
  // Remove token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('lmsToken');
  };
  
  // Set user data in localStorage
  export const setUser = (user) => {
    localStorage.setItem('lmsUser', JSON.stringify(user));
  };
  
  // Get user data from localStorage
  export const getUser = () => {
    const user = localStorage.getItem('lmsUser');
    return user ? JSON.parse(user) : null;
  };
  
  // Remove user data from localStorage
  export const removeUser = () => {
    localStorage.removeItem('lmsUser');
  };
  
  // Check if user is authenticated
  export const isAuthenticated = () => {
    return getToken() !== null;
  };
  
  // Get user role
  export const getUserRole = () => {
    const user = getUser();
    return user ? user.role : null;
  };
  
  // Logout user
  export const logout = () => {
    removeToken();
    removeUser();
  };