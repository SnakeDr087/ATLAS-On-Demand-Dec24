import React from 'react';
import { TableHeader } from './TableHeader';
import { LoadingTable } from '../LoadingState';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  sortField?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: keyof T) => void;
}

export function Table<T>({
  data,
  columns,
  isLoading,
  sortField,
  sortDirection,
  onSort
}: TableProps<T>) {
  if (isLoading) {
    return <LoadingTable />;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <TableHeader
                  key={String(column.key)}
                  label={column.label}
                  sortable={column.sortable}
                  sortField={String(column.key)}
                  sortDirection={column.key === sortField ? sortDirection : undefined}
                  onSort={() => onSort?.(column.key)}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                    {column.render 
                      ? column.render(item[column.key], item)
                      : String(item[column.key])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}