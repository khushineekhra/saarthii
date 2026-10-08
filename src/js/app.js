// SAARTHI Main Application Orchestrator

import { store } from './state.js';
import { sounds } from './sound.js';
import { voice } from './voice.js';
import { analyzeHealthPatterns } from './ai-patterns.js';
import { renderVitalsCharts } from './vitals.js';
import { renderMedications, renderHydrationWidget, renderAppointments } from './reminders.js';
import { generateDailySummary, openHealthPassportModal, sendWhatsAppCaregiverDigest } from './summary.js';
import { initPillScanner } from './pill-scanner.js';
import { initSOS } from './sos.js';
import { initAuth } from './auth.js';
import { getTranslation } from './i18n.js';

let currentSlotFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize sub-modules
  initAuth();
  initPillScanner();
  initSOS();
  setupEditModals();
  setupEventListeners();
  renderApp();

  // Subscribe to central state changes
  store.subscribe((state, event, payload) => {
    console.log("State updated:", event, payload);
    renderApp();
  });

  // Voice assistant state change listener
  voice.onStateChange = ({ isListening, isSpeaking }) => {
    const micBtn = document.getElementById("btnVoiceAssistant");
    const voiceOrb = document.getElementById("voiceOrb");
    const voiceStatusText = document.getElementById("voiceStatusText");
    const lang = store.getState().language;

    if (micBtn) {
      if (isListening) {
        micBtn.classList.add("listening");
        if (voiceOrb) voiceOrb.classList.add("pulsing");
        if (voiceStatusText) voiceStatusText.textContent = getTranslation("voiceHeroListening", lang);
      } else if (isSpeaking) {
        micBtn.classList.add("speaking");
        if (voiceOrb) voiceOrb.classList.add("speaking-orb");
        if (voiceStatusText) voiceStatusText.textContent = getTranslation("voiceHeroSpeaking", lang);
      } else {
        micBtn.classList.remove("listening", "speaking");
        if (voiceOrb) voiceOrb.classList.remove("pulsing", "speaking-orb");
        if (voiceStatusText) voiceStatusText.textContent = getTranslation("voiceHeroSubDefault", lang);
      }
    }
  };
});

