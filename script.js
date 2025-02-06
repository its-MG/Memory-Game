const emojis = [
  "👻",
  "👻",
  "✨",
  "✨",
  "📺",
  "📺",
  "⌛",
  "⌛",
  "🔥",
  "🔥",
  "🪄",
  "🪄",
  "🧭",
  "🧭",
  "👍",
  "👍",
];

let timer;
let seconds = 0;
let isGameStarted = false;

// Function to start the timer
function startTimer() {
  if (!isGameStarted) {
    isGameStarted = true;
    timer = setInterval(() => {
      seconds++;
      document.getElementById("timer").innerText = `⏲️ Time: ${seconds}s`;
    }, 1000);
  }
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timer);
  isGameStarted = false;
}

// Function to update the highest score
function updateHighestScore() {
  const highestScore = localStorage.getItem("highestScore");
  if (!highestScore || seconds < highestScore) {
    localStorage.setItem("highestScore", seconds);
    document.getElementById(
      "highestScore"
    ).innerText = ` 📌 Highest Score: ${seconds}s`;
  }
}

// Shuffle the emojis
var shuffledEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (var i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffledEmojis[i];
  box.onclick = function () {
    if (!isGameStarted) startTimer(); // Start the timer on first click
    this.classList.add("boxOpen");
    setTimeout(function () {
      if (document.querySelectorAll(".boxOpen").length > 1) {
        if (
          document.querySelectorAll(".boxOpen")[0].innerHTML ==
          document.querySelectorAll(".boxOpen")[1].innerHTML
        ) {
          document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch");
          document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch");
          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen");
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen");
          if (document.querySelectorAll(".boxMatch").length == emojis.length) {
            stopTimer(); // Stop the timer when the game is won
            updateHighestScore(); // Update the highest score
            alert(`🔥 You Win! Time: ${seconds}s`);
          }
        } else {
          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen");
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen");
        }
      }
    }, 500);
  };
  document.querySelector(".game").appendChild(box);
}

// Reset the game
document.querySelector(".reset").onclick = function () {
  window.location.reload();
};

// Display the highest score on page load
window.onload = function () {
  const highestScore = localStorage.getItem("highestScore");
  if (highestScore) {
    document.getElementById(
      "highestScore"
    ).innerText = `📌 Highest Score: ${highestScore}s`;
  }
};
