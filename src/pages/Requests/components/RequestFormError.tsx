import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RequestFormErrorProps {
  error: string | null;
}

export function RequestFormError({ error }: RequestFormErrorProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start mb-6">
      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-2" />
      <p className="text-sm text-red-700">{error}</p>
    </div>
  );
}