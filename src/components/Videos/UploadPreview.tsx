import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { type VideoFile } from '../../types';
import { formatFileSize, getVideoMetadata } from '../../utils/videoProcessing';

interface VideoUploaderProps {
  file?: VideoFile;
  onUpload: (video: VideoFile) => void;
  onRemove: () => void;
}

export function VideoUploader({ file, onUpload, onRemove }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (uploadedFile: File) => {
    try {
      const { duration } = await getVideoMetadata(uploadedFile);
      const video: VideoFile = {
        id: `video-${Date.now()}`,
        file: uploadedFile,
        name: uploadedFile.name,
        size: uploadedFile.size,
        duration,
        status: 'completed',
        uploadDate: new Date().toISOString()
      };
      onUpload(video);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith('video/')) {
      await handleFileUpload(droppedFile);
    }
  };

  return (
    <div>
      {file ? (
        <div className="relative bg-gray-50 p-4 rounded-lg">
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
          
          <div>
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500">
              {formatFileSize(file.size)} • {Math.round(file.duration / 60)} minutes
            </p>
          </div>
        </div>
      ) : (
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
              />
            </label>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            MP4, MOV or AVI up to 2GB
          </p>
        </div>
      )}
    </div>
  );
}