import { useState } from 'react';
import { type ContactFormData, type ContactFormStatus } from '../types/contact';
import { submitContactForm } from '../services/contact';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  agency: '',
  message: ''
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<ContactFormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const success = await submitContactForm(formData);
      if (success) {
        setStatus('success');
        setFormData(initialFormData);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    status,
    handleSubmit,
    handleChange
  };
}