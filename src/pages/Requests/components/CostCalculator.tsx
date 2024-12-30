import React from 'react';
import { DollarSign, Clock, Package, Zap } from 'lucide-react';
import { calculateReviewCosts } from '../../../utils/costs';
import { type VideoFile } from '../../../types';

interface CostCalculatorProps {
  videos: VideoFile[];
  priority: 'standard' | 'priority' | 'urgent';
}

export function CostCalculator({ videos, priority }: CostCalculatorProps) {
  const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
  const costs = calculateReviewCosts(videos.length, priority, totalDuration, videos);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
        Cost Breakdown
      </h2>

      {/* Per Video Breakdown */}
      {videos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Per Video Breakdown</h3>
          <div className="space-y-3">
            {costs.perVideoBreakdown.map((video, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{video.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    {Math.round(video.duration / 60)}m
                    {video.durationMultiplier > 1 && (
                      <span className="text-orange-600 ml-1">
                        ({video.durationMultiplier}x)
                      </span>
                    )}
                  </span>
                  <span className="font-medium">${video.baseCost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost Summary */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Package className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-600">Base Price</span>
          </div>
          <span className="font-medium">${costs.basePrice.toFixed(2)}</span>
        </div>

        {costs.priorityFee > 0 && (
          <div className="flex justify-between items-center py-2 text-orange-600">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              <span>Priority Processing Fee</span>
            </div>
            <span className="font-medium">+${costs.priorityFee.toFixed(2)}</span>
          </div>
        )}

        {costs.quantityDiscount > 0 && (
          <div className="flex justify-between items-center py-2 text-green-600">
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              <span>Quantity Discount</span>
            </div>
            <span className="font-medium">-${costs.quantityDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Cost</span>
            <span className="text-lg font-bold text-blue-600">
              ${costs.total.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Estimated completion by{' '}
            {priority === 'urgent' ? '48 hours' :
             priority === 'priority' ? '7 days' : '14 days'}
          </p>
        </div>
      </div>
    </div>
  );
}