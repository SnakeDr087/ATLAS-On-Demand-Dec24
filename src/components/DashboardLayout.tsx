import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { RequestsPage } from '../pages/Requests/RequestsPage';
import { ReportsPage } from '../pages/Reports/ReportsPage';
import { VideosPage } from '../pages/Videos/VideosPage';
import { OfficersPage } from '../pages/Officers/OfficersPage';
import { AgenciesPage } from '../pages/Agencies/AgenciesPage';
import { UsersPage } from '../pages/Users/UsersPage';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { MessagesPage } from '../pages/Messages/MessagesPage';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            
            {/* Admin-only routes */}
            {isAdmin && (
              <>
                <Route
                  path="/officers"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <OfficersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agencies"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AgenciesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <UsersPage />
                    </ProtectedRoute>
                  }
                />
              </>
            )}

            {/* Settings route */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}