import React, { useState } from 'react';
import { useRandomSelection } from '../../hooks/useRandomSelection';
import { CSVImportStep } from './CSVImportStep';
import { SelectionStep } from './SelectionStep';

interface RandomizerPanelProps {
  onClose: () => void;
}

export function RandomizerPanel({ onClose }: RandomizerPanelProps) {
  const [showImport, setShowImport] = useState(true);
  const { officers, selectedOfficers, isLoading, importOfficers, generateSelection } = useRandomSelection();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        {showImport ? (
          <CSVImportStep
            onImport={async (file) => {
              const success = await importOfficers(file);
              if (success) setShowImport(false);
            }}
            onClose={onClose}
          />
        ) : (
          <SelectionStep
            officers={officers}
            selectedOfficers={selectedOfficers}
            isLoading={isLoading}
            onSubmit={generateSelection}
          />
        )}
      </div>
    </div>
  );
}