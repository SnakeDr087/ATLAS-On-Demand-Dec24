import React from 'react';
import { VideoUploader } from '../VideoUploader';
import { type VideoFile } from '../../../../types';

interface VideoSectionProps {
  videos: VideoFile[];
  onUpload: (videos: VideoFile[]) => void;
  error?: string;
}

export function VideoSection({ videos, onUpload, error }: VideoSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Videos</h3>
      <VideoUploader
        videos={videos}
        onUpload={onUpload}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}