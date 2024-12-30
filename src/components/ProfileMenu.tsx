import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User as UserIcon, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { type AuthUser } from '../types';

interface ProfileMenuProps {
  user: AuthUser | null;
}

export function ProfileMenu({ user }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.firstName} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-full h-full p-1.5 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={() => {}} />
                </label>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="text-sm text-gray-500">{user.role === 'admin' ? 'Administrator' : 'Agency User'}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button 
              onClick={() => navigate('/dashboard/settings')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <Settings className="w-4 h-4 mr-3" />
              Account Settings
            </button>
            <button 
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}