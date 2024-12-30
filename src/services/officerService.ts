import { openDB } from 'idb';
import { type Officer } from '../types';

const DB_NAME = 'atlas_officers';
const STORE_NAME = 'officers';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('lastReviewed', 'lastReviewed');
        store.createIndex('badge', 'badge', { unique: true });
        store.createIndex('agency', 'agency');
      }
    },
  });
}

export async function addOfficer(officer: Omit<Officer, 'id'>): Promise<Officer> {
  const db = await getDB();
  const id = `officer-${Date.now()}`;
  const newOfficer = { ...officer, id };
  await db.add(STORE_NAME, newOfficer);
  return newOfficer;
}

export async function getAllOfficers(): Promise<Officer[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function importRoster(officers: Officer[]) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  
  for (const officer of officers) {
    await tx.store.put(officer);
  }
  
  await tx.done;
}

export async function getEligibleOfficers(criteria: {
  agencyId: string;
  excludeRecentlyReviewed: boolean;
  count: number;
}) {
  const db = await getDB();
  let officers = await db.getAllFromIndex(STORE_NAME, 'agency', criteria.agencyId);

  if (criteria.excludeRecentlyReviewed) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    officers = officers.filter(officer => {
      if (!officer.lastReviewed) return true;
      return new Date(officer.lastReviewed) < thirtyDaysAgo;
    });
  }

  // Randomly select officers
  const shuffled = [...officers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, criteria.count);
}

export async function updateLastReviewed(officerIds: string[]) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  
  for (const id of officerIds) {
    const officer = await tx.store.get(id);
    if (officer) {
      officer.lastReviewed = new Date().toISOString();
      await tx.store.put(officer);
    }
  }
  
  await tx.done;
}

export async function updateOfficer(officer: Officer): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, officer);
}

export async function deleteOfficer(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}