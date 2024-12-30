import React from 'react';
import { X, Download, Edit2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { type ReviewRequest } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ReportViewModalProps {
  report: ReviewRequest;
  onClose: () => void;
  onEdit: () => void;
  onDownload: () => void;
}

export function ReportViewModal({ report, onClose, onEdit, onDownload }: ReportViewModalProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const canEdit = isAdmin || report.status === 'pending';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Review Request Details</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={onDownload}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            {canEdit && (
              <button
                onClick={onEdit}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Request
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Request Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Request ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{report.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(report.createdAt), 'PPpp')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {report.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Priority</dt>
                  <dd className="mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${report.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        report.priority === 'priority' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {report.priority}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Base Price</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    ${report.cost.basePrice.toFixed(2)}
                  </dd>
                </div>
                {report.cost.priorityFee > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Priority Fee</dt>
                    <dd className="mt-1 text-sm text-orange-600">
                      +${report.cost.priorityFee.toFixed(2)}
                    </dd>
                  </div>
                )}
                {report.cost.quantityDiscount > 0 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Quantity Discount</dt>
                    <dd className="mt-1 text-sm text-green-600">
                      -${report.cost.quantityDiscount.toFixed(2)}
                    </dd>
                  </div>
                )}
                <div className="pt-3 border-t">
                  <dt className="text-sm font-medium text-gray-900">Total Cost</dt>
                  <dd className="mt-1 text-lg font-semibold text-blue-600">
                    ${report.cost.total.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Videos</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                {report.videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{video.name}</p>
                      <p className="text-sm text-gray-500">
                        {(video.size / (1024 * 1024)).toFixed(2)} MB • 
                        {Math.round(video.duration / 60)}m {Math.round(video.duration % 60)}s
                      </p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${video.status === 'completed' ? 'bg-green-100 text-green-800' :
                        video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {video.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Officers Involved</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                {report.officers.map((officer) => (
                  <div key={officer.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{officer.name}</p>
                      <p className="text-sm text-gray-500">{officer.badge} • {officer.agency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}