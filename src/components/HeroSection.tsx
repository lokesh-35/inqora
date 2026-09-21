import React from 'react';
import { ArrowRight, BookOpen, Layers, GitCompare, Lightbulb, Compass, FileText } from 'lucide-react';

interface HeroSectionProps {
  onStartResearch: () => void;
  onSeeHowItWorks?: () => void;
  onExploreSample?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartResearch,
  onSeeHowItWorks,
  onExploreSample,
}) => {
  return (
    <section className="py-16 md:py-24 border-b border-[#D9E0E5] bg-[#F7F8F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium text-[#40566D] bg-[#FFFFFF] border border-[#D9E0E5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F7F7A]" />
              Academic Research Assistant
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#17324D] leading-[1.18]">
              Understand the research. <br className="hidden sm:inline" />
              Find what comes next.
            </h1>

            <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-2xl">
              Explore research papers, compare evidence, identify potential research gaps, and discover possible directions for further study.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-start-research-btn"
                type="button"
                onClick={onStartResearch}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-[#17324D] hover:bg-[#1f4164] transition-colors shadow-xs cursor-pointer"
              >
                <span>Start Research</span>
                <ArrowRight className="w-4 h-4 ml-2 text-slate-300" />
              </button>

              <button
                id="hero-how-it-works-btn"
                type="button"
                onClick={onExploreSample || onSeeHowItWorks}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-[#17324D] bg-[#FFFFFF] hover:bg-slate-50 border border-[#D9E0E5] transition-colors cursor-pointer"
              >
                {onExploreSample ? 'Explore Sample Analysis' : 'See How It Works'}
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[#667085]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#40566D]" />
                <span>Evidence-grounded citations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#40566D]" />
                <span>Methodology comparison</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#40566D]" />
                <span>Zero unverified novelty claims</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Clean Abstract Representation */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-xl p-6 shadow-xs relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#D9E0E5]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#40566D]">
                  Research Progression Pipeline
                </span>
                <span className="text-[11px] text-[#667085]">Scholarly Synthesis</span>
              </div>

              {/* Sequential Flow Nodes */}
              <div className="space-y-3 relative">
                {/* Connecting Line */}
                <div className="absolute left-4.5 top-4 bottom-4 w-px bg-[#D9E0E5] z-0" />

                {/* Step 1: Papers */}
                <div className="relative z-10 flex items-start gap-3.5 p-2.5 rounded-lg bg-[#F7F8F6] border border-[#D9E0E5]/80">
                  <div className="w-6 h-6 rounded bg-[#FFFFFF] border border-[#D9E0E5] flex items-center justify-center text-[#17324D] shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17324D]">Research Papers</span>
                      <span className="text-[10px] text-[#667085]">Corpus Collection</span>
                    </div>
                    <p className="text-[11px] text-[#667085] truncate">
                      Extracted methodologies, sample splits, and benchmark results
                    </p>
                  </div>
                </div>

                {/* Step 2: Evidence */}
                <div className="relative z-10 flex items-start gap-3.5 p-2.5 rounded-lg bg-[#F7F8F6] border border-[#D9E0E5]/80">
                  <div className="w-6 h-6 rounded bg-[#FFFFFF] border border-[#D9E0E5] flex items-center justify-center text-[#2F7F7A] shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17324D]">Reported Evidence</span>
                      <span className="text-[10px] text-[#2F7F7A] font-medium">Direct Excerpts</span>
                    </div>
                    <p className="text-[11px] text-[#667085] truncate">
                      Verifiable quotes and empirical performance figures
                    </p>
                  </div>
                </div>

                {/* Step 3: Comparison */}
                <div className="relative z-10 flex items-start gap-3.5 p-2.5 rounded-lg bg-[#F7F8F6] border border-[#D9E0E5]/80">
                  <div className="w-6 h-6 rounded bg-[#FFFFFF] border border-[#D9E0E5] flex items-center justify-center text-[#40566D] shrink-0 mt-0.5">
                    <GitCompare className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17324D]">Comparison Matrix</span>
                      <span className="text-[10px] text-[#667085]">Cross-Evaluation</span>
                    </div>
                    <p className="text-[11px] text-[#667085] truncate">
                      Dataset distributions, architectural tradeoffs, and testing protocols
                    </p>
                  </div>
                </div>

                {/* Step 4: Research Gap */}
                <div className="relative z-10 flex items-start gap-3.5 p-2.5 rounded-lg bg-[#F7F8F6] border border-[#D9E0E5]/80">
                  <div className="w-6 h-6 rounded bg-[#FFFFFF] border border-[#D9E0E5] flex items-center justify-center text-[#17324D] shrink-0 mt-0.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17324D]">Potential Research Gap</span>
                      <span className="text-[10px] text-[#40566D] font-medium">Supported Opportunity</span>
                    </div>
                    <p className="text-[11px] text-[#667085] truncate">
                      Unaddressed environmental variability across real-world deployments
                    </p>
                  </div>
                </div>

                {/* Step 5: New Direction */}
                <div className="relative z-10 flex items-start gap-3.5 p-2.5 rounded-lg bg-[#FFFFFF] border border-[#2F7F7A]">
                  <div className="w-6 h-6 rounded bg-[#2F7F7A] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17324D]">Future Direction</span>
                      <span className="text-[10px] text-[#2F7F7A] font-semibold">Research Blueprint</span>
                    </div>
                    <p className="text-[11px] text-[#667085] truncate">
                      Grounded study designs, validation datasets &amp; evaluation criteria
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9E0E5] flex items-center justify-between text-[11px] text-[#667085]">
                <span>Rigorous literature synthesis</span>
                <span className="text-[#2F7F7A] font-medium">Traceable to primary sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
