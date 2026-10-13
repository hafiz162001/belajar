/**
 * AptitudePro - Main Application Controller
 * Mengatur antarmuka pengguna, navigasi tab, mesin simulasi ujian CAT CPNS & TOEFL,
 * generator adaptive drill, evaluasi kelemahan, dan audio listening simulator.
 */

import { CPNS_QUESTIONS } from './data/cpnsQuestions.js';
import { TOEFL_QUESTIONS } from './data/toeflQuestions.js';
import { STUDY_MATERIALS } from './data/materials.js';
import { Storage } from './storage.js';
import { Analytics } from './analytics.js';
import { AudioPlayer } from './audio.js';

class AppController {
  constructor() {
    this.currentView = "dashboard";
    this.examState = null;
    this.timerInterval = null;

    this.init();
  }

  init() {
    // Muat preferensi tema
    this.applyTheme(Storage.getPrefs().theme || "light");

    // Inisialisasi data contoh jika baru pertama kali buka agar ada gambaran evaluasi awal
    this.ensureInitialSeedData();

    // Event Listeners Navigasi
    this.setupNavigation();

    // Render Tampilan Awal
    this.renderDashboard();
    this.renderMaterials();

    // Hubungkan tombol-tombol utama
    this.bindGlobalActions();
  }

  // Jika riwayat kosong, buat 1 sesi diagnostic awal sehingga dashboard langsung memperlihatkan peta kelemahan nyata
  ensureInitialSeedData() {
    const history = Storage.getHistory();
    if (history.length === 0) {
      // Buat simulasi tes awal dengan beberapa salah di silogisme & inversion
      const initialDiagnostic = {
        examType: "DIAGNOSTIC",
        title: "Pemetaan Kelemahan Awal (Initial Diagnostic)",
        scoreBreakdown: { twk: 50, tiu: 45, tkp: 155 },
        toeflAccuracy: { listening: 66, structure: 40, reading: 50 },
        answers: [
          { questionId: "cpns-twk-01", type: "TWK", subcategory: "Pancasila", isCorrect: true },
          { questionId: "cpns-twk-02", type: "TWK", subcategory: "UUD 1945", isCorrect: false },
          { questionId: "cpns-tiu-01", type: "TIU", subcategory: "Deret Angka", isCorrect: true },
          { questionId: "cpns-tiu-02", type: "TIU", subcategory: "Silogisme", isCorrect: false },
          { questionId: "cpns-tiu-05", type: "TIU", subcategory: "Soal Cerita & Aritmatika", isCorrect: false },
          { questionId: "cpns-tkp-01", type: "TKP", subcategory: "Pelayanan Publik", score: 4 },
          { questionId: "cpns-tkp-02", type: "TKP", subcategory: "Teknologi Informasi & Komunikasi (TIK)", score: 5 },
          { questionId: "toefl-struct-01", type: "Structure", subcategory: "Inversion", isCorrect: false },
          { questionId: "toefl-struct-02", type: "Structure", subcategory: "Reduced Relative Clauses", isCorrect: false },
          { questionId: "toefl-struct-03", type: "Structure", subcategory: "Subject-Verb Agreement", isCorrect: true },
          { questionId: "toefl-list-01", type: "Listening", subcategory: "Short Dialogue (Part A)", isCorrect: true },
          { questionId: "toefl-list-02", type: "Listening", subcategory: "Idioms & Indirect Speech (Part A)", isCorrect: false },
          { questionId: "toefl-read-01", type: "Reading", subcategory: "Main Idea & Vocabulary", isCorrect: true },
          { questionId: "toefl-read-02", type: "Reading", subcategory: "Vocabulary in Context", isCorrect: false }
        ]
      };
      Storage.saveTestResult(initialDiagnostic);
    }
  }

