import React from 'react';
import { Shuffle } from 'lucide-react';
import { RandomSelectionForm, SelectedOfficers } from '../../components/RandomSelection';
import { useRandomSelection } from '../../hooks/useRandomSelection';
import { useAuth } from '../../contexts/AuthContext';

export function RandomSelectionPage() {
  const { user } = useAuth();
  const { selectedOfficers, generateSelection } = useRandomSelection(
    user?.agency?.officers || []
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-full">
          <Shuffle className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Random Officer Selection</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Selection Criteria
        </h2>
        <RandomSelectionForm onSubmit={generateSelection} />
      </div>

      <SelectedOfficers officers={selectedOfficers} />
    </div>
  );
}