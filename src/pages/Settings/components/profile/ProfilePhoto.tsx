import React from 'react';
import { Camera, Upload, Trash2 } from 'lucide-react';

interface ProfilePhotoProps {
  photoUrl?: string;
  onPhotoChange: (url: string) => void;
}

export function ProfilePhoto({ photoUrl, onPhotoChange }: ProfilePhotoProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
      <div className="flex items-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-4 h-4 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="ml-6">
          <p className="text-sm text-gray-500">
            Upload a professional photo for your profile.
            Recommended size: 400x400px.
          </p>
        </div>
      </div>
    </div>
  );
}