var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var tables = [];


function createGame() {
    //make players
    tables.push(new Game(new Deck(), players));
}

module.exports = {
    create: createGame
}