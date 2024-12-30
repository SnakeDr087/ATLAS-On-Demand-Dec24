import { calculateReviewCosts } from '../costs';
import { type VideoFile } from '../../types';

describe('calculateReviewCosts', () => {
  const mockVideo: VideoFile = {
    id: '1',
    name: 'test-video.mp4',
    size: 1024 * 1024, // 1MB
    duration: 1800, // 30 minutes
    status: 'completed',
    uploadDate: new Date().toISOString(),
    file: new File([], 'test-video.mp4')
  };

  test('calculates base price correctly', () => {
    const result = calculateReviewCosts(1, 'standard', 1800, [mockVideo]);
    expect(result.basePrice).toBe(50); // Base price for a single standard video
  });

  test('applies duration multiplier for longer videos', () => {
    const longVideo = { ...mockVideo, duration: 3600 }; // 60 minutes
    const result = calculateReviewCosts(1, 'standard', 3600, [longVideo]);
    expect(result.basePrice).toBe(75); // 50 * 1.5 for duration over 30 minutes
  });

  test('applies priority fees correctly', () => {
    const standardResult = calculateReviewCosts(1, 'standard', 1800, [mockVideo]);
    const priorityResult = calculateReviewCosts(1, 'priority', 1800, [mockVideo]);
    const urgentResult = calculateReviewCosts(1, 'urgent', 1800, [mockVideo]);

    expect(standardResult.priorityFee).toBe(0);
    expect(priorityResult.priorityFee).toBe(7.5); // 15% of base price
    expect(urgentResult.priorityFee).toBe(15); // 30% of base price
  });

  test('applies quantity discounts correctly', () => {
    const videos = Array(10).fill(mockVideo);
    const result = calculateReviewCosts(10, 'standard', 1800 * 10, videos);
    expect(result.quantityDiscount).toBe(50); // 10% of base price for 10+ videos
  });
});