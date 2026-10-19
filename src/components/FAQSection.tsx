import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Apa perbedaan utama TTS Bareng dibanding aplikasi TTS biasa?',
    answer:
      'Mayoritas aplikasi TTS di pasaran adalah game solo yang dipenuhi iklan pop-up dan bank kata acak. TTS Bareng dibangun dari awal dengan kosakata berpedoman pada Kamus Besar Bahasa Indonesia (KBBI), fitur Mabar Co-op real-time satu papan bersama teman, dan mode kompetitif 1v1 Tug-of-War Arena.',
  },
  {
    question: 'Apakah saya dan teman harus berada di jaringan Wi-Fi yang sama untuk Co-op?',
    answer:
      'Tidak perlu. Berkat Supabase WebSockets Realtime, Anda dan teman bisa bermain meski terpisah kota atau benua. Cukup buat kamar, bagikan link via WhatsApp/Telegram atau tunjukkan QR Code untuk bergabung seketika.',
  },
  {
    question: 'Dari mana sumber kosakata dan petunjuk teka-teki silang?',
    answer:
      'Seluruh kosakata dalam permainan merujuk pada lema Kamus Besar Bahasa Indonesia (KBBI), disusun dengan petunjuk yang edukatif, kaya wawasan Nusantara, dan dirancang agar petak teka-teki saling terhubung rapi tanpa jalan buntu.',
  },
  {
    question: 'Apakah TTS Bareng gratis untuk dimainkan?',
    answer:
      'TTS Bareng 100% gratis dimainkan tanpa sistem energi atau stamina bar yang membatasi sesi bermain Anda. Anda bisa memainkan seluruh 300 level klasik, Mabar Co-op, dan Daily Rush tanpa biaya tersembunyi.',
  },
  {
    question: 'Kapan TTS Bareng resmi tersedia di Google Play & App Store?',
    answer:
      'Saat ini aplikasi sedang dalam tahap pre-registrasi dan pengujian TestFlight iOS serta internal testing Google Play Console. Daftarkan email Anda pada form di bawah untuk mendapatkan akses awal eksklusif saat peluncuran resmi!',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* KOLOM KIRI: Label FAQ & Penjelasan (Sticky di Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-200 border border-black/[0.06] text-surface-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Tanya Jawab</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-surface-950 leading-[1.08] mb-4"
          >
            Pertanyaan yang Sering Diajukan.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-surface-600 font-normal leading-relaxed mb-6"
          >
            Informasi seputar cara bermain mabar, rujukan kosakata KBBI, privasi, dan jadwal ketersediaan aplikasi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden sm:flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/80 border border-black/[0.06] text-xs text-surface-600 shadow-xs backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Punya pertanyaan lain? Kami aktif memperbarui daftar ini.</span>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Daftar Accordion FAQ */}
        <div className="lg:col-span-7 space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={`faq-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white shadow-glass border-black/[0.09]'
                    : 'bg-white/60 hover:bg-white/90 border-black/[0.05]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span
                    className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${
                      isOpen ? 'text-surface-950' : 'text-surface-800 group-hover:text-surface-950'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-surface-950 text-white shadow-xs'
                        : 'bg-surface-100 text-surface-600 group-hover:bg-surface-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-surface-600 leading-relaxed border-t border-black/[0.04] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
