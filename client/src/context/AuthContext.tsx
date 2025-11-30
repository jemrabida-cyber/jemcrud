import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '../services/authService';

interface User {
  id: number;
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, email?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    if (token) {
      // Token exists, user is authenticated
      // In a real app, you might want to validate the token with the backend
      setUser({ id: 0, username: 'User' }); // Placeholder
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response: AuthResponse = await authService.login({ username, password });
      authService.setToken(response.accessToken);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (username: string, password: string, email?: string) => {
    try {
      const response: AuthResponse = await authService.signup({ username, password, email });
      authService.setToken(response.accessToken);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
