import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { type Officer } from '../../../types/officer';
import { getAllOfficers } from '../../../services/officerService';
import { useAuth } from '../../../contexts/AuthContext';

interface RecipientSelectProps {
  value: string;
  onChange: (officerId: string) => void;
}

export function RecipientSelect({ value, onChange }: RecipientSelectProps) {
  const { user } = useAuth();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      const allOfficers = await getAllOfficers();
      // Filter officers based on user's agency if not admin
      const filteredOfficers = user?.role === 'admin' 
        ? allOfficers 
        : allOfficers.filter(officer => officer.agencyId === user?.agency?.id);
      setOfficers(filteredOfficers);
    } catch (error) {
      console.error('Failed to load officers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOfficers = officers.filter(officer =>
    officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search officers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4 text-gray-500">Loading officers...</div>
      ) : (
        <div className="border rounded-md max-h-48 overflow-y-auto">
          {filteredOfficers.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No officers found</div>
          ) : (
            filteredOfficers.map((officer) => (
              <button
                key={officer.id}
                onClick={() => onChange(officer.id)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                  value === officer.id ? 'bg-blue-50' : ''
                }`}
              >
                <div>
                  <div className="font-medium text-gray-900">{officer.name}</div>
                  <div className="text-sm text-gray-500">
                    Badge: {officer.badge} • {officer.rank}
                  </div>
                </div>
                {value === officer.id && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}