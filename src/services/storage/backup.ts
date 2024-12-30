import { getAllVideos, getAllReports } from './db';
import { encryptData, decryptData } from './encryption';

export async function createBackup(): Promise<Blob> {
  // Get all data
  const videos = await getAllVideos();
  const reports = await getAllReports();

  const backup = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    data: {
      videos,
      reports
    }
  };

  // Encrypt backup
  const { encrypted, iv } = await encryptData(backup);

  // Create backup file
  const backupData = {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted))
  };

  return new Blob([JSON.stringify(backupData)], { type: 'application/json' });
}

export async function restoreBackup(file: File): Promise<void> {
  const text = await file.text();
  const { iv, data } = JSON.parse(text);

  // Decrypt backup
  const decrypted = await decryptData(
    new Uint8Array(data).buffer,
    new Uint8Array(iv)
  );

  // Validate backup format
  if (!decrypted.version || !decrypted.data) {
    throw new Error('Invalid backup file format');
  }

  // Restore data
  for (const video of decrypted.data.videos) {
    await saveVideo(video);
  }

  for (const report of decrypted.data.reports) {
    await saveReport(report);
  }
}