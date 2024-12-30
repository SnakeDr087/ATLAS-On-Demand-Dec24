import React from 'react';
import { SelectionForm } from './SelectionForm';
import { SelectedOfficers } from './SelectedOfficers';
import { type Officer } from '../../types';

interface SelectionStepProps {
  officers: Officer[];
  selectedOfficers: Officer[];
  isLoading: boolean;
  onSubmit: (criteria: {
    count: number;
    excludeRecent: boolean;
    dateRange: { start: string; end: string };
  }) => void;
}

export function SelectionStep({
  officers,
  selectedOfficers,
  isLoading,
  onSubmit
}: SelectionStepProps) {
  return (
    <div className="space-y-6">
      <SelectionForm
        onSubmit={onSubmit}
        maxOfficers={officers.length}
        isLoading={isLoading}
      />
      {selectedOfficers.length > 0 && (
        <SelectedOfficers officers={selectedOfficers} />
      )}
    </div>
  );
}