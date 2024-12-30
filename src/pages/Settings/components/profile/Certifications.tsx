import React from 'react';
import { Shield, Globe } from 'lucide-react';
import { type UserProfile } from '../../../../types/user';

interface CertificationsProps {
  certifications: string[];
  languages: string[];
  onChange: (updates: { certifications?: string[]; languages?: string[] }) => void;
}

export function Certifications({ certifications, languages, onChange }: CertificationsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Certifications & Training
        </h3>
        <div className="mt-4">
          <select
            multiple
            value={certifications}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              onChange({ certifications: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            size={5}
          >
            <option value="firearms">Firearms Certification</option>
            <option value="firstaid">First Aid/CPR</option>
            <option value="hazmat">Hazmat Handling</option>
            <option value="k9">K-9 Handler</option>
            <option value="swat">SWAT Training</option>
            <option value="crisis">Crisis Intervention</option>
            <option value="instructor">Certified Instructor</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-600" />
          Languages
        </h3>
        <div className="mt-4">
          <select
            multiple
            value={languages}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              onChange({ languages: values });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            size={4}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="mandarin">Mandarin</option>
            <option value="vietnamese">Vietnamese</option>
            <option value="arabic">Arabic</option>
            <option value="russian">Russian</option>
          </select>
        </div>
      </div>
    </div>
  );
}