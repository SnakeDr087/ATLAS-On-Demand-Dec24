import { useState, useCallback } from 'react';
import { type ReviewRequest, type VideoFile, type Officer } from '../../../types';
import { calculateReviewCosts } from '../../../utils/costs';

export function useRequestManagement() {
  const [request, setRequest] = useState<Partial<ReviewRequest>>({
    type: 'random',
    priority: 'standard',
    videos: [],
    officers: [],
    status: 'pending',
    cost: {
      basePrice: 0,
      priorityFee: 0,
      quantityDiscount: 0,
      total: 0
    }
  });
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
    setRequest(prev => ({ ...prev, cost: costs }));
  }, []);

  const handleVideoUpload = useCallback((videos: VideoFile[]) => {
    setRequest(prev => ({ ...prev, videos }));
    updateCosts(videos, request.priority || 'standard');
  }, [request.priority, updateCosts]);

  const handleOfficerSelection = useCallback((officers: Officer[]) => {
    setRequest(prev => ({ ...prev, officers }));
  }, []);

  const handlePriorityChange = useCallback((priority: ReviewRequest['priority']) => {
    setRequest(prev => ({ ...prev, priority }));
    updateCosts(request.videos || [], priority);
  }, [request.videos, updateCosts]);

  const handleTypeChange = useCallback((type: ReviewRequest['type']) => {
    setRequest(prev => ({ ...prev, type }));
  }, []);

  const handleSubmit = useCallback(async (data: ReviewRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add request to list
      const newRequest = {
        ...data,
        id: `request-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setRequests(prev => [...prev, newRequest]);
      setRequest({
        type: 'random',
        priority: 'standard',
        videos: [],
        officers: [],
        status: 'pending',
        cost: {
          basePrice: 0,
          priorityFee: 0,
          quantityDiscount: 0,
          total: 0
        }
      });
    } catch (err) {
      setError('Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleRandomizer = useCallback(() => {
    setShowRandomizer(prev => !prev);
  }, []);

  return {
    request,
    requests,
    isLoading,
    error,
    showRandomizer,
    handleSubmit,
    handleVideoUpload,
    handleOfficerSelection,
    handlePriorityChange,
    handleTypeChange,
    toggleRandomizer
  };
}