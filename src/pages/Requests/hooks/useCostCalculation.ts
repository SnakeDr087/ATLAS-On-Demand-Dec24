```typescript
import { useCallback } from 'react';
import { calculateReviewCosts } from '../../../utils/costs';
import { type VideoFile, type ReviewRequest } from '../../../types';

export function useCostCalculation() {
  const calculateCosts = useCallback((
    videos: VideoFile[],
    priority: ReviewRequest['priority']
  ) => {
    try {
      const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
      return calculateReviewCosts(videos.length, priority, totalDuration, videos);
    } catch (err) {
      console.error('Failed to calculate costs:', err);
      return {
        basePrice: 0,
        priorityFee: 0,
        quantityDiscount: 0,
        total: 0
      };
    }
  }, []);

  return { calculateCosts };
}
```