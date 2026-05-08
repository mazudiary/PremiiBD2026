/**
 * Calendar Page - Birthday Celebration
 * Beautiful birthday calendar with interactive elements
 */

if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

/* Detect mobile/low-end devices */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const reduceEffects = isMobile || isLowEnd;

/* Create star field */
function createStarField() {
  const starField = document.getElementById("starField");
  const starCount = reduceEffects ? 30 : 80;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 2 + "s";
    starField.appendChild(star);
  }
}

/* Create floating elements */
function createFloatingElements() {
  if (reduceEffects) return;

  const container = document.getElementById("floatingElements");
  const elements = ["❤️", "💕", "💖", "💗", "🌸", "🌺", "🌹", "💝", "💞", "🦋", "✨"];
  const interval = 1500;
  const maxElements = 12;
  let activeCount = 0;

  setInterval(() => {
    if (activeCount >= maxElements) return;

    const element = document.createElement("div");
    element.className = "floating-element";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + "%";
    element.style.animationDuration = 12 + Math.random() * 5 + "s";
    element.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(element);
    activeCount++;

    setTimeout(() => {
      element.remove();
      activeCount--;
    }, 17000);
  }, interval);
}

/* Create magic sparkles */
function createMagicSparkles() {
  if (reduceEffects) return;

  const container = document.getElementById("magicSparkles");
  const sparkles = ["✨", "⭐", "💫", "🌟", "💎", "🔮"];
  const interval = 1000;
  const maxSparkles = 10;
  let activeCount = 0;

  setInterval(() => {
    if (activeCount >= maxSparkles) return;

    const sparkle = document.createElement("div");
    sparkle.className = "magic-sparkle";
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDuration = 3 + Math.random() * 3 + "s";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    container.appendChild(sparkle);
    activeCount++;

    setTimeout(() => {
      sparkle.remove();
      activeCount--;
    }, 6000);
  }, interval);
}

/* Initialize effects */
createStarField();
if (!reduceEffects) {
  createFloatingElements();
  createMagicSparkles();
}

/* Birthday Date: 15 May 2002 */
const birthDate = new Date(2002, 4, 15); // Month is 0-indexed
const today = new Date();

/* Calculate age */
let age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}

/* Update age display */
const yearsElement = document.getElementById("years");
if (yearsElement) {
  yearsElement.textContent = age;
  yearsElement.style.animation = "numberCountUp 1.5s ease-out 0.5s forwards";
}

/* Calculate days together */
const startDate = new Date(2025, 5, 17); // 17 June 2025
const currentDate = new Date();
const timeDiff = currentDate - startDate;
const daysTogether = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

const daysElement = document.getElementById("days");
if (daysElement) {
  daysElement.textContent = daysTogether;
  daysElement.style.animation = "numberCountUp 2s ease-out 0.8s forwards";
}

/* Add animation for number count up */
const style = document.createElement("style");
style.textContent = `
  @keyframes numberCountUp {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(style);

/* Interactive date hover effects */
const dateElements = document.querySelectorAll(".date:not(.birthday)");
dateElements.forEach((dateEl) => {
  dateEl.addEventListener("click", () => {
    // Create confetti on date click
    createClickConfetti(event);
  });
});

function createClickConfetti(event) {
  const rect = event.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const confettiPieces = 8;
  for (let i = 0; i < confettiPieces; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";
    confetti.style.width = "6px";
    confetti.style.height = "6px";
    confetti.style.borderRadius = "50%";
    confetti.style.backgroundColor = ["#ff4fa3", "#ff6b9d", "#ffb3d6", "#ff77b2"][Math.floor(Math.random() * 4)];
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "10000";
    
    const angle = (i / confettiPieces) * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 8;

    document.body.appendChild(confetti);

    let posX = x;
    let posY = y;
    let velX = vx;
    let velY = vy;
    let life = 1;

    const animate = () => {
      posX += velX;
      posY += velY;
      velY += 0.1; // gravity
      life -= 0.02;

      confetti.style.left = posX + "px";
      confetti.style.top = posY + "px";
      confetti.style.opacity = Math.max(0, life);

      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    };

    animate();
  }
}

/* Smooth scroll to sections */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});
