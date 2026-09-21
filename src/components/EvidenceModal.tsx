import React from 'react';
import { PotentialGap } from '../types';
import { X, Quote, ShieldCheck, BookOpen } from 'lucide-react';

interface EvidenceModalProps {
  gap: PotentialGap | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ gap, onClose }) => {
  if (!gap) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#431407]/40 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#FAF8F5] shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#FAF8F5] flex items-start justify-between gap-3 bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FFFFFF] text-[#D97706] border border-[#FAF8F5]">
                Evidence Traceability Matrix
              </span>
              <span className="text-xs text-[#6B7280] font-medium">
                {gap.confidence}
              </span>
            </div>
            <h3 className="font-['DM_Sans'] text-base font-semibold text-[#431407] leading-snug">
              {gap.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#431407] rounded hover:bg-[#F4F4F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#FAF8F5] text-[#242A29]">
            <span className="font-semibold text-[#431407] block mb-1">Observation:</span>
            <p className="leading-relaxed">{gap.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#431407] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Documented Empirical Excerpts &amp; Citations ({gap.evidence?.length || 0})</span>
            </h4>

            <div className="space-y-3">
              {gap.evidence && gap.evidence.length > 0 ? (
                gap.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-[#FFFFFF] rounded border border-[#FAF8F5] space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#F4F4F5] pb-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#431407]">
                        <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span>{ev.paperTitle}</span>
                      </div>
                      {ev.section && (
                        <span className="text-[10px] bg-[#FAF8F5] text-[#4A5568] border border-[#FAF8F5] px-2 py-0.5 rounded font-mono">
                          {ev.section}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#242A29] italic leading-relaxed pl-2 border-l-2 border-[#D97706]">
                      &ldquo;{ev.passage}&rdquo;
                    </p>

                    {ev.reportedFact && (
                      <div className="text-[11px] text-[#6B7280] pt-1">
                        <span className="font-medium text-[#431407]">Reported Finding: </span>
                        {ev.reportedFact}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4 bg-[#FAF8F5] rounded border border-[#FAF8F5] text-[#6B7280]">
                  No direct excerpts linked for this gap observation.
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-3 rounded border border-[#FAF8F5] flex items-center gap-2 text-[11px] text-[#4A5568]">
            <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>
              All excerpts are extracted directly from peer-reviewed literature without synthetic alterations.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#FAF8F5] bg-[#FAF8F5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded text-xs font-medium text-[#431407] bg-[#FFFFFF] border border-[#FAF8F5] hover:bg-[#FAF8F5] hover:border-[#D97706] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
