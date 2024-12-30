import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // Mock login for development
    const mockUsers: Record<string, AuthUser> = {
      'admin@atlas.com': {
        id: '1',
        email: 'admin@atlas.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        lastLogin: new Date()
      },
      'user@agency.com': {
        id: '2',
        email: 'user@agency.com',
        firstName: 'Agency',
        lastName: 'User',
        role: 'agency_user',
        agency: {
          id: '1',
          name: 'Central Police Department',
          code: 'CPD'
        },
        lastLogin: new Date()
      }
    };

    if (password !== '1234') {
      throw new Error('Invalid credentials');
    }

    const mockUser = mockUsers[email];
    if (!mockUser) {
      throw new Error('User not found');
    }

    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}