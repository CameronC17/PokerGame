var Game = require('../game/game.js');
var Player = require('../game/player.js');
var tables = [];
var players = [];

function joinGame(req, res) {

}

function controlGame(req, res) {
  //checks what user we are playing as
  if(req.session.user != undefined) {

  }
  res.send(200);
}

function createGame() {
  for (var i = 0; i < 5; i++){
    players.push(new Player());
  }
  tables.push(new Game(players));
}

module.exports = {
    create: createGame,
    control: controlGame
}
