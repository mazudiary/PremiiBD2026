// Balloon popping game
const balloonsContainer = document.getElementById("balloonsContainer");
const messageContainer = document.getElementById("messageContainer");
const confettiContainer = document.getElementById("confettiContainer");
const nextButton = document.getElementById("nextButton");
const starsContainer = document.getElementById("stars");
const floatingHeartsContainer = document.getElementById("floatingHearts");
const rosePetalsContainer = document.getElementById("rosePetals");
const lilyFlowersContainer = document.getElementById("lilyFlowers");
const polaroidFrame = document.getElementById("polaroidFrame");

let poppedCount = 0;
const totalBalloons = 4;
const words = [];

// Create twinkling stars background
function createStars() {
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = Math.random() * 2 + 2 + "s";
    starsContainer.appendChild(star);
  }
}

// Create floating hearts
function createFloatingHearts() {
  const hearts = ["❤️", "💕", "💖", "💗", "💝", "💞"];
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "-50px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }, 800);
}

// Create falling rose petals
function createRosePetals() {
  const petals = ["🌹", "🥀", "🌺", "🌸"];
  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "rose-petal";
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + "%";
    petal.style.top = "-50px";
    petal.style.animationDuration = Math.random() * 4 + 6 + "s";
    petal.style.animationDelay = Math.random() * 2 + "s";
    rosePetalsContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 10000);
  }, 1200);
}

// Create floating lily flowers
function createLilyFlowers() {
  const lilies = ["🪷", "🌼", "🌻"];
  for (let i = 0; i < 8; i++) {
    const lily = document.createElement("div");
    lily.className = "lily";
    lily.textContent = lilies[Math.floor(Math.random() * lilies.length)];
    lily.style.left = Math.random() * 100 + "%";
    lily.style.top = Math.random() * 100 + "%";
    lily.style.animationDelay = Math.random() * 5 + "s";
    lily.style.animationDuration = Math.random() * 5 + 8 + "s";
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
  ];

  // Create lots of confetti
  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position across the top
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";

    // Alternate between colored shapes and text
    if (i % 3 === 0) {
      // Text confetti (pet names)
      confetti.textContent =
        petNames[Math.floor(Math.random() * petNames.length)];
      confetti.style.fontSize = Math.random() * 8 + 12 + "px";
      confetti.style.fontFamily = "'Caveat', cursive";
      confetti.style.fontWeight = "700";
      confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = "auto";
      confetti.style.height = "auto";
    } else {
      // Colored shape confetti
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // Random size
      const size = Math.random() * 8 + 4;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";

      // Random shape
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = "50%";
      }
    }

    // Random delay
    confetti.style.animationDelay = Math.random() * 0.3 + "s";

    // Random duration
    confetti.style.animationDuration = Math.random() * 1.5 + 2 + "s";

    confettiContainer.appendChild(confetti);

    // Trigger animation
    setTimeout(() => {
      confetti.classList.add("active");
    }, 10);
  }

  // Clean up confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 4000);
}

// Add some ambient floating particles
function createFloatingParticles() {
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = Math.random() * 4 + 2 + "px";
    particle.style.borderRadius = "50%";
    particle.style.background = "rgba(255, 255, 255, 0.3)";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";

    const duration = Math.random() * 10 + 10;
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
      transform: translate(0, 0);
      opacity: 0.3;
    }
    25% {
      transform: translate(20px, -30px);
      opacity: 0.6;
    }
    50% {
      transform: translate(-10px, -60px);
      opacity: 0.3;
    }
    75% {
      transform: translate(30px, -40px);
      opacity: 0.6;
    }
  }
`;
document.head.appendChild(style);

// Initialize particles
createFloatingParticles();
