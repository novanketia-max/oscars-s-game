const words = [
  { word: "javascript", hint: "The language of the web" },
  { word: "asynchronous", hint: "Allows non-blocking execution" },
  { word: "algorithm", hint: "A step-by-step solution" },
  { word: "browser", hint: "You are using it right now" }
];

const wordEl = document.getElementById("word");
const hintEl = document.getElementById("hint");
const lettersEl = document.getElementById("letters");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const parts = document.querySelectorAll(".part");

let selected;
let guessed = [];
let wrong = 0;
let score = 0;
let time = 60;
let timer;

function startGame() {
  selected = words[Math.floor(Math.random() * words.length)];
  guessed = [];
  wrong = 0;
  time = 60;

  hintEl.textContent = "Hint: " + selected.hint;
  timeEl.textContent = time;

  parts.forEach(p => p.style.opacity = 0);
  createLetters();
  updateWord();
  startTimer();
}

function updateWord() {
  wordEl.innerHTML = selected.word
    .split("")
    .map(l => guessed.includes(l) ? l : "_")
    .join(" ");
}

function createLetters() {
  lettersEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.onclick = () => guess(btn.textContent.toLowerCase(), btn);
    lettersEl.appendChild(btn);
  }
}

function guess(letter, btn) {
  btn.disabled = true;
  if (selected.word.includes(letter)) {
    guessed.push(letter);
    updateWord();
    checkWin();
  } else {
    parts[wrong].style.opacity = 1;
    wrong++;
    if (wrong === parts.length) lose();
  }
}

function checkWin() {
  if (!wordEl.textContent.includes("_")) {
    score += 100;
    scoreEl.textContent = score;
    clearInterval(timer);
    setTimeout(startGame, 1200);
  }
}

function lose() {
  clearInterval(timer);
  alert("Game Over! Word was: " + selected.word);
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) lose();
  }, 1000);
}

document.getElementById("restart").onclick = startGame;

startGame();