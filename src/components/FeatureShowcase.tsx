import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Users,
  Swords,
  Flame,
  Sparkles,
  CheckCircle2,
  Shield,
  Zap,
  Timer,
  Globe,
  RefreshCw,
  Volume2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// 5x5 Mini Crossword Board Definition (100% Valid KBBI Intersecting Words)
// 1 Across: KAWAN (Row 1, Cols 0..4) - Sahabat karib
// 4 Across: TALI  (Row 3, Cols 0..3) - Anyaman pengikat
// 1 Down:   KITA  (Col 0, Rows 1..4) - Aku dan kamu
// 2 Down:   AWAL  (Col 2, Rows 0..3) - Bagian permulaan
// 3 Down:   NUSA  (Col 4, Rows 1..4) - Tanah air kepulauan
interface CrosswordCell {
  r: number;
  c: number;
  char: string;
  num?: number;
  isBlack?: boolean;
  acrossId?: number;
  downId?: number;
}

const BOARD_CELLS: CrosswordCell[] = [
  // Row 0
  { r: 0, c: 0, char: '', isBlack: true },
  { r: 0, c: 1, char: '', isBlack: true },
  { r: 0, c: 2, char: 'A', num: 2, downId: 2 },
  { r: 0, c: 3, char: '', isBlack: true },
  { r: 0, c: 4, char: '', isBlack: true },

  // Row 1: K A W A N (1 Across)
  { r: 1, c: 0, char: 'K', num: 1, acrossId: 1, downId: 1 },
  { r: 1, c: 1, char: 'A', acrossId: 1 },
  { r: 1, c: 2, char: 'W', acrossId: 1, downId: 2 },
  { r: 1, c: 3, char: 'A', acrossId: 1 },
  { r: 1, c: 4, char: 'N', num: 3, acrossId: 1, downId: 3 },

  // Row 2
  { r: 2, c: 0, char: 'I', downId: 1 },
  { r: 2, c: 1, char: '', isBlack: true },
  { r: 2, c: 2, char: 'A', downId: 2 },
  { r: 2, c: 3, char: '', isBlack: true },
  { r: 2, c: 4, char: 'U', downId: 3 },

  // Row 3: T A L I (4 Across) & S (3 Down)
  { r: 3, c: 0, char: 'T', num: 4, acrossId: 4, downId: 1 },
  { r: 3, c: 1, char: 'A', acrossId: 4 },
  { r: 3, c: 2, char: 'L', acrossId: 4, downId: 2 },
  { r: 3, c: 3, char: 'I', acrossId: 4 },
  { r: 3, c: 4, char: 'S', downId: 3 },

  // Row 4
  { r: 4, c: 0, char: 'A', downId: 1 },
  { r: 4, c: 1, char: '', isBlack: true },
  { r: 4, c: 2, char: '', isBlack: true },
  { r: 4, c: 3, char: '', isBlack: true },
  { r: 4, c: 4, char: 'A', downId: 3 },
];

const CLUES = [
  { id: 1, type: 'across', label: '1 Mendatar', clue: 'Sahabat karib atau teman bermain', ans: 'KAWAN' },
  { id: 2, type: 'down', label: '2 Menurun', clue: 'Bagian permulaan dari suatu masa', ans: 'AWAL' },
  { id: 3, type: 'down', label: '3 Menurun', clue: 'Tanah air atau gugusan kepulauan', ans: 'NUSA' },
  { id: 4, type: 'across', label: '4 Mendatar', clue: 'Alat pengikat yang dipilin dari serat', ans: 'TALI' },
];

const REALMS_DATA = [
  {
    name: 'Kuliner',
    desc: 'Cita rasa khas kepulauan',
    badge: '180+ Kata',
    accent: 'bg-amber-500 text-white',
    words: ['RENDANG', 'GUDEG', 'RAWON', 'SOTO', 'PEMPEK'],
  },
  {
    name: 'Satwa',
    desc: 'Fauna endemik Nusantara',
    badge: '140+ Kata',
    accent: 'bg-emerald-600 text-white',
    words: ['KOMODO', 'ANOA', 'MERAK', 'BADAK', 'BEKANTAN'],
  },
  {
    name: 'Bahari',
    desc: 'Kekayaan laut khatulistiwa',
    badge: '160+ Kata',
    accent: 'bg-sky-600 text-white',
    words: ['KARANG', 'SELAT', 'PENYU', 'TERUMBU', 'PALUNG'],
  },
  {
    name: 'Sejarah',
    desc: 'Warisan peradaban leluhur',
    badge: '200+ Kata',
    accent: 'bg-rose-600 text-white',
    words: ['CANDI', 'PRASASTI', 'KERATON', 'ARCA', 'MENHIR'],
  },
];

