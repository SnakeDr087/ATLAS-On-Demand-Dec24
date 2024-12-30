import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { type SortField, type SortDirection } from '../types';

interface VideoTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function VideoTableHeader({
  sortField,
  sortDirection,
  onSort
}: VideoTableHeaderProps) {
  const headers: Array<{ field: SortField; label: string }> = [
    { field: 'uploadDate', label: 'Upload Date' },
    { field: 'type', label: 'Name & Size' },
    { field: 'duration', label: 'Duration' },
    { field: 'status', label: 'Status' },
    { field: 'status', label: 'Actions' }
  ];

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map(({ field, label }) => (
          <th
            key={`${field}-${label}`}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            onClick={() => onSort(field)}
          >
            <div className="flex items-center space-x-1">
              <span>{label}</span>
              <SortIcon field={field} />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}