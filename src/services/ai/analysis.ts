import { type AIAnalysis, type VideoFile } from '../../types';

export async function analyzeVideo(video: VideoFile): Promise<AIAnalysis> {
  // This would connect to your AI service in production
  // For now, we'll return mock data
  return {
    transcription: "Officer: Good evening, I'm Officer Smith...",
    sentiment: {
      officer: {
        score: 0.8,
        stressLevel: 15,
        keyPhrases: ["professional", "calm", "clear instructions"]
      },
      subject: {
        score: -0.2,
        stressLevel: 45,
        keyPhrases: ["anxious", "cooperative", "confused"]
      }
    },
    events: [
      {
        timestamp: new Date().toISOString(),
        description: "Officer initiates contact",
        type: "interaction_start",
        confidence: 0.95
      }
    ],
    kpis: [
      {
        category: "Communication",
        metric: "Clear Instructions",
        score: 4.5,
        target: 4.0
      }
    ],
    metadata: {
      timeOfDay: "19:30",
      locationType: "urban",
      lighting: "dusk",
      riskLevel: "low",
      weatherConditions: "clear"
    }
  };
}