# WHITEPAPER: TTS BARENG (MABAR TEKA-TEKI SILANG)
**Reinvensi Game Kata Klasik Indonesia dengan Sentuhan Apple Liquid Glass, Realtime Co-op, 1v1 Arena & Studio Kreator**

*Versi Dokumen: v1.0.49 | Tanggal: 27 Oktober 2026 | Klasifikasi: Public Commercial Whitepaper*

---

## 1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)

**TTS Bareng** adalah platform permainan teka-teki silang generasi baru (*next-generation word puzzle*) yang dirancang khusus untuk merevolusi pengalaman bermain TTS di Indonesia. Menggabungkan kekayaan kosakata resmi **Kamus Besar Bahasa Indonesia (KBBI)** dengan standar interaksi digital kelas dunia berfilosofi **Apple Liquid Glass**, TTS Bareng menepis anggapan bahwa teka-teki silang adalah permainan lawas yang statis dan monoton.

Di era di mana mayoritas game kata dipenuhi iklan agresif (*hyper-casual ad spam*), mekanik bayar-untuk-menang (*pay-to-win*), serta visual yang berantakan, TTS Bareng hadir dengan pendekatan **Zen Tactile Luxury**:
1. **Realtime Co-op ("Satu Papan Berdua")**: Bermain di satu kisi teka-teki secara langsung bersama sahabat, pasangan, atau keluarga hanya melalui satu tautan kamar atau pemindaian QR code tanpa perlu login rumit.
2. **1v1 Arena (Tug-of-War & Speed Race)**: Mode kompetitif intensif adu kecerdasan dan kecepatan dalam merebut petak kata secara real-time dengan kalkulasi ELO rating dinamis.
3. **Turnamen Komunitas & Klasemen Master ELO (Liga Catur)**: Turnamen bracket sistem gugur (*Knockout 4 & Knockout 8*) serentak dengan piala dan peringkat Master ELO nasional.
4. **Studio Kreator TTS Sendiri**: Kanvas layar penuh untuk menciptakan teka-teki silang kustom, menghasilkan tautan deep link web resmi dan QR code instan untuk dibagikan ke teman/komunitas.
5. **Kurasi 30 Alam Nusantara & 300 Level Progresif**: Konten edukatif terverifikasi KBBI dari tema rumah, kuliner, flora-fauna, hingga sains dan sejarah peradaban.
6. **Estetika Apple Liquid Glass & Zero Native Pop-ups**: Tipografi bersih (Poppins), palet warna ketat (Strict Max 3-Color Palette & Theme CSS Variables), efek kaca optikal (*frosted blur*), haptic mikro prosedural, dialog konfirmasi kustom kaca cair, dan karakter maskot 3D plush berkualitas studio.

---

## 2. LATAR BELAKANG & PROBLEM STATEMENT

### 2.1 Kondisi Pasar Saat Ini
- **Kejenuhan Format Tradisional**: Format teka-teki silang cetak atau adaptasi digital generasi awal di Play Store/App Store memiliki antarmuka kaku, iklan pop-up yang merusak fokus, serta kamus kata yang tidak terkurasi (sering mengandung kata terjemahan mentah mesin atau kata asing acak).
- **Kurangnya Fitur Sosial yang Menyenangkan**: Mayoritas game TTS adalah pengalaman solo yang terisolasi. Jika ada fitur multipemain, umumnya bersifat asinkron (*turn-based slow pacing*) yang membosankan.
- **Krisis Retensi & Kejenuhan Visual**: Banyak aplikasi modern terjebak dalam gaya visual "AI Slop" (generatif murah, over-glow neon murahan, gradasi berlebihan, dan bayangan kasar) yang membuat mata cepat lelah dan terkesan murahan.

### 2.2 Solusi yang Dihadirkan TTS Bareng
- **Kurasi Otentik KBBI V**: Seluruh bank kata (2.650+ kata dan berkembang hingga ribuan kosakata) dikompilasi secara deterministik tanpa tumpang tindih (*zero parallel collision*), dengan definisi petunjuk yang mendidik, relevan, dan kaya akan budaya Nusantara.
- **Realtime Synchronization Engine**: Sinkronisasi instan via Supabase Realtime Channels yang memungkinkan kursor rekan main terlihat bergerak secara langsung di layar dengan latensi rendah (<100ms).
- **Tactile Procedural Audio**: Setiap ketukan keyboard virtual menghasilkan respons akustik lembut yang disintesis langsung menggunakan Web Audio API tanpa sampel audio berat.

