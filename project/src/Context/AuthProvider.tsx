import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  email: string;
  name: string;
  // Add any other properties based on the structure of the user object
}

interface AuthContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Check if 'Users' exists in localStorage before attempting to parse it
  const initialUser: User | null = (() => {
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

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const login = (user: User): void => {
    setCurrentUser(user);
    localStorage.setItem('Users', JSON.stringify(user)); // Save user to localStorage
  };

  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem('Users'); // Remove user data from localStorage
  };

  const updateProfile = (updatedUser: User): void => {
    setCurrentUser(updatedUser);
    localStorage.setItem('Users', JSON.stringify(updatedUser));
  };

  const value = {
    updateProfile,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
