import React from 'react';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

export function WelcomeHeader() {
  const { user } = useAuth();
  const today = new Date();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user?.firstName}
      </h1>
      <p className="text-gray-600 mt-2">
        {format(today, 'EEEE, MMMM do, yyyy')}
      </p>
    </div>
  );
}