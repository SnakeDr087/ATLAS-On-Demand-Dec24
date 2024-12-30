import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Download, Trash2, Edit2, Eye } from 'lucide-react';
import { type VideoFile } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { formatDuration, formatFileSize } from '../../../utils/videoProcessing';

interface VideoSpreadsheetProps {
  videos: VideoFile[];
  onDelete: (id: string) => void;
  onEdit: (video: VideoFile) => void;
  onView: (video: VideoFile) => void;
}

export function VideoSpreadsheet({ videos, onDelete, onEdit, onView }: VideoSpreadsheetProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [sortField, setSortField] = useState<keyof VideoFile>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());

  const handleSort = (field: keyof VideoFile) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedVideos = [...videos].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    return ((aValue as number) - (bValue as number)) * direction;
  });

  const handleSelectAll = () => {
    if (selectedVideos.size === videos.length) {
      setSelectedVideos(new Set());
    } else {
      setSelectedVideos(new Set(videos.map(v => v.id)));
    }
  };

  const toggleVideoSelection = (id: string) => {
    const newSelected = new Set(selectedVideos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVideos(newSelected);
  };

  const SortIcon = ({ field }: { field: keyof VideoFile }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Video Library</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-8 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectedVideos.size === videos.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {[
                  { key: 'uploadDate', label: 'Upload Date' },
                  { key: 'name', label: 'Name' },
                  { key: 'duration', label: 'Duration' },
                  { key: 'size', label: 'Size' },
                  { key: 'status', label: 'Status' },
                  { key: 'officer', label: 'Officer' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(key as keyof VideoFile)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      <SortIcon field={key as keyof VideoFile} />
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedVideos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4">
                    <input
                      type="checkbox"
                      checked={selectedVideos.has(video.id)}
                      onChange={() => toggleVideoSelection(video.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(video.uploadDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{video.name}</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDuration(video.duration)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatFileSize(video.size)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${video.status === 'completed' ? 'bg-green-100 text-green-800' :
                        video.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {video.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {video.officer}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onView(video)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => onEdit(video)}
                            className="text-blue-400 hover:text-blue-500"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(video.id)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedVideos.size} of {videos.length} videos selected
            </div>
            <div className="flex space-x-2">
              {selectedVideos.size > 0 && (
                <>
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">
                    Download Selected
                  </button>
                  {isAdmin && (
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
                      Delete Selected
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}