---

## 3. ARSITEKTUR PRODUK & PILAR TEKNOLOGI

TTS Bareng dibangun di atas arsitektur *offline-first modern web stack* yang dikemas ke platform mobile secara native tanpa overhead:

| Lapisan | Teknologi | Peran & Keunggulan |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Reaktivitas instan, kompilasi type-safe, dan efisiensi render petak kisi |
| **Build Tooling** | Vite 6 | Waktu bundling sub-detik dan HMR ultra-cepat |
| **State Engine** | Zustand (Persistent Local Storage) | Manajemen status terpusat, offline-first tanpa jeda simpan |
| **Realtime Backend** | Supabase (PostgreSQL + Realtime Channels) | Kamar mabar, sinkronisasi papan live, dan leaderboard nasional Daily Rush |
| **Styling & Design System** | Tailwind CSS + Framer Motion | Liquid glass frosted glassmorphism, spring physics animation |
| **Mobile Runtime** | Capacitor 6 (iOS Xcode & Android Gradle) | Pengalaman native, integrasi haptics iOS/Android, dan sideload pipeline |
| **Procedural Audio** | Web Audio API (Native Oscillator & Biquad Filters)| Suara ketukan tombol taktil, efek combo, dan detak jantung tanpa file WAV/MP3 besar |
| **Distribution Pipeline** | GitHub Actions Automated CI/CD | Menghasilkan `.ipa` (siap sign SideStore/AltStore) dan `.apk` secara otomatis |

---

## 4. SISTEM PERMAINAN & MODE UTAMA (GAMEPLAY MODES)

### 4.1 Mode Klasik: Jelajah 30 Alam Tematik
- **300 Level Terstruktur**: Pemain menjelajahi 30 Alam Tematik (*Realms*), mencakup:
  - *Alam 1 - 5*: Keseharian & Rumah, Kuliner & Cita Rasa, Kota & Jelajah Daerah, Bangunan Publik, Karakter & Sifat.
  - *Alam 6 - 15*: Fauna Indonesia, Profesi, Dolanan Tradisional, Transportasi, Bentang Alam, Teknologi, Hobi, Musik, Perniagaan, Kesehatan Raga.
  - *Alam 16 - 30*: Sains IPA, Masyarakat IPS, Nilai Kebangsaan PKN, Kosakata Aksi & Sifat, Ekonomi, Hukum & Keadilan, Tata Negara, Antropologi, Psikologi, Astronomi, Geografi, Sejarah Nusantara, Kelestarian Ekologi, serta Media Informasi.
- **Grid Layout Algoritma**: Kisi silang dirancang matematis agar setiap kata yang bersilangan memberikan *clue anchor* yang presisi tanpa petak buntu.

### 4.2 Mabar Co-op (Satu Papan Bersama Teman)
- **Zero Friction Entry**: Tidak mewajibkan registrasi awal. Cukup buat kamar (*Create Room*), bagikan tautan cepat atau QR code via WhatsApp/Telegram.
- **Live Collaborative Solving**: Ketika Teman A mengetik di petak 4 Mendatar, kursor dan huruf muncul seketika di layar Teman B lengkap dengan warna penanda asal solver.
- **Mabar Reaction Tray & Pings**: Fitur kirim reaksi instan ekspresif dan balon ping untuk memberi sinyal petunjuk yang membutuhkan bantuan.

### 4.3 1v1 Arena (Tug-of-War & Speed Race)
- **Tug-of-War Score Bar**: Skor dinamis yang saling menarik antara dua pemain. Setiap kata yang dipecahkan terlebih dahulu akan mengklaim petak tersebut secara permanen dengan warna palet pemain.
- **Kalkulasi Rating ELO Dinamis**: Rekap ronde tuntas menampilkan pemenang, evaluasi ELO delta, dan kenaikan tier master.
- **Background Persistence**: Timer duel tetap berdetak secara global di atas navigasi utama jika pemain berganti tab.

### 4.4 Turnamen Komunitas & Master ELO Liga Catur
- **Sistem Bracket Gugur**: Dukungan lobi Knockout 4 dan Knockout 8 dengan simulasi bracket instan dan pengisian slot bot cerdas.
- **Papan Peringkat Master**: Klasemen nasional resmi yang mengurutkan pemain berdasarkan kepiawaian ELO rating Liga Catur.

