// Balloon popping game - Optimized for low-end devices
const balloonsContainer = document.getElementById("balloonsContainer");
const messageContainer = document.getElementById("messageContainer");
const confettiContainer = document.getElementById("confettiContainer");
const nextButton = document.getElementById("nextButton");
const starsContainer = document.getElementById("stars");
const floatingHeartsContainer = document.getElementById("floatingHearts");
const rosePetalsContainer = document.getElementById("rosePetals");
const lilyFlowersContainer = document.getElementById("lilyFlowers");
const polaroidFrame = document.getElementById("polaroidFrame");

/* Detect mobile/low-end devices */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const reduceEffects = isMobile || isLowEnd;

let poppedCount = 0;
const totalBalloons = 4;
const words = [];

if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

// Create twinkling stars background - Optimized
function createStars() {
  const starCount = reduceEffects ? 40 : 100;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = Math.random() * 2 + 2 + "s";
    star.style.willChange = "opacity, transform";
    starsContainer.appendChild(star);
  }
}

// Create floating hearts - Optimized
function createFloatingHearts() {
  if (reduceEffects) return; // Skip on low-end devices
  
  const hearts = ["❤️", "💕", "💖", "💗", "💝", "💞", "💓", "💟"];
  const interval = 700;
  const maxHearts = 8;
  let activeHearts = 0;

  setInterval(() => {
    if (activeHearts >= maxHearts) return;
    
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-50px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heart.style.willChange = "transform";
    floatingHeartsContainer.appendChild(heart);
    activeHearts++;

    setTimeout(() => {
      heart.remove();
      activeHearts--;
    }, 9000);
  }, interval);
}

// Create falling rose petals - Optimized
function createRosePetals() {
  if (reduceEffects) return; // Skip on low-end devices
  
  const petals = ["🌹", "🥀", "🌺", "🌸", "🌼"];
  const interval = 1500;
  const maxPetals = 5;
  let activePetals = 0;

  setInterval(() => {
    if (activePetals >= maxPetals) return;
    
    const petal = document.createElement("div");
    petal.className = "rose-petal";
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "-50px";
    petal.style.animationDuration = (8 + Math.random() * 5) + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";
    petal.style.willChange = "transform";
    rosePetalsContainer.appendChild(petal);
    activePetals++;

    setTimeout(() => {
      petal.remove();
      activePetals--;
    }, 13000);
  }, interval);
}

// Create floating lily flowers - Optimized
function createLilyFlowers() {
  if (reduceEffects) return; // Skip on low-end devices
  
  const lilies = ["🪷", "🌼", "🌻"];
  const lilyCount = 4;
  
  for (let i = 0; i < lilyCount; i++) {
    const lily = document.createElement("div");
    lily.className = "lily";
    lily.textContent = lilies[Math.floor(Math.random() * lilies.length)];
    lily.style.left = Math.random() * 100 + "%";
    lily.style.top = Math.random() * 100 + "%";
    lily.style.animationDelay = Math.random() * 5 + "s";
    lily.style.animationDuration = Math.random() * 5 + 8 + "s";
    lily.style.willChange = "transform, opacity";
    lilyFlowersContainer.appendChild(lily);
  }
}

createStars();
createFloatingHearts();
createRosePetals();
createLilyFlowers();

// Add click event to each balloon
document.querySelectorAll(".balloon-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    if (!wrapper.classList.contains("popped")) {
      popBalloon(wrapper);
    }
  });
});

function popBalloon(wrapper) {
  // Mark as popped
  wrapper.classList.add("popped");
  poppedCount++;

  // Get the word from the balloon
  const word = wrapper.querySelector(".balloon").dataset.word;
  words.push(word);

  // Create pop particles
  createPopParticles(wrapper);

  // Play pop sound (optional - can add audio if needed)
  playPopSound();

  // Show the word
  setTimeout(() => {
    const wordElement = document.createElement("div");
    wordElement.className = "word";
    wordElement.textContent = word;
    messageContainer.appendChild(wordElement);
  }, 200);

  // Check if all balloons are popped
  if (poppedCount === totalBalloons) {
    setTimeout(() => {
      celebrate();
    }, 1000);
  }
}

function createPopParticles(wrapper) {
  const rect = wrapper.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const colors = ['#ff6b9d', '#ffb347', '#4ade80', '#60a5fa'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particleCount = reduceEffects ? 8 : 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9998";
    particle.style.fontSize = "14px";
    particle.textContent = ["✨", "💫", "⭐"][Math.floor(Math.random() * 3)];
    particle.style.color = color;
    particle.style.opacity = "1";
    particle.style.willChange = "transform, opacity";
    
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 4 + Math.random() * 4;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 2;
    
    const startTime = Date.now();
    const duration = reduceEffects ? 400 : 600;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      particle.style.left = (centerX + vx * elapsed / 25) + "px";
      particle.style.top = (centerY + vy * elapsed / 25 - progress * 80) + "px";
      particle.style.opacity = 1 - progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };
    
    document.body.appendChild(particle);
    animate();
  }
}

