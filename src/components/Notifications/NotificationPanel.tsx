import React from 'react';
import { format } from 'date-fns';
import { type Review } from '../../types';

interface NotificationPanelProps {
  reviews: Review[];
  isOpen: boolean;
}

export function NotificationPanel({ reviews, isOpen }: NotificationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Upcoming Reviews</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm p-4">No upcoming reviews</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {review.title}
                </span>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${review.type === 'urgent' ? 'bg-red-100 text-red-700' : 
                    review.type === 'standard' ? 'bg-blue-100 text-blue-700' : 
                    'bg-gray-100 text-gray-700'}
                `}>
                  {review.type}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {format(new Date(review.date), 'MMM d, yyyy - h:mm a')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}