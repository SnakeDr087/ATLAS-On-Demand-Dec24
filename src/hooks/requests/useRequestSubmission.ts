import { type ReviewRequest } from '../../types';
import { saveReport } from '../../services/storage/db';

export function useRequestSubmission() {
  const submitRequest = async (
    data: ReviewRequest,
    callbacks: {
      onStart: () => void;
      onSuccess: (request: ReviewRequest) => void;
      onError: (error: string) => void;
      onFinish: () => void;
    }
  ): Promise<boolean> => {
    try {
      callbacks.onStart();

      const newRequest = {
        ...data,
        id: `request-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      };

      await saveReport(newRequest);
      callbacks.onSuccess(newRequest);
      return true;
    } catch (err) {
      callbacks.onError('Failed to submit request');
      console.error('Request submission error:', err);
      return false;
    } finally {
      callbacks.onFinish();
    }
  };

  return { submitRequest };
}