import React from 'react';
import { type BWCReport } from '../../../types/report';

interface IncidentOverviewProps {
  incident: BWCReport['incident'];
}

export function IncidentOverview({ incident }: IncidentOverviewProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <InfoItem label="Location" value={incident.location} />
          <InfoItem label="Date" value={incident.date} />
          <InfoItem label="Call Type" value={incident.callType} />
        </div>
        <div className="space-y-2">
          <InfoItem label="Subject Details" value={incident.subjectDetails} />
          <InfoItem label="Background" value={incident.background} />
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  );
}