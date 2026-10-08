// SAARTHI AI Health Pattern Anomaly Detector
// Analyzes vitals trends, medication adherence, hydration, and cognitive notes to surface clinical insights

export function analyzeHealthPatterns(state) {
  const alerts = [];
  const vitals = state.vitals || [];
  const meds = state.medications || [];
  const hydration = state.hydration || { current: 0, target: 8 };
  const checkIn = state.dailyCheckIn || {};

  // 1. Analyze Blood Pressure Trends (Last 3-7 readings)
  if (vitals.length >= 3) {
    const recent = vitals.slice(-3);
    const latest = recent[recent.length - 1];
    const prev = recent[recent.length - 2];
    const prev2 = recent[0];

    // Detect Rising Systolic Trend
    const isRisingBP = latest.systolic > prev.systolic && prev.systolic > prev2.systolic;
    const isStage2Hypertension = latest.systolic >= 150 || latest.diastolic >= 95;

    if (isStage2Hypertension || isRisingBP) {
      alerts.push({
        id: "pattern-bp-rising",
        severity: latest.systolic >= 160 ? "critical" : "warning",
        category: "Cardiovascular Pattern",
        title: "Escalating Systolic Blood Pressure Trend",
        titleHi: "रक्तचाप (BP) में लगातार बढ़त का संकेत",
        metric: `${latest.systolic}/${latest.diastolic} mmHg (Peak: ${Math.max(...recent.map(r => r.systolic))})`,
        observation: `Systolic BP increased across the last 3 recordings (${prev2.systolic} → ${prev.systolic} → ${latest.systolic} mmHg).`,
        observationHi: `पिछले 3 रिकॉर्डिंग्स में सिस्टोलिक बीपी लगातार बढ़ा है (${prev2.systolic} → ${prev.systolic} → ${latest.systolic} mmHg)।`,
        aiDiagnosis: "Correlates with inconsistent evening timing or elevated salt/stress. Risk of hypertensive urgency if sustained above 160 mmHg.",
        actionRequired: "Ensure Amlodipine 5mg was taken. Retake BP sitting after 15 mins of rest. Alert sent to Dr. Banerjee & Ananya.",
        actionRequiredHi: "कृपया 15 मिनट शांत बैठकर दोबारा नापें। डॉ. बनर्जी और बेटी अनन्या को सूचित कर दिया गया है।",
        urgency: latest.systolic >= 160 ? "Immediate Attention" : "Moderate Monitoring",
        badge: "AI Pattern Detected"
      });
    } else if (latest.systolic <= 130 && latest.diastolic <= 85) {
      alerts.push({
        id: "pattern-bp-stable",
        severity: "positive",
        category: "Cardiovascular Health",
        title: "Blood Pressure in Healthy Target Range",
        titleHi: "रक्तचाप सामान्य और स्थिर है",
        metric: `${latest.systolic}/${latest.diastolic} mmHg`,
        observation: "Current blood pressure is well within the recommended elderly target (<135/85 mmHg).",
        observationHi: "वर्तमान बीपी बिलकुल संतुलित और सामान्य श्रेणी में है।",
        aiDiagnosis: "Excellent vascular stability. Current medication regimen is effectively protective.",
        actionRequired: "Continue current schedule and light morning walk.",
        actionRequiredHi: "अपनी नियमित दिनचर्या और दवाएं जारी रखें।",
        urgency: "Optimal",
        badge: "Good Health Trend"
      });
    }
  }

  // 2. Analyze Blood Sugar & Glycemic Control
  if (vitals.length > 0) {
    const latestSugar = vitals[vitals.length - 1];
    if (latestSugar.bloodSugar > 150) {
      alerts.push({
        id: "pattern-sugar-high",
        severity: "warning",
        category: "Glycemic Fluctuation",
        title: "Elevated Blood Glucose Level",
        titleHi: "ब्लड शुगर सामान्य से अधिक (हाई शुगर)",
        metric: `${latestSugar.bloodSugar} mg/dL (${latestSugar.sugarType || 'Recorded'})`,
        observation: `Latest glucose reading recorded at ${latestSugar.bloodSugar} mg/dL, exceeding baseline threshold of 140 mg/dL.`,
        observationHi: `ताज़ा शुगर लेवल ${latestSugar.bloodSugar} mg/dL दर्ज हुआ है, जो सामान्य से अधिक है।`,
        aiDiagnosis: "High glucose reading post-meal indicates delayed insulin sensitivity or carbohydrate-heavy meal.",
        actionRequired: "Drink 2 glasses of water, avoid sugary sweets/tea, and verify Metformin was taken with food.",
        actionRequiredHi: "गुनगुना पानी पिएं, मीठी चाय/मिठाई से परहेज रखें और मेटफॉर्मिन समय पर लें।",
        urgency: "Action Advised",
        badge: "Glycemic Anomaly"
      });
    }
  }

  // 3. Hydration & Pulse / Dehydration Pattern
  const latestPulse = vitals.length > 0 ? vitals[vitals.length - 1].pulse : 75;
  if (hydration.current < 4 && latestPulse > 80) {
    alerts.push({
      id: "pattern-dehydration-pulse",
      severity: "warning",
      category: "Hydration & Circulatory",
      title: "Potential Mild Dehydration (Elevated Pulse)",
      titleHi: "पानी की कमी और दिल की धड़कन तेज होने का संकेत",
      metric: `${hydration.current}/8 Glasses | Pulse: ${latestPulse} bpm`,
      observation: `Only ${hydration.current} glasses of water consumed today, while resting heart rate has elevated to ${latestPulse} bpm.`,
      observationHi: `आज केवल ${hydration.current} गिलास पानी पिया गया है और पल्स ${latestPulse} bpm तक बढ़ गई है।`,
      aiDiagnosis: "In seniors, inadequate fluid intake quickly causes blood volume reduction, reflex tachycardia, and dizziness risks.",
      actionRequired: "Encourage drinking 1 glass of coconut water or warm electrolyte water right now.",
      actionRequiredHi: "कृपया तुरंत 1 गिलास ताजा पानी या नारियल पानी पिएं।",
      urgency: "Preventive Care",
      badge: "Dehydration Risk"
    });
  }

  // 4. Medication Inventory & Refill Warnings
  const lowStockMeds = meds.filter(m => m.stock <= m.refillThreshold);
  if (lowStockMeds.length > 0) {
    lowStockMeds.forEach(m => {
      alerts.push({
        id: `pattern-refill-${m.id}`,
        severity: "info",
        category: "Pharmacy Supply",
        title: `Medicine Stock Depleting: ${m.name}`,
        titleHi: `दवा समाप्त होने वाली है: ${m.name}`,
        metric: `${m.stock} Tablets Remaining (~${m.stock} days)`,
        observation: `Only ${m.stock} doses of ${m.name} (${m.dosage}) left in home medicine box.`,
        observationHi: `${m.name} की केवल ${m.stock} गोलियां शेष बची हैं।`,
        aiDiagnosis: "Running out of prescribed maintenance medication risks rebound hypertension/dyslipidemia.",
        actionRequired: "1-Click WhatsApp reorder alert triggered for Caregiver Ananya.",
        actionRequiredHi: "केयरगिवर को फार्मेसी से री-ऑर्डर करने का संदेश तैयार है।",
        urgency: "Order in 48h",
        badge: "Low Stock Alert"
      });
    });
  }

  // 5. Calculate Overall Medication Adherence Rate
  const totalMeds = meds.length;
  const takenMeds = meds.filter(m => m.takenToday).length;
  const adherencePercent = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 100;

  return {
    alerts,
    adherencePercent,
    takenMeds,
    totalMeds,
    vitalsCount: vitals.length,
    overallHealthIndex: calculateHealthIndex(alerts, adherencePercent),
    lastAnalyzed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

function calculateHealthIndex(alerts, adherencePercent) {
  let score = 90;
  // Deduct points for critical or warning alerts
  alerts.forEach(a => {
    if (a.severity === "critical") score -= 25;
    else if (a.severity === "warning") score -= 12;
    else if (a.severity === "positive") score += 5;
  });

  // Adjust for adherence
  if (adherencePercent < 60) score -= 15;
  else if (adherencePercent === 100) score += 5;

  score = Math.min(100, Math.max(35, score));

  if (score >= 85) return { score, status: "Optimal", color: "#10b981", text: "Healthy & Stable" };
  if (score >= 70) return { score, status: "Moderate", color: "#f59e0b", text: "Requires Mild Monitoring" };
  return { score, status: "Needs Care", color: "#ef4444", text: "Caregiver Attention Advised" };
}
