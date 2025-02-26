import React, { createContext, useContext, useState } from 'react';

// Define the User type
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} currentUser
 * @property {function(User): void} login
 * @property {function(): void} logout
 * @property {function(User): void} updateProfile
 */

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * @typedef {Object} AuthProviderProps
 * @property {React.ReactNode} children
 */

export const AuthProvider = ({ children }) => {
  // Check if 'Users' exists in localStorage before attempting to parse it
  const initialUser = (() => {
    const storedUser = localStorage.getItem('Users');
    if (storedUser) {
      try {
        return JSON.parse(storedUser); // Only parse if storedUser is not null or undefined
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        return null;
      }
    }
    return null;
  })();

  const [currentUser, setCurrentUser] = useState(initialUser);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('Users', JSON.stringify(user)); // Save user to localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('Users'); // Remove user data from localStorage
  };

  const updateProfile = (updatedUser) => {
    setCurrentUser((prevUser) => {
      if (JSON.stringify(prevUser) === JSON.stringify(updatedUser)) {
        return prevUser; // Prevent unnecessary updates
      }
      localStorage.setItem("Users", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = {
    updateProfile,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

