'use client';

import { Driver } from '@/lib/types';

interface DriverInfoProps {
  driver: Driver;
  onCall?: () => void;
  onMessage?: () => void;
}

export default function DriverInfo({ driver, onCall, onMessage }: DriverInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-[#1A237E] dark:text-[#FFD700] flex items-center gap-2">
        <span>🚚</span> Driver Information
      </h3>
      
      <div className="flex items-start gap-4">
        {/* Driver avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-[#1A237E] dark:bg-[#FFD700] rounded-full flex items-center justify-center text-white dark:text-[#1A237E] text-2xl font-bold">
            {driver.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        {/* Driver details */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
            {driver.name}
          </h4>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium text-gray-900 dark:text-white">{driver.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">rating</span>
          </div>
          
          {/* Vehicle info */}
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p>🚗 {driver.vehicle}</p>
            <p>🔢 {driver.plate}</p>
          </div>
        </div>
      </div>
      
      {/* Contact buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={onCall}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          <span>📞</span> Call
        </button>
        <button
          onClick={onMessage}
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          <span>💬</span> Message
        </button>
      </div>
      
      {/* Safety note */}
      <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400 text-center">
        🛡️ Driver verified • ID: {driver.id.slice(0, 8)}...
      </div>
    </div>
  );
}
