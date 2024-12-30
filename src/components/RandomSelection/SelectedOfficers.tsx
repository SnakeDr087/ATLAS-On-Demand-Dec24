import React from 'react';
import { UserCheck } from 'lucide-react';
import { type Officer } from '../../types';

interface SelectedOfficersProps {
  officers: Officer[];
}

export function SelectedOfficers({ officers }: SelectedOfficersProps) {
  if (officers.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Officers</h3>
      <div className="space-y-4">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{officer.name}</p>
                <p className="text-sm text-gray-500">Badge: {officer.badge}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {officer.division} • {officer.shift} Shift
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}