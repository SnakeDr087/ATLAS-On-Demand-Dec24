import React from 'react';
import { BarChart } from 'lucide-react';

interface ReviewTypeData {
  type: string;
  count: number;
  color: string;
}

interface ReviewTypeChartProps {
  data: {
    meaningful: number;
    random: number;
    performance: number;
    useOfForce: number;
  };
}

export function ReviewTypeChart({ data }: ReviewTypeChartProps) {
  const reviewTypes: ReviewTypeData[] = [
    { type: 'Meaningful', count: data.meaningful, color: 'bg-blue-500' },
    { type: 'Random', count: data.random, color: 'bg-green-500' },
    { type: 'Performance', count: data.performance, color: 'bg-purple-500' },
    { type: 'Use of Force', count: data.useOfForce, color: 'bg-orange-500' }
  ];

  const maxCount = Math.max(...reviewTypes.map(type => type.count));
  const total = reviewTypes.reduce((sum, type) => sum + type.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <BarChart className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold">Review Type Distribution</h2>
      </div>

      <div className="space-y-4">
        {reviewTypes.map((type) => (
          <div key={type.type} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{type.type}</span>
              <span className="text-gray-500">
                {type.count} ({((type.count / total) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${type.color} transition-all duration-500`}
                style={{ width: `${(type.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}