import React, { useState } from 'react';
import { X, Paperclip, Send } from 'lucide-react';
import { type Message } from '../../../types/messaging';
import { useAuth } from '../../../contexts/AuthContext';
import { RecipientSelect } from './RecipientSelect';

interface MessageComposerProps {
  onSend: (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => void;
  onClose: () => void;
  isAdmin: boolean;
}

export function MessageComposer({ onSend, onClose, isAdmin }: MessageComposerProps) {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Message['priority']>('normal');
  const [type, setType] = useState<Message['type']>('direct');
  const [recipientId, setRecipientId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate recipient for non-admin users
    if (!isAdmin && type !== 'direct') {
      alert('You can only send direct messages');
      return;
    }

    onSend({
      senderId: user!.id,
      senderName: `${user!.firstName} ${user!.lastName}`,
      recipientId: type === 'direct' ? recipientId : undefined,
      departmentId: type === 'department' ? departmentId : undefined,
      subject,
      content,
      priority,
      type,
      attachments: attachments.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">New Message</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Message Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as Message['type'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="direct">Direct Message</option>
                <option value="department">Department-wide</option>
                <option value="broadcast">Broadcast</option>
              </select>
            </div>
          )}

          {type === 'direct' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient
              </label>
              <RecipientSelect
                value={recipientId}
                onChange={setRecipientId}
              />
            </div>
          )}

          {type === 'department' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Message['priority'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Attachments</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer">
                <Paperclip className="w-5 h-5 text-gray-400" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setAttachments([...attachments, ...files]);
                  }}
                  className="hidden"
                />
              </label>
              {attachments.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {attachments.length} file(s) selected
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}