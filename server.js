// server.js - Simple Express backend for SAARTHI app
// -------------------------------------------------------
// Stores all app data in a lowdb JSON file (db.json)
// Provides RESTful endpoints used by the frontend state store.

import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Initialise lowdb
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Default state (mirrors DEFAULT_STATE from src/js/state.js)
const defaultState = {
  user: {
    name: "Ramesh Chandra Sharma",
    preferredName: "Dadaji",
    age: 74,
    gender: "Male",
    bloodGroup: "B+",
    role: "senior",
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
  uiMode: "senior",
  theme: "dark",
  language: "hi",
  highContrast: false,
  soundEnabled: true,
  hydration: { current: 5, target: 8, unit: "glasses" },
  dailyCheckIn: { completedToday: true, mood: "good", cognitiveScore: 4, notes: "", timestamp: new Date().toISOString() },
  medications: [],
  vitals: [],
  appointments: [],
  dailyActivities: []
};

async function initDB() {
  await db.read();
  db.data = db.data || { state: defaultState };
  await db.write();
}

await initDB();

// Helper to get current state
function getState() {
  return db.data.state;
}

// Helper to replace entire state (used for bulk sync)
function setState(newState) {
  db.data.state = newState;
  return db.write();
}

// ------------------- API ROUTES -------------------
// Get full state
app.get('/api/state', (req, res) => {
  res.json(getState());
});

// Replace full state (client sync after each change)
app.post('/api/state', async (req, res) => {
  const incoming = req.body;
  // simple validation – ensure an object
  if (typeof incoming !== 'object') {
    return res.status(400).json({ error: 'Invalid state payload' });
  }
  await setState(incoming);
  res.json({ success: true });
});

// ----- Medications -----
app.get('/api/medications', (req, res) => {
  res.json(getState().medications);
});
app.post('/api/medications', async (req, res) => {
  const meds = getState().medications;
  meds.push(req.body);
  await db.write();
  res.json({ success: true, medication: req.body });
});
app.put('/api/medications/:id', async (req, res) => {
  const meds = getState().medications;
  const idx = meds.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Medication not found' });
  meds[idx] = { ...meds[idx], ...req.body };
  await db.write();
  res.json({ success: true, medication: meds[idx] });
});
app.delete('/api/medications/:id', async (req, res) => {
  const state = getState();
  state.medications = state.medications.filter(m => m.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

// ----- Appointments -----
app.get('/api/appointments', (req, res) => {
  res.json(getState().appointments);
});
app.post('/api/appointments', async (req, res) => {
  const a = getState().appointments;
  a.push(req.body);
  await db.write();
  res.json({ success: true, appointment: req.body });
});
app.put('/api/appointments/:id', async (req, res) => {
  const a = getState().appointments;
  const idx = a.findIndex(ap => ap.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Appointment not found' });
  a[idx] = { ...a[idx], ...req.body };
  await db.write();
  res.json({ success: true, appointment: a[idx] });
});
app.delete('/api/appointments/:id', async (req, res) => {
  const state = getState();
  state.appointments = state.appointments.filter(ap => ap.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

// ----- Daily Activities -----
app.get('/api/activities', (req, res) => {
  res.json(getState().dailyActivities);
});
app.post('/api/activities', async (req, res) => {
  const act = getState().dailyActivities;
  act.push(req.body);
  await db.write();
  res.json({ success: true, activity: req.body });
});
app.put('/api/activities/:id', async (req, res) => {
  const act = getState().dailyActivities;
  const idx = act.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Activity not found' });
  act[idx] = { ...act[idx], ...req.body };
  await db.write();
  res.json({ success: true, activity: act[idx] });
});
app.delete('/api/activities/:id', async (req, res) => {
  const state = getState();
  state.dailyActivities = state.dailyActivities.filter(a => a.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

// ----- Vitals -----
app.get('/api/vitals', (req, res) => {
  res.json(getState().vitals);
});
app.post('/api/vitals', async (req, res) => {
  const v = getState().vitals;
  v.push(req.body);
  await db.write();
  res.json({ success: true, vitals: req.body });
});

// ----- Hydration -----
app.get('/api/hydration', (req, res) => {
  res.json(getState().hydration);
});
app.post('/api/hydration/increment', async (req, res) => {
  const h = getState().hydration;
  if (h.current < 15) h.current += 1;
  await db.write();
  res.json({ success: true, hydration: h });
});
app.post('/api/hydration/reset', async (req, res) => {
  getState().hydration.current = 0;
  await db.write();
  res.json({ success: true, hydration: getState().hydration });
});

// ----- User & Settings -----
app.get('/api/user', (req, res) => {
  res.json(getState().user);
});
app.put('/api/user', async (req, res) => {
  const state = getState();
  state.user = { ...state.user, ...req.body };
  await db.write();
  res.json({ success: true, user: state.user });
});
app.put('/api/settings', async (req, res) => {
  const { uiMode, theme, language, highContrast, soundEnabled } = req.body;
  const state = getState();
  if (uiMode) state.uiMode = uiMode;
  if (theme) state.theme = theme;
  if (language) state.language = language;
  if (highContrast !== undefined) state.highContrast = highContrast;
  if (soundEnabled !== undefined) state.soundEnabled = soundEnabled;
  await db.write();
  res.json({ success: true, settings: { uiMode: state.uiMode, theme: state.theme, language: state.language, highContrast: state.highContrast, soundEnabled: state.soundEnabled } });
});

app.listen(PORT, () => {
  console.log(`✅ SAARTHI backend listening on http://localhost:${PORT}`);
});
