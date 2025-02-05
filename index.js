let messages = document.getElementById("message");
let match = document.getElementById("sample");
let boxes = document.querySelectorAll(".box");
let scoreDisplay = document.getElementById("scored");
let newGame = document.getElementById("newgames");

let hearts = [
    document.getElementById("heart1"),
    document.getElementById("heart2"),
    document.getElementById("heart3")
];

let highScoreDisplay = document.getElementById("highScore");

// Audio elements for sounds
let correctSound = new Audio("win.mp3");  // Replace with actual sound file
let wrongSound = new Audio("lose.mp3");   
let gameOver = new Audio("Gameover.mp3");

// Game state variables
let randomColour = [];
let lives = 3;
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

// Reset Scores on Page Load
window.addEventListener("DOMContentLoaded", () => {
    alert("Welcome to the Color Guessing Game! 🎮\n\nHere's how to play:\n\nYour goal is simple – click on the box that matches the color of the display box at the top! 🎨\n\nYou have 3 lives. Make a wrong guess and you lose one heart 💔. But don't worry, keep playing to improve your score! 💪\n\nHave fun and good luck! 🍀");

    // Load the scores or reset if not available
    score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
    highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

    scoreDisplay.innerText = score;
    highScoreDisplay.innerText = highScore;
});

// Display scores
scoreDisplay.innerText = score;
highScoreDisplay.innerText = highScore;

// Generate Random Colors
for (let i = 0; i < 6; i++) {
    let randomColour1 = Math.floor(Math.random() * 256);
    let randomColour2 = Math.floor(Math.random() * 256);
    let randomColour3 = Math.floor(Math.random() * 256);

    let colourString = `rgb(${randomColour1}, ${randomColour2}, ${randomColour3})`;
    randomColour.push(colourString);
    boxes[i].style.backgroundColor = colourString;
}

// Select correct color
let randomIndex = Math.floor(Math.random() * 6);
match.style.backgroundColor = randomColour[randomIndex];

// Check Answer Function
let checkAnswer = (cardIndex) => {
    if (randomColour[cardIndex] === match.style.backgroundColor) {
        messages.innerHTML = "<h3> Yay! You got it right!</h3>";

        correctSound.currentTime = 0; // Reset sound to start
        correctSound.play();          // Play correct sound

        setTimeout(() => {
            resetGame();
        }, 1500);

        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        localStorage.setItem("score", score);
        scoreDisplay.innerText = score;

    } else {
        messages.innerHTML = "<h3> Aww! Try that again!</h3>";

        wrongSound.currentTime = 0; // Reset sound to start
        wrongSound.play();          // Play wrong sound

        if (lives > 0) {
            lives--;
            hearts[lives].textContent = "🤍";
        }

        if (lives === 0) {
            messages.innerHTML = "<h3> Game Over! Restarting...</h3>";

            // Reset score and update localStorage
            gameOver.play(); 
            score = 0;
            localStorage.setItem("score", score);
            scoreDisplay.innerText = score;

            setTimeout(() => {
                resetGameFinish();
            }, 1500);
        }
    }
};

// New Game Button Handler
newGame.addEventListener("click", () => {
    score = 0;
    localStorage.setItem("score", score);
    scoreDisplay.innerText = score;

    lives = 3;
    hearts.forEach(heart => heart.textContent = "❤️");

    setTimeout(() => {
        resetGameFinish();
    }, 500);
});

// Reset Game Function
function resetGame() {
    randomColour = [];

    for (let i = 0; i < 6; i++) {
        let randomColour1 = Math.floor(Math.random() * 256);
        let randomColour2 = Math.floor(Math.random() * 256);
        let randomColour3 = Math.floor(Math.random() * 256);
        let colourString = `rgb(${randomColour1}, ${randomColour2}, ${randomColour3})`;

        randomColour.push(colourString);
        boxes[i].style.backgroundColor = colourString;
    }

    let randomIndex = Math.floor(Math.random() * 6);
    match.style.backgroundColor = randomColour[randomIndex];

    messages.innerHTML = "<h3>Keep going!</h3>";
}

// Reset Game Fully Function
function resetGameFinish() {
    // Clear localStorage to reset the game
    localStorage.removeItem("score");
    localStorage.removeItem("highScore");

    lives = 3;
    hearts.forEach(heart => heart.textContent = "❤️");

    randomColour = [];
    for (let i = 0; i < 6; i++) {
        let randomColour1 = Math.floor(Math.random() * 256);
        let randomColour2 = Math.floor(Math.random() * 256);
        let randomColour3 = Math.floor(Math.random() * 256);
        let colourString = `rgb(${randomColour1}, ${randomColour2}, ${randomColour3})`;

        randomColour.push(colourString);
        boxes[i].style.backgroundColor = colourString;
    }

    let randomIndex = Math.floor(Math.random() * 6);
    match.style.backgroundColor = randomColour[randomIndex];

    messages.innerHTML = "<h3>New Game Started!</h3>";
}
