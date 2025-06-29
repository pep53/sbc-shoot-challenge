
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let ball = { x: 180, y: 580, radius: 10, vy: -8, active: false };
let hoop = { x: 140, y: 150, width: 80, height: 10 };
let gameOver = false;
let time = 30;

function drawHoop() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff0099";
  ctx.fill();
  ctx.closePath();
}

function update() {
  if (ball.active) {
    ball.y += ball.vy;
    if (
      ball.y < hoop.y + hoop.height &&
      ball.y > hoop.y &&
      ball.x > hoop.x &&
      ball.x < hoop.x + hoop.width
    ) {
      score++;
      document.getElementById("score").textContent = "Score : " + score;
      ball.active = false;
    } else if (ball.y < 0) {
      ball.active = false;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHoop();
  drawBall();
}

function loop() {
  if (!gameOver) {
    update();
    draw();
    requestAnimationFrame(loop);
  }
}

canvas.addEventListener("click", () => {
  if (!ball.active) {
    ball.y = 580;
    ball.active = true;
  }
});

setInterval(() => {
  if (time > 0) {
    time--;
  } else {
    gameOver = true;
    alert("Fin du jeu ! Score final : " + score);
  }
}, 1000);

loop();
