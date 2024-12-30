import React from 'react';
import { Button } from '../../../../components/common/Button';

interface FormActionsProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function FormActions({ isLoading, onSubmit }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      <Button
        type="submit"
        isLoading={isLoading}
        onClick={onSubmit}
      >
        Submit Request
      </Button>
    </div>
  );
}