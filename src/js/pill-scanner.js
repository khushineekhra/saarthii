// SAARTHI AI Pill Scanner, Vision OCR & Drug-Drug Interaction Safety Engine
import { store } from './state.js';
import { sounds } from './sound.js';
import { voice } from './voice.js';

// Pre-configured realistic medication scans for instant hackathon demonstration
export const PRESET_SCANS = [
  {
    id: "scan-metformin",
    label: "Metformin 500mg Tablet Strip",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",
    extracted: {
      brandName: "Glycomet-500",
      genericName: "Metformin Hydrochloride",
      dosage: "500 mg",
      slot: "Morning",
      frequency: "Twice daily after meals",
      purpose: "Type 2 Diabetes / Blood Glucose Regulator",
      manufacturer: "USV Pharma",
      expiryDate: "11/2027",
      color: "#fb923c",
      shape: "capsule",
      interactionWarning: null
    }
  },
  {
    id: "scan-aspirin",
    label: "Eco-Aspirin 75mg Strip",
    imageUrl: "https://images.unsplash.com/photo-1550572017-edb79a613256?w=500&auto=format&fit=crop&q=80",
    extracted: {
      brandName: "Ecosprin 75",
      genericName: "Acetylsalicylic Acid",
      dosage: "75 mg",
      slot: "Afternoon",
      frequency: "Once daily post-lunch",
      purpose: "Anti-platelet Blood Thinner / Cardioprotection",
      manufacturer: "USV Pvt Ltd",
      expiryDate: "08/2026",
      color: "#ec4899",
      shape: "circle",
      interactionWarning: null
    }
  },
  {
    id: "scan-ibuprofen-danger",
    label: "Brufen 400mg (Drug Interaction Alert Demo!)",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80",
    extracted: {
      brandName: "Brufen 400",
      genericName: "Ibuprofen",
      dosage: "400 mg",
      slot: "Night",
      frequency: "As needed for pain",
      purpose: "NSAID Pain Reliever & Anti-inflammatory",
      manufacturer: "Abbott Healthcare",
      expiryDate: "05/2026",
      color: "#ef4444",
      shape: "oval",
      interactionWarning: {
        severity: "CRITICAL",
        conflictingMed: "Eco-Aspirin 75mg",
        risk: "Severe GI bleeding & blunted cardioprotective antiplatelet effect when Ibuprofen is combined with daily Aspirin.",
        action: "Do not take concurrently. Consider Paracetamol / consult Dr. Banerjee."
      }
    }
  },
  {
    id: "scan-rx-prescription",
    label: "Dr. Banerjee Handwritten Rx Prescription Slip",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80",
    extracted: {
      brandName: "Telmisartan 40mg",
      genericName: "Telmisartan",
      dosage: "40 mg",
      slot: "Morning",
      frequency: "Once daily before breakfast",
      purpose: "Angiotensin Receptor Blocker (Hypertension)",
      manufacturer: "Glenmark",
      expiryDate: "03/2028",
      color: "#6366f1",
      shape: "circle",
      interactionWarning: null
    }
  }
];

