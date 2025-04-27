import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { login, register, getCurrentUser } from '../services/authService';
import { setAuthToken, removeAuthToken } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user on initial mount or token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Validate token
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token expired
            logout();
            return;
          }
          
          setAuthToken(token);
          const userData = await getCurrentUser();
          setUser(userData.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error loading user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Login user
  const loginUser = async (userData) => {
    try {
      const response = await login(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    removeAuthToken();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        registerUser,
        loginUser,
        logout,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};