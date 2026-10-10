import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type CursorVariant = 'default' | 'button' | 'link' | 'card' | 'input';

export const CustomCursor: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [isPointerInside, setIsPointerInside] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);
  const [cardBadgeText, setCardBadgeText] = useState<string>('EXPLORE');

  // Exact mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High responsiveness for the central point
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 38, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 38, mass: 0.1 });

  // Spring physics for the trailing magnetic ring
  const ringX = useSpring(mouseX, { stiffness: 280, damping: 28, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 28, mass: 0.45 });

  useEffect(() => {
    // Detect touch / fine pointer devices
    const checkFinePointer = () => {
      const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setIsTouchDevice(!hasFinePointer);
    };

    checkFinePointer();
    window.addEventListener('resize', checkFinePointer);

    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isPointerInside) {
        setIsPointerInside(true);
      }

      // Detect element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check for Destination or Package Card
      const cardElement = target.closest(
        '[id^="dest-card-"], [id^="pkg-card-"], [data-cursor="card"], .destination-card'
      );
      if (cardElement) {
        setCursorVariant('card');
        const customLabel = cardElement.getAttribute('data-cursor-label');
        setCardBadgeText(customLabel || 'EXPLORE');
        return;
      }

      // 2. Check for Text Input, Select, Textarea
      if (target.closest('input, textarea, select')) {
        setCursorVariant('input');
        return;
      }

      // 3. Check for Button or Primary CTA
      const buttonElement = target.closest('button, [role="button"]');
      if (buttonElement) {
        setCursorVariant('button');

        // Optional subtle magnetic suction toward button center if close
        const rect = buttonElement.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

        if (dist < 48 && rect.width < 220) {
          // Magnetically bias the trailing ring towards button center
          ringX.set(e.clientX * 0.45 + btnCenterX * 0.55);
          ringY.set(e.clientY * 0.45 + btnCenterY * 0.55);
        }
        return;
      }

      // 4. Check for Links & interactive clickable items
      if (target.closest('a, [data-cursor="link"], .cursor-pointer')) {
        setCursorVariant('link');
        return;
      }

      // Default state
      setCursorVariant('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsPointerInside(false);
    const handleMouseEnter = () => setIsPointerInside(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkFinePointer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isPointerInside, mouseX, mouseY, ringX, ringY]);

  // Don't render on mobile or touch-first devices
  if (isTouchDevice) return null;

  // Ring dimension and appearance styling based on active variant
  const getRingDimensions = () => {
    switch (cursorVariant) {
      case 'card':
        return { size: 68, scale: 1 };
      case 'button':
        return { size: 48, scale: 1.15 };
      case 'link':
        return { size: 40, scale: 1.1 };
      case 'input':
        return { size: 24, scale: 0.85 };
      case 'default':
      default:
        return { size: 32, scale: 1 };
    }
  };

  const { size, scale } = getRingDimensions();
  const clickScale = isClicking ? 0.8 : 1;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      <AnimatePresence>
        {isPointerInside && (
          <>
            {/* 1. Precision Central Dot */}
            <motion.div
              className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none transition-colors duration-200"
              style={{
                x: dotX,
                y: dotY,
                backgroundColor:
                  cursorVariant === 'card'
                    ? '#E5C378'
                    : cursorVariant === 'button'
                    ? '#C5A059'
                    : '#FAF8F5',
                boxShadow:
                  cursorVariant === 'card' || cursorVariant === 'button'
                    ? '0 0 6px rgba(197, 160, 89, 0.8)'
                    : '0 0 4px rgba(20, 46, 35, 0.4)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: cursorVariant === 'card' ? 0.6 : isClicking ? 1.4 : 1,
                opacity: 1,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />

            {/* 2. Magnetic Aura Ring */}
            <motion.div
              className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transition-colors duration-300 ${
                cursorVariant === 'card'
                  ? 'border border-[#C5A059]/80 bg-[#0E2018]/60 backdrop-blur-xs shadow-[0_0_16px_rgba(197,160,89,0.25)]'
                  : cursorVariant === 'button'
                  ? 'border border-[#C5A059] bg-[#C5A059]/15 backdrop-blur-2xs shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                  : cursorVariant === 'link'
                  ? 'border border-[#C5A059]/60 bg-[#C5A059]/10'
                  : cursorVariant === 'input'
                  ? 'border border-white/40 bg-white/5'
                  : 'border border-[#C5A059]/40 bg-transparent'
              }`}
              style={{
                x: ringX,
                y: ringY,
                width: size,
                height: size,
                marginLeft: -(size / 2),
                marginTop: -(size / 2),
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: scale * clickScale,
                opacity: 1,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { type: 'spring', stiffness: 350, damping: 25 },
                opacity: { duration: 0.2 },
              }}
            >
              {/* Optional editorial micro-label when hovering cards */}
              {cursorVariant === 'card' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-1 text-[9px] font-mono font-medium tracking-widest text-[#E5C378]"
                >
                  <span>{cardBadgeText}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-[#E5C378]" />
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
