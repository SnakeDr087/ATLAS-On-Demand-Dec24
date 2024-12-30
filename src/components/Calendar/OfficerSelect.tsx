import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { type Officer } from '../../types';

interface OfficerSelectProps {
  selectedOfficers: Officer[];
  onOfficerSelect: (officers: Officer[]) => void;
}

// Mock data - In a real app, this would come from your API
const mockOfficers: Officer[] = [
  {
    id: '1',
    name: 'John Smith',
    badge: 'B123',
    agency: 'Central PD',
    email: 'john.smith@pd.gov',
    role: 'Patrol Officer',
    status: 'active'
  },
  // Add more mock officers as needed
];

export function OfficerSelect({ selectedOfficers, onOfficerSelect }: OfficerSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOfficers = mockOfficers.filter(
    officer =>
      !selectedOfficers.find(selected => selected.id === officer.id) &&
      (officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOfficerSelect = (officer: Officer) => {
    onOfficerSelect([...selectedOfficers, officer]);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const handleRemoveOfficer = (officerId: string) => {
    onOfficerSelect(selectedOfficers.filter(officer => officer.id !== officerId));
  };

  return (
    <div className="space-y-2">
      {/* Selected Officers */}
      <div className="flex flex-wrap gap-2">
        {selectedOfficers.map(officer => (
          <div
            key={officer.id}
            className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
          >
            <span className="mr-1">{officer.name} ({officer.badge})</span>
            <button
              type="button"
              onClick={() => handleRemoveOfficer(officer.id)}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full rounded-md border-gray-300 pl-10 pr-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search officers by name or badge number"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && searchQuery && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {filteredOfficers.length > 0 ? (
              filteredOfficers.map(officer => (
                <button
                  key={officer.id}
                  type="button"
                  onClick={() => handleOfficerSelect(officer)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{officer.name}</div>
                    <div className="text-sm text-gray-500">
                      {officer.badge} - {officer.agency}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No officers found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}