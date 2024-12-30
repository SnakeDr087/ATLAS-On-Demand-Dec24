import React from 'react';
import { type Column } from './types';

interface TableHeaderProps {
  columns: Column[];
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
}

export function TableHeader({ columns, sortField, sortDirection, onSort }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            onClick={() => column.sortable && onSort?.(column.id)}
          >
            {column.header}
            {column.sortable && sortField === column.id && (
              <span className="ml-2">
                {sortDirection === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}