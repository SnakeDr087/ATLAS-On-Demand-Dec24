import React, { useState } from 'react';
import { RandomizerForm } from './RandomizerForm';
import { RandomizerResults } from './RandomizerResults';
import { selectOfficersForReview } from '../../services/officerService';
import { type Officer } from '../../types/officer';

export function RandomizerContainer() {
  const [selectedOfficers, setSelectedOfficers] = useState<Officer[]>([]);

  const handleSelection = async (criteria: Parameters<typeof selectOfficersForReview>[0]) => {
    try {
      const officers = await selectOfficersForReview(criteria);
      setSelectedOfficers(officers);
    } catch (error) {
      console.error('Failed to select officers:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Random Officer Selection</h2>
        <RandomizerForm onSubmit={handleSelection} />
      </div>

      <RandomizerResults officers={selectedOfficers} />
    </div>
  );
}