const lofi = document.getElementById("lofi");
const rain = document.getElementById("rainAudio");

const focusBtn = document.getElementById("focusBtn");
const rainBtn = document.getElementById("rainBtn");

const lofiVol = document.getElementById("lofiVol");
const rainVol = document.getElementById("rainVol");

const timerEl = document.getElementById("timer");
const startPause = document.getElementById("startPause");
const reset = document.getElementById("reset");

let focusOn = false;
let rainOn = false;
let timeLeft = 25 * 60;
let running = false;
let interval;

function updateTimer() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  timerEl.textContent = `${m}:${s}`;
}

document.addEventListener("click", () => {
  lofi.play().then(() => lofi.pause()).catch(()=>{});
}, { once: true });

focusBtn.onclick = () => {
  focusOn = !focusOn;
  if (focusOn) {
    lofi.volume = lofiVol.value;
    lofi.play();
    focusBtn.textContent = "Stop Focus";
  } else {
    lofi.pause();
    focusBtn.textContent = "Focus Mode";
  }
};

rainBtn.onclick = () => {
  rainOn = !rainOn;
  if (rainOn) {
    rain.volume = rainVol.value;
    rain.play();
    rainBtn.textContent = "Rain Off";
  } else {
    rain.pause();
    rainBtn.textContent = "Rain";
  }
};

lofiVol.oninput = () => lofi.volume = lofiVol.value;
rainVol.oninput = () => rain.volume = rainVol.value;

startPause.onclick = () => {
  if (!running) {
    running = true;
    startPause.textContent = "Pause";
    interval = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) timeLeft = 25 * 60;
    }, 1000);
  } else {
    running = false;
    startPause.textContent = "Start";
    clearInterval(interval);
  }
};

reset.onclick = () => {
  clearInterval(interval);
  running = false;
  timeLeft = 25 * 60;
  startPause.textContent = "Start";
  updateTimer();
};

updateTimer();
