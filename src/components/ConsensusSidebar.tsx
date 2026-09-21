import React from 'react';
import {
  PanelLeftClose,
  PanelLeft,
  Plus,
  Home,
  Clock,
  MessageSquare,
  BookOpen,
  FileText,
  Bookmark,
  Compass,
  Shield,
  LogOut,
  User,
} from 'lucide-react';
import { ConsensusLogo } from './ConsensusLogo';
import { UserProfile } from '../types';

export interface ThreadItem {
  id: string;
  title: string;
  timestamp: number;
}

interface ConsensusSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  currentView: 'home' | 'thread';
  onNavigateHome: () => void;
  onNewThread: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  recentThreads?: ThreadItem[];
  activeThreadId?: string;
  onSelectThread?: (id: string) => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const ConsensusSidebar: React.FC<ConsensusSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  currentView,
  onNavigateHome,
  onNewThread,
  onOpenAuth,
  recentThreads = [],
  activeThreadId,
  onSelectThread,
  currentUser,
  onLogout,
}) => {
  return (
    <aside
      className={`h-screen bg-[#FFFFFF] border-r border-[#FAF8F5] flex flex-col transition-all duration-200 z-40 shrink-0 select-none ${
        isCollapsed ? 'w-16' : 'w-64 sm:w-72'
      }`}
    >
      {/* Top Header with Academic Logo */}
      <div className="p-3.5 flex items-center justify-between border-b border-[#F4F4F5] min-h-[56px]">
        {isCollapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="p-2 rounded text-[#4A5568] hover:text-[#431407] hover:bg-[#FAF8F5] transition-colors cursor-pointer mx-auto"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer text-left"
            >
              <ConsensusLogo size={28} withText={true} textSize="text-base" />
            </button>
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="p-1.5 rounded text-[#6B7280] hover:text-[#431407] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Main Navigation Actions */}
      <div className="p-3 space-y-1.5 border-b border-[#F4F4F5]">
        {/* + New Research Inquiry */}
        <button
          type="button"
          onClick={onNewThread}
          title="New Research Inquiry"
          className={`w-full flex items-center justify-start rounded-md border border-[#FAF8F5] text-[#431407] hover:border-[#D97706] hover:bg-[#FAF8F5] transition-colors font-medium text-xs sm:text-sm cursor-pointer shadow-2xs ${
            isCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2 gap-2.5'
          }`}
        >
          <Plus className="w-4 h-4 text-[#D97706] shrink-0" />
          {!isCollapsed && <span>New Inquiry</span>}
        </button>

        {/* Home / Portal Button */}
        <button
          type="button"
          onClick={onNavigateHome}
          title="Research Portal"
          className={`w-full flex items-center rounded-md transition-colors font-medium text-xs sm:text-sm cursor-pointer ${
            isCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2 gap-2.5'
          } ${
            currentView === 'home'
              ? 'bg-[#FAF8F5] text-[#431407] font-semibold border border-[#F4F4F5]'
              : 'text-[#4A5568] hover:bg-[#FAF8F5] hover:text-[#431407]'
          }`}
        >
          <Home className="w-4 h-4 text-[#D97706] shrink-0" />
          {!isCollapsed && <span>Portal Home</span>}
        </button>
      </div>

      {/* Center Content Section */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 scrollbar-thin">
        {!isCollapsed ? (
          <>
            {/* Recent Inquiries */}
            {recentThreads.length > 0 && (
              <div className="mb-6">
                <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#6B7280]" />
                  <span>Recent Inquiries</span>
                </div>
                <div className="space-y-1">
                  {recentThreads.map((thread) => (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => onSelectThread && onSelectThread(thread.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs truncate transition-colors cursor-pointer flex items-center gap-2 ${
                        activeThreadId === thread.id && currentView === 'thread'
                          ? 'bg-[#431407] text-white font-medium'
                          : 'text-[#4A5568] hover:bg-[#FAF8F5] hover:text-[#431407]'
                      }`}
                      title={thread.title}
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{thread.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial Mission Statement Box */}
            <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#F4F4F5] space-y-2.5">
              <div className="flex items-center gap-1.5 text-[#431407]">
                <Compass className="w-4 h-4 text-[#D97706]" />
                <h3 className="font-['DM_Sans'] text-xs font-bold uppercase tracking-wider">
                  Explore. Compare. Discover.
                </h3>
              </div>

              <p className="text-[11px] text-[#4A5568] leading-relaxed">
                Inqora operates as an academic intelligence workspace synthesizing consensus metrics and comparative matrices across 220M+ peer-reviewed papers.
              </p>

              <div className="pt-2 border-t border-[#FAF8F5] space-y-1 text-[11px] text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  <span>Evidence-grounded claims</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  <span>Literature limitation audit</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-3 pt-2">
            <button
              type="button"
              onClick={onNavigateHome}
              title="Inqora Portal"
              className="p-2 rounded text-[#4A5568] hover:text-[#431407] hover:bg-[#FAF8F5]"
            >
              <BookOpen className="w-5 h-5 text-[#D97706]" />
            </button>
            <button
              type="button"
              onClick={onNewThread}
              title="New Research Inquiry"
              className="p-2 rounded text-[#4A5568] hover:text-[#431407] hover:bg-[#FAF8F5]"
            >
              <FileText className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Institutional Access Buttons */}
      <div className="p-3 border-t border-[#F4F4F5] bg-[#FFFFFF]">
        {currentUser ? (
          !isCollapsed ? (
            <div className="space-y-2">
              <div
                onClick={() => onOpenAuth('signin')}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EFEFEA] border border-[#FAF8F5] transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#431407] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name
                    ? currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()
                    : 'PI'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#431407] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-[#D97706] font-medium truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                    <span>{currentUser.institution}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-[11px] text-[#6B7280]">
                <span className="font-mono text-[10px] text-[#431407]">
                  {currentUser.accessTier === 'Institutional Enterprise' ? 'Enterprise Edu' : 'Verified'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onLogout) onLogout();
                  }}
                  className="text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('signin')}
              title={`${currentUser.name} - ${currentUser.institution}`}
              className="w-full flex items-center justify-center p-1.5 rounded text-white bg-[#D97706] hover:bg-[#431407] cursor-pointer"
            >
              <div className="font-bold text-[11px]">
                {currentUser.name
                  ? currentUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                  : 'PI'}
              </div>
            </button>
          )
        ) : !isCollapsed ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onOpenAuth('signin')}
              className="w-full py-2 px-3 rounded border border-[#FAF8F5] text-xs font-semibold text-[#431407] hover:bg-[#FAF8F5] hover:border-[#D97706] transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Sign In</span>
            </button>

          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenAuth('signin')}
            title="Institutional Sign in"
            className="w-full p-2 rounded text-xs font-semibold text-[#431407] hover:bg-[#FAF8F5] text-center flex items-center justify-center cursor-pointer"
          >
            <Shield className="w-4 h-4 text-[#D97706]" />
          </button>
        )}
      </div>
    </aside>
  );
};
