import React from 'react';
import { DollarSign, Clock, Package, Zap } from 'lucide-react';
import { calculateReviewCosts } from '../../utils/costs';
import { type VideoFile } from '../../types';

interface CostCalculatorProps {
  videos: VideoFile[];
  priority: 'standard' | 'priority' | 'urgent';
}

export function CostCalculator({ videos, priority }: CostCalculatorProps) {
  const costs = calculateReviewCosts(
    videos.length,
    priority,
    videos.reduce((acc, video) => acc + video.duration, 0),
    videos
  );

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
        Cost Breakdown
      </h2>

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