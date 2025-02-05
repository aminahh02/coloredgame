let messages = document.getElementById("message");
let match = document.getElementById("sample");
let boxes = document.querySelectorAll(".box");
let scoreDisplay = document.getElementById("scored");
let newGame = document.getElementById("newgames");
let hearts = [document.getElementById("heart1"), document.getElementById("heart2"), document.getElementById("heart3")];
let highScoreDisplay = document.getElementById("highScore");

let randomColour = [];
let lives = 3;
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

// Display scores
scoreDisplay.innerText = score;
highScoreDisplay.innerText = highScore;

// Generate random colors and assign to boxes
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

// Check Answer
let checkAnswer = (cardIndex) => {
    if (randomColour[cardIndex] === match.style.backgroundColor) {
        messages.innerHTML = "<h3> Yay! you got it right!</h3>";

        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        localStorage.setItem("score", score);
        scoreDisplay.innerText = score;

        setTimeout(() => {
            window.location.reload();
        }, 1500);

    } else {
        messages.innerHTML = "<h3> Aww! Try that again!</h3>";

        if (lives > 0) {
            lives--;
            hearts[lives].textContent = "🤍";
        }

        if (lives === 0) {
            messages.innerHTML = "<h3> Game Over! Restarting...</h3>";
            score = 0;
            localStorage.setItem("score", score);
            setTimeout(() => {
                localStorage.setItem("score", 0);
                lives = 3;
                hearts.forEach(heart => heart.textContent = "❤️");
                window.location.reload();
            }, 1500);
        }
    }
};

// New Game Button
newGame.addEventListener("click", () => {
    localStorage.setItem("score", 0);
    scoreDisplay.innerText = 0;
    lives = 3;
    hearts.forEach(heart => heart.textContent = "❤️");

    setTimeout(() => {
        window.location.reload();
    }, 500);
});


