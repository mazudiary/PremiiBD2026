const storedHash =
  "1036b8c7b5bf864b6b3f56402e69239e33ea43f1c42e3dd086d4300a5bee404f";

const input = document.getElementById("pwd");
const eye = document.getElementById("toggleEye");

// Create floating hearts
function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const hearts = ["❤️", "💕", "💖", "💗", "💝", "💞"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 6 + Math.random() * 4 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
  }, 2000);
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
  } else {
    input.type = "password";
    eye.classList.remove("active");
  }
};

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
    // Store access token in sessionStorage
    sessionStorage.setItem("premii_unlocked", "true");
    showPopup(
      "Unlocked ✨",
      "The lock opened...your wish is ready. Redirecting to the surprise…"
    );
    setTimeout(() => (location.href = "wish.html"), 2000);
  } else {
    showPopup("Not yet ❤️", "That wasn't it, my love...try again 🌸");
  }
}

function showPopup(title, msg) {
  pTitle.textContent = title;
  pMsg.textContent = msg;
  popup.classList.add("show");
}
function hidePopup() {
  popup.classList.remove("show");
}
