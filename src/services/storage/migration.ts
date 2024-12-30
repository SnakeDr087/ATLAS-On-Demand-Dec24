import { openDB } from 'idb';
import { type AtlasDB } from './db';

interface MigrationStep {
  version: number;
  migrate: (db: IDBPDatabase<AtlasDB>) => Promise<void>;
}

const migrations: MigrationStep[] = [
  {
    version: 1,
    migrate: async (db) => {
      // Initial schema
      if (!db.objectStoreNames.contains('videos')) {
        db.createObjectStore('videos', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('reports')) {
        db.createObjectStore('reports', { keyPath: 'id' });
      }
    }
  },
  {
    version: 2,
    migrate: async (db) => {
      // Add indexes for better querying
      const videoStore = db.transaction('videos').objectStore('videos');
      if (!videoStore.indexNames.contains('uploadDate')) {
        videoStore.createIndex('uploadDate', 'uploadDate');
      }
      if (!videoStore.indexNames.contains('status')) {
        videoStore.createIndex('status', 'status');
      }
    }
  }
];

export async function migrateDatabase() {
  const latestVersion = Math.max(...migrations.map(m => m.version));
  
  const db = await openDB<AtlasDB>('atlas_storage', latestVersion, {
    upgrade: async (db, oldVersion, newVersion) => {
      for (const migration of migrations) {
        if (migration.version > oldVersion) {
          await migration.migrate(db);
        }
      }
    }
  });

  return db;
}