const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Inisialisasi aplikasi
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require('cors');
app.use(cors());


// Routing ke file HTML client
app.use(express.static('public'));

// Array untuk menyimpan pemain
let players = {};

// Ketika client terhubung
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Tambahkan pemain baru
    players[socket.id] = {
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 20,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    };

    // Kirim data pemain ke semua client
    io.emit('updatePlayers', players);

    // Perbarui posisi pemain
    socket.on('move', (data) => {
        if (players[socket.id]) {
            players[socket.id].x += data.dx;
            players[socket.id].y += data.dy;
            io.emit('updatePlayers', players);
        }
    });

    // Ketika pemain disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete players[socket.id];
        io.emit('updatePlayers', players);
    });
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        socket.on('move', (data) => {
            console.log(`Player ${socket.id} moved:`, data);
        });
        socket.on('updatePlayers', (players) => {
    console.log(players); // Debugging
    // Update posisi pemain di layar
});


    });

// Jalankan server
const socket = io('https://pie-sunset-wedge.glitch.me/game.html'); // URL server Glitch
;
});
