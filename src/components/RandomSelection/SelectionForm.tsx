import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Calendar, Users } from 'lucide-react';

interface SelectionFormProps {
  onSubmit: (criteria: {
    count: number;
    excludeRecent: boolean;
    dateRange: { start: string; end: string };
  }) => void;
  maxOfficers: number;
  isLoading: boolean;
}

export function SelectionForm({ onSubmit, maxOfficers, isLoading }: SelectionFormProps) {
  const [count, setCount] = useState(1);
  const [excludeRecent, setExcludeRecent] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ count, excludeRecent, dateRange });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Number of Officers"
          type="number"
          min={1}
          max={maxOfficers}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          icon={Users}
        />
        
        <div className="space-y-4">
          <Input
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            icon={Calendar}
          />
          <Input
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            icon={Calendar}
          />
        </div>
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={excludeRecent}
          onChange={(e) => setExcludeRecent(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">
          Exclude recently reviewed officers (last 30 days)
        </span>
      </label>

      <Button type="submit" isLoading={isLoading}>
        Generate Selection
      </Button>
    </form>
  );
}