// SAARTHI Medication, Hydration & Routine Activity Manager

import { store } from './state.js';
import { sounds } from './sound.js';
import { voice } from './voice.js';

export function renderMedications(containerId, activeSlot = "all") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = store.getState();
  const meds = state.medications || [];

  const filtered = activeSlot === "all" 
    ? meds 
    : meds.filter(m => m.slot.toLowerCase() === activeSlot.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">💊</span>
        <p>No medications scheduled for ${activeSlot}.</p>
      </div>
    `;
    return;
  }

  const isSenior = state.uiMode === 'senior';
  const isHi = state.language === 'hi';

  const html = filtered.map(med => {
    const isTaken = med.takenToday;
    const isLowStock = med.stock <= med.refillThreshold;

    return `
      <div class="med-card ${isTaken ? 'med-taken' : 'med-pending'} ${isSenior ? 'senior-med-card' : ''}" data-id="${med.id}">
        <div class="med-left">
          <div class="pill-badge" style="background-color: ${med.color}22; border-color: ${med.color}; color: ${med.color}">
            <span class="pill-shape pill-${med.shape}" style="background-color: ${med.color}"></span>
            <span class="pill-slot">${med.slot}</span>
          </div>

          <div class="med-info">
            <div class="med-title-row">
              <h3 class="med-name">${med.name}</h3>
              <span class="med-dose">${med.dosage}</span>
            </div>
            
            <p class="med-purpose">
              <span class="purpose-icon">🎯</span> ${med.purpose}
            </p>

            <div class="med-meta-tags">
              <span class="meta-tag timing-tag">
                ⏰ ${med.time}
              </span>
              <span class="meta-tag food-tag">
                🍽️ ${med.foodRelation}
              </span>
              ${isLowStock ? `
                <span class="meta-tag low-stock-tag">
                  ⚠️ Stock: ${med.stock} left
                </span>
              ` : `
                <span class="meta-tag stock-tag">
                  📦 In box: ${med.stock}
                </span>
              `}
            </div>

            ${med.instructions ? `
              <p class="med-instructions">💡 ${med.instructions}</p>
            ` : ''}
          </div>
        </div>

        <div class="med-actions">
          <button class="voice-listen-btn" title="Listen instructions" data-speak-med="${med.id}">
            🔊
          </button>

          <button class="med-edit-btn" title="Edit medication" data-edit-med="${med.id}">
            ✏️
          </button>

          <button class="med-toggle-btn ${isTaken ? 'btn-taken' : 'btn-take-now'}" data-toggle-med="${med.id}">
            ${isTaken ? `
              <span class="check-icon">✓</span>
              <span class="btn-text">${isHi ? 'ली गई' : 'Taken'} (${med.takenAt || 'Today'})</span>
            ` : `
              <span class="take-icon">○</span>
              <span class="btn-text">${isHi ? 'दवा ली' : 'Mark Taken'}</span>
            `}
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = html;

  // Attach event listeners
  container.querySelectorAll('[data-toggle-med]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-toggle-med');
      store.toggleMedication(id);
      sounds.playSuccess();
    });
  });

  container.querySelectorAll('[data-edit-med]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-edit-med');
      if (window.openEditMedicationModal) {
        window.openEditMedicationModal(id);
      }
    });
  });

  container.querySelectorAll('[data-speak-med]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-speak-med');
      const med = meds.find(m => m.id === id);
      if (med) {
        const enMsg = `${med.name}, ${med.dosage}. Scheduled for ${med.slot} at ${med.time}. Take ${med.foodRelation}. ${med.instructions || ''}`;
        const hiMsg = `${med.name}, मात्रा ${med.dosage}। ${med.slot} में ${med.time} बजे, ${med.foodRelation} लेनी है। ${med.purpose} के लिए।`;
        voice.speak(enMsg, hiMsg);
      }
    });
  });
}

