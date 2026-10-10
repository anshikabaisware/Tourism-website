import React from 'react';
import { Destination } from '../types/travel';
import { X, Calendar, Clock, Star, MapPin, Check, Lightbulb, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTripTo: (destName: string) => void;
  onViewPackagesFor: (destId: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTripTo,
  onViewPackagesFor,
}) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-dest-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Animated Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#07120D]/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal Dialog Card with Spring Expansion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E4DDD0] z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Image with Shared Layout Morphing */}
          <div className="relative h-72 sm:h-88 w-full shrink-0 overflow-hidden bg-[#0E2319]">
            <motion.img
              layoutId={`dest-img-${destination.id}`}
              src={destination.imageUrl}
              alt={destination.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12]/95 via-black/35 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#0E2319] backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero text overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90 mb-1 drop-shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#B4533C]" />
                <span>{destination.country} · {destination.region}</span>
              </div>
              <h2 id="modal-dest-title" className="text-3xl sm:text-5xl font-serif font-normal tracking-tight drop-shadow-md">
                {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 font-light mt-1.5 drop-shadow-sm">
                {destination.tagline}
              </p>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Key Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-[#EAE3D6] text-xs shadow-xs">
              <div>
                <span className="text-[#7A8A7E] block text-[10px] uppercase font-mono tracking-wider">Best Season</span>
                <span className="font-serif text-sm font-medium text-[#0E2319]">{destination.bestTimeToVisit.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-[#7A8A7E] block text-[10px] uppercase font-mono tracking-wider">Duration</span>
                <span className="font-serif text-sm font-medium text-[#0E2319]">{destination.idealDuration}</span>
              </div>
              <div>
                <span className="text-[#7A8A7E] block text-[10px] uppercase font-mono tracking-wider">Starting Rate</span>
                <span className="font-serif text-sm font-medium text-[#0E2319] tabular-nums">
                  {destination.currency}{destination.startingPrice.toLocaleString()} / pp
                </span>
              </div>
              <div>
                <span className="text-[#7A8A7E] block text-[10px] uppercase font-mono tracking-wider">Traveler Rating</span>
                <span className="font-serif text-sm font-medium text-[#0E2319] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  {destination.rating} ({destination.reviewsCount})
                </span>
              </div>
            </div>

            {/* Long Description */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#78887D] font-semibold mb-2">
                The Expedition
              </h4>
              <p className="text-sm sm:text-base text-[#3A4A3F] font-light leading-relaxed">
                {destination.longDescription}
              </p>
            </div>

            {/* Curated Highlights */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#78887D] font-semibold mb-3">
                Curated Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#28382E] font-medium p-3 bg-white rounded-xl border border-[#EDE7DC]">
                    <Check className="w-4 h-4 text-[#B4533C] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insider Curated Tips */}
            <div className="p-5 bg-[#F2EDE3] rounded-2xl border border-[#E4DDD0]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0E2319] uppercase tracking-wider mb-2.5">
                <Lightbulb className="w-4 h-4 text-[#C5A059]" />
                <span>Curator Private Notes</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4F5E53] font-light">
                {destination.curatedTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B4533C] font-bold">·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="p-6 bg-[#FAF7F2] border-t border-[#E8E1D3] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <button
              onClick={() => {
                onViewPackagesFor(destination.id);
                onClose();
              }}
              className="text-xs text-[#0E2319] hover:text-[#B4533C] font-medium tracking-wide underline cursor-pointer"
            >
              Browse matching {destination.name} packages
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-medium text-[#67776C] hover:text-[#0E2319] rounded-sm transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onPlanTripTo(destination.name);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-7 py-3 bg-[#0E2319] hover:bg-[#1A3828] text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Design {destination.name} Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
