import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ChevronDown,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Feather,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';

interface TimelinePhase {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  window: string;
  overview: string;
  keyPrivileges: string[];
  conciergeRole: string;
  insiderAnecdote: string;
  tag: string;
}

const EXPEDITION_PHASES: TimelinePhase[] = [
  {
    id: 'discovery',
    stepNumber: '01',
    title: 'Private Curatorial Consultation',
    subtitle: 'Taste Mapping & Sanctuary Blueprint',
    window: 'Day -60 to -45 Pre-Departure',
    overview:
      'We commence with an unhurried, private dialogue over bespoke interests, culinary preferences, physical cadence, and seclusion thresholds. No generic intake questionnaires.',
    keyPrivileges: [
      'Confidential taste-mapping consultation with senior regional curator',
      'Exclusive permit requests for restricted UNESCO and sanctuary zones',
      'Preliminary archival dossier tailored to personal architectural and historic curiosities',
    ],
    conciergeRole: 'Dedicated Mayfair or Zurich expedition director assigned to your household',
    insiderAnecdote:
      'For a recent Valais expedition, this phase unlocked private access to a 14th-century mountain chapel normally sealed to the public.',
    tag: 'FOUNDATION',
  },
  {
    id: 'choreography',
    stepNumber: '02',
    title: 'Architectural Itinerary Choreography',
    subtitle: 'Privileged Access & Master Artisan Bookings',
    window: 'Day -45 to -20 Pre-Departure',
    overview:
      'Every transfer, guide, lodging wing, and dining table is synchronized into a seamless score. We secure privatized estate buyouts and private aviation clearances.',
    keyPrivileges: [
      'Direct coordination with multi-generational cultural masters and tea docents',
      'Secured cellars and Michelin private-table buyouts with bespoke menus',
      'Hand-bound, leather-embossed itinerary dossier delivered to your residence',
    ],
    conciergeRole: 'Diplomatic flight clearances, private tarmac logistics, and luggage forwarding',
    insiderAnecdote:
      'Every reservation is double-vetted in person by our scouts two weeks prior to arrival.',
    tag: 'CHOREOGRAPHY',
  },
  {
    id: 'arrival',
    stepNumber: '03',
    title: 'Diplomatic Arrival & Sanctuary Welcome',
    subtitle: 'VIP Tarmac Escort & Sacred Grounding',
    window: 'Day 01 — Touchdown',
    overview:
      'Step off your flight directly onto a private tarmac escort, bypassing commercial customs and arrivals halls. Arrive at your private sanctuary in time for twilight grounding.',
    keyPrivileges: [
      'Direct tarmac-to-vehicle diplomatic transfer and expedited diplomatic security',
      'Helicopter or classic teak watercraft final transfer to remote estates',
      'Traditional welcome ritual — water blessing in Ubud, fireside Valais vintage tasting, or zen tea grounding in Kyoto',
    ],
    conciergeRole: '24/7 personal host on-site, managing unhurried baggage distribution and custom room climate',
    insiderAnecdote:
      'Your suite is scented with botanicals indigenous to the valley and pre-stocked with your preferred vintages at cellar temperature.',
    tag: 'WELCOME',
  },
  {
    id: 'immersion',
    stepNumber: '04',
    title: 'Unhurried Living with Resident Masters',
    subtitle: 'Deep Cultural & Wilderness Immersion',
    window: 'Days 02 to 09 — The Expedition',
    overview:
      'Each day unfolds organically without rigid tour buses or scheduled rushes. Spend dawns walking misted rice terraces alone, afternoons in private galleries with master curators, and evenings under alpine stars.',
    keyPrivileges: [
      'Private dawn entries before gates open to any other visitors',
      'Expeditions led by decorated mountaineers, high priests, or architectural historians',
      'Flexible, spontaneous day shifts based entirely on morning weather and energy',
    ],
    conciergeRole: 'Invisible support network providing continuous security, transport adjustments, and impromptu provisions',
    insiderAnecdote:
      'If morning sunlight makes the ridge impassable or cloudy, your host smoothly pivots to an underground barrel cellar tasting without missing a beat.',
    tag: 'EXPEDITION',
  },
  {
    id: 'archival',
    stepNumber: '05',
    title: 'Archival Monograph & Lasting Keepsake',
    subtitle: 'Generational Keepsakes & Cellar Deliveries',
    window: 'Post-Expedition — Generational Memory',
    overview:
      'The journey echoes long after departure. Receive hand-printed archival monographs of your voyage captured by an unobtrusive expedition photographer, plus rare regional provisions shipped to your door.',
    keyPrivileges: [
      'Bespoke cloth-bound linen monograph with high-definition photography and handwritten field notes',
      'Rare estate vintage allocations delivered directly to your home cellar',
      'Lifetime priority access to new secret sanctuary openings across the globe',
    ],
    conciergeRole: 'Follow-up debrief with your curator to catalog preferences for your next horizon',
    insiderAnecdote:
      'Over 92% of our voyagers commission their next chapter within three months of receiving their expedition monograph.',
    tag: 'HERITAGE',
  },
];

