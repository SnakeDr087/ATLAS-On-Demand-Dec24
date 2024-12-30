import React from 'react';
import { type BWCReport as BWCReportType } from '../../types/report';
import { ExecutiveSummary } from './ReportSections/ExecutiveSummary';
import { IncidentOverview } from './ReportSections/IncidentOverview';
import { Timeline } from './ReportSections/Timeline';
import { SentimentAnalysis } from './ReportSections/SentimentAnalysis';
import { KPIEvaluation } from './ReportSections/KPIEvaluation';
import { ImprovementPlan } from './ReportSections/ImprovementPlan';

interface BWCReportProps {
  report: BWCReportType;
}

export function BWCReport({ report }: BWCReportProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        ATLAS Performance Insight Report
      </h1>

      <ExecutiveSummary summary={report.executiveSummary} />
      <IncidentOverview incident={report.incident} />
      <Timeline events={report.timeline} />
      <SentimentAnalysis sentiment={report.sentiment} />
      <KPIEvaluation evaluations={report.kpiEvaluations} />
      <ImprovementPlan plan={report.improvementPlan} />
      
      <footer className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Report ID: {report.id} • Generated on {new Date(report.createdAt).toLocaleString()}
        </p>
      </footer>
    </div>
  );
}