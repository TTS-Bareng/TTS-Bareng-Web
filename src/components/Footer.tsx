import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useToast } from './Toast';

interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'kbbi') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { showToast } = useToast();

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenLegal) {
      onOpenLegal('privacy');
    } else {
      showToast(
        'Kebijakan Privasi',
        'TTS Bareng menjamin data dan email Anda aman, tidak diperjualbelikan, dan hanya digunakan untuk keperluan akses game.'
      );
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenLegal) {
      onOpenLegal('terms');
    } else {
      showToast(
        'Syarat & Ketentuan',
        'Game ini dapat dimainkan secara cuma-cuma dengan menjunjung sportivitas dan pedoman komunitas yang ramah dan inklusif.'
      );
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-900 pt-14 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Top Glow & Micro Dot Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-28 bg-blue-600/10 blur-3xl pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
        {/* BARIS ATAS: Brand Logo & Interactive System Pod */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-2">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5">
            <img
              src="/logo-dark.webp"
              alt="TTS Bareng Logo"
              className="w-11 h-11 rounded-2xl object-contain shadow-md border border-slate-800 bg-slate-900 p-1"
            />
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-none">
                TTS BARENG
              </span>
              <span className="text-[11px] font-bold tracking-widest text-sky-400 uppercase mt-1">
                Mabar Teka Teki Silang
              </span>
            </div>
          </div>

          {/* Realtime System & Cloud Status Pod */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-300 bg-slate-900/90 border border-slate-800/90 px-4 py-2 rounded-full shadow-inner backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-white">Supabase Cloud Live</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-400 font-medium">KBBI Daring</span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400 font-mono text-[11px]">24ms ID</span>
          </div>
        </div>

        {/* GARIS PEMBATAS HORIZONTAL HALUS */}
        <div className="w-full h-px bg-slate-900" />

        {/* AREA UTAMA FOOTER (Grid Kolom Teks Kontras Tinggi) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Kolom Kiri: Deskripsi Singkat & Credo */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start gap-4">
            <span className="text-sm font-bold text-white tracking-tight uppercase tracking-wider text-xs">
              Tentang TTS Bareng
            </span>
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-sm">
              Game teka-teki silang kolaboratif bernuansa santai dan kompetitif. Dirancang untuk dimainkan bersama sahabat di satu papan secara realtime dengan kosakata berpedoman pada Kamus Besar Bahasa Indonesia (KBBI).
            </p>
            {/* Integrity Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-white">
                Karya Pengembang Lokal
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-white">
                Pedoman KBBI
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 3 Kolom Navigasi Modern */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Kolom 1: Fitur Utama */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Fitur Utama
              </span>
              <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-400 font-medium">
                <a href="#fitur" className="hover:text-white transition-colors">
                  Mabar Co-op 1 Papan
                </a>
                <a href="#fitur" className="hover:text-white transition-colors">
                  1v1 Tug-of-War Arena
                </a>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Daily Rush 90 Detik
                </a>
                <a href="#fitur" className="hover:text-white transition-colors">
                  30 Alam Tematik
                </a>
              </div>
            </div>

            {/* Kolom 2: Eksplorasi */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Eksplorasi
              </span>
              <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-400 font-medium">
                <a href="#hero" className="hover:text-white transition-colors">
                  Kosakata Rujukan KBBI
                </a>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Papan Peringkat Live
                </a>
                <a href="#fitur" className="hover:text-white transition-colors">
                  Studio Haptik &amp; Audio
                </a>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </div>
            </div>

            {/* Kolom 3: Akses & Info */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Akses &amp; Bantuan
              </span>
              <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] text-slate-400 font-medium">
                <a href="#cta" className="hover:text-white transition-colors">
                  Pre-registrasi VIP
                </a>
                <button
                  onClick={handlePrivacyClick}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Kebijakan Privasi
                </button>
                <button
                  onClick={handleTermsClick}
                  className="text-left hover:text-white transition-colors cursor-pointer"
                >
                  Syarat &amp; Ketentuan
                </button>
                <a href="#faq" className="hover:text-white transition-colors">
                  Pusat Bantuan
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT ROW DENGAN TOMBOL KEMBALI KE ATAS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900 text-xs text-slate-500 font-medium">
          <span>&copy; {new Date().getFullYear()} TTS Bareng. Hak cipta dilindungi undang-undang.</span>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Dibuat dengan kecintaan pada Bahasa Indonesia.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TIPOGRAFI MONOLITIK TERPUSAT (BERSIH & TIDAK MENABRAK TEKS APAPUN) */}
        <div
          aria-hidden="true"
          className="pt-6 sm:pt-10 pb-0 text-center select-none pointer-events-none"
        >
          <span className="text-[14vw] sm:text-[11vw] font-black tracking-tighter text-slate-900 uppercase block leading-none">
            TTS BARENG
          </span>
        </div>
      </div>
    </footer>
  );
};

