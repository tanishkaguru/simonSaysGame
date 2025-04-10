let gameSeq = [];
let userSeq = [];
let btns = ['yellow', 'red', 'purple', 'green'];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function startGameOnce(e) {
    if (!started && !e.target.classList.contains("btn")) {
        started = true;
        levelUp();
        document.removeEventListener("click", startGameOnce);
    }
}
document.addEventListener("click", startGameOnce);

function BtnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    BtnFlash(randbtn);
    gameSeq.push(randColor);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(function () {
                levelUp();
            }, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Click anywhere on screen to restart.`;
        document.body.classList.add("flash-red");
        setTimeout(() => {
            document.body.classList.remove("flash-red");
        }, 250);
        reset();
        enableRestartAfterGameOver();
    }
}

function btnPress() {
    let btn = this;
    BtnFlash(btn);
    const clickSound = document.getElementById("click-sound");
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    showHeartBurst(btn);
    checkAns(userSeq.length - 1);
}

function showHeartBurst(btn) {
    const heart = document.createElement("div");
    heart.classList.add("heart-burst");
    heart.innerText = "💖";
    const rect = btn.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function enableRestartAfterGameOver() {
    function restartHandler(e) {
        if (!started && !e.target.classList.contains("btn")) {
            started = true;
            document.removeEventListener("click", restartHandler);
            h2.innerText = `Level ${level}`;
            setTimeout(() => {
                levelUp();
            }, 500);
        }
    }
    document.addEventListener("click", restartHandler);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
