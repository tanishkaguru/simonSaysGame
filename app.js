let gameSeq = [];
let userSeq = [];
let btns = ['yellow', 'red', 'purple', 'green'];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("click", function (e) {
    if (!started && !e.target.classList.contains("btn")) {
        started = true;
        levelUp();
    }
});

function BtnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randColor = btns[Math.floor(Math.random() * 4)];
    BtnFlash(document.querySelector(`.${randColor}`));
    gameSeq.push(randColor);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => levelUp(), 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Click anywhere on screen to restart.`;
        document.body.classList.add("flash-red");
        setTimeout(() => document.body.classList.remove("flash-red"), 250);
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

    userSeq.push(btn.getAttribute("id"));
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
    setTimeout(() => heart.remove(), 1000);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function enableRestartAfterGameOver() {
    function restartHandler(e) {
        if (!e.target.classList.contains("btn")) {
            document.removeEventListener("click", restartHandler);
            started = true;
            h2.innerText = `Level ${level}`;
            setTimeout(() => levelUp(), 500);
        }
    }
    document.addEventListener("click", restartHandler);
}

document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnPress));