export function renderHydrationWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = store.getState();
  const hyd = state.hydration;
  const isHi = state.language === 'hi';
  const percent = Math.min(100, Math.round((hyd.current / hyd.target) * 100));

  let glassesIcons = '';
  for (let i = 1; i <= hyd.target; i++) {
    const isFilled = i <= hyd.current;
    glassesIcons += `
      <button class="glass-icon ${isFilled ? 'filled' : 'empty'}" data-glass-idx="${i}" title="Glass ${i}">
        ${isFilled ? '💧' : '🥛'}
      </button>
    `;
  }

  container.innerHTML = `
    <div class="hydration-card">
      <div class="hyd-header">
        <div class="hyd-title-wrap">
          <span class="hyd-icon">💧</span>
          <div>
            <h4 class="hyd-title">${isHi ? 'दैनिक जल सेवन' : 'Daily Hydration Tracker'}</h4>
            <p class="hyd-sub">${hyd.current} of ${hyd.target} ${isHi ? 'गिलास पूरे' : 'Glasses Consumed'}</p>
          </div>
        </div>
        <div class="hyd-badge ${percent >= 100 ? 'badge-goal-met' : ''}">
          ${percent}% ${percent >= 100 ? '🎉 Goal Met!' : ''}
        </div>
      </div>

      <div class="hyd-progress-bar-bg">
        <div class="hyd-progress-bar-fill" style="width: ${percent}%;"></div>
      </div>

      <div class="glasses-row">
        ${glassesIcons}
      </div>

      <div class="hyd-actions-row">
        <button class="hyd-add-btn" id="btnAddWater">
          ➕ ${isHi ? '1 गिलास पानी पिया' : '+1 Glass of Water'}
        </button>
        <button class="hyd-reset-btn" id="btnResetWater" title="Reset counter">
          ↺
        </button>
      </div>
    </div>
  `;

  const btnAdd = container.querySelector('#btnAddWater');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      store.addHydration();
      sounds.playWater();
    });
  }

  const btnReset = container.querySelector('#btnResetWater');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm(isHi ? "क्या आप पानी का काउंटर रीसेट करना चाहते हैं?" : "Reset today's water counter?")) {
        store.resetHydration();
      }
    });
  }
}

export function renderAppointments(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = store.getState();
  const apts = state.appointments || [];
  const isHi = state.language === 'hi';

  if (apts.length === 0) {
    container.innerHTML = `<div class="empty-state">No upcoming appointments scheduled.</div>`;
    return;
  }

  const html = apts.map(apt => {
    return `
      <div class="apt-card">
        <div class="apt-date-badge">
          <span class="apt-calendar-icon">📅</span>
          <span class="apt-date-text">${apt.date}</span>
          <span class="apt-time-text">${apt.time}</span>
        </div>

        <div class="apt-details">
          <div class="apt-type-chip">${apt.type}</div>
          <h4 class="apt-title">${apt.title}</h4>
          <p class="apt-doctor">👨‍⚕️ ${apt.doctor}</p>
          <p class="apt-hospital">🏥 ${apt.hospital}</p>
          ${apt.notes ? `<p class="apt-notes">📝 ${apt.notes}</p>` : ''}
        </div>

        <div class="apt-action">
          <button class="apt-listen-btn" data-speak-apt="${apt.id}" title="Read appointment details">
            🔊
          </button>
          <button class="apt-edit-btn" data-edit-apt="${apt.id}" title="Edit appointment">
            ✏️
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = html;

  container.querySelectorAll('[data-edit-apt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-apt');
      if (window.openEditAppointmentModal) {
        window.openEditAppointmentModal(id);
      }
    });
  });

  container.querySelectorAll('[data-speak-apt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-speak-apt');
      const apt = apts.find(a => a.id === id);
      if (apt) {
        const enMsg = `Appointment for ${apt.title} with ${apt.doctor} on ${apt.date} at ${apt.time}. Location: ${apt.hospital}. Note: ${apt.notes || 'None'}`;
        const hiMsg = `${apt.title} के लिए अपॉइंटमेंट ${apt.doctor} के साथ ${apt.date} को ${apt.time} बजे है। स्थान: ${apt.hospital}।`;
        voice.speak(enMsg, hiMsg);
      }
    });
  });
}
