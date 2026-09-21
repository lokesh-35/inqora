"""
Pydantic Schemas for AI Research Evidence & Potential Gap Analysis Agent
"""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class PaperChunkSchema(BaseModel):
    id: str
    paperId: str
    paperTitle: str
    page: Optional[int] = None
    section: Optional[str] = None
    text: str

class PaperSchema(BaseModel):
    id: str
    title: str
    authors: List[str] = Field(default_factory=list)
    year: Optional[str | int] = "Not reported"
    abstract: str = ""
    source: str = "Research Repository"
    url: Optional[str] = None
    doi: Optional[str] = None
    isOpenAccess: Optional[bool] = False
    relevanceScore: Optional[float] = 0.8
    methodology: Optional[str] = "Not reported"
    dataset: Optional[str] = "Not reported"
    datasetSize: Optional[str] = "Not reported"
    evaluationMetrics: Optional[List[str]] = Field(default_factory=list)
    keyResults: Optional[str] = "Not reported"
    limitations: Optional[List[str]] = Field(default_factory=list)
    futureWork: Optional[str] = "Not reported"
    researchProblem: Optional[str] = "Not reported"
    researchObjective: Optional[str] = "Not reported"
    mainConclusions: Optional[str] = "Not reported"
    rawText: Optional[str] = None
    chunks: Optional[List[PaperChunkSchema]] = Field(default_factory=list)
    isAnalyzed: Optional[bool] = False
    isDemo: Optional[bool] = False

class EvidenceSchema(BaseModel):
    paperId: Optional[str] = ""
    paperTitle: str
    passage: str
    section: Optional[str] = None
    page: Optional[int] = None
    reportedFact: Optional[str] = ""

class LimitationGroupSchema(BaseModel):
    id: str
    category: str
    limitation: str
    description: str
    supportingPaperIds: List[str] = Field(default_factory=list)
    supportingPaperTitles: List[str] = Field(default_factory=list)
    evidence: List[EvidenceSchema] = Field(default_factory=list)

class PotentialGapSchema(BaseModel):
    id: str
    title: str
    description: str
    supportingPaperIds: List[str] = Field(default_factory=list)
    supportingPaperTitles: List[str] = Field(default_factory=list)
    evidence: List[EvidenceSchema] = Field(default_factory=list)
    relatedLimitations: List[str] = Field(default_factory=list)
    whyItMayBeAGap: str
    confidence: Literal["Strong evidence", "Moderate evidence", "Limited evidence"] = "Moderate evidence"
    cautionNotice: Optional[str] = (
        "Identified as a potential research gap based on the collected literature; "
        "does not assert absolute novelty across all global publications."
    )

class ResearchDirectionSchema(BaseModel):
    id: str
    gapId: Optional[str] = None
    title: str
    problem: str
    proposedApproach: str
    methodology: List[str] = Field(default_factory=list)
    dataset: str
    models: List[str] = Field(default_factory=list)
    metrics: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)

class SearchRequest(BaseModel):
    topic: Optional[str] = None
    question: Optional[str] = None
    keywords: Optional[str] = None
    limit: Optional[int] = 8

class AnalyzePaperRequest(BaseModel):
    paper: PaperSchema

class AnalyzeGapsRequest(BaseModel):
    papers: List[PaperSchema]
    topic: Optional[str] = None
    question: Optional[str] = None

class SuggestResearchRequest(BaseModel):
    gaps: List[PotentialGapSchema]
    topic: Optional[str] = None
    question: Optional[str] = None

class ChatRequest(BaseModel):
    question: str
    papers: Optional[List[PaperSchema]] = Field(default_factory=list)
    history: Optional[List[dict]] = Field(default_factory=list)