function setupEventListeners() {
  // Voice Assistant Mic Button
  const btnVoice = document.getElementById("btnVoiceAssistant");
  if (btnVoice) {
    btnVoice.addEventListener("click", () => {
      voice.toggleListening();
    });
  }

  // Senior vs Caregiver Mode Switcher
  const btnModeSenior = document.getElementById("btnModeSenior");
  const btnModeCaregiver = document.getElementById("btnModeCaregiver");

  if (btnModeSenior && btnModeCaregiver) {
    btnModeSenior.addEventListener("click", () => {
      store.switchMode("senior");
      sounds.playReminder();
    });
    btnModeCaregiver.addEventListener("click", () => {
      store.switchMode("caregiver");
      sounds.playReminder();
    });
  }

  // Two Themes: Dark and Light Switcher
  const btnThemeDark = document.getElementById("btnThemeDark");
  const btnThemeLight = document.getElementById("btnThemeLight");

  if (btnThemeDark) {
    btnThemeDark.addEventListener("click", () => {
      store.setTheme("dark");
      sounds.playReminder();
    });
  }
  if (btnThemeLight) {
    btnThemeLight.addEventListener("click", () => {
      store.setTheme("light");
      sounds.playReminder();
    });
  }

  // Separate Languages: English and Hindi Switcher
  const btnLangEn = document.getElementById("btnLangEn");
  const btnLangHi = document.getElementById("btnLangHi");

  if (btnLangEn) {
    btnLangEn.addEventListener("click", () => {
      store.setLanguage("en");
      sounds.playReminder();
      voice.speak("English language selected.", "English language selected.");
    });
  }
  if (btnLangHi) {
    btnLangHi.addEventListener("click", () => {
      store.setLanguage("hi");
      sounds.playReminder();
      voice.speak("हिंदी भाषा चुनी गई है।", "हिंदी भाषा चुनी गई है।");
    });
  }

  // Health Passport Modal Triggers
  const btnOpenPassport = document.getElementById("btnOpenPassport");
  const btnClosePassport = document.getElementById("btnClosePassport");
  const btnPrintPassport = document.getElementById("btnPrintPassport");

  if (btnOpenPassport) {
    btnOpenPassport.addEventListener("click", () => {
      openHealthPassportModal();
    });
  }
  if (btnClosePassport) {
    btnClosePassport.addEventListener("click", () => {
      const modal = document.getElementById("passportModal");
      if (modal) modal.classList.remove("active");
    });
  }
  if (btnPrintPassport) {
    btnPrintPassport.addEventListener("click", () => {
      window.print();
    });
  }

  // WhatsApp Digest Trigger
  const btnWhatsAppDigest = document.getElementById("btnSendWhatsAppDigest");
  if (btnWhatsAppDigest) {
    btnWhatsAppDigest.addEventListener("click", () => {
      sendWhatsAppCaregiverDigest();
    });
  }

  // Medication Slot Filter Tabs
  document.querySelectorAll(".slot-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".slot-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentSlotFilter = tab.getAttribute("data-slot") || "all";
      renderMedications("medsListContainer", currentSlotFilter);
      sounds.playReminder();
    });
  });

  // Vitals Entry Modal Handlers
  const btnOpenAddVitals = document.getElementById("btnOpenAddVitals");
  const btnCloseAddVitals = document.getElementById("btnCloseAddVitals");
  const vitalsModal = document.getElementById("vitalsModal");
  const vitalsForm = document.getElementById("vitalsForm");

  if (btnOpenAddVitals && vitalsModal) {
    btnOpenAddVitals.addEventListener("click", () => {
      vitalsModal.classList.add("active");
    });
  }
  if (btnCloseAddVitals && vitalsModal) {
    btnCloseAddVitals.addEventListener("click", () => {
      vitalsModal.classList.remove("active");
    });
  }

  // Vitals Preset Simulation Buttons for judges
  document.querySelectorAll(".vital-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sys = btn.getAttribute("data-sys");
      const dia = btn.getAttribute("data-dia");
      const pulse = btn.getAttribute("data-pulse");
      const sugar = btn.getAttribute("data-sugar");

      if (sys) document.getElementById("inputSystolic").value = sys;
      if (dia) document.getElementById("inputDiastolic").value = dia;
      if (pulse) document.getElementById("inputPulse").value = pulse;
      if (sugar) document.getElementById("inputSugar").value = sugar;
    });
  });

  if (vitalsForm) {
    vitalsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const systolic = parseInt(document.getElementById("inputSystolic").value, 10);
      const diastolic = parseInt(document.getElementById("inputDiastolic").value, 10);
      const pulse = parseInt(document.getElementById("inputPulse").value, 10) || 75;
      const bloodSugar = parseInt(document.getElementById("inputSugar").value, 10) || 120;
      const sugarType = document.getElementById("inputSugarType").value || "Fasting";
      const spo2 = parseInt(document.getElementById("inputSpo2").value, 10) || 98;
      const weight = parseFloat(document.getElementById("inputWeight").value) || 68.4;

      store.addVitals({
        systolic,
        diastolic,
        pulse,
        bloodSugar,
        sugarType,
        spo2,
        weight
      });

      sounds.playSuccess();
      vitalsModal.classList.remove("active");

      // Audio feedback on new vitals
      const isHi = store.getState().language === 'hi';
      const enMsg = `Recorded blood pressure ${systolic} over ${diastolic} mmHg. AI Pattern analysis updated.`;
      const hiMsg = `ब्लड प्रेशर ${systolic} और ${diastolic} दर्ज किया गया। स्वास्थ्य विश्लेषण अपडेट हुआ।`;
      voice.speak(enMsg, hiMsg);
    });
  }

  // Daily Mood / Check-in Emoji Buttons
  document.querySelectorAll(".mood-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const mood = btn.getAttribute("data-mood");
      store.setMood(mood);
      sounds.playSuccess();

      const isHi = store.getState().language === 'hi';
      const responseMap = {
        great: { en: "Wonderful to hear you're feeling great today!", hi: "सुनकर बहुत खुशी हुई कि आप बहुत अच्छा महसूस कर रहे हैं!" },
        good: { en: "Glad you are feeling good today, Dadaji.", hi: "बहुत अच्छा दादाजी, अपना ख्याल रखें।" },
        okay: { en: "Take it easy today and drink plenty of water.", hi: "आज आराम से रहें और थोड़ा पानी पिएं।" },
        tired: { en: "Please rest a bit. Have you had your afternoon tea?", hi: "कृपया थोड़ा आराम कर लीजिए दादाजी।" },
        unwell: { en: "I'm alerting Ananya so she can check in on you.", hi: "मैं बेटी अनन्या को सूचित कर रहा हूँ ताकि वो आपका हाल जान सकें।" }
      };

      const msg = responseMap[mood] || responseMap.good;
      voice.speak(msg.en, msg.hi);
    });
  });

  // Reset Demo Data Button
  const btnResetData = document.getElementById("btnResetDemoData");
  if (btnResetData) {
    btnResetData.addEventListener("click", () => {
      if (confirm("Reset demo data to initial state?")) {
        store.resetDemoData();
      }
    });
  }
}

