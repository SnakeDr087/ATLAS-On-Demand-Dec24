import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';
import { type UserProfile } from '../../types';

interface ProfileButtonProps {
  profile: UserProfile;
  onSignOut: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function ProfileButton({ profile, onSignOut, onUpdateProfile }: ProfileButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
          {profile.photoUrl ? (
            <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-full h-full p-1.5 text-gray-400" />
          )}
        </div>
      </button>

      <ProfileMenu
        isOpen={isMenuOpen}
        profile={profile}
        onClose={() => setIsMenuOpen(false)}
        onSignOut={onSignOut}
        onUpdateProfile={onUpdateProfile}
      />
    </div>
  );
}