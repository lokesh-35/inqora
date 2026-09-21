import React, { useRef, useState } from 'react';
import {
  Search,
  Upload,
  FileText,
  X,
  Loader2,
  SlidersHorizontal,
  Sparkles,
  AlertTriangle,
  BookOpen,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface QueryFormProps {
  topic: string;
  question: string;
  keywords: string;
  onTopicChange: (val: string) => void;
  onQuestionChange: (val: string) => void;
  onKeywordsChange: (val: string) => void;
  uploadedFile: File | null;
  onFileUpload: (file: File) => void;
  onRemoveUploadedFile: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
  loadingStep?: string;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export const QueryForm: React.FC<QueryFormProps> = ({
  topic,
  question,
  keywords,
  onTopicChange,
  onQuestionChange,
  onKeywordsChange,
  uploadedFile,
  onFileUpload,
  onRemoveUploadedFile,
  onAnalyze,
  isLoading,
  loadingStep,
  activeFilter = 'all',
  onFilterChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFile = (file: File) => {
    setFileError(null);
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setFileError('Please select a valid PDF file.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setFileError('File size exceeds the 25MB limit.');
      return;
    }
    onFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const setPresetQuestion = (t: string, q: string, k: string) => {
    onTopicChange(t);
    onQuestionChange(q);
    onKeywordsChange(k);
  };

  const filterOptions = [
    { id: 'all', label: 'All Studies' },
    { id: 'peer-reviewed', label: 'Peer-Reviewed Only' },
    { id: 'field', label: 'Field / Wild Trials' },
    { id: 'high-citations', label: 'Highly Cited (100+)' },
  ];

  return (
    <div className="mb-8">
      {/* Consensus-style Hero Search Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 relative transition-all">
        {/* Top Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Evidence-Based Consensus Search
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Powered by semantic literature analysis &amp; multi-study synthesis
          </span>
        </div>

        {/* Primary Consensus Search Input Box */}
        <div className="relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if ((topic.trim() || question.trim() || uploadedFile) && !isLoading) {
                onAnalyze();
              }
            }}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-600 border border-slate-300 rounded-2xl p-1.5 sm:p-2 transition-all shadow-inner"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>

            <input
              id="consensus-question-input"
              type="text"
              value={question || topic}
              onChange={(e) => {
                onQuestionChange(e.target.value);
                if (!topic) {
                  onTopicChange(e.target.value);
                }
              }}
              placeholder="Ask a research question (e.g. Can deep learning reliably detect crop diseases in open fields?)"
              className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none px-2 py-2 font-medium"
              disabled={isLoading}
            />

            {(question || topic) && (
              <button
                type="button"
                onClick={() => {
                  onQuestionChange('');
                  onTopicChange('');
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
                title="Clear question"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Submit / Find Consensus Button */}
            <button
              id="analyze-research-btn"
              type="button"
              onClick={onAnalyze}
              disabled={isLoading || (!topic.trim() && !question.trim() && !uploadedFile)}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shrink-0 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-300" />
                  <span>{loadingStep || 'Searching...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Synthesize</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Filter Pills & Advanced Options Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Filter Pills (Consensus.app Style) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filters:
            </span>
            {filterOptions.map((opt) => {
              const isSelected = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange && onFilterChange(opt.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Advanced toggle (PDF & Keywords) */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide PDF / Scope' : 'Upload PDF & Scope'}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Suggested Research Questions (Consensus style tags) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-400">Popular Queries:</span>
          <button
            type="button"
            onClick={() =>
              setPresetQuestion(
                'AI-based crop disease detection',
                'Can deep learning reliably detect crop diseases in real-world open field conditions?',
                'CNN, YOLO, plant disease, agriculture, field validation'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            Crop Disease in Wild Conditions
          </button>
          <button
            type="button"
            onClick={() =>
              setPresetQuestion(
                'Vision Transformers in precision agriculture',
                'Do Vision Transformers outperform CNNs on multi-crop disease classification?',
                'ViT, MobileViT, attention, convolution, agriculture'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            ViT vs CNN in Agriculture
          </button>
          <button
            type="button"
            onClick={() =>
              setPresetQuestion(
                'Domain shift in plant pathology vision',
                'What causes the accuracy drop between lab datasets and real-world farm images?',
                'domain shift, illumination, PlantVillage, open sunlight'
              )
            }
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            Lab-to-Field Generalization Gap
          </button>
        </div>

        {/* Expandable Advanced Scope & PDF Drawer */}
        {showAdvanced && (
          <div className="mt-5 pt-5 border-t border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200">
            {/* Left: Topic and Keywords */}
            <div className="lg:col-span-6 space-y-3">
              <div>
                <label
                  htmlFor="topic-input"
                  className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1"
                >
                  Research Topic Keyword
                </label>
                <input
                  id="topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => onTopicChange(e.target.value)}
                  placeholder="e.g. AI-based crop disease detection"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="keywords-input"
                  className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1"
                >
                  Specific Search Keywords (comma-separated)
                </label>
                <input
                  id="keywords-input"
                  type="text"
                  value={keywords}
                  onChange={(e) => onKeywordsChange(e.target.value)}
                  placeholder="e.g. CNN, YOLO, plant disease, agriculture, vision transformer"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Right: PDF Upload Dropzone */}
            <div className="lg:col-span-6">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Upload Paper PDF (Extracts Evidence &amp; Limitations)
              </label>

              {!uploadedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-indigo-500 bg-indigo-50/60'
                      : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                    disabled={isLoading}
                  />
                  <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Upload className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    Click to choose PDF or drag &amp; drop
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Multi-page PDF research papers (up to 25MB)
                  </p>
                </div>
              ) : (
                <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[11px] text-indigo-700 font-medium">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Ready for Analysis
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveUploadedFile}
                    disabled={isLoading}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-md transition-colors"
                    title="Remove PDF"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
