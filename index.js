let messages = document.getElementById("message");
let match = document.getElementById("sample");
let boxes = document.querySelectorAll(".box");
let randomColour = [];

for (let i = 0; i < 6; i++) {
    let randomColour1 = Math.floor(Math.random()*256);
    let randomColour2 = Math.floor(Math.random()*256);
    let randomColour3 = Math.floor(Math.random()*256);

    let colourString = `rgb(${randomColour1}, ${randomColour2}, ${randomColour3})`;

    randomColour.push(colourString);
    console.log(colourString);

    boxes[i].style.backgroundColor = colourString;   
}

let randomIndex = Math.floor(Math.random() * 6);
match.style.backgroundColor = randomColour[randomIndex];

let scoreDisplay = document.getElementById("scored");
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
scoreDisplay.innerText = score;

let checkAnswer = (cardIndex) => {
    if (randomColour[cardIndex] === match.style.backgroundColor) {
        messages.innerHTML =  "<h3> Yay! you got it right!</h3>";
        
        score++;
        localStorage.setItem("score", score);
        scoreDisplay.innerText = score;

        setTimeout(() => {
            window.location.reload();
        }, 1500)

    } else {
        messages.innerHTML = "<h3> Aww! Try that again!</h3>"
    }
}


let newGame = document.getElementById("newgames")
newGame.addEventListener ("click", () => {

    localStorage.setItem("score", 0);
    scoreDisplay.innerText = 0;

    setTimeout(() => {
        window.location.reload();
    }, 500); 
})


