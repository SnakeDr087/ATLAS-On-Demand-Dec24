import React, { useState } from 'react';
import { type Officer, type ReviewType, type SelectionCriteria } from '../../types/officer';
import { selectOfficersForReview } from '../../services/officerService';

export function RandomSelection() {
  const [criteria, setCriteria] = useState<SelectionCriteria>({
    reviewType: 'random',
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    count: 1,
    excludeRecentlyReviewed: true,
  });

  const [selectedOfficers, setSelectedOfficers] = useState<Officer[]>([]);

  const handleSelection = async () => {
    const officers = await selectOfficersForReview(criteria);
    setSelectedOfficers(officers);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Random Officer Selection</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Review Type</label>
            <select
              value={criteria.reviewType}
              onChange={(e) => setCriteria({ ...criteria, reviewType: e.target.value as ReviewType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="random">Random Review</option>
              <option value="performance">Performance Review</option>
              <option value="meaningful">Meaningful Review</option>
              <option value="use-of-force">Use of Force Review</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={criteria.dateRange.start}
                onChange={(e) => setCriteria({
                  ...criteria,
                  dateRange: { ...criteria.dateRange, start: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="date"
                value={criteria.dateRange.end}
                onChange={(e) => setCriteria({
                  ...criteria,
                  dateRange: { ...criteria.dateRange, end: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Officers</label>
            <input
              type="number"
              min="1"
              value={criteria.count}
              onChange={(e) => setCriteria({ ...criteria, count: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            onClick={handleSelection}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Select Officers
          </button>
        </div>
      </div>

      {selectedOfficers.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Selected Officers</h3>
          <div className="space-y-4">
            {selectedOfficers.map((officer) => (
              <div
                key={officer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{officer.name}</p>
                  <p className="text-sm text-gray-500">Badge: {officer.badge}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>{officer.division}</p>
                  <p>{officer.shift} Shift</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}