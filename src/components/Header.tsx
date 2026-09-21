import React from 'react';
import { Compass, BookOpen, Layers, ShieldCheck, ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'workspace';
  onNavigate: (view: 'landing' | 'workspace', sectionId?: string) => void;
  onLoadDemo: () => void;
  isDemoMode?: boolean;
  geminiReady: boolean;
  onExportReport?: () => void;
  hasData: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onLoadDemo,
  isDemoMode,
  geminiReady,
  onExportReport,
  hasData,
}) => {
  return (
    <header className="bg-[#FFFFFF] border-b border-[#D9E0E5] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-[#17324D] text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-2xs">
              <Compass className="w-4 h-4 text-[#FFFFFF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-[#17324D] tracking-tight group-hover:text-[#2F7F7A] transition-colors">
                  ResearchLens
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F7F8F6] text-[#40566D] border border-[#D9E0E5]">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-[#667085] leading-none">
                AI Research Evidence &amp; Gap Analysis
              </p>
            </div>
          </button>
        </div>

        {/* Center/Right Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#40566D]">
            <button
              type="button"
              onClick={() => onNavigate('landing', 'start-research')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              Research
            </button>
            <button
              type="button"
              onClick={() => onNavigate('landing', 'how-it-works')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => onNavigate('landing', 'evidence')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              Evidence
            </button>
            <button
              type="button"
              onClick={() => onNavigate('landing', 'about')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Engine Status */}
          <div
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F7F8F6] text-[#40566D] border border-[#D9E0E5]"
            title={geminiReady ? 'Gemini 3.8-Flash RAG & Synthesis Active' : 'Offline / Heuristic Synthesis Mode'}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${geminiReady ? 'bg-[#2F7F7A]' : 'bg-slate-400'}`} />
            <span>{geminiReady ? 'AI Engine Ready' : 'Heuristic Mode'}</span>
          </div>

          {/* Primary Action Button */}
          {currentView === 'landing' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onLoadDemo}
                className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#17324D] bg-[#FFFFFF] hover:bg-slate-50 border border-[#D9E0E5] transition-colors cursor-pointer"
              >
                <span>Sample Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('workspace')}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#17324D] hover:bg-[#1f4164] transition-colors cursor-pointer shadow-2xs"
              >
                <span>{hasData ? 'Open Workspace' : 'Get Started'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-300" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#17324D] bg-[#FFFFFF] hover:bg-slate-50 border border-[#D9E0E5] transition-colors cursor-pointer"
              >
                <span>Overview</span>
              </button>

              {hasData && onExportReport && (
                <button
                  type="button"
                  onClick={onExportReport}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#17324D] hover:bg-[#1f4164] transition-colors cursor-pointer shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 mr-1 text-slate-300" />
                  <span>Export Report</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
