import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { type VideoFile } from '../../types';
import { VideoPlayer } from '../VideoPlayer';
import { formatDuration, formatFileSize } from '../../utils/videoProcessing';
import { format } from 'date-fns';

interface VideoViewModalProps {
  video: VideoFile;
  onClose: () => void;
  onDownload: (video: VideoFile) => void;
}

export function VideoViewModal({ video, onClose, onDownload }: VideoViewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{video.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <VideoPlayer
              src={URL.createObjectURL(video.file)}
              title={video.name}
              onClose={() => {}}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Video Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1">{formatDuration(video.duration)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">File Size</dt>
                  <dd className="mt-1">{formatFileSize(video.size)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Upload Date</dt>
                  <dd className="mt-1">{format(new Date(video.uploadDate), 'PPP')}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Officer Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Officer</dt>
                  <dd className="mt-1">{video.officer}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1">{video.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${video.status === 'completed' ? 'bg-green-100 text-green-800' :
                        video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {video.status}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => onDownload(video)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Video
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}