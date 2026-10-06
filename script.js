const card = document.getElementById("card");
const emoji = document.getElementById("emoji");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const soundBtn = document.getElementById("soundBtn");
const flash = document.getElementById("flash");
const toast = document.getElementById("toast");

let audioCtx = null;
let soundOn = false;
let noCount = 0;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function beep(frequency = 440, duration = 0.09, type = "sine") {
  if (!soundOn) return;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration + 0.02);
}

soundBtn.addEventListener("click", async () => {
  soundOn = !soundOn;

  if (soundOn) {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();
    soundBtn.textContent = "🔊 Âm thanh đang bật";
    soundBtn.setAttribute("aria-pressed", "true");
    beep(660, .12);
    showToast("Âm thanh đã bật!");
  } else {
    soundBtn.textContent = "🔇 Bật âm thanh";
    soundBtn.setAttribute("aria-pressed", "false");
  }
});

function burstConfetti(amount = 90) {
  const symbols = ["✨", "🎃", "🕸️", "🦇", "💜", "🧡"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (12 + Math.random() * 14) + "px";
    piece.style.setProperty("--x", ((Math.random() - .5) * 260) + "px");
    piece.style.setProperty("--r", ((Math.random() - .5) * 900) + "deg");
    piece.style.animationDuration = (2.4 + Math.random() * 2.5) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

function screenFlash() {
  flash.classList.remove("on");
  void flash.offsetWidth;
  flash.classList.add("on");
}

function fleeNoButton() {
  noCount++;

  if (!noBtn.classList.contains("fleeing")) {
    noBtn.classList.add("fleeing");
  }

  const margin = 20;
  const maxX = Math.max(margin, window.innerWidth - noBtn.offsetWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - noBtn.offsetHeight - margin);

  const x = margin + Math.random() * (maxX - margin);
  const y = margin + Math.random() * (maxY - margin);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Ơ, đừng bấm Không 😭",
    "Nó chạy mất rồi!",
    "Thử bắt nó xem 👀",
    "Gần được rồi...",
    "😂 Bấm Có đi!",
  ];

  subtitle.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
  beep(220 + noCount * 35, .08, "square");

  if (noCount >= 4) {
    showToast("Nút Không đang trốn bạn đó 😂");
  }
}

["mouseenter", "touchstart"].forEach(eventName => {
  noBtn.addEventListener(eventName, (event) => {
    if (eventName === "touchstart") event.preventDefault();
    fleeNoButton();
  }, { passive: false });
});

noBtn.addEventListener("click", fleeNoButton);

yesBtn.addEventListener("click", () => {
  beep(523, .1);
  setTimeout(() => beep(659, .12), 100);
  setTimeout(() => beep(784, .18), 220);

  card.classList.remove("success");
  void card.offsetWidth;
  card.classList.add("success");

  screenFlash();
  burstConfetti(110);

  emoji.textContent = "🎉";
  title.innerHTML = "Bạn đã chọn<br><span>đúng rồi!</span>";
  subtitle.textContent = "Chúc bạn một ngày thật vui ✨";
  buttons.innerHTML = `
    <button class="btn yes" id="againBtn">🔄 Chơi lại</button>
  `;

  showToast("✨ Bất ngờ nho nhỏ dành cho bạn!");

  document.getElementById("againBtn").addEventListener("click", () => {
    location.reload();
  });
});

// Cho nút Không chạy lại nếu xoay màn hình.
window.addEventListener("resize", () => {
  if (noBtn.classList.contains("fleeing")) {
    noBtn.style.left = "50%";
    noBtn.style.top = "75%";
  }
});
