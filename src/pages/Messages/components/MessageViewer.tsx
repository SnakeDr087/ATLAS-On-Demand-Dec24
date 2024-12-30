import React from 'react';
import { format } from 'date-fns';
import { X, Download, Reply, Forward, Trash2 } from 'lucide-react';
import { type Message } from '../../../types/messaging';

interface MessageViewerProps {
  message: Message;
  onClose: () => void;
}

export function MessageViewer({ message, onClose }: MessageViewerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900">{message.subject}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {/* Message Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900">{message.senderName}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(message.timestamp), 'PPpp')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {message.priority !== 'normal' && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  message.priority === 'urgent' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {message.priority}
                </span>
              )}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                message.type === 'broadcast' ? 'bg-purple-100 text-purple-800' :
                message.type === 'department' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {message.type}
              </span>
            </div>
          </div>

          {/* Message Content */}
          <div className="prose max-w-none">
            <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-900">{attachment.name}</span>
                    <a
                      href={attachment.url}
                      download={attachment.name}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t flex justify-between">
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </button>
        </div>
        <button className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
}