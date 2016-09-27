var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var Player = require('../game/player.js');
var tables = [];
var players = [];

function createGame() {
  for (var i = 0; i < 5; i++){
    players.push(new Player());
  }
    tables.push(new Game(new Deck(), players));
}

module.exports = {
    create: createGame
}
