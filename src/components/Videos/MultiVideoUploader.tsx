import React, { useState } from 'react';
import { Upload, X, Film, Check } from 'lucide-react';
import { type VideoFile } from '../../types';
import { formatFileSize, getVideoMetadata } from '../../utils/videoProcessing';

interface MultiVideoUploaderProps {
  videos: VideoFile[];
  onUpload: (videos: VideoFile[]) => void;
  onRemove: (id: string) => void;
}

export function MultiVideoUploader({ videos, onUpload, onRemove }: MultiVideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    const newVideos: VideoFile[] = [];
    
    for (const file of files) {
      if (file.type.startsWith('video/')) {
        try {
          const { duration } = await getVideoMetadata(file);
          newVideos.push({
            id: `video-${Date.now()}-${Math.random()}`,
            file,
            name: file.name,
            size: file.size,
            duration,
            status: 'completed',
            uploadDate: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error processing video:', error);
        }
      }
    }

    onUpload(newVideos);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    await handleFileUpload(Array.from(e.dataTransfer.files));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop video files here, or{' '}
          <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleFileUpload(files);
              }}
            />
          </label>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          MP4, MOV or AVI up to 2GB each
        </p>
      </div>

      {/* Video List */}
      {videos.length > 0 && (
        <div className="space-y-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Film className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{video.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(video.size)} • {Math.round(video.duration / 60)} minutes
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Check className="w-5 h-5 text-green-500" />
                <button
                  onClick={() => onRemove(video.id)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}