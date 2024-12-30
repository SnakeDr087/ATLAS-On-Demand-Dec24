import React, { useState } from 'react';
import { Calendar, Users, X, Upload } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { type Officer } from '../../../types';
import { useRandomSelection } from '../../../hooks/useRandomSelection';

interface RandomizerPanelProps {
  onClose: () => void;
  onOfficersSelected: (officers: Officer[]) => void;
}

export function RandomizerPanel({ onClose, onOfficersSelected }: RandomizerPanelProps) {
  const [count, setCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [excludeRecent, setExcludeRecent] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  
  const { selectedOfficers, generateSelection, importOfficers } = useRandomSelection();

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      try {
        setUploadStatus('Importing...');
        await importOfficers(file);
        setUploadStatus('Import successful');
      } catch (error) {
        setUploadStatus('Import failed');
        console.error('Failed to import CSV:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateSelection({ count, dateRange, excludeRecent });
    onOfficersSelected(selectedOfficers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Random Officer Selection</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CSV Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Import Officers (CSV)
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
              />
            </label>
            {uploadStatus && (
              <span className={`text-sm ${
                uploadStatus.includes('successful') ? 'text-green-600' : 
                uploadStatus.includes('failed') ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {uploadStatus}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            CSV should include: name, badge, rank, division, shift
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Number of Officers"
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              icon={Users}
            />
            
            <div className="space-y-4">
              <Input
                label="Start Date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                icon={Calendar}
              />
              <Input
                label="End Date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                icon={Calendar}
              />
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={excludeRecent}
              onChange={(e) => setExcludeRecent(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Exclude recently reviewed officers (last 30 days)
            </span>
          </label>

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Generate Selection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}