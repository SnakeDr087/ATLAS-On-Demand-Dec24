import { type VideoFile } from '../types';

interface CostBreakdown {
  basePrice: number;
  priorityFee: number;
  quantityDiscount: number;
  total: number;
  perVideoBreakdown: {
    name: string;
    duration: number;
    baseCost: number;
    durationMultiplier: number;
  }[];
}

const BASE_PRICE = 50; // Base price per video
const MINUTES_THRESHOLD = 30; // Duration threshold in minutes
const DURATION_MULTIPLIER_BASE = 1.5; // Base multiplier for videos over threshold
const DURATION_MULTIPLIER_INCREMENT = 0.5; // Additional multiplier per 30 minutes

export function calculateReviewCosts(
  videoCount: number,
  priority: 'standard' | 'priority' | 'urgent',
  totalDuration: number,
  videos: VideoFile[] = []
): CostBreakdown {
  // Calculate per-video costs with duration multipliers
  const perVideoBreakdown = videos.map(video => {
    const durationMinutes = video.duration / 60;
    const blocks = Math.ceil(durationMinutes / MINUTES_THRESHOLD);
    const durationMultiplier = blocks > 1 
      ? 1 + ((blocks - 1) * DURATION_MULTIPLIER_INCREMENT)
      : 1;
    const baseCost = BASE_PRICE * durationMultiplier;

    return {
      name: video.name,
      duration: durationMinutes,
      baseCost,
      durationMultiplier
    };
  });

  // Calculate base price total (sum of all video costs)
  const basePrice = perVideoBreakdown.reduce((sum, video) => sum + video.baseCost, 0);

  // Calculate priority fee
  const priorityFee = calculatePriorityFee(basePrice, priority);

  // Calculate quantity discount
  const quantityDiscount = calculateQuantityDiscount(videoCount, basePrice);

  // Calculate total
  const total = Math.max(0, basePrice + priorityFee - quantityDiscount);

  return {
    basePrice,
    priorityFee,
    quantityDiscount,
    total,
    perVideoBreakdown
  };
}

function calculatePriorityFee(basePrice: number, priority: string): number {
  switch (priority) {
    case 'urgent':
      return basePrice * 0.3; // 30% surcharge
    case 'priority':
      return basePrice * 0.15; // 15% surcharge
    default:
      return 0;
  }
}

function calculateQuantityDiscount(videoCount: number, basePrice: number): number {
  if (videoCount >= 50) return basePrice * 0.3; // 30% off for 50+ videos
  if (videoCount >= 20) return basePrice * 0.2; // 20% off for 20-49 videos
  if (videoCount >= 10) return basePrice * 0.1; // 10% off for 10-19 videos
  if (videoCount >= 3) return basePrice * 0.05; // 5% off for 3-9 videos
  return 0;
}