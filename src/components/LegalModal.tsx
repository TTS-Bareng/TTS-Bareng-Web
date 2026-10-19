import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Scale, BookOpen, CheckCircle2, Lock, Mail } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'kbbi';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Keep hash in sync when modal opens/changes tab
  useEffect(() => {
    if (isOpen) {
      window.location.hash = activeTab;
    }
  }, [isOpen, activeTab]);

  const handleClose = () => {
    // Clean hash on close without jumping
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 text-slate-200 rounded-[28px] border border-slate-800 shadow-2xl z-10 flex flex-col overflow-hidden"
        >
          {/* Top Specular Accent Sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-800/80 shrink-0">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block mb-0.5">
                Kepatuhan & Transparansi Apple App Store
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Pusat Legal & Kebijakan TTS Bareng
              </h2>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Tutup"
              className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700/60"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* 3-Segment Tab Bar */}
          <div className="px-6 pt-3 pb-1 shrink-0">
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Kebijakan Privasi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('terms')}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'terms'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Ketentuan Layanan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('kbbi')}
                className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'kbbi'
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Atribusi KBBI</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 text-xs sm:text-[13px] leading-relaxed text-slate-300 flex flex-col gap-4 select-text">
            {activeTab === 'privacy' && (
              <div className="flex flex-col gap-3.5">
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-sky-200">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lock className="w-4 h-4 text-sky-400 shrink-0" />
                    <h3 className="text-sm font-black text-white">
                      Kebijakan Privasi Pengguna (Privacy Policy)
                    </h3>
                  </div>
                  <p className="text-xs text-sky-200/90 leading-relaxed">
                    Terakhir diperbarui: 19 Oktober 2026. TTS Bareng beroperasi dengan prinsip <strong>Privacy-First &amp; Local-First</strong> yang mengutamakan keamanan data pengguna dan memenuhi sepenuhnya pedoman privasi <strong>Apple App Store Guideline 5.1.1</strong>.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      1. Penyimpanan Data Lokal (On-Device Local Storage)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Progres bermain, perolehan bintang, status bab, dan lencana disimpan langsung di memori perangkat pengguna (<code>localStorage</code>) atau penyimpanan terisolasi aplikasi. Kami tidak menjual, menyewakan, atau membagikan riwayat permainan Anda ke broker data pihak ketiga mana pun.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      2. Sesi Bermain Bersama (Mabar Co-op &amp; 1v1 Battle)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Sinkronisasi papan kata pada mode Mabar berlangsung secara langsung melalui saluran sementara (*ephemeral peer channel*). Ruang kamar dibuat dengan kode unik anonim dan seluruh status sesi otomatis dihapus saat sesi berakhir.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      3. Bebas Pelacak &amp; Iklan Pihak Ketiga (Zero Ad Tracking)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Aplikasi ini 100% bebas dari pelacak perilaku pengguna (no behavioral tracking) dan tidak menyertakan SDK periklanan pihak ketiga yang invasif.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      4. Hak Penghapusan Akun &amp; Data (Apple Guideline 5.1.1v)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Setiap pengguna berhak menghapus profil dan seluruh data aplikasi kapan pun. Tombol <strong>Hapus Akun &amp; Data</strong> tersedia langsung di menu Pengaturan aplikasi untuk membersihkan seluruh data tanpa syarat.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      5. Kontak Pengembang &amp; Bantuan Privasi
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Jika Anda memiliki pertanyaan terkait privasi data atau ingin mengajukan permohonan informasi, hubungi tim pengembang kami melalui email: <a href="mailto:halo@ttsbareng.com" className="text-sky-400 underline hover:text-sky-300">halo@ttsbareng.com</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="flex flex-col gap-3.5">
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-sky-200">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Scale className="w-4 h-4 text-sky-400 shrink-0" />
                    <h3 className="text-sm font-black text-white">
                      Ketentuan Layanan &amp; Penggunaan (Terms of Use / EULA)
                    </h3>
                  </div>
                  <p className="text-xs text-sky-200/90 leading-relaxed">
                    Dengan mengunduh, mengakses, atau memainkan TTS Bareng, Anda menyatakan setuju untuk terikat oleh ketentuan penggunaan berikut.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      1. Integritas Permainan &amp; Fair Play
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      TTS Bareng dirancang sebagai wadah edukasi kosakata bahasa Indonesia dan asah otak yang adil. Dilarang menggunakan bot otomatis, skrip manipulasi memori, atau eksploitasi celah perangkat lunak untuk memanipulasi papan peringkat atau hasil duel 1v1.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      2. Norma &amp; Etika Komunitas Multiplayer
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Pengguna bertanggung jawab penuh atas nama panggilan (*nickname*) yang dibuat. Dilarang menggunakan nama yang mengandung unsur ujaran kebencian, diskriminasi SARA, pornografi, atau pelecehan terhadap pemain lain.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      3. Ketersediaan Fitur Offline &amp; Online
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Mode petualangan solo (220 Bab Tematik) dan glosarium kosakata dapat dimainkan secara utuh tanpa koneksi internet (100% offline). Fitur multiplayer mabar dan sinkronisasi awan bergantung pada ketersediaan koneksi internet perangkat Anda.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      4. Pembatasan Tanggung Jawab
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Layanan game disediakan sebagaimana adanya (*as is*). Pengembang terus memperbarui dan menjaga stabilitas aplikasi, namun tidak bertanggung jawab atas kerugian perangkat keras akibat penggunaan di luar spesifikasi wajar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'kbbi' && (
              <div className="flex flex-col gap-3.5">
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-sky-200">
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                    <h3 className="text-sm font-black text-white">
                      Atribusi Resmi Bahasa &amp; Integritas Leksikal
                    </h3>
                  </div>
                  <p className="text-xs text-sky-200/90 leading-relaxed">
                    Seluruh perbendaharaan kata, fonetik, dan definisi dalam TTS Bareng disusun berpedoman pada kaidah linguistik baku Republik Indonesia.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white">
                        Kamus Besar Bahasa Indonesia (KBBI)
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Disusun merujuk pada standar leksikografi <strong>Badan Pengembangan dan Pembinaan Bahasa</strong>, Kementerian Pendidikan Dasar dan Menengah Republik Indonesia, sebagai pedoman ejaan baku dan kekayaan kosakata nasional.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      Pelestarian Bahasa &amp; Budaya Nusantara
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Kategori tematik mencakup 12 Alam Tematik Nusantara: fauna endemik, flora khatulistiwa, arsitektur pusaka, kuliner rempah tradisional, hingga istilah serapan modern guna memajukan literasi dan rasa cinta tanah air.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">
                      Aset Maskot 3D &amp; Hak Kekayaan Intelektual
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Desain karakter maskot 3D Plush Indonesian Puzzle Pals, efek suara taktil, dan antarmuka Apple Liquid Glass dibuat orisinal untuk TTS Bareng dan dilindungi oleh hak cipta pengembang.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between shrink-0">
            <a
              href="mailto:halo@ttsbareng.com"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Bantuan: halo@ttsbareng.com</span>
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
            >
              Saya Mengerti
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModal;
