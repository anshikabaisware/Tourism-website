import React, { useState } from 'react';
import { TravelPackage } from '../types/travel';
import { X, Clock, Star, Check, CheckCircle2, Shield, Calendar, Users, Send } from 'lucide-react';

interface PackageModalProps {
  travelPackage: TravelPackage | null;
  onClose: () => void;
  onBookingSuccess: (pkgTitle: string) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  travelPackage,
  onClose,
  onBookingSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'reserve'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [partySize, setPartySize] = useState<number>(2);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredSeason, setPreferredSeason] = useState('Summer 2026');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!travelPackage) return null;

  const totalPrice = travelPackage.pricePerPerson * partySize;

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onBookingSuccess(travelPackage.title);
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-pkg-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E4DDD0] z-10 max-h-[92vh] flex flex-col my-auto">
        {/* Header Bar */}
        <div className="relative bg-[#142E23] text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close package modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mb-2">
            <span className="flex items-center gap-1.5 font-medium text-amber-200">
              <Clock className="w-3.5 h-3.5" />
              {travelPackage.duration}
            </span>
            <span aria-hidden="true">·</span>
            <span>{travelPackage.country}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              {travelPackage.rating} ({travelPackage.reviewsCount} reviews)
            </span>
          </div>

          <h2 id="modal-pkg-title" className="text-2xl sm:text-4xl font-serif font-medium tracking-tight mb-2">
            {travelPackage.title}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl line-clamp-2">
            {travelPackage.overview}
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-white text-[#142E23]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Day-by-Day Itinerary ({travelPackage.itinerary.length} Days)
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'inclusions'
                  ? 'bg-white text-[#142E23]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              What is Included
            </button>
            <button
              onClick={() => setActiveTab('reserve')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'reserve'
                  ? 'bg-[#B85D43] text-white shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Reserve Inquiry (${totalPrice.toLocaleString()})
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Day selection list */}
              <div className="md:col-span-4 space-y-2 max-h-[380px] overflow-y-auto pr-2">
                {travelPackage.itinerary.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedDay === item.day
                        ? 'bg-white border-[#142E23] text-[#142E23] shadow-xs font-medium'
                        : 'bg-[#FAF8F5] border-[#E8E2D6] text-[#697A70] hover:bg-white'
                    }`}
                  >
                    <span className="font-serif font-bold text-[#B85D43] block">
                      Day 0{item.day}
                    </span>
                    <span className="truncate block font-medium mt-0.5">
                      {item.title.split(':')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Detailed view of selected day */}
              <div className="md:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DFC8] flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#B85D43] font-semibold mb-2">
                    Day 0{selectedDay} of {travelPackage.itinerary.length}
                  </div>
                  <h3 className="text-2xl font-serif text-[#142E23] font-medium mb-4">
                    {travelPackage.itinerary.find((d) => d.day === selectedDay)?.title}
                  </h3>
                  <p className="text-sm text-[#48574D] font-light leading-relaxed">
                    {travelPackage.itinerary.find((d) => d.day === selectedDay)?.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F2EDE3] flex items-center justify-between text-xs text-[#7B8B80]">
                  <span>Private English-speaking guide included</span>
                  <div className="flex gap-2">
                    <button
                      disabled={selectedDay === 1}
                      onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                      className="px-3 py-1 bg-[#FAF8F5] border border-[#E0D8CA] rounded hover:bg-[#EFEAE1] disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      disabled={selectedDay === travelPackage.itinerary.length}
                      onClick={() => setSelectedDay(Math.min(travelPackage.itinerary.length, selectedDay + 1))}
                      className="px-3 py-1 bg-[#FAF8F5] border border-[#E0D8CA] rounded hover:bg-[#EFEAE1] disabled:opacity-40 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E0D2]">
                <h3 className="text-lg font-serif text-[#142E23] font-semibold mb-4">
                  Everything Included in This Journey
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {travelPackage.included.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#2F3F34] font-medium p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                      <Check className="w-4 h-4 text-[#B85D43] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xs uppercase tracking-widest text-[#7D8C81] font-semibold mb-3">
                  Exclusions & Personal Expenses
                </h4>
                <div className="space-y-2 text-xs text-[#6A786F] font-light">
                  {travelPackage.notIncluded.map((exc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#99A79D]">—</span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#F2EDE3] rounded-xl border border-[#E2DBD0] flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#142E23] shrink-0" />
                <p className="text-xs text-[#526358] font-light">
                  Includes full Wanderly Travel Protection, flexible rescheduling up to 30 days prior, and direct VIP dispatch.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: RESERVE / INQUIRY */}
          {activeTab === 'reserve' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6DFC8]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1B382B] text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#142E23] font-semibold">
                    Inquiry Confirmed
                  </h3>
                  <p className="text-sm text-[#546459] font-light max-w-md mx-auto">
                    Thank you, {clientName || 'fellow traveler'}. Our senior European/Asian travel curator will reach out within 2 hours with an itemized proposal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-serif text-[#142E23] font-semibold mb-1">
                      Request Bespoke Reservation
                    </h3>
                    <p className="text-xs text-[#67776D] font-light">
                      Lock in preferred boutique suite allocations for 48 hours with no deposit required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6A796F] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DAD0] rounded-lg focus:outline-hidden focus:border-[#142E23]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6A796F] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DAD0] rounded-lg focus:outline-hidden focus:border-[#142E23]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6A796F] block mb-1">
                        Number of Travelers
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DAD0] rounded-lg focus:outline-hidden focus:border-[#142E23] cursor-pointer"
                      >
                        <option value={1}>1 Traveler (${travelPackage.pricePerPerson.toLocaleString()})</option>
                        <option value={2}>2 Travelers (${(travelPackage.pricePerPerson * 2).toLocaleString()})</option>
                        <option value={3}>3 Travelers (${(travelPackage.pricePerPerson * 3).toLocaleString()})</option>
                        <option value={4}>4 Travelers (${(travelPackage.pricePerPerson * 4).toLocaleString()})</option>
                        <option value={6}>6 Travelers (${(travelPackage.pricePerPerson * 6).toLocaleString()})</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6A796F] block mb-1">
                        Preferred Departure Season
                      </label>
                      <select
                        value={preferredSeason}
                        onChange={(e) => setPreferredSeason(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DAD0] rounded-lg focus:outline-hidden focus:border-[#142E23] cursor-pointer"
                      >
                        <option value="Spring 2026">Spring 2026</option>
                        <option value="Summer 2026">Summer 2026</option>
                        <option value="Autumn 2026">Autumn 2026</option>
                        <option value="Winter 2026">Winter 2026</option>
                        <option value="Early 2027">Early 2027</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E6E0D2] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#7C8B80] uppercase tracking-wider">Estimated Total ({partySize} Guests)</div>
                      <div className="text-xl font-serif font-bold text-[#142E23] tabular-nums">
                        ${totalPrice.toLocaleString()} USD
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#B85D43] hover:bg-[#A34E36] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 bg-[#FAF8F5] border-t border-[#E8E1D3] flex items-center justify-between text-xs shrink-0">
          <div className="text-[#64746A]">
            Questions? Call directly at <span className="font-semibold text-[#142E23]">+44 (0) 20 7946 0912</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-transparent hover:bg-[#EFEAE0] text-[#142E23] rounded transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
