import { useState, useCallback } from 'react';
import { type ReviewRequest, type VideoFile, type Officer } from '../types';
import { calculateReviewCosts } from '../utils/costs';
import { useRequestForm } from './requests/useRequestForm';

export function useRequestManagement() {
  const { formData: request, errors, setFormValue, validateForm } = useRequestForm();
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRandomizer, setShowRandomizer] = useState(false);

  const updateCosts = useCallback((
    videos: VideoFile[],
    priority: ReviewRequest['priority']
  ) => {
    const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
    const costs = calculateReviewCosts(videos.length, priority, totalDuration, videos);
    setFormValue('cost', costs);
  }, [setFormValue]);

  const handleVideoUpload = useCallback((videos: VideoFile[]) => {
    setFormValue('videos', videos);
    updateCosts(videos, request.priority || 'standard');
  }, [request.priority, updateCosts, setFormValue]);

  const handleOfficerSelection = useCallback((officers: Officer[]) => {
    setFormValue('officers', officers);
  }, [setFormValue]);

  const handlePriorityChange = useCallback((priority: ReviewRequest['priority']) => {
    setFormValue('priority', priority);
    updateCosts(request.videos || [], priority);
  }, [request.videos, updateCosts, setFormValue]);

  const handleTypeChange = useCallback((type: ReviewRequest['type']) => {
    setFormValue('type', type);
  }, [setFormValue]);

  const handleDetailsChange = useCallback((updates: {
    incidentDate?: string;
    caseNumber?: string;
    description?: string;
  }) => {
    Object.entries(updates).forEach(([key, value]) => {
      setFormValue(key as keyof ReviewRequest, value);
    });
  }, [setFormValue]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const newRequest = {
        ...request,
        id: `request-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      } as ReviewRequest;
      
      setRequests(prev => [...prev, newRequest]);
      
      // Reset form
      setFormValue('type', 'random');
      setFormValue('priority', 'standard');
      setFormValue('videos', []);
      setFormValue('officers', []);
      setFormValue('cost', {
        basePrice: 0,
        priorityFee: 0,
        quantityDiscount: 0,
        total: 0
      });
    } catch (err) {
      setError('Failed to submit request');
      console.error('Request submission error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [request, setFormValue, validateForm]);

  const toggleRandomizer = useCallback(() => {
    setShowRandomizer(prev => !prev);
  }, []);

  return {
    request,
    requests,
    isLoading,
    error,
    errors,
    showRandomizer,
    handleSubmit,
    handleVideoUpload,
    handleOfficerSelection,
    handlePriorityChange,
    handleTypeChange,
    handleDetailsChange,
    toggleRandomizer
  };
}