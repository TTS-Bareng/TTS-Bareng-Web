import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Flame, Star } from 'lucide-react';
import { useToast } from './Toast';
import { AppleLogo, GooglePlayLogo } from './StoreIcons';

export const Hero: React.FC = () => {
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth spring-based parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 80, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 22 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleAppleClick = () => {
    showToast(
      'App Store (iOS)',
      'Aplikasi sedang disiapkan untuk Apple App Store & TestFlight. Pre-registrasi sekarang untuk dapat info saat rilis!',
      'apple'
    );
  };

  const handleGoogleClick = () => {
    showToast(
      'Google Play Store (Android)',
      'Build APK & Google Play Console sedang proses verifikasi. Daftarkan email Anda untuk undangan rilis perdana!',
      'google'
    );
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient radial gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-brand-100/40 via-surface-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Kicker Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-ring" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-surface-800">
              Teka-Teki Silang Generasi Baru
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight text-surface-950 uppercase leading-[1.02] sm:leading-[0.98] mb-6"
          >
            <span className="block text-surface-950">Main Bareng,</span>
            <span className="block bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 bg-clip-text text-transparent">
              Menang Bareng.
            </span>
          </motion.h1>

          {/* Subheading — Tanpa overclaim */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-8"
          >
            Game kata Nusantara edukatif dengan ribuan kosakata berpedoman <strong className="text-slate-900 font-semibold">Kamus Besar Bahasa Indonesia (KBBI)</strong>. Pecahkan teka-teki bersama sahabat di satu papan live secara real-time, atau uji ketangkasanmu di arena adu cepat 1v1.
          </motion.p>

          {/* CTA Buttons — Official Apple & Google Play Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12"
          >
            {/* Apple App Store */}
            <button
              onClick={handleAppleClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white transition-all duration-200 active:scale-95 shadow-sm group cursor-pointer"
            >
              <AppleLogo className="w-5 h-5 text-white shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Download di</span>
                <span className="text-sm font-bold tracking-tight">App Store</span>
              </div>
            </button>

            {/* Google Play */}
            <button
              onClick={handleGoogleClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-950 border border-slate-200 transition-all duration-200 active:scale-95 shadow-sm group cursor-pointer"
            >
              <GooglePlayLogo className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-500 font-medium">Temukan di</span>
                <span className="text-sm font-bold tracking-tight text-slate-950">Google Play</span>
              </div>
            </button>

            <a
              href="#fitur"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-black/[0.04] transition-colors"
            >
              <span>Lihat Fitur</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </motion.div>

          {/* Social Proof Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-slate-200 w-full max-w-lg"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                2.600+
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                Rujukan KBBI
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                30 Alam
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                Tema Nusantara
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                <Star className="w-6 h-6 fill-current" />
                <span>Gratis</span>
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                Tanpa Paywall
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Asset with spring parallax */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              rotateY,
              rotateX,
              transformPerspective: 1000,
            }}
            className="relative w-full max-w-md lg:max-w-none flex items-center justify-center group"
          >
            {/* Organic pedestal halo */}
            <div className="absolute inset-[-10%] hero-asset-halo pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-[10%] right-[10%] h-24 bg-gradient-to-t from-surface-200/60 to-transparent blur-2xl -z-10 rounded-full" />

            {/* The 3D WebP */}
            <img
              src="/asset.webp"
              alt="TTS Bareng 3D Plush Emblem Badge"
              className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] h-auto object-contain filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.10)] select-none pointer-events-none"
              loading="eager"
            />

            {/* Floating Badge 1: Mabar Live */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 -left-4 sm:-left-8 liquid-glass px-3.5 py-2 rounded-2xl border border-black/[0.07] shadow-glass flex items-center gap-2.5 backdrop-blur-xl pointer-events-none z-10"
            >
              <div className="relative w-2.5 h-2.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="absolute inset-0 rounded-full bg-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-950">Mabar Live Aktif</span>
                <span className="text-[9.5px] font-semibold text-slate-600">Kamar TTS-8241 · 2 Pemain</span>
              </div>
            </motion.div>

            {/* Floating Badge 2: Daily Rush */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-6 -right-4 sm:-right-6 liquid-glass px-4 py-2.5 rounded-2xl border border-black/[0.07] shadow-glass flex items-center gap-3 backdrop-blur-xl pointer-events-none z-10"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs shrink-0">
                <Flame className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-950">Daily Rush 90s</span>
                <span className="text-[10px] font-semibold text-slate-600">Seed Tiap 00:00 WIB</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
