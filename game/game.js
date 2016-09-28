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
  //this.dealTableCards(3);
  //placeBet(2);
  //deal turn card
  //this.dealTableCards(1);
  //placeBet(3);
  //deal river card
  //this.dealTableCards(1);
  //placeBet(4);
  //this.checkWinners();
  //payout
}

Game.prototype.checkPlayerOnTable = function(playerID){
  for (var i = 0; i < players.length; i++) {
    if (players[i].getID == playerID) {
      return true;
    }
  }
  return false;
}

Game.prototype.dealPlayerCards = function() {
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].addCard(this.deck.popFromDeck());
        this.players[i].addCard(this.deck.popFromDeck());
    }
}

Game.prototype.dealTableCards = function(num) {
    for(var i = 0; i < num; i++) {
				console.log(this.deck.getLength());
        if (this.deck.getLength() > 5) {
            this.tableCards.push(this.deck.popFromDeck());
        }
    }
}

Game.prototype.payout = function(winners) {
      var payout = this.pot/winners.length;

    return payout
}

Game.prototype.getPlayerCards = function() {
	var playerCards = [];

	for(var i = 0; i < this.players.length; i++) {
		playerCards.push(this.players[i].getHand());
	}

	return playerCards;
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
    this.checkHand(players[i]);
  }
}

Game.prototype.checkHand = function(player) {
  var playerHand = player.getHand();
  if (checkRoyalFlush(playerHand)){
    player.setHandValue(9, 14);
  }
}

Game.prototype.sortNumber = function(a, b){
  return a.value - b.value;
}

Game.prototype.checkRoyalFlush = function(playerHand) {
	//check if hand has 5 of the same suit
	//heart, diamond, spade, club
	var suits = [[], [], [], []];
	//checks player hand
	for (var i = 0; i < 2; i++) {
		switch (playerHand[i].suit) {
			case "heart":
				suits[0].push(playerHand[i]);
				break;
			case "diamond":
				suits[1].push(playerHand[i]);
				break;
			case "spade":
				suits[2].push(playerHand[i]);
				break;
			case "club":
				suits[3].push(playerHand[i]);
				break;

		}
	}

	//checks table cards
	for (var i = 0; i < 5; i++) {
		switch (this.tableCards[i].suit) {
			case "heart":
				suits[0].push(this.tableCards[i]);
				break;
			case "diamond":
				suits[1].push(this.tableCards[i]);
				break;
			case "spade":
				suits[2].push(this.tableCards[i]);
				break;
			case "club":
				suits[3].push(this.tableCards[i]);
				break;
		}
	}

	var cardsToCheck = null;

	for (var i = 0; i < 4; i++) {
		if (suits[i].length >= 5)
			cardsToCheck = suits[i];
	}

	//if we have 5 of the same suit, we can get a royal flush
	if (cardsToCheck != null) {
		var checkStraight = [false, false, false, false, false];
		for (var i = 0; i < cardsToCheck.length; i++) {
			switch (cardsToCheck[i].value) {
				case 10:
					checkStraight[0] = true;
					break;
				case 11:
					checkStraight[1] = true;
					break;
				case 12:
					checkStraight[2] = true;
					break;
				case 13:
					checkStraight[3] = true;
					break;
				case 14:
					checkStraight[4] = true;
					break;
				default:
					break;
			}
		}

		if (checkStraight[0] == true && checkStraight[1] == true && checkStraight[2] == true && checkStraight[3] == true && checkStraight[4] == true) {
			console.log("yes");
      return true;
		} else {
			console.log("no");
      return false;
		}
	} else {
		console.log("no");
    return false;
  }
}

Game.prototype.checkStraightFlush = function(playerHand){
  var suits = [[], [], [], []];
  //checks player hand
  for (var i = 0; i < 2; i++) {
    switch (playerHand[i].suit) {
      case "heart":
        suits[0].push(playerHand[i]);
        break;
      case "diamond":
        suits[1].push(playerHand[i]);
        break;
      case "spade":
        suits[2].push(playerHand[i]);
        break;
      case "club":
        suits[3].push(playerHand[i]);
        break;

    }
  }
  //checks table cards
	for (var i = 0; i < 5; i++) {
		switch (this.tableCards[i].suit) {
			case "heart":
				suits[0].push(this.tableCards[i]);
				break;
			case "diamond":
				suits[1].push(this.tableCards[i]);
				break;
			case "spade":
				suits[2].push(this.tableCards[i]);
				break;
			case "club":
				suits[3].push(this.tableCards[i]);
				break;
		}
	}

	var cardsToCheck = null;

	for (var i = 0; i < 4; i++) {
		if (suits[i].length >= 5)
			cardsToCheck = suits[i];
	}

  cardsToCheck.sort(this.sortNumber);
	console.log(cardsToCheck[0].value);
  var straightCheck = [];

  for (var i = 0; i < cardsToCheck.length - 1; i++) {
    if ((cardsToCheck[i].value - cardsToCheck[i+1].value) == -1 && straightCheck.length <= 5){
      straightCheck.push(1);
    } else {
      straightCheck = [];
    }
  }

	return straightCheck;
}

