import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HERO_IMAGE, FEATURED_DESTINATIONS } from '../data/travelData';
import { Search, MapPin, Calendar, Users, ArrowRight, Compass, ChevronDown } from 'lucide-react';
import { SearchQuery } from '../types/travel';

interface HeroProps {
  onSearch: (query: SearchQuery) => void;
  onOpenTripPlanner: () => void;
  onExploreDestinations: (destinationId?: string) => void;
  onSelectDestinationById?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenTripPlanner,
  onExploreDestinations,
  onSelectDestinationById,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth subtle background parallax (kept inside container without pinning the page)
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  // Active floating destination preview card and vista index
  const [featuredCardIndex, setFeaturedCardIndex] = useState(0);
  const featuredDest = FEATURED_DESTINATIONS[featuredCardIndex] || FEATURED_DESTINATIONS[0];

  // Search state
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('May – Sept 2026');
  const [travelers, setTravelers] = useState(2);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      dates,
      travelers,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0A1A12] text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 z-10"
    >
      {/* Background Photography Container with Subtle Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
        >
          <img
            src={HERO_IMAGE}
            alt="Cinematic Alpine Glacial Lake"
            className="w-full h-full object-cover object-center animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Controlled Luminous Atmospheric Gradient Overlay - High Contrast without Dark Muddiness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06140D]/88 via-black/35 to-black/25 pointer-events-none" />
      </div>

      {/* Top Editorial Ribbon */}
      <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/80 border-b border-white/15 pb-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <span className="text-[#C5A059] font-serif font-bold italic">N° 26</span>
          <span className="text-white/30">/</span>
          <span>Bespoke Travel Atelier</span>
          <span className="hidden sm:inline text-white/30">/</span>
          <span className="hidden sm:inline">Volume XII</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
          <span>46°35′N 7°58′E · VALAIS ALPS</span>
        </div>
      </div>

      {/* Main Center Content: Headline & Floating Destination Preview Card */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-end">
          {/* Left Column: Oversized Typography & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Subtle Location Kicker */}
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-medium mb-4">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>EXPEDITIONS BEYOND THE ORDINARY</span>
            </div>

            {/* Huge Elegant Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl font-serif text-white font-normal leading-[0.95] tracking-tight mb-5 [text-wrap:balance]">
              THE WORLD IS <br />
              <span className="italic font-light font-serif text-[#F4E9D4]">YOURS</span> TO DISCOVER.
            </h1>

            {/* Emotional Subtitle */}
            <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl mb-7 [text-wrap:balance]">
              Escape standard tourism. Immerse yourself in privately curated sanctuaries, generational cultural custodians, and rare landscapes sculpted for unhurried souls.
            </p>

            {/* Refined CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreDestinations(featuredDest.id)}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#B4533C] hover:bg-[#9B422D] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-xl active:scale-95 flex items-center gap-3 group cursor-pointer rounded-xs"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onOpenTripPlanner}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white/12 hover:bg-white/22 text-white backdrop-blur-md border border-white/30 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer active:scale-95 rounded-xs"
              >
                Plan Your Journey
              </button>
            </div>
          </div>

          {/* Right Column: Floating Destination Preview Card & Interactive Vista Switcher */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div
              onClick={() => {
                if (onSelectDestinationById) {
                  onSelectDestinationById(featuredDest.id);
                } else {
                  onExploreDestinations(featuredDest.id);
                }
              }}
              data-cursor="card"
              data-cursor-label="PREVIEW"
              className="group/card cursor-pointer bg-white/12 hover:bg-white/18 backdrop-blur-xl border border-white/25 rounded-2xl p-4 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A059]/50"
            >
              <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3">
                <img
                  src={featuredDest.imageUrl}
                  alt={featuredDest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-106"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-amber-200 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-white/20">
                  Featured Sanctuary
                </div>
                <div className="absolute bottom-2.5 left-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/90 block font-medium">
                    {featuredDest.country}
                  </span>
                  <span className="text-lg font-serif font-medium leading-none">
                    {featuredDest.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/90">
                <span className="text-[11px] font-light text-white/70">
                  From ${featuredDest.startingPrice.toLocaleString()} / person
                </span>
                <div className="flex items-center gap-1.5 text-[#C5A059] group-hover/card:translate-x-1 transition-transform">
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Explore Sanctuary</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Destination Switcher Controls */}
              <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-white/15">
                <span className="text-[9px] uppercase tracking-wider text-white/60 mr-1 font-mono">Vista:</span>
                {FEATURED_DESTINATIONS.map((d, i) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFeaturedCardIndex(i);
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer font-mono ${
                      featuredCardIndex === i
                        ? 'bg-white text-[#0E2319] font-bold shadow-xs'
                        : 'text-white/70 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area: Minimal Travel-Search Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-6 sm:mt-8 space-y-4">
        {/* Floating Architectural Minimal Search Bar */}
        <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7E0D3] p-3 sm:p-4 backdrop-blur-md text-[#1E2621]">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
          >
            {/* Sanctuary / Destination */}
            <div className="md:col-span-4 p-3 bg-white rounded-xl border border-[#EBE4D5] hover:border-[#0E2319]/40 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6E7D72] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#B4533C]" />
                Destination Sanctuary
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-serif font-medium text-[#0E2319] focus:outline-hidden cursor-pointer"
              >
                <option value="">All Curated Horizons</option>
                <option value="bali">Bali, Indonesia (Tropical Sanctuary)</option>
                <option value="switzerland">Swiss Alps (Glacial Peaks)</option>
                <option value="kyoto">Kyoto, Japan (Zen & Heritage)</option>
                <option value="santorini">Santorini, Greece (Cycladic Caldera)</option>
              </select>
            </div>

            {/* Travel Window */}
            <div className="md:col-span-3 p-3 bg-white rounded-xl border border-[#EBE4D5] hover:border-[#0E2319]/40 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6E7D72] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#B4533C]" />
                Season / Window
              </label>
              <select
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-transparent text-sm font-serif font-medium text-[#0E2319] focus:outline-hidden cursor-pointer"
              >
                <option value="May – Sept 2026">Spring / Summer 2026</option>
                <option value="Oct – Dec 2026">Autumn / Foliage 2026</option>
                <option value="Jan – April 2027">Winter / Early 2027</option>
                <option value="Flexible Dates">Flexible Bespoke Dates</option>
              </select>
            </div>

            {/* Travelers */}
            <div className="md:col-span-3 p-3 bg-white rounded-xl border border-[#EBE4D5] hover:border-[#0E2319]/40 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6E7D72] mb-1">
                <Users className="w-3.5 h-3.5 text-[#B4533C]" />
                Travel Party
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-serif font-medium text-[#0E2319] focus:outline-hidden cursor-pointer"
              >
                <option value={1}>1 Solo Voyager</option>
                <option value={2}>2 Travellers (Couple)</option>
                <option value={3}>3 Travellers</option>
                <option value={4}>4 Travellers (Private Group)</option>
                <option value={6}>6+ Private Charter Party</option>
              </select>
            </div>

            {/* Search Action */}
            <div className="md:col-span-2 h-full flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[50px] bg-[#0E2319] hover:bg-[#1A3828] text-white font-medium text-xs tracking-[0.15em] uppercase rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Subtle Animated Scroll Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono text-white/70 tracking-widest uppercase pt-1">
          <span className="hidden sm:inline">DISCOVER BEYOND ORDINARY</span>
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="animate-bounce">
              <ChevronDown className="w-3.5 h-3.5 text-[#C5A059]" />
            </span>
            <span>SCROLL TO EXPLORE</span>
          </div>
          <span className="hidden sm:inline">SWISS ALPS · BALI · KYOTO · SANTORINI</span>
        </div>
      </div>
    </section>
  );
};
