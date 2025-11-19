if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

/* Create star field */
function createStarField() {
  const starField = document.getElementById("starField");
  for (let i = 0; i < 80; i++) {
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
  const container = document.getElementById("floatingElements");
  const elements = ["❤️", "💕", "💖", "💗", "🌸", "🌺", "🌹", "💝", "💞", "🦋"];

  setInterval(() => {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * 100 + "%";
    element.style.animationDuration = 10 + Math.random() * 4 + "s";
    element.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(element);

    setTimeout(() => element.remove(), 14000);
  }, 1800);
}

/* Create magic sparkles */
function createMagicSparkles() {
  const container = document.getElementById("magicSparkles");
  const sparkles = ["✨", "⭐", "💫", "🌟", "⚡", "💥"];

  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.className = "magic-sparkle";
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDuration = 3 + Math.random() * 2 + "s";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 5000);
  }, 1200);
}

// Initialize background effects
createStarField();
createFloatingElements();
createMagicSparkles();

/* Floating Hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = window.innerHeight + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 600);

/* Balloon Animation */
function createBalloon() {
  const b = document.createElement("div");
  b.classList.add("balloon");
  b.innerHTML = "🎈";
  b.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 5000);
}
setInterval(createBalloon, 1500);

/* Cinematic Entrance */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".cinematic").forEach((el) => observer.observe(el));

/* Story line reveal */
const storyLines = document.querySelectorAll("#storyLines .story-line");
const storyBlock = document.getElementById("storyBlock");
if (storyBlock && storyLines.length) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          storyLines.forEach((line, i) =>
            setTimeout(() => line.classList.add("show"), i * 260)
          );
          storyObserver.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  storyObserver.observe(storyBlock);
}

/* Typing Header (responsive & dynamic) */
const header = document.querySelector(".header");
const typingText = "Happy Birthday My Premii, My Bibijan ❤️";
const span = document.createElement("span");
span.className = "typing";
span.textContent = typingText;
header.innerHTML = "";
header.appendChild(span);
// Adjust steps to length for more natural pacing
const steps = Math.min(72, Math.max(Array.from(typingText).length + 4, 40));
span.style.setProperty("--typing-steps", steps);
// Duration scales gently with length (between 2.8s and 6.5s)
const durationMs = Math.min(6500, Math.max(2800, steps * 65));
span.style.setProperty(
  "--typing-duration",
  (durationMs / 1000).toFixed(2) + "s"
);
// After animation completes allow wrapping & remove caret blink
setTimeout(() => span.classList.add("finished"), durationMs + 150);

/* Load Letter Content from JSON */
async function loadLetterContent() {
  try {
    const response = await fetch("data/letter.json");
    const letterData = await response.json();

    // Update modal title
    const modalHeader = document.querySelector(".modal-header h2");
    if (modalHeader) {
      modalHeader.textContent = letterData.title;
    }

    // Update letter text
    const letterTextDiv = document.querySelector(".letter-text");
    if (letterTextDiv) {
      let content = letterData.greeting + "\n\n";
      content += letterData.paragraphs.join("\n\n");
      content += "\n\n";

      letterTextDiv.innerHTML =
        content.replace(/\n/g, "<br>") +
        `<div class="letter-signature">${letterData.signature}</div>`;
    }
  } catch (error) {
    console.error("Error loading letter content:", error);
  }
}

// Load letter content when page loads
loadLetterContent();

/* Gift Box & Modal */
const modal = document.getElementById("loveModal");
const giftBox = document.getElementById("giftBox");
const closeBtn = document.querySelector(".close-btn");

let hoverTimeout;

giftBox.addEventListener("mouseenter", () => {
  hoverTimeout = setTimeout(() => {
    modal.style.display = "block";
  }, 1200);
});

giftBox.addEventListener("mouseleave", () => {
  clearTimeout(hoverTimeout);
});

closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

