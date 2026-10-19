# RENCANA PENGEMBANGAN (PLANNING) LANDING PAGE KOMERSIAL: TTS BARENG

Dokumen perencanaan teknis, desain, dan arsitektur komponen untuk pembuatan Landing Page komersial **TTS Bareng** sesuai standar Apple Design System dan referensi layout Vanguard.

---

## 1. STRUKTUR PROYEK & TECH STACK

- **Framework**: React 19 + TypeScript (Vite 6)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Motion & Interaktivitas**: Framer Motion (Spring physics, scroll-driven triggers, floating micro-interactions)
- **Iconography**: Lucide React
- **Tipografi**: Poppins (Google Fonts: 400, 500, 600, 700, 800, 900) — *Strictly No Monospace font*
- **Sistem Warna**:
  - Background: Gradasi putih seamless (`linear-gradient(180deg, #FFFFFF 0%, #FAFAFC 35%, #F4F4F7 70%, #EDEDF2 100%)`)
  - Primary Typography: Pure Charcoal `#0F172A` & `#18181B`
  - Secondary Typography: Slate Grey `#52525B` & `#64748B`
  - Brand Accent: Royal Ultramarine Blue `#2563EB` & Ice Blue `#DBEAFE` (selaras dengan rim 3D pada `asset.webp`)
  - Glass Material: `backdrop-filter: blur(20px) saturate(180%)`, border `rgba(0, 0, 0, 0.06)`, shadow lembut `0 10px 30px -10px rgba(0, 0, 0, 0.04)` (No heavy drop shadow, No colored neon glow).

---

## 2. PETA SECTION & SPESIFIKASI FITUR

### 2.1 Floating Liquid Glass Navbar
- Posisi: `fixed top-5 left-1/2 -translate-x-1/2 z-50`
- Tampilan: Capsule pill frosted glass (`backdrop-blur-xl bg-white/75 border border-black/[0.07]`)
- Elemen:
  - Brand Logo & Teks "TTS BARENG"
  - Link Navigasi: Fitur, Mode Game, FAQ
  - Aksi Kanan: Tombol "Dapatkan App" (Memicu toast notifikasi Liquid Glass "Coming Soon")

### 2.2 Hero Section (Referensi: Vanguard Asymmetrical Split Layout)
- **Sisi Kiri (Typography & Value Proposition)**:
  - Kicker Tag: Pill badge dengan icon spark `✨ TEKA-TEKI SILANG GENERASI BARU`
  - Headline Utama: 3 baris tebal bertenaga:
    ```
    ASAH.
    ADU.
    TAKLUKKAN.
    ```
  - Subheadline: *"Reinvensi game kata Indonesia berstandar resmi KBBI. Pecahkan teka-teki bersama sahabat di satu papan live atau buktikan ketangkasanmu di 1v1 Arena."*
  - Dual CTAs:
    - Tombol Download App Store & Google Play Store (memicu toast coming soon)
    - Tombol Sekunder: "Pelajari Fitur ↗" (scroll halus ke showcase)
  - Metrics & Proof Bar:
    - **2.600+** Kosakata KBBI V
    - **300** Level & 30 Alam
    - **< 100ms** Realtime Arena Sync
- **Sisi Kanan (Visual 3D Hero Focal Point)**:
  - Menampilkan `asset.webp` (3D Plush Crossword Board Badge resolusi tinggi)
  - Interaksi: Floating parallax physics yang merespons pergerakan kursor pengguna
  - Floating Live Status Badges:
    - Badge 1: *"Budi baru saja memecahkan 4 Mendatar"*
    - Badge 2: *"Tug-of-War Score: 5 - 3"*

### 2.3 Marquee Section (Antara Section 1 & Section 2)
- Ticker horizontal tanpa henti (*infinite smooth marquee*) dengan separator ikon minimalis
- Konten spesifik:
  - `✦ 2.600+ KOSAKATA KBBI`
  - `✦ 1 PAPAN LIVE CO-OP`
  - `✦ 1V1 TUG-OF-WAR ARENA`
  - `✦ 30+ ALAM TEMATIK`
  - `✦ DAILY RUSH 90 DETIK`
  - `✦ APPLE LIQUID GLASS DESIGN`
  - `✦ ZERO PAY-TO-WIN`

