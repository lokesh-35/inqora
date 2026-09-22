/**
 * Data structures for AI Research Evidence & Potential Gap Analysis Agent
 */

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number | string;
  abstract: string;
  source: 'arXiv' | 'Semantic Scholar' | 'Crossref' | 'Uploaded PDF' | 'Demo Data';
  url?: string;
  doi?: string;
  isOpenAccess?: boolean;
  relevanceScore?: number;
  searchedAt?: string;
  evidenceType?: 'metadata' | 'abstract' | 'full-text' | 'uploaded-pdf';
  
  // Extracted structured analysis
  methodology?: string;
  dataset?: string;
  datasetSize?: string;
  sampleSize?: string;
  population?: string;
  evaluationMetrics?: string[];
  keyResults?: string;
  limitations?: string[];
  futureWork?: string;
  researchProblem?: string;
  researchObjective?: string;
  mainConclusions?: string;
  
  // Consensus-style UI fields
  keyTakeaway?: string;
  studyType?: string;
  citationsCount?: number;
  consensusVerdict?: 'Yes' | 'Possibly' | 'No';
  rigorBadge?: string;
  
  // PDF / Content tracking
  rawText?: string;
  chunks?: PaperChunk[];
  isAnalyzed?: boolean;
  isDemo?: boolean;
}

export interface PaperChunk {
  id: string;
  paperId: string;
  paperTitle: string;
  page?: number;
  section?: string;
  text: string;
  embedding?: number[];
}

export interface LimitationGroup {
  id: string;
  category: string; // e.g. "Dataset Diversity", "Real-World Evaluation", "Architecture Exploration"
  limitation: string;
  description: string;
  supportingPaperIds: string[];
  supportingPaperTitles: string[];
  evidence: Array<{
    paperId: string;
    paperTitle: string;
    passage: string;
    section?: string;
    page?: number;
  }>;
}

export type ConfidenceLevel = 'Strong evidence' | 'Moderate evidence' | 'Limited evidence';

export interface PotentialGap {
  id: string;
  category?: 'Methodological Gaps' | 'Population Gaps' | 'Geographic Gaps' | 'Data Gaps' | 'Conflicting Evidence' | 'Underexplored Questions' | string;
  title: string;
  description: string;
  supportingPaperIds: string[];
  supportingPaperTitles: string[];
  evidence: Array<{
    paperId: string;
    paperTitle: string;
    passage: string;
    section?: string;
    page?: number;
    reportedFact: string;
  }>;
  relatedLimitations: string[];
  explanation?: string;
  whyItMayBeAGap: string;
  potentialDirection?: string;
  confidence: ConfidenceLevel;
  cautionNotice?: string;
}

export interface ResearchDirection {
  id: string;
  gapId?: string;
  title: string;
  problem: string;
  proposedApproach: string;
  methodology: string[];
  dataset: string;
  models: string[];
  metrics: string[];
  technologies: string[];
}

export interface ChatMessage {
  id: string;
  sender?: 'user' | 'assistant';
  role?: 'user' | 'assistant';
  text: string;
  timestamp: string | number;
  sources?: Array<{
    paperTitle: string;
    passage: string;
    page?: number;
    section?: string;
  }>;
  isEvidenceSufficient?: boolean;
}

export interface ConsensusSnapshot {
  query: string;
  verdict: 'Yes' | 'Possibly' | 'No' | 'Mixed';
  meter: {
    yesPercent: number;
    possiblyPercent: number;
    noPercent: number;
  };
  consensusStatement: string;
  synthesizedAnswer: string;
  rigorBreakdown: {
    totalStudies: number;
    peerReviewed: number;
    preprints: number;
    methodsSummary: string[];
    benchmarkAccuracy?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  institution: string;
  department?: string;
  role: string;
  orcid?: string;
  ssoProvider?: 'edu' | 'orcid' | 'google' | 'institutional';
  isVerified: boolean;
  accessTier: 'Institutional Enterprise' | 'Academic Researcher';
}

export interface AnalysisState {
  topic: string;
  question: string;
  keywords: string;
  papers: Paper[];
  limitationGroups: LimitationGroup[];
  potentialGaps: PotentialGap[];
  researchDirections: ResearchDirection[];
  chatHistory: ChatMessage[];
  isLoading: boolean;
  loadingStep?: string;
  error?: string | null;
  isDemoMode: boolean;
}