export const FeatureShowcase: React.FC = () => {
  // Papan TTS Mini State
  const [activeWordId, setActiveWordId] = useState<number>(1);
  const [partnerStep, setPartnerStep] = useState<number>(0);
  const [completedWord, setCompletedWord] = useState<boolean>(false);

  // 1v1 Tug of War State
  const [battleScore, setBattleScore] = useState<number>(60);
  const [floatingDamage, setFloatingDamage] = useState<string | null>(null);

  // Daily Rush State
  const [timerSeconds, setTimerSeconds] = useState<number>(87);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // 30 Alam State
  const [selectedRealmIdx, setSelectedRealmIdx] = useState<number>(0);

  // Zen Tactile State
  const [tactileFeedback, setTactileFeedback] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Simulation loop for partner typing on board (Dina typing NUSA on 3 Down)
  useEffect(() => {
    const timer = setInterval(() => {
      setPartnerStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Timer countdown simulation
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev <= 1 ? 90 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleTugWord = () => {
    setBattleScore((prev) => (prev >= 85 ? 50 : prev + 15));
    setFloatingDamage('+1 Kata Direbut! ⚡');
    setTimeout(() => setFloatingDamage(null), 1200);
  };

  const triggerTactile = (msg: string) => {
    setTactileFeedback(msg);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 1200);
    setTimeout(() => setTactileFeedback(null), 1800);
  };

  const handleSolveTogether = () => {
    setCompletedWord(true);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#38BDF8', '#F59E0B', '#10B981'],
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => setCompletedWord(false), 2400);
  };

  return (
    <section id="fitur" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Fitur Permainan Unggulan</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight mb-4"
        >
          Bukan Sekadar TTS Biasa.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed"
        >
          Rasakan sensasi mengisi teka-teki silang real-time bersama teman di satu papan, adu cepat di arena 1v1, dan jelajahi kekayaan kosakata nusantara.
        </motion.p>
      </div>

      {/* APPLE BENTO GRID INTERAKTIF (UNIFIED LIGHT LUXURY THEME) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6"
      >
        {/* =========================================================================
            BENTO 1: MABAR CO-OP DENGAN PREVIEW PAPAN TTS MINI 5x5 ASLI (LIGHT LUX)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-8 rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group text-slate-950 shadow-[0_12px_36px_rgba(0,0,0,0.05)] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/40"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Card 1 */}
          <div className="relative z-10 mb-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/25">
                  <Users className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 leading-none">
                    Mabar Co-op 1 Papan
                  </h3>
                  <span className="text-[11px] font-semibold text-brand-600 mt-1">
                    Tersinkronisasi Realtime &lt;30ms
                  </span>
                </div>
              </div>

              {/* Status Sinyal Live */}
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Kamar TTS-8420 · 2 Pemain</span>
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-slate-600 max-w-xl leading-relaxed font-normal">
              Pecahkan teka-teki bersama pasangan atau sahabat di papan yang sama. Kursor dan huruf tersinkronisasi seketika di layar masing-masing.
            </p>
          </div>

          {/* =========================================================================
              INTERACTIVE MINI CROSSWORD BOARD (5x5 Authentic KBBI Crossword)
             ========================================================================= */}
          <div className="w-full rounded-2xl bg-white/90 border border-slate-200/90 p-4 sm:p-5 shadow-sm backdrop-blur-md relative z-10">
            {/* Live Players Telemetry Bar */}
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-slate-900 font-bold">Kamu (Budi)</span>
                <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                  1 Mendatar
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-slate-900 font-bold">Partner (Dina)</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  Mengetik 3 Menurun...
                </span>
              </div>
            </div>

            {/* Board Grid and Clues in Responsive 2-Col Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* THE 5x5 CROSSWORD GRID */}
              <div className="sm:col-span-6 flex justify-center">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-inner">
                  {BOARD_CELLS.map((cell, idx) => {
                    if (cell.isBlack) {
                      return (
                        <div
                          key={`cell-${idx}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-200/60 border border-slate-200/40 shadow-inner opacity-70"
                        />
                      );
                    }

                    const isHighlighted =
                      (activeWordId === 1 && cell.acrossId === 1) ||
                      (activeWordId === 4 && cell.acrossId === 4) ||
                      (activeWordId === 2 && cell.downId === 2) ||
                      (activeWordId === 3 && cell.downId === 3);

                    // Partner Dina is currently typing on cell (3 Down)
                    const isPartnerActive = cell.downId === 3 && cell.r === partnerStep + 1;
                    // You are active on 1 Across
                    const isYouActive = cell.acrossId === 1 && cell.c === 2;

                    return (
                      <motion.button
                        key={`cell-${idx}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (cell.acrossId) setActiveWordId(cell.acrossId);
                          else if (cell.downId) setActiveWordId(cell.downId);
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl relative flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                          isHighlighted
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30 ring-2 ring-brand-300'
                            : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 shadow-xs'
                        }`}
                      >
                        {/* Clue Number Badge */}
                        {cell.num && (
                          <span
                            className={`absolute top-0.5 left-1 text-[7px] font-bold ${
                              isHighlighted ? 'text-blue-100' : 'text-slate-400'
                            }`}
                          >
                            {cell.num}
                          </span>
                        )}

                        {/* Letter */}
                        <span>{cell.char}</span>

                        {/* Live Partner Cursor (Dina) */}
                        {isPartnerActive && (
                          <motion.div
                            layoutId="partner-cursor"
                            className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-amber-500 text-white text-[7px] font-bold shadow-md z-20 pointer-events-none"
                          >
                            Dina
                          </motion.div>
                        )}

                        {/* Live Your Cursor (Budi) */}
                        {isYouActive && (
                          <div className="absolute inset-0 rounded-xl border-2 border-brand-400 animate-pulse pointer-events-none" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* CLUES & INTERACTION CONTROLS */}
              <div className="sm:col-span-6 flex flex-col gap-2">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                  Petunjuk Kata (Pilih untuk Sorot):
                </span>

                <div className="flex flex-col gap-1.5">
                  {CLUES.map((clue) => {
                    const isSelected = activeWordId === clue.id;
                    return (
                      <button
                        key={clue.id}
                        onClick={() => setActiveWordId(clue.id)}
                        className={`p-2.5 rounded-xl text-left transition-all duration-200 border text-xs cursor-pointer flex flex-col gap-0.5 ${
                          isSelected
                            ? 'bg-brand-50 border-brand-400 text-brand-950 shadow-xs'
                            : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-[11px] text-brand-700">
                            {clue.label}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white text-slate-600 font-bold border border-slate-200">
                            {clue.ans.length} Huruf
                          </span>
                        </div>
                        <span className="font-medium text-[11px] leading-snug line-clamp-1">
                          {clue.clue}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Action Feedback */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-500">
                    Ketik live bersama partner
                  </span>
                  <button
                    onClick={handleSolveTogether}
                    className="text-[10.5px] font-bold px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Pecahkan Bersama ✨</span>
                  </button>
                </div>

                {completedWord && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl text-center border border-emerald-200 shadow-xs"
                  >
                    🎉 Keren! 1 Mendatar terpecahkan bersama!
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            BENTO 2: 1V1 TUG-OF-WAR ARENA (DYNAMIC VERSUS DUEL WITH REAL ROPE)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-4 rounded-[2.25rem] p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.05)] text-slate-950 border border-rose-200/80 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/30 min-h-[380px]"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* 3D Mascot Champion */}
          <img
            src="/maskot/Fierce Plush Crossword Champion.webp"
            alt="Mascot Champion 1v1 Arena"
            className="absolute top-2 -right-1 w-28 sm:w-32 h-auto object-contain filter drop-shadow-md pointer-events-none select-none z-0"
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-md shadow-rose-500/25">
              <Swords className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 mb-1.5 max-w-[65%] leading-tight">
              1v1 Tug-of-War Arena
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 mb-2 leading-relaxed font-normal max-w-[70%]">
              Adu cepat mengisi petak huruf. Siapa paling gesit memecahkan kata akan menarik tali skor dan merebut kemenangan.
            </p>
          </div>

          {/* MIDDLE CLASH SHOWCASE: Petak Lema Rebutan Live (Mengisi Void Tengah) */}
          <div className="relative z-10 my-2.5 p-3 rounded-2xl bg-white/90 border border-rose-200/90 shadow-xs backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-black text-rose-800 uppercase tracking-wider">
                  Duel Lema Rebutan Live
                </span>
              </div>
              <span className="text-[9.5px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                KBBI #142
              </span>
            </div>

            {/* Live Battling Letter Tiles — G - E - S - I - T */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { letter: 'G', owner: 'you' },
                { letter: 'E', owner: 'you' },
                { letter: 'S', owner: 'you' },
                { letter: 'I', owner: 'rival' },
                { letter: 'T', owner: 'rival' },
              ].map((tile, i) => (
                <div
                  key={i}
                  className={`h-9 sm:h-9.5 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm border transition-all ${
                    tile.owner === 'you'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/20'
                      : 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  }`}
                >
                  <span>{tile.letter}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-blue-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Kamu mengunci 3 huruf
              </span>
              <span className="text-rose-600 flex items-center gap-1">
                Lawan mengejar 2 huruf
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
            </div>
          </div>

          {/* Interactive Tug-of-War Visual Rope & Arena Simulator */}
          <div className="w-full rounded-2xl bg-white/95 border border-rose-200/90 p-4 shadow-sm backdrop-blur-md relative z-10">
            {/* Skor Head-to-Head */}
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-blue-700 font-extrabold">Kamu ({battleScore}%)</span>
              <span className="text-[10px] uppercase tracking-wider text-rose-700 font-black px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                TARIK TALI
              </span>
              <span className="text-rose-700 font-extrabold">Lawan ({100 - battleScore}%)</span>
            </div>

            {/* Visual Dynamic Rope & Tug Knot */}
            <div className="relative w-full py-2 my-1 flex items-center">
              {/* Background Rope Line */}
              <div className="w-full h-2 rounded-full bg-amber-950/15 relative overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                  style={{ width: `${battleScore}%` }}
                />
              </div>

              {/* Dynamic Tug Knot Icon (Simpul Tali) */}
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-white border-2 border-amber-600 shadow-md flex items-center justify-center -translate-x-1/2 cursor-pointer"
                style={{ left: `${battleScore}%` }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mt-1">
              <span>7 Kata Rebutan</span>
              <span>4 Kata Rebutan</span>
            </div>

            {/* Simulator Action Button */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10.5px] text-slate-500 font-medium">Uji simulasi adu cepat:</span>
              <button
                onClick={handleTugWord}
                className="text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
                <span>Rebut Kata!</span>
              </button>
            </div>

            {/* Floating Damage Popup */}
            <AnimatePresence>
              {floatingDamage && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg pointer-events-none"
                >
                  {floatingDamage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =========================================================================
            BENTO 3: DAILY RUSH 90 DETIK (AMBER LUXURY)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-6 lg:col-span-4 rounded-[2.25rem] p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.05)] border border-amber-200/80 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50/30 min-h-[340px]"
        >
          {/* Mascot Daily Rush */}
          <img
            src="/maskot/Plush Indonesian Puzzle Kid.webp"
            alt="Mascot Daily Rush"
            className="absolute bottom-0 right-1 w-28 sm:w-32 h-auto object-contain filter drop-shadow-md pointer-events-none select-none z-0"
            style={{ maxHeight: '55%' }}
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-md shadow-amber-500/25">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 mb-1.5 max-w-[65%] leading-tight">
              Daily Rush 90 Detik
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 mb-4 leading-relaxed max-w-[70%] font-normal">
              Tantangan kilat serentak se-Indonesia tiap 00:00 WIB. Dilengkapi efek audio detak jantung audio yang memacu adrenalin.
            </p>
          </div>

          {/* Interactive Live Countdown Flip Widget */}
          <div className="p-3.5 rounded-2xl bg-white/95 border border-amber-200/90 shadow-sm relative z-10 w-[74%]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-950 font-mono tracking-wider">
                    00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                  </div>
                  <div className="text-[9.5px] text-slate-500 font-semibold">Tantangan Harian</div>
                </div>
              </div>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                +50 ★
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Audio Tegang</span>
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                {isTimerRunning ? 'Jeda' : 'Lanjut'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            BENTO 4: 30 ALAM TEMATIK (INTERACTIVE ARCHIPELAGO REALMS)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-6 lg:col-span-4 rounded-[2.25rem] p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.05)] border border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 min-h-[340px]"
        >
          {/* Mascot Explorer */}
          <img
            src="/maskot/Cheerful Plush Puzzle Explorer.webp"
            alt="Mascot Explorer 30 Alam"
            className="absolute bottom-0 right-1 w-28 sm:w-32 h-auto object-contain filter drop-shadow-md pointer-events-none select-none z-0"
            style={{ maxHeight: '55%' }}
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-500/25">
              <Globe className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 mb-1.5 max-w-[65%] leading-tight">
              30 Alam Tematik
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 mb-3.5 leading-relaxed max-w-[70%] font-normal">
              Dari kuliner pasar, satwa langka, dolanan tradisional, hingga astronomi dan sejarah Nusantara.
            </p>
          </div>

          {/* Interactive Realm Selector Tabs */}
          <div className="relative z-10 w-[74%]">
            <div className="flex flex-wrap gap-1 mb-2">
              {REALMS_DATA.map((realm, idx) => (
                <button
                  key={realm.name}
                  onClick={() => setSelectedRealmIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    selectedRealmIdx === idx
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {realm.name}
                </button>
              ))}
            </div>

            {/* Postcard preview kata-kata tematik nusantara */}
            <div className="p-2.5 rounded-xl bg-white/95 border border-emerald-200/90 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-emerald-800">
                  {REALMS_DATA[selectedRealmIdx].name} ({REALMS_DATA[selectedRealmIdx].badge})
                </span>
                <span className="text-[9px] text-slate-500">
                  {REALMS_DATA[selectedRealmIdx].desc}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {REALMS_DATA[selectedRealmIdx].words.map((w) => (
                  <span
                    key={w}
                    className="px-1.5 py-0.5 rounded bg-emerald-50 text-[9.5px] font-bold text-emerald-900 border border-emerald-200"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            BENTO 5: ZEN TACTILE LUXURY (HAPTIC STUDIO & CLEAN AD-FREE)
           ========================================================================= */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-12 lg:col-span-4 rounded-[2.25rem] p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.05)] border border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/40 to-slate-50 min-h-[340px]"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/25">
              <Shield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 mb-1.5 leading-tight">
              Zen Tactile Luxury
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 mb-4 leading-relaxed font-normal">
              Nol iklan interstitial yang tiba-tiba mengganggu konsentrasi. Suara ketukan keyboard alami dan animasi pegas lembut.
            </p>
          </div>

          {/* Interactive Haptic Studio Station */}
          <div className="flex flex-col gap-2 relative z-10">
            {/* Keyboard Click Audio Tester */}
            <button
              onClick={() => triggerTactile('🔊 Tuts Keyboard: Renyah & Alami')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs active:scale-95 transition-all cursor-pointer text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Suara Ketik Keyboard iOS</span>
                  <span className="text-[9.5px] text-slate-500">Akustik mekanikal renyah</span>
                </div>
              </div>

              {/* Animated Soundwave Equalizer */}
              <div className="flex items-center gap-0.5 h-4 px-2">
                {[40, 80, 60, 100, 50].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={isPlayingAudio ? { height: ['20%', `${h}%`, '20%'] } : { height: '30%' }}
                    transition={{ duration: 0.35, repeat: isPlayingAudio ? Infinity : 0, delay: i * 0.05 }}
                    className="w-1 bg-indigo-600 rounded-full"
                  />
                ))}
              </div>
            </button>

            {/* Spring Animation Physics Tester */}
            <button
              onClick={() => triggerTactile('⚡ Animasi Spring: Fisika Alami 60fps')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs active:scale-95 transition-all cursor-pointer text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Animasi Pegas Fisik</span>
                  <span className="text-[9.5px] text-slate-500">Transisi lembut tanpa lag</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                Uji Coba
              </span>
            </button>

            {/* 100% Ad-Free Guarantee */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Bebas Iklan Pop-up &amp; Video Paksa</span>
            </div>

            {tactileFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10.5px] font-bold text-indigo-700 bg-indigo-50 p-2 rounded-xl text-center border border-indigo-200 shadow-xs"
              >
                {tactileFeedback}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
