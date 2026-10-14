/**
 * Mesin Analisis & Evaluasi Kelemahan (Adaptive Weakness Engine)
 * Menganalisis akurasi per subtopik, memetakan kelemahan kritis,
 * dan menghasilkan rekomendasi latihan terarah (Targeted Drills).
 */

import { Storage } from './storage.js';
import { CPNS_QUESTIONS } from './data/cpnsQuestions.js';
import { TOEFL_QUESTIONS } from './data/toeflQuestions.js';

export const Analytics = {
  // Ambil semua soal untuk pencarian cepat berdasarkan ID
  getAllQuestionsMap() {
    const map = new Map();
    [...CPNS_QUESTIONS, ...TOEFL_QUESTIONS].forEach(q => map.set(q.id, q));
    return map;
  },

  // Analisis Performa Menyeluruh
  generateFullReport() {
    const history = Storage.getHistory();
    const mistakes = Storage.getMistakes();
    const qMap = this.getAllQuestionsMap();

    // Data agregat per subkategori & per tipe
    const categoryStats = {
      TWK: { total: 0, correct: 0, subcategories: {} },
      TIU: { total: 0, correct: 0, subcategories: {} },
      TKP: { total: 0, totalScore: 0, maxScore: 0, subcategories: {} },
      Listening: { total: 0, correct: 0, subcategories: {} },
      Structure: { total: 0, correct: 0, subcategories: {} },
      Reading: { total: 0, correct: 0, subcategories: {} }
    };

    let totalQuestionsAttempted = 0;
    let totalCorrect = 0;

    // Loop semua riwayat jawaban
    history.forEach(test => {
      if (!test.answers) return;
      test.answers.forEach(ans => {
        totalQuestionsAttempted++;
        const type = ans.type;
        const sub = ans.subcategory || "Umum";

        if (!categoryStats[type]) {
          categoryStats[type] = { total: 0, correct: 0, subcategories: {} };
        }

        const cat = categoryStats[type];
        cat.total++;

        if (!cat.subcategories[sub]) {
          cat.subcategories[sub] = { total: 0, correct: 0, points: 0, wrongCount: 0 };
        }
        const subStat = cat.subcategories[sub];
        subStat.total++;

        if (type === "TKP") {
          cat.totalScore = (cat.totalScore || 0) + (ans.score || 0);
          cat.maxScore = (cat.maxScore || 0) + 5;
          subStat.points += (ans.score || 0);
          if (ans.score === 5) {
            cat.correct = (cat.correct || 0) + 1;
            subStat.correct++;
          } else {
            subStat.wrongCount++;
          }
        } else {
          if (ans.isCorrect) {
            totalCorrect++;
            cat.correct++;
            subStat.correct++;
          } else {
            subStat.wrongCount++;
          }
        }
      });
    });

    // Menghitung kelemahan spesifik per subkategori
    const subcategoryAnalysis = [];

    Object.entries(categoryStats).forEach(([catName, data]) => {
      Object.entries(data.subcategories).forEach(([subName, stat]) => {
        const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
        let status = "AMAN";
        let statusClass = "good";

        if (stat.total >= 1) {
          if (accuracy < 50) {
            status = "KRITIS";
            statusClass = "critical";
          } else if (accuracy < 75) {
            status = "PERLU LATIHAN";
            statusClass = "warning";
          } else {
            status = "MENGUASAI";
            statusClass = "mastered";
          }
        }

        subcategoryAnalysis.push({
          category: catName,
          subcategory: subName,
          total: stat.total,
          correct: stat.correct,
          wrong: stat.wrongCount,
          accuracy,
          status,
          statusClass
        });
      });
    });

    // Urutkan kelemahan dari yang paling parah (akurasi terendah dengan jumlah salah terbanyak)
    subcategoryAnalysis.sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
      return b.wrong - a.wrong;
    });

    // Subkategori kritis (<60%)
    const criticalWeaknesses = subcategoryAnalysis.filter(
      item => item.total >= 1 && item.accuracy < 65
    );

    // Hitung estimasi passing grade CPNS dan prediksi Skor TOEFL
    const cpnsEstimation = this.calculateCpnsPrediction(history);
    const toeflEstimation = this.calculateToeflPrediction(history);

    return {
      totalQuestionsAttempted,
      totalCorrect,
      overallAccuracy: totalQuestionsAttempted > 0 ? Math.round((totalCorrect / totalQuestionsAttempted) * 100) : 0,
      categoryStats,
      subcategoryAnalysis,
      criticalWeaknesses,
      cpnsEstimation,
      toeflEstimation,
      mistakeCount: Object.values(mistakes).filter(m => !m.isMastered).length
    };
  },

  // Perhitungan Prediksi SKD CPNS
  calculateCpnsPrediction(history) {
    const cpnsTests = history.filter(h => h.examType === "CPNS" || h.examType === "DIAGNOSTIC");
    if (cpnsTests.length === 0) {
      return {
        hasData: false,
        twkScore: 0,
        tiuScore: 0,
        tkpScore: 0,
        totalScore: 0,
        passedTwk: false,
        passedTiu: false,
        passedTkp: false,
        isQualified: false
      };
    }

    const latest = cpnsTests[0]; // Tes terbaru
    const twkScore = latest.scoreBreakdown?.twk || 0;
    const tiuScore = latest.scoreBreakdown?.tiu || 0;
    const tkpScore = latest.scoreBreakdown?.tkp || 0;
    const totalScore = twkScore + tiuScore + tkpScore;

    // Passing grade standar MenPAN-RB
    const passedTwk = twkScore >= 65;
    const passedTiu = tiuScore >= 80;
    const passedTkp = tkpScore >= 166;
    const isQualified = passedTwk && passedTiu && passedTkp;

    return {
      hasData: true,
      twkScore,
      tiuScore,
      tkpScore,
      totalScore,
      passedTwk,
      passedTiu,
      passedTkp,
      isQualified,
      date: latest.date
    };
  },

  // Perhitungan Prediksi Skor TOEFL (310 - 677)
  calculateToeflPrediction(history) {
    const toeflTests = history.filter(h => h.examType === "TOEFL" || h.examType === "DIAGNOSTIC");
    if (toeflTests.length === 0) {
      return {
        hasData: false,
        estimatedScore: 0,
        listeningScaled: 0,
        structureScaled: 0,
        readingScaled: 0
      };
    }

    const latest = toeflTests[0];
    const accList = latest.toeflAccuracy?.listening || 50;
    const accStruct = latest.toeflAccuracy?.structure || 50;
    const accRead = latest.toeflAccuracy?.reading || 50;

    // Konversi skala konversi standar TOEFL ITP (approx 31-68)
    const listeningScaled = Math.round(31 + (accList / 100) * 37);
    const structureScaled = Math.round(31 + (accStruct / 100) * 37);
    const readingScaled = Math.round(31 + (accRead / 100) * 36);

    const estimatedScore = Math.round(((listeningScaled + structureScaled + readingScaled) * 10) / 3);

    return {
      hasData: true,
      estimatedScore,
      listeningScaled,
      structureScaled,
      readingScaled,
      date: latest.date
    };
  },

  // Rekomendasi Latihan Terarah Spesifik (Targeted Adaptive Drill)
  generateAdaptiveDrill(targetCategory = null) {
    const report = this.generateFullReport();
    const mistakes = Storage.getMistakes();
    const qMap = this.getAllQuestionsMap();

    let candidateQuestions = [];

    // Prioritas 1: Soal dari subtopik kritis yang terdeteksi
    const weakestSubcategories = report.criticalWeaknesses.map(w => w.subcategory);

    // Ambil soal-soal yang sesuai
    const allQuestions = [...CPNS_QUESTIONS, ...TOEFL_QUESTIONS];

    allQuestions.forEach(q => {
      if (targetCategory && !this.isCategoryMatch(targetCategory, q.type, q.subcategory)) {
        return;
      }

      let priorityScore = 0;

      // Bobot 1: Apakah subtopiknya teridentifikasi lemah?
      if (weakestSubcategories.includes(q.subcategory)) {
        priorityScore += 10;
      }

      // Bobot 2: Apakah soal ini pernah dijawab salah oleh pengguna?
      if (mistakes[q.id] && !mistakes[q.id].isMastered) {
        priorityScore += 15 + (mistakes[q.id].wrongCount || 0) * 2;
      }

      // Bobot 3: Belum pernah dikerjakan sama sekali
      if (!mistakes[q.id]) {
        priorityScore += 5;
      }

      candidateQuestions.push({ question: q, priority: Math.max(1, priorityScore) });
    });

    // Urutkan berdasar prioritas tertinggi
    candidateQuestions.sort((a, b) => b.priority - a.priority);

    // Jika kandidat sedikit, sertakan soal dari pool yang relevan atau acak
    if (candidateQuestions.length < 5) {
      allQuestions.forEach(q => {
        if (!candidateQuestions.find(c => c.question.id === q.id)) {
          if (!targetCategory || this.isCategoryMatch(targetCategory, q.type, q.subcategory)) {
            candidateQuestions.push({ question: q, priority: 1 });
          }
        }
      });
    }

    // Fallback keamanan jika target filter tidak memiliki soal sama sekali
    if (candidateQuestions.length === 0) {
      allQuestions.slice(0, 10).forEach(q => {
        candidateQuestions.push({ question: q, priority: 1 });
      });
    }

    // Ambil maksimal 8-10 soal terfokus
    return candidateQuestions.slice(0, 10).map(c => c.question);
  },

  isCategoryMatch(filter, qType, subcategory) {
    if (!filter) return true;
    if (filter === "CPNS") return ["TWK", "TIU", "TKP"].includes(qType);
    if (filter === "TOEFL") return ["Listening", "Structure", "Reading"].includes(qType);
    if (subcategory && subcategory.toLowerCase() === filter.toLowerCase()) return true;
    return filter.toLowerCase() === qType.toLowerCase();
  }
};
