import React from 'react';
import { Calendar, Clock, AlertCircle, Shield } from 'lucide-react';
import { FormSection } from './form/FormSection';
import { Input } from './common/Input';
import { type ReviewRequest } from '../types';

interface ReviewDetailsFormProps {
  request: Partial<ReviewRequest>;
  onChange: (updates: Partial<ReviewRequest>) => void;
}

export function ReviewDetailsForm({ request, onChange }: ReviewDetailsFormProps) {
  const reviewTypes = [
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
    },
    {
      id: 'use-of-force',
      label: 'Use of Force Review',
      description: 'Force incident analysis',
      icon: Shield
    }
  ];

  return (
    <FormSection 
      title="Review Details"
      description="Select the type of review and provide incident details"
    >
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {reviewTypes.map((type) => (
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

      <div className="col-span-2 grid grid-cols-2 gap-4 mt-6">
        <Input
          label="Incident Date"
          type="date"
          value={request.incidentDate || ''}
          onChange={(e) => onChange({ incidentDate: e.target.value })}
          icon={Calendar}
        />
        
        <Input
          label="Case Number (Optional)"
          type="text"
          value={request.caseNumber || ''}
          onChange={(e) => onChange({ caseNumber: e.target.value })}
          placeholder="Enter case number"
        />
      </div>
    </FormSection>
  );
}