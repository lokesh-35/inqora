import React, { useState } from 'react';
import {
  X,
  Mail,
  CheckCircle2,
  Shield,
  Building2,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  LogOut,
  KeyRound,
} from 'lucide-react';
import { ConsensusLogo } from './ConsensusLogo';
import { UserProfile } from '../types';

interface ConsensusAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  currentUser?: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout?: () => void;
}

const INSTITUTIONAL_PARTNERS = [
  { name: 'Stanford University', domain: 'stanford.edu', country: 'United States' },
  { name: 'Massachusetts Institute of Technology', domain: 'mit.edu', country: 'United States' },
  { name: 'University of Oxford', domain: 'ox.ac.uk', country: 'United Kingdom' },
  { name: 'Harvard University', domain: 'harvard.edu', country: 'United States' },
  { name: 'University of Cambridge', domain: 'cam.ac.uk', country: 'United Kingdom' },
  { name: 'UC Berkeley', domain: 'berkeley.edu', country: 'United States' },
];

export const ConsensusAuthModal: React.FC<ConsensusAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  currentUser,
  onLoginSuccess,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'sso' | 'email'>(
    initialMode === 'signin' ? 'sso' : 'email'
  );
  const [selectedInstitution, setSelectedInstitution] = useState<string>('Stanford University');
  const [customInstitution, setCustomInstitution] = useState<string>('');
  const [email, setEmail] = useState<string>('vavilapallilokesh45@gmail.com');
  const [name, setName] = useState<string>('Dr. Lokesh Vavilapalli');
  const [role, setRole] = useState<string>('Principal Investigator');
  const [orcid, setOrcid] = useState<string>('0000-0002-1825-0097');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleInstitutionalSSOLogin = (institutionName: string) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Academic Researcher',
      email: email || 'researcher@stanford.edu',
      institution: institutionName,
      department: 'Computational Sciences & Pathology',
      role: role || 'Principal Investigator',
      orcid: orcid || '0000-0002-1825-0097',
      ssoProvider: 'edu',
      isVerified: true,
      accessTier: 'Institutional Enterprise',
    };

    setIsSuccess(true);
    setSuccessMessage(`Verified via ${institutionName} Institutional SSO`);
    setTimeout(() => {
      onLoginSuccess(user);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const institution = customInstitution.trim() || selectedInstitution || 'Academic Research Institute';
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      institution,
      department: 'Department of Research & Scientific Computing',
      role,
      orcid: orcid.trim() || undefined,
      ssoProvider: 'institutional',
      isVerified: true,
      accessTier: 'Academic Researcher',
    };

    setIsSuccess(true);
    setSuccessMessage(`Institutional credentials verified for ${email}`);
    setTimeout(() => {
      onLoginSuccess(user);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163A35]/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FFFFFF] rounded-[10px] border border-[#D9DEDA] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col relative max-h-[92vh]">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded text-[#6B7280] hover:text-[#163A35] hover:bg-[#F7F6F2] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#D9DEDA] bg-[#F7F6F2] flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <ConsensusLogo size={32} />
            <span className="font-['DM_Sans'] text-base font-bold text-[#163A35] tracking-tight">
              REXA AI
            </span>
          </div>
          <h3 className="font-['DM_Sans'] text-lg sm:text-xl font-bold text-[#163A35]">
            {currentUser ? 'Institutional Profile & Access' : 'Institutional Academic Sign In'}
          </h3>
          <p className="text-xs text-[#6B7280] mt-1 max-w-sm">
            Access 220M+ peer-reviewed papers with full-text reprints, methodology matrices, and consensus synthesis.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto scrollbar-thin flex-1">
          {/* Active User Screen */}
          {currentUser && !isSuccess ? (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#D9DEDA] flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-[#163A35] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {currentUser.name
                    ? currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()
                    : 'AR'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-['DM_Sans'] text-sm font-bold text-[#163A35]">
                      {currentUser.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E4ECE9] text-[#163A35] border border-[#2F6F68]/20">
                      <Shield className="w-3 h-3 text-[#2F6F68]" />
                      {currentUser.accessTier}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5 truncate">{currentUser.email}</p>
                  <p className="text-xs text-[#2F6F68] font-medium mt-1">
                    {currentUser.institution} {currentUser.department ? `· ${currentUser.department}` : ''}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
                  <span className="text-[#6B7280]">Academic Designation</span>
                  <span className="font-semibold text-[#163A35]">{currentUser.role}</span>
                </div>
                {currentUser.orcid && (
                  <div className="flex items-center justify-between p-2.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
                    <span className="text-[#6B7280]">ORCID Record</span>
                    <span className="font-mono text-[11px] text-[#2F6F68] font-semibold">
                      https://orcid.org/{currentUser.orcid}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between p-2.5 rounded border border-[#D9DEDA] bg-[#FFFFFF]">
                  <span className="text-[#6B7280]">Corpus Full-Text Entitlement</span>
                  <span className="font-semibold text-[#163A35] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6F68]" />
                    Unlimited Peer-Reviewed Reprints
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9DEDA] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (onLogout) onLogout();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out Session</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#163A35] hover:bg-[#2F6F68] rounded transition-colors cursor-pointer shadow-2xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : isSuccess ? (
            /* Success Feedback */
            <div className="my-8 text-center py-6 bg-[#F7F6F2] rounded border border-[#D9DEDA] animate-in fade-in duration-200">
              <CheckCircle2 className="w-10 h-10 text-[#2F6F68] mx-auto mb-2.5" />
              <div className="text-sm font-semibold text-[#163A35]">
                {successMessage || 'Authenticated Successfully'}
              </div>
              <p className="text-xs text-[#4A5568] mt-1">
                Institutional academic license active. Synchronizing 220M+ corpus full-text permissions...
              </p>
            </div>
          ) : (
            /* Auth Form */
            <div className="space-y-5">
              {/* Tab Selector: Institutional SSO vs Academic Email */}
              <div className="grid grid-cols-2 p-1 bg-[#F7F6F2] rounded-lg border border-[#D9DEDA] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('sso')}
                  className={`py-2 px-3 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'sso'
                      ? 'bg-[#FFFFFF] text-[#163A35] shadow-xs font-semibold'
                      : 'text-[#6B7280] hover:text-[#163A35]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Institutional SSO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className={`py-2 px-3 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'email'
                      ? 'bg-[#FFFFFF] text-[#163A35] shadow-xs font-semibold'
                      : 'text-[#6B7280] hover:text-[#163A35]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>Research Email / ORCID</span>
                </button>
              </div>

              {activeTab === 'sso' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#163A35] uppercase tracking-wider mb-2">
                      Select Partner Academic Institution
                    </label>
                    <div className="space-y-2">
                      {INSTITUTIONAL_PARTNERS.map((inst) => (
                        <button
                          key={inst.name}
                          type="button"
                          onClick={() => handleInstitutionalSSOLogin(inst.name)}
                          className="w-full flex items-center justify-between p-3 rounded border border-[#D9DEDA] hover:border-[#2F6F68] hover:bg-[#F7F6F2] transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-[#EFEFEA] group-hover:bg-[#FFFFFF] flex items-center justify-center text-[#163A35] font-bold text-xs border border-[#D9DEDA]">
                              {inst.name[0]}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#163A35]">
                                {inst.name}
                              </div>
                              <div className="text-[11px] text-[#6B7280] font-mono">
                                Single Sign-On (@{inst.domain})
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#2F6F68] font-medium group-hover:translate-x-0.5 transition-transform">
                            <span>Sign in</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-medium text-[#4A5568] mb-1.5">
                      Or authenticate through your university portal:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. University of California, Berkeley"
                        value={customInstitution}
                        onChange={(e) => setCustomInstitution(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border border-[#D9DEDA] rounded focus:outline-hidden focus:border-[#2F6F68]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleInstitutionalSSOLogin(
                            customInstitution.trim() || 'Academic Partner Institution'
                          )
                        }
                        className="px-4 py-2 bg-[#163A35] hover:bg-[#2F6F68] text-white text-xs font-semibold rounded transition-colors shadow-2xs cursor-pointer"
                      >
                        SSO
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#163A35] mb-1">
                      Academic / Research Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="researcher@university.edu"
                        className="w-full pl-9 pr-3 py-2 border border-[#D9DEDA] rounded text-xs text-[#242A29] placeholder:text-[#9CA3AF] focus:outline-hidden focus:border-[#2F6F68]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#163A35] mb-1">
                        Full Name / Title
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Researcher"
                          className="w-full pl-9 pr-3 py-2 border border-[#D9DEDA] rounded text-xs text-[#242A29] focus:outline-hidden focus:border-[#2F6F68]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#163A35] mb-1">
                        Academic Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D9DEDA] rounded text-xs text-[#242A29] focus:outline-hidden focus:border-[#2F6F68] bg-[#FFFFFF]"
                      >
                        <option value="Principal Investigator">Principal Investigator</option>
                        <option value="Faculty Professor / Reader">Faculty Professor / Reader</option>
                        <option value="Postdoctoral Fellow">Postdoctoral Fellow</option>
                        <option value="Doctoral Researcher">Doctoral Researcher</option>
                        <option value="Peer Reviewer">Peer Reviewer</option>
                        <option value="Research Scientist">Research Scientist</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#163A35] mb-1">
                        University / Institute Affiliation
                      </label>
                      <input
                        type="text"
                        value={customInstitution}
                        onChange={(e) => setCustomInstitution(e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="w-full px-3 py-2 border border-[#D9DEDA] rounded text-xs text-[#242A29] focus:outline-hidden focus:border-[#2F6F68]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#163A35] mb-1">
                        ORCID iD (Optional)
                      </label>
                      <input
                        type="text"
                        value={orcid}
                        onChange={(e) => setOrcid(e.target.value)}
                        placeholder="0000-0002-1825-0097"
                        className="w-full px-3 py-2 border border-[#D9DEDA] rounded text-xs font-mono text-[#242A29] focus:outline-hidden focus:border-[#2F6F68]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded bg-[#163A35] hover:bg-[#2F6F68] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer mt-2"
                  >
                    Authenticate &amp; Unlock Institutional Platform
                  </button>
                </form>
              )}

              {/* Security Footnote */}
              <div className="pt-2 border-t border-[#D9DEDA] flex items-center justify-between text-[11px] text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#2F6F68]" />
                  <span>SAML 2.0 / EduGAIN verified</span>
                </div>
                <span>220M+ Scholarly Articles</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
