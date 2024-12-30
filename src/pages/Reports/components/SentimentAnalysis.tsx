import React from 'react';
import { Smile, Frown, Activity } from 'lucide-react';

interface SentimentProps {
  sentiment: {
    officer: {
      score: number;
      stressLevel: number;
      keyPhrases: string[];
    };
    subject: {
      score: number;
      stressLevel: number;
      keyPhrases: string[];
    };
  };
}

export function SentimentAnalysis({ sentiment }: SentimentProps) {
  const getSentimentColor = (score: number) => {
    if (score > 0.5) return 'text-green-500';
    if (score > 0) return 'text-blue-500';
    if (score > -0.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStressColor = (level: number) => {
    if (level < 30) return 'bg-green-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <section>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Officer Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Officer</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Sentiment Score</span>
                <Smile className={`w-5 h-5 ${getSentimentColor(sentiment.officer.score)}`} />
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getSentimentColor(sentiment.officer.score)}`}
                  style={{ width: `${(sentiment.officer.score + 1) * 50}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Stress Level</span>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getStressColor(sentiment.officer.stressLevel)}`}
                  style={{ width: `${sentiment.officer.stressLevel}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Key Phrases</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sentiment.officer.keyPhrases.map((phrase, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-white rounded-full border border-gray-200"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subject Analysis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Subject</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Sentiment Score</span>
                <Frown className={`w-5 h-5 ${getSentimentColor(sentiment.subject.score)}`} />
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getSentimentColor(sentiment.subject.score)}`}
                  style={{ width: `${(sentiment.subject.score + 1) * 50}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Stress Level</span>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${getStressColor(sentiment.subject.stressLevel)}`}
                  style={{ width: `${sentiment.subject.stressLevel}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Key Phrases</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sentiment.subject.keyPhrases.map((phrase, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-white rounded-full border border-gray-200"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}