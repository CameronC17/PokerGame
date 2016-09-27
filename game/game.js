var Deck = require('./deck');
var Player = require('./player');


function Game(players) {
    this.deck = new Deck();
    this.tableCards = [];
    this.players = players;
    this.pot = 0;
    this.startGame();
}

Game.prototype.startGame = function(){
  //Deal 2 cards to the players
  this.dealPlayerCards();
  //placeBet(1);
  //deal table cards
  // this.dealTableCards(3);
  //placeBet(2);
  //deal turn card
  // this.dealTableCards(1);
  //placeBet(3);
  //deal river card
  // this.dealTableCards(1);
  //placeBet(4);
  //reveal
  // this.reveal();
  check winner(check)
  //payout
}

Game.prototype.dealPlayerCards = function() {
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].addCard(this.deck.popFromDeck());
        this.players[i].addCard(this.deck.popFromDeck());
    }
}

Game.prototype.dealTableCards = function(num) {
    for(var i = 0; i < num; i++) {
        if (tableCards.length > 5) {
            this.tableCards.push(this.deck.popFromDeck());
        }
    }
}

Game.prototype.payout = function(winners) {
      var payout = this.pot/winners.length;

    return payout
}

Game.prototype.getTableCards = function() {
    return this.tableCards;
}

Game.prototype.getPlayers = function() {
    return this.players;
}

Game.prototype.checkWinners = function() {
  for (var i = 0; i < players.length; i++) {
    this.checkHand(players[i]);
  }
}

Game.prototype.checkHand = function(player) {

  //return handValue
}



module.exports = Game;
