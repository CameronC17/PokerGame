function Player(username, id, wallet, hand, handValue){
  this.username = username;
  this.id = id;
  this.wallet = wallet;
  // this.stake = 0
  this.hand = [];
  this.handValue = [null, null, null, null, null, null, null, null, null, null];
  this.command = null;
}

Player.prototype.getID = function() {
  return this.id;
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
