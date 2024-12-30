import React from 'react';
import { type ReviewRequest } from '../../../../types';

interface PrioritySectionProps {
  value?: ReviewRequest['priority'];
  onChange: (priority: ReviewRequest['priority']) => void;
}

export function PrioritySection({ value, onChange }: PrioritySectionProps) {
  const priorities = [
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
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {priorities.map((priority) => (
          <label
            key={priority.id}
            className={`
              relative rounded-lg border p-4 cursor-pointer
              ${value === priority.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200'}
            `}
          >
            <input
              type="radio"
              name="priority"
              value={priority.id}
              checked={value === priority.id}
              onChange={(e) => onChange(e.target.value as ReviewRequest['priority'])}
              className="sr-only"
            />
            <div>
              <p className="font-medium text-gray-900">{priority.label}</p>
              <p className="text-sm text-gray-500">{priority.deadline}</p>
              <p className="text-xs text-gray-400">{priority.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}