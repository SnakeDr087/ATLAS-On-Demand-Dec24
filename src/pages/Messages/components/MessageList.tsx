import React from 'react';
import { format } from 'date-fns';
import { type Message } from '../../../types/messaging';

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  onSelect: (message: Message) => void;
}

export function MessageList({ messages, selectedMessage, onSelect }: MessageListProps) {
  return (
    <div className="h-full flex flex-col">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No messages
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => onSelect(message)}
              className={`w-full px-4 py-3 flex flex-col text-left hover:bg-gray-50 ${
                selectedMessage?.id === message.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-900">{message.senderName}</span>
                <span className="text-xs text-gray-500">
                  {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 truncate">
                {message.subject}
              </span>
              <span className="text-sm text-gray-500 truncate">
                {message.content}
              </span>
              <div className="mt-1 flex items-center space-x-2">
                {message.priority !== 'normal' && (
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    message.priority === 'urgent' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {message.priority}
                  </span>
                )}
                {!message.isRead && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}