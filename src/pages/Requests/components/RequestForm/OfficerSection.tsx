import React from 'react';
import { OfficerSelect } from '../../../../components/Officers/OfficerSelect';
import { type Officer } from '../../../../types';

interface OfficerSectionProps {
  selectedOfficers: Officer[];
  onSelect: (officers: Officer[]) => void;
  error?: string;
}

export function OfficerSection({ selectedOfficers, onSelect, error }: OfficerSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Officers</h3>
      <OfficerSelect
        selectedOfficers={selectedOfficers}
        onOfficerSelect={onSelect}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}