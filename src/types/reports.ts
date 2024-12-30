interface BWCReview {
  id: string;
  videoId: string;
  officerId: string;
  agencyId: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'error';
  
  // Incident Details
  incidentDate: string;
  incidentType: string;
  caseNumber?: string;
  location: string;
  
  // Officer Information
  officerName: string;
  officerBadge: string;
  officerRank: string;
  
  // Analysis Results
  analysis: {
    // Interaction Assessment
    professionalDemeanor: number; // 1-5 scale
    communicationSkills: number;
    tacticalDecisions: number;
    
    // Policy Compliance
    policyAdherence: boolean;
    policyDeviations: string[];
    justifications: string[];
    
    // Safety & Control
    sceneControl: number;
    officerSafety: number;
    publicSafety: number;
    
    // De-escalation 
    deEscalationEfforts: string[];
    deEscalationEffectiveness: number;
    
    // Additional Observations
    notableActions: string[];
    concernAreas: string[];
    trainingOpportunities: string[];
  };
  
  // Review Summary
  summary: {
    overview: string;
    keyFindings: string[];
    recommendations: string[];
    requiredActions: string[];
  };
  
  // Review Metadata
  reviewedBy: string;
  reviewDate: string;
  supervisorApproval?: {
    approved: boolean;
    approvedBy: string;
    approvedDate: string;
    comments: string;
  };
}

export type { BWCReview };