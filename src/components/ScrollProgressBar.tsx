import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Compass } from 'lucide-react';

interface SectionMilestone {
  id: string;
  label: string;
  chapter: string;
}

const SECTION_CHAPTERS: SectionMilestone[] = [
  { id: 'hero', label: 'Curated Horizons', chapter: 'Prologue' },
  { id: 'destinations', label: 'Featured Sanctuaries', chapter: 'I. Destinations' },
  { id: 'experiences', label: 'Signature Experiences', chapter: 'II. Experiences' },
  { id: 'why-us', label: 'Curatorial Standard', chapter: 'III. The Standard' },
  { id: 'timeline', label: 'Expedition Timeline', chapter: 'IV. The Journey' },
  { id: 'packages', label: 'Curated Packages', chapter: 'V. Expeditions' },
  { id: 'testimonials', label: 'Traveler Chronicles', chapter: 'VI. Chronicles' },
];

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth, organic spring physics for the scaleX transform
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.15,
    restDelta: 0.0005,
  });

  const [currentChapter, setCurrentChapter] = useState<SectionMilestone>(SECTION_CHAPTERS[0]);
  const [percent, setPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState<boolean>(false);

  // Update numerical percentage and detect active section
  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.min(100, Math.round(latest * 100)));
      setIsScrolledPastHero(latest > 0.05);

      // Show chapter badge briefly on scroll
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2200);

      // Detect current section in viewport
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTION_CHAPTERS.length - 1; i >= 0; i--) {
        const item = SECTION_CHAPTERS[i];
        if (item.id === 'hero') continue;
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentChapter(item);
          return;
        }
      }
      setCurrentChapter(SECTION_CHAPTERS[0]);
    });

    return () => {
      unsubscribe();
      clearTimeout(hideTimeout);
    };
  }, [scrollYProgress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Underlying subtle track (near invisible, high-end editorial feel) */}
      <div className="w-full h-[2.5px] bg-[#142E23]/10 backdrop-blur-xs relative overflow-hidden">
        {/* 2. Main Framer Motion progress bar with luxury gold & terracotta gradient */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#B85D43] via-[#C5A059] to-[#E5C378] origin-left relative"
          style={{ scaleX }}
        >
          {/* Luminous leading edge pip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 -mr-1 rounded-full bg-[#E5C378] blur-[2px] opacity-75" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 -mr-0.5 rounded-full bg-white shadow-[0_0_8px_#C5A059]" />
        </motion.div>
      </div>

      {/* 3. Subtle floating chapter badge in the top right, visible on scroll */}
      {isScrolledPastHero && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{
            opacity: isVisible ? 1 : 0.25,
            y: 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-3.5 right-6 pointer-events-auto transition-opacity duration-500 hover:opacity-100 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0E2018]/85 backdrop-blur-md border border-[#C5A059]/30 text-white shadow-lg text-[11px] font-mono tracking-wider"
        >
          <Compass className="w-3 h-3 text-[#C5A059] animate-[spin_12s_linear_infinite]" />
          <span className="text-[#C5A059] font-medium">{currentChapter.chapter}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80 font-light">{percent}%</span>
        </motion.div>
      )}
    </div>
  );
};
