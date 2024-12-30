export function calculateVolumeDiscount(videoCount: number, baseTotal: number): number {
  if (videoCount >= 5) {
    return baseTotal * 0.10; // 10% discount
  } else if (videoCount >= 2) {
    return baseTotal * 0.05; // 5% discount
  }
  return 0;
}