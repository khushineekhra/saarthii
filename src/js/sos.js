// SAARTHI Emergency SOS Beacon & Caregiver Alert Dispatcher

import { store } from './state.js';
import { sounds } from './sound.js';
import { voice } from './voice.js';

let countdownTimer = null;
let sirenInterval = null;
let secondsLeft = 5;

export function initSOS() {
  const sosModal = document.getElementById("sosModal");
  const btnTriggerSOS = document.getElementById("btnTriggerSOS");
  const btnSeniorSOS = document.getElementById("btnSeniorSOS");
  const btnCancelSOS = document.getElementById("btnCancelSOS");
  const btnStopSiren = document.getElementById("btnStopSiren");
  const sosCountdownNum = document.getElementById("sosCountdownNum");
  const sosCountdownPhase = document.getElementById("sosCountdownPhase");
  const sosTriggeredPhase = document.getElementById("sosTriggeredPhase");
  const btnSendSOSWhatsApp = document.getElementById("btnSendSOSWhatsApp");

  if (!sosModal) return;

  function startSOSSequence() {
    sosModal.classList.add("active");
    sosCountdownPhase.style.display = "block";
    sosTriggeredPhase.style.display = "none";
    secondsLeft = 5;
    sosCountdownNum.textContent = secondsLeft;

    sounds.playTick();
    const isHi = store.getState().language === 'hi';
    voice.speak(
      "Emergency SOS initiating in 5 seconds. Press cancel if this was a mistake.",
      "आपातकालीन एसओएस 5 सेकंड में शुरू हो रहा है। अगर यह गलती से दबा है तो रद्द करें।"
    );

    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft > 0) {
        sosCountdownNum.textContent = secondsLeft;
        sounds.playTick();
      } else {
        clearInterval(countdownTimer);
        fireEmergency();
      }
    }, 1000);
  }

  function cancelSOS() {
    clearInterval(countdownTimer);
    clearInterval(sirenInterval);
    sosModal.classList.remove("active");
    const isHi = store.getState().language === 'hi';
    voice.speak("Emergency SOS cancelled.", "एसओएस रद्द कर दिया गया है।");
  }

  function fireEmergency() {
    sosCountdownPhase.style.display = "none";
    sosTriggeredPhase.style.display = "block";

    sounds.playAlarm();
    sirenInterval = setInterval(() => {
      sounds.playAlarm();
    }, 1200);

    const isHi = store.getState().language === 'hi';
    voice.speak(
      "Emergency beacon activated! Family and doctors are being alerted now.",
      "आपातकालीन अलार्म सक्रिय हो गया है! परिवार और डॉक्टर को सूचना भेजी जा रही है।"
    );
  }

  function stopSiren() {
    clearInterval(sirenInterval);
    sosModal.classList.remove("active");
  }

  if (btnTriggerSOS) btnTriggerSOS.addEventListener("click", startSOSSequence);
  if (btnSeniorSOS) btnSeniorSOS.addEventListener("click", startSOSSequence);
  if (btnCancelSOS) btnCancelSOS.addEventListener("click", cancelSOS);
  if (btnStopSiren) btnStopSiren.addEventListener("click", stopSiren);

  // Listen for voice command event
  window.addEventListener('saarthi-trigger-sos', () => {
    startSOSSequence();
  });

  if (btnSendSOSWhatsApp) {
    btnSendSOSWhatsApp.addEventListener("click", () => {
      const state = store.getState();
      const user = state.user;
      const phone = user.caregiver.whatsapp.replace(/[^0-9]/g, '');
      const lat = 28.6139;
      const lng = 77.2090;
      const msg = `🚨🚨 *EMERGENCY SOS ALERT FROM SAARTHI* 🚨🚨
Patient: *${user.name} (${user.preferredName})*
Age: ${user.age} | Blood: ${user.bloodGroup}

Dadaji has pressed the emergency SOS distress beacon!
Immediate phone call or assistance required.

📍 *Live Location*:
https://maps.google.com/?q=${lat},${lng}

Treating Doctor: ${user.doctor.name} (${user.doctor.phone})`;

      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
}
