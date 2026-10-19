import React from 'react';
import { Users, Swords, Flame, BookOpen, Layers, Sparkles, Trophy } from 'lucide-react';

const MARQUEE_ITEMS_FWD = [
  { icon: BookOpen, text: '2.600+ Kosakata Rujukan KBBI', accent: true },
  { icon: Users, text: '1 Papan Live Co-op', accent: false },
  { icon: Swords, text: '1v1 Tug-of-War Arena', accent: true },
  { icon: Layers, text: '30 Alam Tematik Nusantara', accent: false },
  { icon: Flame, text: 'Daily Rush 90 Detik', accent: true },
  { icon: Sparkles, text: 'Koleksi 19 Maskot 3D', accent: false },
  { icon: Trophy, text: '300 Level Asah Otak', accent: false },
];

const MARQUEE_ITEMS_REV = [
  { icon: Flame, text: 'Audio Detak Jantung Menegangkan', accent: false },
  { icon: Users, text: 'Mabar Praktis via Link Kamar', accent: true },
  { icon: BookOpen, text: 'Kosakata Baku & Edukatif', accent: false },
  { icon: Swords, text: 'Adu Cepat Kata Real-time', accent: true },
  { icon: Sparkles, text: '100% Bebas Paywall Stamina', accent: false },
  { icon: Layers, text: 'Dari Kuliner hingga Astronomi', accent: false },
  { icon: Trophy, text: 'Kumpulkan Bintang & Streak Harian', accent: true },
];

function MarqueePill({
  icon: Icon,
  text,
  accent,
}: {
  icon: React.ElementType;
  text: string;
  accent: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 rounded-full shrink-0">
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
          accent ? 'bg-brand-600 text-white' : 'bg-surface-300 text-surface-700'
        }`}
      >
        <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
      <span className="text-xs sm:text-sm font-bold tracking-tight text-surface-900 whitespace-nowrap uppercase">
        {text}
      </span>
      <span className="text-surface-400 font-black text-xs select-none ml-2">✦</span>
    </div>
  );
}

export const MarqueeSection: React.FC = () => {
  return (
    <section className="relative w-full py-5 sm:py-6 overflow-hidden border-y border-black/[0.06] bg-white/60 backdrop-blur-md">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

      {/* Track 1 — left to right (Continuous non-stop marquee) */}
      <div className="flex select-none overflow-hidden mb-2.5">
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 animate-marquee">
          {MARQUEE_ITEMS_FWD.map((item, idx) => (
            <MarqueePill key={`f1-${idx}`} {...item} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 animate-marquee" aria-hidden="true">
          {MARQUEE_ITEMS_FWD.map((item, idx) => (
            <MarqueePill key={`f2-${idx}`} {...item} />
          ))}
        </div>
      </div>

      {/* Track 2 — right to left (Continuous non-stop marquee) */}
      <div className="flex select-none overflow-hidden">
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 animate-marquee-reverse">
          {MARQUEE_ITEMS_REV.map((item, idx) => (
            <MarqueePill key={`r1-${idx}`} {...item} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 animate-marquee-reverse" aria-hidden="true">
          {MARQUEE_ITEMS_REV.map((item, idx) => (
            <MarqueePill key={`r2-${idx}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
