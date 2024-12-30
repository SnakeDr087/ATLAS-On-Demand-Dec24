import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { openDB } from 'idb';
import { type Message } from '../types/messaging';

const DB_NAME = 'atlas_messages';
const STORE_NAME = 'messages';

export function useMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadMessages();
    }
  }, [user?.id]);

  const loadMessages = async () => {
    try {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('recipientId', 'recipientId');
            store.createIndex('departmentId', 'departmentId');
            store.createIndex('timestamp', 'timestamp');
            store.createIndex('isRead', 'isRead');
          }
        },
      });

      const allMessages = await db.getAll(STORE_NAME);
      const userMessages = allMessages.filter(msg => 
        msg.recipientId === user?.id ||
        msg.departmentId === user?.agency?.id ||
        msg.type === 'broadcast' ||
        msg.senderId === user?.id
      );

      setMessages(userMessages.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: Omit<Message, 'id' | 'timestamp' | 'isRead'>) => {
    try {
      const db = await openDB(DB_NAME, 1);
      const newMessage: Message = {
        ...message,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        senderId: user!.id,
        senderName: `${user!.firstName} ${user!.lastName}`
      };

      await db.add(STORE_NAME, newMessage);
      setMessages(prev => [newMessage, ...prev]);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const db = await openDB(DB_NAME, 1);
      const message = await db.get(STORE_NAME, messageId);
      if (message && !message.isRead) {
        message.isRead = true;
        await db.put(STORE_NAME, message);
        setMessages(prev => 
          prev.map(msg => msg.id === messageId ? { ...msg, isRead: true } : msg)
        );
      }
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.isRead).length;
  };

  return {
    messages,
    isLoading,
    sendMessage,
    markAsRead,
    getUnreadCount
  };
}