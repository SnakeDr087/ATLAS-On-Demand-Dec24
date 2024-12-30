import React from 'react';
import { Camera } from 'lucide-react';

interface UserPhotoUploadProps {
  photoUrl?: string;
  onPhotoChange: (url: string) => void;
}

export function UserPhotoUpload({ photoUrl, onPhotoChange }: UserPhotoUploadProps) {
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
    <div className="flex items-center space-x-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
          <Camera className="w-4 h-4 text-gray-600" />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700">Profile Photo</h3>
        <p className="text-sm text-gray-500">Upload a profile picture</p>
      </div>
    </div>
  );
}