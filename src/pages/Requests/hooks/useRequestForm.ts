```typescript
import { useState } from 'react';
import { requestSchema } from '../schemas/requestSchema';
import { type ReviewRequest } from '../../../types';

export function useRequestForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRequest = (request: Partial<ReviewRequest>) => {
    try {
      requestSchema.validateSync(request, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }
  };

  return {
    errors,
    validateRequest
  };
}
```