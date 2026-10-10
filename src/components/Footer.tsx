import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { AmbientSoundscapeController } from './AmbientSoundscapeController';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [preferredHorizon, setPreferredHorizon] = useState('All Horizons');
  const [subscribed, setSubscribed] = useState(false);

  const horizons = ['All Horizons', 'Alpine Valais', 'Kyoto Heritage', 'Bali Sanctuaries', 'Aegean Caldera'];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTravelerName('');
    }
  };

  return (
    <footer className="bg-[#07140D] text-[#F3EFE6] pt-16 sm:pt-20 pb-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* 1. Dedicated Sophisticated Minimalist Newsletter Lead Capture Section */}
        <div className="relative mb-20 rounded-3xl bg-[#0B1E14] border border-[#C5A059]/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Golden & Forest Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C5A059]/12 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#1A3D2B]/50 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Editorial Messaging */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-mono font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>PRIVATE EXPEDITION DISPATCHES</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-4.5xl font-serif text-white font-normal tracking-tight leading-[1.08] mb-4">
                Inscribe for the <span className="italic font-light font-serif text-[#E8D6B0]">Wanderly Dossier</span>.
              </h3>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mb-6">
                Receive unreleased private itineraries, rare high-season sanctuary permits, and priority reservations for our strictly capped 2026–2027 bespoke expeditions before public release.
              </p>

              {/* Minimal Trust Markers */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-white/60 font-light pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Strict Discretion</span>
                </div>
                <span className="text-white/20">·</span>
                <div>Quarterly Editorial Only</div>
                <span className="text-white/20">·</span>
                <div>Instant Concierge Priority</div>
              </div>
            </div>

            {/* Right Column: Deep Forest Green Form with Warm Gold Borders */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-8 rounded-2xl bg-[#0E291C] border border-[#C5A059]/50 text-white shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h4 className="text-xl font-serif font-medium text-white mb-2">
                    Inscribed with Reverence
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-4">
                    Your confidential entry has been registered with our Mayfair and Zurich desks. Volume XII of the Private Expeditions Dossier will be dispatched to your personal inbox.
                  </p>
                  <button
                    onClick={() => setSubscribed(false)}
                    className="text-xs text-[#C5A059] underline hover:text-white transition-colors cursor-pointer"
                  >
                    Register another expedition voyager
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="bg-[#07160E]/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#C5A059]/35 shadow-inner space-y-4"
                >
                  {/* Optional Horizon Tag Pills */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/60 mb-2">
                      Primary Area of Interest
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {horizons.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setPreferredHorizon(h)}
                          className={`text-[11px] px-3 py-1 rounded-full transition-all cursor-pointer font-sans ${
                            preferredHorizon === h
                              ? 'bg-[#C5A059] text-[#0A1A12] font-semibold'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                          }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/60 mb-1.5">
                      Voyager Name / Salutation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lady Vivienne or Julian Vance"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full bg-[#05100A] border border-[#C5A059]/50 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-xl px-4 py-3 text-xs text-white placeholder-white/35 focus:outline-hidden transition-all"
                    />
                  </div>

                  {/* Email Input with Distinctive Gold Border & Action */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-medium mb-1.5">
                      Confidential Email Address *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-[#C5A059] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="client@sanctuary.com"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="w-full bg-[#05100A] border-2 border-[#C5A059] focus:border-amber-200 focus:ring-2 focus:ring-[#C5A059]/30 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/35 focus:outline-hidden transition-all shadow-inner"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0A1A12] text-xs font-semibold uppercase tracking-[0.18em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 whitespace-nowrap"
                      >
                        <span>Request Access</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/45 font-light leading-relaxed">
                    By submitting, you consent to receive bespoke expedition itineraries. Communications may be paused at any time via your designated concierge desk.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 1.5 Ambient Soundscape Controller */}
        <AmbientSoundscapeController />

        {/* 2. Top Directory Tier: Wordmark + Global Desks */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <a href="#" className="flex items-baseline gap-1.5 mb-2 group">
              <span className="text-3xl font-serif font-medium tracking-tight text-white group-hover:text-amber-100 transition-colors">
                Wanderly
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4533C]"></span>
            </a>
            <p className="text-xs text-white/60 font-light max-w-md">
              Bespoke travel editorial and curated expeditions for unhurried souls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              LONDON · ZURICH · KYOTO · TOKYO
            </span>
          </div>
        </div>

        {/* 3. Middle Tier: Quick Nav + Concierge Desks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-white/10 text-xs">
          <div>
            <div className="font-serif text-sm font-normal text-[#C5A059] uppercase tracking-wider mb-5">
              Sacred Horizons
            </div>
            <ul className="space-y-3 text-white/65 font-light">
              <li><a href="#destinations" className="hover:text-white transition-colors">Bali & Sayan Valley</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Swiss Alps & Zermatt</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Kyoto Bamboo Groves</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Santorini Caldera</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Patagonian Fjords</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-sm font-normal text-[#C5A059] uppercase tracking-wider mb-5">
              Modalities
            </div>
            <ul className="space-y-3 text-white/65 font-light">
              <li><a href="#experiences" className="hover:text-white transition-colors">Alpine Ridge Adventures</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Heritage Tea Journeys</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Sanctuary Wellness Retreats</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Botanical Expeditions</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Private Sea Charters</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-sm font-normal text-[#C5A059] uppercase tracking-wider mb-5">
              The Atelier
            </div>
            <ul className="space-y-3 text-white/65 font-light">
              <li><a href="#why-us" className="hover:text-white transition-colors">Curator Manifesto</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Resident Scholars & Guides</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Transparent Accounting</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Traveler Chronicles</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Bespoke Inquiry Flow</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-sm font-normal text-[#C5A059] uppercase tracking-wider mb-5">
              Concierge Desks
            </div>
            <div className="space-y-3.5 text-white/65 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>42 Berkeley Square, Mayfair, London</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="tabular-nums font-mono">+44 (0) 20 7946 0912</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>concierge@wanderlytravel.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <div>
            © {new Date().getFullYear()} Wanderly Expeditions Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-white/20">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Expedition</a>
            <span className="text-white/20">·</span>
            <a href="#" className="hover:text-white transition-colors">Security & Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
