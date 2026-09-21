import React, { useState } from 'react';
import { LimitationGroup } from '../types';
import { AlertOctagon, BookOpen, Quote, ChevronDown, ChevronUp } from 'lucide-react';

interface LimitationsListProps {
  limitationGroups: LimitationGroup[];
}

export const LimitationsList: React.FC<LimitationsListProps> = ({ limitationGroups }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    limitationGroups.length > 0 ? limitationGroups[0].id : null
  );

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (limitationGroups.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#FAF8F5] p-8 text-center text-[#6B7280]">
        <p className="text-sm">No limitation groups have been synthesized yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#FAF8F5]">
        <div>
          <h3 className="font-['DM_Sans'] text-base font-semibold text-[#431407] flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-[#D97706]" />
            <span>Recurring Limitations Across Literature ({limitationGroups.length})</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Systematically clustered constraints across datasets, architectures, and real-world deployment.
          </p>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#EFEFEA] text-[#431407] border border-[#FAF8F5]">
          Literature Clustered
        </span>
      </div>

      <div className="space-y-4">
        {limitationGroups.map((group) => {
          const isExpanded = expandedId === group.id;
          return (
            <div
              key={group.id}
              className="bg-[#FFFFFF] rounded-[10px] border border-[#FAF8F5] shadow-2xs overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF8F5] text-[#D97706] border border-[#FAF8F5] mb-2">
                      {group.category}
                    </span>

                    <h4 className="font-['DM_Sans'] text-base font-semibold text-[#431407] leading-snug">
                      {group.limitation}
                    </h4>

                    <p className="text-xs text-[#4A5568] mt-1.5 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggle(group.id)}
                    className="p-1.5 text-[#6B7280] hover:text-[#431407] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
                    title={isExpanded ? 'Collapse evidence quotes' : 'Expand evidence quotes'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Supporting Papers Tag */}
                <div className="mt-3 pt-3 border-t border-[#F4F4F5] flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-medium text-[#6B7280] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                    Documented In:
                  </span>
                  {group.supportingPaperTitles.map((title, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FAF8F5] text-[#431407] border border-[#FAF8F5] px-2 py-0.5 rounded text-[11px]"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Excerpts / Quotes */}
              {isExpanded && group.evidence && group.evidence.length > 0 && (
                <div className="px-5 pb-5 pt-3 border-t border-[#FAF8F5] bg-[#FAF8F5] space-y-2">
                  <div className="text-[11px] font-semibold text-[#431407] uppercase tracking-wider">
                    Direct Excerpts from Literature:
                  </div>
                  <div className="space-y-2">
                    {group.evidence.map((ev, qi) => (
                      <div
                        key={qi}
                        className="bg-[#FFFFFF] border border-[#FAF8F5] rounded p-3 text-xs text-[#242A29] italic leading-relaxed flex items-start gap-2"
                      >
                        <Quote className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5 not-italic" />
                        <div>
                          <span>&ldquo;{ev.passage}&rdquo;</span>
                          <span className="block mt-1 not-italic font-medium text-[11px] text-[#4A5568]">
                            &mdash; {ev.paperTitle} {ev.section ? `(${ev.section})` : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
