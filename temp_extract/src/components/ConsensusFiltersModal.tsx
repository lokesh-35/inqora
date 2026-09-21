import React, { useState } from 'react';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface ConsensusFilterState {
  yearRange: 'all' | '1yr' | '3yr' | '5yr' | '10yr' | 'custom';
  customYearStart?: number;
  customYearEnd?: number;
  studyTypes: string[];
  openAccessOnly: boolean;
  minCitations: number;
  enableConsensusMeter: boolean;
  deepReviewMode: boolean;
}

interface ConsensusFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ConsensusFilterState;
  onApplyFilters: (newFilters: ConsensusFilterState) => void;
}

const AVAILABLE_STUDY_TYPES = [
  { id: 'meta-analysis', label: 'Meta-Analysis & Systematic Review' },
  { id: 'systematic-review', label: 'Systematic Literature Review' },
  { id: 'rct', label: 'Randomized Controlled Trial (RCT)' },
  { id: 'empirical', label: 'Empirical Benchmark / Field Experiment' },
  { id: 'literature-review', label: 'Narrative Literature Review' },
  { id: 'observational', label: 'Observational / Cohort Study' },
];

export const ConsensusFiltersModal: React.FC<ConsensusFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<ConsensusFilterState>(filters);

  if (!isOpen) return null;

  const toggleStudyType = (id: string) => {
    setLocalFilters((prev) => {
      const exists = prev.studyTypes.includes(id);
      return {
        ...prev,
        studyTypes: exists
          ? prev.studyTypes.filter((t) => t !== id)
          : [...prev.studyTypes, id],
      };
    });
  };

  const handleReset = () => {
    const defaultFilters: ConsensusFilterState = {
      yearRange: 'all',
      studyTypes: [],
      openAccessOnly: false,
      minCitations: 0,
      enableConsensusMeter: true,
      deepReviewMode: false,
    };
    setLocalFilters(defaultFilters);
  };

  const handleSave = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A35]/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#D9DEDA] flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#2F6F68]" />
            <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35]">
              Methodology &amp; Corpus Filters
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
        <div className="p-6 space-y-6 overflow-y-auto text-sm scrollbar-thin">
          {/* Publication Date */}
          <div>
            <label className="block text-xs font-semibold text-[#163A35] uppercase tracking-wider mb-2.5">
              Publication Chronology
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Time' },
                { id: '1yr', label: 'Past Year' },
                { id: '3yr', label: 'Past 3 Years' },
                { id: '5yr', label: 'Past 5 Years' },
                { id: '10yr', label: 'Past 10 Years' },
                { id: 'custom', label: 'Custom Period' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      yearRange: opt.id as ConsensusFilterState['yearRange'],
                    }))
                  }
                  className={`py-2 px-3 rounded text-xs font-medium border text-center transition-colors cursor-pointer ${
                    localFilters.yearRange === opt.id
                      ? 'bg-[#163A35] text-white border-[#163A35]'
                      : 'bg-[#FFFFFF] text-[#4A5568] border-[#D9DEDA] hover:bg-[#F7F6F2]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {localFilters.yearRange === 'custom' && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="From (e.g. 2018)"
                  value={localFilters.customYearStart || ''}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      customYearStart: parseInt(e.target.value) || undefined,
                    }))
                  }
                  className="w-1/2 px-3 py-1.5 rounded border border-[#D9DEDA] text-xs focus:outline-hidden focus:border-[#2F6F68]"
                />
                <span className="text-[#6B7280] text-xs">to</span>
                <input
                  type="number"
                  placeholder="To (e.g. 2026)"
                  value={localFilters.customYearEnd || ''}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      customYearEnd: parseInt(e.target.value) || undefined,
                    }))
                  }
                  className="w-1/2 px-3 py-1.5 rounded border border-[#D9DEDA] text-xs focus:outline-hidden focus:border-[#2F6F68]"
                />
              </div>
            )}
          </div>

          {/* Study Types */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-[#163A35] uppercase tracking-wider">
                Methodological Design
              </label>
              {localFilters.studyTypes.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLocalFilters((prev) => ({ ...prev, studyTypes: [] }))}
                  className="text-[11px] text-[#2F6F68] hover:underline"
                >
                  Clear selections
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AVAILABLE_STUDY_TYPES.map((st) => {
                const isSelected = localFilters.studyTypes.includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => toggleStudyType(st.id)}
                    className={`flex items-center justify-between p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#F7F6F2] text-[#163A35] border-[#2F6F68] font-medium'
                        : 'bg-[#FFFFFF] text-[#4A5568] border-[#D9DEDA] hover:bg-[#F7F6F2]'
                    }`}
                  >
                    <span className="pr-1 leading-snug">{st.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2F6F68] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3 pt-2 border-t border-[#D9DEDA]">
            <label className="block text-xs font-semibold text-[#163A35] uppercase tracking-wider">
              Quality &amp; Access Controls
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="font-medium text-[#163A35] text-xs block">
                  Open Access Only
                </span>
                <span className="text-[11px] text-[#6B7280]">
                  Restrict to publications with freely available full-text reprints
                </span>
              </div>
              <input
                type="checkbox"
                checked={localFilters.openAccessOnly}
                onChange={(e) =>
                  setLocalFilters((prev) => ({ ...prev, openAccessOnly: e.target.checked }))
                }
                className="w-4 h-4 text-[#2F6F68] rounded border-[#D9DEDA] focus:ring-[#2F6F68]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="font-medium text-[#163A35] text-xs block">
                  Scientific Consensus Meter
                </span>
                <span className="text-[11px] text-[#6B7280]">
                  Calculate empirical agreement distribution across findings
                </span>
              </div>
              <input
                type="checkbox"
                checked={localFilters.enableConsensusMeter}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    enableConsensusMeter: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#2F6F68] rounded border-[#D9DEDA] focus:ring-[#2F6F68]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="font-medium text-[#163A35] text-xs block">
                  Deep Review Mode
                </span>
                <span className="text-[11px] text-[#6B7280]">
                  Synthesize cross-study limitation clusters and potential gaps
                </span>
              </div>
              <input
                type="checkbox"
                checked={localFilters.deepReviewMode}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    deepReviewMode: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#2F6F68] rounded border-[#D9DEDA] focus:ring-[#2F6F68]"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F7F6F2] border-t border-[#D9DEDA] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#163A35] font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#4A5568] bg-[#FFFFFF] border border-[#D9DEDA] rounded hover:bg-[#F7F6F2] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-medium text-white bg-[#163A35] hover:bg-[#2F6F68] rounded transition-colors shadow-2xs cursor-pointer"
            >
              Apply Filter Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
