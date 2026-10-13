/**
 * Database Soal SKD CPNS Lengkap
 * Kategori:
 * - TWK (Tes Wawasan Kebangsaan) - Passing Grade 65 (Skor 0 / 5)
 * - TIU (Tes Inteligensi Umum) - Passing Grade 80 (Skor 0 / 5)
 * - TKP (Tes Karakteristik Pribadi) - Passing Grade 166 (Skor 1 - 5)
 */

export const CPNS_QUESTIONS = [
  // ===================== TWK =====================
  {
    id: "cpns-twk-01",
    type: "TWK",
    subcategory: "Pancasila",
    question: "Pengamalan sila kedua Pancasila 'Kemanusiaan yang Adil dan Beradab' dalam kehidupan berbangsa salah satunya tercermin dalam sikap saling menghargai martabat manusia. Contoh penerapan nyata dalam kebijakan pelayanan publik aparatur sipil negara adalah...",
    options: [
      { text: "Memberikan kemudahan pelayanan hanya kepada masyarakat yang berasal dari daerah yang sama", isCorrect: false },
      { text: "Mengutamakan warga kelompok rentan (lansia, difabel, ibu hamil) tanpa memandang latar belakang SARA", isCorrect: true },
      { text: "Menolak memberikan bantuan jika pemohon tidak membawa surat rekomendasi tokoh masyarakat", isCorrect: false },
      { text: "Mengambil keputusan musyawarah dengan pemungutan suara mayoritas mutlak", isCorrect: false },
      { text: "Mewajibkan seluruh pemohon untuk mematuhi satu keyakinan agama tertentu", isCorrect: false }
    ],
    explanation: "Sila ke-2 'Kemanusiaan yang Adil dan Beradab' menekankan pengakuan atas persamaan derajat, hak, dan kewajiban asasi setiap manusia tanpa membeda-bedakan suku, keturunan, agama, kepercayaan, jenis kelamin, kedudukan sosial, atau warna kulit. Dalam pelayanan publik, hal ini diwujudkan dengan perlakuan nondiskriminatif dan affirmative action bagi kelompok rentan (lansia, disabilitas, ibu hamil).",
    tips: "Kata kunci Sila 2: Hak asasi, kesetaraan martabat, toleransi kemanusiaan, antideskriminasi, kelompok rentan."
  },
  {
    id: "cpns-twk-02",
    type: "TWK",
    subcategory: "UUD 1945",
    question: "Berdasarkan Pasal 7B UUD NRI Tahun 1945 setelah amandemen, usul pemberhentian Presiden dan/atau Wakil Presiden (impeachment) dapat diajukan oleh DPR kepada MPR hanya dengan terlebih dahulu mengajukan permintaan kepada...",
    options: [
      { text: "Mahkamah Agung untuk memeriksa perkara pidana umum", isCorrect: false },
      { text: "Komisi Yudisial untuk memeriksa kode etik jabatan presiden", isCorrect: false },
      { text: "Mahkamah Konstitusi untuk memeriksa, mengadili, dan memutus dugaan pelanggaran hukum", isCorrect: true },
      { text: "Badan Pemeriksa Keuangan untuk audit kerugian negara", isCorrect: false },
      { text: "Kejaksaan Agung Republik Indonesia untuk proses penyidikan", isCorrect: false }
    ],
    explanation: "Pasal 7B ayat (1) UUD 1945 menyatakan bahwa usul pemberhentian Presiden/Wakil Presiden dapat diajukan oleh DPR kepada MPR hanya dengan terlebih dahulu mengajukan permintaan kepada Mahkamah Konstitusi untuk memeriksa, mengadili, dan memutus pendapat DPR bahwa Presiden/Wakil Presiden telah melakukan pelanggaran hukum berupa pengkhianatan terhadap negara, korupsi, penyuapan, tindak pidana berat lainnya, perbuatan tercela, atau tidak lagi memenuhi syarat.",
    tips: "Alur impeachment: Dugaan DPR -> Uji Materiil di MK -> Sidang Paripurna DPR -> Keputusan akhir di MPR (dihadiri min 3/4 anggota, disetujui min 2/3 yang hadir)."
  },
  {
    id: "cpns-twk-03",
    type: "TWK",
    subcategory: "Bela Negara",
    question: "Seorang ASN di bidang teknologi informasi instansi pemerintah berhasil menggagalkan serangan siber yang menargetkan server data kependudukan nasional dari peretas luar negeri. Tindakan ASN ini merupakan wujud nyata bela negara dalam bentuk...",
    options: [
      { text: "Pengabdian sesuai profesi untuk menjaga kedaulatan informasi negara", isCorrect: true },
      { text: "Wajib militer bersenjata menghadapi ancaman militer", isCorrect: false },
      { text: "Partisipasi politik dalam pemilu serentak", isCorrect: false },
      { text: "Pendidikan kewarganegaraan secara formal di instansi", isCorrect: false },
      { text: "Pelaksanaan tugas administrasi rutin kantor", isCorrect: false }
    ],
    explanation: "Sesuai UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara, keikutsertaan warga negara dalam usaha bela negara diselenggarakan salah satunya melalui 'pengabdian sesuai dengan profesi'. Mengamankan infrastruktur informasi vital negara dari ancaman siber adalah bentuk bela negara nonmiliter.",
    tips: "5 Nilai Dasar Bela Negara: (1) Cinta Tanah Air, (2) Sadar Berbangsa & Bernegara, (3) Setia pada Pancasila, (4) Rela Berkorban, (5) Kemampuan Awal Bela Negara (fisik & psikis)."
  },
  {
    id: "cpns-twk-04",
    type: "TWK",
    subcategory: "Nasionalisme",
    question: "Sikap nasionalisme yang sehat bagi bangsa Indonesia yang majemuk adalah nasionalisme yang berlandaskan Pancasila, bukan 'chauvinisme'. Yang dimaksud dengan chauvinisme adalah...",
    options: [
      { text: "Semangat mencintai tanah air dengan melestarikan kebudayaan lokal secara kreatif", isCorrect: false },
      { text: "Rasa cinta tanah air yang berlebihan dan memandang rendah bangsa lain", isCorrect: true },
      { text: "Keinginan untuk memisahkan diri dari kedaulatan Negara Kesatuan Republik Indonesia", isCorrect: false },
      { text: "Sikap mementingkan kelompok kesukuan di atas kepentingan bersama", isCorrect: false },
      { text: "Kecenderungan untuk mengadopsi budaya luar secara tanpa filter", isCorrect: false }
    ],
    explanation: "Chauvinisme adalah bentuk nasionalisme sempit yang mengagung-agungkan bangsa sendiri secara berlebihan seraya merendahkan martabat bangsa atau negara lain. Nasionalisme Indonesia adalah nasionalisme terbuka yang menghargai perdamaian abadi dan keadilan sosial dunia.",
    tips: "Chauvinisme = Cinta buta/berlebihan (fanatisme). Etnosentrisme = Menganggap suku sendiri paling unggul. Primordialisme = Terikat erat pada tradisi asal."
  },
  {
    id: "cpns-twk-05",
    type: "TWK",
    subcategory: "Integritas",
    question: "Nilai integritas 'Berani' dalam 9 Nilai Integritas KPK diwujudkan ketika seorang pegawai menghadapi situasi di mana atasannya meminta untuk meloloskan rekanan tender yang tidak memenuhi kualifikasi. Sikap yang paling tepat adalah...",
    options: [
      { text: "Menyetujui permintaan tersebut demi menjaga hubungan baik dan masa depan karir", isCorrect: false },
      { text: "Menolak secara santun dan tegas serta mengingatkan prosedur regulasi yang berlaku", isCorrect: true },
      { text: "Menerima berkas lalu meminta uang pelicin sebagai kompensasi risiko", isCorrect: false },
      { text: "Mengajukan cuti mendadak agar terhindar dari tanggung jawab verifikasi", isCorrect: false },
      { text: "Membicarakan keburukan atasan tersebut di media sosial tanpa melapor ke saluran resmi", isCorrect: false }
    ],
    explanation: "Nilai integritas 'Berani' berarti berani menolak perintah yang bertentangan dengan hukum dan moral, berani menyatakan kebenaran, serta berani menanggung risiko atas keputusan yang adil dan benar. Jalur yang benar adalah menolak secara tegas berdasar regulasi dan bila perlu menggunakan Whistleblowing System (WBS).",
    tips: "9 Nilai Integritas KPK (Jumat Bersepeda KK): Jujur, Mandiri, Tanggung jawab, Berani, Sederhana, Peduli, Disiplin, Adil, Kerja keras."
  },
  {
    id: "cpns-twk-06",
    type: "TWK",
    subcategory: "Bahasa Indonesia",
    question: "Pilihlah kalimat yang menggunakan tanda baca dan penulisan ejaan sesuai PUEBI / EYD Edisi V yang paling tepat:",
    options: [
      { text: "Walaupun hari hujan lebat tetapi para peserta tetap menghadiri seminar nasional.", isCorrect: false },
      { text: "Meskipun lelah setelah perjalanan dinas, ia tetap menyelesaikan laporan pertanggungjawaban tepat waktu.", isCorrect: true },
      { text: "Ibu membeli: apel, jeruk dan mangga di pasar tradisional.", isCorrect: false },
      { text: "Surat dinas itu di tanda-tangani oleh Kepala Biro Kepegawaian.", isCorrect: false },
      { text: "Pasien itu harus di rawat secara intensif di rumah sakit.", isCorrect: false }
    ],
    explanation: "Pilihan B benar karena anak kalimat mendahului induk kalimat dipisahkan tanda koma. Pilihan A salah karena 'walaupun' dan 'tetapi' tidak boleh digabung (korelatif ganda). Pilihan C salah karena titik dua tidak digunakan bila rincian merupakan pelengkap langsung. Pilihan D salah karena 'ditandatangani' digabung (imbuhan gabung konfiks). Pilihan E salah karena 'dirawat' adalah kata kerja pasif, bukan kata depan 'di'.",
    tips: "Rumus imbuhan: Awalan saja/akhiran saja dipisah (tanda tangani, beri tahu). Imbuhan gabung (konfiks) serentak digabung: ditandatangani, memberitahukan."
  },

  // ===================== TIU =====================
  {
    id: "cpns-tiu-01",
    type: "TIU",
    subcategory: "Deret Angka",
    question: "Tentukan dua angka selanjutnya dari deret berikut: 3, 5, 9, 17, 33, ..., ...",
    options: [
      { text: "49, 81", isCorrect: false },
      { text: "65, 129", isCorrect: true },
      { text: "65, 128", isCorrect: false },
      { text: "66, 130", isCorrect: false },
      { text: "50, 98", isCorrect: false }
    ],
    explanation: "Pola selisih antar suku:\n5 - 3 = 2 (+2^1)\n9 - 5 = 4 (+2^2)\n17 - 9 = 8 (+2^3)\n33 - 17 = 16 (+2^4)\nMaka penambahan berikutnya adalah +32 (+2^5) dan +64 (+2^6).\nSuku ke-6 = 33 + 32 = 65.\nSuku ke-7 = 65 + 64 = 129.",
    tips: "Pola geometri selisih: +2, +4, +8, +16, +32, +64 atau rumus suku Un = 2^n + 1 (untuk n=1: 2+1=3, n=2: 4+1=5, dst)."
  },
  {
    id: "cpns-tiu-02",
    type: "TIU",
    subcategory: "Silogisme",
    question: "Semua aparatur sipil negara yang berintegritas menolak gratifikasi.\nSebagian staf di instansi X adalah aparatur sipil negara yang berintegritas.\nKesimpulan yang paling tepat adalah...",
    options: [
      { text: "Semua staf di instansi X menolak gratifikasi", isCorrect: false },
      { text: "Semua yang menolak gratifikasi adalah staf di instansi X", isCorrect: false },
      { text: "Sebagian staf di instansi X menolak gratifikasi", isCorrect: true },
      { text: "Staf di instansi X yang tidak berintegritas pasti menerima gratifikasi", isCorrect: false },
      { text: "Tidak dapat ditarik kesimpulan", isCorrect: false }
    ],
    explanation: "Premis Mayor: Semua A adalah B (A = ASN berintegritas, B = menolak gratifikasi).\nPremis Minor: Sebagian C adalah A (C = staf instansi X).\nBerdasarkan kaidah silogisme kategorik: Jika salah satu premis partikular (Sebagian), maka kesimpulan harus partikular (Sebagian).\nKesimpulan: Sebagian C adalah B -> Sebagian staf di instansi X menolak gratifikasi.",
    tips: "Hukum Silogisme: Semua + Sebagian = Sebagian. Positif + Negatif = Negatif."
  },
  {
    id: "cpns-tiu-03",
    type: "TIU",
    subcategory: "Analogi Verbal",
    question: "DOKTER : STETOSKOP = ... : ...",
    options: [
      { text: "Petani : Padi", isCorrect: false },
      { text: "Hakim : Palu", isCorrect: true },
      { text: "Penulis : Buku", isCorrect: false },
      { text: "Guru : Murid", isCorrect: false },
      { text: "Masinis : Kereta", isCorrect: false }
    ],
    explanation: "Hubungan analogi: [Profesi] menggunakan [Alat Utama Kerja Khas].\nDokter menggunakan stetoskop untuk menjalankan profesinya.\nHakim menggunakan palu sidang sebagai alat khas dalam menjalankan profesinya.\n(Buku adalah hasil karya penulis, Padi hasil kerja petani, Murid adalah objek bimbingan guru).",
    tips: "Trik Analogi: Buat kalimat singkat yang menghubungkan kata pertama dan kedua, lalu uji ke setiap pilihan jawaban."
  },
  {
    id: "cpns-tiu-04",
    type: "TIU",
    subcategory: "Berhitung & Aljabar",
    question: "Jika x = 0,375 dari 800 dan y = √(144) + 18^2 / 9, maka hubungan nilai x dan y adalah...",
    options: [
      { text: "x > y", isCorrect: true },
      { text: "x < y", isCorrect: false },
      { text: "x = y", isCorrect: false },
      { text: "2x = 3y", isCorrect: false },
      { text: "Hubungan x dan y tidak dapat ditentukan", isCorrect: false }
    ],
    explanation: "Hitung x:\n0,375 = 3/8.\nx = (3/8) × 800 = 3 × 100 = 300.\n\nHitung y:\n√(144) = 12.\n18^2 / 9 = (18 × 18) / 9 = 2 × 18 = 36.\ny = 12 + 36 = 48.\n\nMaka x (300) > y (48).",
    tips: "Hafalkan pecahan istimewa:\n0,125 = 1/8\n0,375 = 3/8\n0,625 = 5/8\n0,875 = 7/8\n0,333 = 1/3"
  },
  {
    id: "cpns-tiu-05",
    type: "TIU",
    subcategory: "Soal Cerita & Aritmatika",
    question: "Suatu proyek perbaikan jalan direncanakan selesai dalam waktu 30 hari dengan 20 orang pekerja. Setelah berjalan 10 hari, pekerjaan terhenti selama 4 hari karena hujan badai. Berapa tambahan pekerja yang dibutuhkan agar proyek selesai tepat waktu?",
    options: [
      { text: "4 orang", isCorrect: false },
      { text: "5 orang", isCorrect: true },
      { text: "8 orang", isCorrect: false },
      { text: "10 orang", isCorrect: false },
      { text: "15 orang", isCorrect: false }
    ],
    explanation: "Total beban kerja tersisa:\nSisa hari normal = 30 - 10 = 20 hari untuk 20 pekerja -> Beban = 20 × 20 = 400 orang-hari.\nSisa waktu riil yang tersedia = 20 hari - 4 hari (libur) = 16 hari.\nPekerja yang dibutuhkan = 400 / 16 = 25 orang.\nTambahan pekerja = 25 - 20 (pekerja awal) = 5 orang.",
    tips: "Rumus Cepat Tambahan Pekerja: Tambahan = (Hari Terhenti × Jumlah Pekerja Awal) / Sisa Hari yang Tersedia.\n= (4 × 20) / (20 - 4) = 80 / 16 = 5 orang!"
  },
  {
    id: "cpns-tiu-06",
    type: "TIU",
    subcategory: "Kemampuan Figural",
    question: "Dalam tes ketidaksamaan figural, manakah kelompok sifat yang menggambarkan prinsip simetri lipat dan rotasi pada persegi dibandingkan persegi panjang?",
    options: [
      { text: "Persegi memiliki 4 simetri lipat dan 4 simetri putar; persegi panjang memiliki 2 simetri lipat dan 2 simetri putar", isCorrect: true },
      { text: "Keduanya memiliki 4 simetri lipat dan 4 simetri putar", isCorrect: false },
      { text: "Persegi memiliki 2 simetri lipat, sedangkan persegi panjang memiliki 4 simetri lipat", isCorrect: false },
      { text: "Persegi panjang memiliki simetri putar tak terhingga", isCorrect: false },
      { text: "Persegi tidak memiliki simetri putar", isCorrect: false }
    ],
    explanation: "Persegi beraturan memiliki 4 sumbu simetri lipat (2 diagonal dan 2 garis bagi sisi) dan tingkat simetri putar 4 (90°, 180°, 270°, 360°). Persegi panjang memiliki 2 simetri lipat (hanya garis bagi sisi sejajar) dan simetri putar tingkat 2 (180° dan 360°).",
    tips: "Figural sering menguji rotasi searah/berlawanan jarum jam, perubahan jumlah elemen/sisi (+1, -1), serta simetri lipat/putar."
  },

  // ===================== TKP =====================
  {
    id: "cpns-tkp-01",
    type: "TKP",
    subcategory: "Pelayanan Publik",
    question: "Ketika jam pelayanan kantor Anda tinggal 15 menit lagi sebelum tutup, datang seorang kakek lansia yang menempuh perjalanan jauh dari pelosok desa untuk mengurus kartu jaminan kesehatan darurat bagi istrinya yang sakit. Prosedur normal biasanya memakan waktu 30 menit. Sikap Anda adalah...",
    options: [
      { text: "Menolak dengan tegas dan menyuruh kakek tersebut datang kembali besok pagi tepat waktu sesuai jadwal operasional kantor", score: 1 },
      { text: "Menjelaskan bahwa waktu pelayanan hampir habis, lalu menyuruhnya menunggu satpam untuk berkonsultasi", score: 2 },
      { text: "Meminta rekan kerja lain yang sedang tidak sibuk untuk melayani sementara Anda bersiap pulang", score: 3 },
      { text: "Melayani kakek tersebut sebisa mungkin hingga jam tutup, lalu menyuruh melanjutkannya besok", score: 4 },
      { text: "Tetap melayani permohonan kakek tersebut dengan ramah hingga tuntas meskipun harus melewati jam kerja resmi", score: 5 }
    ],
    explanation: "Poin 5 diberikan kepada opsi yang menunjukkan orientasi pelayanan prima, empati tinggi terhadap masyarakat rentan/kondisi mendesak, serta kerelaan berkorban waktu demi kepentingan publik tanpa mengabaikan ketuntasan tugas.",
    tips: "Kunci TKP Pelayanan Publik: Cepat, tuntas, ramah, tidak birokratis, mengutamakan keselamatan dan kebutuhan masyarakat di atas kepentingan pribadi."
  },
  {
    id: "cpns-tkp-02",
    type: "TKP",
    subcategory: "Teknologi Informasi & Komunikasi (TIK)",
    question: "Instansi Anda baru saja mengumumkan migrasi seluruh berkas fisik ke sistem digital cloud terpadu. Beberapa rekan senior mengeluh karena merasa kesulitan beradaptasi dan meminta agar sebagian dokumen tetap dikerjakan manual. Tanggapan Anda adalah...",
    options: [
      { text: "Ikut mendukung usulan rekan senior agar beban kerja tidak bertambah berat", score: 1 },
      { text: "Mengabaikan keluhan mereka dan fokus hanya mengerjakan bagian pekerjaan digital milik diri sendiri", score: 2 },
      { text: "Menyarankan pimpinan agar membatalkan sistem digital demi kenyamanan pegawai", score: 3 },
      { text: "Mendukung digitalisasi dan mengajak rekan senior untuk belajar bersama serta siap mendampingi mereka mengoperasikannya", score: 5 },
      { text: "Melaporkan rekan-rekan senior kepada bagian kepegawaian karena menolak instruksi pimpinan", score: 4 }
    ],
    explanation: "Poin 5 menunjukkan keterbukaan terhadap inovasi teknologi (adaptif TIK), proaktif memfasilitasi rekan kerja, kolaboratif, serta menjadi 'agent of change' yang solutif.",
    tips: "Kunci TKP TIK: Terbuka pada teknologi baru, adaptif, cepat belajar, membantu tim bertransformasi digital, efisiensi kerja."
  },
  {
    id: "cpns-tkp-03",
    type: "TKP",
    subcategory: "Jejaring Kerja & Kolaborasi",
    question: "Anda ditunjuk menjadi ketua tim dalam proyek lintas divisi. Namun, dua anggota tim dari divisi berbeda memiliki konflik personal masa lalu yang menyebabkan koordinasi tersendat dan komunikasi menjadi kaku. Langkah Anda...",
    options: [
      { text: "Membiarkan saja karena masalah pribadi mereka bukan urusan pekerjaan Anda", score: 1 },
      { text: "Mengeluarkan salah satu dari mereka yang kinerjanya paling lambat dari tim", score: 2 },
      { text: "Mengambil alih seluruh pekerjaan kedua orang tersebut agar tugas cepat selesai", score: 3 },
      { text: "Menyampaikan di depan forum rapat terbuka bahwa mereka tidak profesional", score: 4 },
      { text: "Mengajak keduanya berdiskusi secara personal dari hati ke hati, menyelaraskan tujuan bersama proyek, dan membagi peran yang saling melengkapi", score: 5 }
    ],
    explanation: "Poin 5 mencerminkan kepemimpinan yang efektif, manajemen konflik yang dewasa, serta kemampuan membangun sinergi dan jejaring kerja demi tujuan organisasi.",
    tips: "Kunci TKP Jejaring Kerja: Komunikasi asertif, mediasi solutif, kolaborasi, saling percaya dan menjaga keharmonisan tim."
  },
  {
    id: "cpns-tkp-04",
    type: "TKP",
    subcategory: "Anti Radikalisme",
    question: "Dalam grup percakapan internal kantor, seorang kolega membagikan tautan artikel yang menyebarkan narasi kebencian terhadap kelompok agama tertentu dan mengajak untuk menolak mematuhi konsensus konstitusi negara. Sikap Anda...",
    options: [
      { text: "Ikut menyebarkan artikel tersebut ke grup lain agar ramai diperbincangkan", score: 1 },
      { text: "Membaca saja dan mendiamkannya karena tidak ingin mencari masalah dengan rekan kerja", score: 2 },
      { text: "Langsung keluar dari grup kantor tanpa memberikan penjelasan apapun", score: 3 },
      { text: "Mengingatkan dengan sopan di grup agar tidak menyebarkan konten bermuatan SARA/intoleran, dan jika berulang menginformasikan ke unit pembina kepegawaian", score: 5 },
      { text: "Menyerang pribadi rekan tersebut dengan kata-kata kasar di dalam grup", score: 4 }
    ],
    explanation: "Poin 5 menunjukkan komitmen kuat pada Pancasila dan NKRI, keberanian bertindak menegakkan toleransi secara proporsional dan santun, serta pemahaman alur penanganan institusional.",
    tips: "Kunci TKP Anti Radikalisme: Tegas pada nilai kebangsaan, cegah polarisasi dan intoleransi, hindari amarah frontal, tempuh pembinaan yang tertib."
  },
  {
    id: "cpns-twk-07",
    type: "TWK",
    subcategory: "Sejarah & Pilar Kebangsaan",
    question: "Perumusan dasar negara Republik Indonesia mengalami dinamika penting saat sidang BPUPKI pertama. Perubahan sila pertama pada Piagam Jakarta dari 'Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya' menjadi 'Ketuhanan Yang Maha Esa' diputuskan pada sidang PPKI tanggal 18 Agustus 1945 atas usulan tokoh dari kawasan timur yang dimediasi oleh...",
    options: [
      { text: "Soepomo", isCorrect: false },
      { text: "Mohammad Hatta", isCorrect: true },
      { text: "Achmad Soebardjo", isCorrect: false },
      { text: "Sutan Sjahrir", isCorrect: false },
      { text: "Ki Hadjar Dewantara", isCorrect: false }
    ],
    explanation: "Mohammad Hatta menerima aspirasi dari tokoh-tokoh Indonesia bagian timur (melalui opsir Kaigun Jepang) yang merasa keberatan dengan klausul Piagam Jakarta. Demi menjaga persatuan dan keutuhan bangsa yang baru saja merdeka, Hatta mengadakan pertemuan kilat dengan tokoh Islam (Ki Bagus Hadikusumo, Wahid Hasyim, Kasman Singodimedjo, Teuku Moh. Hasan) dan menyepakati rumusan 'Ketuhanan Yang Maha Esa'.",
    tips: "Sejarah Konstitusi: 18 Agustus 1945 PPKI menetapkan: (1) Mengesahkan UUD 1945, (2) Memilih Presiden Soekarno & Wapres Hatta, (3) Membentuk Komite Nasional Indonesia Pusat (KNIP)."
  },
  {
    id: "cpns-twk-08",
    type: "TWK",
    subcategory: "Konstitusi & Tata Negara",
    question: "Berdasarkan Undang-Undang Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan (jo. UU No. 13 Tahun 2022), hierarki peraturan perundang-undangan yang menempati urutan tepat di bawah TAP MPR adalah...",
    options: [
      { text: "Peraturan Presiden (Perpres)", isCorrect: false },
      { text: "Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang (UU/Perppu)", isCorrect: true },
      { text: "Peraturan Pemerintah (PP)", isCorrect: false },
      { text: "Peraturan Daerah Provinsi (Perda Provinsi)", isCorrect: false },
      { text: "Instruksi Presiden (Inpres)", isCorrect: false }
    ],
    explanation: "Urutan hierarki Pasal 7 ayat (1) UU 12/2011:\n1. UUD NRI Tahun 1945\n2. Ketetapan MPR\n3. Undang-Undang / Perppu\n4. Peraturan Pemerintah (PP)\n5. Peraturan Presiden (Perpres)\n6. Perda Provinsi\n7. Perda Kabupaten/Kota.",
    tips: "Jembatan Keledai Hierarki Hukum: U-TAP-U-P-P-P-P (UUD -> TAP MPR -> UU/Perppu -> PP -> Perpres -> Perda Prov -> Perda Kab/Kota)."
  },
  {
    id: "cpns-tiu-07",
    type: "TIU",
    subcategory: "Penalaran Analitis",
    question: "Enam orang pegawai (A, B, C, D, E, dan F) duduk mengelilingi meja bundar untuk rapat koordinasi:\n1. A duduk tepat berhadapan dengan D.\n2. B duduk di sebelah kanan A.\n3. C tidak boleh duduk bersebelahan dengan D maupun B.\n4. E duduk di antara D dan C.\nSiapakah yang duduk tepat di sebelah kiri A?",
    options: [
      { text: "C", isCorrect: false },
      { text: "D", isCorrect: false },
      { text: "F", isCorrect: true },
      { text: "E", isCorrect: false },
      { text: "B", isCorrect: false }
    ],
    explanation: "Posisi 6 kursi melingkar (arah jarum jam): Jika A di posisi 12, maka tepat berhadapan adalah D di posisi 6. B di sebelah kanan A (posisi 2). E di antara D dan C (karena C tidak boleh dekat D dan B, C di posisi 8, maka E di posisi 7). Posisi yang tersisa untuk sebelah kiri A (posisi 10) adalah F.",
    tips: "Trik Meja Bundar: Gambar lingkaran bernomor 1-6. Tarik garis diagonal untuk yang 'berhadapan'. Tempatkan posisi pasti terlebih dahulu."
  },
  {
    id: "cpns-tiu-08",
    type: "TIU",
    subcategory: "Kecepatan & Jarak Waktu",
    question: "Kota P dan Q berjarak 210 km. Mobil X berangkat dari kota P menuju Q pukul 08.00 dengan kecepatan rata-rata 60 km/jam. Pada saat yang sama, mobil Y berangkat dari kota Q menuju P melalui jalur yang sama dengan kecepatan rata-rata 80 km/jam. Pada pukul berapa kedua mobil tersebut akan berpapasan?",
    options: [
      { text: "09.15", isCorrect: false },
      { text: "09.30", isCorrect: true },
      { text: "09.45", isCorrect: false },
      { text: "10.00", isCorrect: false },
      { text: "10.15", isCorrect: false }
    ],
    explanation: "Rumus Berpapasan (Waktu berangkat sama):\nWaktu tempuh = Jarak Total / (Kecepatan 1 + Kecepatan 2)\nt = 210 / (60 + 80) = 210 / 140 = 1,5 jam (1 jam 30 menit).\nWaktu berpapasan = 08.00 + 1 jam 30 menit = 09.30.",
    tips: "Rumus Cepat Berpapasan (arah berlawanan): t = S / (V1 + V2). Jika menyusul (searah): t = S / (Vcepat - Vlambat)."
  },
  {
    id: "cpns-tkp-05",
    type: "TKP",
    subcategory: "Profesionalisme & Integritas Kerja",
    question: "Menjelang akhir tahun anggaran, beban kerja unit Anda meningkat tiga kali lipat dengan tenggat waktu sangat ketat. Di saat bersamaan, pimpinan unit menugaskan Anda merapikan audit laporan keuangan yang sebelumnya dikerjakan oleh rekan yang sedang cuti sakit. Sikap Anda...",
    options: [
      { text: "Menolak tugas tambahan dengan alasan tugas pokok sendiri sudah melebihi kapasitas jam kerja", score: 1 },
      { text: "Mengerjakan tugas pokok saja, dan membiarkan laporan audit tersebut terbengkalai sampai rekan yang cuti kembali", score: 2 },
      { text: "Menerima tugas tersebut dengan bersungut-sungut dan meminta rekan lain patungan menyelesaikan", score: 3 },
      { text: "Menerima tugas, membuat skala prioritas harian yang terstruktur, dan jika mendesak bersedia bekerja lembur agar target instansi tercapai tuntas", score: 5 },
      { text: "Mengerjakan tugas audit secara asal-asalan yang penting ada bukti fisik laporan selesai", score: 4 }
    ],
    explanation: "Poin 5 menunjukkan dedikasi tinggi, kemampuan manajemen waktu (skala prioritas), orientasi hasil kerja bermutu, dan loyalitas terhadap kelancaran institusi.",
    tips: "Kunci TKP Profesionalisme: Tuntas, akuntabel, pantang menyerah menghadapi tekanan (resiliensi), buat skala prioritas, hindari mengeluh."
  },
  {
    id: "cpns-tkp-06",
    type: "TKP",
    subcategory: "Sosial Budaya & Adaptasi",
    question: "Anda dipindahtugaskan ke daerah pedalaman di luar pulau asal Anda. Masyarakat setempat memiliki tradisi musyawarah adat mingguan yang cukup memakan waktu namun sangat dihormati oleh para tetua desa. Sebagai ASN baru, sikap Anda adalah...",
    options: [
      { text: "Menghindari perkumpulan warga karena merasa budaya tersebut tidak relevan dengan tugas administrasi Anda", score: 1 },
      { text: "Hanya bergaul dengan sesama rekan kerja yang berasal dari satu daerah asal", score: 2 },
      { text: "Hadir sesekali saja jika dipaksa oleh kepala kantor", score: 3 },
      { text: "Menyampaikan kritik di depan warga bahwa tradisi tersebut kurang efisien dari sisi waktu", score: 4 },
      { text: "Menghadiri musyawarah dengan rendah hati, menyimak adat istiadat setempat, serta membangun komunikasi yang bersahabat dengan tokoh masyarakat", score: 5 }
    ],
    explanation: "Poin 5 mencerminkan kepekaan sosial budaya, toleransi, penghormatan terhadap kearifan lokal, serta kemampuan adaptasi tinggi di lingkungan baru.",
    tips: "Kunci TKP Sosial Budaya: Di mana bumi dipijak, di situ langit dijunjung. Bersikap inklusif, menghargai keberagaman, dan proaktif menjalin hubungan sosial yang harmonis."
  }
];
