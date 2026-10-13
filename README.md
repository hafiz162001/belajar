# AptitudePro - Platform Evaluasi Kelemahan & Latihan Terarah (CPNS & TOEFL)

**AptitudePro** adalah platform pembelajaran komprehensif modern yang dirancang khusus untuk persiapan **CAT SKD CPNS** (TWK, TIU, TKP) dan **TOEFL ITP** (Listening, Structure, Reading). Keunggulan utama sistem ini adalah **Adaptive Weakness Engine** yang secara otomatis memetakan kelemahan kritis peserta ujian dan menyediakan drill terarah (Targeted Drills) guna meningkatkan skor secara terukur.

---

## 🚀 Fitur Utama

### 1. 📊 Deteksi & Pemetaan Kelemahan Kritis (Weakness Diagnostic)
- **Automatic Weakness Alert:** Notifikasi otomatis ketika ada subkategori ujian yang akurasinya berada di bawah standar kelulusan (< 65%).
- **Matriks & Radar Evaluasi Subtopik:**
  - **TWK:** Pancasila, UUD 1945, Bela Negara, Nasionalisme, Integritas, Bahasa Indonesia.
  - **TIU:** Deret Angka, Silogisme, Analogi Verbal, Berhitung Cepat, Aritmatika Sosial/Soal Cerita, Figural.
  - **TKP:** Pelayanan Publik, TIK, Jejaring Kerja, Sosial Budaya, Anti Radikalisme (Skoring 1-5).
  - **TOEFL:** Inversion, Reduced Clauses, Subject-Verb Agreement, Parallel Structure, Error Recognition, Listening Idioms, Main Idea, Vocab in Context.
- **Status Penguasaan:** Label dinamis **Kritis** (merah), **Perlu Latihan** (kuning), dan **Menguasai** (hijau).

### 2. ⚡ Smart Drill Adaptif (Peningkatan Terarah)
- **Tombol Sekali Klik "Tingkatkan Kelemahan Sekarang":** Sistem secara otomatis meramu paket soal yang memprioritaskan subtopik terlemah Anda dan soal-soal yang pernah Anda jawab keliru.
- **Mode Instant Feedback & Triks Kilat:** Setiap kali menjawab di mode drill, sistem langsung menampilkan:
  - Indikator benar/salah.
  - Pembahasan mendalam langkah demi langkah (*step-by-step reasoning*).
  - Trik jalan pintas & rumus cepat (*shortcut formula*).

### 3. 🏛️ Simulasi CAT CPNS & TOEFL ITP Standar Resmi
- **Simulasi CAT SKD CPNS:** Mengikuti bobot penilaian resmi BKN (Benar TWK/TIU +5, Salah 0; TKP nilai 1-5; batas waktu 100 menit).
- **Simulasi TOEFL ITP:** Skala konversi nilai standar (310 - 677).
- **TOEFL Audio Simulator:** Menggunakan Web Speech Synthesis API dengan modulasi suara multi-karakter (Man, Woman, Narrator, Professor), pengatur kecepatan (0.8x - 1.2x), indikator gelombang suara, dan sakelar naskah transkrip.
- **Sidebar Lembar Jawaban CAT BKN:** Navigasi cepat nomor soal dengan status hijau (sudah dijawab), biru (aktif), dan abu-abu (belum dijawab).

### 4. ❌ Bank Soal Salah (Mistake Vault) & Catatan Refleksi
- Setiap soal yang dijawab salah otomatis diarsipkan ke Bank Soal Salah.
- Pengguna dapat menulis catatan evaluasi pribadi pada setiap soal untuk mengingat alasan kekeliruan.
- Fitur **"Uji Ulang Soal Ini"** untuk melatih ulang hingga mencapai status dikuasai (*mastered*).

### 5. 📚 Klinik Materi & Ringkasan Rumus Cepat
- **TIU:** Trik selisih bertingkat & deret lompat, angka istimewa pecahan, dan kaidah hukum silogisme kategorik/modus.
- **TWK:** Cara jitu membedakan Sila 2 vs Sila 5, dan Sila 3 vs Sila 4.
- **TKP:** Mindset ASN BerAKHLAK untuk meraih poin 5 (maksimal).
- **TOEFL:** 5 Golden Rules of Inversion, Reduced Clauses, Preposisi + Gerund.

---

## 🛠️ Cara Menjalankan Aplikasi

Aplikasi dibangun menggunakan Vanilla HTML5, Modern CSS (Glassmorphism + Dark/Light Theme), dan ES6 JavaScript Modular tanpa dependensi eksternal yang rumit.

### Opsi 1: Menjalankan dengan Python Server (Sudah Aktif)
```bash
python -m http.server 3000
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

### Opsi 2: Menjalankan dengan Node / npx
```bash
npx serve .
```

---

## 📁 Struktur Berkas

```
Belajar/
├── index.html                 # Struktur halaman utama (Single Page Application)
├── README.md                  # Dokumentasi proyek & panduan penggunaan
├── css/
│   └── style.css              # Design system, Glassmorphism, Dark/Light theme, CAT layout
└── js/
    ├── app.js                 # Controller utama, routing view, CAT quiz engine
    ├── analytics.js           # Mesin evaluasi kelemahan, passing grade BKN & TOEFL converter
    ├── storage.js             # LocalStorage manager, mistake vault & bookmarks
    ├── audio.js               # TOEFL audio simulator dengan Web Speech Synthesis
    └── data/
        ├── cpnsQuestions.js   # Database soal SKD CPNS (TWK, TIU, TKP) berbobot resmi
        ├── toeflQuestions.js  # Database soal TOEFL (Listening, Structure, Reading)
        └── materials.js       # Cheatsheet & ringkasan rumus cepat
```
