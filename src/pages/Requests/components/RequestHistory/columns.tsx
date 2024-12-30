import React from 'react';
import { type RequestColumn } from '../../../../types/request';
import { type ReviewRequest } from '../../../../types';

export const columns: RequestColumn[] = [
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
    render: (value: ReviewRequest['type']) => value.charAt(0).toUpperCase() + value.slice(1)
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    render: (value: ReviewRequest['status']) => (
      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
  {
    id: 'priority',
    header: 'Priority',
    sortable: true, 
    render: (value: ReviewRequest['priority']) => (
      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  }
];