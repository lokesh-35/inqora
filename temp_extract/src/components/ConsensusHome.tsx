import React, { useState, useRef } from 'react';
import {
  Plus,
  ChevronDown,
  SlidersHorizontal,
  ArrowRight,
  Microscope,
  Scale,
  FileText,
  X,
  HelpCircle,
  Check,
  BookOpen,
  Compass,
  FileSpreadsheet,
  Shield,
  LogOut,
  User,
  Building2,
} from 'lucide-react';
import { ConsensusLogo } from './ConsensusLogo';
import { ConsensusFilterState } from './ConsensusFiltersModal';
import { UserProfile } from '../types';

interface ConsensusHomeProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (options?: { isDeepReview?: boolean; prompt?: string }) => void;
  isLoading: boolean;
  loadingStep?: string;
  onOpenFilters: () => void;
  filters: ConsensusFilterState;
  onOpenHelp: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  uploadedFile: File | null;
  onFileUpload: (file: File) => void;
  onRemoveUploadedFile: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

const CORPUS_OPTIONS = [
  { id: 'all', label: 'Global Academic Corpus (220M+ Records)' },
  { id: 'cs_ai', label: 'Computer Science & Machine Intelligence' },
  { id: 'medicine', label: 'Clinical Medicine & Public Health' },
  { id: 'bio_agri', label: 'Agricultural & Biological Sciences' },
  { id: 'physics', label: 'Physical Sciences & Engineering' },
];

