import { useState } from 'react';
import { type ReviewRequest } from '../../types';

const DEFAULT_REQUEST: Partial<ReviewRequest> = {
  type: 'random',
  priority: 'standard',
  videos: [],
  officers: [],
  status: 'pending',
  description: '',
  incidentDate: '',
  caseNumber: '',
  cost: {
    basePrice: 0,
    priorityFee: 0,
    quantityDiscount: 0,
    total: 0
  }
};

export function useRequestForm() {
  const [formData, setFormData] = useState<Partial<ReviewRequest>>(DEFAULT_REQUEST);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setFormValue = <K extends keyof ReviewRequest>(
    field: K,
    value: ReviewRequest[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.videos?.length) {
      newErrors.videos = 'At least one video is required';
    }

    if (!formData.officers?.length) {
      newErrors.officers = 'At least one officer must be selected';
    }

    if (!formData.type) {
      newErrors.type = 'Review type is required';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(DEFAULT_REQUEST);
    setErrors({});
  };

  return {
    formData,
    errors,
    setFormValue,
    validateForm,
    resetForm
  };
}