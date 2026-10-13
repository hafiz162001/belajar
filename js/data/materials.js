/**
 * Rangkuman Materi & Trik Cepat (Cheatsheet & Formula Shortcuts)
 * Untuk CPNS (TWK, TIU, TKP) dan TOEFL (Structure, Listening, Reading)
 */

export const STUDY_MATERIALS = {
  cpns: [
    {
      id: "mat-tiu-deret",
      title: "TIU: Trik Kilat Deret Angka & Huruf",
      category: "TIU",
      badge: "Rumus Cepat",
      summary: "Mengidentifikasi pola selisih, lompat 1-2 angka, pola bertingkat, dan deret Fibonacci dalam waktu di bawah 40 detik.",
      content: `
### 1. Pola Tingkat (Selisih Bertingkat)
Jika selisih pertama tidak teratur (+2, +5, +10, +17), carilah selisih dari selisih tersebut (+3, +5, +7 -> bilangan ganjil bertambah).

### 2. Pola Deret Lompat (Larik Bertingkat)
Jika angka naik-turun tidak stabil (misal: 3, 20, 6, 17, 9, 14), selalu pisahkan menjadi 2 deret yang melompat:
- Deret 1 (posisi ganjil): 3, 6, 9 (+3)
- Deret 2 (posisi genap): 20, 17, 14 (-3)

### 3. Angka Istimewa Kuadrat & Kubik
Hafalkan kuadrat 1-25 dan kubik 1-10:
- Kuadrat: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625.
- Seringkali pola berupa: n^2 - 1 atau n^2 + 2.
      `
    },
    {
      id: "mat-tiu-silogisme",
      title: "TIU: Kaidah Hukum Silogisme Kategorik & Modus",
      category: "TIU",
      badge: "Logika Penalaran",
      summary: "Pahami hukum silogisme resmi BKN agar tidak terjebak opini pribadi atau asumsi liar.",
      content: `
### 1. Hukum Kuantor
- **Semua + Sebagian = Sebagian**
  - Premis 1: Semua atlet lari memiliki stamina prima.
  - Premis 2: Sebagian mahasiswa adalah atlet lari.
  - **Kesimpulan Pasti: Sebagian mahasiswa memiliki stamina prima.**
- **Positif + Negatif = Negatif**
  - Jika salah satu premis memuat kata 'tidak' / 'bukan', maka kesimpulan WAJIB memuat kata 'tidak' / 'bukan'.
- **Sebagian + Sebagian = TIDAK DAPAT DITARIK KESIMPULAN**

### 2. Modus Ponens, Tollens, & Silogisme Hipotesis
- **Modus Ponens:** (p -> q) dan p terjadi, maka q pasti terjadi.
- **Modus Tollens:** (p -> q) dan ~q terjadi, maka ~p pasti terjadi.
- **Silogisme:** (p -> q) dan (q -> r), maka (p -> r).
      `
    },
    {
      id: "mat-twk-pancasila",
      title: "TWK: Pembeda Kunci Pengamalan Sila 1 s.d. Sila 5",
      category: "TWK",
      badge: "Pilar Negara",
      summary: "Cara jitu membedakan Sila 2 vs Sila 5 dan Sila 3 vs Sila 4 yang paling sering menjebak peserta tes SKD.",
      content: `
### Tips Membedakan Sila 2 vs Sila 5 (Paling Sering Tertukar!)
- **Sila ke-2 (Kemanusiaan):**
  - Fokus pada: *Hubungan antarmanusia*, empati, menjunjung HAM, tolong menolong tanpa melihat SARA, perlakuan adil kepada individu/kelompok rentan, sopan santun, tidak semena-mena.
  - Kata kunci: *Tenggang rasa, memanusiakan manusia, martabat manusia, donor darah, kemanusiaan.*
- **Sila ke-5 (Keadilan Sosial):**
  - Fokus pada: *Kesejahteraan umum, hak milik, fasilitas publik, ekonomi, kerja keras, tidak boros, menghargai hasil karya orang lain.*
  - Kata kunci: *Fasilitas publik, gotong royong ekonomi, tidak bergaya hidup mewah, suka bekerja keras, kesejahteraan bersama.*

### Sila 3 (Persatuan) vs Sila 4 (Musyawarah)
- Sila 3: Menempatkan kepentingan bangsa di atas pribadi/golongan, cinta tanah air, bangga produk lokal.
- Sila 4: Musyawarah mufakat, tidak memaksakan kehendak pada orang lain, menghormati keputusan rapat.
      `
    },
    {
      id: "mat-tkp-mastery",
      title: "TKP: Pola Berpikir Skoring 5 (Maksimal)",
      category: "TKP",
      badge: "Pola Jawaban",
      summary: "Mindset ASN BerAKHLAK untuk selalu mendapatkan poin 5 di setiap soal TKP.",
      content: `
### Karakteristik Jawaban Poin 5:
1. **Solutif Tanpa Menunda:** Pilih tindakan yang langsung menyelesaikan akar masalah, bukan sekadar melapor atau menunda.
2. **Keseimbangan Regulasi & Empati:** Menghormati SOP namun tetap memberikan solusi alternatif yang manusiawi bagi masyarakat.
3. **Inisiatif Tinggi (Proaktif):** Tidak pasif menunggu perintah atasan jika kondisi darurat menuntut respons cepat.
4. **Kepentingan Publik > Kepentingan Pribadi:** Siap berkorban waktu atau kenyamanan pribadi demi pelayanan masyarakat atau integritas dinas.
5. **Ketenangan & Pengendalian Diri:** Menghadapi kritik, komplain kasar, atau kegagalan dengan kepala dingin dan introspeksi objektif.
      `
    }
  ],
  toefl: [
    {
      id: "mat-toefl-inversion",
      title: "TOEFL: The 5 Golden Rules of Inversion",
      category: "Structure",
      badge: "Grammar Mastery",
      summary: "How to instantly solve inversion questions (Negative Adverbs, Place Expressions, Conditionals, Only).",
      content: `
### When Subject and Verb Invert (Auxiliary + Subject + Main Verb):

1. **Negative / Restrictive Adverbials at the Beginning:**
   - Keywords: *Never, Rarely, Seldom, Scarcely, Hardly, Barely, Not only, Under no circumstances, Nowhere.*
   - Formula: **Negative Word + Aux (do/does/did/is/have/can) + Subject + Verb**
   - *Example:* Rarely **have I witnessed** such dedication. (NOT: Rarely I have witnessed).

2. **Expressions with "ONLY" at the beginning:**
   - Keywords: *Only when, Only after, Only by, Only then.*
   - *Example:* Only by studying consistently **can students master** the test.

3. **Inverted Conditionals (Without 'If'):**
   - *Had* he known -> If he had known
   - *Were* she here -> If she were here
   - *Should* you need assistance -> If you should need assistance
      `
    },
    {
      id: "mat-toefl-reduced",
      title: "TOEFL: Reduced Clauses & Participle Modifiers",
      category: "Structure",
      badge: "Sentence Completion",
      summary: "Distinguish between Active Participle (-ing) vs Passive Participle (-ed/V3) without getting trapped by double verbs.",
      content: `
### 1. Reduced Adjective Clauses:
- **Active Meaning:**
  - *Full:* The scientist **who conducts** the experiment is from MIT.
  - *Reduced:* The scientist **conducting** the experiment is from MIT.
- **Passive Meaning:**
  - *Full:* The manuscript **which was discovered** in the cave is ancient.
  - *Reduced:* The manuscript **discovered** in the cave is ancient.

### 2. Trap Alert: Double Verbs!
In TOEFL Section 2, beware of choices like:
- *The painting _______ by Picasso is priceless.*
  - (A) was created (WRONG -> creates two main verbs without a connector!)
  - (B) created (CORRECT -> reduced participle modifier).
      `
    },
    {
      id: "mat-toefl-listening",
      title: "TOEFL Listening: Idioms, Negatives & Second Speaker Focus",
      category: "Listening",
      badge: "Listening Skills",
      summary: "Why 80% of answers in Part A are found in the second speaker's turn and how to catch paraphrases.",
      content: `
### 1. Focus on the Second Speaker
In Short Dialogues (Part A), the question almost always asks about what the *second speaker* meant or implied.

### 2. Beware of Sound Alike Traps
Incorrect answer choices intentionally include words that sound almost identical to what was spoken in the audio.
- If the dialogue mentions **"department store"**, wrong answers will often use words like **"apartment"** or **"departure"**.
- Always look for the **meaning / synonym**, not the exact sound!

### 3. Common Tone & Attitude Cues
- *"I wouldn't say no to that"* = I agree / I want to.
- *"You can say that again"* = I strongly agree with you.
- *"Under the weather"* = Feeling ill/sick.
      `
    }
  ]
};
