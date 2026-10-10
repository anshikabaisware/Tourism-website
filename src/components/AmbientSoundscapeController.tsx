import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Wind, Trees, Waves, Bell, Disc3, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type SoundThemeId = 'alps' | 'bali' | 'kyoto' | 'aegean';

interface SoundTheme {
  id: SoundThemeId;
  name: string;
  tagline: string;
  description: string;
  region: string;
  icon: React.ComponentType<{ className?: string }>;
  toneColor: string;
}

const SOUND_THEMES: SoundTheme[] = [
  {
    id: 'alps',
    name: 'Swiss Alps Breeze',
    tagline: 'Glacial Stillness & Whispering Valais Pines',
    description: 'High-altitude sub-alpine wind currents through Zermatt glacial passes with gentle harmonic breeze overtones.',
    region: 'Valais, Switzerland',
    icon: Wind,
    toneColor: '#A5C4D4',
  },
  {
    id: 'bali',
    name: 'Bali Jungle Sanctuary',
    tagline: 'Rain Canopy & Bamboo Grove Rustle',
    description: 'Warm tropical rain falling on broad leaves, distant rainforest river flow, and gentle bamboo resonance.',
    region: 'Ubud & Sayan Valley',
    icon: Trees,
    toneColor: '#68B087',
  },
  {
    id: 'kyoto',
    name: 'Kyoto Zen Garden',
    tagline: 'Stone Basin Stream & Meditative Chimes',
    description: 'A tranquil trickle of mountain water over smooth river stones punctuated by periodic peaceful meditation bells.',
    region: 'Arashiyama, Kyoto',
    icon: Bell,
    toneColor: '#C5A059',
  },
  {
    id: 'aegean',
    name: 'Aegean Caldera Swell',
    tagline: 'Cycladic Tides & Dusk Sea Mist',
    description: 'Rhythmic, soothing Mediterranean coastal swells rolling against volcanic cliff alcoves at dusk.',
    region: 'Oia, Santorini',
    icon: Waves,
    toneColor: '#7AAACE',
  },
];