### 2.4 Fitur Showcase (Apple Bento Grid Interaktif)
- **Bento 1 (Besar - 2 Kolom)**: *Mabar Co-op Satu Papan Live*
  - Simulasi interaktif dua kursor (Pemain 1 & Pemain 2) yang mengetik kata bersamaan secara real-time
  - Keterangan: Bagikan tautan via WhatsApp atau scan QR code tanpa perlu registrasi
- **Bento 2 (Tinggi/Vertikal)**: *1v1 Tug-of-War Arena*
  - Tampilan meteran skor tarik tambang dinamis yang bergeser ke kiri dan kanan
  - Mode Best-of-3 dengan timer hitung mundur
- **Bento 3**: *Daily Rush 90 Detik*
  - Komponen timer interaktif 90 detik dengan visualisasi denyut detak jantung prosedural
  - Papan peringkat harian nasional serentak 00:00 WIB
- **Bento 4**: *Jelajah 30 Alam Nusantara*
  - Interactive preview kategori (Kuliner, Satwa, Dolanan, Antropologi, Sains, Sejarah)
- **Bento 5**: *Filosofi Apple Liquid Glass & Zero AI-Slop*
  - Standar visual bersih, palet 3 warna ketat, respons taktil lembut

### 2.5 FAQ Section
- Accordion modern Apple style dengan animasi buka-tutup spring yang halus
- Daftar pertanyaan & jawaban terverifikasi:
  1. *Apa yang membedakan TTS Bareng dengan aplikasi TTS biasa di toko aplikasi?*
  2. *Apakah saya dan teman saya harus berada di jaringan Wi-Fi yang sama untuk bermain Co-op?*
  3. *Bagaimana sistem penilaian pada mode kompetitif 1v1 Arena dan Daily Rush 90s?*
  4. *Apakah seluruh kosakata dalam game ini dijamin valid dan sesuai kaidah bahasa?*
  5. *Kapan TTS Bareng resmi diluncurkan di Google Play Store dan Apple App Store?*

### 2.6 CTA Section
- Kartu lengkung melayang (*curved glass card*) dengan latar gradasi putih ke abu-abu lembut
- Headline: *"Siap Menguji Ketajaman Kosakatamu?"*
- Tombol Unduh Resmi App Store & Google Play Store (dengan aksi Toast Coming Soon)
- Kolom Pre-registrasi Notifikasi Email: Input email elegan dengan verifikasi instan

### 2.7 Footer Section
- Identitas brand TTS Bareng & atribusi resmi KBBI Badan Bahasa
- Quick links ke semua section
- Hak Cipta & Indikator Status: `● Server Mabar Realtime Online`

---

## 3. CHECKLIST EKSEKUSI TEKNIS

1. [x] Analisis mendalam fitur dan konsep game dari direktori `D:\Project\Teka Teki SIlang`
2. [x] Konversi `asset.png` ke `asset.webp` (berhasil dikompresi dari 25MB menjadi 1.3MB) dan hapus file PNG lama
3. [x] Pembuatan Whitepaper komprehensif di `D:\Project\TTS Landing Page\WHITEPAPER.md`
4. [x] Proses wawancara dan penyelarasan `/grill-me` bersama pengguna
5. [x] Penyusunan Rencana Pengembangan di `PLANNING.md`
6. [ ] Inisialisasi proyek React + Vite + Tailwind CSS + Framer Motion di folder saat ini
7. [ ] Implementasi seluruh section (Navbar, Hero Vanguard Style, Marquee, Bento Showcase, FAQ, CTA, Footer, Toast Engine)
8. [ ] Pengujian build produksi (`npm run build`) dan verifikasi tampilan interaktif