function renderApp() {
  const state = store.getState();
  const isHi = state.language === 'hi';
  const isSenior = state.uiMode === 'senior';
  const isLight = state.theme === 'light';
  const lang = state.language;

  // Apply UI mode & Theme classes to body
  document.body.classList.toggle("mode-senior", isSenior);
  document.body.classList.toggle("mode-caregiver", !isSenior);
  document.body.classList.toggle("theme-light", isLight);
  document.body.classList.toggle("theme-dark", !isLight);

  // Update Theme Switcher Active State
  const btnThemeDark = document.getElementById("btnThemeDark");
  const btnThemeLight = document.getElementById("btnThemeLight");
  if (btnThemeDark) btnThemeDark.classList.toggle("active", !isLight);
  if (btnThemeLight) btnThemeLight.classList.toggle("active", isLight);

  // Update Language Switcher Active State
  const btnLangEn = document.getElementById("btnLangEn");
  const btnLangHi = document.getElementById("btnLangHi");
  if (btnLangEn) btnLangEn.classList.toggle("active", lang === 'en');
  if (btnLangHi) btnLangHi.classList.toggle("active", lang === 'hi');

  // Update Mode Switcher Toggle
  const btnModeSenior = document.getElementById("btnModeSenior");
  const btnModeCaregiver = document.getElementById("btnModeCaregiver");
  if (btnModeSenior && btnModeCaregiver) {
    btnModeSenior.classList.toggle("active", isSenior);
    btnModeCaregiver.classList.toggle("active", !isSenior);
    btnModeSenior.innerHTML = getTranslation("modeSenior", lang);
    btnModeCaregiver.innerHTML = getTranslation("modeCaregiver", lang);
  }

  // Update Nav Tools
  const btnOpenScanner = document.getElementById("btnOpenScanner");
  const btnOpenPassport = document.getElementById("btnOpenPassport");
  if (btnOpenScanner) btnOpenScanner.innerHTML = getTranslation("pillScanNav", lang);
  if (btnOpenPassport) btnOpenPassport.innerHTML = getTranslation("passportNav", lang);

  // Update Brand Tagline
  const brandTagline = document.querySelector(".brand-tagline");
  if (brandTagline) brandTagline.textContent = getTranslation("brandTagline", lang);

  // Update Voice Hero Banner
  const voiceHeroH2 = document.querySelector(".voice-hero-text h2");
  const voiceStatusText = document.getElementById("voiceStatusText");
  const voiceBtnTalk = document.querySelector("#btnVoiceAssistant span:last-child");
  const btnTriggerSOS = document.getElementById("btnTriggerSOS");

  if (voiceHeroH2) voiceHeroH2.textContent = getTranslation("voiceHeroTitle", lang);
  if (voiceStatusText && !voice.isListening && !voice.isSpeaking) {
    voiceStatusText.innerHTML = getTranslation("voiceHeroSubDefault", lang);
  }
  if (voiceBtnTalk) voiceBtnTalk.textContent = getTranslation("voiceBtnTalk", lang);
  if (btnTriggerSOS) btnTriggerSOS.innerHTML = `<span>${getTranslation("sosBtn", lang)}</span>`;

  // Update User Profile Header
  const profileName = document.getElementById("headerProfileName");
  const profileAvatar = document.getElementById("headerProfileAvatar");
  const profileRole = document.getElementById("headerProfileRole");

  if (profileName) profileName.textContent = state.user.preferredName || state.user.name;
  if (profileAvatar) profileAvatar.src = state.user.avatar;
  if (profileRole) {
    profileRole.textContent = state.user.role === 'senior' 
      ? getTranslation("seniorRole", lang) 
      : getTranslation("caregiverRole", lang);
  }

  // Update Slot Tabs
  const slotTabs = document.querySelectorAll(".slot-tab");
  slotTabs.forEach(tab => {
    const slot = tab.getAttribute("data-slot");
    if (slot === "all") tab.textContent = isHi ? "पूरा दिन (All Day)" : "All Day";
    else if (slot === "Morning") tab.textContent = isHi ? "सुबह (Morning)" : "Morning";
    else if (slot === "Afternoon") tab.textContent = isHi ? "दोपहर (Afternoon)" : "Afternoon";
    else if (slot === "Night") tab.textContent = isHi ? "रात (Night)" : "Night";
  });

  // Update Section & Metric Titles dynamically
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("summaryBannerHeading", getTranslation("summaryTitle", lang));
  setText("btnSpeakSummary", getTranslation("listenSummaryBtn", lang));
  setText("btnSendWhatsAppDigest", getTranslation("whatsappDigestBtn", lang));
  setText("metricAdherenceLabel", getTranslation("metricAdherence", lang));
  setText("metricBPLabel", getTranslation("metricBP", lang));
  setText("metricSugarLabel", getTranslation("metricSugar", lang));
  setText("metricIndexLabel", getTranslation("metricIndex", lang));

  setText("medsCardTitle", getTranslation("medsTitle", lang));
  setText("medsCardSubtitle", getTranslation("medsSub", lang));

  setText("wellnessCardTitle", getTranslation("wellnessTitle", lang));
  setText("wellnessCardSubtitle", getTranslation("wellnessSub", lang));
  setText("moodLabelGreat", getTranslation("moodGreat", lang));
  setText("moodLabelGood", getTranslation("moodGood", lang));
  setText("moodLabelOkay", getTranslation("moodOkay", lang));
  setText("moodLabelTired", getTranslation("moodTired", lang));
  setText("moodLabelUnwell", getTranslation("moodUnwell", lang));

  setText("routineCardTitle", getTranslation("routineTitle", lang));
  setText("routineCardSubtitle", getTranslation("routineSub", lang));

  setText("aiPatternsCardTitle", getTranslation("aiPatternsTitle", lang));
  setText("aiPatternsCardSubtitle", getTranslation("aiPatternsSub", lang));
  setText("aiBadgeText", getTranslation("aiBadgeText", lang));

  setText("vitalsCardTitle", getTranslation("vitalsTitle", lang));
  setText("vitalsCardSubtitle", getTranslation("vitalsSub", lang));
  setText("btnOpenAddVitals", getTranslation("logNewVitalsBtn", lang));
  setText("btnOpenAddMed", getTranslation("btnAddMed", lang));
  setText("btnOpenAddApt", getTranslation("btnAddApt", lang));
  setText("btnOpenAddAct", getTranslation("btnAddAct", lang));

  setText("appointmentsCardTitle", getTranslation("appointmentsTitle", lang));
  setText("appointmentsCardSubtitle", getTranslation("appointmentsSub", lang));

  setText("footerText", getTranslation("footerText", lang));
  setText("btnResetDemoData", getTranslation("resetDataBtn", lang));

  // Render Core Modules
  renderMedications("medsListContainer", currentSlotFilter);
  renderHydrationWidget("hydrationWidgetContainer");
  renderAppointments("appointmentsListContainer");
  renderVitalsCharts("vitalsChartsContainer", state.vitals);
  renderAIHealthPatterns(state);
  renderSummaryCard(state);
  renderRoutineActivities(state);
}

