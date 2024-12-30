import React, { useState } from 'react';
import { type ReviewRequest } from '../../../../types';
import { type RequestColumn } from '../../../../types/request';
import { RequestRow } from './RequestRow';

interface RequestTableProps {
  requests: ReviewRequest[];
  columns: RequestColumn[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (request: ReviewRequest) => void;
}

export function RequestTable({ requests, columns, isAdmin, onDelete, onEdit }: RequestTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-8 px-4 py-3"></th>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {isAdmin && (
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <RequestRow
              key={request.id}
              request={request}
              columns={columns}
              isExpanded={expandedRows.has(request.id)}
              isAdmin={isAdmin}
              onToggle={() => toggleRow(request.id)}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}