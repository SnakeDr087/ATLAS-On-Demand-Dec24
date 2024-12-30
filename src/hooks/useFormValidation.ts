import { useState, useCallback } from 'react';
import { type ValidationError } from 'yup';

export function useFormValidation<T>(schema: any) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((data: T) => {
    try {
      schema.validateSync(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      (err as ValidationError).inner.forEach(error => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
      setErrors(validationErrors);
      return false;
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return { errors, validate, clearErrors };
}