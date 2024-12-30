export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  position: string;
  department: string;
  badgeNumber: string;
  hireDate: string;
  photoUrl?: string;
  agency: {
    id: string;
    name: string;
    code: string;
  };
  certifications: string[];
  languages: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  preferences: {
    notifications: {
      email: boolean;
      mobile: boolean;
      desktop: boolean;
    };
    timezone: string;
  };
}