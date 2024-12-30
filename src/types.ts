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