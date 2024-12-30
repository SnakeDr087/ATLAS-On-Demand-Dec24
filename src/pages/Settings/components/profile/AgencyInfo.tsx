import React from 'react';
import { Building2, Calendar } from 'lucide-react';
import { type UserProfile } from '../../../../types/user';

interface AgencyInfoProps {
  profile: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
}

export function AgencyInfo({ profile, onChange }: AgencyInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Agency Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position/Title</label>
        <input
          type="text"
          value={profile.position}
          onChange={(e) => onChange({ position: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <div className="mt-1 flex items-center">
          <Building2 className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={profile.department}
            onChange={(e) => onChange({ department: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Badge Number</label>
        <input
          type="text"
          value={profile.badgeNumber}
          onChange={(e) => onChange({ badgeNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hire Date</label>
        <div className="mt-1 flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="date"
            value={profile.hireDate}
            onChange={(e) => onChange({ hireDate: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}