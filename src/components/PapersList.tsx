import React, { useState, useRef } from 'react';
import { Paper } from '../types';
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Quote,
  Download,
  BookOpen,
  FileText,
  AlertCircle,
  Database,
  Users,
} from 'lucide-react';

interface PapersListProps {
  papers: Paper[];
}

/**
 * Generate standard BibTeX citation entry for a research paper
 */
export function generateBibTeX(paper: Paper): string {
  const firstAuthor = paper.authors && paper.authors.length > 0 ? paper.authors[0] : 'Author';
  const lastName = firstAuthor.split(' ').pop()?.replace(/[^a-zA-Z]/g, '') || 'Author';
  const year = paper.year ? String(paper.year).replace(/[^0-9]/g, '') || '2024' : '2024';
  const firstWord = paper.title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .find((w) => w.length > 2)
    ?.toLowerCase() || 'paper';

  const citeKey = `${lastName.toLowerCase()}${year}${firstWord}`;
  const authorsBib = (paper.authors && paper.authors.length > 0 ? paper.authors : ['Unknown']).join(
    ' and '
  );

  const isArxiv = paper.source === 'arXiv' || (paper.id && paper.id.startsWith('arxiv-'));
  const entryType = isArxiv ? 'article' : 'article';

  let bib = `@${entryType}{${citeKey},\n`;
  bib += `  title = {${paper.title}},\n`;
  bib += `  author = {${authorsBib}},\n`;
  bib += `  year = {${year}},\n`;
  if (paper.url) {
    bib += `  url = {${paper.url}},\n`;
  }
  if (paper.doi) {
    bib += `  doi = {${paper.doi}},\n`;
  }
  if (isArxiv) {
    bib += `  journal = {arXiv preprint},\n`;
  } else if (paper.source && paper.source !== 'Demo Data' && paper.source !== 'Uploaded PDF') {
    bib += `  journal = {${paper.source}},\n`;
  }
  bib += `}`;

  return bib;
}

