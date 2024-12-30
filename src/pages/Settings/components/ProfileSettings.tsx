import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../hooks/useProfile';
import { ProfilePhoto } from './profile/ProfilePhoto';
import { ContactInfo } from './profile/ContactInfo';
import { AgencyInfo } from './profile/AgencyInfo';
import { Certifications } from './profile/Certifications';
import { EmergencyContact } from './profile/EmergencyContact';
import { NotificationPreferences } from './profile/NotificationPreferences';

export function ProfileSettings() {
  const { profile, isLoading, error, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const success = await updateProfile(profile!);
      if (success) {
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6">
      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfilePhoto
            photoUrl={profile?.photoUrl}
            onPhotoChange={(url) => updateProfile({ photoUrl: url })}
          />
          
          <ContactInfo
            profile={profile!}
            onChange={(updates) => updateProfile(updates)}
          />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <AgencyInfo
            profile={profile!}
            onChange={(updates) => updateProfile(updates)}
          />
          
          <Certifications
            certifications={profile?.certifications || []}
            languages={profile?.languages || []}
            onChange={(updates) => updateProfile(updates)}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <EmergencyContact
            contact={profile?.emergencyContact!}
            onChange={(contact) => updateProfile({ emergencyContact: contact })}
          />
          
          <NotificationPreferences
            preferences={profile?.preferences!}
            onChange={(preferences) => updateProfile({ preferences })}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}