import React from 'react';
import { Zap, Clock, AlertTriangle } from 'lucide-react';
import { type ReviewRequest } from '../../../types';

interface PrioritySelectorProps {
  value?: ReviewRequest['priority'];
  onChange: (priority: ReviewRequest['priority']) => void;
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  const priorities = [
    {
      id: 'standard',
      label: 'Standard',
      description: '14 days turnaround',
      icon: Clock
    },
    {
      id: 'priority',
      label: 'Priority',
      description: '7 days turnaround',
      icon: Zap
    },
    {
      id: 'urgent',
      label: 'Urgent',
      description: '48 hours turnaround',
      icon: AlertTriangle
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
            <div className="flex items-center">
              <priority.icon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{priority.label}</p>
                <p className="text-sm text-gray-500">{priority.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}