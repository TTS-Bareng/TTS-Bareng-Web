import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { useToast } from './Toast';

const NAV_LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Mode Mabar', href: '#fitur' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const { showToast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadClick = () => {
    showToast(
      'Aplikasi Segera Hadir',
      'Versi iOS & Android sedang dalam tahap finalisasi. Pre-registrasi sekarang untuk akses lebih awal!'
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'liquid-glass shadow-glass border-black/[0.08]'
              : 'bg-white/80 backdrop-blur-md border border-black/[0.05] shadow-pill'
          }`}
        >
          {/* Brand Logo Resmi TTS Bareng */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <img
              src="/logo-dark.webp"
              alt="TTS Bareng Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-surface-950 group-hover:text-brand-600 transition-colors leading-none">
                TTS Bareng
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                Mabar Teka Teki Silang
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-700">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-surface-950 hover:bg-black/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadClick}
              className="relative overflow-hidden px-4 sm:px-5 py-2 rounded-full bg-surface-950 hover:bg-brand-600 text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm flex items-center gap-1.5 active:scale-95 group cursor-pointer"
            >
              <span>Dapatkan App</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-surface-700 hover:bg-black/[0.05] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-sm rounded-2xl liquid-glass p-4 border border-black/[0.08] shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-1 text-sm font-semibold text-surface-800">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl hover:bg-black/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-black/[0.06] mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleDownloadClick();
                  }}
                  className="w-full py-2.5 rounded-xl bg-surface-950 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Dapatkan Akses Pre-registrasi</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
