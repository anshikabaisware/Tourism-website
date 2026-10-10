import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/travelData';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-32 sm:py-44 bg-[#F5F0E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-18 sm:mb-24">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#B4533C] uppercase mb-4">
            <span className="font-serif italic font-bold">Chapter 05</span>
            <span className="text-[#849488]">/</span>
            <span>Traveler Chronicles</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#0E2319] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
            Stories from the <br />
            <span className="italic font-light font-serif text-[#B4533C]">Road Less Traveled</span>
          </h2>
          <p className="mt-6 text-[#4B574F] text-base sm:text-xl leading-relaxed font-light [text-wrap:balance]">
            Unvarnished reflections from clients who stepped beyond conventional travel into deeply contemplative, life-affirming encounters.
          </p>
        </div>

        {/* Editorial Featured Testimonial Card */}
        <div className="bg-white rounded-3xl border border-[#E2D9CB] p-8 sm:p-14 lg:p-20 shadow-2xl relative mb-12">
          {/* Subtle decorative quote background glyph */}
          <Quote className="absolute top-8 right-8 sm:top-14 sm:right-14 w-24 h-24 sm:w-36 sm:h-36 text-[#F5EDE0] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Star Rating & Trip Taken */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <span className="text-xs text-[#808F84]" aria-hidden="true">·</span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B4533C]">
                {current.tripTaken}
              </span>
              <span className="text-xs text-[#808F84]" aria-hidden="true">·</span>
              <span className="text-xs text-[#7B8B80] font-mono">{current.travelYear}</span>
            </div>

            {/* Editorial Highlight Quote */}
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0E2319] font-normal leading-[1.15] mb-8 italic">
              &ldquo;{current.highlightPhrase}&rdquo;
            </h3>

            {/* Narrative Story */}
            <p className="text-base sm:text-xl text-[#445348] font-light leading-relaxed mb-12 max-w-3xl">
              {current.story}
            </p>

            {/* Traveler Bio */}
            <div className="flex items-center justify-between pt-8 border-t border-[#F0EBE0]">
              <div className="flex items-center gap-5">
                {/* Monogram Portrait Avatar */}
                <div className="w-14 h-14 rounded-full bg-[#0E2319] text-amber-200 font-serif font-semibold text-xl flex items-center justify-center border-2 border-[#E7DFD1] shadow-sm">
                  {current.avatarSeed}
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-[#0E2319]">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#738378] font-light">
                    {current.location}
                  </p>
                </div>
              </div>

              {/* Prev / Next Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-3.5 rounded-full border border-[#DED7CA] hover:bg-[#FAF7F2] text-[#0E2319] transition-colors cursor-pointer active:scale-95"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3.5 rounded-full border border-[#DED7CA] hover:bg-[#FAF7F2] text-[#0E2319] transition-colors cursor-pointer active:scale-95"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Story Selector Mini Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#0E2319] shadow-md'
                    : 'bg-white/60 border-transparent hover:bg-white/90 text-[#6B796F]'
                }`}
              >
                <div className="text-xs font-mono text-[#B4533C] mb-1">
                  CHRONICLE 0{idx + 1}
                </div>
                <div className="text-sm font-serif font-medium text-[#0E2319] truncate">
                  {t.author}
                </div>
                <div className="text-[11px] text-[#7C8B80] truncate font-light mt-0.5">
                  {t.location}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
