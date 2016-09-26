var Deck = require('./deck');

function Game() {
    this.deck = new Deck();
    this.players = [];
    this.dealInitial();
}

// Game.initialize = function() {
//     this.deck = new Deck();
//     this.players = [];
//     this.dealInitial();
// }

Game.prototype.dealInitial = function() {
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].push(this.deck.popFromDeck());
        this.players[i].push(this.deck.popFromDeck());
    }
}

Game.prototype.getPlayers = function() {
    return this.players;
}

module.exports = Game;