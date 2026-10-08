// SAARTHI Google Authentication & Persona Switcher Module

import { store } from './state.js';
import { sounds } from './sound.js';
import { voice } from './voice.js';

export const DEMO_GOOGLE_ACCOUNTS = [
  {
    name: "Ramesh Chandra Sharma",
    preferredName: "Dadaji",
    email: "ramesh.sharma74@gmail.com",
    role: "senior",
    age: 74,
    gender: "Male",
    bloodGroup: "B+",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    badge: "Senior Patient"
  },
  {
    name: "Ananya Sharma Verma",
    preferredName: "Ananya (Daughter)",
    email: "ananya.verma@gmail.com",
    role: "caregiver",
    age: 42,
    gender: "Female",
    bloodGroup: "O+",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    badge: "Primary Caregiver"
  },
  {
    name: "Dr. A. K. Banerjee",
    preferredName: "Dr. Banerjee",
    email: "dr.banerjee.cardio@gmail.com",
    role: "caregiver",
    age: 58,
    gender: "Male",
    bloodGroup: "A+",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    badge: "Visiting Cardiologist"
  }
];

export function initAuth() {
  const loginModal = document.getElementById("googleLoginModal");
  const btnOpenLogin = document.getElementById("btnOpenLogin");
  const btnCloseLogin = document.getElementById("btnCloseLogin");
  const accountsContainer = document.getElementById("googleAccountsList");
  const btnCustomGoogleLogin = document.getElementById("btnCustomGoogleLogin");
  const customNameInput = document.getElementById("customGoogleName");
  const customEmailInput = document.getElementById("customGoogleEmail");
  const customRoleSelect = document.getElementById("customGoogleRole");
  const userProfileBtn = document.getElementById("userProfileBtn");

  if (!loginModal) return;

  function renderAccountList() {
    if (!accountsContainer) return;

    accountsContainer.innerHTML = DEMO_GOOGLE_ACCOUNTS.map(acc => `
      <div class="google-acc-item" data-acc-email="${acc.email}">
        <img src="${acc.avatar}" alt="${acc.name}" class="google-acc-avatar" />
        <div class="google-acc-info">
          <div class="google-acc-name">${acc.name}</div>
          <div class="google-acc-email">${acc.email}</div>
        </div>
        <span class="google-acc-badge ${acc.role}">${acc.badge}</span>
      </div>
    `).join("");

    accountsContainer.querySelectorAll(".google-acc-item").forEach(item => {
      item.addEventListener("click", () => {
        const email = item.getAttribute("data-acc-email");
        const account = DEMO_GOOGLE_ACCOUNTS.find(a => a.email === email);
        if (account) {
          loginWithAccount(account);
        }
      });
    });
  }

  function loginWithAccount(account) {
    sounds.playSuccess();
    store.setUser({
      name: account.name,
      preferredName: account.preferredName,
      email: account.email,
      role: account.role,
      age: account.age || 74,
      gender: account.gender || "Male",
      bloodGroup: account.bloodGroup || "B+",
      avatar: account.avatar
    });

    // Auto switch UI mode based on role
    if (account.role === 'caregiver') {
      store.switchMode('caregiver');
    } else {
      store.switchMode('senior');
    }

    loginModal.classList.remove("active");

    const isHi = store.getState().language === 'hi';
    const welcomeEn = `Welcome back, ${account.preferredName}! Google account synced successfully.`;
    const welcomeHi = `स्वागत है, ${account.preferredName}! गूगल खाता सफलतापूर्वक लिंक हो गया है।`;
    voice.speak(welcomeEn, welcomeHi);
  }

  if (btnOpenLogin) {
    btnOpenLogin.addEventListener("click", () => {
      renderAccountList();
      loginModal.classList.add("active");
    });
  }

  if (userProfileBtn) {
    userProfileBtn.addEventListener("click", () => {
      renderAccountList();
      loginModal.classList.add("active");
    });
  }

  if (btnCloseLogin) {
    btnCloseLogin.addEventListener("click", () => {
      loginModal.classList.remove("active");
    });
  }

  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("active");
  });

  if (btnCustomGoogleLogin) {
    btnCustomGoogleLogin.addEventListener("click", () => {
      const name = customNameInput.value.trim() || "Guest User";
      const email = customEmailInput.value.trim() || "user@gmail.com";
      const role = customRoleSelect.value || "senior";

      loginWithAccount({
        name,
        preferredName: name.split(" ")[0],
        email,
        role,
        age: 70,
        gender: "Prefer not to say",
        bloodGroup: "O+",
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0284c7`,
        badge: role === 'senior' ? 'Senior Patient' : 'Caregiver'
      });
    });
  }

  renderAccountList();
}
