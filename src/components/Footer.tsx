import React from 'react';
import { Film, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Film className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="font-bold text-white font-display text-sm tracking-wider">
                MUAWIYA
              </span>
              <span className="text-neutral-500 ml-2">Video Editor & Colorist</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <a href="#projects" className="hover:text-amber-400 transition-colors">
              Selected Works
            </a>
            <a href="#breakdown" className="hover:text-amber-400 transition-colors">
              Before & After
            </a>
            <a href="#services" className="hover:text-amber-400 transition-colors">
              Packages & Rates
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              Contact
            </a>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 font-mono transition-colors cursor-pointer"
            >
              Admin Portal
            </button>
          </div>

          {/* Back to top */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:imranmuawiya15@gmail.com"
              className="text-neutral-400 hover:text-white font-mono"
            >
              imranmuawiya15@gmail.com
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Muawiya. All cuts, color grades, and audio assets reserved.
          </div>
          <div className="font-mono">
            DaVinci Resolve Studio 19 · Adobe Premiere Pro · After Effects
          </div>
        </div>
      </div>
    </footer>
  );
};