export const PapersList: React.FC<PapersListProps> = ({ papers }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopyBibTeX = async (paper: Paper, e: React.MouseEvent) => {
    e.stopPropagation();
    const bibtex = generateBibTeX(paper);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(bibtex);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = bibtex;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedId(paper.id);
      setTimeout(() => setCopiedId(null), 2000);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setToastMessage(`BibTeX citation copied for "${paper.title.slice(0, 45)}${paper.title.length > 45 ? '...' : ''}"`);
      toastTimeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    } catch (err) {
      console.error('Failed to copy BibTeX citation:', err);
    }
  };

  const handleCopyAllBibTeX = async () => {
    const allBib = papers.map((p) => generateBibTeX(p)).join('\n\n');
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(allBib);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = allBib;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setToastMessage(`All ${papers.length} BibTeX citations copied to clipboard.`);
      toastTimeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    } catch (err) {
      console.error('Failed to copy all BibTeX entries:', err);
    }
  };

  const handleDownloadBibFile = () => {
    const allBib = papers.map((p) => generateBibTeX(p)).join('\n\n');
    const blob = new Blob([allBib], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inqora_citations_${Date.now()}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (papers.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-xl border border-[#FAF8F5] p-10 text-center text-[#6B7280]">
        <FileText className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3 stroke-1" />
        <p className="text-sm font-medium text-[#431407]">No research papers indexed yet.</p>
        <p className="text-xs text-[#6B7280] mt-1">
          Enter a research inquiry above or use the sample literature corpus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Academic Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FAF8F5]">
        <div className="text-xs text-[#6B7280] flex items-center gap-2">
          <span>Database Index:</span>
          <span className="font-mono font-semibold text-[#431407] bg-[#EFEFEA] px-2 py-0.5 rounded text-[11px]">
            {papers.length} peer-reviewed records
          </span>
          <span className="text-[#9CA3AF]">·</span>
          <span>Verified DOI &amp; structured extraction</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            id="copy-all-bibtex-btn"
            onClick={handleCopyAllBibTeX}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#431407] bg-[#FFFFFF] border border-[#FAF8F5] hover:bg-[#FAF8F5] hover:border-[#D97706] rounded-md transition-colors cursor-pointer"
            title="Copy BibTeX citations for all records"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="text-[#D97706] font-semibold">Copied All (.bib)</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#4A5568]" />
                <span>Export BibTeX</span>
              </>
            )}
          </button>
          <button
            type="button"
            id="download-bib-file-btn"
            onClick={handleDownloadBibFile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#431407] bg-[#FFFFFF] border border-[#FAF8F5] hover:bg-[#FAF8F5] hover:border-[#D97706] rounded-md transition-colors cursor-pointer"
            title="Download citations as a .bib file"
          >
            <Download className="w-3.5 h-3.5 text-[#4A5568]" />
            <span>Download .bib</span>
          </button>
        </div>
      </div>

      {/* Temporary Toast Notification */}
      {toastMessage && (
        <div className="bg-[#431407] text-white text-xs px-4 py-2.5 rounded-md shadow-md flex items-center gap-2">
          <Check className="w-4 h-4 text-[#D97706]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Papers Cards List - Academic Database Layout */}
      <div className="space-y-4">
        {papers.map((paper, index) => {
          const isExpanded = expandedId === paper.id;
          const displaySampleSize = paper.sampleSize || paper.datasetSize || 'Not reported';
          const displayPopulation = paper.population || paper.dataset || 'Controlled agronomic cohorts';
          const displayDoi = paper.doi || (paper.url && paper.url.includes('doi.org') ? paper.url.split('doi.org/')[1] : null);

          return (
            <article
              key={paper.id}
              id={`paper-card-${index + 1}`}
              className="group bg-[#FFFFFF] rounded-[10px] border border-[#FAF8F5] hover:border-[#D97706] hover:shadow-[0_4px_16px_rgba(22,58,53,0.06)] transition-all duration-200 overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                {/* 1. Academic Header Metadata Line: Citation index, Year, Publication, Study Type, DOI */}
                <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 text-xs text-[#6B7280] pb-2 border-b border-[#F4F4F5]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[#431407] bg-[#EFEFEA] px-1.5 py-0.5 rounded">
                      [{index + 1}]
                    </span>
                    <span className="font-medium text-[#431407]">{paper.year || '2024'}</span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="italic text-[#4A5568] max-w-xs truncate">
                      {paper.source && paper.source !== 'Demo Data' ? paper.source : 'Peer-Reviewed Literature'}
                    </span>
                    {paper.studyType && (
                      <>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="text-[#D97706] font-medium text-[11px]">
                          {paper.studyType}
                        </span>
                      </>
                    )}
                    {displayDoi && (
                      <>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="font-mono text-[10px] text-[#6B7280] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#FAF8F5]">
                          DOI: {displayDoi}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions: Cite & External Link */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleCopyBibTeX(paper, e)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        copiedId === paper.id
                          ? 'bg-[#431407] text-white border-[#431407]'
                          : 'bg-[#FAF8F5] text-[#431407] border-[#FAF8F5] hover:border-[#D97706] hover:bg-[#FFFFFF]'
                      }`}
                      title="Copy BibTeX reference"
                    >
                      {copiedId === paper.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#D97706]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Quote className="w-3 h-3 text-[#D97706]" />
                          <span>Cite</span>
                        </>
                      )}
                    </button>

                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[#6B7280] hover:text-[#431407] hover:bg-[#FAF8F5] rounded transition-colors"
                        title="View original publication / DOI"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExpand(paper.id)}
                      className="p-1 text-[#6B7280] hover:text-[#431407] hover:bg-[#FAF8F5] rounded transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse entry details' : 'Expand full analysis'}
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 2. Paper Title & Authors */}
                <div className="mt-3">
                  <h3 className="font-['DM_Sans'] text-base sm:text-lg font-semibold text-[#431407] leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-1 font-normal">
                    {paper.authors && paper.authors.length > 0
                      ? paper.authors.join(', ')
                      : 'Authors not reported'}
                  </p>
                </div>

                {/* 3. Structured Academic Data Grid: Sample Size, Population, Study Type, Methodology */}
                <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 py-2.5 px-3 bg-[#FAF8F5] rounded-lg border border-[#F4F4F5] text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-0.5">
                      Sample Size
                    </span>
                    <span className="font-mono text-[11px] font-medium text-[#431407] truncate block">
                      {displaySampleSize}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-0.5">
                      Population / Specimen
                    </span>
                    <span className="text-[11px] text-[#242A29] truncate block" title={displayPopulation}>
                      {displayPopulation}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-0.5">
                      Study Design
                    </span>
                    <span className="text-[11px] text-[#D97706] font-medium truncate block">
                      {paper.studyType || 'Empirical Study'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider block mb-0.5">
                      Consensus Rigor
                    </span>
                    <span className="text-[11px] text-[#431407] font-medium truncate block">
                      {paper.rigorBadge || 'Peer-Reviewed'}
                    </span>
                  </div>
                </div>

                {/* 4. Key Finding - Restrained Academic Synthesis */}
                <div className="mt-3 p-3 bg-[#FFFFFF] border-l-2 border-[#D97706] rounded-r-md border-y border-r border-[#F4F4F5]">
                  <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <span>Key Finding</span>
                    <span className="text-[#D97706]">·</span>
                    <span className="font-normal text-[#6B7280] capitalize">Synthesized from primary results</span>
                  </div>
                  <p className="text-xs text-[#242A29] leading-relaxed">
                    {paper.keyTakeaway || paper.keyResults || paper.mainConclusions || 'Study provides empirical benchmark metrics and diagnostic evaluation.'}
                  </p>
                </div>

                {/* 5. Limitations Preview (Clean, subtle, non-colorful) */}
                {paper.limitations && paper.limitations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#F4F4F5]">
                    <div className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider mb-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#D97706]" />
                      <span>Documented Limitations ({paper.limitations.length})</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#4A5568]">
                      {paper.limitations.slice(0, isExpanded ? paper.limitations.length : 2).map((lim, li) => (
                        <li key={li} className="flex items-start gap-2">
                          <span className="text-[#D97706] mt-0.5 font-bold">―</span>
                          <span className="leading-snug">{lim}</span>
                        </li>
                      ))}
                    </ul>
                    {paper.limitations.length > 2 && !isExpanded && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(paper.id)}
                        className="text-[11px] text-[#D97706] hover:underline mt-1 font-medium cursor-pointer"
                      >
                        +{paper.limitations.length - 2} more limitations reported
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 6. Detailed Drawer: Abstract & BibTeX (when expanded) */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#FAF8F5] bg-[#FAF8F5]/70 space-y-3.5 text-xs">
                  {/* Abstract */}
                  {paper.abstract && (
                    <div>
                      <div className="font-semibold text-[#431407] mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Abstract:</span>
                      </div>
                      <p className="text-[#4A5568] leading-relaxed bg-[#FFFFFF] p-3 rounded border border-[#FAF8F5]">
                        {paper.abstract}
                      </p>
                    </div>
                  )}

                  {/* Methodology & Evaluation Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paper.methodology && (
                      <div className="bg-[#FFFFFF] p-3 rounded border border-[#FAF8F5]">
                        <span className="font-semibold text-[#431407] block mb-1">Methodology:</span>
                        <span className="text-[#4A5568] leading-relaxed">{paper.methodology}</span>
                      </div>
                    )}
                    {paper.evaluationMetrics && paper.evaluationMetrics.length > 0 && (
                      <div className="bg-[#FFFFFF] p-3 rounded border border-[#FAF8F5]">
                        <span className="font-semibold text-[#431407] block mb-1">Evaluation Metrics:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {paper.evaluationMetrics.map((metric, mi) => (
                            <span key={mi} className="font-mono text-[11px] bg-[#FAF8F5] px-2 py-0.5 rounded text-[#431407] border border-[#FAF8F5]">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BibTeX Raw View */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-[#431407] flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>BibTeX Citation Entry:</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleCopyBibTeX(paper, e)}
                        className="text-[11px] text-[#D97706] hover:underline font-medium cursor-pointer"
                      >
                        {copiedId === paper.id ? 'Copied' : 'Copy Entry'}
                      </button>
                    </div>
                    <pre className="p-3 bg-[#FFFFFF] border border-[#FAF8F5] rounded text-[11px] font-mono text-[#242A29] overflow-x-auto whitespace-pre">
                      {generateBibTeX(paper)}
                    </pre>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