### 4.5 Studio Kreator TTS Kustom
- **Kanvas Penuh Kreator**: Pengguna dapat menyusun kata dan petunjuk sendiri secara bebas.
- **Deep Link Base64**: Menghasilkan tautan web resmi publik (`https://tts-bareng-web.akashaaa-id.workers.dev`) dan QR code yang dapat langsung dimainkan oleh pemain lain tanpa login server.
- **Koleksi 'TTS Kreasiku'**: Tersimpan persisten offline-first di profil pemain dengan opsi mainkan, bagikan, edit, atau hapus.

---

## 5. DESAIN VISUAL & FILOSOFI INTERAKSI (APPLE LIQUID GLASS)

TTS Bareng menetapkan standar estetika tinggi yang menolak gaya klise:

1. **Liquid Glass & Frosted Blur**: Permukaan kartu UI menggunakan perpaduan `backdrop-filter: blur(24px)`, saturasi optikal, dan batas kontur tipis `rgba(255, 255, 255, 0.18)` yang elegan.
2. **Strict Minimal Palette**: Tidak menggunakan lebih dari 3 warna inti dalam satu tampilan layar. Mengeliminasi polusi visual agar fokus pemain tetap pada kata dan petak.
3. **Pilihan Tema Dinamis**:
   - *Crisp Ivory / Apple Light Mono*: Latar putih studio bersih dengan tinta arang titanium.
   - *Warm Obsidian*: Hitam murni `#111113` dengan kontras platinum lembut.
   - *Nocturne Espresso*: Nuansa cokelat hangat ramah mata untuk sesi malam hari.
   - *Oxford Navy*, *Kyoto Matcha*, *Bordo Royale*, *Racing Green*, dan *Blossom*.
4. **Animasi Berbasis Fisika (Spring Physics)**: Tidak ada animasi linier kaku; setiap transisi modal dan pop-up huruf menggunakan redaman pegas (*damping spring*) alami.
5. **Koleksi Maskot 3D Plush Nusantara**: 18 karakter maskot bergaya boneka plush 3D ramah anak dan dewasa (seperti *Batik Wordsmith*, *Puzzle Explorer*, *Crossword Thinker*).

---

## 6. MODEL BISNIS & ROADMAP KOMERSIAL

### 6.1 Strategi Monetisasi Berkelanjutan (Non-Predatory)
- **Freemium Beretika**: Permainan inti, mode klasik, dan mabar co-op dapat dimainkan sepenuhnya secara gratis tanpa penghalang energi (*no stamina bar barrier*).
- **Sistem Bintang & Bantuan**: Bintang didapatkan dari pencapaian bab dan streak harian, digunakan untuk membuka petunjuk huruf sulit atau tema eksklusif.
- **Opt-in Rewarded Ads**: Tidak ada banner mengganggu di tengah permainan aktif. Iklan hanya hadir atas pilihan pemain (misal: memutar roda hadiah harian atau membuka petunjuk tambahan).
- **TTS Bareng Pro (In-App Purchase)**: Opsi satu kali beli atau langganan murah untuk membuka seluruh tema premium, lencana profil avatar langka, dan pengalaman bermain bebas iklan sepenuhnya.

### 6.2 Tahapan Peluncuran (Roadmap)
- **Fase 1 (Selesai)**: Core Game Engine, 300 Level KBBI, Realtime Supabase Co-op, Daily Rush, dan build otomatis IPA/APK.
- **Fase 2 (Sekarang)**: Peluncuran Official Commercial Landing Page berstandar Apple Showcase untuk konversi unduhan dan pendaftaran pra-rilis (*pre-registration*).
- **Fase 3**: Peluncuran resmi di Google Play Store & Apple App Store dengan dukungan Game Center & Google Play Games Leaderboards.
- **Fase 4**: Turnamen Nasional Komunitas TTS Bareng bertajuk *"Festival Kata Nusantara"* dengan hadiah eksklusif.

---

## 7. KESIMPULAN

TTS Bareng bukan sekadar aplikasi permainan teka-teki biasa; ini adalah kebangkitan digital tradisi asah otak Nusantara. Dengan perpaduan keindahan desain Apple Liquid Glass, keandalan teknologi realtime modern, dan bank kata KBBI yang mendidik, TTS Bareng siap menjadi pemimpin pasar game kata kasual di Indonesia.
