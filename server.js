const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [];
let games = {};  // Stores games and players associated with each game ID

const quotes = [
  { quote: "I am a god.", author: "Kanye" },
  { quote: "The future belongs to the people who prepare for it today.", author: "Hitler" },
  // Add your 250 quotes here
];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinGame', (playerName) => {
    const gameId = generateGameId();
    players.push({ id: socket.id, name: playerName, score: 0, gameId });
    games[gameId] = { players: players.filter(p => p.gameId === gameId) };
    io.emit('gameJoined', games[gameId].players);
    socket.emit('gameCreated', gameId);
  });

  socket.on('joinGameByLink', (gameId) => {
    if (games[gameId] && games[gameId].players.length < 10) {
      players.push({ id: socket.id, name: `Player ${socket.id}`, score: 0, gameId });
      games[gameId].players.push({ id: socket.id, name: `Player ${socket.id}`, score: 0 });
      io.emit('gameJoined', games[gameId].players);
    } else {
      socket.emit('error', 'Game not found or full');
    }
  });

  socket.on('startGame', (gameId) => {
    const game = games[gameId];
    if (game && game.players.length > 1) {
      io.emit('startGame');
      startRound(gameId);
    }
  });

  socket.on('startRound', (gameId) => {
    const game = games[gameId];
    const quoteObj = getRandomQuote();
    io.emit('newRound', quoteObj.quote, ["Kanye", "Hitler"]);
  });

  socket.on('updateTimer', (timeLeft) => {
    io.emit('updateTimer', timeLeft);
  });

  socket.on('roundEnd', (gameId) => {
    const game = games[gameId];
    // Update scores based on answers here
    io.emit('roundEnd', game.players);
    startRound(gameId);
  });

  socket.on('nextRound', (gameId) => {
    startRound(gameId);
  });
});

function startRound(gameId) {
  const game = games[gameId];
  io.emit('startRound');
}

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function generateGameId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
