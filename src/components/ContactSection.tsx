import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, MessageSquare, Globe, ArrowUpRight } from 'lucide-react';
import { ClientInquiry } from '../types';

interface ContactSectionProps {
  onAddInquiry: (inquiry: ClientInquiry) => void;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onAddInquiry,
  prefilledService,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(prefilledService || 'YouTube Long-form');
  const [budgetRange, setBudgetRange] = useState('$1,000 – $2,500');
  const [timeline, setTimeline] = useState('Within 1 week');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ClientInquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const newInquiry: ClientInquiry = {
      id: `inq-${Date.now()}`,
      clientName: name.trim(),
      email: email.trim(),
      projectType,
      budgetRange,
      timeline,
      projectDetails: details.trim() || 'Inquiry initiated via online booking form.',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
    };

    setTimeout(() => {
      onAddInquiry(newInquiry);
      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Inquiries & Booking</span>
                <span aria-hidden="true">·</span>
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
                Let's construct your next viral cut or cinematic masterclass.
              </h2>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                Currently accepting long-form YouTube retainers, commercial ad sprints, and high-fidelity post-production projects.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase">Direct Email</div>
                  <a
                    href="mailto:imranmuawiya15@gmail.com"
                    className="text-sm font-semibold text-white hover:text-amber-400 transition-colors font-mono"
                  >
                    imranmuawiya15@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase">Response Window</div>
                  <div className="text-sm font-semibold text-white">
                    Within 12 hours (Weekdays & Weekends)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase">Remote Ingest Pipeline</div>
                  <div className="text-sm font-semibold text-white">
                    Massive.io / Frame.io / Google Drive / Dropbox
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm">
              {submittedInquiry ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Inquiry Received, {submittedInquiry.clientName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Muawiya has received your project briefing. You will receive an initial reply and timeline breakdown at <strong className="text-amber-400">{submittedInquiry.email}</strong> shortly.
                  </p>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-sm mx-auto text-left text-xs font-mono space-y-1 text-neutral-400">
                    <div>Scope: <span className="text-white">{submittedInquiry.projectType}</span></div>
                    <div>Budget: <span className="text-amber-400">{submittedInquiry.budgetRange}</span></div>
                    <div>Timeline: <span className="text-white">{submittedInquiry.timeline}</span></div>
                  </div>
                  <button
                    onClick={() => setSubmittedInquiry(null)}
                    className="mt-4 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    Book Muawiya for Your Next Project
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4">
                    Fill out the scope below to get an exact quote and production schedule.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Your Name / Brand *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Rivera or Apex Media"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@channel.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Project Scope
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="YouTube Long-form">YouTube Long-form</option>
                        <option value="Commercial & Brand Ad">Commercial & Brand Ad</option>
                        <option value="Short-form Reels / TikToks">Short-form Reels / TikToks</option>
                        <option value="Documentary & Narrative">Documentary & Narrative</option>
                        <option value="Color Grading & Master">Color Grading & Master</option>
                        <option value="Monthly Retainer">Monthly Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Budget Range
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="$450 – $950">$450 – $950</option>
                        <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                        <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                        <option value="$5,000+">$5,000+ (Retainer / Campaign)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Target Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                      >
                        <option value="Rush (24-48 Hours)">Rush (24-48 Hours)</option>
                        <option value="Within 1 week">Within 1 week</option>
                        <option value="Next 2-3 weeks">Next 2-3 weeks</option>
                        <option value="Flexible / Pipeline">Flexible / Pipeline</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Project Vision & Footage Description
                    </label>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell Muawiya about your video: rough footage length, reference style, audio requirements, target audience, and goals..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email}
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-semibold text-xs transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Send Project Brief to Muawiya</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
