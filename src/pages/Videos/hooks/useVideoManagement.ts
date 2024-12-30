import { useState, useMemo } from 'react';
import { type VideoFile } from '../../../types';
import { type VideoFilterOptions } from '../types';

const initialFilters: VideoFilterOptions = {
  type: 'all',
  status: 'all',
  officer: 'all',
  dateRange: 'all'
};

// Mock data for development
const mockVideos: VideoFile[] = [
  {
    id: '1',
    file: new File([], 'video1.mp4'),
    name: 'Traffic Stop 2024-03-01.mp4',
    size: 256000000,
    duration: 1800,
    progress: 100,
    status: 'completed',
    type: 'Traffic Stop',
    officer: 'John Smith',
    uploadDate: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    file: new File([], 'video2.mp4'),
    name: 'Patrol 2024-03-02.mp4',
    size: 512000000,
    duration: 3600,
    progress: 100,
    status: 'completed',
    type: 'Patrol',
    officer: 'Jane Doe',
    uploadDate: '2024-03-02T15:30:00Z'
  }
];

export function useVideoManagement() {
  const [videos, setVideos] = useState<VideoFile[]>(mockVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<VideoFilterOptions>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Search term filter
      const searchLower = searchTerm.toLowerCase();
      if (searchTerm && !Object.values(video).some(value => 
        String(value).toLowerCase().includes(searchLower)
      )) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && video.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && video.status !== filters.status) {
        return false;
      }

      // Officer filter
      if (filters.officer !== 'all' && video.officer !== filters.officer) {
        return false;
      }

      return true;
    });
  }, [videos, searchTerm, filters]);

  const handleDeleteVideo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(prev => prev.filter(video => video.id !== id));
    }
  };

  const handleDownloadVideo = (video: VideoFile) => {
    // Implement download logic
    console.log('Downloading video:', video.name);
  };

  const handleStatusChange = (id: string, status: VideoFile['status']) => {
    setVideos(prev => prev.map(video =>
      video.id === id ? { ...video, status } : video
    ));
  };

  return {
    videos,
    filteredVideos,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    handleDeleteVideo,
    handleDownloadVideo,
    handleStatusChange
  };
}