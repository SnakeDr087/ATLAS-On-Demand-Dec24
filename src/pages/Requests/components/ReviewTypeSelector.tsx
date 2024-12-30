import React from 'react';
import { Clock, AlertCircle, FileText } from 'lucide-react';
import { type ReviewRequest } from '../../../types';

interface ReviewTypeSelectorProps {
  value?: ReviewRequest['type'];
  onChange: (type: ReviewRequest['type']) => void;
}

export function ReviewTypeSelector({ value, onChange }: ReviewTypeSelectorProps) {
  const types = [
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
      icon: FileText
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Review Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <label
            key={type.id}
            className={`
              relative rounded-lg border p-4 cursor-pointer
              ${value === type.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200'}
            `}
          >
            <input
              type="radio"
              name="reviewType"
              value={type.id}
              checked={value === type.id}
              onChange={(e) => onChange(e.target.value as ReviewRequest['type'])}
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
  );
}