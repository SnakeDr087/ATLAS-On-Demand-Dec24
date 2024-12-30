import React, { useState } from 'react';
import { X, Camera, Upload } from 'lucide-react';
import { type AuthUser } from '../../../types';
import { AgencySelect } from './AgencySelect';
import { UserPhotoUpload } from './UserPhotoUpload';
import { UserRoleSelect } from './UserRoleSelect';

interface UserFormProps {
  user?: AuthUser | null;
  onSubmit: (user: AuthUser) => void;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<AuthUser>>(
    user || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'agency_user',
      agency: undefined,
      photoUrl: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: AuthUser = {
      ...formData,
      id: user?.id || `user-${Date.now()}`,
      lastLogin: user?.lastLogin || new Date()
    } as AuthUser;

    onSubmit(newUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <UserPhotoUpload
            photoUrl={formData.photoUrl}
            onPhotoChange={(url) => setFormData({ ...formData, photoUrl: url })}
          />

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName || ''}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName || ''}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>

          {/* Role Selection */}
          <UserRoleSelect
            role={formData.role}
            onChange={(role) => setFormData({ ...formData, role })}
          />

          {/* Agency Selection (only for agency users) */}
          {formData.role === 'agency_user' && (
            <AgencySelect
              selectedAgency={formData.agency}
              onChange={(agency) => setFormData({ ...formData, agency })}
            />
          )}

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {user ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}