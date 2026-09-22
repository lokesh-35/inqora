import React, { useState, useEffect } from 'react';
import { ConsensusSidebar, ThreadItem } from './components/ConsensusSidebar';
import { ConsensusHome } from './components/ConsensusHome';
import { ResearchWorkspace } from './components/ResearchWorkspace';
import { ConsensusFiltersModal, ConsensusFilterState } from './components/ConsensusFiltersModal';
import { ConsensusAuthModal } from './components/ConsensusAuthModal';
import { ConsensusHelpModal } from './components/ConsensusHelpModal';
import { EvidenceModal } from './components/EvidenceModal';
import {
  Paper,
  LimitationGroup,
  PotentialGap,
  ResearchDirection,
  ChatMessage,
  ConsensusSnapshot,
  UserProfile,
} from './types';
import {
  DEMO_PAPERS,
  DEMO_LIMITATION_GROUPS,
  DEMO_POTENTIAL_GAPS,
  DEMO_RESEARCH_DIRECTIONS,
  DEMO_QUERY,
  DEMO_CONSENSUS_SNAPSHOT,
} from './data/demoData';
import { AlertCircle } from 'lucide-react';
import { fetchApi } from './lib/api';
import { SupportedLanguage, translateDocument } from './lib/i18n';

const INITIAL_THREADS: ThreadItem[] = [
  {
    id: 'thread-1',
    title: 'Can deep learning reliably detect crop diseases in real-world open field conditions?',
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'thread-2',
    title: 'Vision Transformers vs CNNs in plant pathology',
    timestamp: Date.now() - 86400000,
  },
];

