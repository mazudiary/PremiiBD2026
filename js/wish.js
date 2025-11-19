// Check if user has unlocked access
if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

// Redirect after 30 seconds
setTimeout(() => {
  window.location.href = "balloon.html";
}, 30000);

// Balloons
function createBalloon() {
  const b = document.createElement("div");
  b.classList.add("balloon");
  b.innerHTML = ["🎈", "💖", "🎉", "💝"][Math.floor(Math.random() * 4)];
  b.style.left = Math.random() * window.innerWidth + "px";
  b.style.animationDuration = 4 + Math.random() * 4 + "s";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 8000);
}
setInterval(createBalloon, 600);

// Fireworks
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
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
  }
  update() {
    if (!this.exploded) {
      this.y -= 6;
      if (this.y <= this.targetY) {
        this.exploded = true;
        for (let i = 0; i < 50; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    } else {
      this.particles.forEach((p) => p.update());
    }
  }
  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.alpha = 1;
    this.color = color;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
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

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) fireworks.push(new Firework());
  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.exploded && f.particles.every((p) => p.alpha <= 0))
      fireworks.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

// Glowing FARZAN reveal with sparkles
const farzanText = document.getElementById("farzanText");
setTimeout(() => {
  farzanText.style.opacity = "1";
  for (let i = 0; i < 50; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.left = random(0, window.innerWidth) + "px";
    s.style.top =
      random(window.innerHeight * 0.3, window.innerHeight * 0.7) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }
}, 25000);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
