// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct default import
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to handle login redirection
  const handleLoginRedirect = () => {
    const dovuchchaLoginUrl = 'https://accounts.dovuchcha.uz/login';
    const redirectUrl = `${window.location.origin}/`; // Redirect to home page after login

    const fullLoginUrl = `${dovuchchaLoginUrl}?redirection=${encodeURIComponent(redirectUrl)}`;
    console.log('Redirecting to:', fullLoginUrl); // Debugging line

    window.location.href = fullLoginUrl;
  };

  // Function to handle redirection after login
  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('refresh_token');

    if (token) {
      // Save refresh token to state and local storage
      setRefreshToken(token);
      localStorage.setItem('refresh_token', token);

      // Decode refresh token to get username and email
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setEmail(decoded.email);
      setIsAuthenticated(true);

      // Remove refresh_token from URL
      window.history.replaceState({}, document.title, '/');
    }
  };

  // Function to fetch access token using refresh token
  const fetchAccessToken = async (token) => {
    try {
      const response = await axios.post('https://behzod.pythonanywhere.com/api/token/refresh/', {
        refresh: token,
      });
      const newAccessToken = response.data.access;
      setAccessToken(newAccessToken);
      localStorage.setItem('access_token', newAccessToken);
    } catch (error) {
      console.error('Failed to fetch access token:', error);
      // Handle token refresh failure (e.g., logout user)
      handleLogout();
    }
  };

  // Function to renew access token every 4 minutes
  const setupTokenRenewal = (token) => {
    // Refresh every 4 minutes (240,000 milliseconds)
    setInterval(() => {
      fetchAccessToken(token);
    }, 240000);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear all authentication-related state
    setIsAuthenticated(false);
    setUsername('');
    setEmail('');
    setRefreshToken('');
    setAccessToken('');

    // Remove tokens from local storage
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');

    // Optionally, redirect to home page or login page
    // window.location.href = '/'; // Removed to stay on the current page
  };

  useEffect(() => {
    // Handle login redirection when the component mounts
    handleRedirect();

    // Check if refresh token exists in local storage
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);

      // Decode refresh token to get username and email
      const decoded = jwtDecode(storedRefreshToken);
      setUsername(decoded.username);
      setEmail(decoded.email);
      setIsAuthenticated(true);

      // Fetch access token
      fetchAccessToken(storedRefreshToken);

      // Set up token renewal
      setupTokenRenewal(storedRefreshToken);
    }

    setIsLoading(false); // Set loading to false after processing
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        email,
        accessToken,
        handleLoginRedirect,
        handleLogout,
        setIsAuthenticated,
        setUsername,
        setEmail,
        setAccessToken,
        isLoading, // Provide loading state
      }}
    >
      {!isLoading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};