function playPopSound() {
  // You can add an audio element if you have a pop sound file
  // const audio = new Audio('assets/pop.mp3');
  // audio.play();
}

function celebrate() {
  // Hide the title
  const title = document.querySelector(".title");
  if (title) {
    title.classList.add("hidden");
  }

  // Create confetti
  createConfetti();

  // Show polaroid frame after a delay
  setTimeout(() => {
    polaroidFrame.classList.add("show");
  }, 1200);

  // Show next button after a delay
  setTimeout(() => {
    nextButton.classList.add("show");
  }, 2000);
}

function createConfetti() {
  const colors = [
    "#ff6b9d",
    "#ffb347",
    "#4ade80",
    "#60a5fa",
    "#a78bfa",
    "#fbbf24",
    "#f472b6",
    "#34d399",
  ];

  const petNames = [
    "Premii",
    "Lopai",
    "Bibijan",
    "Valobashi",
    "💕",
    "❤️",
    "💖",
    "🌹",
    "✨",
    "💫",
  ];

  // Reduce confetti count on low-end devices
  const confettiCount = reduceEffects ? 80 : 250;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position across the top and sides
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = (Math.random() * 20 - 50) + "px";

    // Alternate between colored shapes and text
    if (i % 3 === 0) {
      // Text confetti (pet names)
      confetti.textContent =
        petNames[Math.floor(Math.random() * petNames.length)];
      confetti.style.fontSize = Math.random() * 10 + 14 + "px";
      confetti.style.fontFamily = "'Caveat', cursive";
      confetti.style.fontWeight = "700";
      confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = "auto";
      confetti.style.height = "auto";
      confetti.style.textShadow = `0 0 10px ${confetti.style.color}`;
    } else {
      // Colored shape confetti
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // Random size
      const size = Math.random() * 10 + 5;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";

      // Random shape
      if (Math.random() > 0.4) {
        confetti.style.borderRadius = "50%";
      } else {
        confetti.style.borderRadius = Math.random() > 0.5 ? "50% 0" : "0 50%";
      }
      
      confetti.style.boxShadow = `0 0 10px ${confetti.style.backgroundColor}`;
    }

    // Random delay
    confetti.style.animationDelay = Math.random() * 0.4 + "s";

    // Random duration
    confetti.style.animationDuration = Math.random() * 2 + 2.5 + "s";

    confettiContainer.appendChild(confetti);

    // Trigger animation
    setTimeout(() => {
      confetti.classList.add("active");
    }, 10);
  }

  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 5000);
}

// Add some ambient floating particles with trail effects
function createFloatingParticles() {
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = Math.random() * 5 + 2 + "px";
    particle.style.height = Math.random() * 5 + 2 + "px";
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(255, 255, 255, " + (0.2 + Math.random() * 0.4) + ")";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";
    particle.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px rgba(255, 255, 255, 0.6)`;

    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 5;

    particle.style.animation = `floatParticle ${duration}s ${delay}s ease-in-out infinite`;

    document.body.appendChild(particle);
  }
}

// Floating particle animation
const style = document.createElement("style");
style.textContent = `
  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(25px, -40px) scale(1.2);
      opacity: 0.7;
    }
    50% {
      transform: translate(-15px, -80px) scale(1);
      opacity: 0.3;
    }
    75% {
      transform: translate(35px, -50px) scale(1.3);
      opacity: 0.6;
    }
  }
`;
document.head.appendChild(style);

// Add mouse trail effect on balloons
document.querySelectorAll(".balloon-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.85 && !wrapper.classList.contains("popped")) {
      const rect = wrapper.getBoundingClientRect();
      const trail = document.createElement("div");
      trail.style.position = "fixed";
      trail.style.left = (rect.left + rect.width / 2) + "px";
      trail.style.top = (rect.top + rect.height / 2) + "px";
      trail.style.fontSize = "12px";
      trail.style.pointerEvents = "none";
      trail.style.opacity = "0.7";
      trail.textContent = "✨";
      trail.style.zIndex = "5";
      trail.style.animation = "fadeOutTrail 0.8s ease-out forwards";
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 800);
    }
  });
});

const trailStyle = document.createElement("style");
trailStyle.textContent = `
  @keyframes fadeOutTrail {
    to {
      opacity: 0;
      transform: translateY(-20px) scale(0.5);
    }
  }
`;
document.head.appendChild(trailStyle);

// Initialize particles
createFloatingParticles();
