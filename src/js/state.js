// SAARTHI Central State Store with LocalStorage Persistence & Event Emitter

const DEFAULT_STATE = {
  user: {
    name: "Ramesh Chandra Sharma",
    preferredName: "Dadaji",
    age: 74,
    gender: "Male",
    bloodGroup: "B+",
    role: "senior", // 'senior' or 'caregiver'
    email: "ramesh.sharma74@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    caregiver: {
      name: "Ananya Sharma Verma",
      relation: "Daughter",
      phone: "+91 98765 43210",
      email: "ananya.verma@example.com",
      whatsapp: "+919876543210"
    },
    doctor: {
      name: "Dr. A. K. Banerjee",
      specialty: "Senior Cardiologist",
      hospital: "Apollo Heart Centre, New Delhi",
      phone: "+91 98111 22334"
    }
  },
  uiMode: "senior", // 'senior' (simplified big UI) or 'caregiver' (detailed clinical UI)
  theme: "dark", // 'dark' or 'light'
  language: "hi", // 'hi' (Hindi) or 'en' (English)
  highContrast: false,
  soundEnabled: true,
  
  hydration: {
    current: 5,
    target: 8,
    unit: "glasses"
  },

  dailyCheckIn: {
    completedToday: true,
    mood: "good", // 'great', 'good', 'okay', 'tired', 'unwell'
    cognitiveScore: 4, // out of 4 (orientation, memory, recall)
    notes: "Feeling light-headed around 4 PM, slept 7 hours peacefully.",
    timestamp: new Date().toISOString()
  },

  medications: [
    {
      id: "med-1",
      name: "Amlodipine (Norvasc)",
      dosage: "5 mg",
      slot: "Morning",
      time: "08:30 AM",
      foodRelation: "After Breakfast",
      shape: "circle",
      color: "#38bdf8",
      purpose: "Blood Pressure control",
      takenToday: true,
      takenAt: "08:45 AM",
      stock: 18,
      refillThreshold: 5,
      instructions: "Do not skip; swallow whole with water."
    },
    {
      id: "med-2",
      name: "Metformin Glycomet",
      dosage: "500 mg",
      slot: "Morning",
      time: "08:30 AM",
      foodRelation: "With Breakfast",
      shape: "capsule",
      color: "#fb923c",
      purpose: "Diabetes Sugar control",
      takenToday: true,
      takenAt: "08:46 AM",
      stock: 24,
      refillThreshold: 7,
      instructions: "Take with meal to avoid stomach upset."
    },
    {
      id: "med-3",
      name: "Eco-Aspirin",
      dosage: "75 mg",
      slot: "Afternoon",
      time: "01:30 PM",
      foodRelation: "After Lunch",
      shape: "circle",
      color: "#ec4899",
      purpose: "Heart protection / blood thinner",
      takenToday: false,
      takenAt: null,
      stock: 12,
      refillThreshold: 5,
      instructions: "Take after lunch. Avoid taking empty stomach."
    },
    {
      id: "med-4",
      name: "Atorvastatin (Atorva)",
      dosage: "10 mg",
      slot: "Night",
      time: "09:00 PM",
      foodRelation: "After Dinner",
      shape: "oval",
      color: "#a855f7",
      purpose: "Cholesterol regulation",
      takenToday: false,
      takenAt: null,
      stock: 4, // Low stock trigger!
      refillThreshold: 6,
      instructions: "Take at bedtime consistently."
    },
    {
      id: "med-5",
      name: "Calcium + Vit D3",
      dosage: "500 IU",
      slot: "Night",
      time: "09:00 PM",
      foodRelation: "After Dinner",
      shape: "capsule",
      color: "#10b981",
      purpose: "Bone density & joint support",
      takenToday: false,
      takenAt: null,
      stock: 30,
      refillThreshold: 10,
      instructions: "Take with warm milk or water."
    }
  ],

  // Past 7 days vitals for pattern recognition & charts
  vitals: [
    { id: "v1", date: "2026-10-02", time: "08:00 AM", systolic: 132, diastolic: 84, pulse: 72, bloodSugar: 110, sugarType: "Fasting", spo2: 98, weight: 68.2 },
    { id: "v2", date: "2026-10-03", time: "08:15 AM", systolic: 135, diastolic: 86, pulse: 74, bloodSugar: 115, sugarType: "Fasting", spo2: 97, weight: 68.0 },
    { id: "v3", date: "2026-10-04", time: "08:10 AM", systolic: 138, diastolic: 88, pulse: 76, bloodSugar: 122, sugarType: "Fasting", spo2: 98, weight: 68.1 },
    { id: "v4", date: "2026-10-05", time: "08:30 AM", systolic: 146, diastolic: 92, pulse: 82, bloodSugar: 148, sugarType: "Post-Meal", spo2: 96, weight: 68.3 },
    { id: "v5", date: "2026-10-06", time: "08:20 AM", systolic: 154, diastolic: 95, pulse: 85, bloodSugar: 162, sugarType: "Post-Meal", spo2: 97, weight: 68.5 },
    { id: "v6", date: "2026-10-07", time: "08:00 AM", systolic: 160, diastolic: 98, pulse: 88, bloodSugar: 138, sugarType: "Fasting", spo2: 96, weight: 68.4 },
    { id: "v7", date: "2026-10-08", time: "08:15 AM", systolic: 158, diastolic: 96, pulse: 84, bloodSugar: 130, sugarType: "Fasting", spo2: 97, weight: 68.4 }
  ],

  appointments: [
    {
      id: "apt-1",
      title: "Cardiology Review & Echo Test",
      doctor: "Dr. A. K. Banerjee",
      hospital: "Apollo Heart Centre, New Delhi",
      date: "2026-10-12",
      time: "10:30 AM",
      type: "Doctor",
      notes: "Carry recent BP log and eco-aspirin prescription."
    },
    {
      id: "apt-2",
      title: "Knee Physiotherapy Session",
      doctor: "Dr. Pooja Mehra (PT)",
      hospital: "Home Visit Care",
      date: "2026-10-09",
      time: "04:30 PM",
      type: "Therapy",
      notes: "Keep knee heating pad ready."
    },
    {
      id: "apt-3",
      title: "Fasting Blood Sugar & HbA1c Lab Test",
      doctor: "Lal PathLabs Sample Collection",
      hospital: "Home Collection",
      date: "2026-10-15",
      time: "07:30 AM",
      type: "Lab",
      notes: "10 hours fasting required before sample."
    }
  ],

  dailyActivities: [
    { id: "act-1", title: "Morning Walk in Garden", time: "06:45 AM", completed: true, icon: "🚶" },
    { id: "act-2", title: "Pranayama & Deep Breathing", time: "07:30 AM", completed: true, icon: "🧘" },
    { id: "act-3", title: "Sunlight & Vitamin D Exposure", time: "09:30 AM", completed: true, icon: "☀️" },
    { id: "act-4", title: "Evening Stretch / Light Walk", time: "05:30 PM", completed: false, icon: "🌳" },
    { id: "act-5", title: "Video Call with Granddaughter Tara", time: "07:00 PM", completed: false, icon: "📱" }
  ]
};