  setupNavigation() {
    // Topnav & Sidenav View Buttons
    document.querySelectorAll(".w3-topnav-link, .w3-sidenav-link[data-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetView = btn.dataset.view;
        if (targetView) this.switchView(targetView);
      });
    });

    // Sidenav links with specific actions or drills
    document.querySelectorAll(".w3-sidenav-link").forEach(btn => {
      btn.addEventListener("click", () => {
        // Highlight active link
        document.querySelectorAll(".w3-sidenav-link").forEach(l => l.classList.remove("active"));
        btn.classList.add("active");

        if (btn.dataset.action === "diagnostic") {
          this.startStandardExam("DIAGNOSTIC");
        } else if (btn.dataset.drill) {
          this.startAdaptiveDrill(btn.dataset.drill);
        } else if (btn.dataset.material) {
          this.switchView("materials");
          const matInput = document.getElementById("materials-search-input");
          if (matInput) {
            matInput.value = btn.dataset.material;
            this.renderMaterials(btn.dataset.material.toLowerCase());
          }
        }
      });
    });

    // Sidenav Real-Time Filter
    const filterSidenav = document.getElementById("filter-sidenav");
    if (filterSidenav) {
      filterSidenav.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        document.querySelectorAll(".w3-sidenav-link").forEach(link => {
          const text = link.textContent.toLowerCase();
          const match = text.includes(query);
          link.style.display = match ? "block" : "none";
        });
        document.querySelectorAll(".w3-sidenav-section").forEach(sec => {
          const visibleLinks = sec.querySelectorAll(".w3-sidenav-link:not([style*='display: none'])");
          sec.style.display = (visibleLinks.length > 0 || query === "") ? "block" : "none";
        });
      });
    }

    // Topnav Global Search
    const globalSearch = document.getElementById("w3-global-search");
    if (globalSearch) {
      globalSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.handleGlobalSearch();
        }
      });
    }

    // Mobile Sidenav Toggle
    const mobileToggle = document.getElementById("w3-mobile-toggle");
    const sidenav = document.getElementById("w3-sidenav");
    if (mobileToggle && sidenav) {
      mobileToggle.addEventListener("click", () => {
        sidenav.classList.toggle("open");
      });
    }

    // Theme toggle button
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = Storage.getPrefs().theme;
        const next = current === "light" ? "dark" : "light";
        this.applyTheme(next);
        Storage.savePrefs({ theme: next });
      });
    }

    // Modal close
    const modalClose = document.getElementById("modal-close-btn");
    const modalOverlay = document.getElementById("material-modal");
    if (modalClose && modalOverlay) {
      modalClose.addEventListener("click", () => {
        modalOverlay.style.display = "none";
      });
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) modalOverlay.style.display = "none";
      });
    }

    // Pencarian Klinik Materi
    const matSearchInput = document.getElementById("materials-search-input");
    if (matSearchInput) {
      matSearchInput.addEventListener("input", (e) => {
        this.renderMaterials(e.target.value.trim().toLowerCase());
      });
    }

    // Keyboard Shortcuts untuk Simulasi CAT & Quiz
    window.addEventListener("keydown", (e) => {
      if (this.currentView !== "quiz-active" || !this.examState) return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

      const key = e.key.toLowerCase();
      if (key === "arrowleft") {
        e.preventDefault();
        this.navigateQuestion(-1);
      } else if (key === "arrowright") {
        e.preventDefault();
        this.navigateQuestion(1);
      } else if (key === "r") {
        e.preventDefault();
        this.toggleCurrentFlag();
      } else if (key === "a" || key === "1") {
        this.selectOption(0);
      } else if (key === "b" || key === "2") {
        this.selectOption(1);
      } else if (key === "c" || key === "3") {
        this.selectOption(2);
      } else if (key === "d" || key === "4") {
        this.selectOption(3);
      } else if (key === "e" || key === "5") {
        this.selectOption(4);
      }
    });
  }

  handleGlobalSearch() {
    const input = document.getElementById("w3-global-search");
    if (!input || !input.value.trim()) return;
    const q = input.value.trim().toLowerCase();
    this.switchView("materials");
    const matInput = document.getElementById("materials-search-input");
    if (matInput) matInput.value = q;
    this.renderMaterials(q);
  }

  navigatePreviousView() {
    const order = ["dashboard", "exams", "drill", "mistakes", "materials"];
    const idx = order.indexOf(this.currentView);
    if (idx > 0) {
      this.switchView(order[idx - 1]);
    } else {
      this.switchView(order[order.length - 1]);
    }
  }

  navigateNextView() {
    const order = ["dashboard", "exams", "drill", "mistakes", "materials"];
    const idx = order.indexOf(this.currentView);
    if (idx !== -1 && idx < order.length - 1) {
      this.switchView(order[idx + 1]);
    } else {
      this.switchView(order[0]);
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      themeIcon.innerHTML = theme === "light" 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    AudioPlayer.stop();

    // Update Topnav & Sidenav active items
    document.querySelectorAll(".w3-topnav-link").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });
    document.querySelectorAll(".w3-sidenav-link[data-view]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });

    // Close mobile drawer if open
    const sidenav = document.getElementById("w3-sidenav");
    if (sidenav) sidenav.classList.remove("open");

    // Toggle views
    const views = [
      "dashboard-view",
      "exams-view",
      "drill-view",
      "mistakes-view",
      "materials-view",
      "quiz-active-view",
      "result-screen-view"
    ];

    views.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (id === `${viewName}-view`) ? "block" : "none";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (viewName === "dashboard") this.renderDashboard();
    if (viewName === "mistakes") this.renderMistakesView();
    if (viewName === "materials") this.renderMaterials();
    if (viewName === "drill") this.renderDrillCenter();
  }

  bindGlobalActions() {
    // Tombol Cepat: Mulai Adaptive Drill dari Banner
    const bannerDrillBtn = document.getElementById("btn-drill-banner");
    if (bannerDrillBtn) {
      bannerDrillBtn.addEventListener("click", () => {
        this.startAdaptiveDrill();
      });
    }

    // Tombol Mulai Simulasi Ujian
    document.querySelectorAll(".btn-start-exam-card").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const type = btn.dataset.examType;
        this.startStandardExam(type);
      });
    });

    // Reset Data button
    const resetBtn = document.getElementById("btn-reset-data");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset seluruh data riwayat ujian dan bank soal salah?")) {
          Storage.clearAllData();
          this.ensureInitialSeedData();
          this.renderDashboard();
          alert("Data berhasil direset.");
        }
      });
    }
  }

  // ====================================================================
  // Render: Dashboard & Evaluasi Kelemahan
  // ====================================================================
  renderDashboard() {
    const report = Analytics.generateFullReport();

    // 1. Alert Banner Kelemahan
    const bannerEl = document.getElementById("weakness-alert-banner");
    const bannerTextEl = document.getElementById("alert-weakness-text");

    if (report.criticalWeaknesses.length > 0) {
      bannerEl.style.display = "block";
      const topWeaknesses = report.criticalWeaknesses.slice(0, 3).map(w => 
        `<span class="tag-highlight" style="background: var(--status-critical-bg); color: var(--status-critical-text); padding: 2px 6px; border-radius: 3px; font-weight: 700;">${w.category}: ${w.subcategory} (${w.accuracy}%)</span>`
      ).join(" ");
      bannerTextEl.innerHTML = `Terdeteksi <strong>${report.criticalWeaknesses.length} kelemahan kritis</strong> yang menghambat passing grade Anda: ${topWeaknesses}.`;
    } else {
      bannerEl.style.display = "none";
    }

    // 2. Metrics Cards
    const mCpnsVal = document.getElementById("metric-cpns-val");
    const mCpnsBadge = document.getElementById("metric-cpns-badge");
    const mToeflVal = document.getElementById("metric-toefl-val");
    const mToeflBadge = document.getElementById("metric-toefl-badge");
    const mAccVal = document.getElementById("metric-acc-val");
    const mMistakesVal = document.getElementById("metric-mistakes-val");

    if (report.cpnsEstimation.hasData) {
      mCpnsVal.textContent = report.cpnsEstimation.totalScore;
      if (report.cpnsEstimation.isQualified) {
        mCpnsBadge.className = "badge-tag pass";
        mCpnsBadge.textContent = "MEMENUHI PG (65/80/166)";
      } else {
        mCpnsBadge.className = "badge-tag fail";
        mCpnsBadge.textContent = "BELUM LOLOS PG";
      }
    } else {
      mCpnsVal.textContent = "-";
      mCpnsBadge.textContent = "Belum Ada Tes";
    }

    if (report.toeflEstimation.hasData) {
      mToeflVal.textContent = report.toeflEstimation.estimatedScore;
      mToeflBadge.textContent = report.toeflEstimation.estimatedScore >= 550 ? "Target 550+ Tercapai" : "Di Bawah Target";
      mToeflBadge.className = report.toeflEstimation.estimatedScore >= 550 ? "badge-tag pass" : "badge-tag warning";
    } else {
      mToeflVal.textContent = "-";
      mToeflBadge.textContent = "Belum Ada Tes";
    }

    mAccVal.textContent = `${report.overallAccuracy}%`;
    mMistakesVal.textContent = report.mistakeCount;

    // 3. Subcategory Weakness List
    const weaknessListContainer = document.getElementById("subcat-weakness-list");
    if (weaknessListContainer) {
      if (report.subcategoryAnalysis.length === 0) {
        weaknessListContainer.innerHTML = `<p style="color: var(--text-muted); padding: 16px;">Belum ada data evaluasi. Ikuti tes simulasi atau diagnostic untuk memulai evaluasi!</p>`;
      } else {
        weaknessListContainer.innerHTML = report.subcategoryAnalysis.map(item => `
          <div class="weakness-item-card">
            <div class="subcat-meta">
              <div class="subcat-title-row">
                <span class="cat-pill">${item.category}</span>
                <span class="subcat-name">${item.subcategory}</span>
                <span class="badge-tag ${item.statusClass === 'critical' ? 'fail' : (item.statusClass === 'warning' ? 'warning' : 'pass')}">${item.status}</span>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill ${item.statusClass}" style="width: ${item.accuracy}%"></div>
              </div>
            </div>
            <div class="subcat-stats-row">
              <div>
                <div class="accuracy-num ${item.statusClass}">${item.accuracy}%</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${item.correct}/${item.total} Benar</div>
              </div>
              <button class="btn-drill-single" data-subcat="${item.subcategory}" data-category="${item.category}">
                Latih Ini
              </button>
            </div>
          </div>
        `).join("");

        // Event listener drill satuan
        weaknessListContainer.querySelectorAll(".btn-drill-single").forEach(b => {
          b.addEventListener("click", () => {
            this.startDrillForSubcategory(b.dataset.subcat, b.dataset.category);
          });
        });
      }
    }

    // 4. Category Breakdown Radial Gauges
    const catGaugesContainer = document.getElementById("category-gauges-grid");
    if (catGaugesContainer) {
      const cats = [
        { name: "TWK", benchmark: "PG 65" },
        { name: "TIU", benchmark: "PG 80" },
        { name: "TKP", benchmark: "PG 166" },
        { name: "Listening", benchmark: "Sec. 1" },
        { name: "Structure", benchmark: "Sec. 2" },
        { name: "Reading", benchmark: "Sec. 3" }
      ];
      catGaugesContainer.innerHTML = cats.map(item => {
        const c = item.name;
        const stat = report.categoryStats[c];
        const acc = stat && stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
        const color = acc < 50 ? 'var(--status-critical)' : (acc < 75 ? 'var(--status-warning)' : 'var(--status-good)');
        return `
          <div class="cat-box">
            <div class="cat-box-header">
              <h4>${c}</h4>
              <span class="cat-benchmark-tag">${item.benchmark}</span>
            </div>
            <div class="cat-gauge-wrap">
              <svg class="radial-gauge" viewBox="0 0 36 36">
                <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path class="gauge-bar" stroke-dasharray="${acc}, 100" style="stroke: ${color};" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              </svg>
              <div class="cat-gauge-val" style="color: ${color};">
                ${stat && stat.total > 0 ? `${acc}%` : '0%'}
              </div>
            </div>
            <div class="cat-box-footer">
              ${stat && stat.total > 0 ? `${stat.correct}/${stat.total} Benar` : '0 Soal'}
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // ====================================================================
  // Drill Center View
  // ====================================================================
  renderDrillCenter() {
    const report = Analytics.generateFullReport();
    const container = document.getElementById("drill-recommendations-list");
    if (!container) return;

    if (report.criticalWeaknesses.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px; background: var(--bg-surface); border-radius: var(--radius-md);">
          <h3 style="color: var(--status-good); margin-bottom: 8px;">Semua Topik Terpantau Stabil!</h3>
          <p style="color: var(--text-muted); margin-bottom: 16px;">Tidak ada subtopik dengan akurasi kritis saat ini. Anda dapat mengerjakan drill campuran untuk menjaga ketajaman.</p>
          <button class="btn-primary" id="btn-drill-mix" style="margin: 0 auto;">Mulai Drill Campuran</button>
        </div>
      `;
      const mixBtn = document.getElementById("btn-drill-mix");
      if (mixBtn) mixBtn.addEventListener("click", () => this.startAdaptiveDrill());
      return;
    }

    container.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="color: var(--text-secondary); margin-bottom: 12px;">Sistem adaptif merekomendasikan sesi drill terfokus berikut untuk mendongkrak skor Anda:</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${report.criticalWeaknesses.map(w => `
          <div class="weakness-item-card" style="border-left: 4px solid var(--status-critical);">
            <div class="subcat-meta">
              <div class="subcat-title-row">
                <span class="cat-pill">${w.category}</span>
                <span class="subcat-name">${w.subcategory}</span>
                <span class="badge-tag fail">Akurasi ${w.accuracy}%</span>
              </div>
              <p style="font-size: 0.84rem; color: var(--text-secondary);">
                ${w.wrong} kali salah dari total ${w.total} percobaan soal.
              </p>
            </div>
            <button class="btn-primary btn-start-custom-drill" data-subcat="${w.subcategory}" data-category="${w.category}">
              Fokus Latih Sekarang
            </button>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".btn-start-custom-drill").forEach(b => {
      b.addEventListener("click", () => {
        this.startDrillForSubcategory(b.dataset.subcat, b.dataset.category);
      });
    });
  }

  // ====================================================================
  // Mistake Vault View (Bank Soal Salah)
  // ====================================================================
  renderMistakesView() {
    const mistakes = Storage.getMistakes();
    const qMap = Analytics.getAllQuestionsMap();
    const container = document.getElementById("mistakes-items-container");
    const countBadge = document.getElementById("mistakes-count-badge");

    const mistakeList = Object.values(mistakes).filter(m => !m.isMastered);
    if (countBadge) countBadge.textContent = `${mistakeList.length} Soal Perlu Perbaikan`;

    if (!container) return;

    if (mistakeList.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 48px; background: var(--bg-surface); border-radius: var(--radius-lg);">
          <h3 style="color: var(--status-good); font-size: 1.3rem; margin-bottom: 8px;">Bank Soal Salah Kosong!</h3>
          <p style="color: var(--text-muted);">Luar biasa! Anda telah menguasai semua soal atau belum ada soal yang dijawab salah.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = mistakeList.map(item => {
      const q = qMap.get(item.questionId);
      if (!q) return "";

      return `
        <div class="question-card" style="margin-bottom: 20px;">
          <div class="question-header">
            <div>
              <span class="cat-pill">${q.type}</span>
              <span class="q-subtopic-tag" style="margin-left: 8px;">${q.subcategory}</span>
            </div>
            <div>
              <span class="badge-tag fail">${item.wrongCount}x Salah</span>
            </div>
          </div>
          <div class="question-text">${q.question}</div>
          <div class="drill-feedback-card incorrect" style="margin: 0;">
            <div class="feedback-badge">Pembahasan Ringkas:</div>
            <div class="feedback-explanation">${q.explanation}</div>
            ${q.tips ? `<div class="feedback-tip-box"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: -2px; margin-right: 4px; color: #d97706;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><strong>Tips Cepat:</strong> ${q.tips}</div>` : ''}
          </div>
          <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div style="flex: 1; max-width: 60%;">
              <input type="text" class="input-note" data-qid="${q.id}" placeholder="Tulis catatan evaluasi / kenapa salah di sini..." 
                value="${item.notes || ''}" 
                style="width: 100%; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-primary); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.85rem;" />
            </div>
            <button class="btn-primary btn-retest-single" data-qid="${q.id}">
              Uji Ulang Soal Ini
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Event listener input note
    container.querySelectorAll(".input-note").forEach(input => {
      input.addEventListener("change", (e) => {
        Storage.saveQuestionNote(e.target.dataset.qid, e.target.value);
      });
    });

    // Event listener uji ulang
    container.querySelectorAll(".btn-retest-single").forEach(b => {
      b.addEventListener("click", () => {
        const q = qMap.get(b.dataset.qid);
        if (q) this.startSingleQuestionDrill(q);
      });
    });
  }

  // ====================================================================
  // Study Materials View
  // ====================================================================
  renderMaterials(query = "") {
    const cpnsContainer = document.getElementById("materials-cpns-grid");
    const toeflContainer = document.getElementById("materials-toefl-grid");

    const filterFn = (mat) => {
      if (!query) return true;
      return (
        mat.title.toLowerCase().includes(query) ||
        mat.summary.toLowerCase().includes(query) ||
        mat.category.toLowerCase().includes(query) ||
        mat.content.toLowerCase().includes(query)
      );
    };

    const cpnsList = STUDY_MATERIALS.cpns.filter(filterFn);
    const toeflList = STUDY_MATERIALS.toefl.filter(filterFn);

    if (cpnsContainer) {
      if (cpnsList.length === 0) {
        cpnsContainer.innerHTML = `<p style="color: var(--text-muted); padding: 12px; grid-column: span 2;">Tidak ditemukan materi CPNS yang cocok dengan kata kunci "${query}".</p>`;
      } else {
        cpnsContainer.innerHTML = cpnsList.map(mat => `
          <div class="material-card" data-mat-id="${mat.id}" data-category="cpns">
            <div class="material-card-header">
              <span class="cat-pill">${mat.category}</span>
              <span class="badge-tag warning">${mat.badge}</span>
            </div>
            <h3>${mat.title}</h3>
            <p>${mat.summary}</p>
          </div>
        `).join("");
      }
    }

    if (toeflContainer) {
      if (toeflList.length === 0) {
        toeflContainer.innerHTML = `<p style="color: var(--text-muted); padding: 12px; grid-column: span 2;">Tidak ditemukan materi TOEFL yang cocok dengan kata kunci "${query}".</p>`;
      } else {
        toeflContainer.innerHTML = toeflList.map(mat => `
          <div class="material-card" data-mat-id="${mat.id}" data-category="toefl">
            <div class="material-card-header">
              <span class="cat-pill">${mat.category}</span>
              <span class="badge-tag warning">${mat.badge}</span>
            </div>
            <h3>${mat.title}</h3>
            <p>${mat.summary}</p>
          </div>
        `).join("");
      }
    }

    // Modal click bindings
    document.querySelectorAll(".material-card").forEach(card => {
      card.addEventListener("click", () => {
        const matId = card.dataset.matId;
        const cat = card.dataset.category;
        const pool = cat === "cpns" ? STUDY_MATERIALS.cpns : STUDY_MATERIALS.toefl;
        const item = pool.find(m => m.id === matId);
        if (item) this.openMaterialModal(item);
      });
    });
  }

  openMaterialModal(item) {
    const modal = document.getElementById("material-modal");
    const titleEl = document.getElementById("modal-material-title");
    const catEl = document.getElementById("modal-material-cat");
    const contentEl = document.getElementById("modal-material-content");

    if (!modal) return;
    titleEl.textContent = item.title;
    catEl.textContent = `${item.category} • ${item.badge}`;

    // Format simple markdown into HTML
    const formattedHtml = item.content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n\n/gim, '<br><br>');

    contentEl.innerHTML = formattedHtml;
    modal.style.display = "flex";
  }

  // ====================================================================
  // Exam & Quiz Engine Execution
  // ====================================================================
  startStandardExam(type) {
    let questions = [];
    let durationSeconds = 600; // 10 menit default
    let isInstantFeedback = false;

    if (type === "CPNS") {
      questions = [...CPNS_QUESTIONS];
      durationSeconds = 100 * 60; // 100 menit standar SKD
    } else if (type === "TOEFL") {
      questions = [...TOEFL_QUESTIONS];
      durationSeconds = 60 * 60; // 60 menit
    } else if (type === "DIAGNOSTIC") {
      // Diagnostic cepat: 12 soal acak campuran
      const all = [...CPNS_QUESTIONS, ...TOEFL_QUESTIONS];
      questions = all.sort(() => 0.5 - Math.random()).slice(0, 10);
      durationSeconds = 15 * 60; // 15 menit
    }

    this.initExamSession({
      examType: type,
      title: type === "CPNS" ? "Simulasi CAT SKD CPNS" : (type === "TOEFL" ? "Simulasi TOEFL ITP Test" : "Tes Diagnostik Cepat"),
      questions,
      durationSeconds,
      isInstantFeedback
    });
  }

  startAdaptiveDrill(topic) {
    if (topic) {
      const all = [...CPNS_QUESTIONS, ...TOEFL_QUESTIONS];
      let questions = all.filter(q => q.subcategory === topic || q.type === topic);
      if (questions.length > 0) {
        return this.initExamSession({
          examType: "DRILL",
          title: `Smart Drill: ${topic}`,
          questions: questions.slice(0, 10),
          durationSeconds: 15 * 60,
          isInstantFeedback: true
        });
      }
    }
    const questions = Analytics.generateAdaptiveDrill();
    this.initExamSession({
      examType: "DRILL",
      title: "Smart Drill: Perbaikan Kelemahan Kritis",
      questions,
      durationSeconds: 15 * 60,
      isInstantFeedback: true
    });
  }

  startDrillForSubcategory(subcategory, category) {
    const all = [...CPNS_QUESTIONS, ...TOEFL_QUESTIONS];
    let questions = all.filter(q => q.subcategory === subcategory);
    if (questions.length === 0) questions = all.filter(q => q.type === category);

    this.initExamSession({
      examType: "DRILL",
      title: `⚡ Drill Terarah: ${subcategory}`,
      questions,
      durationSeconds: 10 * 60,
      isInstantFeedback: true
    });
  }

  startSingleQuestionDrill(question) {
    this.initExamSession({
      examType: "DRILL",
      title: `Uji Ulang: ${question.subcategory}`,
      questions: [question],
      durationSeconds: 5 * 60,
      isInstantFeedback: true
    });
  }

  initExamSession({ examType, title, questions, durationSeconds, isInstantFeedback }) {
    if (!questions || questions.length === 0) {
      alert("Tidak ada soal tersedia untuk kategori ini.");
      return;
    }

    this.examState = {
      examType,
      title,
      questions,
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      flags: new Array(questions.length).fill(false),
      timeRemaining: durationSeconds,
      isInstantFeedback,
      startTime: Date.now()
    };

    // Tampilkan View Quiz
    this.switchView("quiz-active");

    const titleBadge = document.getElementById("quiz-session-title");
    if (titleBadge) titleBadge.textContent = title;

    // Mulai Timer
    this.startTimer();

    // Render Soal Pertama & Grid Navigasi
    this.renderQuestion(0);
    this.renderCatNavigationGrid();

    // Bind event tombol aksi quiz
    const btnNext = document.getElementById("btn-next-question");
    const btnPrev = document.getElementById("btn-prev-question");
    const btnFinish = document.getElementById("btn-finish-quiz");
    const btnFlag = document.getElementById("btn-toggle-flag");

    if (btnNext) btnNext.onclick = () => this.navigateQuestion(1);
    if (btnPrev) btnPrev.onclick = () => this.navigateQuestion(-1);
    if (btnFlag) btnFlag.onclick = () => this.toggleCurrentFlag();
    if (btnFinish) btnFinish.onclick = () => {
      this.promptFinishConfirmation();
    };
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById("quiz-timer-display");

    const updateTimer = () => {
      if (!this.examState) return;

      const mins = Math.floor(this.examState.timeRemaining / 60);
      const secs = this.examState.timeRemaining % 60;
      if (timerDisplay) {
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        if (this.examState.timeRemaining < 180) {
          timerDisplay.parentElement.classList.add("urgent");
        } else {
          timerDisplay.parentElement.classList.remove("urgent");
        }
      }

      if (this.examState.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        alert("Waktu ujian telah habis!");
        this.finishExamSession();
      } else {
        this.examState.timeRemaining--;
      }
    };

    updateTimer();
    this.timerInterval = setInterval(updateTimer, 1000);
  }

  renderQuestion(index) {
    if (!this.examState) return;
    this.examState.currentIndex = index;
    const q = this.examState.questions[index];
    const totalQ = this.examState.questions.length;

    // Hentikan audio sebelumnya jika ada
    AudioPlayer.stop();

    // Update Header Pill
    const numPill = document.getElementById("q-number-pill");
    const tagEl = document.getElementById("q-subtopic-tag");
    if (numPill) numPill.textContent = `Soal ${index + 1} dari ${totalQ}`;
    if (tagEl) tagEl.textContent = `${q.type} • ${q.subcategory}`;

    // Render Audio Player jika soal Listening
    const audioCard = document.getElementById("audio-player-container");
    if (audioCard) {
      if (q.speakerDialogue && Array.isArray(q.speakerDialogue)) {
        audioCard.style.display = "block";
        audioCard.innerHTML = `
          <div class="audio-player-card">
            <div class="audio-player-controls">
              <button class="btn-audio-play" id="btn-play-listening">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Putar Audio Dialog</span>
              </button>
              <div class="audio-wave-anim" id="audio-wave-indicator">
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
              </div>
              <button class="btn-secondary" id="btn-toggle-transcript" style="font-size: 0.78rem; padding: 6px 12px;">
                Tampilkan Naskah
              </button>
            </div>
            <div class="audio-transcript-box" id="audio-transcript-box" style="display: none;">
              ${q.speakerDialogue.map(d => `<div class="speaker-line"><span class="speaker-name">${d.speaker}:</span> "${d.text}"</div>`).join("")}
            </div>
          </div>
        `;

        const playBtn = document.getElementById("btn-play-listening");
        const wave = document.getElementById("audio-wave-indicator");
        const transcriptBtn = document.getElementById("btn-toggle-transcript");
        const transcriptBox = document.getElementById("audio-transcript-box");

        if (playBtn) {
          playBtn.onclick = () => {
            if (AudioPlayer.isPlaying) {
              AudioPlayer.stop();
              playBtn.querySelector("span").textContent = "Putar Audio Dialog";
              wave.classList.remove("playing");
            } else {
              wave.classList.add("playing");
              playBtn.querySelector("span").textContent = "Berhenti";
              AudioPlayer.playDialogue(q.speakerDialogue, () => {
                wave.classList.remove("playing");
                playBtn.querySelector("span").textContent = "Putar Ulang Audio";
              });
            }
          };
        }

        if (transcriptBtn && transcriptBox) {
          transcriptBtn.onclick = () => {
            const isVisible = transcriptBox.style.display === "block";
            transcriptBox.style.display = isVisible ? "none" : "block";
            transcriptBtn.textContent = isVisible ? "Tampilkan Naskah" : "Sembunyikan Naskah";
          };
        }
      } else {
        audioCard.style.display = "none";
      }
    }

    // Render Reading Passage jika ada
    const passageCard = document.getElementById("passage-container");
    if (passageCard) {
      if (q.passage) {
        passageCard.style.display = "block";
        passageCard.innerHTML = `<div class="reading-passage-box"><strong>Passage:</strong><br>${q.passage}</div>`;
      } else {
        passageCard.style.display = "none";
      }
    }

    // Question Text
    const qTextEl = document.getElementById("question-text-el");
    if (qTextEl) {
      if (q.isErrorRecognition && q.sentenceParts) {
        // Format soal error recognition TOEFL
        qTextEl.innerHTML = q.sentenceParts.map(part => {
          if (part.part) {
            return `<u style="text-decoration: underline; font-weight: 700; color: var(--accent-cyan);">[${part.part}] ${part.text}</u>`;
          }
          return part.text;
        }).join("");
      } else {
        qTextEl.textContent = q.question;
      }
    }

    // Options List
    const optionsContainer = document.getElementById("options-list-container");
    const currentAnswer = this.examState.answers[index];

    if (optionsContainer) {
      const keys = ["A", "B", "C", "D", "E"];
      optionsContainer.innerHTML = q.options.map((opt, i) => {
        const isSelected = currentAnswer && currentAnswer.selectedIndex === i;
        return `
          <div class="option-item ${isSelected ? 'selected' : ''}" data-opt-index="${i}">
            <div class="option-key">${keys[i]}</div>
            <div class="option-text">${opt.text}</div>
          </div>
        `;
      }).join("");

      optionsContainer.querySelectorAll(".option-item").forEach(item => {
        item.addEventListener("click", () => {
          const optIdx = parseInt(item.dataset.optIndex, 10);
          this.selectOption(optIdx);
        });
      });
    }

    // Instant Feedback Card (Hanya jika mode Drill dan sudah dijawab)
    const feedbackContainer = document.getElementById("instant-feedback-container");
    if (feedbackContainer) {
      if (this.examState.isInstantFeedback && currentAnswer) {
        feedbackContainer.style.display = "block";
        const isCorrect = currentAnswer.isCorrect;
        feedbackContainer.innerHTML = `
          <div class="drill-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="feedback-badge">
              ${isCorrect 
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Jawaban Anda Tepat!`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Jawaban Anda Kurang Tepat`}
            </div>
            <div class="feedback-explanation">
              <strong>Pembahasan:</strong> ${q.explanation}
            </div>
            ${q.tips ? `<div class="feedback-tip-box"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: -2px; margin-right: 4px; color: #d97706;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><strong>Kunci & Tips Cepat:</strong> ${q.tips}</div>` : ''}
          </div>
        `;
      } else {
        feedbackContainer.style.display = "none";
      }
    }

    // Update tombol Navigasi
    const btnPrev = document.getElementById("btn-prev-question");
    const btnNext = document.getElementById("btn-next-question");
    if (btnPrev) btnPrev.style.visibility = index === 0 ? "hidden" : "visible";
    if (btnNext) {
      btnNext.innerHTML = index === totalQ - 1 
        ? `Selesai Ujian <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>` 
        : `Selanjutnya <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    }

    // Update CAT sidebar
    this.updateCatNavigationGrid();
  }

  selectOption(optIndex) {
    if (!this.examState) return;
    const curIdx = this.examState.currentIndex;
    const q = this.examState.questions[curIdx];
    const selectedOpt = q.options[optIndex];

    let isCorrect = false;
    let score = 0;

    if (q.type === "TKP") {
      score = selectedOpt.score || 1;
      isCorrect = score === 5;
    } else {
      isCorrect = selectedOpt.isCorrect === true;
      score = isCorrect ? 5 : 0;
    }

    this.examState.answers[curIdx] = {
      questionId: q.id,
      type: q.type,
      subcategory: q.subcategory,
      selectedIndex: optIndex,
      isCorrect,
      score,
      answeredAt: Date.now()
    };

    // Re-render soal untuk memperbarui highlight dan instant feedback
    this.renderQuestion(curIdx);
  }

  navigateQuestion(delta) {
    if (!this.examState) return;
    const nextIdx = this.examState.currentIndex + delta;
    if (nextIdx >= 0 && nextIdx < this.examState.questions.length) {
      this.renderQuestion(nextIdx);
    } else if (nextIdx >= this.examState.questions.length) {
      // Tombol Selesai di soal terakhir
      this.finishExamSession();
    }
  }

  renderCatNavigationGrid() {
    const container = document.getElementById("cat-grid-buttons");
    if (!container || !this.examState) return;

    container.innerHTML = this.examState.questions.map((_, i) => `
      <button class="q-grid-btn" data-q-index="${i}">
        ${i + 1}
      </button>
    `).join("");

    container.querySelectorAll(".q-grid-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.qIndex, 10);
        this.renderQuestion(idx);
      });
    });

    this.updateCatNavigationGrid();
  }

  toggleCurrentFlag() {
    if (!this.examState) return;
    const curIdx = this.examState.currentIndex;
    this.examState.flags[curIdx] = !this.examState.flags[curIdx];
    this.updateCatNavigationGrid();
  }

  updateCatNavigationGrid() {
    if (!this.examState) return;
    const curIdx = this.examState.currentIndex;
    const isCurFlagged = !!this.examState.flags[curIdx];
    const flagBtn = document.getElementById("btn-toggle-flag");
    const flagText = document.getElementById("btn-flag-text");
    if (flagBtn) {
      flagBtn.classList.toggle("flagged", isCurFlagged);
      if (flagText) flagText.textContent = isCurFlagged ? "Ragu-ragu ✓" : "Ragu-ragu";
    }

    const buttons = document.querySelectorAll(".q-grid-btn");
    buttons.forEach((btn, i) => {
      const isAnswered = !!this.examState.answers[i];
      const isActive = i === this.examState.currentIndex;
      const isFlagged = !!this.examState.flags[i];

      btn.classList.toggle("active", isActive);
      btn.classList.toggle("answered", isAnswered && !isActive);
      btn.classList.toggle("flagged", isFlagged);
    });
  }

  promptFinishConfirmation() {
    if (!this.examState) return;
    const total = this.examState.questions.length;
    let answered = 0;
    let flagged = 0;
    for (let i = 0; i < total; i++) {
      if (this.examState.answers[i]) answered++;
      if (this.examState.flags[i]) flagged++;
    }
    const unanswered = total - answered;

    const modal = document.getElementById("finish-confirm-modal");
    const statsBox = document.getElementById("finish-stats-box");
    const cancelBtn = document.getElementById("btn-cancel-finish");
    const confirmBtn = document.getElementById("btn-confirm-finish");

    if (modal && statsBox) {
      statsBox.innerHTML = `
        <div style="background: var(--status-good-bg); border: 1px solid var(--status-good-border); padding: 12px; border-radius: var(--radius-sm);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--status-good-text);">${answered}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">Dijawab</div>
        </div>
        <div style="background: var(--status-warning-bg); border: 1px solid var(--status-warning-border); padding: 12px; border-radius: var(--radius-sm);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--status-warning-text);">${flagged}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">Ragu-ragu</div>
        </div>
        <div style="background: var(--status-critical-bg); border: 1px solid var(--status-critical-border); padding: 12px; border-radius: var(--radius-sm);">
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--status-critical-text);">${unanswered}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted); font-weight: 600;">Kosong</div>
        </div>
      `;
      modal.style.display = "flex";

      if (cancelBtn) cancelBtn.onclick = () => { modal.style.display = "none"; };
      if (confirmBtn) confirmBtn.onclick = () => {
        modal.style.display = "none";
        this.finishExamSession();
      };
    } else {
      if (confirm(`Selesaikan ujian?\nDijawab: ${answered}\nRagu-ragu: ${flagged}\nKosong: ${unanswered}`)) {
        this.finishExamSession();
      }
    }
  }

  finishExamSession() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    AudioPlayer.stop();

    const state = this.examState;
    if (!state) return;

    // Hitung perincian skor
    let twkTotal = 0;
    let tiuTotal = 0;
    let tkpTotal = 0;

    let listCorrect = 0, listTotal = 0;
    let structCorrect = 0, structTotal = 0;
    let readCorrect = 0, readTotal = 0;

    const answersRecord = state.answers.map((ans, i) => {
      const q = state.questions[i];
      if (!ans) {
        return {
          questionId: q.id,
          type: q.type,
          subcategory: q.subcategory,
          selectedIndex: -1,
          isCorrect: false,
          isFlagged: !!state.flags[i],
          score: q.type === "TKP" ? 1 : 0
        };
      }
      return {
        ...ans,
        isFlagged: !!state.flags[i]
      };
    });

    answersRecord.forEach(ans => {
      if (ans.type === "TWK") twkTotal += (ans.isCorrect ? 5 : 0);
      if (ans.type === "TIU") tiuTotal += (ans.isCorrect ? 5 : 0);
      if (ans.type === "TKP") tkpTotal += (ans.score || 1);

      if (ans.type === "Listening") {
        listTotal++;
        if (ans.isCorrect) listCorrect++;
      }
      if (ans.type === "Structure") {
        structTotal++;
        if (ans.isCorrect) structCorrect++;
      }
      if (ans.type === "Reading") {
        readTotal++;
        if (ans.isCorrect) readCorrect++;
      }
    });

    const resultPayload = {
      examType: state.examType,
      title: state.title,
      scoreBreakdown: { twk: twkTotal, tiu: tiuTotal, tkp: tkpTotal },
      toeflAccuracy: {
        listening: listTotal > 0 ? Math.round((listCorrect / listTotal) * 100) : 50,
        structure: structTotal > 0 ? Math.round((structCorrect / structTotal) * 100) : 50,
        reading: readTotal > 0 ? Math.round((readCorrect / readTotal) * 100) : 50
      },
      answers: answersRecord
    };

    // Simpan ke LocalStorage & Bank Soal Salah
    Storage.saveTestResult(resultPayload);

    // Render Tampilan Hasil
    this.renderResultScreen(resultPayload);
  }

  // ====================================================================
  // Render: Hasil Ujian & Rekomendasi Peningkatan
  // ====================================================================
  renderResultScreen(result) {
    this.switchView("result-screen");

    const badgeEl = document.getElementById("result-hero-badge");
    const titleEl = document.getElementById("result-title-el");
    const subtitleEl = document.getElementById("result-subtitle-el");
    const scoresContainer = document.getElementById("result-scores-container");
    const weaknessBox = document.getElementById("result-weakness-box");

    // CPNS Passing grade status
    const passedTwk = result.scoreBreakdown.twk >= 65;
    const passedTiu = result.scoreBreakdown.tiu >= 80;
    const passedTkp = result.scoreBreakdown.tkp >= 166;
    const isCpnsPassed = passedTwk && passedTiu && passedTkp;

    if (result.examType === "CPNS") {
      badgeEl.className = isCpnsPassed ? "result-hero-badge pass" : "result-hero-badge fail";
      badgeEl.textContent = isCpnsPassed ? "🎉 SELAMAT! MEMENUHI PASSING GRADE BKN" : "⚠️ BELUM MEMENUHI PASSING GRADE SKD";
      titleEl.textContent = `Total Skor: ${result.scoreBreakdown.twk + result.scoreBreakdown.tiu + result.scoreBreakdown.tkp}`;
      subtitleEl.textContent = "Berikut evaluasi rincian passing grade per subtes SKD Anda:";

      scoresContainer.innerHTML = `
        <div class="result-score-box">
          <h4>TWK (Ambang Batas: 65)</h4>
          <div class="result-score-val" style="color: ${passedTwk ? 'var(--status-good)' : 'var(--status-critical)'};">${result.scoreBreakdown.twk}</div>
          <div class="result-score-threshold">${passedTwk ? '✓ Memenuhi Syarat' : '✗ Di bawah passing grade'}</div>
        </div>
        <div class="result-score-box">
          <h4>TIU (Ambang Batas: 80)</h4>
          <div class="result-score-val" style="color: ${passedTiu ? 'var(--status-good)' : 'var(--status-critical)'};">${result.scoreBreakdown.tiu}</div>
          <div class="result-score-threshold">${passedTiu ? '✓ Memenuhi Syarat' : '✗ Di bawah passing grade'}</div>
        </div>
        <div class="result-score-box">
          <h4>TKP (Ambang Batas: 166)</h4>
          <div class="result-score-val" style="color: ${passedTkp ? 'var(--status-good)' : 'var(--status-critical)'};">${result.scoreBreakdown.tkp}</div>
          <div class="result-score-threshold">${passedTkp ? '✓ Memenuhi Syarat' : '✗ Di bawah passing grade'}</div>
        </div>
      `;
    } else if (result.examType === "TOEFL") {
      const pred = Analytics.calculateToeflPrediction([result]);
      badgeEl.className = pred.estimatedScore >= 550 ? "result-hero-badge pass" : "result-hero-badge fail";
      badgeEl.textContent = pred.estimatedScore >= 550 ? "🎯 PREDIKSI SKOR TARGET TERCAPAI" : "📈 PERLU PENINGKATAN GRAMMAR & LISTENING";
      titleEl.textContent = `Prediksi Skor TOEFL: ${pred.estimatedScore}`;
      subtitleEl.textContent = "Perincian konversi skala nilai standar TOEFL ITP (Skala 310 - 677):";

      scoresContainer.innerHTML = `
        <div class="result-score-box">
          <h4>Section 1: Listening</h4>
          <div class="result-score-val">${pred.listeningScaled}</div>
          <div class="result-score-threshold">Akurasi: ${result.toeflAccuracy.listening}%</div>
        </div>
        <div class="result-score-box">
          <h4>Section 2: Structure</h4>
          <div class="result-score-val">${pred.structureScaled}</div>
          <div class="result-score-threshold">Akurasi: ${result.toeflAccuracy.structure}%</div>
        </div>
        <div class="result-score-box">
          <h4>Section 3: Reading</h4>
          <div class="result-score-val">${pred.readingScaled}</div>
          <div class="result-score-threshold">Akurasi: ${result.toeflAccuracy.reading}%</div>
        </div>
      `;
    } else {
      // Diagnostic / Drill
      titleEl.textContent = "Sesi Latihan / Diagnostik Selesai";
      subtitleEl.textContent = "Data evaluasi telah dicatat ke dalam database perkembangan Anda.";
      badgeEl.className = "result-hero-badge pass";
      badgeEl.textContent = "EVALUASI TERSIMPAN";
      scoresContainer.innerHTML = `
        <div class="result-score-box" style="grid-column: span 3; text-align: center;">
          <h4>Total Soal Dikerjakan</h4>
          <div class="result-score-val">${result.answers.length}</div>
          <div class="result-score-threshold">Semua soal yang salah otomatis tersimpan di Bank Soal Salah</div>
        </div>
      `;
    }

    // Evaluasi Kelemahan Spesifik pada Tes ini
    const wrongAnswers = result.answers.filter(a => !a.isCorrect && a.type !== "TKP");
    if (wrongAnswers.length > 0) {
      weaknessBox.style.display = "block";
      const weakSubs = [...new Set(wrongAnswers.map(a => `${a.type} - ${a.subcategory}`))];
      weaknessBox.innerHTML = `
        <h4>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Subtopik Yang Perlu Segera Ditingkatkan:
        </h4>
        <p style="color: var(--text-secondary); margin-bottom: 12px;">Berdasarkan sesi ini, Anda melakukan kekeliruan pada subtopik:</p>
        <ul style="margin-left: 20px; color: #fca5a5; font-weight: 600;">
          ${weakSubs.map(s => `<li>${s}</li>`).join("")}
        </ul>
      `;
    } else {
      weaknessBox.style.display = "none";
    }

    // Actions
    const btnBackDash = document.getElementById("btn-result-back-dashboard");
    const btnDirectDrill = document.getElementById("btn-result-direct-drill");

    if (btnBackDash) btnBackDash.onclick = () => this.switchView("dashboard");
    if (btnDirectDrill) btnDirectDrill.onclick = () => this.startAdaptiveDrill();

    // Render Review Lengkap Jawaban & Pembahasan
    this.setupReviewFilterTabs(result);
    this.renderResultReview(result, "all");
  }

  setupReviewFilterTabs(result) {
    const tabs = ["all", "wrong", "correct", "flagged"];
    tabs.forEach(tab => {
      const chip = document.getElementById(`chip-filter-${tab}`);
      if (chip) {
        chip.onclick = () => {
          document.querySelectorAll(".review-filter-tabs .filter-chip").forEach(c => c.classList.remove("active"));
          chip.classList.add("active");
          this.renderResultReview(result, tab);
        };
      }
    });
  }

  renderResultReview(result, filter = "all") {
    const listContainer = document.getElementById("result-review-items-list");
    if (!listContainer) return;

    const qMap = Analytics.getAllQuestionsMap();
    const answers = result.answers || [];

    // Hitung counts untuk chip filter
    const countAll = answers.length;
    const countWrong = answers.filter(a => (!a.isCorrect && a.type !== "TKP") || (a.type === "TKP" && (a.score || 0) < 5)).length;
    const countCorrect = answers.filter(a => a.isCorrect || (a.type === "TKP" && (a.score || 0) === 5)).length;
    const countFlagged = answers.filter(a => a.isFlagged).length;

    const elAll = document.getElementById("rev-count-all");
    const elWrong = document.getElementById("rev-count-wrong");
    const elCorrect = document.getElementById("rev-count-correct");
    const elFlagged = document.getElementById("rev-count-flagged");
    if (elAll) elAll.textContent = countAll;
    if (elWrong) elWrong.textContent = countWrong;
    if (elCorrect) elCorrect.textContent = countCorrect;
    if (elFlagged) elFlagged.textContent = countFlagged;

    const filteredAnswers = answers.map((ans, idx) => ({ ans, qNum: idx + 1 })).filter(({ ans }) => {
      const isRight = ans.isCorrect || (ans.type === "TKP" && (ans.score || 0) === 5);
      if (filter === "wrong") return !isRight;
      if (filter === "correct") return isRight;
      if (filter === "flagged") return !!ans.isFlagged;
      return true;
    });

    if (filteredAnswers.length === 0) {
      listContainer.innerHTML = `<p style="color: var(--text-muted); padding: 18px; text-align: center;">Tidak ada soal dalam kategori filter ini.</p>`;
      return;
    }

    const mistakes = Storage.getMistakes();

    listContainer.innerHTML = filteredAnswers.map(({ ans, qNum }) => {
      const q = qMap.get(ans.questionId);
      if (!q) return "";

      const isRight = ans.isCorrect || (ans.type === "TKP" && (ans.score || 0) === 5);
      const isFlagged = !!ans.isFlagged;
      const statusClass = isRight ? "is-correct" : "is-wrong";
      const keys = ["A", "B", "C", "D", "E"];

      let statusBadge = "";
      if (q.type === "TKP") {
        statusBadge = `<span class="badge-tag ${ans.score === 5 ? 'pass' : 'warning'}">Skor TKP: ${ans.score || 1}/5</span>`;
      } else {
        statusBadge = `<span class="badge-tag ${ans.isCorrect ? 'pass' : 'fail'}">${ans.isCorrect ? '✓ Benar (+5)' : '✗ Salah (0)'}</span>`;
      }

      const noteVal = (mistakes[q.id] && mistakes[q.id].notes) ? mistakes[q.id].notes : "";

      return `
        <div class="review-item-card ${statusClass} ${isFlagged ? 'is-flagged' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="q-number-pill">Soal #${qNum}</span>
              <span class="cat-pill">${q.type}</span>
              <span class="q-subtopic-tag">${q.subcategory}</span>
              ${isFlagged ? `<span class="badge-tag warning">🚩 Ragu-ragu</span>` : ''}
            </div>
            <div>${statusBadge}</div>
          </div>

          ${q.passage ? `<div class="reading-passage-box" style="margin: 8px 0;"><strong>Passage:</strong><br>${q.passage}</div>` : ''}

          <div style="font-weight: 600; font-size: 0.98rem; color: var(--text-primary); line-height: 1.5;">
            ${q.question}
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; margin: 6px 0;">
            ${q.options.map((opt, optIdx) => {
              const isUserChoice = ans.selectedIndex === optIdx;
              const isCorrectKey = q.type === "TKP" ? opt.score === 5 : opt.isCorrect;
              let optClass = "";
              let optTag = "";

              if (isCorrectKey) {
                optClass = "correct-key";
                optTag = `<span style="font-weight: 800; color: var(--status-good-text); margin-left: auto;">(Kunci Jawaban ${q.type === 'TKP' ? 'Poin 5' : 'Resmi'})</span>`;
              }
              if (isUserChoice) {
                if (!isCorrectKey) {
                  optClass = "user-pick";
                  optTag = `<span style="font-weight: 800; color: var(--status-critical-text); margin-left: auto;">(Pilihan Anda ✗)</span>`;
                } else {
                  optTag = `<span style="font-weight: 800; color: var(--status-good-text); margin-left: auto;">(Pilihan Anda ✓)</span>`;
                }
              }

              return `
                <div class="review-opt-pill ${optClass}">
                  <strong style="min-width: 22px;">${keys[optIdx]}.</strong>
                  <span>${opt.text}</span>
                  ${optTag}
                </div>
              `;
            }).join("")}
          </div>

          <div class="drill-feedback-card ${isRight ? 'correct' : 'incorrect'}" style="margin: 4px 0 0 0;">
            <div class="feedback-badge">Pembahasan:</div>
            <div class="feedback-explanation">${q.explanation}</div>
            ${q.tips ? `<div class="feedback-tip-box"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: -2px; margin-right: 4px; color: #d97706;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><strong>Trik Cepat:</strong> ${q.tips}</div>` : ''}
          </div>

          <div style="display: flex; gap: 10px; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
            <input type="text" class="input-note review-note-input" data-qid="${q.id}" placeholder="Catatan evaluasi untuk soal ini..." 
              value="${noteVal}" 
              style="flex: 1; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.84rem;" />
            <button class="btn-secondary btn-save-note" data-qid="${q.id}" style="font-size: 0.82rem; padding: 7px 12px;">Simpan Catatan</button>
          </div>
        </div>
      `;
    }).join("");

    listContainer.querySelectorAll(".btn-save-note").forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        const input = listContainer.querySelector(`.review-note-input[data-qid="${qid}"]`);
        if (input) {
          Storage.saveQuestionNote(qid, input.value);
          btn.textContent = "Tersimpan ✓";
          setTimeout(() => { btn.textContent = "Simpan Catatan"; }, 2000);
        }
      };
    });
  }
}

// Inisialisasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  window.AptitudeApp = new AppController();
});
