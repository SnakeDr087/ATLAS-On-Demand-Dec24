import React from 'react';
import { UserPlus, Phone } from 'lucide-react';

interface EmergencyContactInfo {
  name: string;
  relationship: string;
  phone: string;
}

interface EmergencyContactProps {
  contact: EmergencyContactInfo;
  onChange: (contact: EmergencyContactInfo) => void;
}

export function EmergencyContact({ contact, onChange }: EmergencyContactProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
        Emergency Contact
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Name</label>
        <input
          type="text"
          value={contact.name}
          onChange={(e) => onChange({ ...contact, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Relationship</label>
        <input
          type="text"
          value={contact.relationship}
          onChange={(e) => onChange({ ...contact, relationship: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="mt-1 flex items-center">
          <Phone className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => onChange({ ...contact, phone: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}