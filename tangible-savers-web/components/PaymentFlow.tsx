'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface PaymentFlowProps {
  amount: number;
  memo: string;
  onSuccess?: (txid: string) => void;
  onError?: (error: string) => void;
}

type PaymentStatus = 'idle' | 'creating' | 'approved' | 'completed' | 'failed';

const PaymentFlow: React.FC<PaymentFlowProps> = ({ amount, memo, onSuccess, onError }) => {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [paymentId, setPaymentId] = useState<string>('');
  const [txid, setTxid] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePayment = async () => {
    if (typeof window === 'undefined' || !(window as any).Pi) {
      setErrorMessage('Pi SDK not loaded. Please refresh and try again.');
      setStatus('failed');
      onError?.('Pi SDK not loaded');
      return;
    }

    try {
      setStatus('creating');
      setErrorMessage('');

      const paymentData = {
        amount: amount,
        memo: memo,
        metadata: { orderId: `order_${Date.now()}` },
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          setPaymentId(paymentId);
          setStatus('approved');
          
          try {
            await axios.post('/api/payments/approve', { paymentId });
          } catch (error) {
            console.error('Failed to approve payment:', error);
          }
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          setTxid(txid);
          
          try {
            await axios.post('/api/payments/complete', { paymentId, txid });
            setStatus('completed');
            onSuccess?.(txid);
          } catch (error) {
            setStatus('failed');
            setErrorMessage('Payment verification failed');
            onError?.('Payment verification failed');
          }
        },
        onCancel: (paymentId: string) => {
          setStatus('idle');
          setErrorMessage('Payment was cancelled');
          onError?.('Payment cancelled');
        },
        onError: (error: Error) => {
          setStatus('failed');
          setErrorMessage(error.message || 'Payment failed');
          onError?.(error.message || 'Payment failed');
        },
      };

      (window as any).Pi.createPayment(paymentData, callbacks);
    } catch (error) {
      setStatus('failed');
      const message = error instanceof Error ? error.message : 'Payment initialization failed';
      setErrorMessage(message);
      onError?.(message);
    }
  };

  if (status === 'completed') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
          Payment Successful!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Transaction ID: <span className="font-mono text-xs">{txid}</span>
        </p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <div className="text-red-500 text-5xl mb-4">✕</div>
        <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
          Payment Failed
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {errorMessage}
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setErrorMessage('');
          }}
          className="bg-[#1A237E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#283593] transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Pay with Pi
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="text-2xl font-bold text-[#1A237E] dark:text-[#FFD700]">
            {amount} π
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Memo:</span>
          <span className="text-gray-900 dark:text-white">{memo}</span>
        </div>
      </div>

      {status === 'creating' && (
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-[#1A237E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Creating payment...</p>
        </div>
      )}

      {status === 'approved' && (
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Waiting for payment confirmation...</p>
        </div>
      )}

      {status === 'idle' && (
        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-[#1A237E] to-[#283593] text-white py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <span>🥧</span>
          <span>Pay {amount} Pi</span>
        </button>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default PaymentFlow;
