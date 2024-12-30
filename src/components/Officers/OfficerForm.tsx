import React, { useState } from 'react';
import { X, Camera, Upload, Trash2, Building2 } from 'lucide-react';
import { type Officer } from '../../types/officer';

interface OfficerFormProps {
  onSubmit: (officer: Omit<Officer, 'id'>) => void;
  onCancel: () => void;
  initialData?: Officer | null;
}

interface Agency {
  id: string;
  name: string;
  code: string;
}

// Mock agencies data - replace with actual API call
const MOCK_AGENCIES: Agency[] = [
  { id: '1', name: 'Central Police Department', code: 'CPD' },
  { id: '2', name: 'State Highway Patrol', code: 'SHP' },
  { id: '3', name: 'County Sheriff Office', code: 'CSO' }
];

const SHIFTS = [
  { value: 'day', label: 'Day Shift (0600-1800)' },
  { value: 'evening', label: 'Evening Shift (1400-0200)' },
  { value: 'night', label: 'Night Shift (1800-0600)' },
  { value: 'power', label: 'Power Shift (1000-2200)' },
  { value: 'relief', label: 'Relief Shift (Rotating)' },
  { value: 'admin', label: 'Administrative (0800-1700)' },
  { value: 'custom', label: 'Custom Schedule' }
];

export function OfficerForm({ onSubmit, onCancel, initialData }: OfficerFormProps) {
  const [formData, setFormData] = useState({
    // Basic Information
    photoUrl: initialData?.photoUrl || '',
    name: initialData?.name || '',
    badge: initialData?.badge || '',
    rank: initialData?.rank || '',
    division: initialData?.division || '',
    shift: initialData?.shift || '',
    customShift: '',
    
    // Contact Information
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    mobile: initialData?.mobile || '',
    
    // Agency Information
    agencyId: initialData?.agencyId || '',
    department: initialData?.department || '',
    
    // Additional Details
    hireDate: initialData?.hireDate || '',
    status: initialData?.status || 'active',
    
    // Certifications
    certifications: initialData?.certifications || [],
    
    // Training & Qualifications
    qualifications: initialData?.qualifications || [],
    specialUnits: initialData?.specialUnits || [],
    languages: initialData?.languages || []
  });

  const [showCustomShift, setShowCustomShift] = useState(formData.shift === 'custom');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-blue-600" />
            {initialData ? 'Edit Officer' : 'Add New Officer'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Photo Upload */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                {formData.photoUrl ? (
                  <>
                    <img 
                      src={formData.photoUrl} 
                      alt="Officer" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: '' })}
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
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Officer Photo</h3>
              <p className="text-sm text-gray-500">Upload a professional photo</p>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Badge Number *</label>
                <input
                  type="text"
                  required
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rank *</label>
                <input
                  type="text"
                  required
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Division *</label>
                <input
                  type="text"
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Office Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Agency Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Agency Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Agency *</label>
                <select
                  required
                  value={formData.agencyId}
                  onChange={(e) => setFormData({ ...formData, agencyId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Agency</option>
                  {MOCK_AGENCIES.map(agency => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name} ({agency.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Shift *</label>
                <select
                  required
                  value={formData.shift}
                  onChange={(e) => {
                    setShowCustomShift(e.target.value === 'custom');
                    setFormData({ ...formData, shift: e.target.value });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Shift</option>
                  {SHIFTS.map(shift => (
                    <option key={shift.value} value={shift.value}>
                      {shift.label}
                    </option>
                  ))}
                </select>
              </div>
              {showCustomShift && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Shift Hours
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 0900-1700"
                    value={formData.customShift}
                    onChange={(e) => setFormData({ ...formData, customShift: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Certifications & Qualifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications & Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certifications</label>
                <select
                  multiple
                  value={formData.certifications}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, certifications: values });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  size={4}
                >
                  <option value="firearms">Firearms Certification</option>
                  <option value="firstaid">First Aid/CPR</option>
                  <option value="hazmat">Hazmat Handling</option>
                  <option value="k9">K-9 Handler</option>
                  <option value="swat">SWAT Training</option>
                  <option value="crisis">Crisis Intervention</option>
                  <option value="instructor">Certified Instructor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Special Units</label>
                <select
                  multiple
                  value={formData.specialUnits}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, specialUnits: values });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  size={4}
                >
                  <option value="swat">SWAT Team</option>
                  <option value="k9">K-9 Unit</option>
                  <option value="detective">Detective Bureau</option>
                  <option value="traffic">Traffic Division</option>
                  <option value="narcotics">Narcotics</option>
                  <option value="community">Community Relations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Language Skills</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Languages Spoken</label>
                <select
                  multiple
                  value={formData.languages}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, languages: values });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  size={4}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="mandarin">Mandarin</option>
                  <option value="vietnamese">Vietnamese</option>
                  <option value="arabic">Arabic</option>
                  <option value="russian">Russian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
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
              {initialData ? 'Update Officer' : 'Add Officer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}