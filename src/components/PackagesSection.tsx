import React, { useState } from 'react';
import { TravelPackage } from '../types/travel';
import { Clock, Star, Check, ArrowRight, Heart, Filter, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PackagesSectionProps {
  packages: TravelPackage[];
  onSelectPackage: (pkg: TravelPackage) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  searchFilterDestination?: string;
  onClearSearchFilter?: () => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  onSelectPackage,
  wishlistIds,
  onToggleWishlist,
  searchFilterDestination,
  onClearSearchFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Luxury Retreat', 'Cultural Journeys', 'Alpine & Adventure'];

  // Apply search filter if passed from hero search
  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Luxury Retreat' && pkg.category.includes('Luxury Retreat')) ||
      (selectedCategory === 'Cultural Journeys' && pkg.category.includes('Cultural')) ||
      (selectedCategory === 'Alpine & Adventure' && (pkg.category.includes('Adventure') || pkg.category.includes('Alpine')));

    const matchesSearch =
      !searchFilterDestination ||
      pkg.destinationId.toLowerCase() === searchFilterDestination.toLowerCase();

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#091710] text-white relative overflow-hidden">
      {/* Cinematic Ambient Glow & Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#163628]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-[#B4533C]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8 border-b border-white/15 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-[#C5A059] uppercase mb-4">
              <span className="font-serif italic font-bold">Chapter 04</span>
              <span className="text-white/30">/</span>
              <span>Choreographed Expeditions</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7.5xl font-serif text-[#FAF7F2] font-normal tracking-tight leading-[0.98] [text-wrap:balance]">
              Curated <span className="italic font-light font-serif text-[#C5A059]">Packages</span>
            </h2>
            <p className="mt-6 text-white/70 text-base sm:text-xl leading-relaxed font-light [text-wrap:balance]">
              Comprehensive, privately chauffeured journeys encompassing five-star sanctuary estates, licensed scholars, and seamless ground logistics.
            </p>
          </div>

          {/* Dark Glassmorphism Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/5 rounded-xl self-start lg:self-end border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#091710] shadow-md font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter Active Notice */}
        {searchFilterDestination && (
          <div className="mb-10 p-5 bg-white/5 border border-white/15 rounded-2xl flex items-center justify-between backdrop-blur-md animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-xs text-amber-200 font-medium">
              <Filter className="w-4 h-4 text-[#C5A059]" />
              <span>
                Filtered by destination query: <strong className="capitalize font-serif text-sm text-white">{searchFilterDestination}</strong>
              </span>
            </div>
            {onClearSearchFilter && (
              <button
                onClick={onClearSearchFilter}
                className="text-xs text-[#C5A059] hover:underline font-semibold cursor-pointer uppercase tracking-wider"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* Packages Grid: Dark Cinematic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredPackages.map((pkg, idx) => {
            const isWishlisted = wishlistIds.includes(pkg.id);

            return (
              <motion.div
                key={pkg.id}
                id={`pkg-card-${pkg.id}`}
                data-cursor="card"
                data-cursor-label="JOURNEY"
                onClick={() => onSelectPackage(pkg)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer bg-white/5 hover:bg-white/[0.08] p-4 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-200/40 transition-all duration-500 flex flex-col md:flex-row transform hover:-translate-y-1.5 backdrop-blur-md shadow-2xl"
              >
                {/* Package Image Column */}
                <div className="md:w-5/12 relative aspect-4/3 md:aspect-auto overflow-hidden rounded-2xl bg-[#0F261B]">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Top Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(pkg.id);
                    }}
                    aria-label="Save package"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-white text-white hover:text-[#091710] backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer z-10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'fill-[#B4533C] text-[#B4533C]' : 'text-white'
                      }`}
                    />
                  </button>

                  {/* Top Plate number */}
                  <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-[0.2em] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/15">
                    EXPEDITION 0{idx + 1}
                  </div>

                  {/* Destination badge on image */}
                  <div className="absolute bottom-4 left-4 text-white text-xs font-serif italic drop-shadow-md">
                    {pkg.destinationName}
                  </div>
                </div>

                {/* Package Details Column */}
                <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    {/* Top unboxed metadata line */}
                    <div className="flex items-center justify-between text-xs text-white/70 mb-3 font-medium">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-200/90">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white tabular-nums font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                        <span>{pkg.rating.toFixed(2)}</span>
                        <span className="text-white/50 font-normal">({pkg.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif text-[#FAF7F2] font-normal tracking-tight group-hover:text-amber-100 transition-colors mb-4">
                      {pkg.title}
                    </h3>

                    {/* Highlights bullet points */}
                    <div className="space-y-2.5 mb-8">
                      {pkg.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white/75 font-light leading-snug">
                          <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-5 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-semibold block">
                        All-Inclusive From
                      </span>
                      <span className="text-2xl font-serif font-medium text-amber-100 tabular-nums">
                        ${pkg.pricePerPerson.toLocaleString()}
                        <span className="text-xs text-white/60 font-sans font-normal ml-1">/ person</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-6 py-3 bg-[#B4533C] hover:bg-[#9B422D] text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-xs transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                    >
                      <span>View Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
