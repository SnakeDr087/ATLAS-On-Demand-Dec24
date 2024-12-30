export interface ContactFormData {
  name: string;
  email: string;
  agency: string;
  message: string;
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';