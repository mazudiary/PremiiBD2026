const storedHash =
  "1036b8c7b5bf864b6b3f56402e69239e33ea43f1c42e3dd086d4300a5bee404f";

const input = document.getElementById("pwd");
const eye = document.getElementById("toggleEye");

// Add particle effect on input
function createParticles(e) {
  const x = e.clientX;
  const y = e.clientY;
  for (let i = 0; i < 3; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.pointerEvents = "none";
    particle.style.fontSize = "20px";
    particle.style.opacity = "1";
    particle.textContent = "✨";
    particle.style.animation = `particleFade 1s ease-out forwards`;
    particle.style.zIndex = "9998";
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / 3;
    const vx = Math.cos(angle) * 5;
    const vy = Math.sin(angle) * 5 - 3;
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 1000, 1);
      particle.style.left = (x + vx * elapsed / 20) + "px";
      particle.style.top = (y + vy * elapsed / 20 - progress * 50) + "px";
      particle.style.opacity = 1 - progress;
      if (progress < 1) requestAnimationFrame(animate);
      else particle.remove();
    };
    animate();
  }
}

// Add CSS animation for particles
const style = document.createElement("style");
style.textContent = `
  @keyframes particleFade {
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Create floating hearts with more variety
function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const hearts = ["❤️", "💕", "💖", "💗", "💝", "💞", "💓", "💟"];
  const colors = ["#ff6b9d", "#ff4fa3", "#ff2f7a", "#ff709d"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 7 + Math.random() * 5 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }, 1500);
}

// Create sparkles
function createSparkles() {
  const container = document.getElementById("sparkles");
  const sparkles = ["✨", "⭐", "💫", "🌟"];

  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDuration = 3 + Math.random() * 2 + "s";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 5000);
  }, 800);
}

// Initialize animations
createFloatingHearts();
createSparkles();

eye.onclick = () => {
  if (input.type === "password") {
    input.type = "text";
    eye.classList.add("active");
    createParticles({ clientX: eye.getBoundingClientRect().x, clientY: eye.getBoundingClientRect().y });
  } else {
    input.type = "password";
    eye.classList.remove("active");
    createParticles({ clientX: eye.getBoundingClientRect().x, clientY: eye.getBoundingClientRect().y });
  }
};

// Add input focus effects
input.addEventListener("focus", () => {
  input.parentElement.style.transform = "scale(1.02)";
});

input.addEventListener("blur", () => {
  input.parentElement.style.transform = "scale(1)";
});

// Add sparkle on click
input.addEventListener("click", (e) => {
  createParticles(e);
});

async function sha256Hex(msg) {
  const b = new TextEncoder().encode(msg);
  const h = await crypto.subtle.digest("SHA-256", b);
  return [...new Uint8Array(h)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const popup = document.getElementById("popup");
const pTitle = document.getElementById("popupTitle");
const pMsg = document.getElementById("popupMessage");
const pClose = document.getElementById("popupClose");

document.getElementById("submitBtn").onclick = () => tryUnlock();
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") tryUnlock();
});
pClose.onclick = () => hidePopup();

async function tryUnlock() {
  const val = input.value.trim();
  if (!val) {
    showPopup(
      "Please try",
      "Type the 10-digit cosmic code...I believe in you 💫"
    );
    return;
  }
  const hex = await sha256Hex(val);
  if (hex === storedHash) {
    // Create confetti effect
    createConfetti();
    // Store access token in sessionStorage
    sessionStorage.setItem("premii_unlocked", "true");
    showPopup(
      "Unlocked ✨",
      "The lock opened...your wish is ready. Redirecting to the surprise…"
    );
    setTimeout(() => (location.href = "calendar.html"), 2000);
  } else {
    showPopup("Not yet ❤️", "That wasn't it, my love...try again 🌸");
  }
}

function createConfetti() {
  const confettiPieces = ["🎉", "💕", "✨", "💖", "🌸", "💝", "⭐", "💞"];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.fontSize = "20px";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    confetti.textContent = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
    confetti.style.animation = `confettiFall ${2 + Math.random() * 1.5}s ease-in forwards`;
    confetti.style.opacity = "1";
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
  }
}

const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);

function showPopup(title, msg) {
  pTitle.textContent = title;
  pMsg.textContent = msg;
  popup.classList.add("show");
}
function hidePopup() {
  popup.classList.remove("show");
}
