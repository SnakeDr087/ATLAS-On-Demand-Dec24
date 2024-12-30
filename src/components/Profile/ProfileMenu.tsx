import React from 'react';
import { LogOut, Settings, User as UserIcon, Camera } from 'lucide-react';
import { type UserProfile } from '../../types';

interface ProfileMenuProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSignOut: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function ProfileMenu({ isOpen, profile, onClose, onSignOut, onUpdateProfile }: ProfileMenuProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-full h-full p-4 text-gray-400" />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
              <Camera className="w-6 h-6 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.role}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
          <Settings className="w-4 h-4 mr-3" />
          Account Settings
        </button>
        <button 
          onClick={onSignOut}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}