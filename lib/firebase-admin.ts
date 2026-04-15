import admin from 'firebase-admin';
import { NextRequest } from 'next/server';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.error('FIREBASE_SERVICE_ACCOUNT_JSON env var is required for admin SDK');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
    console.log('Firebase Admin SDK initialized');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    process.exit(1);
  }
}

// Export helpers for API routes
export const verifyIdToken = async (token: string) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken;
};

export const getAdminFirestore = () => admin.firestore();

export const getAdminAuth = () => admin.auth();

// Middleware helper to verify auth header
export const getAuthUser = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new Error('No token provided');
  }
  return await verifyIdToken(token);
};
