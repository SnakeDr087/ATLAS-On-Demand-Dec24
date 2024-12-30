import React from 'react';
import { Bell } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';

export function NotificationBell() {
  const { messages } = useMessages();
  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <div className="relative">
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}