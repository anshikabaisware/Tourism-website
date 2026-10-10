import React from 'react';
import { HERO_IMAGE } from '../data/travelData';
import { ArrowRight, Compass } from 'lucide-react';

interface CtaBannerProps {
  onOpenTripPlanner: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenTripPlanner }) => {
  return (
    <section className="relative py-36 sm:py-48 px-6 sm:px-12 overflow-hidden">
      {/* Background with measured dark scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Expedition landscape"
          className="w-full h-full object-cover object-bottom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#091710]/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90 mb-6">
          <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Bespoke Journeys Await</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-white font-normal tracking-tight mb-8 leading-[1.02] [text-wrap:balance]">
          Your Next Great Story <br />
          <span className="italic font-light font-serif text-[#F3E8D0]">Starts Here</span>.
        </h2>

        <p className="text-base sm:text-xl text-white/85 font-light max-w-2xl mx-auto mb-12 leading-relaxed [text-wrap:balance]">
          Let our master travel curators sculpt an itinerary tailored to your exact rhythm, curiosities, and dreams. No obligations, only endless horizons.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenTripPlanner}
            className="px-10 py-4.5 bg-[#B4533C] hover:bg-[#9B422D] text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xs shadow-2xl transition-all duration-300 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <span>Start Planning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
