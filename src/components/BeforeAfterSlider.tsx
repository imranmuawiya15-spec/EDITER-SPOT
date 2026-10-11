import React, { useState, useRef, useCallback } from 'react';
import { Sliders, Sparkles, Layers } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW S-Log3 Camera Profile',
  afterLabel = 'Muawiya Master Color Grade',
  title = 'Interactive Color Grade & Node Tree Breakdown',
  subtitle = 'Drag the slider across the frame to compare flat uncorrected footage against the final theatrical grade.',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>DAVINCI COLOR PIPELINE</span>
          </div>
          {title && <h3 className="text-xl sm:text-2xl font-bold text-white font-display">{title}</h3>}
          {subtitle && <p className="text-sm text-neutral-400 mt-1 max-w-2xl">{subtitle}</p>}
        </div>
      )}

      {/* Interactive slider frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-800 bg-neutral-950 shadow-2xl"
      >
        {/* Right side / Full background (After: Graded Image) */}
        <img
          src={afterImage}
          alt={afterLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Left side / Clipped layer (Before: Raw Log Image) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 h-full object-cover max-w-none pointer-events-none filter saturate-50 contrast-75 brightness-95"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
            }}
          />
        </div>

        {/* Floating comparison labels */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-3 py-1 rounded bg-black/75 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-neutral-700/60">
            {beforeLabel}
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="px-3 py-1 rounded bg-amber-500/80 backdrop-blur-md text-[11px] font-mono text-black font-semibold border border-amber-400/60 shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Divider vertical bar */}
        <div
          className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          <div className="absolute w-9 h-9 rounded-full bg-neutral-900 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs">
            <span className="font-mono text-[10px] select-none">↔</span>
          </div>
        </div>

        {/* Bottom indicator hint */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-20">
          <span className="text-[10px] font-mono text-white/70 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            Drag left / right to inspect color grading
          </span>
        </div>
      </div>
    </div>
  );
};
