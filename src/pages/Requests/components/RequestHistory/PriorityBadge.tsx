import React from 'react';

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getPriorityClasses = () => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'priority':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClasses()}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}