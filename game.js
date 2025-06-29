const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = { x: canvas.width / 2, y: 500, radius: 15, color: '#FF007F', dy: 0, gravity: 0.6, lift: -12 };
let score = 0;
let hoop = { x: canvas.width / 2 - 50, y: 100, width: 100, height: 10 };
let isGameOver = false;

const scoreDisplay = document.getElementById('score');
const swishSound = document.getElementById('swishSound');

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHoop() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
}

function resetBall() {
    ball.y = 500;
    ball.dy = 0;
}

function shootBall() {
    if (!isGameOver && ball.y === 500) {
        ball.dy = ball.lift;
    }
}

function detectScore() {
    if (
        ball.y + ball.radius > hoop.y &&
        ball.y - ball.radius < hoop.y + hoop.height &&
        ball.x > hoop.x &&
        ball.x < hoop.x + hoop.width &&
        ball.dy > 0
    ) {
        score++;
        scoreDisplay.textContent = "Score : " + score;
        swishSound.play();
        resetBall();
    }
}

function update() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawHoop();

        ball.dy += ball.gravity;
        ball.y += ball.dy;

        if (ball.y + ball.radius > canvas.height) {
            resetBall();
        }

        detectScore();
        requestAnimationFrame(update);
    }
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = "Score : 0";
    isGameOver = false;
    resetBall();
    update();
}

canvas.addEventListener("click", shootBall);
restartGame();