Game.prototype.checkFlush = function(playerHand) {
	var suits = [[], [], [], []];
	for (var i = 0; i < 2; i++) {
		switch (playerHand[i].suit) {
			case "heart":
				suits[0].push(playerHand[i]);
				break;
			case "diamond":
				suits[1].push(playerHand[i]);
				break;
			case "spade":
				suits[2].push(playerHand[i]);
				break;
			case "club":
				suits[3].push(playerHand[i]);
				break;
		}
	}

	//checks table cards
	for (var i = 0; i < 5; i++) {
		switch (this.tableCards[i].suit) {
			case "heart":
				suits[0].push(this.tableCards[i]);
				break;
			case "diamond":
				suits[1].push(this.tableCards[i]);
				break;
			case "spade":
				suits[2].push(this.tableCards[i]);
				break;
			case "club":
				suits[3].push(this.tableCards[i]);
				break;
		}
	}

	for (var i = 0; i < 4; i++) {
		if (suits[i].length >= 5)
			return true;
	}
  return false;

}

Game.prototype.checkMultiple = function(cardsToCheck, num){  //applies for fours, three of a kind and doubles

  cardsToCheck.sort(this.sortNumber);
	console.log(cardsToCheck)


/* [ { suit: 'club', value: 2 },
  { suit: 'club', value: 10 },
  { suit: 'spade', value: 10 },
  { suit: 'heart', value: 10 },
  { suit: 'diamond', value: 10 },
  { suit: 'spade', value: 2 },
  { suit: 'heart', value: 14 } ] */

	var counts = {}, i, value;
	// We did not copy this
	for (i = 0; i < cardsToCheck.length; i++) {
    value = cardsToCheck[i].value;
    if (typeof counts[value] === "undefined") {
        counts[value] = 1;
    } else {
        counts[value]++;
    }
	}

	console.log("counts", counts);

	var values = Object.keys(counts).map(function(k){return counts[k]});
	console.log("suah;r");
	console.log(values[0]);

	for (var i = 0; i < values.length; i++) {
		if (values[i] == num) {
			var key = Object.keys(counts).filter(function(key) {return counts[key] === values[i]})[0];
			console.log(key)
			return key ;
		}
	}
	return false;
}

Game.prototype.checkFullHouse = function(playerHand){

  var cardsToCheck = playerHand.concat(this.tableCards);

  cardsToCheck.sort(this.sortNumber);

  var remove = this.checkMultiple(cardsToCheck, 3);
  console.log('remove',remove);


  if (remove != false){
    for(var i = 0; i < cardsToCheck.length; i++) {
      if(cardsToCheck[i].value == remove) {
          cardsToCheck.splice(i, 1);
          i--;
      }
    }

    console.log('cards left',cardsToCheck);

    remove = this.checkMultiple(cardsToCheck, 2);

    for(var i = 0; i < cardsToCheck.length; i++) {
      if(cardsToCheck[i].value == remove) {
          cardsToCheck.splice(i, 1);
          i--;
      }
    }

    console.log('cards left', cardsToCheck);

    if (cardsToCheck.length <= 2){
      return true;
    }
  }

    return false;
}

Game.prototype.straight = function(playerHand){

  var cardsToCheck = playerHand.concat(this.tableCards);

  cardsToCheck.sort(this.sortNumber);
	console.log("straight cards to check", cardsToCheck);
  var straightCheck = [];

  for (var i = 0; i < cardsToCheck.length - 1; i++) {
    if ((cardsToCheck[i].value - cardsToCheck[i+1].value) == -1){
      straightCheck.push(cardsToCheck[i].value);
    } else if(straightCheck.length != 4) {
      straightCheck = [];
    }
  }

	console.log(straightCheck);

  if (straightCheck.length == 4) {
    return straightCheck[straightCheck.length - 1] + 1;
  }
  return false;
}

Game.prototype.checkTwoPairs = function(playerHand){

  var cardsToCheck = playerHand.concat(this.tableCards);

  cardsToCheck.sort(this.sortNumber);

  var remove = this.checkMultiple(playerHand, 2);
  console.log('remove',remove);


  if (remove != false){
    for(var i = 0; i < cardsToCheck.length; i++) {
      if(cardsToCheck[i].value == remove) {
          cardsToCheck.splice(i, 1);
          i--;

      }
    }

    console.log('two pairs cards left',cardsToCheck);

    remove = this.checkMultiple(cardsToCheck, 2);

    console.log('remove 2 pairs',remove);

    for(var i = 0; i < cardsToCheck.length; i++) {
      if(cardsToCheck[i].value == remove) {
          cardsToCheck.splice(i, 1);
          i--;

      }
    }

    console.log('cards left', cardsToCheck);

    if (cardsToCheck.length <= 3){
      return true;
    }
  }

    return false;
}

module.exports = Game;
