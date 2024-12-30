import React from 'react';
import { format } from 'date-fns';
import { Download, Trash2, Play, Pause } from 'lucide-react';
import { type VideoFile } from '../../../types';

interface VideoTableRowProps {
  video: VideoFile;
  onDelete: (id: string) => void;
  onDownload: (video: VideoFile) => void;
  onStatusChange: (id: string, status: VideoFile['status']) => void;
}

export function VideoTableRow({
  video,
  onDelete,
  onDownload,
  onStatusChange
}: VideoTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {format(new Date(video.uploadDate), 'MMM d, yyyy')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{video.name}</div>
        <div className="text-sm text-gray-500">
          {(video.size / (1024 * 1024)).toFixed(2)} MB
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
          ${video.status === 'completed' ? 'bg-green-100 text-green-800' :
            video.status === 'uploading' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'}`}>
          {video.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onDownload(video)}
            className="text-gray-400 hover:text-gray-500"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
          
          {video.status === 'uploading' ? (
            <button
              onClick={() => onStatusChange(video.id, 'completed')}
              className="text-yellow-400 hover:text-yellow-500"
              title="Complete Upload"
            >
              <Play className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(video.id, 'uploading')}
              className="text-gray-400 hover:text-gray-500"
              title="Pause Upload"
            >
              <Pause className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={() => onDelete(video.id)}
            className="text-red-400 hover:text-red-500"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}