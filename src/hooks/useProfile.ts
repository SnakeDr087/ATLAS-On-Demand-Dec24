import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveProfile, getProfile } from '../services/profile/profileService';
import { type UserProfile } from '../types/user';

const initialProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  mobile: '',
  position: '',
  department: '',
  badgeNumber: '',
  hireDate: '',
  photoUrl: '',
  agency: {
    id: '',
    name: '',
    code: ''
  },
  certifications: [],
  languages: [],
  emergencyContact: {
    name: '',
    relationship: '',
    phone: ''
  },
  preferences: {
    notifications: {
      email: true,
      mobile: true,
      desktop: true
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const savedProfile = await getProfile(user!.id);
      if (savedProfile) {
        setProfile(savedProfile);
      } else {
        // Initialize with user data from auth context
        setProfile({
          ...initialProfile,
          firstName: user!.firstName || '',
          lastName: user!.lastName || '',
          email: user!.email || '',
          agency: user!.agency || initialProfile.agency
        });
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      const updatedProfile = { ...profile, ...updates };
      await saveProfile(user!.id, updatedProfile);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile
  };
}