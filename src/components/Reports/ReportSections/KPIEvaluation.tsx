import React from 'react';
import { type BWCReport } from '../../../types/report';
import { Check, X } from 'lucide-react';

interface KPIEvaluationProps {
  evaluations: BWCReport['kpiEvaluations'];
}

export function KPIEvaluation({ evaluations }: KPIEvaluationProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Evaluation</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Officer Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">KPI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {evaluations.map((eval, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{eval.timestamp}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{eval.officerAction}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{eval.subjectAction}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{eval.kpi}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {eval.evaluation === 'met' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}