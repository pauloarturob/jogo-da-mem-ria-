const emojis = ["😃", "😃", "🐶", "🐶", "🚗", "🚗", "🍕", "🍕", "🎸", "🎸", "🏀", "🏀", "🎮", "🎮", "🏖️", "🏖️"];
let openCards = [];
let attempts = 0;
let timer;
let seconds = 0;

// Carregar sons
const successSound = new Audio('/src/sound/acerto.mp3');
const errorSound = new Audio('/src/sound/error-4-199275.mp3');
const inicioReset = new Audio('/src/sound/reset.mp3');

document.addEventListener("DOMContentLoaded", () => {
    startGame();
    startTimer();
});

function startGame() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = "";
    let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = `<img src="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><text y='1em' font-size='128'>${shuffleEmojis[i]}</text></svg>`)}">`;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    }
    attempts = 0;
    document.getElementById("attempts").textContent = attempts;
}

function handleClick() {
    if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if (openCards.length == 2) {
        attempts++;
        document.getElementById("attempts").textContent = attempts;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        successSound.play(); // Tocar som de acerto
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        errorSound.play(); // Tocar som de erro
    }
    openCards = [];
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        clearInterval(timer);
        alert(`Você venceu! Tentativas: ${attempts}, Tempo: ${formatTime(seconds)}`);
    }
}

function resetGame() {
    clearInterval(timer);
    seconds = 0;
    document.getElementById("timer").textContent = "00:00";
    startGame();
    startTimer();
    successSound.play(); // Tocar som de reset
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById("timer").textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
