import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Copy, Sparkles, Check } from 'lucide-react';
import { AppleLogo, GooglePlayLogo } from './StoreIcons';

interface CustomCrosswordWebModalProps {
  isOpen: boolean;
  customParam?: string | null;
  tourneyParam?: string | null;
  roomParam?: string | null;
  onClose: () => void;
}

interface DecodedInfo {
  title: string;
  category: string;
  wordCount: number;
}

function decodeCustomPayload(param: string): DecodedInfo | null {
  try {
    let base64 = param.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const data = JSON.parse(json);
    if (!data.t) return null;
    return {
      title: data.t,
      category: data.c || 'Kreasi Komunitas',
      wordCount: Array.isArray(data.w) ? data.w.length : 0,
    };
  } catch {
    return null;
  }
}

export const CustomCrosswordWebModal: React.FC<CustomCrosswordWebModalProps> = ({
  isOpen,
  customParam,
  tourneyParam,
  roomParam,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  // Determine deep link URL and details
  let appUrl = 'ttsbareng://';
  let badgeText = 'UNDANGAN PERMAINAN';
  let titleText = 'Undangan Bermain TTS Bareng';
  let subtitleText = 'Kamu diajak memecahkan teka-teki silang bersama di aplikasi TTS Bareng!';
  let statsText = '';

  if (customParam) {
    appUrl = `ttsbareng://?custom=${encodeURIComponent(customParam)}`;
    badgeText = 'UNDANGAN TTS KUSTOM';
    const decoded = decodeCustomPayload(customParam);
    if (decoded) {
      titleText = decoded.title;
      statsText = `${decoded.wordCount} Kata Tersusun • Kategori: ${decoded.category}`;
      subtitleText = `Temanmu telah merancang teka-teki silang khusus bertema "${decoded.category}". Buka aplikasi untuk memecahkannya sekarang!`;
    }
  } else if (tourneyParam) {
    appUrl = `ttsbareng://?tourney=${encodeURIComponent(tourneyParam)}`;
    badgeText = 'UNDANGAN TURNAMEN';
    titleText = `Turnamen #${tourneyParam.toUpperCase()}`;
    subtitleText = 'Kamu diajak bertanding dalam kejuaraan sistem gugur di TTS Bareng!';
  } else if (roomParam) {
    appUrl = `ttsbareng://?room=${encodeURIComponent(roomParam)}`;
    badgeText = 'UNDANGAN MABAR';
    titleText = `Kamar Mabar #${roomParam.toUpperCase()}`;
    subtitleText = 'Kamu diajak bermain satu papan berdua secara real-time di TTS Bareng!';
  }

  // Attempt automatic app launch on mobile
  useEffect(() => {
    if (isOpen) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Small delay to let modal render first
        const timer = setTimeout(() => {
          try {
            window.location.href = appUrl;
          } catch {
            // ignore
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, appUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-[390px] bg-slate-900 text-slate-100 rounded-[32px] border border-slate-800 shadow-2xl z-10 flex flex-col p-6 text-center overflow-hidden"
        >
          {/* Specular sheen glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />
          <div className="absolute -top-20 inset-x-0 flex justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full bg-amber-500/15 blur-3xl" />
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700/60"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Badge */}
          <div className="flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badgeText}</span>
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-black tracking-tight text-white leading-tight px-2">
            {titleText}
          </h2>

          {/* Stats pill if custom TTS */}
          {statsText && (
            <div className="mt-2 inline-flex items-center self-center px-3 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-bold text-amber-300">
              {statsText}
            </div>
          )}

          {/* Subtitle */}
          <p className="text-[12.5px] text-slate-300 mt-3 font-normal leading-relaxed px-1">
            {subtitleText}
          </p>

          {/* Action 1: Open in App (Primary CTA) */}
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={appUrl}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-98 text-slate-950 font-black text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Buka di Aplikasi TTS Bareng</span>
            </a>

            <div className="text-[11px] text-slate-400 leading-snug">
              Ketuk tombol di atas jika aplikasi sudah terpasang di HP Anda.
            </div>

            {/* Separator */}
            <div className="flex items-center gap-2 my-1">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">
                ATAU UNDUH APLIKASI
              </span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            {/* Download Row */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-[11px] flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <AppleLogo className="w-4 h-4 fill-current" />
                <span>App Store</span>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-bold text-[11px] flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <GooglePlayLogo className="w-4 h-4" />
                <span>Google Play</span>
              </a>
            </div>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-[11.5px] flex items-center justify-center gap-2 border border-slate-700/60 transition-all cursor-pointer mt-0.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Tautan Disalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Tautan Undangan</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
