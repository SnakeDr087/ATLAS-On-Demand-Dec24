import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableHeaderProps {
  label: string;
  sortable?: boolean;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export function TableHeader({
  label,
  sortable,
  sortField,
  sortDirection,
  onSort
}: TableHeaderProps) {
  return (
    <th
      className={`
        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
        ${sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
      `}
      onClick={() => sortable && onSort?.(sortField || '')}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortable && sortField && (
          <span className="flex flex-col">
            <ChevronUp 
              className={`w-3 h-3 ${sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}
            />
            <ChevronDown 
              className={`w-3 h-3 ${sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}
            />
          </span>
        )}
      </div>
    </th>
  );
}