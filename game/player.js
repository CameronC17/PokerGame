function Player(username, wallet, hand, handValue){
  this.username = username;
  this.wallet = wallet;
  // this.stake = 0
  this.hand = [];
  this.handValue = [null, null, null, null, null, null, null, null, null, null];
}



Player.prototype.addCard = function(card){
  this.hand.push(card);
}

Player.prototype.getHand = function(){
  return this.hand;
}

Player.prototype.setHandValue = function(index, highCard){
  this.handValue[9] = 14;
}

module.exports = Player;
