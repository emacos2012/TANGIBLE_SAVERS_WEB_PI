'use client';

import { useState } from 'react';

interface PaymentQRProps {
  userId?: string;
}

export default function PaymentQR({ userId }: PaymentQRProps) {
  const [showQR, setShowQR] = useState(false);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  // Generate a mock QR code data URL (in production, use a real QR library)
  const generateQRCode = () => {
    // This would normally generate an actual QR code
    // For demo purposes, we'll show a placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMDAwIj5RVyBDb2RlPC90ZXh0Pjwvc3ZnPg==';
  };

  const handleGenerateQR = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowQR(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">QR Payment</h2>
          <p className="text-gray-500">Scan to pay with Pi</p>
        </div>
      </div>

      {!showQR ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (π)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Memo (optional)</label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="What's this payment for?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <button
            onClick={handleGenerateQR}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full bg-gold hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: amount && parseFloat(amount) > 0 ? '#FFD700' : '#d1d5db' }}
          >
            Generate QR Code
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 inline-block mb-4">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-navy" viewBox="0 0 100 100" style={{ color: '#1A237E' }}>
                <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
                <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
                <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
                <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-3xl font-bold text-navy" style={{ color: '#1A237E' }}>π {parseFloat(amount).toFixed(2)}</p>
          </div>
          
          {memo && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Memo</p>
              <p className="font-medium">{memo}</p>
            </div>
          )}
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-700">
              📱 Show this QR code to the merchant
            </p>
          </div>
          
          <button
            onClick={() => setShowQR(false)}
            className="w-full bg-navy hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: '#1A237E' }}
          >
            Generate New QR
          </button>
        </div>
      )}

      {/* How it works */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-3">How QR Payment Works</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#FFD700' }}>1</div>
            <p className="text-gray-600">Enter payment amount</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#FFD700' }}>2</div>
            <p className="text-gray-600">Generate QR code</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#FFD700' }}>3</div>
            <p className="text-gray-600">Merchant scans your QR</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#FFD700' }}>4</div>
            <p className="text-gray-600">Payment completed instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
