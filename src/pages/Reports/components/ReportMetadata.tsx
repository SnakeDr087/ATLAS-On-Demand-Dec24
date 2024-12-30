import React from 'react';
import { Clock, MapPin, Sun, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { type PerformanceReport } from '../../../types/reports';

interface ReportMetadataProps {
  report: PerformanceReport;
}

export function ReportMetadata({ report }: ReportMetadataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Time of Day</p>
            <p className="text-sm text-gray-500">{report.analysis.metadata.timeOfDay}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Location Type</p>
            <p className="text-sm text-gray-500">{report.analysis.metadata.locationType}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <Sun className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Lighting</p>
            <p className="text-sm text-gray-500">{report.analysis.metadata.lighting}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Risk Level</p>
            <p className={`text-sm font-medium ${
              report.analysis.metadata.riskLevel === 'high' ? 'text-red-600' :
              report.analysis.metadata.riskLevel === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {report.analysis.metadata.riskLevel.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}