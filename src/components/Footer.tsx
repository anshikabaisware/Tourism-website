import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A1A12] text-[#F3EFE6] pt-24 pb-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Tier: Wordmark + Newsletter Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-start">
          <div className="lg:col-span-5">
            <a href="#" className="flex items-baseline gap-1.5 mb-5 group">
              <span className="text-4xl font-serif font-medium tracking-tight text-white group-hover:text-amber-100 transition-colors">
                Wanderly
              </span>
              <span className="w-2 h-2 rounded-full bg-[#B4533C]"></span>
            </a>
            <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm mb-8">
              Curated luxury travel editorial and bespoke expeditions. Dedicated to voyagers seeking depth, quiet reverence, and indelible human stories.
            </p>

            <div className="flex items-center gap-4 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                LONDON · ZURICH · KYOTO · TOKYO
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-xs">
            <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-amber-200/90 mb-2">
              DISPATCH ARCHIVE
            </div>
            <h3 className="text-2xl font-serif text-white mb-2 font-normal">
              The Wanderly Letter
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light mb-6 max-w-lg leading-relaxed">
              Receive private monthly dispatches: unlisted high-altitude refuges, seasonal culinary harvests, and priority invitations for strictly limited expeditions.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#143022] border border-[#234D37] rounded-xl flex items-center gap-3 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you. You are now inscribed in our monthly private dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your confidential email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/15 rounded-xl px-5 py-3.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-[#C5A059] transition-colors"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-[#B4533C] hover:bg-[#9B422D] text-white text-xs font-semibold uppercase tracking-[0.15em] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-md active:scale-95"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Quick Nav + Contact Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs">
          <div>
            <div className="font-serif text-base font-normal text-white mb-5 tracking-wide">Sacred Horizons</div>
            <ul className="space-y-3 text-white/60 font-light">
              <li><a href="#destinations" className="hover:text-white transition-colors">Bali & Sayan Highlands</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Swiss Alps & Zermatt</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Kyoto & Historic Gion</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Santorini & Aegean Isles</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Patagonian Glaciers</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-base font-normal text-white mb-5 tracking-wide">Modalities</div>
            <ul className="space-y-3 text-white/60 font-light">
              <li><a href="#experiences" className="hover:text-white transition-colors">Adventure Escapes</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Cultural Journeys</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Luxury Retreats</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Nature Expeditions</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Private Sea Charters</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-base font-normal text-white mb-5 tracking-wide">The Atelier</div>
            <ul className="space-y-3 text-white/60 font-light">
              <li><a href="#why-us" className="hover:text-white transition-colors">Curator Philosophy</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Licensed Docents & Scholars</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Pricing Transparency</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Traveler Chronicles</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Bespoke Inquiry Atelier</a></li>
            </ul>
          </div>

          <div>
            <div className="font-serif text-base font-normal text-white mb-5 tracking-wide">Concierge Desks</div>
            <div className="space-y-3.5 text-white/60 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>42 Berkeley Square, Mayfair, London, UK</span>
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

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <div>
            © {new Date().getFullYear()} Wanderly Expeditions Ltd. Discover Beyond the Ordinary.
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Expedition</a>
            <a href="#" className="hover:text-white transition-colors">Security & Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
