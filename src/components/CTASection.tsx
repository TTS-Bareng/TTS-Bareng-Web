import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Users, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from './Toast';
import { AppleLogo, GooglePlayLogo } from './StoreIcons';

export const CTASection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubscribed(true);
    showToast(
      'Pre-Registrasi Berhasil!',
      `Email ${email} resmi terdaftar untuk akses perdana dengan bonus 500 Bintang 🌟`
    );

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#60A5FA', '#93C5FD', '#FFFFFF', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleAppleClick = () => {
    showToast(
      'App Store (iOS)',
      'Aplikasi sedang disiapkan untuk Apple App Store & TestFlight. Pre-registrasi email untuk akses awal!',
      'apple'
    );
  };

  const handleGoogleClick = () => {
    showToast(
      'Google Play Store (Android)',
      'Build APK & Google Play Console sedang proses verifikasi. Daftarkan email Anda untuk undangan rilis!',
      'google'
    );
  };

  return (
    <section id="cta" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto relative">
      {/* 
        OPSI A: THE LAYERED STAGE / APPLE KEYNOTE SHOWCASE
        Panggung Kaca Berlapis (Liquid Mesh Stage) dengan Gradasi Ultramarine Mewah,
        Integrated Glass Input di Sisi Kiri, dan 3D Glass Pedestal Showcase di Sisi Kanan.
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2.5rem] lg:rounded-[3rem] relative overflow-hidden text-white shadow-[0_24px_65px_-12px_rgba(29,78,216,0.38)] px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-12 border border-white/20"
        style={{
          background: 'linear-gradient(135deg, #0F2B6B 0%, #173FB5 35%, #1D4ED8 70%, #2563EB 100%)',
        }}
      >
        {/* Ambient Halo & Studio Spotlight Blooms */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.09] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-[480px] h-[480px] bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-80 h-80 bg-blue-950/50 rounded-full blur-2xl pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"
        />

        {/* 2-PART BALANCED KEYNOTE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
          
          {/* SISI KIRI (lg:col-span-7): CONFIDENT APPLE TYPOGRAPHY & SEAMLESS INTEGRATED GLASS INPUT */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white/95 backdrop-blur-xl shadow-xs transition-colors mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
              <span>Akses Perdana · Mabar 1 Papan Live</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight text-white leading-[1.08] mb-3">
              Main Bareng, <br />
              <span className="bg-gradient-to-r from-blue-100 via-sky-100 to-white bg-clip-text text-transparent">
                Menang Bareng.
              </span>
            </h2>

            {/* Subtitle Ringkas & Berkelas */}
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal max-w-lg mb-6">
              Game teka-teki silang kolaboratif berpedoman pada Kamus Besar Bahasa Indonesia (KBBI). Pecahkan kotak teka-teki bersama teman secara realtime dan dapatkan bonus 500 Bintang saat rilis.
            </p>

            {/* Seamless Integrated Glass Input Bar */}
            <div className="w-full max-w-md">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3.5 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-xl text-white flex items-center gap-3 shadow-lg"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center shrink-0 font-black">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-white text-xs sm:text-sm">Pre-Registrasi Berhasil!</span>
                    <span className="text-[11px] text-blue-100 font-normal">Undangan VIP & 500 Bintang akan dikirim ke email Anda.</span>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="relative flex items-center p-1.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.18)] focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/25 transition-all"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email Anda untuk akses VIP..."
                    className="w-full pl-3.5 sm:pl-4 pr-32 py-2.5 bg-transparent text-xs sm:text-sm text-white placeholder:text-blue-100/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 sm:px-5 rounded-xl bg-white hover:bg-slate-100 text-brand-700 font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>Daftar VIP</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>

            {/* Translucent Store Badges Row */}
            <div className="flex flex-wrap items-center gap-3 pt-5 mt-1 text-xs text-blue-100/80 font-medium">
              <span className="text-xs text-blue-200/90 font-medium">Segera rilis di:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAppleClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md shadow-xs"
                >
                  <AppleLogo className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="font-semibold text-xs tracking-tight">App Store</span>
                </button>
                <button
                  onClick={handleGoogleClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md shadow-xs"
                >
                  <GooglePlayLogo className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-semibold text-xs tracking-tight">Google Play</span>
                </button>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-blue-200/70 ml-1">
                <span className="w-1 h-1 rounded-full bg-blue-300" />
                <span>Gratis Dimainkan</span>
              </div>
            </div>
          </div>

          {/* SISI KANAN (lg:col-span-5): THE LAYERED STAGE & 3D MASKOT SHOWCASE */}
          <div className="lg:col-span-5 flex items-center justify-center relative pt-4 pb-2 lg:py-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none flex items-center justify-center">

              {/* 3D FLOATING HUD CHIP 1: +500 Bintang (Upper Left of Stage) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 left-2 sm:-left-2 z-30 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] shadow-[0_8px_20px_rgba(245,158,11,0.4)] border border-amber-300 flex items-center gap-1.5 -rotate-3 select-none pointer-events-none"
              >
                <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                <span>+500 Bintang VIP</span>
              </motion.div>

              {/* 3D FLOATING HUD CHIP 2: Mabar Live (Upper Right of Stage) */}
              <motion.div
                animate={{ y: [0, -3.5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-1 right-2 sm:-right-2 z-30 px-3 py-1 rounded-full bg-white/95 text-slate-900 font-bold text-[11px] shadow-[0_8px_20px_rgba(0,0,0,0.2)] border border-white/80 backdrop-blur-xl flex items-center gap-1.5 rotate-2 select-none pointer-events-none"
              >
                <div className="w-4 h-4 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-2.5 h-2.5" />
                </div>
                <span>Mabar Live</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </motion.div>

              {/* FLOATING 3D CROSSWORD TILE 1: 'T' (Floating on the left) */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-6, -3, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 -left-3 sm:-left-6 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-slate-900 font-black text-sm sm:text-base flex items-center justify-center shadow-[0_6px_0_#93C5FD,0_12px_22px_rgba(0,0,0,0.22)] border border-slate-100 select-none pointer-events-none"
              >
                <span className="absolute top-0.5 left-1 text-[7px] font-bold text-slate-400 leading-none">1</span>
                <span className="leading-none pt-0.5">T</span>
              </motion.div>

              {/* FLOATING 3D CROSSWORD TILE 2: 'T' (Floating upper center) */}
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [8, 12, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -top-4 right-20 sm:right-28 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center justify-center shadow-[0_5px_0_#93C5FD,0_10px_18px_rgba(0,0,0,0.20)] border border-slate-100 select-none pointer-events-none"
              >
                <span className="absolute top-0.5 left-1 text-[7px] font-bold text-slate-400 leading-none">2</span>
                <span className="leading-none pt-0.5">T</span>
              </motion.div>

              {/* FLOATING 3D CROSSWORD TILE 3: 'S' (Floating on the right) */}
              <motion.div
                animate={{ y: [0, -5.5, 0], rotate: [6, 2, 6] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white text-slate-900 font-black text-sm sm:text-base flex items-center justify-center shadow-[0_6px_0_#93C5FD,0_12px_22px_rgba(0,0,0,0.22)] border border-slate-100 select-none pointer-events-none"
              >
                <span className="absolute top-0.5 left-1 text-[7px] font-bold text-slate-400 leading-none">3</span>
                <span className="leading-none pt-0.5">S</span>
              </motion.div>

              {/* THE 3D GLASS PEDESTAL STAGE (Panggung Kaca Bawah) */}
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[90%] sm:w-[94%] h-12 sm:h-14 rounded-[100%] bg-gradient-to-t from-white/20 via-white/10 to-transparent border border-white/30 backdrop-blur-md shadow-[0_16px_36px_rgba(0,0,0,0.32),inset_0_1px_3px_rgba(255,255,255,0.4)] pointer-events-none z-0" />
              
              {/* Upward Pedestal Spotlight Glow */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-14 bg-sky-300/35 rounded-[100%] blur-xl pointer-events-none z-0" />
              
              {/* Pedestal Ground Drop Shadow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[78%] h-5 bg-blue-950/70 rounded-[100%] blur-md pointer-events-none z-0" />

              {/* 3D Plush Pals Mascot Sitting Proudly on the Stage */}
              <img
                src="/maskot/Plush Indonesian Puzzle Pals.webp"
                alt="TTS Bareng Plush Friends"
                className="relative z-10 max-h-[210px] sm:max-h-[245px] lg:max-h-[265px] w-auto max-w-full object-contain filter drop-shadow-[0_18px_32px_rgba(0,0,0,0.32)] select-none pointer-events-none block transform translate-y-1 sm:translate-y-1.5"
              />
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