export default function App() {
  // Navigation: 'home' (exact Consensus home layout) or 'thread' (Consensus results thread)
  const [currentView, setCurrentView] = useState<'home' | 'thread'>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [topic, setTopic] = useState<string>(DEMO_QUERY.topic);
  const [question, setQuestion] = useState<string>(DEMO_QUERY.question);
  const [keywords, setKeywords] = useState<string>(DEMO_QUERY.keywords);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('inqora_language');
    return saved === 'hi-IN' || saved === 'te-IN' ? saved : 'en-US';
  });

  // Filters State
  const [filters, setFilters] = useState<ConsensusFilterState>({
    yearRange: 'all',
    studyTypes: [],
    openAccessOnly: false,
    minCitations: 0,
    enableConsensusMeter: true,
    deepReviewMode: false,
  });

  // Threads History
  const [recentThreads, setRecentThreads] = useState<ThreadItem[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-1');

  // Analysis / Research State
  const [papers, setPapers] = useState<Paper[]>(DEMO_PAPERS);
  const [limitationGroups, setLimitationGroups] = useState<LimitationGroup[]>(DEMO_LIMITATION_GROUPS);
  const [potentialGaps, setPotentialGaps] = useState<PotentialGap[]>(DEMO_POTENTIAL_GAPS);
  const [researchDirections, setResearchDirections] = useState<ResearchDirection[]>(DEMO_RESEARCH_DIRECTIONS);
  const [consensusData, setConsensusData] = useState<ConsensusSnapshot | null>(DEMO_CONSENSUS_SNAPSHOT);

  // UI Modals
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [selectedGapForEvidence, setSelectedGapForEvidence] = useState<PotentialGap | null>(null);

  // Authenticated Researcher Session
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('inqora_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('inqora_auth_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to persist user session', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('inqora_auth_user');
    } catch (e) {
      console.warn('Failed to remove user session', e);
    }
  };

  // UI Flow State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('inqora_language', selectedLanguage);
    translateDocument(selectedLanguage);
  }, [selectedLanguage, currentView, activeTab, isLoading, isChatLoading]);

  // Check health on mount
  useEffect(() => {
    fetchApi('/api/health').catch(() => {
      // server initializing
    });
  }, []);

  // Citation Click Handler
  const handleCitationPaperClick = (paperIdOrIndex: string) => {
    if (activeTab !== 'overview' && activeTab !== 'papers') {
      setActiveTab('overview');
    }

    setTimeout(() => {
      const cardEl =
        document.getElementById(`paper-card-${paperIdOrIndex}`) ||
        document.getElementById(`paper-${paperIdOrIndex}`) ||
        document.querySelector(`[id*="${paperIdOrIndex}"]`);

      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardEl.classList.add('ring-2', 'ring-[#0084FF]');
        setTimeout(() => {
          cardEl.classList.remove('ring-2', 'ring-[#0084FF]');
        }, 2200);
      }
    }, 100);
  };

  // Start a new inquiry / thread
  const handleNewThread = () => {
    setSearchQuery('');
    setUploadedFile(null);
    setCurrentView('home');
    setErrorBanner(null);
  };

  // Select a recent thread
  const handleSelectThread = (threadId: string) => {
    const thread = recentThreads.find((t) => t.id === threadId);
    if (thread) {
      setActiveThreadId(threadId);
      setSearchQuery(thread.title);
      setQuestion(thread.title);
      setTopic(thread.title);
      setPapers(DEMO_PAPERS);
      setLimitationGroups(DEMO_LIMITATION_GROUPS);
      setPotentialGaps(DEMO_POTENTIAL_GAPS);
      setResearchDirections(DEMO_RESEARCH_DIRECTIONS);
      setConsensusData(DEMO_CONSENSUS_SNAPSHOT);
      setActiveTab('overview');
      setCurrentView('thread');
    }
  };

  // Open Auth modal
  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Main Search / Synthesis Execution
  const handleSearch = async (options?: { isDeepReview?: boolean; prompt?: string }) => {
    const effectiveQuery = options?.prompt || searchQuery.trim();
    if (!effectiveQuery && !uploadedFile) {
      setErrorBanner('Please enter a research question or upload a paper PDF.');
      return;
    }

    setIsLoading(true);
    setErrorBanner(null);
    setPapers([]);
    setLimitationGroups([]);
    setPotentialGaps([]);
    setResearchDirections([]);
    setConsensusData(null);
    setChatMessages([]);
    setQuestion(effectiveQuery);
    setTopic(effectiveQuery);

    // Add to recent threads
    const newThreadId = `thread-${Date.now()}`;
    const newThread: ThreadItem = {
      id: newThreadId,
      title: effectiveQuery || (uploadedFile ? `Analysis of ${uploadedFile.name}` : 'Academic Inquiry'),
      timestamp: Date.now(),
    };
    setRecentThreads((prev) => [newThread, ...prev.slice(0, 7)]);
    setActiveThreadId(newThreadId);

    let collectedPapers: Paper[] = [];

    try {
      // Step 1: Upload PDF if attached
      if (uploadedFile) {
        setLoadingStep('Extracting metadata and sections from uploaded literature...');
        const formData = new FormData();
        formData.append('file', uploadedFile);

        const uploadRes = await fetchApi('/api/upload-paper', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          if (uploadData.paper) {
            collectedPapers.push(uploadData.paper);
          }
        }
      }

      // Step 2: Search literature across 220M+ corpus (arXiv, Semantic Scholar, Crossref)
      if (effectiveQuery) {
        setLoadingStep('Searching 220M+ research papers across arXiv, Semantic Scholar & Crossref...');
        const searchRes = await fetchApi('/api/search-papers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: effectiveQuery,
            question: effectiveQuery,
            keywords,
            language: selectedLanguage,
            limit: 6,
          }),
        });

        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (Array.isArray(searchData.papers) && searchData.papers.length > 0) {
            collectedPapers.push(...searchData.papers);
          }
        }
      }

      // Keep unrelated questions empty rather than presenting demo evidence as real research.
      if (collectedPapers.length === 0) {
        setErrorBanner('No scholarly sources were found for this inquiry. Try adding specific keywords or upload a PDF.');
      }

      setPapers(collectedPapers);

      // Step 3: Analyze methodology and findings for top papers
      setLoadingStep('Extracting study designs, methodologies, datasets & reported limitations...');
      const analyzedPapers: Paper[] = [];

      for (let i = 0; i < Math.min(collectedPapers.length, 5); i++) {
        const p = collectedPapers[i];
        if (p.isAnalyzed) {
          analyzedPapers.push(p);
          continue;
        }

        try {
          const analyzeRes = await fetchApi('/api/analyze-paper', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paper: p, language: selectedLanguage }),
          });

          if (analyzeRes.ok) {
            const data = await analyzeRes.json();
            analyzedPapers.push(data.paper || p);
          } else {
            analyzedPapers.push(p);
          }
        } catch {
          analyzedPapers.push(p);
        }
      }

      for (let i = 5; i < collectedPapers.length; i++) {
        analyzedPapers.push(collectedPapers[i]);
      }
      setPapers(analyzedPapers);

      // Step 4: Synthesize Consensus Meter & Verdict
      setLoadingStep('Synthesizing scientific consensus & agreement ratio...');
      try {
        const consensusRes = await fetchApi('/api/synthesize-consensus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: effectiveQuery,
            topic: effectiveQuery,
            papers: analyzedPapers,
            language: selectedLanguage,
          }),
        });
        if (consensusRes.ok) {
          const cData = await consensusRes.json();
          if (cData.consensus) {
            setConsensusData(cData.consensus);
          }
        }
      } catch (err) {
        console.warn('Consensus synthesis fallback:', err);
      }

      // Step 5: Full research review for every submitted question
      if (effectiveQuery) {
        setLoadingStep('Clustering recurring limitations & extracting potential research gaps...');
        const gapRes = await fetchApi('/api/analyze-gaps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            papers: analyzedPapers,
            topic: effectiveQuery,
            question: effectiveQuery,
            language: selectedLanguage,
          }),
        });

        let synthesizedGaps: PotentialGap[] = [];
        if (gapRes.ok) {
          const gapData = await gapRes.json();
          if (Array.isArray(gapData.limitationGroups)) {
            setLimitationGroups(gapData.limitationGroups);
          }
          if (Array.isArray(gapData.potentialGaps)) {
            synthesizedGaps = gapData.potentialGaps;
            setPotentialGaps(synthesizedGaps);
          }
        }

        // Formulate future research directions
        const suggestRes = synthesizedGaps.length > 0 ? await fetchApi('/api/suggest-research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gaps: synthesizedGaps,
            topic: effectiveQuery,
            question: effectiveQuery,
            language: selectedLanguage,
          }),
        }) : null;

        if (suggestRes?.ok) {
          const suggestData = await suggestRes.json();
          if (Array.isArray(suggestData.researchDirections)) {
            setResearchDirections(suggestData.researchDirections);
          }
        }
      }

      setActiveTab('overview');
      setCurrentView('thread');
    } catch (err: any) {
      console.error('Search error:', err);
      setErrorBanner('Inquiry completed with offline literature fallback.');
      setPapers([]);
      setConsensusData(null);
      setCurrentView('thread');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  // Grounded Follow-Up Chat Submission
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetchApi('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          papers,
          history: chatMessages,
          language: selectedLanguage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          role: 'assistant',
          text: data.text,
          sources: data.sources || [],
          timestamp: Date.now(),
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errData = await res.json().catch(() => ({}));
        setChatMessages((prev) => [
          ...prev,
          {
            id: `asst-err-${Date.now()}`,
            sender: 'assistant',
            role: 'assistant',
            text: 'Literature assistant encountered an issue: ' + (errData.error || 'Server error'),
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          sender: 'assistant',
          role: 'assistant',
          text: 'Unable to reach the research assistant: ' + err.message,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Export full literature synthesis report as Markdown
  const handleExportReport = () => {
    let report = `# Consensus Research Synthesis & Potential Gap Report\n\n`;
    report += `**Research Question:** ${question || searchQuery}\n`;
    report += `**Domain:** ${topic}\n`;
    report += `**Generated:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`;

    if (consensusData) {
      report += `## Consensus Verdict: ${consensusData.verdict}\n`;
      report += `- **Agreement Ratio:** ${consensusData.meter.yesPercent}% Yes | ${consensusData.meter.possiblyPercent}% Possibly | ${consensusData.meter.noPercent}% No\n`;
      report += `- **Consensus Summary:** ${consensusData.consensusStatement}\n\n`;
    }

    report += `## Analyzed Literature Papers (${papers.length})\n\n`;
    papers.forEach((p, idx) => {
      report += `### [${idx + 1}] ${p.title} (${p.year})\n`;
      report += `- **Authors:** ${(p.authors || []).join(', ')}\n`;
      report += `- **Study Type:** ${p.studyType || 'Empirical Study'}\n`;
      report += `- **Key Takeaway:** ${p.keyTakeaway || p.abstract.slice(0, 160) + '...'}\n`;
      report += `- **Methodology:** ${p.methodology || 'N/A'}\n`;
      report += `- **Reported Limitations:** ${(p.limitations || []).join('; ') || 'N/A'}\n\n`;
    });

    if (potentialGaps.length > 0) {
      report += `## Potential Research Gaps Supported by Evidence\n\n`;
      potentialGaps.forEach((g, idx) => {
        report += `### ${idx + 1}. ${g.title} (${g.confidence})\n`;
        report += `${g.description}\n\n`;
        report += `**Why It May Be a Gap:** ${g.whyItMayBeAGap}\n\n`;
      });
    }

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consensus-research-${(question || topic || 'inquiry').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex font-sans antialiased">
      {/* Exact Consensus Left Sidebar from Screenshot */}
      <ConsensusSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onNewThread={handleNewThread}
        onOpenAuth={handleOpenAuth}
        recentThreads={recentThreads}
        activeThreadId={activeThreadId}
        onSelectThread={handleSelectThread}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Error Banner if any */}
        {errorBanner && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 text-xs text-rose-800 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorBanner}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorBanner(null)}
              className="text-rose-600 hover:text-rose-900 font-semibold cursor-pointer ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View Router: Home (exact match to Screenshot (31).png) OR Thread Results */}
        {currentView === 'home' ? (
          <ConsensusHome
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
            loadingStep={loadingStep}
            onOpenFilters={() => setIsFiltersModalOpen(true)}
            filters={filters}
            onOpenHelp={() => setIsHelpModalOpen(true)}
            onOpenAuth={handleOpenAuth}
            uploadedFile={uploadedFile}
            onFileUpload={setUploadedFile}
            onRemoveUploadedFile={() => setUploadedFile(null)}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isSidebarCollapsed={isSidebarCollapsed}
            currentUser={currentUser}
            onLogout={handleLogout}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        ) : (
          <ResearchWorkspace
            topic={topic}
            question={question}
            keywords={keywords}
            papers={papers}
            limitationGroups={limitationGroups}
            potentialGaps={potentialGaps}
            researchDirections={researchDirections}
            consensusData={consensusData}
            chatMessages={chatMessages}
            isChatLoading={isChatLoading}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBackToLanding={() => setCurrentView('home')}
            onOpenEvidence={setSelectedGapForEvidence}
            onSendMessage={handleSendMessage}
            onCitationPaperClick={handleCitationPaperClick}
            onExportReport={handleExportReport}
            uploadedFile={uploadedFile}
            onOpenFilters={() => setIsFiltersModalOpen(true)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </div>

      {/* Consensus Filters Modal */}
      <ConsensusFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {/* Consensus Sign In / Sign Up Modal */}
      <ConsensusAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Consensus Help & Academic Guide Modal */}
      <ConsensusHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Evidence Traceability Matrix Modal */}
      <EvidenceModal
        gap={selectedGapForEvidence}
        onClose={() => setSelectedGapForEvidence(null)}
      />
    </div>
  );
}
