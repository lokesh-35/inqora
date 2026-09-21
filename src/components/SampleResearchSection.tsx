import React from 'react';
import { ArrowRight, BookOpen, GitCompare, AlertOctagon, Lightbulb, CheckCircle2 } from 'lucide-react';

interface SampleResearchSectionProps {
  onLoadSample?: () => void;
  onOpenFullAnalysis?: () => void;
}

export const SampleResearchSection: React.FC<SampleResearchSectionProps> = ({
  onLoadSample,
  onOpenFullAnalysis,
}) => {
  const handleOpen = onOpenFullAnalysis || onLoadSample;
  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[#D9E0E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#F7F8F6] text-[#40566D] border border-[#D9E0E5] mb-2">
              Illustrative example
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#17324D] tracking-tight">
              See what a research analysis looks like
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Topic: <span className="font-semibold text-[#17324D]">AI-based crop disease detection in field conditions</span>
            </p>
          </div>

          <button
            id="sample-explore-btn"
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-white bg-[#17324D] hover:bg-[#1f4164] transition-colors shadow-xs cursor-pointer self-start md:self-auto"
          >
            <span>Open Sample in Workspace</span>
            <ArrowRight className="w-4 h-4 ml-1.5 text-slate-300" />
          </button>
        </div>

        {/* Preview Summary Box */}
        <div className="bg-[#F7F8F6] border border-[#D9E0E5] rounded-xl p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
                <span>Papers Analyzed</span>
                <BookOpen className="w-3.5 h-3.5 text-[#2F7F7A]" />
              </div>
              <div className="text-2xl font-bold text-[#17324D]">12</div>
              <div className="text-[11px] text-[#667085] mt-0.5">Peer-reviewed &amp; preprints</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
                <span>Methods Compared</span>
                <GitCompare className="w-3.5 h-3.5 text-[#2F7F7A]" />
              </div>
              <div className="text-sm font-bold text-[#17324D] leading-tight mt-1 truncate" title="CNN, YOLO, Vision Transformer">
                CNN, YOLO, ViT
              </div>
              <div className="text-[11px] text-[#667085] mt-0.5">3 model paradigms</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
                <span>Common Limitations</span>
                <AlertOctagon className="w-3.5 h-3.5 text-[#2F7F7A]" />
              </div>
              <div className="text-2xl font-bold text-[#17324D]">4</div>
              <div className="text-[11px] text-[#667085] mt-0.5">Repeated across 80% studies</div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-[#667085] mb-1">
                <span>Potential Research Gaps</span>
                <Lightbulb className="w-3.5 h-3.5 text-[#2F7F7A]" />
              </div>
              <div className="text-2xl font-bold text-[#17324D]">2</div>
              <div className="text-[11px] text-[#667085] mt-0.5">Evidence-supported</div>
            </div>
          </div>

          {/* Sample Finding Snippet */}
          <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#40566D] uppercase tracking-wider">
                Synthesized Consensus Observation
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#F7F8F6] text-[#40566D] border border-[#D9E0E5]">
                Moderate Evidence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed">
              &ldquo;The reviewed literature suggests: While evaluated architectures (ResNet-50, YOLOv8, Vision Transformers) achieve &gt;96% accuracy on clean benchmark splits like PlantVillage, performance degrades significantly (18–35% drop) in uncontrolled field conditions due to variable illumination and complex foliar backgrounds.&rdquo;
            </p>
            <div className="mt-3 pt-3 border-t border-[#D9E0E5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#667085]">
              <span>Supporting papers: Hughes &amp; Salathé (2016), Mohanty et al. (2016), Ferentinos (2018), et al.</span>
              <button
                type="button"
                onClick={onLoadSample}
                className="text-[#2F7F7A] hover:text-[#17324D] font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View evidence breakdown</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
