import React from 'react';
import { type BWCReport } from '../../../types/report';

interface SentimentAnalysisProps {
  sentiment: BWCReport['sentiment'];
}

export function SentimentAnalysis({ sentiment }: SentimentAnalysisProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SentimentCard title="Officer" data={sentiment.officer} />
        <SentimentCard title="Subject" data={sentiment.subject} />
      </div>
    </section>
  );
}

interface SentimentCardProps {
  title: string;
  data: BWCReport['sentiment']['officer'] | BWCReport['sentiment']['subject'];
}

function SentimentCard({ title, data }: SentimentCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'calm':
      case 'cooperative':
        return 'text-green-600 bg-green-50';
      case 'neutral':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="space-y-3">
        <div>
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(data.level)}`}>
            {data.level}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${data.score * 100}%` }}
          />
        </div>
        <ul className="text-sm text-gray-600 space-y-1">
          {data.indicators.map((indicator, index) => (
            <li key={index}>• {indicator}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}