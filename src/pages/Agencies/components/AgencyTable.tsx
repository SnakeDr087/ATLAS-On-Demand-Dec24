import React, { useState, useMemo } from 'react';
import { Edit2, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { type Agency } from '../../../types';

interface AgencyTableProps {
  agencies: Agency[];
  onEdit: (agency: Agency) => void;
  onDelete: (id: string) => void;
}

type SortField = 'name' | 'type' | 'city' | 'liaison.name' | 'status';
type SortDirection = 'asc' | 'desc';

export function AgencyTable({ agencies, onEdit, onDelete }: AgencyTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredAndSortedAgencies = useMemo(() => {
    return agencies
      .filter(agency => {
        const searchLower = searchTerm.toLowerCase();
        return (
          agency.name.toLowerCase().includes(searchLower) ||
          agency.type.toLowerCase().includes(searchLower) ||
          agency.city.toLowerCase().includes(searchLower) ||
          agency.state.toLowerCase().includes(searchLower) ||
          agency.liaison.name.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => {
        let aValue = sortField.includes('.')
          ? sortField.split('.').reduce((obj, key) => obj[key], a)
          : a[sortField];
        let bValue = sortField.includes('.')
          ? sortField.split('.').reduce((obj, key) => obj[key], b)
          : b[sortField];

        if (typeof aValue === 'string') aValue = aValue.toLowerCase();
        if (typeof bValue === 'string') bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [agencies, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search agencies..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { field: 'name' as SortField, label: 'Agency' },
                { field: 'type' as SortField, label: 'Type' },
                { field: 'city' as SortField, label: 'Location' },
                { field: 'liaison.name' as SortField, label: 'Liaison' },
                { field: 'status' as SortField, label: 'Status' },
                { field: null, label: 'Actions' }
              ].map(({ field, label }) => (
                <th
                  key={field || 'actions'}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    field ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => field && handleSort(field)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {field && <SortIcon field={field} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedAgencies.map((agency) => (
              <tr key={agency.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {agency.patchUrl && (
                      <img
                        src={agency.patchUrl}
                        alt={`${agency.name} patch`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">{agency.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900 capitalize">{agency.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agency.city}, {agency.state}</div>
                  <div className="text-sm text-gray-500">{agency.zip}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agency.liaison.name}</div>
                  <div className="text-sm text-gray-500">{agency.liaison.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${agency.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {agency.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(agency)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(agency.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing {filteredAndSortedAgencies.length} of {agencies.length} agencies
        </p>
      </div>
    </div>
  );
}