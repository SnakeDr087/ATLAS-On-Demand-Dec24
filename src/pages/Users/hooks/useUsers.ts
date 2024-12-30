import { useState, useEffect } from 'react';
import { type AuthUser } from '../../../types';

// Mock initial users
const initialUsers: AuthUser[] = [
  {
    id: '1',
    email: 'admin@atlas.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    lastLogin: new Date(),
    photoUrl: ''
  },
  {
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
    lastLogin: new Date(),
    photoUrl: ''
  }
];

export function useUsers() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setUsers(initialUsers);
    setIsLoading(false);
  }, []);

  const addUser = async (user: AuthUser) => {
    try {
      // In a real app, this would be an API call
      setUsers(prev => [...prev, { ...user, id: `user-${Date.now()}` }]);
      return true;
    } catch (error) {
      console.error('Failed to add user:', error);
      return false;
    }
  };

  const updateUser = async (updatedUser: AuthUser) => {
    try {
      // In a real app, this would be an API call
      setUsers(prev =>
        prev.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      return false;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        // In a real app, this would be an API call
        setUsers(prev => prev.filter(user => user.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete user:', error);
      return false;
    }
  };

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser
  };
}