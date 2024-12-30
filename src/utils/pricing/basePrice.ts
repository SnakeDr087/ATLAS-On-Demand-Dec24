import { type VideoFile } from '../../types';

export function calculateBasePrice(duration: number): number {
  if (duration <= 1800) { // 30 minutes or less
    return 50;
  } else if (duration <= 3600) { // 31-60 minutes
    return 75;
  } else if (duration <= 5400) { // 61-90 minutes
    return 100;
  } else { // Over 90 minutes
    return 125;
  }
}