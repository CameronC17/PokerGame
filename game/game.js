var Deck = require('./deck');

function Game() {
    this.deck = new Deck();
    this.tableCards = [];
    this.players = [[],[],[],[],[]];
    this.dealInitial();
}

Game.prototype.dealInitial = function() {
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].push(this.deck.popFromDeck());
        this.players[i].push(this.deck.popFromDeck());
    }
}

Game.prototype.dealTableCards = function(num) {
    for(var i = 0; i < num; i++) {
        if (this.tableCards.length < 5) {
            this.tableCards.push(this.deck.popFromDeck());
        }
    }
}

Game.prototype.payout = function(winners) {
    for(var i = 0; i < winners.length; i++) {
        
    }
}

Game.prototype.getTableCards = function() {
    return this.tableCards;
}

Game.prototype.getPlayers = function() {
    return this.players;
}

module.exports = Game;