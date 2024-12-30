import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { UserTable } from './components/UserTable';
import { UserForm } from './components/UserForm';
import { useUsers } from './hooks/useUsers';
import { type AuthUser } from '../../types';

export function UsersPage() {
  const { users, isLoading, addUser, updateUser, deleteUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (user: AuthUser) => {
    let success;
    if (editingUser) {
      success = await updateUser(user);
    } else {
      success = await addUser(user);
    }

    if (success) {
      setShowForm(false);
      setEditingUser(null);
    }
  };

  const handleEdit = (user: AuthUser) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.agency?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />
    </div>
  );
}