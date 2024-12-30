import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { type ReviewRequest } from '../../types';

interface ReviewHistoryProps {
  requests: ReviewRequest[];
  onUpdateRequest: (id: string, updates: Partial<ReviewRequest>) => void;
  onDeleteRequest: (id: string) => void;
  isAdmin: boolean;
}

export function ReviewHistory({
  requests,
  onUpdateRequest,
  onDeleteRequest,
  isAdmin
}: ReviewHistoryProps) {
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
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-8 px-4 py-3"></th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Videos
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
              {isAdmin && (
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <React.Fragment key={request.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleRow(request.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedRows.has(request.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(request.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.videos.length}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${request.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        request.priority === 'priority' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${request.status === 'completed' ? 'bg-green-100 text-green-800' :
                        request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${request.cost.total.toFixed(2)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {/* Implement edit logic */}}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteRequest(request.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
                {expandedRows.has(request.id) && (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 7} className="px-4 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Videos</h4>
                          <ul className="mt-2 divide-y divide-gray-200">
                            {request.videos.map((video) => (
                              <li key={video.id} className="py-2">
                                <p className="text-sm text-gray-600">{video.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(video.size / (1024 * 1024)).toFixed(2)} MB • 
                                  {Math.round(video.duration)}s
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Officers Involved</h4>
                          <ul className="mt-2 divide-y divide-gray-200">
                            {request.officers.map((officer) => (
                              <li key={officer.id} className="py-2">
                                <p className="text-sm text-gray-600">
                                  {officer.name} ({officer.badge})
                                </p>
                                <p className="text-xs text-gray-500">{officer.agency}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Cost Breakdown</h4>
                          <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div>
                              <dt className="text-sm text-gray-500">Base Price</dt>
                              <dd className="text-sm text-gray-900">
                                ${request.cost.basePrice.toFixed(2)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm text-gray-500">Priority Fee</dt>
                              <dd className="text-sm text-gray-900">
                                ${request.cost.priorityFee.toFixed(2)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm text-gray-500">Quantity Discount</dt>
                              <dd className="text-sm text-gray-900">
                                -${request.cost.quantityDiscount.toFixed(2)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-900">Total</dt>
                              <dd className="text-sm font-medium text-blue-600">
                                ${request.cost.total.toFixed(2)}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}