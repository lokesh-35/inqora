import React, { useState } from 'react';
import { PotentialGap } from '../types';
import {
  Compass,
  BookOpen,
  ShieldCheck,
  Eye,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Filter,
  FileSearch,
} from 'lucide-react';

interface PotentialGapsListProps {
  potentialGaps: PotentialGap[];
  onViewEvidence: (gap: PotentialGap) => void;
}

const CATEGORIES = [
  'All Categories',
  'Methodological Gaps',
  'Population Gaps',
  'Geographic Gaps',
  'Data Gaps',
  'Conflicting Evidence',
  'Underexplored Questions',
];

export const PotentialGapsList: React.FC<PotentialGapsListProps> = ({
  potentialGaps,
  onViewEvidence,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  if (potentialGaps.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-xl border border-[#D9DEDA] p-10 text-center text-[#6B7280]">
        <FileSearch className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3 stroke-1" />
        <p className="text-sm font-medium text-[#163A35]">No research gaps indexed for this query.</p>
        <p className="text-xs text-[#6B7280] mt-1">
          Perform a search query to analyze literature coverage and identify potential methodological and data gaps.
        </p>
      </div>
    );
  }

  const filteredGaps =
    selectedCategory === 'All Categories'
      ? potentialGaps
      : potentialGaps.filter((g) => g.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Analytical Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9DEDA]">
        <div>
          <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#2F6F68]" />
            <span>Empirical Research Gap Analysis Report</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Systematic taxonomy of underexplored methodologies, dataset bounds, and conflicting evidence identified across literature.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Showing:</span>
          <span className="font-mono text-xs font-semibold text-[#163A35] bg-[#EFEFEA] px-2 py-0.5 rounded">
            {filteredGaps.length} Gaps
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <Filter className="w-3.5 h-3.5 text-[#6B7280] shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#163A35] text-white'
                : 'bg-[#FFFFFF] text-[#4A5568] border border-[#D9DEDA] hover:bg-[#F7F6F2]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Academic Rigor Notice */}
      <div className="bg-[#FFFFFF] border-l-2 border-[#2F6F68] border-y border-r border-[#D9DEDA] rounded-r-md p-3.5 flex items-start gap-3 text-xs text-[#4A5568]">
        <ShieldCheck className="w-4 h-4 text-[#2F6F68] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-[#163A35]">Scientific Integrity Note:</span> Gaps represent areas where empirical evaluation appears constrained, conflicting, or absent within the collected sample of peer-reviewed papers. AI inferences are explicitly separated from verbatim literature evidence below.
        </div>
      </div>

      {/* Gaps List - Analytical Report Format */}
      <div className="space-y-4">
        {filteredGaps.map((gap, index) => {
          const categoryLabel = gap.category || 'Underexplored Questions';
          return (
            <article
              key={gap.id}
              id={`gap-card-${index + 1}`}
              className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] p-5 sm:p-6 hover:border-[#2F6F68] hover:shadow-[0_2px_12px_rgba(22,58,53,0.05)] transition-all space-y-4"
            >
              {/* Gap Header: Category Badge, Confidence & Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#F0F2EE]">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-semibold text-[#2F6F68] bg-[#F7F6F2] border border-[#D9DEDA] px-2 py-0.5 rounded text-[11px]">
                      {categoryLabel}
                    </span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="font-mono text-[11px] text-[#6B7280]">
                      Confidence: <strong className="text-[#163A35] font-semibold">{gap.confidence}</strong>
                    </span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="text-[11px] text-[#6B7280]">
                      {gap.supportingPaperTitles.length} supporting papers
                    </span>
                  </div>

                  <h4 className="font-['DM_Sans'] text-base sm:text-lg font-semibold text-[#163A35] leading-snug">
                    {gap.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => onViewEvidence(gap)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-[#163A35] bg-[#FFFFFF] border border-[#D9DEDA] hover:border-[#2F6F68] hover:bg-[#F7F6F2] transition-colors cursor-pointer self-start shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Inspect Excerpts ({gap.evidence?.length || 0})</span>
                </button>
              </div>

              {/* Analytical Description */}
              <div className="text-xs text-[#242A29] leading-relaxed">
                <span className="text-[11px] uppercase font-bold text-[#6B7280] tracking-wider block mb-1">
                  Nature of the Gap:
                </span>
                <p className="text-[#242A29] leading-relaxed">
                  {gap.description}
                </p>
              </div>

              {/* 1. Evidence From Literature (Explicit Section) */}
              <div className="bg-[#F7F6F2] rounded-lg p-3.5 border border-[#EAEAE4] space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold text-[#163A35] tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Evidence from Peer-Reviewed Literature:</span>
                </div>
                {gap.evidence && gap.evidence.length > 0 ? (
                  <div className="space-y-2">
                    {gap.evidence.slice(0, 2).map((ev, ei) => (
                      <div key={ei} className="pl-3 border-l-2 border-[#C7A66B] py-0.5">
                        <div className="text-[11px] font-semibold text-[#163A35]">
                          {ev.paperTitle} {ev.section ? `(${ev.section})` : ''}
                        </div>
                        <p className="text-[11px] text-[#4A5568] italic mt-0.5">
                          &quot;{ev.passage}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#4A5568]">
                    Synthesized from reported methodologies across {gap.supportingPaperTitles.join(', ')}.
                  </p>
                )}
              </div>

              {/* 2. Why the Gap Matters */}
              <div className="text-xs space-y-1">
                <div className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#2F6F68]" />
                  <span>Why This Gap Matters for Research:</span>
                </div>
                <p className="text-[#4A5568] leading-relaxed pl-3 border-l border-[#D9DEDA]">
                  {gap.whyItMayBeAGap}
                </p>
              </div>

              {/* 3. Potential Research Direction (Distinct from evidence) */}
              <div className="bg-[#FFFFFF] border-l-2 border-[#C7A66B] border-y border-r border-[#EAEAE4] rounded-r-md p-3.5 space-y-1 text-xs">
                <div className="text-[10px] uppercase font-bold text-[#C7A66B] tracking-wider flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-[#C7A66B]" />
                  <span>Potential Research Direction (Prospective Hypothesis):</span>
                </div>
                <p className="text-[#242A29] leading-relaxed">
                  {gap.potentialDirection ||
                    'Investigate unconstrained multi-condition benchmarking with standardized validation metrics across diverse botanical cohorts.'}
                </p>
                <span className="text-[10px] text-[#6B7280] italic block pt-0.5">
                  Suggested direction inferred from documented limitations; evaluate feasibility and novelty against contemporary preprints.
                </span>
              </div>

              {/* Supporting Literature References */}
              <div className="pt-2 border-t border-[#F0F2EE] flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-medium text-[#6B7280]">Supporting Literature:</span>
                {gap.supportingPaperTitles.map((title, ti) => (
                  <span
                    key={ti}
                    className="bg-[#F7F6F2] text-[#163A35] border border-[#D9DEDA] px-2 py-0.5 rounded text-[11px] font-medium"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
