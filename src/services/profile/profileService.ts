import { type UserProfile } from '../../types/user';
import { openDB } from 'idb';

const DB_NAME = 'atlas_profiles';
const STORE_NAME = 'profiles';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveProfile(userId: string, profile: UserProfile): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, { id: userId, ...profile });
  
  // Update local storage for auth context
  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
  const updatedUser = {
    ...authUser,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    photoUrl: profile.photoUrl
  };
  localStorage.setItem('auth_user', JSON.stringify(updatedUser));
}

export async function getProfile(userId: string): Promise<UserProfile | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, userId);
}