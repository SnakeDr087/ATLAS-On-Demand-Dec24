const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
const MAX_TOTAL_STORAGE = 10 * 1024 * 1024 * 1024; // 10GB

export async function checkStorageQuota(fileSize: number): Promise<boolean> {
  if (fileSize > MAX_VIDEO_SIZE) {
    throw new Error('File exceeds maximum size of 2GB');
  }

  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const { usage, quota } = await navigator.storage.estimate();
    const available = quota - usage;
    return available >= fileSize;
  }

  return true;
}

export async function cleanupOldVideos(db: IDBPDatabase) {
  const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
  const videos = await db.getAll('videos');
  
  const oldVideos = videos.filter(video => {
    const uploadDate = new Date(video.uploadDate).getTime();
    const age = Date.now() - uploadDate;
    return age > TWO_WEEKS && video.status === 'completed';
  });

  for (const video of oldVideos) {
    await db.delete('videos', video.id);
  }
}