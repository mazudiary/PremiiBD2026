// Check if user has unlocked access
if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

// Detect low-end devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const reduceEffects = isMobile || isLowEnd;

// Redirect after 30 seconds
setTimeout(() => {
  window.location.href = "balloon.html";
}, 10000);

// Optimized balloons with reduced particle effects
let balloonCount = 0;
const maxBalloons = reduceEffects ? 3 : 6;
function createBalloon() {
  if (balloonCount >= maxBalloons) return;
  
  const b = document.createElement("div");
  b.classList.add("balloon");
  b.style.left = Math.random() * window.innerWidth + "px";
  const duration = 5 + Math.random() * 3;
  b.style.animationDuration = duration + "s, " + (2 + Math.random() * 2) + "s";
  b.style.opacity = 0.7 + Math.random() * 0.3;
  b.style.willChange = "transform";
  document.body.appendChild(b);
  balloonCount++;
  
  setTimeout(() => {
    b.remove();
    balloonCount--;
  }, duration * 1000 + 1000);
}
setInterval(createBalloon, reduceEffects ? 2000 : 500);

// Optimized mouse trail (disabled on low-end devices)
if (!reduceEffects) {
  let lastTrail = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTrail > 100 && Math.random() > 0.9) {
      lastTrail = now;
      const trail = document.createElement("div");
      trail.style.position = "fixed";
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
      trail.style.fontSize = "12px";
      trail.style.pointerEvents = "none";
      trail.style.opacity = "0.6";
      trail.textContent = ["✨", "💕", "⭐"][Math.floor(Math.random() * 3)];
      trail.style.animation = "fadeOut 1s ease-out forwards";
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 1000);
    }
  }, { passive: true });
}

// Add fade out animation
const trailStyle = document.createElement("style");
trailStyle.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;
document.head.appendChild(trailStyle);

// Fireworks - Optimized for low-end devices
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const maxFireworks = reduceEffects ? 3 : 8;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(canvas.height / 4, canvas.height / 2);
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.particles = [];
    this.exploded = false;
    this.trailParticles = reduceEffects ? [] : [];
  }
  update() {
    if (!this.exploded) {
      this.y -= 8;
      if (!reduceEffects && Math.random() > 0.7) {
        this.trailParticles.push(new TrailParticle(this.x, this.y, this.color));
      }
      if (this.y <= this.targetY) {
        this.exploded = true;
        const particleCount = reduceEffects ? 30 : 80;
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    } else {
      this.particles.forEach((p) => p.update());
      if (!reduceEffects) {
        this.trailParticles.forEach((p) => p.update());
      }
    }
  }
  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    if (!reduceEffects) {
      this.trailParticles.forEach((p) => p.draw());
    }
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-5, 5);
    this.vy = random(-8, 2);
    this.alpha = 1;
    this.color = color;
    this.gravity = 0.15;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= reduceEffects ? 0.02 : 0.015;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class TrailParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.alpha = 0.6;
    this.color = color;
  }
  update() {
    this.alpha -= 0.05;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let animationFrameId = null;
function animate() {
  ctx.fillStyle = reduceEffects ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  if (fireworks.length < maxFireworks && Math.random() < (reduceEffects ? 0.04 : 0.08)) {
    fireworks.push(new Firework());
  }
  
  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.exploded && f.particles.every((p) => p.alpha <= 0)) {
      if (!reduceEffects || f.trailParticles.every((p) => p.alpha <= 0)) {
        fireworks.splice(i, 1);
      }
    }
  });
  
  animationFrameId = requestAnimationFrame(animate);
}
animate();

// Glowing PREMII reveal - Optimized
const PremiiText = document.getElementById("PremiiText");
setTimeout(() => {
  PremiiText.style.opacity = "1";
  
  if (!reduceEffects) {
    // Create sparkles only on desktop
    for (let wave = 0; wave < 3; wave++) {
      setTimeout(() => {
        const sparkleCount = 20;
        for (let i = 0; i < sparkleCount; i++) {
          const s = document.createElement("div");
          s.classList.add("sparkle");
          s.style.left = random(0, window.innerWidth) + "px";
          s.style.top = random(window.innerHeight * 0.2, window.innerHeight * 0.8) + "px";
          s.style.animationDelay = (Math.random() * 0.5) + "s";
          document.body.appendChild(s);
          setTimeout(() => s.remove(), 2500);
        }
      }, wave * 400);
    }
  }
}, 25000);

function createConfetti() {
  const confettiEmojis = ["🎊", "🎉", "💕", "✨", "⭐", "🌟", "💖"];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.innerHTML = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    conf.style.left = random(0, window.innerWidth) + "px";
    conf.style.top = random(-50, window.innerHeight / 2) + "px";
    conf.style.animationDuration = (2 + Math.random() * 1.5) + "s";
    conf.style.opacity = 0.8 + Math.random() * 0.2;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 3500);
  }
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

