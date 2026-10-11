import React, { useState } from 'react';
import { Shield, Users, Film, MessageSquare, Key, Trash2, Eye, Plus, Check, Lock, Settings, RefreshCw } from 'lucide-react';
import { VideoProject, CollaboratorUser, UserRole, ClientInquiry } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  projects: VideoProject[];
  onDeleteProject: (id: string) => void;
  onToggleProjectVisibility: (id: string) => void;
  collaborators: CollaboratorUser[];
  onAddCollaborator: (collab: CollaboratorUser) => void;
  onRemoveCollaborator: (id: string) => void;
  inquiries: ClientInquiry[];
  onUpdateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  onOpenUpload: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole,
  projects,
  onDeleteProject,
  onToggleProjectVisibility,
  collaborators,
  onAddCollaborator,
  onRemoveCollaborator,
  inquiries,
  onUpdateInquiryStatus,
  onOpenUpload,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'rbac' | 'inquiries' | 'settings'>('projects');
  const [passcode, setPasscode] = useState('');
  const [isPasscodeAuthenticated, setIsPasscodeAuthenticated] = useState(true);
  const [authError, setAuthError] = useState('');
  
  // New collaborator form state
  const [newCollabName, setNewCollabName] = useState('');
  const [newCollabEmail, setNewCollabEmail] = useState('');
  const [newCollabRole, setNewCollabRole] = useState<UserRole>('collaborator');

  if (!isOpen) return null;

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'muawiya2026' || passcode === 'admin' || passcode === '1234') {
      setIsPasscodeAuthenticated(true);
      onSwitchRole('admin');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Enter "muawiya2026" or click demo bypass.');
    }
  };

  const handleCreateCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollabName.trim() || !newCollabEmail.trim()) return;

    const newCollab: CollaboratorUser = {
      id: `collab-${Date.now()}`,
      name: newCollabName.trim(),
      email: newCollabEmail.trim(),
      role: newCollabRole,
      activeStatus: 'active',
    };

    onAddCollaborator(newCollab);
    setNewCollabName('');
    setNewCollabEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Muawiya Secure Studio Admin & RBAC Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-amber-400">
                  Current: {currentRole}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Manage video catalog, configure collaborator access permissions & review client submissions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Role Selector Toolbar (Interactive quick test switcher) */}
        <div className="px-6 py-3 bg-neutral-900/50 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-mono">SIMULATE ACTIVE ROLE:</span>
            <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => onSwitchRole('admin')}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-colors cursor-pointer ${
                  currentRole === 'admin'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Admin (Muawiya)
              </button>
              <button
                onClick={() => onSwitchRole('collaborator')}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-colors cursor-pointer ${
                  currentRole === 'collaborator'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Collaborator (Editor)
              </button>
              <button
                onClick={() => onSwitchRole('reviewer')}
                className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-colors cursor-pointer ${
                  currentRole === 'reviewer'
                    ? 'bg-emerald-400 text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Reviewer (Client)
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
            Passcode: <code className="text-neutral-300">muawiya2026</code>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-neutral-800/80 bg-neutral-900/30 shrink-0">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Manage Catalog ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rbac'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Collaborator Roles ({collaborators.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* TAB 1: PROJECTS CATALOG */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Video Projects & Broadcast Master List
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Control public visibility, edit tags, or remove archived items.
                  </p>
                </div>
                <button
                  onClick={onOpenUpload}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload Video</span>
                </button>
              </div>

              <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/30">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Project Title & Client</th>
                      <th className="p-3 hidden sm:table-cell">Category</th>
                      <th className="p-3 hidden md:table-cell">Metrics</th>
                      <th className="p-3">Visibility</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-3">
                          <div className="font-semibold text-white">{proj.title}</div>
                          <div className="text-[11px] text-neutral-400">{proj.client} · {proj.duration}</div>
                        </td>
                        <td className="p-3 hidden sm:table-cell font-mono text-neutral-300">
                          {proj.category}
                        </td>
                        <td className="p-3 hidden md:table-cell font-mono text-amber-400">
                          {proj.viewsMetric}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onToggleProjectVisibility(proj.id)}
                            className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                              proj.visibility === 'public'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            }`}
                          >
                            {proj.visibility}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          {currentRole === 'admin' ? (
                            <button
                              onClick={() => onDeleteProject(proj.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-neutral-500 font-mono">Restricted</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: RBAC ROLES */}
          {activeTab === 'rbac' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Role-Based Access Control (RBAC) Architecture
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Grant granular editing permissions to assistant editors, colorists, and client reviewers.
                </p>
              </div>

              {/* Roles Matrix description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="font-bold text-amber-400 font-mono mb-1">ADMIN (Muawiya)</div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Full catalog control: Add, edit, remove projects, modify system metadata, manage collaborator seats.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="font-bold text-cyan-400 font-mono mb-1">COLLABORATOR (Editor)</div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Can drag & drop new cuts, upload timeline drafts, add tags, and place timecoded revision notes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="font-bold text-emerald-400 font-mono mb-1">REVIEWER (Client)</div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Access to private cuts, interactive before/after player, and ability to leave timestamped feedback.
                  </p>
                </div>
              </div>

              {/* Add collaborator form */}
              {currentRole === 'admin' && (
                <form
                  onSubmit={handleCreateCollaborator}
                  className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3"
                >
                  <span className="text-xs font-mono text-amber-400 uppercase">
                    Add Team Member / Collaborator Seat
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={newCollabName}
                      onChange={(e) => setNewCollabName(e.target.value)}
                      placeholder="Collaborator name"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={newCollabEmail}
                      onChange={(e) => setNewCollabEmail(e.target.value)}
                      placeholder="user@studio.tv"
                      className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newCollabRole}
                        onChange={(e) => setNewCollabRole(e.target.value as UserRole)}
                        className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="collaborator">Collaborator</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-400 text-black text-xs font-semibold rounded-xl hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
                      >
                        Add Seat
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Collaborators table */}
              <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/30">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                    <tr>
                      <th className="p-3">User & Contact</th>
                      <th className="p-3">Assigned Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {collaborators.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="p-3">
                          <div className="font-semibold text-white">{u.name}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{u.email}</div>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                              u.role === 'admin'
                                ? 'bg-amber-400/10 text-amber-400'
                                : u.role === 'collaborator'
                                ? 'bg-cyan-500/10 text-cyan-400'
                                : 'bg-emerald-500/10 text-emerald-400'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-emerald-400">
                          {u.activeStatus}
                        </td>
                        <td className="p-3 text-right">
                          {currentRole === 'admin' && u.role !== 'admin' ? (
                            <button
                              onClick={() => onRemoveCollaborator(u.id)}
                              className="text-rose-400 hover:text-rose-300 text-xs cursor-pointer"
                            >
                              Revoke
                            </button>
                          ) : (
                            <span className="text-[10px] text-neutral-500 font-mono">Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Client Project Inquiries & Production Requests
                </h4>
                <p className="text-xs text-neutral-400">
                  Submissions received from creators and agencies through the website contact form.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 border border-neutral-800 rounded-2xl text-neutral-500 text-xs">
                  No inquiries received yet. Submit an inquiry through the Contact form to test!
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{inq.clientName}</span>
                          <span className="text-neutral-400 font-mono text-[11px]">&lt;{inq.email}&gt;</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-neutral-950 text-amber-400 font-mono text-[10px]">
                            {inq.budgetRange}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">{inq.submittedAt}</span>
                        </div>
                      </div>

                      <div className="text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                        {inq.projectDetails}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-neutral-400 font-mono">
                          Scope: {inq.projectType} · Timeline: {inq.timeline}
                        </span>
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-neutral-950 border border-neutral-800 text-neutral-300 rounded px-2 py-1 text-[11px] outline-none cursor-pointer"
                        >
                          <option value="new">Status: New</option>
                          <option value="reviewed">Status: Reviewed</option>
                          <option value="in_progress">Status: In Progress</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
