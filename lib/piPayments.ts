import axios from 'axios';
import { db } from './firebase';
import { doc, updateDoc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { PiPayment, Order, DeliveryTask } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const initiatePiPayment = async (
  userId: string,
  amount: number,
  orderId: string,
  memo: string = 'Tangible Savers Payment'
): Promise<{ paymentId: string; piTransactionId?: string }> => {
  try {
    const paymentsRef = collection(db, 'payments');
    const paymentData = {
      userId,
      orderId,
      amount,
      status: 'pending' as const,
      memo,
      createdAt: new Date(),
    };
    const paymentDoc = await addDoc(paymentsRef, paymentData);

    const backendResponse = await axios.post(`${API_BASE_URL}/api/payments/approve`, {
      paymentId: paymentDoc.id,
      userId,
      amount,
      orderId,
    });

    const piTransactionId = backendResponse.data.piTransactionId;

    const paymentRef = doc(db, 'payments', paymentDoc.id);
    await updateDoc(paymentRef, {
      piTransactionId,
      status: 'approved',
      updatedAt: new Date(),
    });

    return {
      paymentId: paymentDoc.id,
      piTransactionId,
    };
  } catch (error) {
    throw error;
  }
};

export const createPiPayment = async (amount: number, memo: string, metadata: object) => {
  if (typeof window === 'undefined' || !(window as any).Pi) {
    throw new Error('Pi SDK not loaded. Ensure the script is in your HTML.');
  }

  const paymentData = {
    amount: amount,
    memo: memo,
    metadata: metadata,
  };

  const callbacks = {
    onReadyForServerApproval: async (paymentId: string) => {
      await axios.post('/api/payments/approve', { paymentId });
    },
    onReadyForServerCompletion: async (paymentId: string, txid: string) => {
      await axios.post('/api/payments/complete', { paymentId, txid });
    },
    onCancel: (paymentId: string) => {
      // Payment was cancelled by user
    },
    onError: (error: Error) => {
      throw error;
    },
  };

  (window as any).Pi.createPayment(paymentData, callbacks);
};

export const createDeliveryTaskForOrder = async (userId: string, orderId: string): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    const orderData = orderSnap.data();

    if (!orderData) {
      throw new Error('Order not found');
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (!userData) {
      throw new Error('User not found');
    }

    const deliveryRef = collection(db, 'orders', orderId, 'deliveryTasks');
    const deliveryTask: DeliveryTask = {
      id: '',
      orderId,
      userId,
      pickupAddress: 'Warehouse Address',
      deliveryAddress: userData?.estateLocation || 'User Address',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await addDoc(deliveryRef, deliveryTask);
  } catch (error) {
    throw error;
  }
};

export const requestMover = async (
  userId: string,
  fromAddress: string,
  toAddress: string,
  movingDate: Date
): Promise<string> => {
  try {
    const moverRequestsRef = collection(db, 'moverRequests');
    const moverRequest = await addDoc(moverRequestsRef, {
      userId,
      fromAddress,
      toAddress,
      movingDate,
      status: 'pending',
      createdAt: new Date(),
    });

    return moverRequest.id;
  } catch (error) {
    throw error;
  }
};

export const getPaymentStatus = async (paymentId: string): Promise<PiPayment | null> => {
  try {
    const paymentRef = doc(db, 'payments', paymentId);
    const paymentSnap = await getDoc(paymentRef);
    
    if (!paymentSnap.exists()) {
      return null;
    }

    const paymentData = paymentSnap.data();
    return {
      id: paymentSnap.id,
      ...paymentData,
    } as PiPayment;
  } catch (error) {
    return null;
  }
};

