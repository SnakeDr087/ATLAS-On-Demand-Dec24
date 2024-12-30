import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { type VideoFile, type ReviewRequest } from '../../types';

interface AtlasDB extends DBSchema {
  videos: {
    key: string;
    value: VideoFile;
    indexes: {
      'agencyId': string;
      'uploadDate': string;
      'status': string;
    };
  };
  reports: {
    key: string;
    value: ReviewRequest;
    indexes: {
      'agencyId': string;
      'createdAt': string;
      'status': string;
    };
  };
}

const DB_NAME = 'atlas_storage';
const DB_VERSION = 1;

async function initDB() {
  return await openDB<AtlasDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('videos')) {
        const videoStore = db.createObjectStore('videos', { keyPath: 'id' });
        videoStore.createIndex('agencyId', 'agencyId');
        videoStore.createIndex('uploadDate', 'uploadDate');
        videoStore.createIndex('status', 'status');
      }
      
      if (!db.objectStoreNames.contains('reports')) {
        const reportStore = db.createObjectStore('reports', { keyPath: 'id' });
        reportStore.createIndex('agencyId', 'agencyId');
        reportStore.createIndex('createdAt', 'createdAt');
        reportStore.createIndex('status', 'status');
      }
    },
  });
}

// Video Storage Operations
export async function saveVideo(video: VideoFile): Promise<void> {
  const db = await initDB();
  await db.put('videos', video);
}

export async function getVideo(id: string): Promise<VideoFile | undefined> {
  const db = await initDB();
  return db.get('videos', id);
}

export async function getAllVideos(): Promise<VideoFile[]> {
  const db = await initDB();
  return db.getAll('videos');
}

export async function getAgencyVideos(agencyId: string): Promise<VideoFile[]> {
  const db = await initDB();
  const index = db.transaction('videos').store.index('agencyId');
  return index.getAll(agencyId);
}

export async function deleteVideo(id: string): Promise<void> {
  const db = await initDB();
  await db.delete('videos', id);
}

// Report Storage Operations
export async function saveReport(report: ReviewRequest): Promise<void> {
  const db = await initDB();
  await db.put('reports', report);
}

export async function getReport(id: string): Promise<ReviewRequest | undefined> {
  const db = await initDB();
  return db.get('reports', id);
}

export async function getAllReports(): Promise<ReviewRequest[]> {
  const db = await initDB();
  return db.getAll('reports');
}

export async function deleteReport(id: string): Promise<void> {
  const db = await initDB();
  await db.delete('reports', id);
}