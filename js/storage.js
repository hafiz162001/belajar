/**
 * LocalStorage & State Management Engine
 * Menyimpan riwayat ujian, bank soal salah (mistake vault), catatan, dan statistik kelemahan.
 */

const STORAGE_KEYS = {
  HISTORY: "aptitude_test_history_v1",
  MISTAKES: "aptitude_mistake_bank_v1",
  PREFS: "aptitude_user_prefs_v1",
  BOOKMARKS: "aptitude_bookmarks_v1"
};

export const Storage = {
  // Ambil seluruh riwayat tes
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Gagal membaca riwayat tes:", e);
      return [];
    }
  },

  // Simpan hasil tes baru
  saveTestResult(result) {
    try {
      const history = this.getHistory();
      const entry = {
        id: "test-" + Date.now(),
        date: new Date().toISOString(),
        ...result
      };
      history.unshift(entry); // Terbaru di awal
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

      // Otomatis sinkronkan ke Bank Soal Salah
      if (result.answers && Array.isArray(result.answers)) {
        this.updateMistakeBankFromAnswers(result.answers);
      }

      return entry;
    } catch (e) {
      console.error("Gagal menyimpan hasil tes:", e);
    }
  },

  // Ambil Bank Soal Salah
  getMistakes() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Gagal membaca bank soal salah:", e);
      return {};
    }
  },

  // Perbarui Bank Soal Salah dari jawaban user
  updateMistakeBankFromAnswers(answers) {
    const mistakes = this.getMistakes();

    answers.forEach(ans => {
      const qId = ans.questionId;
      if (!mistakes[qId]) {
        mistakes[qId] = {
          questionId: qId,
          type: ans.type,
          subcategory: ans.subcategory,
          wrongCount: 0,
          correctCount: 0,
          lastAttempt: new Date().toISOString(),
          isMastered: false,
          notes: ""
        };
      }

      const item = mistakes[qId];
      item.lastAttempt = new Date().toISOString();

      // Logika benar vs salah
      const isFailed = (ans.type === "TKP" && ans.score < 5) || (!ans.isCorrect && ans.type !== "TKP");

      if (isFailed) {
        item.wrongCount = (item.wrongCount || 0) + 1;
        item.isMastered = false; // Reset status kuasai jika salah lagi
      } else {
        item.correctCount = (item.correctCount || 0) + 1;
        // Jika berhasil dijawab benar 2 kali berturut-turut, tandai dikuasai
        if (item.correctCount >= 2 && item.correctCount > item.wrongCount) {
          item.isMastered = true;
        }
      }
    });

    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  },

  // Simpan catatan evaluasi pengguna pada soal tertentu
  saveQuestionNote(questionId, noteText) {
    const mistakes = this.getMistakes();
    if (!mistakes[questionId]) {
      mistakes[questionId] = {
        questionId,
        wrongCount: 0,
        correctCount: 0,
        notes: noteText,
        lastAttempt: new Date().toISOString(),
        isMastered: false
      };
    } else {
      mistakes[questionId].notes = noteText;
    }
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
  },

  // Bookmarks / Tandai Soal Penting
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(questionId) {
    const bookmarks = this.getBookmarks();
    const idx = bookmarks.indexOf(questionId);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push(questionId);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return bookmarks.includes(questionId);
  },

  // Pengaturan preferensi pengguna
  getPrefs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFS);
      return data ? JSON.parse(data) : {
        theme: "light",
        userName: "Pejuang ASN & Scholar",
        targetCpns: { twk: 65, tiu: 80, tkp: 166 },
        targetToefl: 550
      };
    } catch (e) {
      return { theme: "light", userName: "Pejuang ASN & Scholar" };
    }
  },

  savePrefs(newPrefs) {
    const current = this.getPrefs();
    const updated = { ...current, ...newPrefs };
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(updated));
    return updated;
  },

  // Reset semua progres
  clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.MISTAKES);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  }
};
