export type UserRole = 'admin' | 'agency_user';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  agency?: {
    id: string;
    name: string;
    code: string;
  };
  photoUrl?: string;
  lastLogin?: Date;
}

export interface VideoFile {
  id: string;
  name: string;
  file: File;
  size: number;
  duration: number;
  status: 'uploading' | 'processing' | 'completed' | 'error' | 'paused';
  progress?: number;
  type?: string;
  officer?: string;
  uploadDate: string;
  agencyId?: string;
  department?: string;
}

export interface Review {
  id: string;
  title: string;
  type: 'urgent' | 'standard' | 'routine';
  date: string;
  officers: Officer[];
}

export interface ReviewRequest {
  id: string;
  videos: VideoFile[];
  officers: Officer[];
  priority: 'standard' | 'priority' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  deadline: string;
  cost: {
    basePrice: number;
    priorityFee: number;
    quantityDiscount: number;
    total: number;
  };
  agency?: {
    id: string;
    name: string;
  };
}

export interface Officer {
  id: string;
  name: string;
  badge: string;
  agency: string;
}