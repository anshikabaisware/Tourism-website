import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from '../types/travel';
import { Sparkles } from 'lucide-react';

interface MorphTransitionOverlayProps {
  isMorphing: boolean;
  destination: Destination | null;
  onComplete: () => void;
}

export const MorphTransitionOverlay: React.FC<MorphTransitionOverlayProps> = ({
  isMorphing,
  destination,
  onComplete,
}) => {
  const [animating, setAnimating] = useState(false);
  const [targetRect, setTargetRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!isMorphing || !destination) {
      setAnimating(false);
      setTargetRect(null);
      return;
    }

    const targetCardId = `dest-card-${destination.id}`;
    const destSection = document.getElementById('destinations');
    const targetCard = document.getElementById(targetCardId);

    // 1. Position the document cleanly at the destination section under the fixed navbar
    const navbarOffset = 72;
    if (destSection) {
      const currentSectionRect = destSection.getBoundingClientRect();
      const targetScrollY = currentSectionRect.top + window.scrollY - navbarOffset;
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'instant' as ScrollBehavior,
      });
    }

    // 2. Measure the static destination card position on screen
    const measuredCard = targetCard || document.getElementById(targetCardId);
    if (measuredCard) {
      const rect = measuredCard.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      // Robust responsive fallback if element is not in DOM
      setTargetRect({
        top: 140,
        left: window.innerWidth * 0.08,
        width: window.innerWidth * 0.84,
        height: Math.min(window.innerHeight * 0.6, 520),
      });
    }

    // 3. Trigger continuous interpolation on the next animation frame
    const frameId = requestAnimationFrame(() => {
      setAnimating(true);
    });

    // 4. Complete transition, highlight card, and hand off cleanly
    const completeTimer = setTimeout(() => {
      onComplete();

      // Trigger refined golden halo accent on target destination card
      const settledCard = document.getElementById(targetCardId);
      if (settledCard) {
        settledCard.classList.add('ring-4', 'ring-[#C5A059]', 'ring-offset-2', 'scale-101');
        setTimeout(() => {
          settledCard.classList.remove('ring-4', 'ring-[#C5A059]', 'ring-offset-2', 'scale-101');
        }, 1200);
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(completeTimer);
    };
  }, [isMorphing, destination, onComplete]);

  if (!isMorphing || !destination || !targetRect) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {/* Genuine Fixed-Position Continuous Morph Image Overlay */}
        <motion.div
          initial={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          }}
          animate={
            animating
              ? {
                  top: targetRect.top,
                  left: targetRect.left,
                  width: targetRect.width,
                  height: targetRect.height,
                  borderRadius: '24px',
                  boxShadow: '0 20px 45px rgba(10,26,18,0.25)',
                }
              : {
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  borderRadius: '0px',
                }
          }
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1], // Smooth physical deceleration curve
          }}
          className="fixed overflow-hidden z-50 border border-white/20 will-change-transform bg-[#0E2319]"
        >
          {/* Continuous Object-Cover Image Morphing Across Crop Ratios */}
          <motion.img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.08 }}
            animate={{ scale: animating ? 1 : 1.08 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Luminous Scrim for Continuous Typography Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Synchronized Content Labels */}
          <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-200/90 font-medium mb-1 drop-shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{destination.country} · {destination.region}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif text-white font-normal tracking-tight drop-shadow-md">
              {destination.name}
            </h3>
            <p className="text-xs text-white/80 font-light mt-1 truncate">
              {destination.tagline}
            </p>
          </div>

          {/* Continuous Morph Indicator Pill */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest text-amber-200 border border-white/20">
            DISCOVERING {destination.name.toUpperCase()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
