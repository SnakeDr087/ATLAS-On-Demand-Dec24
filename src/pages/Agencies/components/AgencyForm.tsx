import React, { useState } from 'react';
import { X, Upload, Camera, Trash2, Building2 } from 'lucide-react';
import { type Agency, type AgencyLiaison } from '../../../types';

interface AgencyFormProps {
  agency?: Agency | null;
  onSubmit: (agency: Agency) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

export function AgencyForm({ agency, onSubmit, onCancel, onDelete }: AgencyFormProps) {
  const [formData, setFormData] = useState<Partial<Agency>>(
    agency || {
      name: '',
      type: 'local',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      website: '',
      status: 'active',
      patchUrl: '',
      liaison: {
        name: '',
        title: '',
        email: '',
        phone: '',
        mobile: ''
      }
    }
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          patchUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, patchUrl: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgency: Agency = {
      ...formData,
      id: agency?.id || `agency-${Date.now()}`,
      createdAt: agency?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Agency;

    onSubmit(newAgency);
  };

  const handleDelete = () => {
    if (agency?.id && onDelete && window.confirm('Are you sure you want to delete this agency?')) {
      onDelete(agency.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-blue-600" />
            {agency ? 'Edit Agency' : 'Add New Agency'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agency Photo */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                {formData.patchUrl ? (
                  <>
                    <img 
                      src={formData.patchUrl} 
                      alt="Agency patch" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-4 h-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Agency Patch</h3>
              <p className="text-sm text-gray-500">Upload your agency's official patch or logo</p>
            </div>
          </div>

          {/* Agency Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Agency Name *</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Agency Type *</label>
              <select
                required
                value={formData.type || 'local'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Agency['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="local">Local</option>
                <option value="county">County</option>
                <option value="state">State</option>
                <option value="federal">Federal</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address *</label>
            <input
              type="text"
              required
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                required
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State *</label>
              <input
                type="text"
                required
                value={formData.state || ''}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
              <input
                type="text"
                required
                pattern="^\d{5}(-\d{4})?$"
                value={formData.zip || ''}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://"
              />
            </div>
          </div>

          {/* Liaison Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Liaison Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.liaison?.name || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    liaison: { ...formData.liaison, name: e.target.value } as AgencyLiaison
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.liaison?.title || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    liaison: { ...formData.liaison, title: e.target.value } as AgencyLiaison
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.liaison?.email || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    liaison: { ...formData.liaison, email: e.target.value } as AgencyLiaison
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.liaison?.phone || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    liaison: { ...formData.liaison, phone: e.target.value } as AgencyLiaison
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <div>
              {agency && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Agency
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {agency ? 'Update Agency' : 'Add Agency'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}