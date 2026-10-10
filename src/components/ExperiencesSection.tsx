import React, { useState } from 'react';
import { SIGNATURE_EXPERIENCES } from '../data/travelData';
import { Experience } from '../types/travel';
import { Compass, Landmark, Sparkles, Trees, Check, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface ExperiencesSectionProps {
  onOpenTripPlanner: () => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onOpenTripPlanner }) => {
  const [activeExperience, setActiveExperience] = useState<Experience>(SIGNATURE_EXPERIENCES[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#B4533C]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#B4533C]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#B4533C]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#B4533C]" />;
      default:
        return <Compass className="w-5 h-5 text-[#B4533C]" />;
    }
  };

  return (
    <section id="experiences" className="py-20 sm:py-28 bg-[#F5F0E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#B4533C] uppercase mb-4">
            <span className="font-serif italic font-bold">Chapter 02</span>
            <span className="text-[#849488]">/</span>
            <span>Bespoke Modalities</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#0E2319] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
            Signature <span className="italic font-light font-serif text-[#B4533C]">Experiences</span>
          </h2>
          <p className="mt-6 text-[#4B574F] text-base sm:text-xl leading-relaxed font-light [text-wrap:balance]">
            Every expedition is sculpted around deep human curiosity. Whether seeking adrenaline atop alpine ridges or silent contemplation in private tea pavilions, choose how you wish to feel.
          </p>
        </div>

        {/* 4 Interactive Selector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SIGNATURE_EXPERIENCES.map((exp, idx) => {
            const isSelected = activeExperience.id === exp.id;

            return (
              <div
                key={exp.id}
                onClick={() => setActiveExperience(exp)}
                className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0E2319] text-white border-[#0E2319] shadow-2xl -translate-y-2'
                    : 'bg-white text-[#0E2319] border-[#E5DFD4] hover:border-[#B4533C]/50 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-white/10' : 'bg-[#FAF7F2]'}`}>
                      {getIcon(exp.iconName)}
                    </div>
                    <span className={`text-xs font-serif italic ${isSelected ? 'text-amber-200/90' : 'text-[#7D8A80]'}`}>
                      0{idx + 1} / 04
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-serif font-normal mb-3 tracking-tight ${
                    isSelected ? 'text-white' : 'text-[#0E2319]'
                  }`}>
                    {exp.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${
                    isSelected ? 'text-white/80' : 'text-[#58665C]'
                  }`}>
                    {exp.subtitle}
                  </p>
                </div>

                <div className={`pt-5 border-t text-xs flex items-center justify-between font-mono ${
                  isSelected ? 'border-white/15 text-white/70' : 'border-[#EFEAE0] text-[#738277]'
                }`}>
                  <span>{exp.durationRange}</span>
                  <span className="font-sans font-medium">{exp.groupSize}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Deep-Dive Showcase */}
        <div className="bg-white rounded-3xl border border-[#E4DDD0] p-8 sm:p-14 lg:p-16 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#B4533C] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B4533C]" />
                <span>Atelier Dossier · {activeExperience.category}</span>
              </div>

              <h4 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0E2319] font-normal leading-snug mb-6 italic">
                &ldquo;{activeExperience.accentQuote}&rdquo;
              </h4>

              <p className="text-sm sm:text-base text-[#4C5B51] font-light leading-relaxed mb-8">
                {activeExperience.description}
              </p>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
                {activeExperience.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#28382E] font-medium p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE7DC]">
                    <Check className="w-4 h-4 text-[#B4533C] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenTripPlanner}
                  className="px-8 py-4 bg-[#0E2319] hover:bg-[#1A3828] text-white text-xs font-semibold tracking-[0.15em] uppercase rounded-xs transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Request Custom {activeExperience.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl p-7 sm:p-10 border border-[#E9E3D6]">
              <div className="text-xs uppercase tracking-[0.2em] text-[#77867C] font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B4533C]" />
                <span>Curated Access Points</span>
              </div>
              <div className="space-y-4 mb-8">
                {activeExperience.representativeDestinations.map((destName, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-[#EDE7DB] last:border-0 last:pb-0">
                    <span className="text-base font-serif font-medium text-[#0E2319]">{destName}</span>
                    <span className="text-xs text-[#B4533C] font-semibold tracking-wider uppercase">Private Access</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-5 border border-[#E6E0D3] flex items-center gap-3.5 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#0E2319] shrink-0" />
                <p className="text-xs text-[#526257] font-light leading-relaxed">
                  Complimentary flight coordination and private executive transfer included on all itineraries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
