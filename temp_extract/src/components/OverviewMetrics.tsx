import React from 'react';
import { AlertOctagon, Lightbulb, Compass, Sparkles } from 'lucide-react';

interface OverviewMetricsProps {
  paperCount: number;
  limitationGroupCount: number;
  potentialGapCount: number;
  researchDirectionCount: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({
  paperCount,
  limitationGroupCount,
  potentialGapCount,
  activeTab,
  onTabChange,
}) => {
  const cards = [
    {
      id: 'consensus',
      label: 'Consensus & Evidence',
      count: paperCount > 0 ? `${paperCount} Studies` : '0',
      desc: 'Consensus meter & key takeaways',
      icon: Sparkles,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    },
    {
      id: 'gaps',
      label: 'Potential Gaps',
      count: potentialGapCount,
      desc: 'Evidence-supported opportunities',
      icon: Lightbulb,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'comparison',
      label: 'Comparison Matrix',
      count: paperCount > 0 ? `${paperCount} Matrix` : '0',
      desc: 'Methods, datasets & field checks',
      icon: Compass,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'limitations',
      label: 'Limitation Clusters',
      count: limitationGroupCount,
      desc: 'Empirical bottlenecks across papers',
      icon: AlertOctagon,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        const isActive = activeTab === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onTabChange(c.id)}
            className={`text-left p-4 rounded-2xl border transition-all shadow-2xs ${
              isActive
                ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                : 'bg-white border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {c.label}
              </span>
              <div className={`p-1.5 rounded-xl border ${c.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {c.count}
            </div>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {c.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
};