function renderAIHealthPatterns(state) {
  const container = document.getElementById("aiPatternsContainer");
  if (!container) return;

  const analysis = analyzeHealthPatterns(state);
  const isHi = state.language === 'hi';
  const lang = state.language;

  // Update Health Index Badge
  const healthIndexEl = document.getElementById("healthIndexScore");
  const healthStatusEl = document.getElementById("healthIndexStatus");
  const adherenceRingEl = document.getElementById("adherenceRingValue");

  if (healthIndexEl) {
    healthIndexEl.textContent = `${analysis.overallHealthIndex.score}/100`;
    healthIndexEl.style.color = analysis.overallHealthIndex.color;
  }
  if (healthStatusEl) {
    healthStatusEl.textContent = analysis.overallHealthIndex.text;
  }
  if (adherenceRingEl) {
    adherenceRingEl.textContent = `${analysis.adherencePercent}%`;
  }

  if (analysis.alerts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">✅</span>
        <p>${isHi ? 'सभी स्वास्थ्य माप एवं पैटर्न सामान्य स्तर पर हैं।' : 'All recorded vitals and health patterns are within normal thresholds.'}</p>
      </div>
    `;
    return;
  }

  const html = analysis.alerts.map(alert => {
    return `
      <div class="pattern-alert-card ${alert.severity}">
        <div class="pattern-header">
          <div class="pattern-badge-row">
            <span class="severity-chip ${alert.severity}">${alert.urgency}</span>
            <span class="category-chip">${alert.category}</span>
          </div>
          <span class="pattern-metric">${alert.metric}</span>
        </div>

        <h4 class="pattern-title">${isHi ? (alert.titleHi || alert.title) : alert.title}</h4>
        
        <p class="pattern-observation">
          🔍 <strong>${getTranslation("observationLbl", lang)}</strong> ${isHi ? (alert.observationHi || alert.observation) : alert.observation}
        </p>

        <div class="pattern-diagnosis">
          🧠 <strong>${getTranslation("diagnosisLbl", lang)}</strong> ${alert.aiDiagnosis}
        </div>

        <div class="pattern-action-box">
          <div class="action-text">
            👉 <strong>${getTranslation("actionLbl", lang)}</strong> ${isHi ? (alert.actionRequiredHi || alert.actionRequired) : alert.actionRequired}
          </div>
          <button class="voice-alert-btn" data-speak-alert="${alert.id}" title="Read this AI finding">
            ${getTranslation("listenAlert", lang)}
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = html;

  container.querySelectorAll('[data-speak-alert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-speak-alert');
      const item = analysis.alerts.find(a => a.id === id);
      if (item) {
        const enMsg = `${item.title}. ${item.observation}. Recommendation: ${item.actionRequired}`;
        const hiMsg = `${item.titleHi || item.title}। ${item.observationHi || item.observation}। सुझाव: ${item.actionRequiredHi || item.actionRequired}`;
        voice.speak(enMsg, hiMsg);
      }
    });
  });
}

