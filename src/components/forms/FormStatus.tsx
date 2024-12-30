import React from 'react';
import { type ContactFormStatus } from '../../types/contact';

interface FormStatusProps {
  status: ContactFormStatus;
}

export function FormStatus({ status }: FormStatusProps) {
  if (status === 'success') {
    return (
      <div className="p-4 bg-green-50 text-green-700 rounded-md">
        Thank you for your message! We'll get back to you soon.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return null;
}