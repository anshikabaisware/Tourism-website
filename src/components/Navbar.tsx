import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenTripPlanner: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTripPlanner,
  wishlistCount,
  onOpenWishlist
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Packages', href: '#packages' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/96 backdrop-blur-md border-b border-[#E6E0D4] shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Strictly adheres to Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Action) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-baseline gap-1 group whitespace-nowrap shrink-0"
          >
            <span className={`text-2xl sm:text-3xl font-serif tracking-tight font-semibold transition-colors ${
              isScrolled ? 'text-[#142E23]' : 'text-white'
            }`}>
              Wanderly
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B85D43]"></span>
          </a>

          {/* Zone 2: 4-5 Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#B85D43] ${
                  isScrolled ? 'text-[#3E4C43]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Wishlist indicator */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {wishlistCount > 0 && (
              <button
                onClick={onOpenWishlist}
                className={`relative p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                  isScrolled ? 'text-[#142E23] hover:bg-[#EFEAE0]' : 'text-white hover:bg-white/10'
                }`}
                title="View Saved Journeys"
                aria-label="View Saved Journeys"
              >
                <Heart className="w-5 h-5 fill-[#B85D43] text-[#B85D43]" />
                <span className="absolute -top-1 -right-1 bg-[#B85D43] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </button>
            )}

            <button
              onClick={onOpenTripPlanner}
              className={`px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-xs whitespace-nowrap shrink-0 active:scale-95 shadow-sm cursor-pointer ${
                isScrolled
                  ? 'bg-[#142E23] text-white hover:bg-[#1D3F30]'
                  : 'bg-[#B85D43] text-white hover:bg-[#A34E36]'
              }`}
            >
              Plan My Trip
            </button>
          </div>

          {/* Mobile Right Controls: Wishlist + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            {wishlistCount > 0 && (
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-[#B85D43] cursor-pointer"
                aria-label="Saved items"
              >
                <Heart className="w-5 h-5 fill-[#B85D43]" />
                <span className="absolute -top-1 -right-1 bg-[#B85D43] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                isScrolled ? 'text-[#142E23]' : 'text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-Down */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E6E0D4] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#142E23] text-base font-serif font-medium py-2 border-b border-[#F0EBE0] hover:text-[#B85D43] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTripPlanner();
                }}
                className="w-full py-3 bg-[#142E23] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#1D3F30] transition-colors text-center cursor-pointer"
              >
                Plan My Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
