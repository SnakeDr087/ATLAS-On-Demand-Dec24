```typescript
import React from 'react';
import { Button } from '../../../components/common/Button';
import { type ReviewRequest } from '../../../types';

interface RequestFormActionsProps {
  isLoading: boolean;
  isValid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function RequestFormActions({
  isLoading,
  isValid,
  onSubmit,
  onCancel
}: RequestFormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      <Button
        variant="secondary"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={!isValid || isLoading}
      >
        Submit Request
      </Button>
    </div>
  );
}
```