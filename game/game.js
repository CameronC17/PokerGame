var Deck = require('./deck');
var Player = require('./player');

/*
  royal flush         100
  straight flush      90
  four of a kind      80
  full house          70
  flush               60
  straight            50
  3 of a kind         40
  two pair            30
  one pair            20
  high card           10


*/


function Game(players) {
    this.deck = new Deck();
    this.tableCards = [];
    this.players = players;
    this.pot = 0;
}

Game.prototype.startGame = function(){
  //Deal 2 cards to the players
  this.dealPlayerCards();
  //placeBet(1);
  //deal table cards
  this.dealTableCards(3);
  //placeBet(2);
  //deal turn card
  this.dealTableCards(1);
  //placeBet(3);
  //deal river card
  this.dealTableCards(1);
  //placeBet(4);
  this.checkWinners();
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
    //players[i].handValue = this.checkHand(players[i]);
    players[i].setHandValue(this.checkHand(players[i]);
  }
}

Game.prototype.checkHand = function(player) {
  var playerHand = player.getHand();
  playerHand = playerHand.concat(this.tableCards);

  this.checkRoyalFlush(){
    var indexes = [];
    for (var val = 10; val < 15; val++){
      var index = this.arrayObjectIndexOf(playerHand,  val, 'value');
      if (index !== -1){
        indexes = indexes.concat(index);
      }

    }

  };
  //this.checkStraightFlush();
  //

  //return handValue
}

Game.prototype.arrayObjectIndexOf = function(myArray, searchTerm, property) {
  var indexes = [];
    for(var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) indexes.push(i);
    }

  if (indexes.length > 0) {
    return indexes;
  } else {
    return -1;
  }

}

Game.prototype.checkSuit = functions(indexes, playerHand){
  var heart = [];
  var diamond = [];
  var spade = [];
  var club = [];

  for ( var i = 0; i < indexes.length; i++){
    
  }
}



module.exports = Game;
