const socket = io();
let playerName = '';
let currentRoundTimer = 10;
let gameId = '';  // Store the game ID

document.getElementById('joinButton').addEventListener('click', () => {
  playerName = prompt("Enter your player name:");
  socket.emit('joinGame', playerName);
  document.getElementById('joinButton').disabled = true;
});

document.getElementById('startButton').addEventListener('click', () => {
  socket.emit('startGame', gameId);  // Pass the current gameId to start the game
});

document.getElementById('joinByLink').addEventListener('click', () => {
  const link = document.getElementById('gameLinkInput').value;
  socket.emit('joinGameByLink', link);
});

document.getElementById('nextRoundButton').addEventListener('click', () => {
  socket.emit('nextRound');
});

socket.on('gameJoined', (players) => {
  document.getElementById('lobby').style.display = 'block';
  document.getElementById('playerCount').textContent = players.length;
  updateLeaderboard(players);
});

socket.on('startGame', () => {
  document.getElementById('lobby').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  startRound();
});

socket.on('updateLeaderboard', (players) => {
  updateLeaderboard(players);
});

socket.on('newRound', (quote, answers) => {
  document.getElementById('quote').textContent = quote;
  const answerButtons = answers.map((answer, index) => 
    `<button class="answer" data-answer="${index}">${answer}</button>`
  ).join('');
  document.getElementById('answerButtons').innerHTML = answerButtons;
  startRoundTimer();
});

socket.on('updateTimer', (timeLeft) => {
  document.getElementById('timer').textContent = timeLeft;
});

socket.on('roundEnd', (players) => {
  updateLeaderboard(players);
  document.getElementById('nextRoundButton').style.display = 'inline-block';
});

socket.on('gameCreated', (newGameId) => {
  gameId = newGameId;
  document.getElementById('startButton').classList.remove('hidden');
  alert(`Game created! Share this link: /${newGameId}`);
});

function updateLeaderboard(players) {
  const playerList = document.getElementById('playerList');
  playerList.innerHTML = '';
  players.forEach(player => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.name} (${player.score} points)`;
    playerList.appendChild(listItem);
  });
}

function startRound() {
  document.getElementById('nextRoundButton').style.display = 'none';
  socket.emit('startRound');
}

function startRoundTimer() {
  let timer = currentRoundTimer;
  const timerInterval = setInterval(() => {
    if (timer > 0) {
      socket.emit('updateTimer', timer - 1);
      timer--;
    } else {
      clearInterval(timerInterval);
      socket.emit('roundEnd');
    }
  }, 1000);
}
