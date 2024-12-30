import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { type ReviewRequest } from '../../../types';

interface ReviewDetailsFormProps {
  request: Partial<ReviewRequest>;
  onChange: (updates: Partial<ReviewRequest>) => void;
}

export function ReviewDetailsForm({ request, onChange }: ReviewDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Review Details</h2>

      <div className="space-y-6">
        {/* Review Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'random',
                label: 'Random Review',
                description: 'Standard performance evaluation',
                icon: Clock
              },
              {
                id: 'meaningful',
                label: 'Meaningful Review',
                description: 'Specific incident analysis',
                icon: AlertCircle
              },
              {
                id: 'performance',
                label: 'Performance Review',
                description: 'Officer evaluation',
                icon: Calendar
              }
            ].map((type) => (
              <label
                key={type.id}
                className={`
                  relative rounded-lg border p-4 cursor-pointer
                  ${request.type === type.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200'}
                `}
              >
                <input
                  type="radio"
                  name="reviewType"
                  value={type.id}
                  checked={request.type === type.id}
                  onChange={(e) => onChange({ type: e.target.value })}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <type.icon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{type.label}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'standard',
                label: 'Standard',
                deadline: '14 days',
                description: 'Regular processing time'
              },
              {
                id: 'priority',
                label: 'Priority',
                deadline: '7 days',
                description: 'Expedited processing'
              },
              {
                id: 'urgent',
                label: 'Urgent',
                deadline: '48 hours',
                description: 'Emergency processing'
              }
            ].map((level) => (
              <label
                key={level.id}
                className={`
                  relative rounded-lg border p-4 cursor-pointer
                  ${request.priority === level.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200'}
                `}
              >
                <input
                  type="radio"
                  name="priority"
                  value={level.id}
                  checked={request.priority === level.id}
                  onChange={(e) => onChange({ priority: e.target.value as ReviewRequest['priority'] })}
                  className="sr-only"
                />
                <div>
                  <p className="font-medium text-gray-900">{level.label}</p>
                  <p className="text-sm text-gray-500">{level.deadline}</p>
                  <p className="text-xs text-gray-400">{level.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            value={request.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter any additional details about the review request"
          />
        </div>
      </div>
    </div>
  );
}