import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { parseCSV } from '../../utils/csvParser';
import { type Officer } from '../../types/officer';

interface CSVImportProps {
  onClose: () => void;
  onImport: (officers: Omit<Officer, 'id'>[]) => Promise<void>;
}

export function CSVImport({ onClose, onImport }: CSVImportProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      try {
        const officers = await parseCSV(file);
        await onImport(officers);
        onClose();
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
      }
    } else {
      setError('Please upload a CSV file.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Import Officers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          `}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop your CSV file here, or{' '}
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
              browse
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleDrop({ preventDefault: () => {}, dataTransfer: { files: [file] } } as any);
                  }
                }}
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            CSV file should include: name, badge, rank, division, shift
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">CSV Format Example:</h3>
          <pre className="bg-gray-50 p-3 rounded text-sm text-gray-600">
            name,badge,rank,division,shift{'\n'}
            John Smith,12345,Officer,Patrol,day{'\n'}
            Jane Doe,67890,Sergeant,Traffic,night
          </pre>
        </div>
      </div>
    </div>
  );
}