const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const socket = io();

// Data pemain
let players = {};
let currentPlayer = { dx: 0, dy: 0 };

// Dapatkan data pemain dari server
socket.on('updatePlayers', (data) => {
    players = data;
});

// Input kontrol
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') currentPlayer.dy = -5;
    if (e.key === 'ArrowDown') currentPlayer.dy = 5;
    if (e.key === 'ArrowLeft') currentPlayer.dx = -5;
    if (e.key === 'ArrowRight') currentPlayer.dx = 5;
});

window.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) currentPlayer.dy = 0;
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) currentPlayer.dx = 0;
});

// Kirim posisi baru ke server
function sendMovement() {
    socket.emit('move', currentPlayer);
}

// Render pemain di canvas
function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const id in players) {
        const player = players[id];
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Game loop
function gameLoop() {
    sendMovement();
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

gameLoop();
