export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId?: string; // Optional for broadcast messages
  departmentId?: string; // Optional for department-wide messages
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  priority: 'normal' | 'high' | 'urgent';
  type: 'direct' | 'department' | 'broadcast';
}

export interface Thread {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessageAt: string;
  subject: string;
  isArchived: boolean;
}

export interface Draft {
  id: string;
  recipientId?: string;
  departmentId?: string;
  subject: string;
  content: string;
  attachments?: File[];
  savedAt: string;
}