class StateStore {
  constructor() {
    this.subscribers = [];
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem("saarthi_health_state_v1");
      if (stored) {
        return { ...DEFAULT_STATE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Could not load stored state, using defaults:", e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem("saarthi_health_state_v1", JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not persist state:", e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  // Notify subscribers and persist state to backend
  async notify(event, payload) {
    // Persist locally (fallback)
    this.saveState();
    // Sync with backend (non‑blocking)
    fetch('http://localhost:4000/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).catch(err => console.warn('Backend sync failed:', err));
    // Notify UI subscribers
    this.subscribers.forEach(fn => {
      try {
        fn(this.state, event, payload);
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    });
  }

  // --- ACTIONS ---

  toggleMedication(id) {
    const med = this.state.medications.find(m => m.id === id);
    if (med) {
      med.takenToday = !med.takenToday;
      if (med.takenToday) {
        const d = new Date();
        med.takenAt = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        med.stock = Math.max(0, med.stock - 1);
      } else {
        med.takenAt = null;
        med.stock += 1;
      }
      this.notify("medication_updated", med);
    }
  }

  addMedication(newMed) {
    this.state.medications.push({
      id: "med-" + Date.now(),
      takenToday: false,
      takenAt: null,
      ...newMed
    });
    this.notify("medication_added", newMed);
  }

  updateMedication(id, updatedData) {
    const idx = this.state.medications.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.state.medications[idx] = { ...this.state.medications[idx], ...updatedData };
      this.notify("medication_updated", this.state.medications[idx]);
    }
  }

  deleteMedication(id) {
    this.state.medications = this.state.medications.filter(m => m.id !== id);
    this.notify("medication_deleted", id);
  }

  // --- APPOINTMENTS CRUD ---
  addAppointment(newApt) {
    const apt = {
      id: "apt-" + Date.now(),
      ...newApt
    };
    this.state.appointments.push(apt);
    this.notify("appointment_added", apt);
  }

  updateAppointment(id, updatedData) {
    const idx = this.state.appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.state.appointments[idx] = { ...this.state.appointments[idx], ...updatedData };
      this.notify("appointment_updated", this.state.appointments[idx]);
    }
  }

  deleteAppointment(id) {
    this.state.appointments = this.state.appointments.filter(a => a.id !== id);
    this.notify("appointment_deleted", id);
  }

  // --- ACTIVITIES CRUD ---
  addActivity(newAct) {
    const act = {
      id: "act-" + Date.now(),
      completed: false,
      icon: "🏃‍♂️",
      ...newAct
    };
    this.state.dailyActivities.push(act);
    this.notify("activity_added", act);
  }

  updateActivity(id, updatedData) {
    const idx = this.state.dailyActivities.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.state.dailyActivities[idx] = { ...this.state.dailyActivities[idx], ...updatedData };
      this.notify("activity_updated", this.state.dailyActivities[idx]);
    }
  }

  deleteActivity(id) {
    this.state.dailyActivities = this.state.dailyActivities.filter(a => a.id !== id);
    this.notify("activity_deleted", id);
  }

  addHydration() {
    if (this.state.hydration.current < 15) {
      this.state.hydration.current += 1;
      this.notify("hydration_updated", this.state.hydration);
    }
  }

  resetHydration() {
    this.state.hydration.current = 0;
    this.notify("hydration_updated", this.state.hydration);
  }

  addVitals(entry) {
    const newRecord = {
      id: "v-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...entry
    };
    this.state.vitals.push(newRecord);
    this.notify("vitals_added", newRecord);
  }

  toggleActivity(id) {
    const act = this.state.dailyActivities.find(a => a.id === id);
    if (act) {
      act.completed = !act.completed;
      this.notify("activity_updated", act);
    }
  }

  setMood(mood, notes = "") {
    this.state.dailyCheckIn = {
      completedToday: true,
      mood,
      notes: notes || this.state.dailyCheckIn.notes,
      timestamp: new Date().toISOString(),
      cognitiveScore: this.state.dailyCheckIn.cognitiveScore || 4
    };
    this.notify("checkin_updated", this.state.dailyCheckIn);
  }

  switchMode(mode) {
    if (mode === "senior" || mode === "caregiver") {
      this.state.uiMode = mode;
      this.notify("mode_changed", mode);
    }
  }

  setTheme(theme) {
    if (theme === "dark" || theme === "light") {
      this.state.theme = theme;
      this.notify("theme_changed", theme);
    }
  }

  setLanguage(lang) {
    if (lang === "hi" || lang === "en") {
      this.state.language = lang;
      this.notify("language_changed", lang);
    }
  }

  setUser(userData) {
    this.state.user = { ...this.state.user, ...userData };
    this.notify("user_updated", this.state.user);
  }

  resetDemoData() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.notify("data_reset", this.state);
  }
}

export const store = new StateStore();
