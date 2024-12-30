import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileMenu } from './ProfileMenu';
import { NotificationBell } from './Notifications/NotificationBell';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 ml-64 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 left-0 z-10">
      {/* Left side - Title */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          {window.location.pathname.split('/').pop()?.charAt(0).toUpperCase() + 
           window.location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
        </h1>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <div className="h-8 w-px bg-gray-200" /> {/* Vertical divider */}
        <ProfileMenu user={user} />
      </div>
    </header>
  );
}