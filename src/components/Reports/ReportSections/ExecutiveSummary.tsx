import React from 'react';

interface ExecutiveSummaryProps {
  summary: string;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
    </section>
  );
}