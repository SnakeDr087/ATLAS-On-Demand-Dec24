import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
} from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { type Review } from '../../types';
import { Trash2 } from 'lucide-react';

interface CalendarProps {
  reviews: Review[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onDeleteReview: (id: string) => void;
}

export function Calendar({ reviews, selectedDate, onDateSelect, onDeleteReview }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
  };

  const getReviewsForDay = (date: Date) => {
    return reviews.filter(review => isSameDay(new Date(review.date), date));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const dayReviews = getReviewsForDay(day);
          return (
            <div
              key={idx}
              onClick={() => onDateSelect(day)}
              className={`
                min-h-[80px] p-2 rounded-lg relative
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-50' : 'bg-white'}
                ${isSameDay(day, selectedDate) ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}
              `}
            >
              <span className={`text-sm ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : 'text-gray-900'}`}>
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-1">
                {dayReviews.map((review) => (
                  <div
                    key={review.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredReview(review.id)}
                    onMouseLeave={() => setHoveredReview(null)}
                  >
                    <div className={`
                      text-xs p-1 rounded
                      ${review.type === 'urgent' ? 'bg-red-100 text-red-800' : 
                        review.type === 'standard' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {review.title}
                    </div>
                    {hoveredReview === review.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteReview(review.id);
                        }}
                        className="absolute -right-1 -top-1 p-1 bg-white rounded-full shadow-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}