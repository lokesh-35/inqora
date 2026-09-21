import React from 'react';
import { X, BookOpen, Scale, AlertOctagon, CheckCircle2, FileSpreadsheet, Compass } from 'lucide-react';
import { ConsensusLogo } from './ConsensusLogo';

interface ConsensusHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsensusHelpModal: React.FC<ConsensusHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A35]/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#D9DEDA] flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-2.5">
            <ConsensusLogo size={26} />
            <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35]">
              REXA AI Methodology &amp; Evidence Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-[#6B7280] hover:text-[#163A35] hover:bg-[#EAEAE4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#242A29] scrollbar-thin">
          <div className="p-4 bg-[#F7F6F2] border-l-2 border-[#2F6F68] border-y border-r border-[#D9DEDA] rounded-r-md">
            <div className="font-['DM_Sans'] font-semibold text-[#163A35] flex items-center gap-1.5 mb-1 text-sm">
              <BookOpen className="w-4 h-4 text-[#2F6F68]" />
              <span>Academic Evidence Discovery Platform</span>
            </div>
            <p className="text-[#4A5568] leading-relaxed">
              REXA AI synthesizes evidence across 220M+ peer-reviewed papers from Semantic Scholar, arXiv, and Crossref, directly extracting methodologies, sample sizes, empirical findings, and author-reported limitations.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
              <Scale className="w-4 h-4 text-[#2F6F68] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['DM_Sans'] font-semibold text-[#163A35] text-xs">Scientific Consensus Meter</h4>
                <p className="text-[#4A5568] mt-0.5 leading-relaxed">
                  Evaluates agreement distribution across analyzed papers (Yes / Possibly / No). Outcomes are weighted by study rigor (Meta-Analyses, RCTs, and Large Empirical Field Benchmarks carry higher evidential weighting).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
              <FileSpreadsheet className="w-4 h-4 text-[#2F6F68] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['DM_Sans'] font-semibold text-[#163A35] text-xs">Scholarly Literature Review Matrix</h4>
                <p className="text-[#4A5568] mt-0.5 leading-relaxed">
                  Side-by-side synthesis of methodologies, cohorts, sample sizes, and empirical boundaries, exportable directly to CSV and BibTeX for academic citation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
              <Compass className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-['DM_Sans'] font-semibold text-[#163A35] text-xs">Empirical Research Gaps Engine</h4>
                <p className="text-[#4A5568] mt-0.5 leading-relaxed">
                  Classifies underexplored questions into Methodological, Population, Geographic, and Data gaps, strictly distinguishing direct literature evidence from prospective investigation directions.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D9DEDA] flex items-center justify-between text-[#6B7280]">
            <span className="font-mono text-[11px]">Explore. Compare. Discover.</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#163A35] text-white font-medium hover:bg-[#2F6F68] transition-colors cursor-pointer text-xs"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
