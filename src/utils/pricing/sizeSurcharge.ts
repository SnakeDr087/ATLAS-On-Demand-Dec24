const GB = 1024 * 1024 * 1024;
const MB = 1024 * 1024;

export function calculateSizeSurcharge(fileSize: number): number {
  if (fileSize >= GB) {
    return 20; // Over 1GB
  } else if (fileSize >= 500 * MB) {
    return 10; // Over 500MB
  }
  return 0;
}