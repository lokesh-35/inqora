import React from 'react';
import { BookOpen, Layers, ShieldCheck } from 'lucide-react';

export const EvidenceSection: React.FC = () => {
  const points = [
    {
      title: 'Evidence-based',
      subtitle: 'Paper Traceability',
      description: 'See which papers support each observation with extracted excerpts and direct methodology links.',
      icon: BookOpen,
    },
    {
      title: 'Transparent',
      subtitle: 'Separation of Claims',
      description: 'Separate reported empirical findings in the literature from AI-generated research suggestions.',
      icon: Layers,
    },
    {
      title: 'Careful',
      subtitle: 'Rigorous Language',
      description: 'Potential gaps are not presented as claims of absolute novelty, but as insufficiently addressed dimensions in the reviewed corpus.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="evidence" className="py-16 md:py-20 bg-[#F7F8F6] border-b border-[#D9E0E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#40566D] mb-2">
            Scholarly Integrity
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#17324D] tracking-tight">
            Built around evidence, not assumptions.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
            The system connects potential research gaps to the papers and limitations that support them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#F7F8F6] border border-[#D9E0E5] flex items-center justify-center text-[#17324D] mb-4">
                    <Icon className="w-5 h-5 text-[#2F7F7A]" />
                  </div>

                  <div className="text-[11px] font-semibold text-[#40566D] uppercase tracking-wider mb-1">
                    {pt.subtitle}
                  </div>

                  <h3 className="text-lg font-semibold text-[#17324D] mb-2">
                    {pt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    {pt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9E0E5] flex items-center gap-2 text-xs font-medium text-[#17324D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7F7A]" />
                  <span>Scholarly verification standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
