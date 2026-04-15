'use client';

import { TrackingEvent } from '@/lib/types';

interface TrackingTimelineProps {
  events: TrackingEvent[];
  currentStatus: string;
}

const statusOrder = [
  'ordered',
  'confirmed', 
  'preparing',
  'dispatched',
  'on_the_way',
  'arriving',
  'delivered'
];

const statusLabels: Record<string, string> = {
  ordered: 'Order Placed',
  confirmed: 'Order Confirmed',
  preparing: 'Preparing Order',
  dispatched: 'Driver Assigned',
  on_the_way: 'On the Way',
  arriving: 'Arriving Soon',
  delivered: 'Delivered'
};

const statusIcons: Record<string, string> = {
  ordered: '📝',
  confirmed: '✅',
  preparing: '👨‍🍳',
  dispatched: '🚚',
  on_the_way: '🛣️',
  arriving: '📍',
  delivered: '🏠'
};

export default function TrackingTimeline({ events, currentStatus }: TrackingTimelineProps) {
  const currentStatusIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="timeline-container">
      <h3 className="text-lg font-semibold mb-4 text-[#1A237E] dark:text-[#FFD700]">
        📦 Delivery Progress
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="space-y-6">
          {events.map((event, index) => {
            const eventStatusIndex = statusOrder.indexOf(event.status);
            const isCompleted = eventStatusIndex <= currentStatusIndex;
            const isCurrent = eventStatusIndex === currentStatusIndex;
            
            return (
              <div key={event.id} className="relative flex items-start pl-10">
                {/* Timeline dot */}
                <div 
                  className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center z-10
                    ${isCompleted 
                      ? isCurrent 
                        ? 'bg-green-500 ring-4 ring-green-200 dark:ring-green-800' 
                        : 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  {isCompleted ? (
                    <span className="text-white text-sm">
                      {isCurrent ? '⏳' : '✓'}
                    </span>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400 text-xs">
                      {index + 1}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <div className={`flex-1 pb-6 ${!isCompleted ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{statusIcons[event.status] || '📦'}</span>
                    <h4 className={`font-semibold ${isCompleted ? 'text-green-700 dark:text-green-400' : 'text-gray-500'}`}>
                      {event.title}
                    </h4>
                    {isCurrent && (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress summary */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-800 dark:text-blue-300">Progress</span>
          <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
            {Math.round((currentStatusIndex / (statusOrder.length - 1)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
          <div 
            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(currentStatusIndex / (statusOrder.length - 1)) * 100}%` 
            }}
          ></div>
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
          {statusLabels[currentStatus] || 'In Progress'} - Keep an eye on the map!
        </p>
      </div>
    </div>
  );
}
