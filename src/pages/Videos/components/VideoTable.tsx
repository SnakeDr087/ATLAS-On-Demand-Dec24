import React, { useState } from 'react';
import { format } from 'date-fns';
import { VideoTableHeader } from './VideoTableHeader';
import { VideoTableRow } from './VideoTableRow';
import { type VideoFile } from '../../../types';
import { type SortField, type SortDirection } from '../types';

interface VideoTableProps {
  videos: VideoFile[];
  onDelete: (id: string) => void;
  onDownload: (video: VideoFile) => void;
  onStatusChange: (id: string, status: VideoFile['status']) => void;
}

export function VideoTable({
  videos,
  onDelete,
  onDownload,
  onStatusChange
}: VideoTableProps) {
  const [sortField, setSortField] = useState<SortField>('uploadDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedVideos = [...videos].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'uploadDate':
        comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        break;
      case 'duration':
        comparison = a.duration - b.duration;
        break;
      default:
        comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <VideoTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedVideos.map((video) => (
              <VideoTableRow
                key={video.id}
                video={video}
                onDelete={onDelete}
                onDownload={onDownload}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing {videos.length} videos
        </p>
      </div>
    </div>
  );
}