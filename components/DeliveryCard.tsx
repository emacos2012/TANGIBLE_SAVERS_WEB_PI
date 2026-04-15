'use client';

interface DeliveryCardProps {
  title: string;
  address: string;
  time: string;
  type: 'pickup' | 'dropoff';
  contactPhone?: string;
}

export default function DeliveryCard({ 
  title, 
  address, 
  time, 
  type,
  contactPhone 
}: DeliveryCardProps) {
  const isPickup = type === 'pickup';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${isPickup ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-green-100 dark:bg-green-900'}`}>
          <span className="text-xl">{isPickup ? '📍' : '🏠'}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-semibold text-sm ${isPickup ? 'text-yellow-700 dark:text-yellow-400' : 'text-green-700 dark:text-green-400'}`}>
              {isPickup ? '📤' : '📥'} {title}
            </h4>
            <span className={`px-2 py-0.5 rounded text-xs font-medium
              ${isPickup 
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' 
                : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              }`}>
              {isPickup ? 'Pickup' : 'Delivery'}
            </span>
          </div>
          
          <p className="text-gray-900 dark:text-white mt-2 text-sm font-medium">
            {address}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <span>🕐</span>
              <span>{time}</span>
            </div>
            
            {contactPhone && (
              <a 
                href={`tel:${contactPhone}`}
                className="flex items-center gap-1 text-sm text-[#1A237E] dark:text-[#FFD700] hover:underline"
              >
                <span>📞</span>
                Contact
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Map preview placeholder */}
      <div className="mt-3 h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
        <span className="text-gray-400 text-sm">
          {isPickup ? 'View pickup on map' : 'View delivery on map'}
        </span>
      </div>
    </div>
  );
}
