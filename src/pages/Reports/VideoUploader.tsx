import React, { useState } from 'react';
import { Upload, X, Film, Check } from 'lucide-react';
import { type VideoFile } from '../../types';

export function VideoUploader() {
  const [files, setFiles] = useState<VideoFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('video/'))
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading' as const,
        duration: 0
      }));

    setFiles(prev => [...prev, ...droppedFiles]);
    processFiles(droppedFiles);
  };

  const processFiles = async (newFiles: VideoFile[]) => {
    for (const fileData of newFiles) {
      try {
        // Simulate file processing and upload
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get video duration
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(fileData.file);
        await new Promise(resolve => {
          video.onloadedmetadata = () => {
            fileData.duration = video.duration;
            resolve(null);
          };
        });

        setFiles(prev => 
          prev.map(f => 
            f.id === fileData.id 
              ? { ...f, status: 'completed', progress: 100 } 
              : f
          )
        );
      } catch (error) {
        setFiles(prev =>
          prev.map(f =>
            f.id === fileData.id
              ? { ...f, status: 'error', progress: 0 }
              : f
          )
        );
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Videos</h2>
      
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        `}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Drag and drop video files here, or{' '}
          <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
            browse
            <input
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files || [])
                  .map(file => ({
                    id: Math.random().toString(36).substr(2, 9),
                    file,
                    name: file.name,
                    size: file.size,
                    progress: 0,
                    status: 'uploading' as const,
                    duration: 0
                  }));
                setFiles(prev => [...prev, ...selectedFiles]);
                processFiles(selectedFiles);
              }}
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: MP4, MOV, AVI (max 2GB per file)
        </p>
      </div>

      {/* File List */}
      <div className="mt-6 space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Film className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                  {file.duration ? ` • ${Math.round(file.duration)}s` : ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {file.status === 'uploading' && (
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}
              {file.status === 'completed' && (
                <Check className="w-5 h-5 text-green-500" />
              )}
              <button
                onClick={() => removeFile(file.id)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}