export const AmbientSoundscapeController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<SoundThemeId>('alps');
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio Context and Node References
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const currentNodesRef = useRef<{
    sourceNodes: (AudioNode | number)[];
    stop: () => void;
  } | null>(null);

  // Periodic chime intervals for Kyoto theme
  const bellTimerRef = useRef<number | null>(null);

  const activeTheme = SOUND_THEMES.find((t) => t.id === activeThemeId) || SOUND_THEMES[0];

  // Initialize Audio Context on demand
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  };

  // Helper to generate a looped noise buffer
  const createNoiseBuffer = (ctx: AudioContext, type: 'pink' | 'brown' | 'white'): AudioBuffer => {
    const bufferSize = ctx.sampleRate * 4; // 4 seconds loop
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;

      if (type === 'pink') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else if (type === 'brown') {
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      } else {
        output[i] = white * 0.12;
      }
    }
    return buffer;
  };

  // Build the acoustic synthesis graph for the active theme
  const startSoundscape = (themeId: SoundThemeId) => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Clear existing synthesis graph
    if (currentNodesRef.current) {
      currentNodesRef.current.stop();
      currentNodesRef.current = null;
    }
    if (bellTimerRef.current) {
      window.clearInterval(bellTimerRef.current);
      bellTimerRef.current = null;
    }

    const themeGain = ctx.createGain();
    themeGain.gain.setValueAtTime(0.001, now);
    themeGain.gain.exponentialRampToValueAtTime(1.0, now + 0.8); // Smooth cross-fade in
    themeGain.connect(masterGainRef.current!);

    const cleanupFns: (() => void)[] = [];

    if (themeId === 'alps') {
      // SWISS ALPS BREEZE: Pink noise with fluctuating resonant bandpass (mountain gusts)
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 'pink');
      noise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(260, now);
      bandpass.Q.setValueAtTime(1.2, now);

      // Slow gust modulation LFO
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, now); // ~8s gust cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(140, now);
      lfo.connect(lfoGain);
      lfoGain.connect(bandpass.frequency);

      // High crystalline wind whistle (pure resonant overtone)
      const highWhistle = ctx.createBiquadFilter();
      highWhistle.type = 'peaking';
      highWhistle.frequency.setValueAtTime(820, now);
      highWhistle.Q.setValueAtTime(4.5, now);
      highWhistle.gain.setValueAtTime(6.0, now);

      noise.connect(bandpass);
      bandpass.connect(highWhistle);
      highWhistle.connect(themeGain);

      noise.start();
      lfo.start();

      cleanupFns.push(() => {
        try {
          noise.stop();
          lfo.stop();
        } catch {
          // Ignore already stopped
        }
      });
    } else if (themeId === 'bali') {
      // BALI JUNGLE: Tropical rain canopy (brown noise) + distant bamboo river
      const rainNoise = ctx.createBufferSource();
      rainNoise.buffer = createNoiseBuffer(ctx, 'brown');
      rainNoise.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(420, now);
      lowpass.Q.setValueAtTime(0.8, now);

      // Subtle water trickle resonance
      const trickle = ctx.createBufferSource();
      trickle.buffer = createNoiseBuffer(ctx, 'pink');
      trickle.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1150, now);
      bandpass.Q.setValueAtTime(3.2, now);

      const trickleGain = ctx.createGain();
      trickleGain.gain.setValueAtTime(0.28, now);

      rainNoise.connect(lowpass);
      lowpass.connect(themeGain);

      trickle.connect(bandpass);
      bandpass.connect(trickleGain);
      trickleGain.connect(themeGain);

      rainNoise.start();
      trickle.start();

      cleanupFns.push(() => {
        try {
          rainNoise.stop();
          trickle.stop();
        } catch {
          // Ignore
        }
      });
    } else if (themeId === 'kyoto') {
      // KYOTO ZEN GARDEN: Gentle flowing stream + intermittent pure singing bowl chime
      const streamNoise = ctx.createBufferSource();
      streamNoise.buffer = createNoiseBuffer(ctx, 'pink');
      streamNoise.loop = true;

      const streamFilter = ctx.createBiquadFilter();
      streamFilter.type = 'bandpass';
      streamFilter.frequency.setValueAtTime(680, now);
      streamFilter.Q.setValueAtTime(2.2, now);

      const streamGain = ctx.createGain();
      streamGain.gain.setValueAtTime(0.35, now);

      streamNoise.connect(streamFilter);
      streamFilter.connect(streamGain);
      streamGain.connect(themeGain);
      streamNoise.start();

      // Function to trigger a warm meditative bell chime
      const triggerZenChime = (freq = 528) => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
        const chimeNow = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const osc2 = audioCtxRef.current.createOscillator();
        const chimeGain = audioCtxRef.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeNow); // 528Hz or harmonious tone

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 1.5, chimeNow); // Fifth harmonic

        chimeGain.gain.setValueAtTime(0.0001, chimeNow);
        chimeGain.gain.exponentialRampToValueAtTime(0.18, chimeNow + 0.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeNow + 4.2);

        osc.connect(chimeGain);
        osc2.connect(chimeGain);
        chimeGain.connect(themeGain);

        osc.start(chimeNow);
        osc2.start(chimeNow);
        osc.stop(chimeNow + 4.5);
        osc2.stop(chimeNow + 4.5);
      };

      // Play initial welcoming bell after 1 second
      const initialTimeout = window.setTimeout(() => triggerZenChime(432), 1000);

      // Periodic singing bowl every 9 seconds
      const intervalId = window.setInterval(() => {
        const chords = [432, 528, 648, 384];
        const nextFreq = chords[Math.floor(Math.random() * chords.length)];
        triggerZenChime(nextFreq);
      }, 8500);

      bellTimerRef.current = intervalId;

      cleanupFns.push(() => {
        window.clearTimeout(initialTimeout);
        window.clearInterval(intervalId);
        try {
          streamNoise.stop();
        } catch {
          // Ignore
        }
      });
    } else if (themeId === 'aegean') {
      // AEGEAN CALDERA: Rhythmic Mediterranean coastal surf swell
      const oceanNoise = ctx.createBufferSource();
      oceanNoise.buffer = createNoiseBuffer(ctx, 'pink');
      oceanNoise.loop = true;

      const oceanFilter = ctx.createBiquadFilter();
      oceanFilter.type = 'lowpass';
      oceanFilter.frequency.setValueAtTime(220, now);
      oceanFilter.Q.setValueAtTime(1.0, now);

      // Surf rhythm swell (0.1Hz ~ 10 seconds per wave)
      const swellLfo = ctx.createOscillator();
      swellLfo.frequency.setValueAtTime(0.09, now);
      const swellLfoGain = ctx.createGain();
      swellLfoGain.gain.setValueAtTime(160, now);
      swellLfo.connect(swellLfoGain);
      swellLfoGain.connect(oceanFilter.frequency);

      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.48, now);

      oceanNoise.connect(oceanFilter);
      oceanFilter.connect(waveGain);
      waveGain.connect(themeGain);

      oceanNoise.start();
      swellLfo.start();

      cleanupFns.push(() => {
        try {
          oceanNoise.stop();
          swellLfo.stop();
        } catch {
          // Ignore
        }
      });
    }

    currentNodesRef.current = {
      sourceNodes: [],
      stop: () => {
        const stopNow = ctx.currentTime;
        themeGain.gain.cancelScheduledValues(stopNow);
        themeGain.gain.setValueAtTime(themeGain.gain.value, stopNow);
        themeGain.gain.exponentialRampToValueAtTime(0.0001, stopNow + 0.4);
        window.setTimeout(() => {
          cleanupFns.forEach((fn) => fn());
          themeGain.disconnect();
        }, 450);
      },
    };
  };

  // Toggle playback
  const handleTogglePlay = () => {
    if (!isPlaying) {
      getAudioContext();
      startSoundscape(activeThemeId);
      setIsPlaying(true);
    } else {
      if (currentNodesRef.current) {
        currentNodesRef.current.stop();
        currentNodesRef.current = null;
      }
      if (bellTimerRef.current) {
        window.clearInterval(bellTimerRef.current);
        bellTimerRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  // Switch sound theme
  const handleSelectTheme = (themeId: SoundThemeId) => {
    setActiveThemeId(themeId);
    if (isPlaying) {
      startSoundscape(themeId);
    }
  };

  // Handle master volume slider
  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (masterGainRef.current && audioCtxRef.current) {
      if (!isMuted) {
        masterGainRef.current.gain.setValueAtTime(newVal, audioCtxRef.current.currentTime);
      }
    }
  };

  // Handle mute toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        nextMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (currentNodesRef.current) {
        currentNodesRef.current.stop();
      }
      if (bellTimerRef.current) {
        window.clearInterval(bellTimerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative rounded-3xl bg-[#091710] border border-[#C5A059]/35 p-6 sm:p-10 mb-20 overflow-hidden shadow-2xl">
      {/* Background atmospheric ambient gradient glows */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: activeTheme.toneColor }}
      />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#173D2C]/40 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header Strip: Tag + Active Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <Disc3 className={`w-5 h-5 ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A059] font-medium">
                  ATMOSPHERIC ACOUSTICS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-wider text-white/50">
                  PROCEDURAL AMBIENCE
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-serif text-white font-normal tracking-tight">
                Sanctuary Soundscapes
              </h4>
            </div>
          </div>

          {/* Sound State & Animated Equalizer Bar */}
          <div className="flex items-center gap-4">
            {isPlaying && (
              <div className="flex items-end gap-1 h-5 px-3 py-1 rounded-full bg-black/40 border border-[#C5A059]/30">
                <motion.div
                  className="w-1 bg-[#C5A059] rounded-full"
                  animate={{ height: ['25%', '100%', '40%', '80%', '30%'] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-1 bg-[#E5C378] rounded-full"
                  animate={{ height: ['60%', '30%', '90%', '40%', '70%'] }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-1 bg-[#C5A059] rounded-full"
                  animate={{ height: ['30%', '85%', '45%', '100%', '50%'] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-1 bg-white rounded-full"
                  animate={{ height: ['80%', '40%', '100%', '30%', '60%'] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                />
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#E5C378] ml-1.5">
                  Live
                </span>
              </div>
            )}

            {/* Primary Play / Pause Pill */}
            <button
              onClick={handleTogglePlay}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                isPlaying
                  ? 'bg-[#C5A059] text-[#08150E] hover:bg-[#D4AF37]'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Soundscape</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Immerse in Audio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle Area: 4 Interactive Theme Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SOUND_THEMES.map((theme) => {
            const isCurrent = activeThemeId === theme.id;
            const Icon = theme.icon;

            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                data-cursor="card"
                data-cursor-label="LISTEN"
                className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#0E281A] border-[#C5A059] shadow-lg shadow-black/40 scale-[1.02]'
                    : 'bg-[#07160E]/80 border-white/10 hover:border-white/25 hover:bg-[#0A1E14]'
                }`}
              >
                {isCurrent && isPlaying && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isCurrent
                          ? 'bg-[#C5A059] text-[#07160E]'
                          : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">
                        {theme.region}
                      </span>
                      <h5 className="text-sm font-serif font-medium text-white group-hover:text-amber-100 transition-colors">
                        {theme.name}
                      </h5>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/70 font-light leading-relaxed mb-4">
                    {theme.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className={isCurrent ? 'text-[#C5A059] font-medium' : 'text-white/40'}>
                    {isCurrent ? (isPlaying ? 'Active Playing' : 'Selected') : 'Click to Tune'}
                  </span>
                  <span className="text-white/30 tracking-widest">
                    0{SOUND_THEMES.indexOf(theme) + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Strip: Currently Playing Info + Volume Slider */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06120B]/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Active Sound Detail */}
          <div className="flex items-center gap-3 text-xs w-full md:w-auto">
            <Radio className={`w-4 h-4 ${isPlaying ? 'text-[#C5A059] animate-pulse' : 'text-white/40'}`} />
            <div>
              <span className="text-white/50 font-mono text-[10px] uppercase tracking-wider block">
                Current Atmosphere
              </span>
              <span className="text-white font-medium font-serif text-sm">
                {activeTheme.name} <span className="text-white/40 font-sans text-xs">({activeTheme.tagline})</span>
              </span>
            </div>
          </div>

          {/* Master Volume Controls */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute soundscape' : 'Mute soundscape'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#C5A059]" />
              )}
            </button>

            {/* Slider */}
            <div className="flex items-center gap-2.5 w-36 sm:w-44">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="Soundscape Volume"
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#C5A059] focus:outline-hidden"
              />
              <span className="text-[10px] font-mono text-white/60 w-8 text-right tabular-nums">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
