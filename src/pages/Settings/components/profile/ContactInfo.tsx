import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { type UserProfile } from '../../../../types/user';

interface ContactInfoProps {
  profile: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

export function ContactInfo({ profile, onChange }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          value={profile?.firstName || ''}
          onChange={(e) => onChange({ firstName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          value={profile?.lastName || ''}
          onChange={(e) => onChange({ lastName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 flex items-center">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            value={profile?.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Office Phone</label>
        <div className="mt-1 flex items-center">
          <Phone className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="tel"
            value={profile?.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
        <div className="mt-1 flex items-center">
          <Phone className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="tel"
            value={profile?.mobile || ''}
            onChange={(e) => onChange({ mobile: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}