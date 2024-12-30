import React, { useState } from 'react';
import { calculateReviewCosts } from '../../utils/costs';
import { type VideoFile } from '../../types';

export function CostCalculatorDemo() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [priority, setPriority] = useState<'standard' | 'priority' | 'urgent'>('standard');

  const addTestVideo = () => {
    const newVideo: VideoFile = {
      id: `video-${Date.now()}`,
      name: `Test Video ${videos.length + 1}`,
      size: 1024 * 1024 * 100, // 100MB
      duration: 1800, // 30 minutes
      status: 'completed',
      uploadDate: new Date().toISOString(),
      file: new File([], `test-video-${videos.length + 1}.mp4`)
    };
    setVideos([...videos, newVideo]);
  };

  const costs = calculateReviewCosts(
    videos.length,
    priority,
    videos.reduce((acc, video) => acc + video.duration, 0),
    videos
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Cost Calculator Demo</h2>

      <div className="space-y-6">
        <div>
          <button
            onClick={addTestVideo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Test Video
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority Level
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as typeof priority)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="standard">Standard (14 days)</option>
            <option value="priority">Priority (7 days)</option>
            <option value="urgent">Urgent (48 hours)</option>
          </select>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-4">Cost Breakdown</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${costs.basePrice.toFixed(2)}</span>
            </div>
            
            {costs.priorityFee > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>Priority Fee:</span>
                <span>+${costs.priorityFee.toFixed(2)}</span>
              </div>
            )}
            
            {costs.quantityDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Quantity Discount:</span>
                <span>-${costs.quantityDiscount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total:</span>
              <span>${costs.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {videos.length > 0 && (
          <div>
            <h3 className="font-medium mb-4">Videos</h3>
            <div className="space-y-2">
              {videos.map((video) => (
                <div key={video.id} className="flex justify-between text-sm">
                  <span>{video.name}</span>
                  <span>{Math.round(video.duration / 60)} minutes</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}