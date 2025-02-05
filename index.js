const messages = document.getElementById("message");
const match = document.getElementById("sample");
const boxes = document.querySelectorAll(".box");
const scoreDisplay = document.getElementById("scored");
const newGame = document.getElementById("newgames");
const highScoreDisplay = document.getElementById("highScore");
const hearts = [
    document.getElementById("heart1"),
    document.getElementById("heart2"),
    document.getElementById("heart3")
];

const correctSound = new Audio("win.mp3");
const wrongSound = new Audio("lose.mp3");
const gameOverSound = new Audio("Gameover.mp3");

let randomColours = [];
let lives = 3;
let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;

// Show alert and initialize the game
window.addEventListener("DOMContentLoaded", () => {
    alert("Welcome to the Color Guessing Game! 🎮\n\nClick the box that matches the displayed color! 🎨\nYou have 3 lives. Lose them all and restart! 💔\nHave fun and good luck! 🍀");

    // Display current score and high score
    scoreDisplay.innerText = score;
    highScoreDisplay.innerText = highScore;

    // Start the game with a new round
    startNewRound();
});

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(err => console.warn("Sound playback issue:", err));
}

// Generate random colors for the boxes
function generateRandomColors() {
    randomColours = Array.from({ length: 6 }, () => {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    });
    boxes.forEach((box, i) => (box.style.backgroundColor = randomColours[i]));
}

// Start a new round by generating random colors and setting a new match
function startNewRound() {
    generateRandomColors();
    match.style.backgroundColor = randomColours[Math.floor(Math.random() * 6)];
    messages.innerHTML = "<h3>GO!</h3>";
}

// Checks if the clicked color matches the displayed match color
function checkAnswer(cardIndex) {
    if (randomColours[cardIndex] === match.style.backgroundColor) {
        messages.innerHTML = "<h3>Yay! You got it right!</h3>";
        playSound(correctSound);

        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        localStorage.setItem("score", score);
        scoreDisplay.innerText = score;

        setTimeout(startNewRound, 1200);
    } else {
        messages.innerHTML = "<h3>Aww! Try again!</h3>";
        playSound(wrongSound);

        lives--;
        hearts[lives].textContent = "🤍";
        
        if (lives === 0) {
            messages.innerHTML = "<h3>Game Over! Restarting...</h3>";
            playSound(gameOverSound);
            resetGame();
        }
    }
}

// Event listener for the New Game button to reset the game
newGame.addEventListener("click", resetGame);

// Reset the game when it's over or manually reset
function resetGame() {
    score = 0;
    lives = 3;  

    hearts.forEach(heart => (heart.textContent = "❤️")); 
    localStorage.setItem("score", score);  // Store the reset score in localStorage
 
    highScoreDisplay.innerText = highScore;

    scoreDisplay.innerText = score; 

    setTimeout(startNewRound, 500);
}

// Refresh the page to reset both the score and high score when needed
window.addEventListener("beforeunload", () => {

    localStorage.removeItem("score");
    localStorage.removeItem("highScore");
});
