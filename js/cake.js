if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

// Create star field
function createStarField() {
  const starField = document.getElementById("starField");
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 2 + "s";
    starField.appendChild(star);
  }
}

// Create floating hearts
function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  const hearts = ["❤️", "💕", "💖", "💗", "💝", "💞", "💓"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 10 + Math.random() * 4 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 14000);
  }, 2000);
}

// Create magic sparkles
function createMagicSparkles() {
  const container = document.getElementById("magicSparkles");
  const sparkles = ["✨", "⭐", "💫", "🌟", "💥"];

  setInterval(() => {
    const sparkle = document.createElement("div");
    sparkle.className = "magic-sparkle";
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDuration = 4 + Math.random() * 2 + "s";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 6000);
  }, 1500);
}

// Create rose petals
function createRosePetals() {
  const container = document.getElementById("rosePetals");
  const petals = ["🌹", "🥀", "🌺", "🌸", "🌷"];

  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "rose-petal";
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = 12 + Math.random() * 4 + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(petal);

    setTimeout(() => petal.remove(), 16000);
  }, 2500);
}

// Initialize background effects
createStarField();
createFloatingHearts();
createMagicSparkles();
createRosePetals();

// Wait for cake animation to complete before allowing cutting
let canCut = false;
const cake = document.getElementById("cake");
const knife = document.getElementById("knife");
const cutInstruction = document.getElementById("cutInstruction");
const confettiContainer = document.getElementById("confettiContainer");

// Enable cutting after animation completes (7.5s)
setTimeout(() => {
  canCut = true;
  cake.classList.add("clickable");
}, 7500);

// Create confetti
function createConfetti() {
  const colors = [
    "#ff4fa3",
    "#ff79c6",
    "#ffd6e8",
    "#ffe6f1",
    "#ffb6d9",
    "#ffa0c9",
  ];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "0";

    // Random color
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = Math.random() * 10 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    // Random delay
    confetti.style.animationDelay = Math.random() * 0.5 + "s";

    // Random shape
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = "50%";
    }

    confettiContainer.appendChild(confetti);

    // Trigger animation
    setTimeout(() => {
      confetti.classList.add("active");
    }, 10);
  }

  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 3500);
}

// Play cutting sound effect (optional - can be added later)
function playCutSound() {
  // You can add an audio element if you have a sound file
  // const audio = new Audio('assets/cut-sound.mp3');
  // audio.play();
}

// Function to perform cake cutting
function cutCake() {
  if (!canCut) return;

  canCut = false;
  cake.classList.remove("clickable");
  cake.classList.add("cutting");

  // Hide instruction
  cutInstruction.classList.add("hidden");

  // Turn off the candle flame
  const candle = document.querySelector(".velas");
  candle.classList.add("blowout");

  // Show and animate knife
  knife.classList.add("cutting");

  // Play sound
  playCutSound();

  // Create confetti after a delay
  setTimeout(() => {
    createConfetti();

    // Add celebration message
    const celebration = document.createElement("div");
    celebration.style.position = "fixed";
    celebration.style.top = "50%";
    celebration.style.left = "50%";
    celebration.style.transform = "translate(-50%, -50%)";
    celebration.style.fontSize = "3rem";
    celebration.style.fontWeight = "bold";
    celebration.style.color = "#ff4fa3";
    celebration.style.textShadow = "0 4px 10px rgba(0,0,0,0.2)";
    celebration.style.zIndex = "40";
    celebration.style.opacity = "0";
    celebration.style.transition = "opacity 0.5s ease";
    celebration.style.pointerEvents = "none";
    celebration.innerHTML = "🎉 Yay! 🎉";

    document.body.appendChild(celebration);

    setTimeout(() => {
      celebration.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      celebration.style.opacity = "0";
      setTimeout(() => {
        celebration.remove();
      }, 500);
    }, 2000);

    // Show the Next button after celebration
    setTimeout(() => {
      const backButton = document.querySelector(".back-button");
      if (backButton) {
        backButton.classList.add("show");
      }
    }, 2500);
  }, 800);

  // Reset after animation
  setTimeout(() => {
    knife.classList.remove("cutting");
  }, 1500);
}

// Handle cake click
cake.addEventListener("click", cutCake);

// Also allow clicking on the instruction
cutInstruction.addEventListener("click", cutCake);

// Add hover effect hint
cake.addEventListener("mouseenter", () => {
  if (canCut) {
    cake.style.filter = "brightness(1.1)";
  }
});

cake.addEventListener("mouseleave", () => {
  cake.style.filter = "brightness(1)";
});
