import { useState, useEffect, useCallback } from 'react';
import { type VideoFile } from '../types';
import { type VideoFilterOptions } from '../pages/Videos/types';
import { useAuth } from '../contexts/AuthContext';
import { 
  getAllVideos,
  saveVideo,
  deleteVideo as deleteVideoService
} from '../services/storage/db';

const initialFilters: VideoFilterOptions = {
  type: 'all',
  status: 'all',
  officer: 'all',
  dateRange: 'all'
};

export function useVideoManagement() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<VideoFilterOptions>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const allVideos = await getAllVideos();
      setVideos(allVideos);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load videos on component mount
  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const filteredVideos = videos.filter(video => {
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

    // Agency filter for non-admin users
    if (user?.role !== 'admin' && video.agencyId !== user?.agency?.id) {
      return false;
    }

    return true;
  });

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideoService(id);
        await loadVideos();
      } catch (error) {
        console.error('Failed to delete video:', error);
      }
    }
  };

  const handleEditVideo = async (video: VideoFile) => {
    try {
      await saveVideo(video);
      await loadVideos();
    } catch (error) {
      console.error('Failed to edit video:', error);
    }
  };

  const handleViewVideo = (video: VideoFile) => {
    // Implement video viewing logic
    console.log('Viewing video:', video);
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
    handleEditVideo,
    handleViewVideo,
    isLoading
  };
}