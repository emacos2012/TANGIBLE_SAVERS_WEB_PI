import { User as FirebaseUser } from 'firebase/auth';
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from './types';

export const isPiSDKReady = (): boolean => {
  return !!(window as any).__PI_SDK_READY__ || !!(window as any).Pi;
};

export const initializePiSDK = async (): Promise<void> => {
  try {
    const pi = (window as any).Pi;
    if (!pi) {
      return;
    }
    await pi.init({ version: '2.0', appName: 'Tangible Savers' });
  } catch (error) {
    // Silent fail - SDK will be used when available
  }
};

export const authenticateWithPiSDK = async (): Promise<{ piUid: string; username: string }> => {
  const pi = (window as any).Pi;
  
  if (!pi) {
    throw new Error('Pi SDK is still loading. Please try again in a moment.');
  }

  const piAuth = await pi.authenticate(['username']);
  
  return {
    piUid: piAuth.accessToken || piAuth.user?.uid || String(Math.random()),
    username: piAuth.user?.username || 'PiUser',
  };
};

export const syncUserWithFirebase = async (
  firebaseUser: FirebaseUser,
  piUid: string,
  username: string
): Promise<User> => {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  const userData: User = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    username: username,
    piUid: piUid,
    estateLocation: '',
    savedAssets: [],
    createdAt: userSnap.exists() ? (userSnap.data() as any).createdAt : new Date(),
    updatedAt: new Date(),
  };

  await setDoc(userRef, userData, { merge: true });
  return userData;
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data() as User;
  } catch (error) {
    return null;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<User>): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: new Date(),
  });
};

export const linkUserToEstate = async (uid: string, estateId: string, estateLocation: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    estateLocation: estateLocation,
    updatedAt: new Date(),
  });

  const propertyRef = doc(db, `users/${uid}/properties`, estateId);
  await setDoc(propertyRef, {
    estateId,
    linkedAt: new Date(),
  });
};

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY;

export const validateAdminApiKey = (apiKey: string): boolean => {
  if (!ADMIN_API_KEY) {
    return false;
  }
  return apiKey === ADMIN_API_KEY;
};

export const authenticateAdminWithPiSDK = async (apiKey: string): Promise<{ piUid: string; username: string; isValid: boolean }> => {
  if (!validateAdminApiKey(apiKey)) {
    throw new Error('Invalid admin API key');
  }

  const pi = (window as any).Pi;
  
  if (!pi) {
    throw new Error('Pi SDK is still loading. Please try again in a moment.');
  }

  await pi.init({ version: '2.0', appName: 'Tangible Savers' });
  const piAuth = await pi.authenticate(['username']);
  
  return {
    piUid: piAuth.accessToken || piAuth.user?.uid || String(Math.random()),
    username: piAuth.user?.username || 'PiAdmin',
    isValid: true,
  };
};

