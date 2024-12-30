import React from 'react';
import { type Column } from './types';
import { type ReviewRequest } from '../../../../types';

interface TableRowProps {
  columns: Column[];
  request: ReviewRequest;
}

export function TableRow({ columns, request }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map((column) => (
        <td key={column.id} className="px-6 py-4 whitespace-nowrap">
          {column.render ? 
            column.render(request[column.id as keyof ReviewRequest]) :
            String(request[column.id as keyof ReviewRequest])
          }
        </td>
      ))}
    </tr>
  );
}