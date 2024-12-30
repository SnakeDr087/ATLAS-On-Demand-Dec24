import React, { useState } from 'react';
import { MessageList } from './components/MessageList';
import { MessageComposer } from './components/MessageComposer';
import { MessageViewer } from './components/MessageViewer';
import { MessageFilters } from './components/MessageFilters';
import { useMessages } from '../../hooks/useMessages';
import { useAuth } from '../../contexts/AuthContext';
import { type Message } from '../../types/messaging';
import { Plus, Filter } from 'lucide-react';

export function MessagesPage() {
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { messages, sendMessage, markAsRead } = useMessages();

  const handleSend = async (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
    // Validate message type based on user role
    if (user?.role !== 'admin' && message.type !== 'direct') {
      alert('You can only send direct messages');
      return;
    }

    await sendMessage(message);
    setShowComposer(false);
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setShowComposer(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </button>
        </div>
      </div>

      {showFilters && <MessageFilters />}

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Message List */}
        <div className="col-span-4 bg-white rounded-lg shadow-sm overflow-hidden">
          <MessageList
            messages={messages}
            selectedMessage={selectedMessage}
            onSelect={handleMessageSelect}
          />
        </div>

        {/* Message Viewer */}
        <div className="col-span-8 bg-white rounded-lg shadow-sm overflow-hidden">
          {selectedMessage ? (
            <MessageViewer
              message={selectedMessage}
              onClose={() => setSelectedMessage(null)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>

      {/* Message Composer Modal */}
      {showComposer && (
        <MessageComposer
          onSend={handleSend}
          onClose={() => setShowComposer(false)}
          isAdmin={user?.role === 'admin'}
        />
      )}
    </div>
  );
}