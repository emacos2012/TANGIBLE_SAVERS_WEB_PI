'use client';

export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-gray-200"></div>
      
      {/* Hero skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Cards skeleton */}
      <div className="p-6 grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Bottom nav skeleton */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-200"></div>
    </div>
  );
};
