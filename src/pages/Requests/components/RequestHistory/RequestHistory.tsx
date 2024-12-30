import React from 'react';
import { type Column } from './types';
import { type ReviewRequest } from '../../../../types';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

interface RequestHistoryProps {
  requests: ReviewRequest[];
  onUpdateRequest?: (id: string, updates: Partial<ReviewRequest>) => void;
  onDeleteRequest?: (id: string) => void;
  isAdmin?: boolean;
}

export function RequestHistory({
  requests,
  onUpdateRequest,
  onDeleteRequest,
  isAdmin = false
}: RequestHistoryProps) {
  const columns: Column[] = [
    {
      id: 'createdAt',
      header: 'Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      id: 'type',
      header: 'Type',
      sortable: true,
      render: (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'priority',
      header: 'Priority',
      sortable: true,
      render: (value: string) => <PriorityBadge priority={value} />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {isAdmin && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                {columns.map((column) => (
                  <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                    {column.render 
                      ? column.render(request[column.id], request)
                      : String(request[column.id])
                    }
                  </td>
                ))}
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {onUpdateRequest && (
                      <button
                        onClick={() => onUpdateRequest(request.id, request)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                    )}
                    {onDeleteRequest && (
                      <button
                        onClick={() => onDeleteRequest(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}