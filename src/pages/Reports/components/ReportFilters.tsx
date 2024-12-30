import React from 'react';
import { Calendar, Filter } from 'lucide-react';

interface ReportFiltersProps {
  filters: {
    dateRange: { start: string; end: string };
    incidentType: string;
    riskLevel: string;
    status: string;
  };
  onChange: (filters: any) => void;
}

export function ReportFilters({ filters, onChange }: ReportFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => onChange({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => onChange({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incident Type
          </label>
          <select
            value={filters.incidentType}
            onChange={(e) => onChange({ ...filters, incidentType: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="traffic">Traffic Stop</option>
            <option value="domestic">Domestic</option>
            <option value="suspicious">Suspicious Activity</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => onChange({ ...filters, riskLevel: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
    </div>
  );
}