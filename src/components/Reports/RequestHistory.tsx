import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { type ReviewRequest } from '../../types';
import { Table } from '../common/Table';
import { Button } from '../common/Button';

interface RequestHistoryProps {
  reports: ReviewRequest[];
  onEdit: (report: ReviewRequest) => void;
  onDelete: (id: string) => void;
}

export function RequestHistory({ reports, onEdit, onDelete }: RequestHistoryProps) {
  const columns = [
    {
      key: 'requestId',
      label: 'Request ID',
      sortable: true,
      render: (_, report) => report.id
    },
    {
      key: 'createdAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => format(new Date(value as string), 'MMM d, yyyy')
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value) => (
        <span className="capitalize">{value}</span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value) => (
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${value === 'urgent' ? 'bg-red-100 text-red-800' :
            value === 'priority' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'}
        `}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${value === 'completed' ? 'bg-green-100 text-green-800' :
            value === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'}
        `}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, report) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => {}}
          />
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(report)}
          />
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(report.id)}
          />
        </div>
      )
    }
  ];

  return (
    <Table
      data={reports}
      columns={columns}
    />
  );
}