<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kanye vs Hitler Game</title>
  <style>
    body { font-family: Arial, sans-serif; }
    #lobby, #game { display: none; }
    #leaderboard { margin-bottom: 20px; }
    #leaderboard ul { list-style: none; padding: 0; }
    #leaderboard li { margin: 5px 0; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <h1>Kanye vs Hitler Game</h1>
  
  <div id="lobby">
    <h2>Lobby</h2>
    <p>Players: <span id="playerCount">0</span>/10</p>
    <button id="joinButton">Join Game</button>
    <div id="createGame">
      <button id="startButton" class="hidden">Start Game</button>
      <p>Or enter the 6-digit game link:</p>
      <input type="text" id="gameLinkInput" placeholder="Enter 6-digit game link" />
      <button id="joinByLink">Join Game</button>
    </div>
    <div id="leaderboard">
      <h3>Leaderboard</h3>
      <ul id="playerList"></ul>
    </div>
  </div>

  <div id="game">
    <h2>Game Started!</h2>
    <p>Time remaining: <span id="timer">10</span> seconds</p>
    <p id="quote"></p>
    <p id="answerButtons"></p>
    <button id="nextRoundButton" class="hidden">Next Round</button>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script src="script.js"></script>
</body>
</html>