interface ExpeditionTimelineSectionProps {
  onOpenTripPlanner: () => void;
}

export const ExpeditionTimelineSection: React.FC<ExpeditionTimelineSectionProps> = ({
  onOpenTripPlanner,
}) => {
  // Track open phases (Phase 01 and 02 open by default for rich editorial preview)
  const [openPhaseIds, setOpenPhaseIds] = useState<string[]>(['discovery', 'arrival']);

  const togglePhase = (id: string) => {
    setOpenPhaseIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenPhaseIds(EXPEDITION_PHASES.map((p) => p.id));
  };

  const collapseAll = () => {
    setOpenPhaseIds([]);
  };

  return (
    <section id="timeline" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E8E1D3]">
      {/* Subtle Grain Background */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-18 gap-8 border-b border-[#E8E1D3] pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#B4533C] uppercase mb-4">
              <span className="font-serif italic font-bold">Chapter 03.5</span>
              <span className="text-[#849488]">/</span>
              <span>The Journey Anatomy</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#0E2319] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
              Bespoke <span className="italic font-light font-serif text-[#B4533C]">Expedition</span> Timeline
            </h2>
            <p className="mt-6 text-[#4B574F] text-base sm:text-xl leading-relaxed font-light [text-wrap:balance]">
              Discover how our atelier sculpts an expedition from initial confidential taste-mapping to lifelong generational archives. Toggle each phase to explore the meticulous care behind every voyage.
            </p>
          </div>

          {/* Quick Toggle Controls */}
          <div className="flex items-center gap-2 self-start lg:self-end">
            <button
              onClick={expandAll}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white hover:bg-[#0E2319] text-[#0E2319] hover:text-white border border-[#E3DBD0] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white hover:bg-[#0E2319] text-[#0E2319] hover:text-white border border-[#E3DBD0] rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Vertical Connecting Gold/Heritage Line */}
          <div className="hidden md:block absolute left-8 lg:left-12 top-6 bottom-12 w-0.5 bg-gradient-to-b from-[#C5A059] via-[#0E2319]/25 to-[#C5A059]/40" />

          {/* Timeline Steps Stack */}
          <div className="space-y-6 sm:space-y-8">
            {EXPEDITION_PHASES.map((phase, idx) => {
              const isOpen = openPhaseIds.includes(phase.id);

              return (
                <div
                  key={phase.id}
                  className="relative flex flex-col md:flex-row gap-6 lg:gap-10 items-start group"
                >
                  {/* Left Column: Number Node & Milestone Pin */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-16 lg:w-24">
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex flex-col items-center justify-center font-serif font-medium text-lg lg:text-xl transition-all duration-300 shadow-md cursor-pointer border ${
                        isOpen
                          ? 'bg-[#0E2319] text-[#E8D6B0] border-[#C5A059] scale-105 shadow-xl'
                          : 'bg-white text-[#0E2319] border-[#E3DBD0] hover:border-[#C5A059]'
                      }`}
                    >
                      <span className="leading-none">{phase.stepNumber}</span>
                      <span className="text-[9px] uppercase tracking-widest font-mono text-[#C5A059] mt-0.5">
                        PHASE
                      </span>
                    </button>
                  </div>

                  {/* Right Column: Interactive Card with Framer Motion Height Animation */}
                  <div className="flex-1 w-full bg-white rounded-3xl border border-[#E7E0D2] shadow-sm hover:border-[#0E2319]/40 transition-colors overflow-hidden">
                    {/* Clickable Header Bar */}
                    <button
                      type="button"
                      onClick={() => togglePhase(phase.id)}
                      className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAF8F5]/80 gap-4"
                    >
                      <div className="flex-1">
                        {/* Milestone Tag & Window */}
                        <div className="flex flex-wrap items-center gap-3 mb-2 text-xs font-mono">
                          <span className="md:hidden font-bold text-[#B4533C]">
                            PHASE {phase.stepNumber}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DF] text-[#0E2319] text-[10px] uppercase tracking-widest font-semibold">
                            {phase.tag}
                          </span>
                          <span className="text-[#78887D] flex items-center gap-1.5 font-light">
                            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                            {phase.window}
                          </span>
                        </div>

                        {/* Phase Title */}
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#0E2319] font-normal tracking-tight">
                          {phase.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#738277] font-light mt-1">
                          {phase.subtitle}
                        </p>
                      </div>

                      {/* Smooth Rotating Chevron Trigger */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#0E2319] text-white border-[#0E2319] rotate-180'
                            : 'bg-[#FAF7F2] text-[#0E2319] border-[#E5DFD4] hover:bg-white'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Smooth Framer Motion Height Animation */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.35, delay: 0.1 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.2 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#F2ECE1] space-y-6">
                            {/* Detailed Overview */}
                            <p className="text-sm sm:text-base text-[#46544A] font-light leading-relaxed">
                              {phase.overview}
                            </p>

                            {/* Privileges & Key Highlights */}
                            <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#EAE3D6]">
                              <div className="text-[11px] uppercase font-mono tracking-widest text-[#B4533C] font-semibold mb-3 flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                                <span>Privileged Deliverables</span>
                              </div>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[#3E4C43] font-light">
                                {phase.keyPrivileges.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Concierge Role & Insider Anecdote Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              {/* Concierge touchpoint */}
                              <div className="p-4 rounded-xl bg-white border border-[#EAE4D8] flex items-start gap-3">
                                <ShieldCheck className="w-4 h-4 text-[#0E2319] shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-[#0E2319] block mb-0.5 uppercase tracking-wider text-[10px]">
                                    Concierge Touchpoint
                                  </span>
                                  <span className="text-[#59685E] font-light leading-relaxed">
                                    {phase.conciergeRole}
                                  </span>
                                </div>
                              </div>

                              {/* Insider Anecdote */}
                              <div className="p-4 rounded-xl bg-white border border-[#EAE4D8] flex items-start gap-3">
                                <Feather className="w-4 h-4 text-[#B4533C] shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-semibold text-[#B4533C] block mb-0.5 uppercase tracking-wider text-[10px]">
                                    Field Note
                                  </span>
                                  <span className="text-[#59685E] font-light leading-relaxed italic">
                                    "{phase.insiderAnecdote}"
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Phase Bottom Bar: Direct Action */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#F0EBE2]">
                              <span className="text-xs text-[#7B8B80] font-light">
                                Bespoke tailoring available for private parties & family charters.
                              </span>
                              <button
                                onClick={onOpenTripPlanner}
                                className="px-5 py-2.5 bg-[#0E2319] hover:bg-[#1A3828] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                              >
                                <span>Begin Planning With This Phase</span>
                                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
