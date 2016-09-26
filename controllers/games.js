var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var tables = [];


function createGame() {
    tables.push(new Game(new Deck()));
}

module.exports = {
    create: createGame
}