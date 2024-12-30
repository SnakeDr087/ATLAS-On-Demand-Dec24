import React from 'react';
import { type PerformanceReport } from '../../../types/reports';
import { Timeline } from './Timeline';
import { SentimentAnalysis } from './SentimentAnalysis';
import { KPIChart } from './KPIChart';

interface ReportContentProps {
  report: PerformanceReport;
}

export function ReportContent({ report }: ReportContentProps) {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Overview</h3>
        <p className="text-gray-600">{report.summary.overview}</p>
      </section>

      {/* Key Findings */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Key Findings</h3>
        <ul className="space-y-2">
          {report.summary.keyFindings.map((finding, index) => (
            <li key={index} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2" />
              <span className="text-gray-600">{finding}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <Timeline events={report.analysis.events} />

      {/* Sentiment Analysis */}
      <SentimentAnalysis sentiment={report.analysis.sentiment} />

      {/* KPI Analysis */}
      <KPIChart kpis={report.analysis.kpis} />

      {/* Recommendations */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h3>
        <ul className="space-y-2">
          {report.summary.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2" />
              <span className="text-gray-600">{recommendation}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}