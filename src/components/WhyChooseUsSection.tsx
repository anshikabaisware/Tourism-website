import React from 'react';
import { Sliders, Users, BadgePercent, Clock, ShieldCheck, Award } from 'lucide-react';
import { WHY_CHOOSE_US_FEATURES } from '../data/travelData';

export const WhyChooseUsSection: React.FC = () => {
  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'itineraries':
        return <Sliders className="w-5 h-5 text-[#B4533C]" strokeWidth={1.75} />;
      case 'guides':
        return <Users className="w-5 h-5 text-[#B4533C]" strokeWidth={1.75} />;
      case 'pricing':
        return <BadgePercent className="w-5 h-5 text-[#B4533C]" strokeWidth={1.75} />;
      case 'support':
        return <Clock className="w-5 h-5 text-[#B4533C]" strokeWidth={1.75} />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#B4533C]" strokeWidth={1.75} />;
    }
  };

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#B4533C] uppercase mb-4">
            <span className="font-serif italic font-bold">Chapter 03</span>
            <span className="text-[#849488]">/</span>
            <span>The Wanderly Standard</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#0E2319] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
            Why Travelers <span className="italic font-light font-serif text-[#B4533C]">Entrust Us</span> with Their Journey
          </h2>
          <p className="mt-6 text-[#4B574F] text-base sm:text-xl leading-relaxed font-light [text-wrap:balance]">
            We reject mass tourism, generic hotel blocks, and cookie-cutter reservations. Every expedition is an original composition written exclusively for you.
          </p>
        </div>

        {/* 4 Architectural Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14 sm:mb-16">
          {WHY_CHOOSE_US_FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              className="p-8 bg-white rounded-2xl border border-[#E7E0D2] shadow-sm hover:border-[#0E2319]/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
            >
              <div>
                {/* Minimal line icon in subtle frame */}
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EBE5D8] flex items-center justify-center mb-6">
                  {getFeatureIcon(feature.id)}
                </div>

                {/* Editorial index indicator */}
                <div className="text-xs font-mono text-[#8B9B8E] mb-2">
                  PILLAR 0{idx + 1}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#0E2319] font-normal tracking-tight mb-3">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#506055] font-light leading-relaxed mb-8">
                  {feature.description}
                </p>
              </div>

              {/* Minimal Trust Indicator */}
              <div className="pt-4 border-t border-[#F2EDE3]">
                <div className="text-xs font-semibold text-[#0E2319] tabular-nums tracking-wider uppercase font-mono">
                  {feature.metric}
                </div>
                <div className="text-[11px] text-[#78887D] font-light mt-0.5">
                  {feature.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adjoining Proof Bar with Gold Numerals */}
        <div className="p-8 sm:p-14 bg-[#0E2319] rounded-3xl text-white shadow-2xl border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-amber-200/95 tabular-nums mb-2">
                12,400+
              </div>
              <div className="text-xs text-white/70 font-light tracking-[0.1em] uppercase">
                Bespoke Journeys Completed
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-amber-200/95 tabular-nums mb-2">
                99.4%
              </div>
              <div className="text-xs text-white/70 font-light tracking-[0.1em] uppercase">
                Traveler Satisfaction Rate
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-amber-200/95 tabular-nums mb-2">
                48
              </div>
              <div className="text-xs text-white/70 font-light tracking-[0.1em] uppercase">
                Sanctuaries & Countries
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-amber-200/95 tabular-nums mb-2">
                24/7
              </div>
              <div className="text-xs text-white/70 font-light tracking-[0.1em] uppercase">
                Diplomatic Concierge Dispatch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
