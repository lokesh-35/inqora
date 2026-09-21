import React, { useState } from 'react';
import { Paper } from '../types';
import {
  Table,
  ExternalLink,
  Download,
  FileSpreadsheet,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react';
import { generateBibTeX } from './PapersList';

interface ComparisonTableProps {
  papers: Paper[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ papers }) => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  const handleExportCSV = () => {
    const headers = [
      'Paper Title',
      'Authors',
      'Year',
      'DOI',
      'Methodology',
      'Dataset / Population',
      'Sample Size',
      'Key Findings',
      'Limitations',
      'Evidence Quality'
    ];

    const rows = papers.map((p) => [
      `"${(p.title || '').replace(/"/g, '""')}"`,
      `"${((p.authors || []).join('; ')).replace(/"/g, '""')}"`,
      `"${p.year || ''}"`,
      `"${p.doi || ''}"`,
      `"${(p.methodology || '').replace(/"/g, '""')}"`,
      `"${(p.population || p.dataset || '').replace(/"/g, '""')}"`,
      `"${(p.sampleSize || p.datasetSize || '').replace(/"/g, '""')}"`,
      `"${(p.keyTakeaway || p.keyResults || '').replace(/"/g, '""')}"`,
      `"${((p.limitations || []).join(' | ')).replace(/"/g, '""')}"`,
      `"${p.rigorBadge || 'Peer-Reviewed'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rexa_literature_matrix_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleExportBibTeX = () => {
    const allBib = papers.map((p) => generateBibTeX(p)).join('\n\n');
    const blob = new Blob([allBib], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rexa_matrix_citations_${Date.now()}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (papers.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-xl border border-[#D9DEDA] p-10 text-center text-[#6B7280]">
        <Table className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3 stroke-1" />
        <p className="text-sm font-medium text-[#163A35]">No research papers available to compare.</p>
        <p className="text-xs text-[#6B7280] mt-1">
          Perform a research search to compile a comparative literature matrix.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Matrix Header & Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9DEDA]">
        <div>
          <h3 className="font-['DM_Sans'] text-base font-semibold text-[#163A35] flex items-center gap-2">
            <Table className="w-4 h-4 text-[#2F6F68]" />
            <span>Scholarly Literature Review Matrix</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Systematic cross-study synthesis of methodologies, cohorts, empirical findings, and validity bounds.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            id="export-csv-btn"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#163A35] bg-[#FFFFFF] border border-[#D9DEDA] hover:bg-[#F7F6F2] hover:border-[#2F6F68] rounded-md transition-colors cursor-pointer"
            title="Download literature matrix as CSV"
          >
            {copiedCsv ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2F6F68]" />
                <span className="text-[#2F6F68] font-semibold">Exported CSV</span>
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#4A5568]" />
                <span>Export CSV</span>
              </>
            )}
          </button>
          <button
            type="button"
            id="export-bib-btn"
            onClick={handleExportBibTeX}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#163A35] bg-[#FFFFFF] border border-[#D9DEDA] hover:bg-[#F7F6F2] hover:border-[#2F6F68] rounded-md transition-colors cursor-pointer"
            title="Export all references as .bib"
          >
            <Download className="w-3.5 h-3.5 text-[#4A5568]" />
            <span>Export BibTeX</span>
          </button>
        </div>
      </div>

      {/* Academic Table with Fixed Sticky Header */}
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-[0_1px_3px_rgba(22,58,53,0.03)] overflow-hidden">
        <div className="overflow-x-auto max-h-[620px] scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-[#EFEFEA] border-b border-[#D9DEDA] text-[#163A35] shadow-xs">
              <tr className="divide-x divide-[#D9DEDA]">
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[200px] w-1/5">
                  Paper &amp; DOI
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[170px] w-1/6">
                  Methodology
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[170px] w-1/6">
                  Dataset / Population
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[120px] w-1/12">
                  Sample Size
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[220px] w-1/4">
                  Key Findings
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[200px] w-1/5">
                  Limitations
                </th>
                <th className="py-3 px-3.5 font-semibold uppercase tracking-wider text-[11px] min-w-[130px] w-1/12 text-center">
                  Evidence Quality
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAE4]">
              {papers.map((paper, idx) => {
                const isSelected = selectedPaper?.id === paper.id;
                const sampleSizeDisplay = paper.sampleSize || paper.datasetSize || '—';
                const populationDisplay = paper.population || paper.dataset || 'Controlled agronomic dataset';
                const doi = paper.doi || (paper.url && paper.url.includes('doi.org') ? paper.url.split('doi.org/')[1] : null);

                return (
                  <tr
                    key={paper.id || idx}
                    id={`matrix-row-${idx + 1}`}
                    onClick={() => setSelectedPaper(isSelected ? null : paper)}
                    className={`divide-x divide-[#F0F2EE] cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#F7F6F2]' : 'hover:bg-[#F9F9F6]'
                    }`}
                  >
                    {/* 1. Paper Title, Authors, Year, DOI */}
                    <td className="py-3.5 px-3.5 align-top">
                      <div className="font-['DM_Sans'] font-semibold text-[#163A35] leading-snug">
                        {paper.title}
                      </div>
                      <div className="text-[11px] text-[#4A5568] mt-1">
                        {paper.authors && paper.authors.length > 0
                          ? paper.authors[0] + (paper.authors.length > 1 ? ' et al.' : '')
                          : 'Authors not reported'}{' '}
                        <span className="font-mono text-[#163A35] font-medium">({paper.year || '2024'})</span>
                      </div>
                      {doi && (
                        <div className="font-mono text-[10px] text-[#6B7280] mt-1 truncate max-w-[180px]" title={doi}>
                          doi:{doi}
                        </div>
                      )}
                    </td>

                    {/* 2. Methodology */}
                    <td className="py-3.5 px-3.5 align-top text-[#242A29]">
                      <div className="leading-relaxed">
                        {paper.methodology || 'Not reported in abstract'}
                      </div>
                      {paper.studyType && (
                        <span className="inline-block mt-1.5 text-[10px] font-medium text-[#2F6F68] bg-[#F7F6F2] px-1.5 py-0.5 rounded border border-[#E5E7EB]">
                          {paper.studyType}
                        </span>
                      )}
                    </td>

                    {/* 3. Dataset / Population */}
                    <td className="py-3.5 px-3.5 align-top text-[#4A5568]">
                      <div className="leading-relaxed">
                        {populationDisplay}
                      </div>
                    </td>

                    {/* 4. Sample Size (IBM Plex Mono) */}
                    <td className="py-3.5 px-3.5 align-top font-mono text-[11px] text-[#163A35] font-medium">
                      {sampleSizeDisplay}
                    </td>

                    {/* 5. Key Findings */}
                    <td className="py-3.5 px-3.5 align-top text-[#242A29]">
                      <div className="leading-relaxed">
                        {paper.keyTakeaway || paper.keyResults || paper.mainConclusions || '—'}
                      </div>
                    </td>

                    {/* 6. Limitations */}
                    <td className="py-3.5 px-3.5 align-top text-[#4A5568]">
                      {paper.limitations && paper.limitations.length > 0 ? (
                        <ul className="space-y-1">
                          {paper.limitations.slice(0, 2).map((lim, li) => (
                            <li key={li} className="flex items-start gap-1.5">
                              <span className="text-[#C7A66B] font-bold">―</span>
                              <span className="leading-snug">{lim}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-[#9CA3AF]">—</span>
                      )}
                    </td>

                    {/* 7. Risk of Bias / Evidence Quality */}
                    <td className="py-3.5 px-3.5 align-top text-center">
                      <span className="inline-block px-2 py-1 rounded text-[10px] font-medium bg-[#FFFFFF] text-[#163A35] border border-[#D9DEDA] shadow-2xs">
                        {paper.rigorBadge || 'Peer-Reviewed'}
                      </span>
                      {paper.citationsCount !== undefined && (
                        <div className="font-mono text-[10px] text-[#6B7280] mt-1">
                          {paper.citationsCount} cites
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Paper Details Inspection Drawer */}
      {selectedPaper && (
        <div className="bg-[#FFFFFF] border border-[#2F6F68]/30 rounded-[10px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#D9DEDA]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#2F6F68] tracking-wider">
                Full Record Inspection:
              </span>
              <h4 className="font-['DM_Sans'] text-sm font-semibold text-[#163A35]">
                {selectedPaper.title}
              </h4>
            </div>
            {selectedPaper.url && (
              <a
                href={selectedPaper.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#2F6F68] hover:text-[#163A35] inline-flex items-center gap-1 font-medium"
              >
                <span>Direct Access</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#F7F6F2] rounded border border-[#EAEAE4]">
              <span className="font-semibold text-[#163A35] block mb-1">Architecture / Method:</span>
              <p className="text-[#4A5568] leading-relaxed">
                {selectedPaper.methodology || 'Not detailed'}
              </p>
            </div>
            <div className="p-3 bg-[#F7F6F2] rounded border border-[#EAEAE4]">
              <span className="font-semibold text-[#163A35] block mb-1">Dataset / Cohort:</span>
              <p className="text-[#4A5568] leading-relaxed">
                {selectedPaper.population || selectedPaper.dataset || 'Not detailed'}
              </p>
            </div>
            <div className="p-3 bg-[#F7F6F2] rounded border border-[#EAEAE4]">
              <span className="font-semibold text-[#163A35] block mb-1">Key Empirical Metrics:</span>
              <p className="text-[#4A5568] leading-relaxed">
                {selectedPaper.keyResults || selectedPaper.keyTakeaway || 'Not detailed'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
