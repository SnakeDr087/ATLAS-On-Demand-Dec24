import { useState } from 'react';
import { type ReviewRequest } from '../../types';

export function useRequestState() {
  const [request, setRequest] = useState<ReviewRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRandomizer, setShowRandomizer] = useState(false);

  const toggleRandomizer = () => setShowRandomizer(prev => !prev);
  const clearError = () => setError(null);

  return {
    request,
    setRequest,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
    showRandomizer,
    toggleRandomizer
  };
}