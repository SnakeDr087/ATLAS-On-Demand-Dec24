import React from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import { type RequestRowProps } from './types';
import { type RequestColumn } from '../../../../types/request';
import { RequestDetails } from './RequestDetails';

interface ExtendedRequestRowProps extends RequestRowProps {
  columns: RequestColumn[];
  isAdmin?: boolean;
}

export function RequestRow({
  request,
  columns,
  isExpanded,
  isAdmin,
  onToggle,
  onDelete,
  onEdit
}: ExtendedRequestRowProps) {
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-4">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </td>
        {columns.map(column => (
          <td key={column.id} className="px-4 py-4 whitespace-nowrap">
            {column.render ? 
              column.render(request[column.id], request) :
              String(request[column.id])
            }
          </td>
        ))}
        {isAdmin && (
          <td className="px-4 py-4 whitespace-nowrap text-right">
            <div className="flex justify-end space-x-2">
              {onEdit && (
                <button 
                  onClick={() => onEdit(request)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(request.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </td>
        )}
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={columns.length + 2} className="px-4 py-4 bg-gray-50">
            <RequestDetails request={request} />
          </td>
        </tr>
      )}
    </>
  );
}