import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  GitCompare,
  AlertOctagon,
  Lightbulb,
  Compass,
  MessageSquare,
  FileText,
  SlidersHorizontal,
  Download,
  Search,
  ArrowRight,
  Microscope,
  Scale,
  FileSpreadsheet,
  Shield,
} from 'lucide-react';
import {
  Paper,
  LimitationGroup,
  PotentialGap,
  ResearchDirection,
  ChatMessage,
  ConsensusSnapshot,
  UserProfile,
} from '../types';
import { ConsensusMeter } from './ConsensusMeter';
import { PapersList } from './PapersList';
import { ComparisonTable } from './ComparisonTable';
import { LimitationsList } from './LimitationsList';
import { PotentialGapsList } from './PotentialGapsList';
import { ResearchDirectionsList } from './ResearchDirectionsList';
import { ResearchChat } from './ResearchChat';

interface ResearchWorkspaceProps {
  topic: string;
  question: string;
  keywords: string;
  papers: Paper[];
  limitationGroups: LimitationGroup[];
  potentialGaps: PotentialGap[];
  researchDirections: ResearchDirection[];
  consensusData: ConsensusSnapshot | null;
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBackToLanding: () => void;
  onOpenEvidence: (gap: PotentialGap) => void;
  onSendMessage: (text: string) => void;
  onCitationPaperClick: (paperId: string) => void;
  onExportReport: () => void;
  uploadedFile: File | null;
  onOpenFilters?: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  topic,
  question,
  keywords,
  papers,
  limitationGroups,
  potentialGaps,
  researchDirections,
  consensusData,
  chatMessages,
  isChatLoading,
  activeTab,
  onTabChange,
  onBackToLanding,
  onOpenEvidence,
  onSendMessage,
  onCitationPaperClick,
  onExportReport,
  uploadedFile,
  onOpenFilters,
  currentUser,
  onOpenAuth,
}) => {
  const [followUpInput, setFollowUpInput] = useState('');

  const tabs = [
    {
      id: 'overview',
      label: 'Consensus & Papers',
      shortLabel: 'Consensus',
      icon: BookOpen,
      count: papers.length > 0 ? `${papers.length}` : undefined,
    },
    {
      id: 'comparison',
      label: 'Literature Matrix',
      shortLabel: 'Matrix',
      icon: FileSpreadsheet,
    },
    {
      id: 'papers',
      label: 'Paper Database',
      shortLabel: 'Papers',
      icon: FileText,
      count: papers.length > 0 ? `${papers.length}` : undefined,
    },
    {
      id: 'gaps',
      label: 'Research Gaps',
      shortLabel: 'Gaps',
      icon: Compass,
      count: potentialGaps.length > 0 ? `${potentialGaps.length}` : undefined,
    },
    {
      id: 'limitations',
      label: 'Limitation Clusters',
      shortLabel: 'Limitations',
      icon: AlertOctagon,
      count: limitationGroups.length > 0 ? `${limitationGroups.length}` : undefined,
    },
    {
      id: 'directions',
      label: 'Research Directions',
      shortLabel: 'Directions',
      icon: Lightbulb,
      count: researchDirections.length > 0 ? `${researchDirections.length}` : undefined,
    },
    {
      id: 'chat',
      label: 'Literature Assistant',
      shortLabel: 'Assistant',
      icon: MessageSquare,
    },
  ];

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim()) return;
    onSendMessage(followUpInput);
    setFollowUpInput('');
    if (activeTab !== 'chat') {
      onTabChange('chat');
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F7F6F2] flex flex-col">
      {/* Docked Academic Header Bar */}
      <header className="bg-[#FFFFFF] border-b border-[#D9DEDA] sticky top-0 z-30 px-4 sm:px-6 py-3 shadow-[0_1px_3px_rgba(22,58,53,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Inquiry Title & Metadata */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              type="button"
              onClick={onBackToLanding}
              className="p-1.5 rounded text-[#4A5568] hover:text-[#163A35] hover:bg-[#F7F6F2] transition-colors cursor-pointer border border-[#D9DEDA] shrink-0"
              title="Return to REXA AI portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['DM_Sans'] text-sm sm:text-base font-bold text-[#163A35] truncate">
                  {question || topic || 'Academic Literature Inquiry'}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EFEFEA] text-[#163A35] border border-[#D9DEDA] font-semibold shrink-0">
                  {papers.length} Papers
                </span>
              </div>
              <div className="text-[11px] text-[#6B7280] flex items-center gap-2 truncate mt-0.5">
                <span>Field: <strong className="font-medium text-[#4A5568]">{topic}</strong></span>
                {uploadedFile && (
                  <span className="text-[#163A35] bg-[#EFEFEA] px-1.5 py-0.5 rounded border border-[#D9DEDA] text-[10px]">
                    PDF: {uploadedFile.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            {onOpenFilters && (
              <button
                type="button"
                onClick={onOpenFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-[#163A35] bg-[#FFFFFF] hover:bg-[#F7F6F2] border border-[#D9DEDA] hover:border-[#2F6F68] transition-colors cursor-pointer shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Filters</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExportReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-[#163A35] bg-[#FFFFFF] hover:bg-[#F7F6F2] border border-[#D9DEDA] hover:border-[#2F6F68] transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Export Synthesis</span>
            </button>

            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#163A35] hover:bg-[#2F6F68] text-xs font-semibold text-white transition-colors cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>New Inquiry</span>
            </button>

            {/* Institutional User Status in Header */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth('signin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#EFEFEA] hover:bg-[#E4ECE9] border border-[#D9DEDA] text-xs text-[#163A35] font-medium transition-colors cursor-pointer"
                title={`${currentUser.name} (${currentUser.institution}) - Institutional Access`}
              >
                <div className="w-5 h-5 rounded-full bg-[#163A35] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name ? currentUser.name[0] : 'U'}
                </div>
                <span className="truncate max-w-[120px] font-semibold">{currentUser.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F68]" />
              </button>
            ) : (
              onOpenAuth && (
                <button
                  type="button"
                  onClick={() => onOpenAuth('signin')}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#D9DEDA] hover:border-[#2F6F68] hover:bg-[#FFFFFF] text-xs text-[#163A35] font-medium transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Institutional Sign In</span>
                </button>
              )
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col">
        {/* Academic Tabbed Navigation */}
        <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded-[8px] p-1 shadow-2xs mb-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#163A35] text-white shadow-2xs'
                      : 'text-[#4A5568] hover:bg-[#F7F6F2] hover:text-[#163A35]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C7A66B]' : 'text-[#6B7280]'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`ml-0.5 px-1.5 py-0.2 rounded font-mono text-[10px] ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EFEFEA] text-[#163A35]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Tab Contents */}
        <div className="space-y-6 flex-1">
          {/* Overview: Consensus Meter + Papers Snapshot */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <ConsensusMeter
                papers={papers}
                topic={topic}
                question={question}
                consensusData={consensusData}
                onPaperClick={onCitationPaperClick}
                onAskFollowUp={(followUpQ) => {
                  onSendMessage(followUpQ);
                  onTabChange('chat');
                }}
              />

              {/* Analyzed Literature Papers Snapshot */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-[#D9DEDA]">
                  <h3 className="font-['DM_Sans'] text-sm font-bold text-[#163A35] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2F6F68]" />
                    <span>Analyzed Literature Papers ({papers.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => onTabChange('comparison')}
                    className="text-xs text-[#2F6F68] hover:underline font-medium cursor-pointer"
                  >
                    Open Literature Review Matrix &rarr;
                  </button>
                </div>

                <PapersList papers={papers} />
              </div>
            </div>
          )}

          {/* Scholarly Literature Review Matrix */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <ComparisonTable papers={papers} />
            </div>
          )}

          {/* Paper Database / List */}
          {activeTab === 'papers' && (
            <div className="space-y-4">
              <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded-[10px] p-4">
                <h3 className="font-['DM_Sans'] text-base font-bold text-[#163A35]">
                  Reviewed Literature &amp; Methodology Database
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  Each study is analyzed for sample size, experimental design, cohorts, primary findings, and validity boundaries.
                </p>
              </div>

              <PapersList papers={papers} />
            </div>
          )}

          {/* Research Gaps Engine */}
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              <PotentialGapsList
                potentialGaps={potentialGaps}
                onViewEvidence={onOpenEvidence}
              />
            </div>
          )}

          {/* Recurring Limitation Clusters */}
          {activeTab === 'limitations' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border-l-2 border-[#C7A66B] border-y border-r border-[#D9DEDA] rounded-r-md p-4 flex items-start gap-3">
                <AlertOctagon className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-['DM_Sans'] text-base font-bold text-[#163A35]">
                    Recurring Limitations Reported Across Literature
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Systematic clustering of scientific boundaries, environmental constraints, and evaluation bounds explicitly documented by authors.
                  </p>
                </div>
              </div>

              <LimitationsList limitationGroups={limitationGroups} />
            </div>
          )}

          {/* Suggested Research Directions */}
          {activeTab === 'directions' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border-l-2 border-[#2F6F68] border-y border-r border-[#D9DEDA] rounded-r-md p-4 flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#2F6F68] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-['DM_Sans'] text-base font-bold text-[#163A35]">
                    Methodological Blueprints &amp; Prospective Directions
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    Actionable research designs addressing the documented limitations, complete with recommended models, datasets, and validation metrics.
                  </p>
                </div>
              </div>

              <ResearchDirectionsList researchDirections={researchDirections} />
            </div>
          )}

          {/* Research Chat / Literature Assistant */}
          {activeTab === 'chat' && (
            <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded-[10px] shadow-xs overflow-hidden">
              <ResearchChat
                messages={chatMessages}
                isLoading={isChatLoading}
                onSendMessage={onSendMessage}
                papers={papers}
              />
            </div>
          )}
        </div>

        {/* Docked Follow-Up Input at Bottom */}
        <div className="mt-8 sticky bottom-4 z-20">
          <form
            onSubmit={handleFollowUpSubmit}
            className="w-full max-w-3xl mx-auto bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] hover:border-[#2F6F68] focus-within:border-[#2F6F68] focus-within:shadow-[0_4px_16px_rgba(22,58,53,0.08)] shadow-sm p-2.5 sm:p-3 flex items-center gap-2 transition-all"
          >
            <input
              type="text"
              value={followUpInput}
              onChange={(e) => setFollowUpInput(e.target.value)}
              placeholder="Query the literature corpus on specific sub-questions or empirical nuances..."
              className="flex-1 bg-transparent border-none outline-hidden text-xs sm:text-sm text-[#242A29] placeholder:text-[#9CA3AF] px-2"
            />
            <button
              type="submit"
              disabled={!followUpInput.trim() || isChatLoading}
              className="px-3 py-1.5 rounded bg-[#163A35] hover:bg-[#2F6F68] disabled:bg-[#D9DEDA] disabled:text-[#9CA3AF] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Submit academic query"
            >
              <span>Ask</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
