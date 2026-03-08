
// Browser-compatible encryption using Web Crypto API
// Note: For server-side operations, use Node.js crypto in API routes

/**
 * Convert string to ArrayBuffer
 */
const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
};

/**
 * Convert ArrayBuffer to string
 */
const arrayBufferToString = (buffer: ArrayBuffer): string => {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
};

/**
 * Convert ArrayBuffer to Base64 string
 */
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * Convert Base64 string to ArrayBuffer
 */
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Generate a crypto key from password (PBKDF2)
 */
const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

// Encryption key from environment variable
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'tangiblesavers-secret-key-32bytes!';

/**
 * Encrypt sensitive data using AES-GCM
 * @param data - Object or string to encrypt
 * @returns Encrypted string with IV prepended (base64 format)
 */
export const encryptData = async (data: object | string): Promise<string> => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(ENCRYPTION_KEY, salt);

    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      stringToArrayBuffer(jsonString)
    );

    // Combine salt + iv + encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

    return arrayBufferToBase64(combined.buffer);
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypt data that was encrypted with encryptData
 * @param encryptedData - Encrypted string (base64 format)
 * @returns Decrypted object or string
 */
export const decryptData = async (encryptedData: string): Promise<object | string> => {
  try {
    const combined = new Uint8Array(base64ToArrayBuffer(encryptedData));
    
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);

    const key = await deriveKey(ENCRYPTION_KEY, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );

    const decrypted = arrayBufferToString(decryptedBuffer);

    // Try to parse as JSON, otherwise return string
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Hash sensitive data (one-way, for passwords)
 * @param data - String to hash
 * @returns Hashed string
 */
export const hashData = async (data: string): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(data));
  return arrayBufferToBase64(hashBuffer);
};

/**
 * Generate a secure random token
 * @param length - Length of the token (default: 32)
 * @returns Random token in hex format
 */
export const generateToken = (length: number = 32): string => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Mask sensitive data for display
 * @param data - Data to mask (e.g., wallet address, phone)
 * @param visibleChars - Number of characters to show at the end
 * @returns Masked string
 */
export const maskData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }
  const masked = '*'.repeat(data.length - visibleChars);
  return masked + data.slice(-visibleChars);
};

/**
 * Validate data integrity using HMAC
 * @param data - Data to validate
 * @param signature - Expected signature
 * @returns Boolean indicating if signature is valid
 */
export const verifySignature = async (data: string, signature: string): Promise<boolean> => {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(ENCRYPTION_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBuffer = base64ToArrayBuffer(signature);
  const dataBuffer = stringToArrayBuffer(data);

  return crypto.subtle.verify(
    { name: 'HMAC', hash: 'SHA-256' },
    key,
    signatureBuffer,
    dataBuffer
  );
};

/**
 * Create HMAC signature for data
 * @param data - Data to sign
 * @returns Signature
 */
export const createSignature = async (data: string): Promise<string> => {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(ENCRYPTION_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    stringToArrayBuffer(data)
  );

  return arrayBufferToBase64(signatureBuffer);
};


