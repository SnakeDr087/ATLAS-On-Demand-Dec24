import { Buffer } from 'buffer';

const ENCRYPTION_KEY = 'atlas-encryption-key';

async function getEncryptionKey(): Promise<CryptoKey> {
  // Get or generate encryption key
  let key = localStorage.getItem(ENCRYPTION_KEY);
  if (!key) {
    const newKey = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const exportedKey = await window.crypto.subtle.exportKey('raw', newKey);
    key = Buffer.from(exportedKey).toString('base64');
    localStorage.setItem(ENCRYPTION_KEY, key);
  }

  const keyBuffer = Buffer.from(key, 'base64');
  return window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptData(data: any): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
  const key = await getEncryptionKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  return { encrypted, iv };
}

export async function decryptData(encrypted: ArrayBuffer, iv: Uint8Array): Promise<any> {
  const key = await getEncryptionKey();
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );

  const decoded = new TextDecoder().decode(decrypted);
  return JSON.parse(decoded);
}