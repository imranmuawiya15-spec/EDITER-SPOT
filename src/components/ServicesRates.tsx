import React from 'react';
import { Check, Sparkles, Zap, Flame, Clock } from 'lucide-react';

interface ServicesRatesProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesRates: React.FC<ServicesRatesProps> = ({ onSelectService }) => {
  const packages = [
    {
      id: 'youtube',
      name: 'YouTube Retention Engine',
      subtitle: 'For creators scaling beyond 100K+ subscribers',
      rate: '$450 – $950',
      period: 'per master video',
      turnaround: '48 – 72 hours',
      popular: true,
      features: [
        'Dynamic Hook Reconstruction (0:00 - 0:30)',
        'Frame-by-frame Retention Pacing & Dead-air Elimination',
        'Custom Sound Design Bed & Transient SFX',
        'Bespoke Motion Typography & Lower Thirds',
        'Export for 4K YouTube & High Bitrate Presets',
        'Up to 2 Iterative Revision Passes',
      ],
    },
    {
      id: 'commercial',
      name: 'Commercial & Brand Ads',
      subtitle: 'High-energy advertising for e-commerce & SaaS',
      rate: '$800 – $1,800',
      period: 'per campaign cut',
      turnaround: '24 – 48 hours',
      popular: false,
      features: [
        'Multi-format Exports (16:9, 9:16 TikTok, 1:1, 4:5)',
        '3D Camera Motion Tracking & Product Callouts',
        'Color Grading in DaVinci Resolve Studio 19',
        'Music Licensing & Commercial Stems Mixing',
        'Hook Testing Variants (A/B Test Openers)',
        'Broadcasting Master Standards Compliant',
      ],
    },
    {
      id: 'retainer',
      name: 'Full Studio Retainer',
      subtitle: 'Complete outsourced editing arm for active media brands',
      rate: '$2,800',
      period: 'monthly retainer',
      turnaround: 'Continuous 24h sprint',
      popular: false,
      features: [
        'Dedicated Weekly Capacity (4 Long-form + 12 Shorts)',
        'Direct Private Discord / Slack Channel with Muawiya',
        'Priority Timeline Queue & Same-Day Revisions',
        'Asset Library Management & Cloud Backup Archive',
        'Monthly Retention Analytics Review & Strategic Advisory',
        'Collaborative Timecoded Review Portal Access',
      ],
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <span>02</span>
            <span aria-hidden="true">·</span>
            <span>Services & Rates</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Production Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Post-Production Packages Engineered for Impact
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            No endless hourly billing. Flat-rate predictable deliverables with fast turnaround and relentless attention to retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 lg:p-8 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-400/10'
                  : 'bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-black text-[11px] font-mono font-bold uppercase rounded-full shadow-md">
                  Most Requested by Creators
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white font-display">{pkg.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{pkg.subtitle}</p>

                <div className="mt-5 pb-5 border-b border-neutral-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                      {pkg.rate}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">{pkg.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Average turnaround: {pkg.turnaround}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-mono uppercase text-neutral-500 block mb-2">
                    Package Deliverables
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => onSelectService(pkg.name)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/20'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  Book This Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
