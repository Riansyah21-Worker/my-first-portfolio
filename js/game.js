// Setup Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player properties
let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: 'blue',
  speed: 2,
  score: 0
};

// Food properties
let food = [];
for (let i = 0; i < 50; i++) {
  food.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5,
    color: 'green'
  });
}

// Mouse position
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.closePath();

  // Move player towards mouse
  let dx = mouseX - player.x;
  let dy = mouseY - player.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 1) {
    player.x += (dx / distance) * player.speed;
    player.y += (dy / distance) * player.speed;
  }

  // Draw food
  food.forEach((f, index) => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fillStyle = f.color;
    ctx.fill();
    ctx.closePath();

    // Check collision with player
    let dist = Math.sqrt((player.x - f.x) ** 2 + (player.y - f.y) ** 2);
    if (dist < player.radius + f.radius) {
      // Eat food
      player.radius += 1; // Grow player
      food.splice(index, 1); // Remove food
      food.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5,
        color: 'green'
      });
    }
  });

  // Update score
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${player.radius - 20}`, 10, 30);

  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
