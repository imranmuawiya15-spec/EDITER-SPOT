import React from 'react';
import { Play, ArrowUpRight, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

interface HeroProps {
  onPlayShowreel: () => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayShowreel, onExploreGallery }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      {/* Subtle background ambient studio light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">
              <span>Muawiya</span>
              <span aria-hidden="true">·</span>
              <span>Post-Production Director</span>
              <span aria-hidden="true">·</span>
              <span>Retention & Color Specialist</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display text-balance mb-6">
              I edit high-impact videos that capture attention & keep viewers hooked.
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
              Helping top-tier creators, commercial agencies, and visionary brands turn raw cuts into cinematic masterclasses. From retention pacing to DaVinci color grading and heavy sound design, I construct visual stories that drive millions of views.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onPlayShowreel}
                className="px-6 py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-all flex items-center gap-2.5 shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Watch 2026 Showreel</span>
              </button>

              <button
                onClick={onExploreGallery}
                className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white font-medium text-sm transition-all flex items-center gap-2 hover:bg-neutral-800 cursor-pointer"
              >
                <span>Explore Archive</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Editorial toolkit highlights (unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-4 border-t border-neutral-800/80">
              <span className="font-semibold text-neutral-200">Suite:</span>
              <span>DaVinci Resolve Studio 19</span>
              <span aria-hidden="true">/</span>
              <span>Premiere Pro</span>
              <span aria-hidden="true">/</span>
              <span>After Effects</span>
              <span aria-hidden="true">/</span>
              <span>Soundly FX</span>
              <span aria-hidden="true">/</span>
              <span>Blender 3D</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase Container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 shadow-2xl flex-1 min-h-[360px] lg:min-h-[440px]">
              <img
                src="/src/assets/images/hero_editor_workspace_1791753279136.jpg"
                alt="Muawiya video editing suite with timeline scrub and DaVinci color grading console"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Measured Scrim for Media Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TIMELINE ENGINE</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">4K DCI · 60 FPS</span>
                </div>

                <p className="text-sm font-semibold text-white mb-2">
                  Precision Frame-by-Frame Rhythm
                </p>

                <p className="text-xs text-neutral-300 line-clamp-2">
                  Custom node trees, micro-pacing cuts, and dynamic SFX transients tailored to viewer psychology.
                </p>

                {/* Interactive Showreel Play Trigger on Image */}
                <button
                  onClick={onPlayShowreel}
                  className="mt-4 w-full py-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 backdrop-blur-md border border-neutral-700/60 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Preview Master Cut</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Strip (Placed below the hero split per guidelines) */}
        <div className="mt-14 pt-10 border-t border-neutral-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                500M+
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Views Generated Across Client Channels
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums tracking-tight">
                +45%
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Average Viewer Retention Increase
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                140+
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Videos, Commercials & Narrative Cuts
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/80">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono tabular-nums tracking-tight">
                24-48h
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Expedited First Cut Turnaround Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
