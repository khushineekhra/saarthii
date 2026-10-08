// SAARTHI Vitals Logger & Custom Interactive SVG Health Charts

import { store } from './state.js';
import { sounds } from './sound.js';

export function renderVitalsCharts(containerId, vitalsList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!vitalsList || vitalsList.length === 0) {
    container.innerHTML = `<div class="empty-state">No vitals data recorded yet.</div>`;
    return;
  }

  // Generate SVG Blood Pressure Chart (Systolic in Coral Red, Diastolic in Ocean Blue)
  const bpChartHtml = generateBPChart(vitalsList);
  const sugarChartHtml = generateSugarChart(vitalsList);

  container.innerHTML = `
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-wrap">
            <span class="chart-icon">🩺</span>
            <div>
              <h4 class="chart-title">Blood Pressure 7-Day Trend</h4>
              <p class="chart-subtitle">Systolic (Top) & Diastolic (Bottom) in mmHg</p>
            </div>
          </div>
          <div class="chart-legend">
            <span class="legend-dot systolic"></span> Systolic (Target &lt;130)
            <span class="legend-dot diastolic"></span> Diastolic (Target &lt;85)
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${bpChartHtml}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-wrap">
            <span class="chart-icon">🩸</span>
            <div>
              <h4 class="chart-title">Blood Glucose 7-Day Trend</h4>
              <p class="chart-subtitle">Fasting & Post-Meal Glucose in mg/dL</p>
            </div>
          </div>
          <div class="chart-legend">
            <span class="legend-dot sugar"></span> Glucose (Target 80-130)
            <span class="legend-threshold"></span> Normal Threshold (140)
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${sugarChartHtml}
        </div>
      </div>
    </div>
  `;
}

function generateBPChart(data) {
  const width = 560;
  const height = 220;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minVal = 60;
  const maxVal = 180;

  const getY = (val) => padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  const getX = (idx) => padLeft + (idx / (data.length - 1 || 1)) * chartW;

  // Points
  const systolicPts = data.map((d, i) => `${getX(i)},${getY(d.systolic)}`).join(" ");
  const diastolicPts = data.map((d, i) => `${getX(i)},${getY(d.diastolic)}`).join(" ");

  // Grid lines
  const gridLines = [80, 100, 120, 140, 160].map(v => {
    const y = getY(v);
    const isWarning = v === 140;
    return `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="${isWarning ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.08)'}" stroke-dasharray="${isWarning ? '4 4' : 'none'}" />
      <text x="${padLeft - 8}" y="${y + 4}" fill="rgba(255, 255, 255, 0.45)" font-size="10" text-anchor="end">${v}</text>
    `;
  }).join("");

  // Point circles with tooltips
  const dotsHtml = data.map((d, i) => {
    const x = getX(i);
    const ySys = getY(d.systolic);
    const yDia = getY(d.diastolic);
    const shortDate = d.date.slice(5);

    return `
      <!-- Date label on x-axis -->
      <text x="${x}" y="${height - 12}" fill="rgba(255, 255, 255, 0.5)" font-size="10" text-anchor="middle">${shortDate}</text>

      <!-- Systolic Point -->
      <circle cx="${x}" cy="${ySys}" r="5" fill="#f43f5e" stroke="#fff" stroke-width="2" class="chart-point">
        <title>Systolic: ${d.systolic} mmHg on ${d.date} (${d.time})</title>
      </circle>
      <text x="${x}" y="${ySys - 8}" fill="#f43f5e" font-size="10" font-weight="600" text-anchor="middle">${d.systolic}</text>

      <!-- Diastolic Point -->
      <circle cx="${x}" cy="${yDia}" r="4.5" fill="#0284c7" stroke="#fff" stroke-width="2" class="chart-point">
        <title>Diastolic: ${d.diastolic} mmHg on ${d.date}</title>
      </circle>
      <text x="${x}" y="${yDia + 14}" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">${d.diastolic}</text>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="vitals-svg" preserveAspectRatio="xMidYMid meet">
      <!-- Gradient fills -->
      <defs>
        <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridLines}
      <!-- High BP warning guideline line -->
      <line x1="${padLeft}" y1="${getY(140)}" x2="${width - padRight}" y2="${getY(140)}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="${width - padRight}" y="${getY(140) - 5}" fill="#ef4444" font-size="9" text-anchor="end">Hypertension Threshold (140)</text>

      <!-- Lines -->
      <polyline points="${systolicPts}" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="${diastolicPts}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${dotsHtml}
    </svg>
  `;
}

function generateSugarChart(data) {
  const width = 560;
  const height = 220;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minVal = 70;
  const maxVal = 200;

  const getY = (val) => padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  const getX = (idx) => padLeft + (idx / (data.length - 1 || 1)) * chartW;

  const sugarPts = data.map((d, i) => `${getX(i)},${getY(d.bloodSugar)}`).join(" ");

  const gridLines = [90, 120, 140, 170].map(v => {
    const y = getY(v);
    const isWarning = v === 140;
    return `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="${isWarning ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.08)'}" stroke-dasharray="${isWarning ? '4 4' : 'none'}" />
      <text x="${padLeft - 8}" y="${y + 4}" fill="rgba(255, 255, 255, 0.45)" font-size="10" text-anchor="end">${v}</text>
    `;
  }).join("");

  const dotsHtml = data.map((d, i) => {
    const x = getX(i);
    const y = getY(d.bloodSugar);
    const shortDate = d.date.slice(5);
    const isHigh = d.bloodSugar > 140;

    return `
      <text x="${x}" y="${height - 12}" fill="rgba(255, 255, 255, 0.5)" font-size="10" text-anchor="middle">${shortDate}</text>
      <circle cx="${x}" cy="${y}" r="5" fill="${isHigh ? '#f59e0b' : '#10b981'}" stroke="#fff" stroke-width="2" class="chart-point">
        <title>${d.bloodSugar} mg/dL (${d.sugarType || 'Recorded'}) on ${d.date}</title>
      </circle>
      <text x="${x}" y="${y - 8}" fill="${isHigh ? '#f59e0b' : '#10b981'}" font-size="10" font-weight="600" text-anchor="middle">${d.bloodSugar}</text>
    `;
  }).join("");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="vitals-svg" preserveAspectRatio="xMidYMid meet">
      ${gridLines}
      <line x1="${padLeft}" y1="${getY(140)}" x2="${width - padRight}" y2="${getY(140)}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="${width - padRight}" y="${getY(140) - 5}" fill="#f59e0b" font-size="9" text-anchor="end">Target Upper Limit (140)</text>

      <polyline points="${sugarPts}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${dotsHtml}
    </svg>
  `;
}
