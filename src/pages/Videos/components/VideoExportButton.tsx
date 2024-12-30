import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';

export function VideoExportButton() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export logic
    console.log(`Exporting as ${format}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            <button
              onClick={() => handleExport('csv')}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Export as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}