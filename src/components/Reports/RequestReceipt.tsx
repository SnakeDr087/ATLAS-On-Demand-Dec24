import React from 'react';
import { Check, Download, Calendar, Clock, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { type ReviewRequest } from '../../types';
import { Button } from '../common/Button';
import { formatDuration } from '../../utils/videoProcessing';

interface RequestReceiptProps {
  request: ReviewRequest;
  onClose: () => void;
  onDownload: () => void;
}

export function RequestReceipt({ request, onClose, onDownload }: RequestReceiptProps) {
  const getTurnaroundTime = () => {
    switch (request.priority) {
      case 'urgent': return '48 hours';
      case 'priority': return '7 days';
      default: return '14 days';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPp');
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Request Submitted Successfully</h2>
          <p className="text-gray-500 mt-1">Your review request has been received</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Request ID</p>
              <p className="text-lg font-mono">{request.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submitted</p>
              <p className="text-lg">{formatDate(request.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Videos Summary */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Videos</h3>
            <div className="space-y-3">
              {request.videos.map(video => (
                <div key={video.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{video.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatDuration(video.duration)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Review Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Type: <span className="font-medium capitalize">{request.type}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Priority: <span className="font-medium capitalize">{request.priority}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Due by: <span className="font-medium">{getTurnaroundTime()}</span></span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Cost Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="font-medium">${request.cost.basePrice.toFixed(2)}</span>
              </div>
              {request.cost.priorityFee > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Priority Fee</span>
                  <span>+${request.cost.priorityFee.toFixed(2)}</span>
                </div>
              )}
              {request.cost.quantityDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Quantity Discount</span>
                  <span>-${request.cost.quantityDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">${request.cost.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            variant="secondary"
            icon={Download}
            onClick={onDownload}
          >
            Download Receipt
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}