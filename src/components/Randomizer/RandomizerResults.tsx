import React from 'react';
import { type Officer } from '../../types/officer';

interface RandomizerResultsProps {
  officers: Officer[];
}

export function RandomizerResults({ officers }: RandomizerResultsProps) {
  if (officers.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Officers</h3>
      <div className="space-y-4">
        {officers.map((officer) => (
          <div
            key={officer.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{officer.name}</p>
              <p className="text-sm text-gray-500">Badge: {officer.badge}</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>{officer.division}</p>
              <p>{officer.shift} Shift</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}