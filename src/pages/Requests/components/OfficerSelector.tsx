import React from 'react';
import { Users } from 'lucide-react';
import { type Officer } from '../../../types';

interface OfficerSelectorProps {
  selectedOfficers: Officer[];
  onSelect: (officers: Officer[]) => void;
}

export function OfficerSelector({ selectedOfficers, onSelect }: OfficerSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Officers</h3>
      <div className="space-y-4">
        {selectedOfficers.map(officer => (
          <div key={officer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{officer.name}</p>
              <p className="text-sm text-gray-500">Badge: {officer.badge}</p>
            </div>
            <button
              onClick={() => onSelect(selectedOfficers.filter(o => o.id !== officer.id))}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => {/* Add officer selection logic */}}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Users className="w-4 h-4 mr-2" />
          Add Officer
        </button>
      </div>
    </div>
  );
}