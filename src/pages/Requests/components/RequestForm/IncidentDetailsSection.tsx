import React from 'react';
import { Calendar } from 'lucide-react';

interface IncidentDetailsSectionProps {
  incidentDate?: string;
  caseNumber?: string;
  description?: string;
  onChange: (updates: {
    incidentDate?: string;
    caseNumber?: string;
    description?: string;
  }) => void;
}

export function IncidentDetailsSection({
  incidentDate,
  caseNumber,
  description,
  onChange
}: IncidentDetailsSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Incident Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Incident Date
          </label>
          <div className="mt-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={incidentDate || ''}
              onChange={(e) => onChange({ incidentDate: e.target.value })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Case Number (Optional)
          </label>
          <input
            type="text"
            value={caseNumber || ''}
            onChange={(e) => onChange({ caseNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter case number"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Additional Details
        </label>
        <textarea
          value={description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter any additional details about the review request"
        />
      </div>
    </div>
  );
}