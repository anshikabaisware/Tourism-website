import React, { useState, useRef } from 'react';
import { Destination } from '../types/travel';
import { ArrowUpRight, Heart, Star, Sparkles, MapPin } from 'lucide-react';
import { motion, LayoutGroup, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  activeRegionFilter?: string;
}

interface DestinationCardProps {
  dest: Destination;
  idx: number;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onSelectDestination: (destination: Destination) => void;
  asymmetricalClass: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  dest,
  idx,
  isWishlisted,
  onToggleWishlist,
  onSelectDestination,
  asymmetricalClass,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax tracking using performant CSS translateY transform
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Alternating parallax travel depths (-8% to +8% vs -12% to +12%) for multi-plane depth
  const parallaxSpeed = idx % 2 === 0 ? ['-8%', '8%'] : ['-12%', '12%'];
  const imageTranslateY = useTransform(scrollYProgress, [0, 1], parallaxSpeed);

  // Magnetic cursor tracking motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  // Calibrated spring physics for anchored yet organic responsiveness
  const springConfig = { stiffness: 220, damping: 24, mass: 0.6 };
  const magneticX = useSpring(rawX, springConfig);
  const magneticY = useSpring(rawY, springConfig);
  const tiltX = useSpring(rawRotateX, springConfig);
  const tiltY = useSpring(rawRotateY, springConfig);

  // Cursor position tracking for subtle dynamic sheen
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    setCursorPos({ x: relativeX, y: relativeY });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = relativeX - centerX;
    const deltaY = relativeY - centerY;

    // Subtle magnetic displacement (subtle ~7px pull)
    rawX.set(deltaX * 0.038);
    rawY.set(deltaY * 0.038);

    // Subtle physical 3D tilt (max ~2.4 degrees)
    rawRotateX.set(-deltaY * 0.012);
    rawRotateY.set(deltaX * 0.012);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={`dest-card-${dest.id}`}
      data-cursor="card"
      data-cursor-label="EXPLORE"
      onClick={() => onSelectDestination(dest)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.9,
        delay: idx * 0.12,
        ease: [0.16, 1, 0.3, 1], // Smooth physical entrance
      }}
      style={{
        x: magneticX,
        y: magneticY,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1200,
      }}
      className={`group cursor-pointer relative rounded-3xl overflow-hidden border border-[#E8E1D3] shadow-card-hover flex flex-col justify-between transition-shadow duration-500 will-change-transform ${asymmetricalClass}`}
    >
      {/* Background Image Container with 120% height and GPU translateY Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#ECE6DA] pointer-events-none">
        <motion.div
          style={{ y: imageTranslateY }}
          className="absolute -top-[10%] inset-x-0 h-[120%] w-full will-change-transform"
        >
          <motion.img
            layoutId={`dest-img-${dest.id}`}
            src={dest.imageUrl}
            alt={`${dest.name}, ${dest.country}`}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-106"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Gradient Scrims for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12]/92 via-black/35 to-black/20 opacity-85 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-radial from-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Dynamic Cursor Specular Sheen (Subtle light reflection following the mouse) */}
      {isHovered && (
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,255,255,0.09), transparent 60%)`,
          }}
        />
      )}

      {/* Top Overlay Bar */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm border border-white/15">
            PLATE 0{idx + 1} · {dest.country.toUpperCase()}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(dest.id);
          }}
          aria-label={isWishlisted ? `Remove ${dest.name}` : `Save ${dest.name}`}
          className="p-3 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#0E2319] backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#B4533C] text-[#B4533C]' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Bottom Overlay Content with Overlapping Typography */}
      <div className="relative z-10 p-6 sm:p-8 text-white">
        {/* Region & Visiting Window */}
        <div className="text-xs uppercase tracking-[0.2em] text-amber-200/90 font-medium mb-1 drop-shadow-sm">
          {dest.region} · {dest.bestTimeToVisit.split('(')[0]}
        </div>

        {/* Overlapping Oversized Serif Title */}
        <h3 className="text-3xl sm:text-5xl lg:text-5.5xl font-serif text-white font-normal tracking-tight mb-3 group-hover:text-amber-100 transition-colors drop-shadow-md">
          {dest.name}
        </h3>

        {/* Description revealed with smooth expansion */}
        <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl mb-6 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
          {dest.description}
        </p>

        {/* Bottom Strip: Pricing & Interactive Explore Trigger */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 block font-semibold">
              Starting All-Inclusive
            </span>
            <span className="text-2xl font-serif font-medium text-white tabular-nums">
              {dest.currency}{dest.startingPrice.toLocaleString()}
              <span className="text-xs text-white/70 font-sans font-normal ml-1">/ person</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white text-white hover:text-[#0E2319] backdrop-blur-md rounded-xs text-xs font-semibold uppercase tracking-wider transition-all duration-300">
            <span>Explore Dossier</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  onSelectDestination,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Asia', 'Europe', 'Mediterranean'];

  const filteredDestinations = selectedRegion === 'All'
    ? destinations
    : destinations.filter((d) => d.region === selectedRegion);

  // Layout configuration for asymmetrical editorial gallery
  const getAsymmetricalClasses = (index: number) => {
    switch (index % 4) {
      case 0: // Bali: Large panoramic marquee
        return 'lg:col-span-7 min-h-[440px] lg:min-h-[520px]';
      case 1: // Switzerland: Tall vertical monument
        return 'lg:col-span-5 min-h-[440px] lg:min-h-[520px]';
      case 2: // Kyoto: Meditative deep column
        return 'lg:col-span-5 min-h-[440px] lg:min-h-[520px]';
      case 3: // Santorini: Expansive sunset spread
        return 'lg:col-span-7 min-h-[440px] lg:min-h-[520px]';
      default:
        return 'lg:col-span-6 min-h-[440px]';
    }
  };

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative subtle background grid lines */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8 border-b border-[#E8E1D3] pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#B4533C] uppercase mb-4">
              <span className="font-serif italic font-bold">Chapter 01</span>
              <span className="text-[#849488]">/</span>
              <span>Sanctuaries & Horizons</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#0E2319] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
              Immersive <span className="italic font-light font-serif text-[#B4533C]">Destinations</span>
            </h2>
            <p className="mt-6 text-[#4B574F] text-base sm:text-xl leading-relaxed font-light max-w-2xl [text-wrap:balance]">
              Venture into landscapes unblemished by mass crowds. From high-alpine glaciers to sacred bamboo temples, discover sanctuaries sculpted for contemplation.
            </p>
          </div>

          {/* Interactive Region Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE9DF] rounded-xl self-start lg:self-end border border-[#E3DBD0]">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedRegion === region
                    ? 'bg-white text-[#0E2319] shadow-sm font-semibold'
                    : 'text-[#647167] hover:text-[#0E2319]'
                }`}
              >
                {region === 'All' ? 'All Horizons' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Grid with LayoutGroup */}
        <LayoutGroup id="wanderly-gallery">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {filteredDestinations.map((dest, idx) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                idx={idx}
                isWishlisted={wishlistIds.includes(dest.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectDestination={onSelectDestination}
                asymmetricalClass={getAsymmetricalClasses(idx)}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
};
