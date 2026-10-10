import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  onPlanComplete: (summary: string) => void;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  initialDestination,
  onPlanComplete,
}) => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState(initialDestination || 'Switzerland');
  const [travelStyle, setTravelStyle] = useState('Luxury Retreats');
  const [duration, setDuration] = useState('8 – 10 Days');
  const [partySize, setPartySize] = useState('2 Travellers (Couple)');
  const [budgetTier, setBudgetTier] = useState('$5,000 – $8,000 per person');
  const [specialInterests, setSpecialInterests] = useState<string[]>([
    'Private Culinary Experiences',
    'Scenic Rail & Helicopter Transfers'
  ]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const interestOptions = [
    'Private Culinary Experiences',
    'Scenic Rail & Helicopter Transfers',
    'Exclusive Temple & Museum Access',
    'Holistic Spa & Thermal Onsen',
    'Guided Alpine & Wilderness Treks',
    'Private Catamaran & Yacht Charters',
  ];

  const toggleInterest = (interest: string) => {
    setSpecialInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onPlanComplete(`Trip inquiry for ${destination} (${duration})`);
      setIsSuccess(false);
      setStep(1);
      onClose();
    }, 2400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-planner-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E4DDD0] z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#142E23] text-white p-6 sm:p-8 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close planner"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/90 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Travel Atelier</span>
          </div>

          <h2 id="modal-planner-title" className="text-2xl sm:text-3xl font-serif font-medium tracking-tight">
            Design Your Bespoke Itinerary
          </h2>

          <p className="text-xs sm:text-sm text-white/75 font-light mt-1">
            Step {step} of 3 — Tailoring every detail to your lifestyle and travel pace.
          </p>

          {/* Step indicator bar */}
          <div className="flex items-center gap-2 mt-4">
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-[#B85D43]' : 'bg-white/20'}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#B85D43]' : 'bg-white/20'}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-[#B85D43]' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1B382B] text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-[#142E23] font-semibold">
                Your Journey Blueprint is Initiated
              </h3>
              <p className="text-sm text-[#4E5E52] font-light max-w-md mx-auto">
                Thank you, {clientName || 'fellow traveler'}. Our master curator for {destination} will review your preferences and deliver a custom dossier to {clientEmail} within 24 hours.
              </p>
            </div>
          ) : (
            <div>
              {/* STEP 1: DESTINATION & STYLE */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Where would you like to travel?
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['Switzerland', 'Kyoto & Japan', 'Bali & Indonesia', 'Santorini & Greece', 'Multi-Horizon Grand Tour'].map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => setDestination(dest)}
                          className={`p-3 text-left rounded-xl border text-xs font-serif font-medium transition-all cursor-pointer ${
                            destination === dest
                              ? 'bg-[#142E23] text-white border-[#142E23] shadow-xs'
                              : 'bg-white text-[#142E23] border-[#E5DFD4] hover:border-[#142E23]/40'
                          }`}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Preferred Travel Style
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['Adventure Escapes', 'Cultural Journeys', 'Luxury Retreats', 'Nature Expeditions'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setTravelStyle(style)}
                          className={`p-3 text-left rounded-xl border text-xs font-serif font-medium transition-all cursor-pointer ${
                            travelStyle === style
                              ? 'bg-[#142E23] text-white border-[#142E23] shadow-xs'
                              : 'bg-white text-[#142E23] border-[#E5DFD4] hover:border-[#142E23]/40'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DURATION, TRAVELERS & BUDGET */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Ideal Duration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['5 – 7 Days', '8 – 10 Days', '11 – 14 Days'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDuration(d)}
                          className={`p-3 text-center rounded-xl border text-xs font-serif font-medium transition-all cursor-pointer ${
                            duration === d
                              ? 'bg-[#142E23] text-white border-[#142E23]'
                              : 'bg-white text-[#142E23] border-[#E5DFD4]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Travel Party
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        'Solo Voyager',
                        '2 Travellers (Couple)',
                        'Family with Children',
                        'Private Group / Friends'
                      ].map((party) => (
                        <button
                          key={party}
                          type="button"
                          onClick={() => setPartySize(party)}
                          className={`p-3 text-left rounded-xl border text-xs font-serif font-medium transition-all cursor-pointer ${
                            partySize === party
                              ? 'bg-[#142E23] text-white border-[#142E23]'
                              : 'bg-white text-[#142E23] border-[#E5DFD4]'
                          }`}
                        >
                          {party}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Investment Level (Excluding International Airfare)
                    </label>
                    <select
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(e.target.value)}
                      className="w-full p-3 bg-white border border-[#E5DFD4] rounded-xl text-xs font-medium text-[#142E23] focus:outline-hidden"
                    >
                      <option value="$3,500 – $5,000 per person">$3,500 – $5,000 / person (Refined Luxury)</option>
                      <option value="$5,000 – $8,000 per person">$5,000 – $8,000 / person (Signature Atelier)</option>
                      <option value="$8,000 – $15,000+ per person">$8,000 – $15,000+ / person (Ultra-Private VIP)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: INTERESTS & CONTACT */}
              {step === 3 && (
                <form id="trip-planner-form" onSubmit={handleComplete} className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#5B6C61] block mb-2">
                      Curated Inclusions of Interest
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {interestOptions.map((opt) => {
                        const checked = specialInterests.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleInterest(opt)}
                            className={`p-2.5 text-left rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              checked
                                ? 'bg-[#FAF4ED] border-[#B85D43] text-[#142E23]'
                                : 'bg-white border-[#E6E0D4] text-[#69796F]'
                            }`}
                          >
                            <span className="truncate">{opt}</span>
                            {checked && <Check className="w-3.5 h-3.5 text-[#B85D43] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#68786E] block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Victoria Sinclair"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E4DED3] rounded-lg focus:outline-hidden focus:border-[#142E23]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#68786E] block mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. victoria@atelier.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E4DED3] rounded-lg focus:outline-hidden focus:border-[#142E23]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#68786E] block mb-1">
                      Special Wishes, Dietary or Mobility Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Celebrating 20th wedding anniversary, preference for quiet high-floor suites, interest in local sommelier tastings..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-[#E4DED3] rounded-lg focus:outline-hidden focus:border-[#142E23]"
                    />
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!isSuccess && (
          <div className="p-5 bg-[#FAF8F5] border-t border-[#E8E1D3] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs text-[#5C6D62] hover:text-[#142E23] font-medium cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-[#142E23] hover:bg-[#1D3F30] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="trip-planner-form"
                className="px-6 py-2.5 bg-[#B85D43] hover:bg-[#A34E36] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Submit Journey Blueprint</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
