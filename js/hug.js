if (!sessionStorage.getItem("premii_unlocked")) {
  window.location.href = "index.html";
}

const video = document.getElementById("hugVideo");
const battery = document.getElementById("battery");
const energyLabel = document.getElementById("energyLabel");

function triggerRefill() {
  if (!battery) return;
  battery.classList.remove("is-refilling");
  void battery.offsetWidth;
  battery.classList.add("is-refilling");

  if (energyLabel) {
    energyLabel.textContent = "Energy refilling...";
  }
  battery.setAttribute("aria-label", "Energy battery refilling");
}

function resetLabel() {
  if (energyLabel) {
    energyLabel.textContent = "Energy battery";
  }
}

if (video) {
  video.addEventListener("play", triggerRefill);
  video.addEventListener("pause", resetLabel);
  video.addEventListener("ended", resetLabel);
}
