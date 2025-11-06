// 🧠 Motivational Quotes
const quotes = [
  "Dream big. Start small. Act now.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Success is not for the lazy.",
  "Discipline beats motivation every time.",
  "Focus on progress, not perfection.",
  "Believe you can and you're halfway there.",
  "The secret of getting ahead is getting started."
];

function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
}

// ⏱️ Timer Logic
let timer;
let timeLeft = 25 * 60;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        alert("Time’s up! Take a break 🌟");
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  isRunning = false;
  updateTimerDisplay();
}

// 🎯 Goal Tracker
function addGoal() {
  const input = document.getElementById("goalInput");
  const goal = input.value.trim();
  if (goal === "") return;

  const goalList = document.getElementById("goalList");
  const li = document.createElement("li");
  li.textContent = goal;

  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.onclick = () => {
    goalList.removeChild(li);
    saveGoals();
  };

  li.appendChild(delBtn);
  goalList.appendChild(li);
  input.value = "";
  saveGoals();
}

function saveGoals() {
  const goals = Array.from(document.querySelectorAll("#goalList li")).map(
    li => li.firstChild.textContent
  );
  localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
  const saved = JSON.parse(localStorage.getItem("goals") || "[]");
  saved.forEach(goal => {
    const li = document.createElement("li");
    li.textContent = goal;
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => {
      li.remove();
      saveGoals();
    };
    li.appendChild(delBtn);
    document.getElementById("goalList").appendChild(li);
  });
}

// Initialize on load
window.onload = function() {
  updateTimerDisplay();
  loadGoals();
};
