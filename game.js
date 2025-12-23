const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
const winScore = 10;

let player = {
  x: 140,
  y: 360,
  width: 20,
  height: 20,
  speed: 5
};

let bullets = [];
let enemies = [];
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopMove);

let left = false;
let right = false;

function movePlayer(e) {
  if (e.code === "ArrowLeft") left = true;
  if (e.code === "ArrowRight") right = true;
  if (e.code === "Space") shoot();
}

function stopMove(e) {
  if (e.code === "ArrowLeft") left = false;
  if (e.code === "ArrowRight") right = false;
}
function shoot() {
  bullets.push({
    x: player.x + 8,
    y: player.y,
    width: 4,
    height: 10
  });
}

function spawnEnemy() {
  enemies.push({
    x: Math.random() * 280,
    y: 0,
    size: 20
  });
}

setInterval(spawnEnemy, 1000);
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move player
  if (left && player.x > 0) player.x -= player.speed;
  if (right && player.x < 280) player.x += player.speed;

  // Draw player
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Bullets
  bullets.forEach((b, i) => {
    b.y -= 6;
    ctx.fillStyle = "#fff";
    ctx.fillRect(b.x, b.y, b.width, b.height);
    if (b.y < 0) bullets.splice(i, 1);
  });
enemies.forEach((e, ei) => {
    e.y += 2;
    ctx.fillStyle = "#ff4d4d";
    ctx.fillRect(e.x, e.y, e.size, e.size);

    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.size &&
        b.x + b.width > e.x &&
        b.y < e.y + e.size &&
        b.y + b.height > e.y
      ) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score++;
        document.getElementById("score").textContent = score;
if (score >= winScore) {
          winGame();
        }
      }
    });
  });

  requestAnimationFrame(update);
}

function winGame() {
  alert("🎉 YOU WIN! Claim your gift 🎁");
  window.location.href = "gift.html";
}

update();
