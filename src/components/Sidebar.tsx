import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileBarChart,
  FileText,
  Video,
  Settings,
  Shield,
  BadgeCheck,
  Users,
  Building2,
  UserCog,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const getMenuItems = () => {
    const commonItems = [
      { id: '', icon: LayoutDashboard, label: 'Dashboard' },
      { id: 'requests', icon: FileBarChart, label: 'Requests' },
      { id: 'reports', icon: FileText, label: 'Reports' },
      { id: 'videos', icon: Video, label: 'Videos' },
      { id: 'messages', icon: MessageSquare, label: 'Messages' }
    ];

    const adminItems = [
      { id: 'officers', icon: UserCog, label: 'Officers' },
      { id: 'agencies', icon: Building2, label: 'Agencies' },
      { id: 'users', icon: Users, label: 'Users' },
    ];

    const settingsItem = [
      { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return isAdmin ? 
      [...commonItems, ...adminItems, ...settingsItem] : 
      [...commonItems, ...settingsItem];
  };

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(`/dashboard/${path}`);
    }
  };

  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    const path = location.pathname.split('/').pop() || '';
    return path;
  };

  const activePage = getCurrentPage();
  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-blue-600 text-white h-screen fixed top-0 left-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-center flex items-center justify-center">
          <Shield className="w-6 h-6 mr-2" />
          <span className="flex items-center">
            ATLAS On-Demand
            <BadgeCheck className="w-5 h-5 ml-2" />
          </span>
        </h1>
      </div>
      <nav className="flex-1 flex flex-col">
        <div className="flex-1">
          {menuItems.slice(0, -1).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors
                ${activePage === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
        {menuItems.slice(-1).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors border-t border-blue-500
              ${activePage === item.id ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}