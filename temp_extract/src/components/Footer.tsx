import React from 'react';
import { Compass } from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenWorkspace?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenWorkspace }) => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#D9E0E5] py-12 text-[#667085]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#D9E0E5]">
          {/* Left Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#17324D] text-white flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-[#FFFFFF]" />
              </div>
              <span className="text-base font-semibold text-[#17324D] tracking-tight">
                ResearchLens
              </span>
            </div>
            <p className="text-xs text-[#667085]">
              AI-assisted research exploration
            </p>
          </div>

          {/* Right Navigation */}
          <nav className="flex flex-wrap items-center gap-6 text-xs text-[#40566D]">
            <button
              type="button"
              onClick={() => {
                if (onOpenWorkspace) onOpenWorkspace();
                else if (onNavigateSection) onNavigateSection('start-research');
              }}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              Research
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('how-it-works')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('evidence')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              Evidence
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection?.('about')}
              className="hover:text-[#17324D] transition-colors cursor-pointer"
            >
              About
            </button>
            <span className="hover:text-[#17324D] transition-colors cursor-pointer">
              Privacy
            </span>
          </nav>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
          <p>
            AI-generated research suggestions should be verified against the original sources.
          </p>
          <p>
            ResearchLens &bull; Academic Literature Evidence &amp; Potential Gap Analysis
          </p>
        </div>
      </div>
    </footer>
  );
};
