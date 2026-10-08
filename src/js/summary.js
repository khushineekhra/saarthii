// SAARTHI Daily Health Summary & Doctor Health Passport Generator

import { store } from './state.js';
import { analyzeHealthPatterns } from './ai-patterns.js';
import { voice } from './voice.js';

export function generateDailySummary(state) {
  const analysis = analyzeHealthPatterns(state);
  const vitals = state.vitals || [];
  const latestVitals = vitals[vitals.length - 1] || {};
  const isHi = state.language === 'hi';

  const user = state.user;
  const meds = state.medications;
  const takenCount = meds.filter(m => m.takenToday).length;
  const pendingMeds = meds.filter(m => !m.takenToday);

  // English Version
  const summaryEn = `
    <strong>Daily Status for ${user.preferredName} (${user.name})</strong>:
    <br><br>
    • <strong>Medication Adherence</strong>: ${takenCount} of ${meds.length} doses taken (${analysis.adherencePercent}%). ${pendingMeds.length > 0 ? `Pending: ${pendingMeds.map(m => m.name).join(', ')}.` : 'All doses completed!'}
    <br>
    • <strong>Vitals Snapshot</strong>: BP ${latestVitals.systolic}/${latestVitals.diastolic} mmHg, Pulse ${latestVitals.pulse} bpm, Blood Glucose ${latestVitals.bloodSugar} mg/dL (${latestVitals.sugarType}).
    <br>
    • <strong>Hydration & Routine</strong>: ${state.hydration.current} of ${state.hydration.target} glasses consumed. Mood logged as "${state.dailyCheckIn.mood || 'Good'}".
    <br>
    • <strong>AI Pattern Insights</strong>: ${analysis.alerts.length > 0 ? analysis.alerts[0].observation : 'All patterns within baseline parameters.'}
  `;

  // Hindi Version
  const summaryHi = `
    <strong>${user.preferredName} (${user.name}) का दैनिक स्वास्थ्य सारांश</strong>:
    <br><br>
    • <strong>दवाओं का विवरण</strong>: आज कुल ${meds.length} में से ${takenCount} दवाएं ली गईं (${analysis.adherencePercent}%)। ${pendingMeds.length > 0 ? `बाकी दवाएं: ${pendingMeds.map(m => m.name).join(', ')}।` : 'सभी दवाएं समय पर ली गईं!'}
    <br>
    • <strong>स्वास्थ्य माप (Vitals)</strong>: बीपी ${latestVitals.systolic}/${latestVitals.diastolic} mmHg, पल्स ${latestVitals.pulse} bpm, शुगर ${latestVitals.bloodSugar} mg/dL।
    <br>
    • <strong>पानी और दिनचर्या</strong>: आज ${state.hydration.current} गिलास पानी पिया। मूड: "${state.dailyCheckIn.mood || 'अच्छा'}"।
    <br>
    • <strong>एआई स्वास्थ्य विश्लेषण</strong>: ${analysis.alerts.length > 0 ? (analysis.alerts[0].observationHi || analysis.alerts[0].observation) : 'सभी स्वास्थ्य संकेत सामान्य स्थिति में हैं।'}
  `;

  return {
    html: isHi ? summaryHi : summaryEn,
    plainText: isHi ? stripHtml(summaryHi) : stripHtml(summaryEn),
    analysis
  };
}

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function openHealthPassportModal() {
  const state = store.getState();
  const modal = document.getElementById("passportModal");
  const content = document.getElementById("passportContent");
  if (!modal || !content) return;

  const analysis = analyzeHealthPatterns(state);
  const user = state.user;
  const vitals = state.vitals || [];
  const meds = state.medications || [];

  content.innerHTML = `
    <div class="passport-document" id="printablePassport">
      <div class="passport-header">
        <div class="passport-brand">
          <div class="passport-logo-icon">🌿</div>
          <div>
            <h2 class="passport-title">SAARTHI CLINICAL HEALTH PASSPORT</h2>
            <p class="passport-subtitle">Elderly Comprehensive Daily & Longitudinal Record</p>
          </div>
        </div>
        <div class="passport-timestamp">
          <span>Date Generated:</span>
          <strong>${new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</strong>
        </div>
      </div>

      <div class="passport-patient-grid">
        <div class="p-card">
          <div class="p-label">PATIENT NAME</div>
          <div class="p-value">${user.name} (${user.preferredName})</div>
        </div>
        <div class="p-card">
          <div class="p-label">AGE / GENDER</div>
          <div class="p-value">${user.age} Years / ${user.gender}</div>
        </div>
        <div class="p-card">
          <div class="p-label">BLOOD GROUP</div>
          <div class="p-value">${user.bloodGroup}</div>
        </div>
        <div class="p-card">
          <div class="p-label">PRIMARY CAREGIVER</div>
          <div class="p-value">${user.caregiver.name} (${user.caregiver.relation})<br>${user.caregiver.phone}</div>
        </div>
        <div class="p-card">
          <div class="p-label">TREATING PHYSICIAN</div>
          <div class="p-value">${user.doctor.name} (${user.doctor.specialty})<br>${user.doctor.hospital}</div>
        </div>
        <div class="p-card">
          <div class="p-label">HEALTH SCORE INDEX</div>
          <div class="p-value" style="color: ${analysis.overallHealthIndex.color}">
            <strong>${analysis.overallHealthIndex.score} / 100</strong> (${analysis.overallHealthIndex.status})
          </div>
        </div>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">1. CURRENT ACTIVE MEDICATIONS & SCHEDULE</h3>
        <table class="passport-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Slot & Time</th>
              <th>Relation to Food</th>
              <th>Indication</th>
              <th>Today Status</th>
            </tr>
          </thead>
          <tbody>
            ${meds.map(m => `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.dosage}</td>
                <td>${m.slot} (${m.time})</td>
                <td>${m.foodRelation}</td>
                <td>${m.purpose}</td>
                <td><span class="status-badge ${m.takenToday ? 'taken' : 'pending'}">${m.takenToday ? 'Taken' : 'Pending'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">2. VITALS LONGITUDINAL RECORD (LAST 7 DAYS)</h3>
        <table class="passport-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Pressure (mmHg)</th>
              <th>Pulse (bpm)</th>
              <th>Blood Sugar (mg/dL)</th>
              <th>SpO2</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            ${vitals.slice(-7).reverse().map(v => `
              <tr>
                <td>${v.date}</td>
                <td>${v.time}</td>
                <td><strong style="color: ${v.systolic >= 140 ? '#ef4444' : 'inherit'}">${v.systolic}/${v.diastolic}</strong></td>
                <td>${v.pulse}</td>
                <td>${v.bloodSugar} (${v.sugarType})</td>
                <td>${v.spo2}%</td>
                <td>${v.weight} kg</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">3. AI PATTERN ANOMALIES & CLINICAL HIGHLIGHTS</h3>
        <div class="passport-ai-box">
          ${analysis.alerts.map(a => `
            <div class="p-alert-item ${a.severity}">
              <strong>[${a.category.toUpperCase()}] ${a.title}</strong>: ${a.observation}
              <div class="p-rec"><em>AI Clinical Note:</em> ${a.aiDiagnosis} | <strong>Recommendation:</strong> ${a.actionRequired}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="passport-footer">
        <p>Saarthi AI Telehealth Record System • Designed for elderly care and family peace of mind • Confidential Medical Summary</p>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

export function sendWhatsAppCaregiverDigest() {
  const state = store.getState();
  const analysis = analyzeHealthPatterns(state);
  const vitals = state.vitals || [];
  const latest = vitals[vitals.length - 1] || {};
  const user = state.user;

  const phone = user.caregiver.whatsapp.replace(/[^0-9]/g, '');
  const text = `🌿 *SAARTHI DAILY HEALTH UPDATE for ${user.name} (${user.preferredName})* 🌿
📅 Date: ${new Date().toLocaleDateString('en-IN')}

💊 *Medications*: ${analysis.takenMeds}/${analysis.totalMeds} taken today (${analysis.adherencePercent}% adherence)
🩺 *Latest Vitals*:
• Blood Pressure: ${latest.systolic}/${latest.diastolic} mmHg
• Pulse: ${latest.pulse} bpm
• Blood Glucose: ${latest.bloodSugar} mg/dL (${latest.sugarType})
💧 *Hydration*: ${state.hydration.current}/8 glasses completed

⚠️ *AI Clinical Insight*:
${analysis.alerts.length > 0 ? `• ${analysis.alerts[0].title}: ${analysis.alerts[0].observation}` : '• All health parameters stable today!'}

✨ Health Index: *${analysis.overallHealthIndex.score}/100 (${analysis.overallHealthIndex.status})*
_Generated via Saarthi Elderly Care AI Assistant_`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