export const ConsensusHome: React.FC<ConsensusHomeProps> = ({
  query,
  onQueryChange,
  onSearch,
  isLoading,
  loadingStep,
  onOpenFilters,
  filters,
  onOpenHelp,
  onOpenAuth,
  uploadedFile,
  onFileUpload,
  onRemoveUploadedFile,
  currentUser,
  onLogout,
}) => {
  const [selectedCorpus, setSelectedCorpus] = useState<string>('all');
  const [isCorpusOpen, setIsCorpusOpen] = useState<boolean>(false);
  const [isDeepActive, setIsDeepActive] = useState<boolean>(filters.deepReviewMode);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (query.trim() || uploadedFile) {
        onSearch({ isDeepReview: isDeepActive });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handlePillClick = (type: 'filter' | 'deep' | 'compare') => {
    if (type === 'filter') {
      onOpenFilters();
    } else if (type === 'deep') {
      setIsDeepActive(true);
      const prompt =
        query.trim() ||
        'Can deep learning reliably detect crop diseases in real-world open field conditions?';
      onQueryChange(prompt);
      onSearch({ isDeepReview: true, prompt });
    } else if (type === 'compare') {
      const prompt =
        'Comparing Vision Transformers vs Convolutional Networks for image classification under real-world domain shifts';
      onQueryChange(prompt);
      onSearch({ isDeepReview: false, prompt });
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F7F6F2] flex flex-col justify-between relative px-4 sm:px-6 lg:px-8 py-5">
      {/* Top Academic Navigation Bar */}
      <div className="w-full flex items-center justify-between min-h-[44px]">
        <div className="flex items-center gap-2.5 text-xs text-[#6B7280]">
          <span className="font-mono text-[11px] bg-[#EFEFEA] px-2 py-0.5 rounded text-[#163A35] font-semibold">
            INDEX v4.8
          </span>
          <span className="hidden sm:inline text-[#9CA3AF]">·</span>
          <span className="hidden sm:inline font-medium text-[#4A5568]">
            Peer-Reviewed Academic Intelligence
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EAEAE4] text-xs font-semibold text-[#163A35] border border-[#D9DEDA]">
                  <Shield className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>{currentUser.institution} · Institutional License</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#D9DEDA] bg-[#FFFFFF] hover:border-[#2F6F68] transition-colors cursor-pointer text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#163A35] text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.name
                      ? currentUser.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : 'PI'}
                  </div>
                  <span className="font-semibold text-[#163A35] hidden md:inline">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                </button>
              </div>

              {/* User Account Popover */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] rounded-lg border border-[#D9DEDA] shadow-xl p-3 z-30 animate-in fade-in duration-100 text-xs">
                  <div className="pb-2.5 border-b border-[#D9DEDA]">
                    <div className="font-bold text-[#163A35] text-sm">{currentUser.name}</div>
                    <div className="text-[11px] text-[#6B7280] truncate">{currentUser.email}</div>
                    <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#2F6F68] bg-[#E4ECE9] px-2 py-0.5 rounded">
                      <Shield className="w-3 h-3 text-[#2F6F68]" />
                      <span>{currentUser.accessTier}</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-[#4A5568]">
                    <div className="text-[11px]">
                      <span className="text-[#6B7280]">Institution:</span>{' '}
                      <span className="font-semibold text-[#163A35]">{currentUser.institution}</span>
                    </div>
                    <div className="text-[11px]">
                      <span className="text-[#6B7280]">Role:</span>{' '}
                      <span className="font-medium text-[#163A35]">{currentUser.role}</span>
                    </div>
                    {currentUser.orcid && (
                      <div className="text-[11px]">
                        <span className="text-[#6B7280]">ORCID:</span>{' '}
                        <span className="font-mono text-[#2F6F68]">{currentUser.orcid}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#D9DEDA] space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenAuth('signin');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-[#F7F6F2] text-[#163A35] font-medium cursor-pointer"
                    >
                      Institutional Profile Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenHelp();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-[#F7F6F2] text-[#163A35] font-medium cursor-pointer"
                    >
                      Academic Methodology Guide
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-rose-50 text-rose-700 font-semibold cursor-pointer flex items-center justify-between"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-1.5 rounded text-xs font-medium text-[#163A35] hover:text-[#2F6F68] hover:bg-[#EAEAE4] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#2F6F68]" />
                <span>Institutional Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-1.5 rounded-md bg-[#163A35] hover:bg-[#2F6F68] text-xs font-semibold text-white transition-colors shadow-2xs cursor-pointer"
              >
                Access Platform
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Centered Editorial Interface */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center my-auto py-8 sm:py-12">
        {/* Academic Identity: Emblem, Name & Tagline */}
        <div className="flex flex-col items-center mb-8 text-center select-none">
          <div className="mb-3">
            <ConsensusLogo size={46} />
          </div>
          <h1 className="font-['DM_Sans'] text-3xl sm:text-4xl font-bold text-[#163A35] tracking-tight">
            REXA AI
          </h1>
          <p className="font-['DM_Sans'] text-lg sm:text-xl font-medium text-[#2F6F68] mt-1.5 tracking-tight">
            Explore. Compare. Discover.
          </p>
          <p className="text-xs text-[#6B7280] mt-1 max-w-md">
            Scientific consensus mapping, empirical literature matrices, and gap synthesis across 220M+ peer-reviewed publications.
          </p>
        </div>

        {/* Central Academic Search Console */}
        <div className="w-full bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] hover:border-[#2F6F68] focus-within:border-[#2F6F68] focus-within:shadow-[0_4px_20px_rgba(22,58,53,0.08)] transition-all duration-200 p-4 sm:p-5 relative flex flex-col shadow-[0_1px_3px_rgba(22,58,53,0.03)]">
          {/* Top text input row */}
          <div className="flex items-start justify-between gap-3">
            <textarea
              id="consensus-search-input"
              rows={2}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Formulate an academic hypothesis, research question, or topic..."
              className="w-full resize-none border-none outline-hidden text-sm sm:text-base text-[#242A29] placeholder:text-[#9CA3AF] bg-transparent leading-relaxed"
            />
            {/* Subtle status indicator */}
            <div
              className="w-2 h-2 rounded-full bg-[#2F6F68] shrink-0 mt-2"
              title="Academic Index Ready"
            />
          </div>

          {/* Uploaded File Chip (if PDF attached via +) */}
          {uploadedFile && (
            <div className="my-2.5 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F7F6F2] border border-[#D9DEDA] text-xs text-[#163A35] w-fit">
              <FileText className="w-3.5 h-3.5 text-[#2F6F68] shrink-0" />
              <span className="font-medium max-w-xs truncate">{uploadedFile.name}</span>
              <button
                type="button"
                onClick={onRemoveUploadedFile}
                className="p-0.5 rounded text-[#6B7280] hover:text-[#163A35] hover:bg-[#EAEAE4] cursor-pointer ml-1"
                title="Remove attached paper"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Bottom Academic Controls Bar */}
          <div className="mt-4 pt-3 border-t border-[#F0F2EE] flex items-center justify-between gap-2 flex-wrap">
            {/* Left Controls: +, Corpus, Deep */}
            <div className="flex items-center gap-2 relative">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* + Add Attachment / Paper button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach primary paper PDF or dataset for synthesis"
                className="w-7 h-7 rounded border border-[#D9DEDA] flex items-center justify-center text-[#4A5568] hover:bg-[#F7F6F2] hover:text-[#163A35] hover:border-[#2F6F68] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {/* Academic Corpus Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCorpusOpen(!isCorpusOpen)}
                  className="px-2.5 py-1 rounded border border-[#D9DEDA] hover:bg-[#F7F6F2] text-xs font-medium text-[#163A35] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3 h-3 text-[#2F6F68]" />
                  <span>
                    {selectedCorpus === 'all'
                      ? 'Global Corpus'
                      : CORPUS_OPTIONS.find((c) => c.id === selectedCorpus)?.label.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#6B7280]" />
                </button>

                {isCorpusOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-64 bg-[#FFFFFF] rounded-md border border-[#D9DEDA] shadow-md py-1.5 z-50 text-xs">
                    <div className="px-3 py-1 text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider border-b border-[#F0F2EE]">
                      Select Research Field
                    </div>
                    {CORPUS_OPTIONS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedCorpus(c.id);
                          setIsCorpusOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[#242A29] hover:bg-[#F7F6F2] flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate pr-2">{c.label}</span>
                        {selectedCorpus === c.id && (
                          <Check className="w-3.5 h-3.5 text-[#2F6F68] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Deep Synthesis Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsDeepActive(!isDeepActive)}
                title="Toggle Deep Gap & Limitation Analysis"
                className={`px-2.5 py-1 rounded border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDeepActive
                    ? 'border-[#2F6F68] bg-[#2F6F68]/10 text-[#163A35] font-semibold'
                    : 'border-[#D9DEDA] text-[#4A5568] hover:border-[#2F6F68] hover:bg-[#F7F6F2]'
                }`}
              >
                <Microscope className="w-3 h-3 text-[#2F6F68]" />
                <span>Deep Review {isDeepActive ? '✓' : ''}</span>
              </button>
            </div>

            {/* Right Controls: Filter and Submit Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenFilters}
                className="flex items-center gap-1.5 text-xs text-[#4A5568] hover:text-[#163A35] font-medium px-2 py-1 rounded hover:bg-[#F7F6F2] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Filters</span>
                {filters.studyTypes.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F68]" />
                )}
              </button>

              {/* Academic Search Button (Deep Forest #163A35) */}
              <button
                id="consensus-submit-btn"
                type="button"
                disabled={isLoading || (!query.trim() && !uploadedFile)}
                onClick={() => onSearch({ isDeepReview: isDeepActive })}
                className="h-8 px-3.5 rounded-md bg-[#163A35] hover:bg-[#2F6F68] disabled:bg-[#D9DEDA] disabled:text-[#9CA3AF] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] border border-[#D9DEDA] rounded-md text-xs text-[#163A35]">
            <div className="w-3 h-3 border-2 border-[#2F6F68] border-t-transparent rounded-full animate-spin" />
            <span className="font-medium">{loadingStep || 'Querying academic database & synthesizing consensus...'}</span>
          </div>
        )}

        {/* Research Mode Quick Options */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-6 flex-wrap">
          <button
            type="button"
            onClick={() => handlePillClick('filter')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#D9DEDA] bg-[#FFFFFF] hover:border-[#2F6F68] hover:bg-[#F7F6F2] text-xs font-medium text-[#163A35] transition-colors cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>Methodology Filters</span>
          </button>

          <button
            type="button"
            onClick={() => handlePillClick('deep')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#D9DEDA] bg-[#FFFFFF] hover:border-[#2F6F68] hover:bg-[#F7F6F2] text-xs font-medium text-[#163A35] transition-colors cursor-pointer shadow-2xs"
          >
            <Microscope className="w-3.5 h-3.5 text-[#2F6F68]" />
            <span>Deep Literature Review</span>
          </button>

          <button
            type="button"
            onClick={() => handlePillClick('compare')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md border border-[#D9DEDA] bg-[#FFFFFF] hover:border-[#2F6F68] hover:bg-[#F7F6F2] text-xs font-medium text-[#163A35] transition-colors cursor-pointer shadow-2xs"
          >
            <Scale className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>Compare Empirical Approaches</span>
          </button>
        </div>

        {/* Curated Sample Research Inquiries */}
        <div className="mt-9 text-center">
          <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider mb-2.5">
            Exemplar Research Inquiries
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            {[
              'Does deep transfer learning improve crop disease classification in uncontrolled field conditions?',
              'What empirical trade-offs exist between Vision Transformers and CNNs under domain shifts?',
              'Do graph neural networks outperform classical representations for bio-molecular property prediction?',
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onQueryChange(q);
                  onSearch({ prompt: q });
                }}
                className="text-xs text-[#4A5568] hover:text-[#163A35] hover:bg-[#FFFFFF] hover:border-[#2F6F68] px-3 py-1.5 rounded-md border border-[#D9DEDA] bg-[#FFFFFF]/60 transition-colors cursor-pointer text-left leading-relaxed"
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar with academic motto & help modal trigger */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
        <div className="w-8" />
        <div className="text-center font-normal text-xs text-[#6B7280]">
          REXA AI &bull; The Academic Standard for Systematic Evidence Discovery &bull; Explore. Compare. Discover.
        </div>
        <button
          type="button"
          onClick={onOpenHelp}
          title="Methodology & Academic Evidence Guide"
          className="w-8 h-8 rounded border border-[#D9DEDA] hover:border-[#2F6F68] hover:text-[#163A35] text-[#6B7280] flex items-center justify-center transition-colors cursor-pointer bg-[#FFFFFF]"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