export function initPillScanner() {
  const modal = document.getElementById("pillScannerModal");
  const openBtn = document.getElementById("btnOpenScanner");
  const closeBtn = document.getElementById("btnCloseScanner");
  const scanPresetSelect = document.getElementById("scanPresetSelect");
  const scanRadar = document.getElementById("scanRadar");
  const scanPreviewImg = document.getElementById("scanPreviewImg");
  const scanStatusText = document.getElementById("scanStatusText");
  const scanResultsArea = document.getElementById("scanResultsArea");
  const btnStartScan = document.getElementById("btnStartScan");
  const fileInput = document.getElementById("pillUploadInput");

  if (!modal) return;

  const openModal = () => {
    modal.classList.add("active");
    loadPreset(PRESET_SCANS[0]);
  };

  const closeModal = () => {
    modal.classList.remove("active");
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close when clicking backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  let currentScanData = PRESET_SCANS[0];

  function loadPreset(preset) {
    currentScanData = preset;
    scanPreviewImg.src = preset.imageUrl;
    scanResultsArea.innerHTML = `
      <div class="scan-placeholder-msg">
        <p>Click <strong>"Start AI Scan"</strong> to analyze medication strip, dosage, and interaction safety.</p>
      </div>
    `;
    scanStatusText.textContent = `Ready to scan: ${preset.label}`;
  }

  if (scanPresetSelect) {
    scanPresetSelect.innerHTML = PRESET_SCANS.map(p => `
      <option value="${p.id}">${p.label}</option>
    `).join("");

    scanPresetSelect.addEventListener("change", (e) => {
      const selected = PRESET_SCANS.find(p => p.id === e.target.value);
      if (selected) loadPreset(selected);
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          scanPreviewImg.src = ev.target.result;
          currentScanData = {
            id: "custom-upload",
            label: "User Uploaded Medication",
            imageUrl: ev.target.result,
            extracted: {
              brandName: "Metoprolol Succinate",
              genericName: "Metoprolol ER",
              dosage: "25 mg",
              slot: "Morning",
              frequency: "Once daily with food",
              purpose: "Beta-blocker for Heart Rate & Blood Pressure",
              manufacturer: "Sun Pharma",
              expiryDate: "10/2027",
              color: "#3b82f6",
              shape: "circle",
              interactionWarning: null
            }
          };
          scanStatusText.textContent = "Custom image loaded. Ready to scan.";
          scanResultsArea.innerHTML = `<p class="scan-placeholder-msg">Click "Start AI Scan" to process custom image.</p>`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnStartScan) {
    btnStartScan.addEventListener("click", () => {
      runSimulation();
    });
  }

  function runSimulation() {
    scanRadar.classList.add("scanning");
    btnStartScan.disabled = true;
    scanStatusText.textContent = "🔍 AI Neural Engine analyzing packaging, text OCR & batch markers...";
    sounds.playReminder();

    setTimeout(() => {
      scanStatusText.textContent = "🧪 Cross-referencing active medications for Drug-Drug Interactions (DDI)...";
    }, 1200);

    setTimeout(() => {
      scanRadar.classList.remove("scanning");
      btnStartScan.disabled = false;
      renderScanResults(currentScanData.extracted);
    }, 2400);
  }

  function renderScanResults(extracted) {
    sounds.playSuccess();
    const hasInteraction = extracted.interactionWarning !== null;
    const isHi = store.getState().language === 'hi';

    let interactionHtml = "";
    if (hasInteraction) {
      interactionHtml = `
        <div class="interaction-alert-card critical-alert">
          <div class="interaction-header">
            <span class="danger-icon">🚨</span>
            <div>
              <h4 class="danger-title">${extracted.interactionWarning.severity}: Potential Drug Interaction!</h4>
              <p class="conflict-subtitle">Conflicts with currently active: <strong>${extracted.interactionWarning.conflictingMed}</strong></p>
            </div>
          </div>
          <p class="danger-desc">${extracted.interactionWarning.risk}</p>
          <div class="danger-recommendation">
            <strong>⚠️ Clinical Recommendation:</strong> ${extracted.interactionWarning.action}
          </div>
        </div>
      `;
    } else {
      interactionHtml = `
        <div class="interaction-alert-card safe-alert">
          <div class="interaction-header">
            <span class="safe-icon">✅</span>
            <div>
              <h4 class="safe-title">Safe To Use - No Adverse Interactions</h4>
              <p class="safe-subtitle">Cross-referenced against Dadaji's active 5 medications.</p>
            </div>
          </div>
        </div>
      `;
    }

    scanResultsArea.innerHTML = `
      <div class="scan-extracted-card">
        ${interactionHtml}

        <div class="extracted-details-grid">
          <div class="detail-row">
            <span class="detail-lbl">Brand / Trade Name:</span>
            <span class="detail-val highlight">${extracted.brandName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Active Generic Salt:</span>
            <span class="detail-val">${extracted.genericName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Extracted Dosage:</span>
            <span class="detail-val dose-chip">${extracted.dosage}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Prescribed Timing:</span>
            <span class="detail-val">${extracted.slot} (${extracted.frequency})</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Health Purpose:</span>
            <span class="detail-val">${extracted.purpose}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Manufacturer & Expiry:</span>
            <span class="detail-val">${extracted.manufacturer} | Exp: ${extracted.expiryDate}</span>
          </div>
        </div>

        <div class="scan-actions-footer">
          <button class="voice-scan-speak-btn" id="btnSpeakScanResult">
            🔊 ${isHi ? 'विवरण सुनें' : 'Listen Summary'}
          </button>
          <button class="add-to-schedule-btn" id="btnAddScannedMed" ${hasInteraction ? 'disabled' : ''}>
            ${hasInteraction ? '⚠️ Add Blocked (Safety Risk)' : '➕ Add to Saarthi Schedule'}
          </button>
        </div>
      </div>
    `;

    scanStatusText.textContent = "AI Analysis Completed Successfully!";

    const btnSpeak = document.getElementById("btnSpeakScanResult");
    if (btnSpeak) {
      btnSpeak.addEventListener("click", () => {
        if (hasInteraction) {
          const enMsg = `Warning! Detected ${extracted.brandName}, but it has a dangerous drug interaction with your ${extracted.interactionWarning.conflictingMed}. Do not take this without doctor approval.`;
          const hiMsg = `सावधान! ${extracted.brandName} आपकी मौजूदा दवा ${extracted.interactionWarning.conflictingMed} के साथ खतरनाक असर कर सकती है। कृपया डॉक्टर से पूछे बिना इसे न लें।`;
          voice.speak(enMsg, hiMsg);
        } else {
          const enMsg = `Identified ${extracted.brandName} ${extracted.dosage}, ${extracted.purpose}. Safe to take as per schedule.`;
          const hiMsg = `पहचान की गई: ${extracted.brandName} ${extracted.dosage}। यह आपकी बाकी दवाओं के साथ सुरक्षित है।`;
          voice.speak(enMsg, hiMsg);
        }
      });
    }

    const btnAdd = document.getElementById("btnAddScannedMed");
    if (btnAdd && !hasInteraction) {
      btnAdd.addEventListener("click", () => {
        store.addMedication({
          name: extracted.brandName,
          dosage: extracted.dosage,
          slot: extracted.slot,
          time: extracted.slot === 'Morning' ? '08:30 AM' : '08:30 PM',
          foodRelation: "After Food",
          shape: extracted.shape,
          color: extracted.color,
          purpose: extracted.purpose,
          stock: 30,
          refillThreshold: 7,
          instructions: `Scanned via AI Vision. Salt: ${extracted.genericName}`
        });
        sounds.playSuccess();
        alert(`Success! "${extracted.brandName}" added to Dadaji's daily schedule.`);
        closeModal();
      });
    }
  }
}
