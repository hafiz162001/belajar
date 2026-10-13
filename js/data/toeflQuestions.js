/**
 * Database Soal TOEFL ITP / PBT Lengkap
 * Kategori:
 * - Listening Comprehension (Part A, Part B, Part C) - disertakan script audio & Web Speech API TTS
 * - Structure & Written Expression (Part A: Sentence Completion, Part B: Error Identification)
 * - Reading Comprehension (Passage + Pertanyaan Main Idea, Detail, Vocab, Inference)
 */

export const TOEFL_QUESTIONS = [
  // ===================== LISTENING COMPREHENSION =====================
  {
    id: "toefl-list-01",
    type: "Listening",
    subcategory: "Short Dialogue (Part A)",
    speakerDialogue: [
      { speaker: "Man", text: "Are you going to the biology review session tonight before the final exam?" },
      { speaker: "Woman", text: "I would, but I have to finish my research paper that is due tomorrow morning." },
      { speaker: "Narrator", text: "What does the woman mean?" }
    ],
    question: "What does the woman imply about the review session?",
    options: [
      { text: "She will attend the session after finishing her paper", isCorrect: false },
      { text: "She is unable to attend because of an impending assignment deadline", isCorrect: true },
      { text: "She has already submitted her research paper", isCorrect: false },
      { text: "She believes the review session is tomorrow morning", isCorrect: false }
    ],
    explanation: "The woman uses the conditional 'I would, but...', which signals an excuse/inability to attend: 'I would (go), but I have to finish my research paper that is due tomorrow morning.' This means she cannot attend the review session due to her urgent paper deadline.",
    tips: "Listening Tip: Frasa 'I would, but...' selalu menandakan penolakan halus atau ketidakmampuan melakukan aksi karena halangan tertentu. Jawaban yang benar biasanya memparafrase alasan tersebut."
  },
  {
    id: "toefl-list-02",
    type: "Listening",
    subcategory: "Idioms & Indirect Speech (Part A)",
    speakerDialogue: [
      { speaker: "Woman", text: "Do you think Mark will be selected as the team captain for the upcoming debate championship?" },
      { speaker: "Man", text: "It’s a long shot, considering how little preparation he’s done this semester." },
      { speaker: "Narrator", text: "What does the man imply about Mark?" }
    ],
    question: "What does the man say about Mark's chances?",
    options: [
      { text: "Mark is confident that he will be chosen", isCorrect: false },
      { text: "It is very unlikely that Mark will be selected", isCorrect: true },
      { text: "Mark has been shooting long distances in debate practice", isCorrect: false },
      { text: "The team will definitely elect Mark as their leader", isCorrect: false }
    ],
    explanation: "The idiom 'a long shot' means something that has very little probability of happening (sangat kecil kemungkinannya). The man implies it is unlikely Mark will become captain because of his lack of preparation.",
    tips: "Listening Idiom: 'A long shot' = unlikely to happen / peluang sangat kecil. Hindari jebakan kata berbunyi mirip seperti 'shooting'."
  },
  {
    id: "toefl-list-03",
    type: "Listening",
    subcategory: "Lecture / Talk (Part C)",
    speakerDialogue: [
      { speaker: "Professor", text: "Good morning class. Today we're looking at bioluminescence in marine life. Unlike phosphorescence which requires an external light source, bioluminescence is a chemical reaction occurring within an organism that produces cold light. Nearly 76 percent of deep-sea creatures possess this trait, primarily utilized for camouflage, attracting prey, and deterring predators." },
      { speaker: "Narrator", text: "According to the professor, what distinguishes bioluminescence from phosphorescence?" }
    ],
    question: "What distinguishes bioluminescence from phosphorescence according to the talk?",
    options: [
      { text: "Bioluminescence generates immense heat in deep-sea creatures", isCorrect: false },
      { text: "Phosphorescence does not require an external light source", isCorrect: false },
      { text: "Bioluminescence is a self-generated chemical reaction that produces cold light", isCorrect: true },
      { text: "Only freshwater creatures can exhibit phosphorescence", isCorrect: false }
    ],
    explanation: "The professor clearly states: 'Unlike phosphorescence which requires an external light source, bioluminescence is a chemical reaction occurring within an organism that produces cold light.'",
    tips: "Part C Listening: Fokus pada kata pembanding ('unlike', 'in contrast to', 'however'). Pertanyaan sering kali menanyakan perbedaan kunci dua konsep yang dibandingkan."
  },

  // ===================== STRUCTURE & WRITTEN EXPRESSION =====================
  {
    id: "toefl-struct-01",
    type: "Structure",
    subcategory: "Inversion",
    question: "Not only _______ crucial nutrients to the crop, but it also helps retain soil moisture during drought.",
    options: [
      { text: "organic compost provides", isCorrect: false },
      { text: "does organic compost provide", isCorrect: true },
      { text: "provides organic compost", isCorrect: false },
      { text: "organic compost does provide", isCorrect: false }
    ],
    explanation: "Aturan Inversi (Negative Adverbial Inversion): Ketika kalimat diawali oleh ungkapan negatif/pembatas seperti 'Not only', 'Rarely', 'Seldom', 'Never', 'Hardly', maka susunan subjek dan kata kerja bantu (auxiliary verb) harus DIBALIK (Auxiliary + Subject + Verb). Karena 'organic compost' tunggal dan present tense, bentuk inversinya adalah 'does organic compost provide'.",
    tips: "Rumus Inversi: Not only + Aux (do/does/did/is/can) + Subject + Main Verb + ..., but (also) ..."
  },
  {
    id: "toefl-struct-02",
    type: "Structure",
    subcategory: "Reduced Relative Clauses",
    question: "The archaeological artifacts _______ during the recent excavation in Central Java will be preserved in the national museum.",
    options: [
      { text: "were discovered", isCorrect: false },
      { text: "discovered", isCorrect: true },
      { text: "they discovered", isCorrect: false },
      { text: "discovering", isCorrect: false }
    ],
    explanation: "Kalimat utama sudah memiliki predikat utama: 'will be preserved'. Oleh karena itu, bagian yang kosong membutuhkan modifier berupa Reduced Relative Clause (klausa relatif yang disederhanakan). Bentuk aslinya: 'which were discovered' disederhanakan menjadi Past Participle (V3) pasif: 'discovered'. Opsi A salah karena membuat double main verb tanpa konjungsi.",
    tips: "Aturan Reduksi: Jika bermakna pasif ('yang ditemukan'), gunakan V3 (discovered). Jika aktif ('yang menemukan'), gunakan V-ing (discovering)."
  },
  {
    id: "toefl-struct-03",
    type: "Structure",
    subcategory: "Subject-Verb Agreement",
    question: "Neither the principal nor the teachers _______ in favor of altering the examination timetable so drastically.",
    options: [
      { text: "was", isCorrect: false },
      { text: "were", isCorrect: true },
      { text: "is", isCorrect: false },
      { text: "being", isCorrect: false }
    ],
    explanation: "Aturan Pasangan Korelatif 'Neither... nor...' dan 'Either... or...': Kata kerja (verb) harus menyesuaikan dengan subjek yang PALING DEKAT dengan kata kerja tersebut (proximity rule). Subjek terdekat adalah 'the teachers' (jamak/plural), sehingga memerlukan kata kerja jamak 'were'.",
    tips: "Rumus: Neither A nor B + Verb (Verb disesuaikan dengan B!). Contoh: Neither the teacher nor the students ARE... vs Neither the students nor the teacher IS..."
  },
  {
    id: "toefl-struct-04",
    type: "Structure",
    subcategory: "Error Recognition (Written Expression)",
    isErrorRecognition: true,
    sentenceParts: [
      { part: "A", text: "Although" },
      { text: " honey has a high sugar content, its " },
      { part: "B", text: "antimicrobial properties" },
      { text: " make it " },
      { part: "C", text: "remarkably" },
      { text: " effective for " },
      { part: "D", text: "treat" },
      { text: " minor burns and wounds." }
    ],
    question: "Identify the one underlined word or phrase that must be changed in order for the sentence to be correct:",
    options: [
      { text: "A (Although)", isCorrect: false },
      { text: "B (antimicrobial properties)", isCorrect: false },
      { text: "C (remarkably)", isCorrect: false },
      { text: "D (treat)", isCorrect: true }
    ],
    explanation: "Bagian D salah. Kata depan (preposition) seperti 'for' harus diikuti oleh Gerund (V-ing) atau Noun, bukan bentuk dasar kata kerja (bare infinitive). Seharusnya 'for treating minor burns and wounds'.",
    tips: "Aturan Preposisi + Gerund: Semua preposisi (in, on, at, for, about, without, before, after) + Verb-ing. Contoh: 'interested in learning', 'responsible for managing'."
  },
  {
    id: "toefl-struct-05",
    type: "Structure",
    subcategory: "Parallel Structure",
    question: "An effective public speaker must possess clear articulation, persuasive reasoning, and _______ with diverse audiences.",
    options: [
      { text: "the ability to empathize", isCorrect: true },
      { text: "empathizing skillfully", isCorrect: false },
      { text: "to be able to empathize", isCorrect: false },
      { text: "she can empathize", isCorrect: false }
    ],
    explanation: "Aturan Parallel Structure (Kesejajaran Struktur): Elemen yang dihubungkan oleh koma dan 'and' harus setara secara gramatikal. Pola kalimat: [Noun Phrase: clear articulation], [Noun Phrase: persuasive reasoning], and [Noun Phrase: the ability to empathize].",
    tips: "Cek paralelisme: Noun + Noun + and Noun; Adjective + Adjective + and Adjective; Gerund + Gerund + and Gerund."
  },

  // ===================== READING COMPREHENSION =====================
  {
    id: "toefl-read-01",
    type: "Reading",
    subcategory: "Main Idea & Vocabulary",
    passage: `Geothermal energy originates from the internal heat of the Earth. Beneath the continental crust, radioactive decay of minerals alongside primordial heat from planetary formation continuously warms surrounding rock strata and groundwater reservoirs. When subterranean water comes into contact with these scorching hydrothermal zones, it generates immense pressures of superheated steam. 

    Engineers harness this subterranean phenomenon by drilling deep production wells, piping the high-pressure steam directly to turbines that generate clean electricity. Because geothermal power plants emit minuscule greenhouse emissions compared to fossil fuel alternatives and maintain an uninterrupted baseload power output irrespective of weather conditions, they represent one of the most reliable sustainable energy sources available today.`,
    question: "What is the primary topic of the passage?",
    options: [
      { text: "The historical discovery of radioactive minerals within the Earth's crust", isCorrect: false },
      { text: "The origin and advantages of geothermal energy as a sustainable power source", isCorrect: true },
      { text: "The environmental hazards associated with deep hydrothermal drilling", isCorrect: false },
      { text: "A comparison between solar energy and fossil fuel emissions", isCorrect: false }
    ],
    explanation: "Paragraf pertama menjelaskan asal mula panas geotermal bumi (origin), dan paragraf kedua menjelaskan bagaimana energi tersebut dimanfaatkan serta keunggulannya sebagai energi terbarukan yang andal (advantages of geothermal energy). Pilihan B mencakup esensi kedua paragraf secara komprehensif.",
    tips: "Trik Main Idea: Baca kalimat pertama setiap paragraf (Topic Sentence) lalu simpulkan gagasan pemersatu seluruh paragraf."
  },
  {
    id: "toefl-read-02",
    type: "Reading",
    subcategory: "Vocabulary in Context",
    passageReference: "toefl-read-01",
    question: "The word 'minuscule' in paragraph 2 is closest in meaning to which of the following?",
    options: [
      { text: "Tiny or negligible", isCorrect: true },
      { text: "Hazardous", isCorrect: false },
      { text: "Fluctuating", isCorrect: false },
      { text: "Uncontrollable", isCorrect: false }
    ],
    explanation: "Kata 'minuscule' bermakna sangat kecil atau dapat diabaikan (extremely small / tiny). Dalam teks: 'emit minuscule greenhouse emissions compared to fossil fuel alternatives' berarti emisi yang dikeluarkan sangat amat sedikit dibandingkan bahan bakar fosil.",
    tips: "Trik Vocabulary in Context: Substitusikan pilihan kata ke dalam kalimat asli untuk mengecek kelogisan maknanya dalam konteks wacana."
  }
];
