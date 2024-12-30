import React from 'react';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

interface KPI {
  category: string;
  metric: string;
  score: number;
  target: number;
  deviation?: string;
}

interface KPIChartProps {
  kpis: KPI[];
}

export function KPIChart({ kpis }: KPIChartProps) {
  return (
    <section>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
      <div className="space-y-4">
        {kpis.map((kpi, index) => {
          const percentage = (kpi.score / kpi.target) * 100;
          const isExceeding = kpi.score > kpi.target;
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{kpi.category}</h4>
                  <p className="text-sm text-gray-500">{kpi.metric}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{kpi.target}</span>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold inline-block text-blue-600">
                      {kpi.score.toFixed(1)}
                    </span>
                  </div>
                  {kpi.deviation && (
                    <div className="flex items-center">
                      {isExceeding ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs font-semibold ${
                        isExceeding ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {kpi.deviation}
                      </span>
                    </div>
                  )}
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      percentage >= 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}