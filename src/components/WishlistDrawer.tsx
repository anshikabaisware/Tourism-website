import React from 'react';
import { Destination, TravelPackage } from '../types/travel';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  destinations: Destination[];
  packages: TravelPackage[];
  onRemoveFromWishlist: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TravelPackage) => void;
  onPlanTrip: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  destinations,
  packages,
  onRemoveFromWishlist,
  onSelectDestination,
  onSelectPackage,
  onPlanTrip,
}) => {
  if (!isOpen) return null;

  const savedDestinations = destinations.filter((d) => wishlistIds.includes(d.id));
  const savedPackages = packages.filter((p) => wishlistIds.includes(p.id));
  const totalCount = savedDestinations.length + savedPackages.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-wishlist-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl border-l border-[#E6DFC8] z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 bg-[#142E23] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#B85D43] text-[#B85D43]" />
            <h2 id="drawer-wishlist-title" className="text-xl font-serif font-medium">
              Saved Journeys ({totalCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            aria-label="Close saved items"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {totalCount === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-10 h-10 text-[#C9BFB0] mx-auto" />
              <h3 className="text-lg font-serif text-[#142E23]">No saved journeys yet</h3>
              <p className="text-xs text-[#7B8B80] font-light max-w-xs mx-auto">
                Tap the heart icon on any destination card or travel package to curate your private travel collection.
              </p>
            </div>
          ) : (
            <>
              {savedDestinations.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#7C8C80] font-semibold mb-3">
                    Saved Destinations ({savedDestinations.length})
                  </h3>
                  <div className="space-y-3">
                    {savedDestinations.map((dest) => (
                      <div
                        key={dest.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8E2D6] shadow-xs"
                      >
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-14 h-14 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-serif font-medium text-[#142E23] truncate">
                            {dest.name}
                          </h4>
                          <span className="text-xs text-[#7A8A7E] block truncate font-light">
                            From {dest.currency}{dest.startingPrice.toLocaleString()} / person
                          </span>
                          <button
                            onClick={() => {
                              onSelectDestination(dest);
                              onClose();
                            }}
                            className="text-[11px] text-[#B85D43] hover:underline font-semibold mt-1 cursor-pointer"
                          >
                            Explore Destination →
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(dest.id)}
                          className="p-2 text-[#9EAFA3] hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {savedPackages.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-[#7C8C80] font-semibold mb-3">
                    Saved Packages ({savedPackages.length})
                  </h3>
                  <div className="space-y-3">
                    {savedPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8E2D6] shadow-xs"
                      >
                        <img
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          className="w-14 h-14 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-serif font-medium text-[#142E23] truncate">
                            {pkg.title}
                          </h4>
                          <span className="text-xs text-[#7A8A7E] block truncate font-light">
                            {pkg.duration} · ${pkg.pricePerPerson.toLocaleString()}
                          </span>
                          <button
                            onClick={() => {
                              onSelectPackage(pkg);
                              onClose();
                            }}
                            className="text-[11px] text-[#B85D43] hover:underline font-semibold mt-1 cursor-pointer"
                          >
                            View Details →
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(pkg.id)}
                          className="p-2 text-[#9EAFA3] hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Remove package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {totalCount > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E2D6] shrink-0">
            <button
              onClick={() => {
                onClose();
                onPlanTrip();
              }}
              className="w-full py-3.5 bg-[#142E23] hover:bg-[#1D3F30] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Build Itinerary From Saved ({totalCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
