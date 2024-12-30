import React from 'react';
import { type RequestDetailsProps } from './types';

export function RequestDetails({ request }: RequestDetailsProps) {
  return (
    <div className="space-y-4">
      {request.videos && request.videos.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Videos</h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {request.videos.map((video) => (
              <li key={video.id} className="py-2">
                <p className="text-sm text-gray-600">{video.name}</p>
                <p className="text-xs text-gray-500">
                  {(video.size / (1024 * 1024)).toFixed(2)} MB • 
                  {Math.round(video.duration)}s
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {request.cost && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Cost Breakdown</h4>
          <dl className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Base Price</dt>
              <dd className="text-sm text-gray-900">
                ${request.cost.basePrice.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Total</dt>
              <dd className="text-sm font-medium text-blue-600">
                ${request.cost.total.toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}