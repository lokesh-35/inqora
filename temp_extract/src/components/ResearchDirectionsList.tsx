import React from 'react';
import { ResearchDirection } from '../types';
import { Compass, Cpu, Database, Activity, ListOrdered } from 'lucide-react';

interface ResearchDirectionsListProps {
  researchDirections: ResearchDirection[];
}

export const ResearchDirectionsList: React.FC<ResearchDirectionsListProps> = ({
  researchDirections,
}) => {
  if (researchDirections.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] p-8 text-center text-[#6B7280]">
        <p className="text-sm">No research directions have been suggested yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#D9DEDA]">
        <div>
          <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#2F6F68]" />
            <span>Suggested Research Directions &amp; Blueprints ({researchDirections.length})</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Scientifically grounded methodologies and evaluation designs formulated to address identified literature gaps.
          </p>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#EFEFEA] text-[#163A35] border border-[#D9DEDA]">
          Hypothesis Blueprints
        </span>
      </div>

      <div className="space-y-4">
        {researchDirections.map((dir, idx) => {
          return (
            <div
              key={dir.id || idx}
              className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] p-5 shadow-2xs space-y-4"
            >
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#2F6F68] uppercase tracking-wider block mb-1">
                  Research Direction #{idx + 1}
                </span>
                <h4 className="font-['DM_Sans'] text-base font-semibold text-[#163A35] leading-snug">
                  {dir.title}
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  <span className="font-semibold text-[#163A35]">Target Problem:</span> {dir.problem}
                </p>
              </div>

              {/* Proposed Approach */}
              <div className="text-xs text-[#242A29] bg-[#F7F6F2] p-3.5 rounded border border-[#D9DEDA] leading-relaxed">
                <span className="font-semibold text-[#163A35] block mb-1">
                  Proposed Investigation Approach:
                </span>
                {dir.proposedApproach}
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {dir.models && dir.models.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded p-3">
                    <span className="font-semibold text-[#163A35] flex items-center gap-1.5 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-[#2F6F68]" />
                      Candidate Architectures:
                    </span>
                    <p className="text-[#4A5568] leading-relaxed font-mono text-[11px]">
                      {dir.models.join(', ')}
                    </p>
                  </div>
                )}

                {dir.dataset && (
                  <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded p-3">
                    <span className="font-semibold text-[#163A35] flex items-center gap-1.5 mb-1">
                      <Database className="w-3.5 h-3.5 text-[#2F6F68]" />
                      Target Cohort / Dataset:
                    </span>
                    <p className="text-[#4A5568] leading-relaxed">
                      {dir.dataset}
                    </p>
                  </div>
                )}

                {dir.metrics && dir.metrics.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#D9DEDA] rounded p-3">
                    <span className="font-semibold text-[#163A35] flex items-center gap-1.5 mb-1">
                      <Activity className="w-3.5 h-3.5 text-[#2F6F68]" />
                      Recommended Validation Metrics:
                    </span>
                    <p className="text-[#4A5568] leading-relaxed font-mono text-[11px]">
                      {dir.metrics.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Step-by-Step Implementation */}
              {dir.methodology && dir.methodology.length > 0 && (
                <div className="pt-2">
                  <span className="font-semibold text-xs text-[#163A35] flex items-center gap-1 mb-2">
                    <ListOrdered className="w-3.5 h-3.5 text-[#2F6F68]" />
                    Phased Experimental Roadmap:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {dir.methodology.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-[#F7F6F2] border border-[#D9DEDA] rounded p-2.5 text-xs text-[#242A29]"
                      >
                        <span className="font-bold text-[#163A35] font-mono mr-1">
                          Phase {sIdx + 1}:
                        </span>
                        <span>{step}</span>
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
