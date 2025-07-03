import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 animate-pulse">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="flex space-x-4">
              <div className="h-3 bg-gray-700 rounded w-24"></div>
              <div className="h-3 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="ml-4 w-24 h-24 bg-gray-700 rounded-lg"></div>
        </div>

        {/* Risk meter skeleton */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-700 rounded w-48"></div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3"></div>
          </div>
        </div>

        {/* Content cards skeleton */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-24"></div>
            <div className="h-6 bg-gray-600 rounded w-32"></div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-24"></div>
            <div className="h-6 bg-gray-600 rounded w-32"></div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="h-3 bg-gray-700 rounded w-40"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;