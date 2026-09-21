import React from 'react';
import { Search, GitCompare, AlertCircle, Compass } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      label: 'Search',
      title: 'Search the literature',
      description: 'Find relevant research papers from available academic sources.',
      icon: Search,
    },
    {
      number: '02',
      label: 'Compare',
      title: 'Compare methodologies',
      description: 'Compare methods, datasets, results and limitations.',
      icon: GitCompare,
    },
    {
      number: '03',
      label: 'Identify',
      title: 'Identify constraints',
      description: 'Find recurring limitations and potential research gaps.',
      icon: AlertCircle,
    },
    {
      number: '04',
      label: 'Explore',
      title: 'Explore directions',
      description: 'Generate evidence-supported research directions.',
      icon: Compass,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[#D9E0E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#40566D] mb-2">
            Structured Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#17324D] tracking-tight">
            From literature to research direction
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667085]">
            A systematic, transparent process connecting literature discovery directly to actionable academic inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#F7F8F6] border border-[#D9E0E5] rounded-xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#40566D] font-mono">
                      {step.number} — {step.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#D9E0E5] flex items-center justify-center text-[#17324D]">
                      <Icon className="w-4 h-4 text-[#2F7F7A]" />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#17324D] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#D9E0E5]/60 text-[11px] text-[#667085] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7F7A]" />
                  <span>Verifiable step output</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
