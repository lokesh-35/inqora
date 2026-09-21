import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Paper } from '../types';
import {
  MessageSquare,
  Send,
  Loader2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface ResearchChatProps {
  papers: Paper[];
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ResearchChat: React.FC<ResearchChatProps> = ({
  papers,
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState('');
  const [expandedSourceIndex, setExpandedSourceIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const sampleQuestions = [
    'What methodologies are most prevalent across the studies?',
    'What empirical limitations appear repeatedly in real-world evaluations?',
    'Which cohorts or sample sizes show the highest statistical reliability?',
    'What future directions do the authors explicitly propose?',
    'What potential research gaps are supported by documented evidence?',
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-xs flex flex-col h-[640px] overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#D9DEDA] bg-[#F7F6F2] flex items-center justify-between">
        <div>
          <h3 className="font-['DM_Sans'] text-sm sm:text-base font-semibold text-[#163A35] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#2F6F68]" />
            <span>Academic Literature Assistant</span>
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Ask targeted questions grounded strictly in the {papers.length} reviewed publications.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#163A35] bg-[#FFFFFF] px-2.5 py-1 rounded border border-[#D9DEDA]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F68]" />
          <span>Grounded Evidence</span>
        </div>
      </div>

      {/* Suggested Questions Bar */}
      <div className="px-4 py-3 bg-[#FFFFFF] border-b border-[#F0F2EE] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Inquire Corpus:
          </span>
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(q)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1 rounded bg-[#F7F6F2] text-[#163A35] hover:border-[#2F6F68] hover:bg-[#FFFFFF] border border-[#D9DEDA] transition-colors cursor-pointer disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFFFFF] scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6B7280] max-w-md mx-auto">
            <div className="w-10 h-10 rounded bg-[#F7F6F2] border border-[#D9DEDA] flex items-center justify-center text-[#2F6F68] mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-['DM_Sans'] text-sm font-semibold text-[#163A35] mb-1">
              Ask about the literature
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Inquire about experimental methods, benchmark datasets, empirical constraints, or synthesized research gaps across your reviewed corpus.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.sender === 'user' || msg.role === 'user';
            return (
              <div
                key={msg.id || index}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#163A35] text-white'
                      : 'bg-[#F7F6F2] text-[#242A29] border border-[#D9DEDA]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Grounded Citation Sources */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 max-w-[85%] bg-[#FFFFFF] border border-[#D9DEDA] rounded p-2.5 text-xs text-[#6B7280]">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() =>
                        setExpandedSourceIndex(expandedSourceIndex === index ? null : index)
                      }
                    >
                      <span className="font-semibold text-[#163A35] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#2F6F68]" />
                        <span>Cited Literature ({msg.sources.length} sources)</span>
                      </span>
                      {expandedSourceIndex === index ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
                      )}
                    </div>

                    {expandedSourceIndex === index && (
                      <ul className="mt-2 pt-2 border-t border-[#D9DEDA] space-y-1.5 pl-4 list-disc text-[11px] text-[#4A5568]">
                        {msg.sources.map((src, sIdx) => (
                          <li key={sIdx}>
                            <span className="font-semibold text-[#163A35]">{src.paperTitle}</span>
                            {src.section ? ` [${src.section}]` : ''}
                            {src.passage ? `: "${src.passage}"` : ''}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#163A35] bg-[#F7F6F2] p-3 rounded border border-[#D9DEDA] w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2F6F68]" />
            <span>Consulting literature corpus and synthesizing answer...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#D9DEDA] bg-[#F7F6F2]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the reviewed literature..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm text-[#242A29] bg-[#FFFFFF] border border-[#D9DEDA] rounded focus:outline-hidden focus:border-[#2F6F68] transition-colors placeholder:text-[#9CA3AF]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded text-xs sm:text-sm font-medium text-white bg-[#163A35] hover:bg-[#2F6F68] transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
