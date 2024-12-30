```tsx
import React, { useState } from 'react';
import { BarChart, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewTypeMetric {
  type: string;
  count: number;
  color: string;
}

interface AgencyMetricsProps {
  data: {
    random: number;
    meaningful: number;
    performance: number;
  };
}

export function AgencyMetrics({ data }: AgencyMetricsProps) {
  const [dateRange, setDateRange] = useState({
    start: format(new Date().setDate(1), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });

  const metrics: ReviewTypeMetric[] = [
    { type: 'Random', count: data.random, color: 'bg-blue-500' },
    { type: 'Meaningful', count: data.meaningful, color: 'bg-green-500' },
    { type: 'Performance', count: data.performance, color: 'bg-purple-500' }
  ];

  const total = metrics.reduce((sum, metric) => sum + metric.count, 0);
  const maxCount = Math.max(...metrics.map(m => m.count));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-blue-600" />
          Review Type Distribution
        </h2>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          />
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.type} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{metric.type}</span>
              <span className="text-gray-500">
                {metric.count} ({((metric.count / total) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${metric.color} transition-all duration-500`}
                style={{ width: `${(metric.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```