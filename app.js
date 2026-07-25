// Users DB (demo)
const USERS = { admin: "1234", player: "pass", محمد: "1234" };

// Servers list
const SERVERS = [
  { name: "السيرفر الرئيسي", icon: "🎮", ping: "12ms" },
  { name: "سيرفر التدريب", icon: "⚔️", ping: "28ms" },
  { name: "سيرفر VIP", icon: "👑", ping: "8ms" },
  { name: "سيرفر آسيا", icon: "🌏", ping: "45ms" },
  { name: "سيرفر أوروبا", icon: "🌍", ping: "60ms" },
  { name: "سيرفر الأمريكتين", icon: "🌎", ping: "90ms" },
];

let countdownTimer = null;
let currentUser = null;

// --- Login ---
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const err = document.getElementById("login-error");

  if (!user || !pass) { err.textContent = "أدخل اسم المستخدم وكلمة المرور"; return; }
  if (USERS[user] !== pass) { err.textContent = "بيانات غير صحيحة. حاول مجدداً."; return; }

  currentUser = user;
  err.textContent = "";
  document.getElementById("welcome-text").textContent = "مرحباً، " + user;
  renderServers();
  showScreen("servers-screen");
}

// --- Logout ---
function logout() {
  currentUser = null;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  showScreen("login-screen");
}

// --- Render servers ---
function renderServers() {
  const grid = document.getElementById("servers-grid");
  grid.innerHTML = SERVERS.map((s, i) =>
    `<div class="server-card" onclick="selectServer(${i})">
      <div class="server-icon">${s.icon}</div>
      <div class="server-name">${s.name}</div>
      <div class="server-ping">Ping: ${s.ping}</div>
    </div>`
  ).join("");
}

// --- Select server ---
function selectServer(index) {
  const server = SERVERS[index];
  document.getElementById("selected-server-name").textContent = server.name;
  showScreen("countdown-screen");
  startCountdown(10);
}

// --- Countdown ---
function startCountdown(seconds) {
  let remaining = seconds;
  const numEl = document.getElementById("countdown-number");
  const ring = document.getElementById("ring");
  const circumference = 314;

  clearInterval(countdownTimer);
  numEl.textContent = remaining;
  ring.style.strokeDashoffset = 0;

  countdownTimer = setInterval(() => {
    remaining--;
    numEl.textContent = remaining;
    const offset = circumference * (1 - remaining / seconds);
    ring.style.strokeDashoffset = offset;

    if (remaining <= 0) {
      clearInterval(countdownTimer);
      alert("تم الاتصال بالسيرفر بنجاح! 🎮");
      showScreen("servers-screen");
    }
  }, 1000);
}

function cancelCountdown() {
  clearInterval(countdownTimer);
  showScreen("servers-screen");
}

// --- Helpers ---
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Enter key on login
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.getElementById("login-screen").classList.contains("active")) {
    login();
  }
});