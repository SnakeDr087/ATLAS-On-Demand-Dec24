import React from 'react';
import { type UserRole } from '../../../types';

interface UserRoleSelectProps {
  role?: UserRole;
  onChange: (role: UserRole) => void;
}

export function UserRoleSelect({ role = 'agency_user', onChange }: UserRoleSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Role *
      </label>
      <select
        value={role}
        onChange={(e) => onChange(e.target.value as UserRole)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="admin">Administrator</option>
        <option value="agency_user">Agency User</option>
      </select>
      <p className="mt-1 text-sm text-gray-500">
        {role === 'admin' 
          ? 'Full system access and management capabilities'
          : 'Limited to agency-specific functions and data'}
      </p>
    </div>
  );
}