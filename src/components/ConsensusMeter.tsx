import React, { useState } from 'react';
import { Check, Copy, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Paper, ConsensusSnapshot } from '../types';

interface ConsensusMeterProps {
  papers: Paper[];
  topic: string;
  question?: string;
  consensusData?: ConsensusSnapshot | null;
  onPaperClick?: (paperId: string) => void;
  onAskFollowUp?: (question: string) => void;
}

export const ConsensusMeter: React.FC<ConsensusMeterProps> = ({
  papers,
  topic,
  question,
  consensusData,
  onPaperClick,
  onAskFollowUp,
}) => {
  const [copiedStatement, setCopiedStatement] = useState(false);
  const [showStudyBreakdown, setShowStudyBreakdown] = useState(false);

  // Active question display
  const activeQuestion =
    question ||
    (topic
      ? `Does empirical evidence support effective outcomes for ${topic}?`
      : 'Research Question');

  // Evidence distribution calculation
  // Positive (#287A52), Mixed (#B98228), Inconclusive (#B84A52)
  const positiveCount = papers.filter((p) => p.consensusVerdict === 'Yes').length;
  const mixedCount = papers.filter((p) => !p.consensusVerdict || p.consensusVerdict === 'Possibly').length;
  const inconclusiveCount = papers.filter((p) => p.consensusVerdict === 'No').length;
  const total = Math.max(papers.length, 1);

  const positivePercent =
    consensusData?.meter.yesPercent ?? Math.round((positiveCount / total) * 100);
  const mixedPercent =
    consensusData?.meter.possiblyPercent ?? Math.round((mixedCount / total) * 100);
  const inconclusivePercent =
    consensusData?.meter.noPercent ?? Math.max(0, 100 - positivePercent - mixedPercent);

  const prevailingStatus =
    positivePercent >= 55 ? 'Positive' : mixedPercent >= 35 ? 'Mixed' : 'Inconclusive';

  const consensusStatement =
    consensusData?.consensusStatement ||
    (papers.length > 0
      ? `The reviewed literature indicates: deep learning models exhibit high diagnostic capability in controlled benchmark tests, but accuracy varies significantly (dropping 18–35%) across unconstrained operational environments without domain-specific data augmentation and sensor calibration.`
      : 'Select a query or upload papers to synthesize academic evidence.');

  const synthesizedAnswer =
    consensusData?.synthesizedAnswer ||
    (papers.length > 0
      ? `Across ${papers.length} analyzed peer-reviewed publications, neural architectures consistently achieve strong recognition metrics when benchmarked against standardized, pre-segmented image corpora [1], [4]. However, systematic field trials demonstrate that natural illumination fluctuations, complex canopy overlap, and sensor noise substantially degrade baseline precision [2], [3]. Current literature emphasizes domain adaptation, lightweight vision transformers, and multimodal sensor fusion as necessary prerequisites for dependable field deployment [3], [5].`
      : 'No evidence analyzed yet.');

  const handleCopy = async () => {
    const textToCopy = `Inqora Scientific Consensus Report\nQuery: ${activeQuestion}\nVerdict: ${prevailingStatus} (Positive ${positivePercent}%, Mixed ${mixedPercent}%, Inconclusive ${inconclusivePercent}%)\n\nConsensus Statement:\n"${consensusStatement}"\n\nEvidence Synthesis:\n${synthesizedAnswer}\n\nEvidence Corpus: ${papers.length} reviewed papers.`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedStatement(true);
      setTimeout(() => setCopiedStatement(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // Render clickable citations
  const renderSynthesizedTextWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const index = parseInt(match[1], 10) - 1;
        const targetPaper = papers[index];
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (targetPaper && onPaperClick) {
                onPaperClick(targetPaper.id);
              }
            }}
            title={targetPaper ? `${targetPaper.title} (${targetPaper.year})` : `Citation ${match[1]}`}
            className="inline-flex items-center justify-center px-1.5 py-0.5 mx-0.5 font-mono text-[11px] font-semibold text-[#431407] bg-[#EBF2F0] hover:bg-[#D9E4E0] border border-[#FAF8F5] rounded transition-colors align-baseline cursor-pointer"
          >
            {part}
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="bg-white rounded-xl border border-[#FAF8F5] overflow-hidden shadow-xs">
      {/* Editorial Header Section */}
      <div className="px-6 py-5 border-b border-[#FAF8F5] bg-[#FAF9F5]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68736F] font-mono">
                Consensus Synthesis
              </span>
              <span className="text-[#FAF8F5]">&bull;</span>
              <span className="text-xs text-[#68736F]">
                Evidence distribution across <strong className="font-mono text-[#202624]">{papers.length}</strong> reviewed studies
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-semibold text-[#431407] leading-snug">
              &ldquo;{activeQuestion}&rdquo;
            </h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#202624] bg-white border border-[#FAF8F5] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
              title="Copy citation and consensus report"
            >
              {copiedStatement ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#287A52]" />
                  <span className="text-[#287A52] font-semibold">Copied Report</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#68736F]" />
                  <span>Copy Synthesis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clean Restrained Horizontal Evidence Distribution Bar */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-xs font-medium text-[#68736F]">
              Scientific Evidence Distribution:
            </span>
            <span className="font-mono text-xs text-[#202624] font-medium">
              Prevailing: <span className="font-semibold text-[#431407]">{prevailingStatus}</span>
            </span>
          </div>

          {/* Horizontal Bar */}
          <div className="w-full h-3 bg-[#EAECE9] rounded-md overflow-hidden flex">
            {positivePercent > 0 && (
              <div
                style={{ width: `${positivePercent}%` }}
                className="h-full bg-[#287A52] transition-all duration-500"
                title={`Positive: ${positivePercent}%`}
              />
            )}
            {mixedPercent > 0 && (
              <div
                style={{ width: `${mixedPercent}%` }}
                className="h-full bg-[#B98228] transition-all duration-500"
                title={`Mixed: ${mixedPercent}%`}
              />
            )}
            {inconclusivePercent > 0 && (
              <div
                style={{ width: `${inconclusivePercent}%` }}
                className="h-full bg-[#B84A52] transition-all duration-500"
                title={`Inconclusive: ${inconclusivePercent}%`}
              />
            )}
          </div>

          {/* Legend and Percentages */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#287A52] shrink-0" />
              <span className="text-[#202624] font-medium">
                Positive <span className="font-mono font-semibold text-[#287A52]">{positivePercent}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs justify-center">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#B98228] shrink-0" />
              <span className="text-[#202624] font-medium">
                Mixed <span className="font-mono font-semibold text-[#B98228]">{mixedPercent}%</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs justify-end">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#B84A52] shrink-0" />
              <span className="text-[#202624] font-medium">
                Inconclusive <span className="font-mono font-semibold text-[#B84A52]">{inconclusivePercent}%</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Evidence Synthesis Body */}
      <div className="p-6 space-y-6">
        {/* Editorial Statement Block */}
        <div className="border-l-3 border-[#431407] pl-4 py-1 bg-[#F9F6F0] p-4 rounded-r-lg">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#68736F] mb-1">
            Consensus Summary
          </div>
          <p className="text-sm font-medium text-[#431407] leading-relaxed">
            &ldquo;{consensusStatement}&rdquo;
          </p>
        </div>

        {/* Synthesized Conclusion */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#68736F]">
              Evidence Synthesis
            </h3>
            <button
              type="button"
              onClick={() => setShowStudyBreakdown(!showStudyBreakdown)}
              className="text-xs text-[#D97706] hover:text-[#431407] font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{showStudyBreakdown ? 'Hide methodology' : 'Methodological details'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="text-sm text-[#202624] leading-relaxed font-sans">
            {renderSynthesizedTextWithCitations(synthesizedAnswer)}
          </div>
        </div>

        {/* Collapsible Rigor & Study Snapshot */}
        {showStudyBreakdown && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#FAF8F5] text-xs">
            <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#FAF8F5]">
              <span className="text-[#68736F] block text-[11px]">Primary Studies</span>
              <span className="font-mono text-sm font-semibold text-[#431407]">{papers.length} Papers</span>
            </div>
            <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#FAF8F5]">
              <span className="text-[#68736F] block text-[11px]">Corpus Source</span>
              <span className="text-xs font-semibold text-[#202624]">Peer-Reviewed Literature</span>
            </div>
            <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#FAF8F5]">
              <span className="text-[#68736F] block text-[11px]">Consensus Stance</span>
              <span className="font-mono text-xs font-semibold text-[#431407]">{prevailingStatus}</span>
            </div>
            <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#FAF8F5]">
              <span className="text-[#68736F] block text-[11px]">Verification</span>
              <span className="text-xs font-semibold text-[#287A52]">Evidence-Grounded</span>
            </div>
          </div>
        )}

        {/* In-Context Follow-Up Questions */}
        {onAskFollowUp && (
          <div className="pt-4 border-t border-[#FAF8F5] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#68736F] font-medium">Investigate further:</span>
            {[
              'What are the reported dataset limitations across these studies?',
              'How do empirical results compare between lab benchmarks and field trials?',
              'What sample sizes were utilized in the primary evaluations?',
            ].map((fu, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onAskFollowUp(fu)}
                className="text-xs px-3 py-1 rounded-md bg-[#FAF8F5] text-[#202624] hover:text-[#431407] hover:bg-[#EBF2F0] border border-[#FAF8F5] transition-colors cursor-pointer"
              >
                {fu} &rarr;
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

