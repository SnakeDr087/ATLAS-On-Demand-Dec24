import React, { useState, useEffect } from 'react';
import { FileText, Filter, Download, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { type PerformanceReport } from '../../types/reports';
import { ReportsList } from './components/ReportsList';
import { ReportFilters } from './components/ReportFilters';
import { ReportViewer } from './components/ReportViewer';

// Mock data for demonstration
const mockReports: PerformanceReport[] = [
  {
    id: '1',
    videoId: 'v1',
    officerId: 'o1',
    agencyId: '1',
    createdAt: new Date().toISOString(),
    status: 'completed',
    analysis: {
      transcription: "Officer: Good evening, I'm Officer Smith...",
      sentiment: {
        officer: {
          score: 0.8,
          stressLevel: 15,
          keyPhrases: ["professional", "calm", "clear instructions"]
        },
        subject: {
          score: -0.2,
          stressLevel: 45,
          keyPhrases: ["anxious", "cooperative", "confused"]
        }
      },
      events: [
        {
          timestamp: new Date().toISOString(),
          description: "Officer initiates contact",
          type: "interaction_start",
          confidence: 0.95
        }
      ],
      kpis: [
        {
          category: "Communication",
          metric: "Clear Instructions",
          score: 4.5,
          target: 4.0
        }
      ],
      metadata: {
        timeOfDay: "19:30",
        locationType: "urban",
        lighting: "dusk",
        riskLevel: "low",
        weatherConditions: "clear"
      }
    },
    summary: {
      title: "Traffic Stop Analysis",
      overview: "Routine traffic stop handled professionally with clear communication.",
      keyFindings: [
        "Officer maintained professional demeanor",
        "Clear instructions provided throughout",
        "Subject was cooperative despite initial anxiety"
      ],
      recommendations: [
        "Continue exemplary communication practices",
        "Consider additional de-escalation techniques for anxious subjects"
      ]
    }
  }
];

export function ReportsPage() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState<PerformanceReport | null>(null);
  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    incidentType: 'all',
    riskLevel: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(report => {
    if (user?.role !== 'admin' && report.agencyId !== user?.agency?.id) {
      return false;
    }

    if (filters.riskLevel !== 'all' && report.analysis.metadata.riskLevel !== filters.riskLevel) {
      return false;
    }

    if (filters.status !== 'all' && report.status !== filters.status) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance Reports</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => {/* Implement export */}}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
        <ReportFilters
          filters={filters}
          onChange={setFilters}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportsList
          reports={filteredReports}
          onSelect={setSelectedReport}
          selectedReport={selectedReport}
        />
        
        {selectedReport && (
          <ReportViewer
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </div>
    </div>
  );
}