function renderSummaryCard(state) {
  const container = document.getElementById("dailySummaryContent");
  if (!container) return;

  const summary = generateDailySummary(state);
  container.innerHTML = summary.html;

  const btnSpeakSummary = document.getElementById("btnSpeakSummary");
  if (btnSpeakSummary) {
    btnSpeakSummary.onclick = () => {
      const isHi = state.language === 'hi';
      voice.speak(summary.plainText, summary.plainText);
    };
  }
}

function renderRoutineActivities(state) {
  const container = document.getElementById("activitiesContainer");
  if (!container) return;

  const lang = state.language;
  const activities = state.dailyActivities || [];
  const html = activities.map(act => `
    <div class="activity-item ${act.completed ? 'completed' : ''}" data-act-id="${act.id}">
      <span class="act-icon">${act.icon}</span>
      <div class="act-text">
        <span class="act-title">${act.title}</span>
        <span class="act-time">⏰ ${act.time}</span>
      </div>
      <div class="act-actions-row">
        <button class="act-edit-btn" data-edit-act="${act.id}" title="Edit activity">
          ✏️
        </button>
        <button class="act-check-btn ${act.completed ? 'checked' : ''}" data-toggle-act="${act.id}">
          ${act.completed ? getTranslation('actDone', lang) : getTranslation('actMarkDone', lang)}
        </button>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;

  container.querySelectorAll("[data-toggle-act]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-toggle-act");
      store.toggleActivity(id);
      sounds.playSuccess();
    });
  });

  container.querySelectorAll("[data-edit-act]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-edit-act");
      if (window.openEditActivityModal) {
        window.openEditActivityModal(id);
      }
    });
  });
}

function setupEditModals() {
  // 1. Medication Edit/Add Modal
  const editMedModal = document.getElementById("editMedModal");
  const btnCloseEditMed = document.getElementById("btnCloseEditMed");
  const editMedForm = document.getElementById("editMedForm");
  const btnDeleteMed = document.getElementById("btnDeleteMed");
  const btnOpenAddMed = document.getElementById("btnOpenAddMed");

  window.openEditMedicationModal = (id) => {
    const state = store.getState();
    const lang = state.language;
    const titleEl = document.getElementById("editMedModalTitle");

    if (id) {
      const med = state.medications.find(m => m.id === id);
      if (!med) return;
      document.getElementById("editMedId").value = med.id;
      document.getElementById("inputMedName").value = med.name || "";
      document.getElementById("inputMedDose").value = med.dosage || "";
      document.getElementById("inputMedSlot").value = med.slot || "Morning";
      document.getElementById("inputMedTime").value = med.time || "08:30 AM";
      document.getElementById("inputMedFood").value = med.foodRelation || "After Breakfast";
      document.getElementById("inputMedPurpose").value = med.purpose || "";
      document.getElementById("inputMedStock").value = med.stock !== undefined ? med.stock : 20;
      document.getElementById("inputMedThreshold").value = med.refillThreshold || 5;
      document.getElementById("inputMedInstructions").value = med.instructions || "";
      
      if (titleEl) titleEl.textContent = getTranslation("modalEditMedTitle", lang);
      if (btnDeleteMed) btnDeleteMed.style.display = "inline-flex";
    } else {
      document.getElementById("editMedId").value = "";
      document.getElementById("inputMedName").value = "";
      document.getElementById("inputMedDose").value = "";
      document.getElementById("inputMedSlot").value = "Morning";
      document.getElementById("inputMedTime").value = "08:30 AM";
      document.getElementById("inputMedFood").value = "After Breakfast";
      document.getElementById("inputMedPurpose").value = "";
      document.getElementById("inputMedStock").value = 30;
      document.getElementById("inputMedThreshold").value = 7;
      document.getElementById("inputMedInstructions").value = "";
      
      if (titleEl) titleEl.textContent = getTranslation("modalAddMedTitle", lang);
      if (btnDeleteMed) btnDeleteMed.style.display = "none";
    }

    if (editMedModal) editMedModal.classList.add("active");
  };

  if (btnOpenAddMed) {
    btnOpenAddMed.addEventListener("click", () => {
      window.openEditMedicationModal(null);
    });
  }

  if (btnCloseEditMed) {
    btnCloseEditMed.addEventListener("click", () => {
      if (editMedModal) editMedModal.classList.remove("active");
    });
  }

  if (editMedModal) {
    editMedModal.addEventListener("click", (e) => {
      if (e.target === editMedModal) editMedModal.classList.remove("active");
    });
  }

  if (editMedForm) {
    editMedForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("editMedId").value;
      const data = {
        name: document.getElementById("inputMedName").value.trim(),
        dosage: document.getElementById("inputMedDose").value.trim(),
        slot: document.getElementById("inputMedSlot").value,
        time: document.getElementById("inputMedTime").value.trim() || "08:30 AM",
        foodRelation: document.getElementById("inputMedFood").value,
        purpose: document.getElementById("inputMedPurpose").value.trim(),
        stock: parseInt(document.getElementById("inputMedStock").value, 10) || 20,
        refillThreshold: parseInt(document.getElementById("inputMedThreshold").value, 10) || 5,
        instructions: document.getElementById("inputMedInstructions").value.trim(),
        shape: "circle",
        color: "#38bdf8"
      };

      if (id) {
        store.updateMedication(id, data);
      } else {
        store.addMedication(data);
      }

      sounds.playSuccess();
      if (editMedModal) editMedModal.classList.remove("active");
    });
  }

  if (btnDeleteMed) {
    btnDeleteMed.addEventListener("click", () => {
      const id = document.getElementById("editMedId").value;
      const lang = store.getState().language;
      if (id && confirm(getTranslation("confirmDelete", lang))) {
        store.deleteMedication(id);
        sounds.playSuccess();
        if (editMedModal) editMedModal.classList.remove("active");
      }
    });
  }

  // 2. Doctor Appointment Edit/Add Modal
  const editAptModal = document.getElementById("editAptModal");
  const btnCloseEditApt = document.getElementById("btnCloseEditApt");
  const editAptForm = document.getElementById("editAptForm");
  const btnDeleteApt = document.getElementById("btnDeleteApt");
  const btnOpenAddApt = document.getElementById("btnOpenAddApt");

  window.openEditAppointmentModal = (id) => {
    const state = store.getState();
    const lang = state.language;
    const titleEl = document.getElementById("editAptModalTitle");

    if (id) {
      const apt = state.appointments.find(a => a.id === id);
      if (!apt) return;
      document.getElementById("editAptId").value = apt.id;
      document.getElementById("inputAptTitle").value = apt.title || "";
      document.getElementById("inputAptDoctor").value = apt.doctor || "";
      document.getElementById("inputAptHospital").value = apt.hospital || "";
      document.getElementById("inputAptType").value = apt.type || "Doctor";
      document.getElementById("inputAptDate").value = apt.date || "";
      document.getElementById("inputAptTime").value = apt.time || "10:30 AM";
      document.getElementById("inputAptNotes").value = apt.notes || "";

      if (titleEl) titleEl.textContent = getTranslation("modalEditAptTitle", lang);
      if (btnDeleteApt) btnDeleteApt.style.display = "inline-flex";
    } else {
      document.getElementById("editAptId").value = "";
      document.getElementById("inputAptTitle").value = "";
      document.getElementById("inputAptDoctor").value = "";
      document.getElementById("inputAptHospital").value = "";
      document.getElementById("inputAptType").value = "Doctor";
      document.getElementById("inputAptDate").value = new Date().toISOString().split("T")[0];
      document.getElementById("inputAptTime").value = "10:30 AM";
      document.getElementById("inputAptNotes").value = "";

      if (titleEl) titleEl.textContent = getTranslation("modalAddAptTitle", lang);
      if (btnDeleteApt) btnDeleteApt.style.display = "none";
    }

    if (editAptModal) editAptModal.classList.add("active");
  };

  if (btnOpenAddApt) {
    btnOpenAddApt.addEventListener("click", () => {
      window.openEditAppointmentModal(null);
    });
  }

  if (btnCloseEditApt) {
    btnCloseEditApt.addEventListener("click", () => {
      if (editAptModal) editAptModal.classList.remove("active");
    });
  }

  if (editAptModal) {
    editAptModal.addEventListener("click", (e) => {
      if (e.target === editAptModal) editAptModal.classList.remove("active");
    });
  }

  if (editAptForm) {
    editAptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("editAptId").value;
      const data = {
        title: document.getElementById("inputAptTitle").value.trim(),
        doctor: document.getElementById("inputAptDoctor").value.trim(),
        hospital: document.getElementById("inputAptHospital").value.trim(),
        type: document.getElementById("inputAptType").value,
        date: document.getElementById("inputAptDate").value,
        time: document.getElementById("inputAptTime").value.trim() || "10:30 AM",
        notes: document.getElementById("inputAptNotes").value.trim()
      };

      if (id) {
        store.updateAppointment(id, data);
      } else {
        store.addAppointment(data);
      }

      sounds.playSuccess();
      if (editAptModal) editAptModal.classList.remove("active");
    });
  }

  if (btnDeleteApt) {
    btnDeleteApt.addEventListener("click", () => {
      const id = document.getElementById("editAptId").value;
      const lang = store.getState().language;
      if (id && confirm(getTranslation("confirmDelete", lang))) {
        store.deleteAppointment(id);
        sounds.playSuccess();
        if (editAptModal) editAptModal.classList.remove("active");
      }
    });
  }

  // 3. Routine Activity Edit/Add Modal
  const editActModal = document.getElementById("editActModal");
  const btnCloseEditAct = document.getElementById("btnCloseEditAct");
  const editActForm = document.getElementById("editActForm");
  const btnDeleteAct = document.getElementById("btnDeleteAct");
  const btnOpenAddAct = document.getElementById("btnOpenAddAct");

  window.openEditActivityModal = (id) => {
    const state = store.getState();
    const lang = state.language;
    const titleEl = document.getElementById("editActModalTitle");

    if (id) {
      const act = state.dailyActivities.find(a => a.id === id);
      if (!act) return;
      document.getElementById("editActId").value = act.id;
      document.getElementById("inputActTitle").value = act.title || "";
      document.getElementById("inputActTime").value = act.time || "06:45 AM";
      document.getElementById("inputActIcon").value = act.icon || "🚶";

      if (titleEl) titleEl.textContent = getTranslation("modalEditActTitle", lang);
      if (btnDeleteAct) btnDeleteAct.style.display = "inline-flex";
    } else {
      document.getElementById("editActId").value = "";
      document.getElementById("inputActTitle").value = "";
      document.getElementById("inputActTime").value = "07:00 AM";
      document.getElementById("inputActIcon").value = "🚶";

      if (titleEl) titleEl.textContent = getTranslation("modalAddActTitle", lang);
      if (btnDeleteAct) btnDeleteAct.style.display = "none";
    }

    if (editActModal) editActModal.classList.add("active");
  };

  if (btnOpenAddAct) {
    btnOpenAddAct.addEventListener("click", () => {
      window.openEditActivityModal(null);
    });
  }

  if (btnCloseEditAct) {
    btnCloseEditAct.addEventListener("click", () => {
      if (editActModal) editActModal.classList.remove("active");
    });
  }

  if (editActModal) {
    editActModal.addEventListener("click", (e) => {
      if (e.target === editActModal) editActModal.classList.remove("active");
    });
  }

  if (editActForm) {
    editActForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("editActId").value;
      const data = {
        title: document.getElementById("inputActTitle").value.trim(),
        time: document.getElementById("inputActTime").value.trim() || "07:00 AM",
        icon: document.getElementById("inputActIcon").value
      };

      if (id) {
        store.updateActivity(id, data);
      } else {
        store.addActivity(data);
      }

      sounds.playSuccess();
      if (editActModal) editActModal.classList.remove("active");
    });
  }

  if (btnDeleteAct) {
    btnDeleteAct.addEventListener("click", () => {
      const id = document.getElementById("editActId").value;
      const lang = store.getState().language;
      if (id && confirm(getTranslation("confirmDelete", lang))) {
        store.deleteActivity(id);
        sounds.playSuccess();
        if (editActModal) editActModal.classList.remove("active");
      }
    });
  }
}
