import React from 'react';
import { CSVImportModal } from '../Officers/CSVImport/CSVImportModal';

interface CSVImportStepProps {
  onImport: (file: File) => Promise<boolean>;
  onClose: () => void;
}

export function CSVImportStep({ onImport, onClose }: CSVImportStepProps) {
  return (
    <CSVImportModal
      onImport={onImport}
      onClose={onClose}
    />
  );
}