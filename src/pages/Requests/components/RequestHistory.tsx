import React from 'react';
import { format } from 'date-fns';
import { type ReviewRequest } from '../../../types';

interface RequestHistoryProps {
  requests: ReviewRequest[];
  onUpdateRequest: (id: string, updates: Partial<ReviewRequest>) => void;
  onDeleteRequest: (id: string) => void;
}

export function RequestHistory({
  requests = [],
  onUpdateRequest,
  onDeleteRequest
}: RequestHistoryProps) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center">No requests yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Requests</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Request #{request.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(request.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${request.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    request.priority === 'priority' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {request.priority}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {request.videos.length} videos • {request.officers.length} officers
                </p>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  ${request.cost.total.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}