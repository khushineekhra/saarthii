// SAARTHI Bilingual Conversational Voice Assistant ("Suno Saarthi")
// Supports Web Speech API (SpeechSynthesis & SpeechRecognition) with Hindi & English natural parsing

import { store } from './state.js';
import { sounds } from './sound.js';

class VoiceAssistant {
  constructor() {
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.onStateChange = null;
    this.initRecognition();
  }

  initRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = store.getState().language === 'hi' ? 'hi-IN' : 'en-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.notifyState();
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Voice transcript heard:", transcript);
        this.handleCommand(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition notice:", event.error);
        this.isListening = false;
        this.notifyState();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.notifyState();
      };
    }
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange({
        isListening: this.isListening,
        isSpeaking: this.isSpeaking
      });
    }
  }

  toggleListening() {
    if (!this.recognition) {
      this.speak("Speech recognition is not supported in this browser. Please use Chrome or Edge.", "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      sounds.playReminder();
      this.recognition.lang = store.getState().language === 'hi' ? 'hi-IN' : 'en-IN';
      try {
        this.recognition.start();
      } catch (err) {
        console.warn("Recognition start error:", err);
      }
    }
  }

  speak(textEn, textHi) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any pending utterance

    const state = store.getState();
    const isHi = state.language === 'hi';
    const textToSpeak = isHi ? (textHi || textEn) : textEn;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88; // Slightly slower, calm cadence for elderly comprehension
    utterance.pitch = 1.05;

    // Pick a natural voice if available
    const voices = this.synth.getVoices();
    if (isHi) {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
      if (hiVoice) utterance.voice = hiVoice;
      else utterance.lang = 'hi-IN';
    } else {
      const enVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')));
      if (enVoice) utterance.voice = enVoice;
      else utterance.lang = 'en-US';
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notifyState();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notifyState();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.notifyState();
    };

    this.synth.speak(utterance);
  }

  handleCommand(query) {
    const q = query.toLowerCase().trim();
    const state = store.getState();
    const isHi = state.language === 'hi';

    // 1. SOS / Emergency command
    if (q.includes('help') || q.includes('bachao') || q.includes('madad') || q.includes('emergency') || q.includes('sos') || q.includes('gir gaya') || q.includes('fallen')) {
      window.dispatchEvent(new CustomEvent('saarthi-trigger-sos'));
      this.speak("Emergency SOS initiated. Alerting your family right now.", "आपातकालीन एसओएस शुरू किया गया है। आपके परिवार को तुरंत सतर्क किया जा रहा है।");
      return;
    }

    // 2. Medicine Taken Command ("Maine goli le li", "Took my medicine", "I took aspirin", etc.)
    if (q.includes('took') || q.includes('goli le li') || q.includes('dawai le li') || q.includes('taken') || q.includes('kha li')) {
      // Find pending medicine
      const pendingMeds = state.medications.filter(m => !m.takenToday);
      if (pendingMeds.length > 0) {
        // Try matching specific medicine if named
        let matched = pendingMeds.find(m => q.includes(m.name.toLowerCase().split(' ')[0]));
        if (!matched) matched = pendingMeds[0];

        store.toggleMedication(matched.id);
        sounds.playSuccess();
        const enMsg = `Wonderful! Logged ${matched.name} as taken. Great job staying healthy!`;
        const hiMsg = `बहुत बढ़िया दादाजी! ${matched.name} ले ली गई है। आपकी सेहत का ख्याल रखना हमारा काम है।`;
        this.speak(enMsg, hiMsg);
      } else {
        this.speak("All scheduled medicines for today have already been marked as taken! You are doing fantastic.", "आज की सभी निर्धारित दवाएं पहले ही ली जा चुकी हैं! आप बहुत अच्छा कर रहे हैं।");
      }
      return;
    }

    // 3. Water / Hydration Command ("Paani piya", "Log water", "Drank water")
    if (q.includes('paani') || q.includes('pani') || q.includes('water') || q.includes('drank') || q.includes('piya')) {
      store.addHydration();
      sounds.playWater();
      const count = store.getState().hydration.current;
      const enMsg = `Logged 1 glass of water. You have reached ${count} out of 8 glasses today. Stay well hydrated!`;
      const hiMsg = `शाबाश! एक गिलास पानी दर्ज कर लिया गया है। आज कुल ${count} गिलास हो चुके हैं।`;
      this.speak(enMsg, hiMsg);
      return;
    }

    // 4. Blood Pressure / Vitals Logging by Voice ("Mera BP 130 85 hai" or "My BP is 120 over 80")
    const bpMatch = q.match(/(\d{2,3})\s*(?:by|over|\/|\s)\s*(\d{2,3})/);
    if ((q.includes('bp') || q.includes('pressure') || q.includes('blood pressure')) && bpMatch) {
      const systolic = parseInt(bpMatch[1], 10);
      const diastolic = parseInt(bpMatch[2], 10);
      store.addVitals({
        systolic,
        diastolic,
        pulse: 76,
        bloodSugar: 120,
        sugarType: "Recorded",
        spo2: 98,
        weight: 68.4
      });
      sounds.playSuccess();
      const enMsg = `Blood pressure recorded as ${systolic} over ${diastolic} mmHg. AI health analysis updated.`;
      const hiMsg = `ब्लड प्रेशर ${systolic} और ${diastolic} दर्ज कर लिया गया है। स्वास्थ्य विश्लेषण अपडेट हो गया है।`;
      this.speak(enMsg, hiMsg);
      return;
    }

    // 5. Next medicine / Schedule inquiry ("Agle dawai kab hai", "What is my next medicine?")
    if (q.includes('next') || q.includes('agli') || q.includes('kab hai') || q.includes('schedule') || q.includes('timing')) {
      const pendingMeds = state.medications.filter(m => !m.takenToday);
      if (pendingMeds.length > 0) {
        const nextMed = pendingMeds[0];
        const enMsg = `Your next medicine is ${nextMed.name} (${nextMed.dosage}) scheduled for ${nextMed.slot} at ${nextMed.time}, ${nextMed.foodRelation}.`;
        const hiMsg = `आपकी अगली दवा है ${nextMed.name}, जो ${nextMed.slot} में ${nextMed.time} बजे लेनी है, ${nextMed.foodRelation}।`;
        this.speak(enMsg, hiMsg);
      } else {
        this.speak("All medications for today have been taken! Rest well.", "आज की सभी दवाएं पूरी हो चुकी हैं। आप आराम कीजिए।");
      }
      return;
    }

    // 6. Doctor Appointment Inquiry ("Doctor appointment", "Doctor kab milenge")
    if (q.includes('doctor') || q.includes('appointment') || q.includes('hospital') || q.includes('clinic')) {
      const upcoming = state.appointments[0];
      if (upcoming) {
        const enMsg = `You have an appointment with ${upcoming.doctor} on ${upcoming.date} at ${upcoming.time} for ${upcoming.title}.`;
        const hiMsg = `आपका अगला अपॉइंटमेंट ${upcoming.doctor} के साथ ${upcoming.date} को ${upcoming.time} बजे है।`;
        this.speak(enMsg, hiMsg);
      } else {
        this.speak("You have no pending doctor appointments for this week.", "इस सप्ताह कोई डॉक्टर अपॉइंटमेंट नहीं है।");
      }
      return;
    }

    // 7. General wellness / "How are you"
    if (q.includes('kaise ho') || q.includes('kaisa hai') || q.includes('hello') || q.includes('namaste') || q.includes('hi saarthi')) {
      const enMsg = `Namaste Dadaji! I am Saarthi, your health companion. How are you feeling right now? Remember to drink some water.`;
      const hiMsg = `नमस्ते दादाजी! मैं आपका सारथी हूँ। आप अभी कैसा महसूस कर रहे हैं? अगर कोई परेशानी हो तो मुझे बताएं।`;
      this.speak(enMsg, hiMsg);
      return;
    }

    // Fallback friendly guidance
    const enFallback = `I heard: "${query}". You can ask me to log your medicines, check your BP, add water, or read doctor appointments.`;
    const hiFallback = `मैंने सुना: "${query}"। आप मुझसे दवा नोट करने, पानी जोड़ने या डॉक्टर अपॉइंटमेंट पूछने के लिए कह सकते हैं।`;
    this.speak(enFallback, hiFallback);
  }
}

export const voice = new VoiceAssistant();
