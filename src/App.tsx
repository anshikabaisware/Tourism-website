import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ExpeditionTimelineSection } from './components/ExpeditionTimelineSection';
import { PackagesSection } from './components/PackagesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { PackageModal } from './components/PackageModal';
import { TripPlannerModal } from './components/TripPlannerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MorphTransitionOverlay } from './components/MorphTransitionOverlay';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';

import { FEATURED_DESTINATIONS, POPULAR_PACKAGES } from './data/travelData';
import { Destination, TravelPackage, SearchQuery } from './types/travel';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  // Modal states
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [plannerDestinationPreload, setPlannerDestinationPreload] = useState<string>('');

  // Hero-to-Destination Morph Transition State
  const [morphingDestination, setMorphingDestination] = useState<Destination | null>(null);
  const [isMorphingHero, setIsMorphingHero] = useState<boolean>(false);

  // Wishlist state (saved destination or package IDs)
  const [wishlistIds, setWishlistIds] = useState<string[]>(['bali', 'pkg-swiss-grandeur']);

  // Active search query filter state
  const [searchDestinationFilter, setSearchDestinationFilter] = useState<string>('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle wishlist item
  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from your saved collection');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Added to your saved collection');
        return [...prev, id];
      }
    });
  };

  // Handle hero search
  const handleHeroSearch = (query: SearchQuery) => {
    if (query.destination) {
      setSearchDestinationFilter(query.destination);
      showToast(`Filtered journeys for ${query.destination.toUpperCase()}`);
    } else {
      setSearchDestinationFilter('');
      showToast(`Showing all luxury packages for ${query.dates}`);
    }

    // Scroll smoothly to packages
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPlannerForDestination = (destName: string) => {
    setPlannerDestinationPreload(destName);
    setIsTripPlannerOpen(true);
  };

  const handleViewPackagesForDestination = (destId: string) => {
    setSearchDestinationFilter(destId);
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2621] selection:bg-[#B85D43]/20 selection:text-[#142E23] flex flex-col font-sans">
      {/* Custom Non-Intrusive Magnetic Cursor */}
      <CustomCursor />

      {/* Editorial Scroll Progress Indicator (Framer Motion) */}
      <ScrollProgressBar />

      {/* 1. Navbar */}
      <Navbar
        onOpenTripPlanner={() => {
          setPlannerDestinationPreload('');
          setIsTripPlannerOpen(true);
        }}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenTripPlanner={() => {
            setPlannerDestinationPreload('');
            setIsTripPlannerOpen(true);
          }}
          onExploreDestinations={(destId) => {
            const target =
              FEATURED_DESTINATIONS.find((d) => d.id === destId) ||
              FEATURED_DESTINATIONS.find((d) => d.id === 'switzerland') ||
              FEATURED_DESTINATIONS[0];
            setMorphingDestination(target);
            setIsMorphingHero(true);
          }}
          onSelectDestinationById={(id) => {
            const found = FEATURED_DESTINATIONS.find((d) => d.id === id);
            if (found) {
              setSelectedDestination(found);
            }
          }}
        />

        {/* 3. Featured Destinations */}
        <DestinationsSection
          destinations={FEATURED_DESTINATIONS}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 4. Signature Experiences */}
        <ExperiencesSection
          onOpenTripPlanner={() => {
            setPlannerDestinationPreload('');
            setIsTripPlannerOpen(true);
          }}
        />

        {/* 5. Why Choose Us */}
        <WhyChooseUsSection />

        {/* 5.5 Bespoke Expedition Timeline */}
        <ExpeditionTimelineSection
          onOpenTripPlanner={() => {
            setPlannerDestinationPreload('');
            setIsTripPlannerOpen(true);
          }}
        />

        {/* 6. Popular Packages */}
        <PackagesSection
          packages={POPULAR_PACKAGES}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchFilterDestination={searchDestinationFilter}
          onClearSearchFilter={() => setSearchDestinationFilter('')}
        />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. Final CTA Banner */}
        <CtaBanner
          onOpenTripPlanner={() => {
            setPlannerDestinationPreload('');
            setIsTripPlannerOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTripTo={handleOpenPlannerForDestination}
        onViewPackagesFor={handleViewPackagesForDestination}
      />

      <PackageModal
        travelPackage={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookingSuccess={(title) => {
          showToast(`Inquiry received for ${title}. Concierge will reach out shortly.`);
        }}
      />

      <TripPlannerModal
        isOpen={isTripPlannerOpen}
        onClose={() => setIsTripPlannerOpen(false)}
        initialDestination={plannerDestinationPreload}
        onPlanComplete={(summary) => {
          showToast(`Thank you! ${summary} has been dispatched to our curators.`);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        destinations={FEATURED_DESTINATIONS}
        packages={POPULAR_PACKAGES}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onSelectPackage={(pkg) => setSelectedPackage(pkg)}
        onPlanTrip={() => {
          setIsWishlistOpen(false);
          setIsTripPlannerOpen(true);
        }}
      />

      {/* Hero-to-Destination Morph Transition Layer */}
      <MorphTransitionOverlay
        isMorphing={isMorphingHero}
        destination={morphingDestination}
        onComplete={() => setIsMorphingHero(false)}
      />

      {/* Floating Interactive Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#142E23] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 text-xs font-medium animate-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