/* Romantic Video Orchestrator */
(function romanticVideo() {
  const container = document.getElementById("romanticVideo");
  if (!container) return;
  const bokeh = document.getElementById("rvBokeh");
  const lilies = document.getElementById("rvLilies");
  const petals = document.getElementById("rvPetals");
  const sparkles = document.getElementById("rvSparkles");
  const hearts = document.getElementById("rvHearts");
  const lineEl = document.getElementById("rvLine");
  const replayBtn = document.getElementById("rvReplay");
  const soundBtn = document.getElementById("rvSound");
  const soundIcon = document.getElementById("soundIcon");
  const soundText = document.getElementById("soundText");
  const grainCanvas = document.getElementById("rvGrain");
  const grainCtx = grainCanvas.getContext("2d");
  const wishVideo = document.getElementById("wishVideo");

  const scenes = [
    {
      text: "Happy Birthday, My Sweetest Premii 💖🎂",
      zoom: true,
      dur: 4200,
    },
    {
      text: "Valobashiii Valobashaa… Loveee and only loveee…",
      dur: 4500,
    },
    { text: "Premii, you are my Lili, my joy, my forever.", dur: 4200 },
    { text: "তোমার হাসিতে আমার পৃথিবী নতুন হয়ে ওঠে।", dur: 4500 },
    { text: "The loveee of my loveee.", dur: 4200 },
    { text: "আমাদের ভালোবাসা বাড়ে প্রতিটি নিশ্বাসে।", dur: 4500 },
    {
      text: "Friends first… And that’s why we are everything to each other. 💞",
      zoom: true,
      dur: 5200,
    },
  ];

  function sizeCanvas() {
    const r = container.getBoundingClientRect();
    grainCanvas.width = Math.max(320, Math.floor(r.width));
    grainCanvas.height = Math.max(180, Math.floor(r.height));
  }
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);

  // Create elements
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Bokeh
  (function initBokeh() {
    const count = 16;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      const size = rand(60, 160);
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = rand(-10, 90) + "%";
      s.style.top = rand(10, 80) + "%";
      s.style.animationDuration = rand(9, 18) + "s";
      s.style.animationDelay = rand(-8, 0) + "s";
      s.style.filter = `blur(${rand(6, 14)}px)`;
      bokeh.appendChild(s);
    }
  })();

  // Lilies
  (function initLilies() {
    const emojis = ["🪷", "🌸", "💮", "🌺"];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const l = document.createElement("div");
      l.className = "lily";
      l.textContent = emojis[i % emojis.length];
      l.style.left = rand(5, 85) + "%";
      l.style.top = rand(10, 70) + "%";
      l.style.animationDelay = rand(0, 6) + "s";
      l.style.fontSize = rand(22, 36) + "px";
      lilies.appendChild(l);
    }
  })();

  // Petals (drifting)
  function spawnPetal() {
    const p = document.createElement("div");
    p.className = "petal";
    p.textContent = Math.random() > 0.5 ? "🌸" : "💗";
    p.style.left = rand(80, 110) + "%";
    p.style.top = rand(-10, 10) + "%";
    p.style.animationDuration = rand(8, 14) + "s";
    p.style.fontSize = rand(16, 26) + "px";
    petals.appendChild(p);
    setTimeout(() => p.remove(), 14000);
  }
  const petalTimer = setInterval(spawnPetal, 1200);

  // Sparkles
  function initSparkles() {
    const count = 36;
    for (let i = 0; i < count; i++) {
      const sp = document.createElement("div");
      sp.className = "sparkle";
      sp.style.left = rand(0, 100) + "%";
      sp.style.top = rand(0, 100) + "%";
      sp.style.animationDelay = rand(0, 6) + "s";
      sp.style.animationDuration = rand(3, 7) + "s";
      sparkles.appendChild(sp);
    }
  }
  initSparkles();

  // Hearts pulse
  (function initHearts() {
    const count = 10;
    for (let i = 0; i < count; i++) {
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = "❤";
      h.style.left = rand(5, 95) + "%";
      h.style.top = rand(10, 85) + "%";
      h.style.animationDelay = rand(0, 4) + "s";
      hearts.appendChild(h);
    }
  })();

  // Film grain
  let grainRAF;
  function drawGrain() {
    const { width, height } = grainCanvas;
    const imageData = grainCtx.createImageData(width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = 220 + Math.random() * 35; // light grain
      data[i] = val;
      data[i + 1] = val - 8;
      data[i + 2] = val - 12;
      data[i + 3] = 8; // very low alpha
    }
    grainCtx.putImageData(imageData, 0, 0);
    grainRAF = requestAnimationFrame(drawGrain);
  }

  // Text sequencing
  let playing = false;
  function showLine(text, zoom) {
    lineEl.classList.remove("show", "zoom");
    lineEl.innerText = text;
    // small delay to allow transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (zoom) lineEl.classList.add("zoom");
        lineEl.classList.add("show");
      });
    });
  }
  async function playScenes() {
    if (playing) return;
    playing = true;
    cancelAnimationFrame(grainRAF);
    drawGrain();
    for (const s of scenes) {
      showLine(s.text, !!s.zoom);
      await new Promise((res) => setTimeout(res, s.dur));
    }
    // Fade out text at end
    lineEl.classList.remove("show", "zoom");
    setTimeout(() => (playing = false), 600);
  }

  // Auto start when visible
  const ov = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          playScenes();
          if (wishVideo) {
            const p = wishVideo.play();
            if (p && p.catch) {
              p.catch(() => {
                // Autoplay might be blocked until user gesture
                wishVideo.muted = true;
                wishVideo.play().catch(() => {});
              });
            }
          }
        }
      });
    },
    { threshold: 0.4 }
  );
  ov.observe(container);

  replayBtn.addEventListener("click", () => {
    playing = false;
    playScenes();
    if (wishVideo) {
      wishVideo.currentTime = 0;
      wishVideo.play().catch(() => {});
    }
  });

  // Sound toggle
  if (soundBtn && wishVideo) {
    soundBtn.addEventListener("click", () => {
      if (wishVideo.muted) {
        wishVideo.muted = false;
        soundIcon.textContent = "🔊";
        soundText.textContent = "Sound On";
        soundBtn.classList.remove("muted");
      } else {
        wishVideo.muted = true;
        soundIcon.textContent = "🔇";
        soundText.textContent = "Sound Off";
        soundBtn.classList.add("muted");
      }
    });
    // Initialize button state
    soundBtn.classList.add("muted");
  }
})();

/* Scroll-triggered love phrases */
const phrases = [
  document.getElementById("phrase1"),
  document.getElementById("phrase2"),
];
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + window.innerHeight / 1.5;
  phrases.forEach((p, i) => {
    const top = p.offsetTop;
    if (scrollY > top) {
      p.classList.add("show");
    } else {
      p.classList.remove("show");
    }
  });
});
