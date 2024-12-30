import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { type ReviewType } from '../../types/officer';

interface RandomizerFormProps {
  onSubmit: (criteria: {
    reviewType: ReviewType;
    dateRange: { start: string; end: string };
    count: number;
    excludeRecentlyReviewed: boolean;
  }) => void;
}

export function RandomizerForm({ onSubmit }: RandomizerFormProps) {
  const [criteria, setCriteria] = useState({
    reviewType: 'random' as ReviewType,
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    count: 1,
    excludeRecentlyReviewed: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Review Type</label>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            }
          ].map((type) => (
            <label
              key={type.id}
              className={`
                relative rounded-lg border p-4 cursor-pointer
                ${criteria.reviewType === type.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200'}
              `}
            >
              <input
                type="radio"
                name="reviewType"
                value={type.id}
                checked={criteria.reviewType === type.id}
                onChange={(e) => setCriteria({ ...criteria, reviewType: e.target.value as ReviewType })}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={criteria.dateRange.start}
              onChange={(e) => setCriteria({
                ...criteria,
                dateRange: { ...criteria.dateRange, start: e.target.value }
              })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={criteria.dateRange.end}
              onChange={(e) => setCriteria({
                ...criteria,
                dateRange: { ...criteria.dateRange, end: e.target.value }
              })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Officers</label>
        <input
          type="number"
          min="1"
          value={criteria.count}
          onChange={(e) => setCriteria({ ...criteria, count: parseInt(e.target.value) })}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="excludeRecent"
          checked={criteria.excludeRecentlyReviewed}
          onChange={(e) => setCriteria({ ...criteria, excludeRecentlyReviewed: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="excludeRecent" className="ml-2 text-sm text-gray-700">
          Exclude recently reviewed officers (last 30 days)
        </label>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Select Officers
      </button>
    </form>
  );
}