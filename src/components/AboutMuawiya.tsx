import React from 'react';
import { Cpu, HardDrive, Headphones, Monitor, Award, Film, CheckCircle } from 'lucide-react';

export const AboutMuawiya: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait & Studio Spec Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/60 shadow-2xl group">
              <img
                src="/src/assets/images/avatar_muawiya_1791753347961.jpg"
                alt="Muawiya - Lead Video Editor & Colorist"
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="text-xl font-bold text-white font-display">Muawiya</div>
                <div className="text-xs font-mono text-amber-400">
                  Lead Video Editor · Colorist · Post Director
                </div>
                <div className="text-xs text-neutral-300 mt-2">
                  Based in Lahore & operating internationally for global YouTube creators & advertising agencies.
                </div>
              </div>
            </div>

            {/* Gear & Hardware Rig Card */}
            <div className="mt-4 p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2 text-xs">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                Production Hardware & Calibration Rig
              </div>
              <div className="grid grid-cols-2 gap-2 text-neutral-300 font-mono text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Mac Studio M2 Ultra</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Calibrated DCI-P3 4K</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Beyerdynamic DT 990</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-neutral-400" />
                  <span>10GbE NVMe Fast RAID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Editing Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>The Editor</span>
                <span aria-hidden="true">·</span>
                <span>Biography & Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
                "Retention without storytelling is hollow. Storytelling without rhythm gets skipped."
              </h2>
            </div>

            <p className="text-base text-neutral-300 leading-relaxed">
              Hey, I'm <strong className="text-white">Muawiya</strong>. Over the last 5+ years, I’ve specialized in high-stakes video editing where every single frame either earns viewer loyalty or loses them to the next scroll.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              I collaborate with top creators, digital media startups, and commercial directors to transform raw, scattered footage into coherent, high-velocity narrative experiences. My approach combines psychological hook design, bespoke soundscapes, intentional DaVinci color grading, and surgical pacing.
            </p>

            {/* Core Competencies List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-neutral-500 block">
                Primary Core Competencies
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Retention Architecture:</strong>
                    <span className="text-neutral-400 text-[11px]">Micro-cuts, visual pattern interrupts, and tension arcs designed to keep watch-time curves above 50%.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Precision DaVinci Grading:</strong>
                    <span className="text-neutral-400 text-[11px]">Color management across Log profiles (ARRI, Sony S-Log, RED IPP2) with film grain & print halation.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Sound Design Mastery:</strong>
                    <span className="text-neutral-400 text-[11px]">Sub-bass hits, stereo Foley, audio ducking, and custom risers synchronized directly to cut rhythm.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Reliable Turnaround:</strong>
                    <span className="text-neutral-400 text-[11px]">Strict delivery discipline with draft reviews via timecoded feedback portals.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
