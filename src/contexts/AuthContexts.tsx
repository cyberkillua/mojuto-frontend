// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = sessionStorage.getItem('accessToken');
    const savedUser = sessionStorage.getItem('userData');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, accessToken: string, rememberMe = false) => {
    setUser(userData);
    setToken(accessToken);
    
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('userData', JSON.stringify(userData));
    
    if (rememberMe) {
      localStorage.setItem('rememberUser', JSON.stringify({
        email: userData.email,
        rememberMe: true
      }));
    }
    
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    localStorage.removeItem('rememberUser');
    
    navigate('/login');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
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