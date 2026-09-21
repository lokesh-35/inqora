import React, { useRef, useState } from 'react';
import { Search, Upload, FileText, X, Loader2, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

interface ResearchInputSectionProps {
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
  onLoadDemo: () => void;
  isLoading: boolean;
  loadingStep?: string;
}

export const ResearchInputSection: React.FC<ResearchInputSectionProps> = ({
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
  onLoadDemo,
  isLoading,
  loadingStep,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setFileError(null);
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onAnalyze();
  };

  return (
    <section id="start-research" className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[#D9E0E5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#40566D] mb-2">
            Research Investigation
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#17324D] tracking-tight">
            Start with a research question
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
            Tell us what you are investigating. You can refine the search with keywords or upload a paper.
          </p>
        </div>

        {/* Clean Academic Form */}
        <form onSubmit={handleSubmit} className="bg-[#F7F8F6] border border-[#D9E0E5] rounded-xl p-6 sm:p-8 shadow-xs">
          <div className="space-y-5">
            {/* Research Topic */}
            <div>
              <label htmlFor="research-topic-input" className="block text-xs font-semibold text-[#17324D] uppercase tracking-wider mb-2">
                Research Topic <span className="text-[#2F7F7A]">*</span>
              </label>
              <input
                id="research-topic-input"
                type="text"
                value={topic}
                onChange={(e) => onTopicChange(e.target.value)}
                placeholder="e.g. AI-based crop disease detection"
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2933] bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg focus:outline-hidden focus:border-[#17324D] focus:ring-1 focus:ring-[#17324D] transition-colors placeholder:text-[#667085]"
                required
              />
            </div>

            {/* Research Question */}
            <div>
              <label htmlFor="research-question-input" className="block text-xs font-semibold text-[#17324D] uppercase tracking-wider mb-2">
                Research Question
              </label>
              <input
                id="research-question-input"
                type="text"
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
                placeholder="e.g. How can AI improve crop disease detection in real-world field conditions?"
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2933] bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg focus:outline-hidden focus:border-[#17324D] focus:ring-1 focus:ring-[#17324D] transition-colors placeholder:text-[#667085]"
              />
            </div>

            {/* Keywords */}
            <div>
              <label htmlFor="research-keywords-input" className="block text-xs font-semibold text-[#17324D] uppercase tracking-wider mb-2">
                Keywords <span className="text-xs font-normal text-[#667085] normal-case">(comma separated)</span>
              </label>
              <input
                id="research-keywords-input"
                type="text"
                value={keywords}
                onChange={(e) => onKeywordsChange(e.target.value)}
                placeholder="e.g. CNN, YOLO, agriculture"
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2933] bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg focus:outline-hidden focus:border-[#17324D] focus:ring-1 focus:ring-[#17324D] transition-colors placeholder:text-[#667085]"
              />
            </div>

            {/* Upload Research Paper Component */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-[#17324D] uppercase tracking-wider">
                  Upload a research paper <span className="text-xs font-normal text-[#667085] normal-case">(PDF files only, optional)</span>
                </label>
                {uploadedFile && (
                  <span className="text-xs text-[#2F7F7A] font-medium">Ready for synthesis</span>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {!uploadedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={handleBrowseClick}
                  className={`border border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-[#17324D] bg-[#FFFFFF]'
                      : 'border-[#D9E0E5] bg-[#FFFFFF] hover:border-[#40566D]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-[#F7F8F6] border border-[#D9E0E5] mx-auto flex items-center justify-center text-[#40566D] mb-2.5">
                    <Upload className="w-4 h-4 text-[#2F7F7A]" />
                  </div>
                  <div className="text-xs font-medium text-[#17324D]">
                    Upload a research paper
                  </div>
                  <div className="text-[11px] text-[#667085] mt-1">
                    Drag and drop your paper here or browse your computer.
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-[#F7F8F6] border border-[#D9E0E5] flex items-center justify-center text-[#17324D] shrink-0">
                      <FileText className="w-4 h-4 text-[#2F7F7A]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#17324D] truncate">
                        {uploadedFile.name}
                      </div>
                      <div className="text-[11px] text-[#667085]">
                        {formatFileSize(uploadedFile.size)} &bull; PDF Document
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveUploadedFile();
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="p-1.5 text-[#667085] hover:text-[#17324D] hover:bg-[#F7F8F6] rounded transition-colors cursor-pointer"
                    title="Remove uploaded paper"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {fileError && (
                <p className="mt-2 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {fileError}
                </p>
              )}
            </div>

            {/* Actions & Status */}
            <div className="pt-3 border-t border-[#D9E0E5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onLoadDemo}
                  className="text-xs text-[#40566D] hover:text-[#17324D] font-medium underline underline-offset-2 cursor-pointer"
                >
                  Load sample literature (Crop Disease Detection)
                </button>
              </div>

              <button
                id="start-analyze-research-btn"
                type="submit"
                disabled={isLoading || !topic.trim()}
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer ${
                  isLoading || !topic.trim()
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-[#17324D] hover:bg-[#1f4164] text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-slate-300" />
                    <span>Analyzing Research...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Research</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 text-slate-300" />
                  </>
                )}
              </button>
            </div>

            {/* Live Loading Step Indicator */}
            {isLoading && loadingStep && (
              <div className="bg-[#FFFFFF] border border-[#D9E0E5] rounded-lg p-3 text-xs text-[#40566D] flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2F7F7A]" />
                <span className="font-medium text-[#17324D]">Current task:</span>
                <span>{loadingStep}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
