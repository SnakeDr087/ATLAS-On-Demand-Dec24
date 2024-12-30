import React, { useState } from 'react';
import { Upload, AlertCircle, X } from 'lucide-react';
import { Button } from '../common/Button';
import { type Officer } from '../../types';

interface RosterUploadProps {
  onUpload: (officers: Officer[]) => void;
  onClose: () => void;
}

export function RosterUpload({ onUpload, onClose }: RosterUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = async (file: File): Promise<Officer[]> => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].toLowerCase().split(',');

    // Validate required columns
    const requiredColumns = ['name', 'badge', 'rank', 'agency', 'hire_date'];
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));

    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        return {
          id: `officer-${Date.now()}-${Math.random()}`,
          name: values[headers.indexOf('name')].trim(),
          badge: values[headers.indexOf('badge')].trim(),
          rank: values[headers.indexOf('rank')].trim(),
          agency: values[headers.indexOf('agency')].trim(),
          hireDate: values[headers.indexOf('hire_date')].trim(),
          lastReviewed: null
        };
      });
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      try {
        const officers = await parseCSV(file);
        onUpload(officers);
      } catch (err) {
        setError((err as Error).message);
      }
    } else {
      setError('Please upload a CSV file');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Officer Roster</h2>
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
            Drag and drop your roster CSV file here, or{' '}
            <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
              browse
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const officers = await parseCSV(file);
                      onUpload(officers);
                    } catch (err) {
                      setError((err as Error).message);
                    }
                  }
                }}
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">
            CSV file should include: name, badge, rank, agency, hire_date
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">CSV Format Example:</h3>
          <pre className="bg-gray-50 p-3 rounded text-sm text-gray-600 overflow-x-auto">
            name,badge,rank,agency,hire_date{'\n'}
            John Smith,12345,Officer,Central PD,2020-01-15{'\n'}
            Jane Doe,67890,Sergeant,Central PD,2018-03-22
          </pre>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}