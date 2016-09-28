var Game = require('../game/game.js');
var Player = require('../game/player.js');
var tables = [];

function joinGame(req, res) {

}

function controlGame(req, res) {
  //checks what user we are playing as
  if(req.session.user != undefined) {

  }
  res.send(200);
}

function createGame(req, res) {
  var players = [];

  for (var i = 0; i < 5; i++){
    players.push(new Player());
  }
  tables.push(new Game(players));

  var game = tables[tables.length - 1];

  game.startGame();
  var playerCards = game.getPlayerCards();

  req.session.gameId = tables[tables.length - 1];
  res.json(playerCards);
}



module.exports = {
    create: createGame,
    control: controlGame
}
