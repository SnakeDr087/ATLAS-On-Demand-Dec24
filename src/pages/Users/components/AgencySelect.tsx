import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { type Agency } from '../../../types';

interface AgencySelectProps {
  selectedAgency?: Agency;
  onChange: (agency: Agency) => void;
}

export function AgencySelect({ selectedAgency, onChange }: AgencySelectProps) {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // Mock data for demonstration
    setAgencies([
      {
        id: '1',
        name: 'Central Police Department',
        code: 'CPD',
        type: 'local',
        status: 'active'
      },
      {
        id: '2',
        name: 'State Highway Patrol',
        code: 'SHP',
        type: 'state',
        status: 'active'
      }
    ]);
    setIsLoading(false);
  }, []);

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Agency *
      </label>
      <div className="mt-1 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search agencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {isLoading ? (
          <div className="mt-2 text-sm text-gray-500">Loading agencies...</div>
        ) : (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredAgencies.map((agency) => (
              <li
                key={agency.id}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50
                  ${selectedAgency?.id === agency.id ? 'bg-blue-50' : ''}`}
                onClick={() => onChange(agency)}
              >
                <div className="flex items-center">
                  <span className="font-medium block truncate">{agency.name}</span>
                  <span className="ml-2 text-sm text-gray-500">{agency.code}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}