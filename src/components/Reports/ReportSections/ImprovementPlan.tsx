import React from 'react';
import { type BWCReport } from '../../../types/report';

interface ImprovementPlanProps {
  plan: BWCReport['improvementPlan'];
}

export function ImprovementPlan({ plan }: ImprovementPlanProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Improvement Plan</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Key Issues</h3>
          <ul className="list-disc pl-5 space-y-2">
            {plan.keyIssues.map((issue, index) => (
              <li key={index} className="text-gray-700">{issue}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2">
            {plan.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">{rec}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Timeline</h3>
          <p className="text-gray-700">{plan.timeline}</p>
        </div>
      </div>
    </section>
  );
}