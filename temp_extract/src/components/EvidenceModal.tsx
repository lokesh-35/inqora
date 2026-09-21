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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A35]/40 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#D9DEDA] flex items-start justify-between gap-3 bg-[#F7F6F2]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FFFFFF] text-[#2F6F68] border border-[#D9DEDA]">
                Evidence Traceability Matrix
              </span>
              <span className="text-xs text-[#6B7280] font-medium">
                {gap.confidence}
              </span>
            </div>
            <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35] leading-snug">
              {gap.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#163A35] rounded hover:bg-[#EAEAE4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="bg-[#F7F6F2] p-3.5 rounded border border-[#D9DEDA] text-[#242A29]">
            <span className="font-semibold text-[#163A35] block mb-1">Observation:</span>
            <p className="leading-relaxed">{gap.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#163A35] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5 text-[#2F6F68]" />
              <span>Documented Empirical Excerpts &amp; Citations ({gap.evidence?.length || 0})</span>
            </h4>

            <div className="space-y-3">
              {gap.evidence && gap.evidence.length > 0 ? (
                gap.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-[#FFFFFF] rounded border border-[#D9DEDA] space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#F0F2EE] pb-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#163A35]">
                        <BookOpen className="w-3.5 h-3.5 text-[#2F6F68] shrink-0" />
                        <span>{ev.paperTitle}</span>
                      </div>
                      {ev.section && (
                        <span className="text-[10px] bg-[#F7F6F2] text-[#4A5568] border border-[#D9DEDA] px-2 py-0.5 rounded font-mono">
                          {ev.section}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#242A29] italic leading-relaxed pl-2 border-l-2 border-[#C7A66B]">
                      &ldquo;{ev.passage}&rdquo;
                    </p>

                    {ev.reportedFact && (
                      <div className="text-[11px] text-[#6B7280] pt-1">
                        <span className="font-medium text-[#163A35]">Reported Finding: </span>
                        {ev.reportedFact}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4 bg-[#F7F6F2] rounded border border-[#D9DEDA] text-[#6B7280]">
                  No direct excerpts linked for this gap observation.
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#F7F6F2] p-3 rounded border border-[#D9DEDA] flex items-center gap-2 text-[11px] text-[#4A5568]">
            <ShieldCheck className="w-4 h-4 text-[#2F6F68] shrink-0" />
            <span>
              All excerpts are extracted directly from peer-reviewed literature without synthetic alterations.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#D9DEDA] bg-[#F7F6F2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded text-xs font-medium text-[#163A35] bg-[#FFFFFF] border border-[#D9DEDA] hover:bg-[#F7F6F2] hover:border-[#2F6F68] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
