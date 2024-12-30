import { type PerformanceReport, type AIAnalysis } from '../../types/reports';
import { formatDuration } from '../../utils/videoProcessing';

export function generateReport(analysis: AIAnalysis, videoId: string, officerId: string, agencyId: string): PerformanceReport {
  const keyFindings = generateKeyFindings(analysis);
  const recommendations = generateRecommendations(analysis);

  return {
    id: `report-${Date.now()}`,
    videoId,
    officerId,
    agencyId,
    createdAt: new Date().toISOString(),
    analysis,
    summary: {
      title: "Officer Performance Analysis Report",
      overview: generateOverview(analysis),
      keyFindings,
      recommendations
    },
    status: 'completed'
  };
}

function generateOverview(analysis: AIAnalysis): string {
  const { sentiment, metadata } = analysis;
  return `Incident occurred during ${metadata.timeOfDay} hours in a ${metadata.locationType} area under ${metadata.lighting} conditions. Officer maintained a ${getSentimentDescription(sentiment.officer.score)} demeanor while the subject displayed ${getSentimentDescription(sentiment.subject.score)} behavior. Overall risk level was assessed as ${metadata.riskLevel}.`;
}

function generateKeyFindings(analysis: AIAnalysis): string[] {
  const findings = [];
  
  // Add sentiment-based findings
  if (analysis.sentiment.officer.score > 0.7) {
    findings.push("Officer demonstrated exceptional emotional control and professionalism");
  }
  
  // Add KPI-based findings
  analysis.kpis.forEach(kpi => {
    if (kpi.score > kpi.target) {
      findings.push(`Exceeded expectations in ${kpi.category}: ${kpi.metric}`);
    } else if (kpi.score < kpi.target) {
      findings.push(`Room for improvement in ${kpi.category}: ${kpi.metric}`);
    }
  });

  return findings;
}

function generateRecommendations(analysis: AIAnalysis): string[] {
  const recommendations = [];
  
  // Add recommendations based on KPIs
  analysis.kpis.forEach(kpi => {
    if (kpi.score < kpi.target) {
      recommendations.push(`Consider additional training in ${kpi.category} focusing on ${kpi.metric}`);
    }
  });

  // Add stress-based recommendations
  if (analysis.sentiment.officer.stressLevel > 50) {
    recommendations.push("Consider stress management techniques for high-pressure situations");
  }

  return recommendations;
}

function getSentimentDescription(score: number): string {
  if (score > 0.7) return "highly professional";
  if (score > 0.3) return "positive";
  if (score > -0.3) return "neutral";
  if (score > -0.7) return "tense";
  return "highly stressed";
}