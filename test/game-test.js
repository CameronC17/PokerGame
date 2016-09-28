var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var Player = require('../game/player.js');

describe('Deck', function() {
    it('should return a full deck of 52 cards', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should shuffle the deck', function(done) {
        var deck = new Deck();

        expect(deck.deck).to.have.length(52);

        done();
    });

    it('should produce all of the cards in order', function(done) {
        var deck = new Deck();

        deck.deck = deck.createDeck();

        var val = 2;
        //spades check
        for (var i = 0; i < 13; i++) {
        	expect(deck.deck[i].suit).to.equal("spade");
        	expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //clubs check
        for (var i = 13; i < 26; i++) {
            expect(deck.deck[i].suit).to.equal("club");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //hearts check
        for (var i = 26; i < 39; i++) {
            expect(deck.deck[i].suit).to.equal("heart");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }

        val = 2;
        //diamonds check
        for (var i = 39; i < 52; i++) {
            expect(deck.deck[i].suit).to.equal("diamond");
            expect(deck.deck[i].value).to.equal(val);
            val++;
        }


        done();
    });

    // This has a chance of failing 1 in 80,658,175,170,943,878,571,660,636,856,403,766,975,289,505,440,883,277,824,000,000,000,000
    it('should ensure that the deck is shuffled', function(done) {
        var deck = new Deck();
        deck.deck = deck.createDeck();

        var shuffleDeck = new Deck();

        var passed = false;

        if (JSON.stringify(deck.deck) === JSON.stringify(shuffleDeck.deck))
          passed = true;
        else
          passed = false;

        expect(passed).to.equal(false);

        done();
    });


});

describe('Game', function() {
    it('should initially deal two cards to each player', function(done) {

        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);

        console.log(players)
        game.dealPlayerCards();

        expect(players[0].getHand()).to.have.length(2);
        expect(players[1].getHand()).to.have.length(2);
        expect(players[2].getHand()).to.have.length(2);
        expect(players[3].getHand()).to.have.length(2);
        expect(players[4].getHand()).to.have.length(2);
        done();
    });

    it('should place a bet', function(done) {
        var game = new Game(new Deck());

        done();
    });

    it('should deal the flop', function(done) {
        var game = new Game(new Deck());

        game.dealTableCards(3);

        var table = game.getTableCards();
        console.log(table);

        expect(table).to.have.length(3);
        done();
    });

    it('should check for a straight flush', function(done) {
        var game = new Game();

        // Player Hand
        var playerHand = [
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 1 }
            ];

        // Straight flush using table cards
        game.tableCards = [
            { suit: 'heart', value: 3 },
            { suit: 'heart', value: 5 },
            { suit: 'heart', value: 6 },
            { suit: 'heart', value: 7 },
            { suit: 'heart', value: 4 }
        ];

        var straightCheck = game.checkStraightFlush(playerHand);

        expect(straightCheck).to.have.length(4);

        console.log(straightCheck);
        done();
    });

    it('should check for a four-of-a-kind', function(done) {
        var game = new Game();

        var playerHand = [
            { suit: 'club', value: 10 },
            { suit: 'spade', value: 10 }
            ];

        // Four-of-a-kind using two hand cards and two table cards
        game.tableCards = [
            { suit: 'heart', value: 10 },
            { suit: 'diamond', value: 10 },
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 2 },
            { suit: 'heart', value: 14 }
        ];

        var cardsToCheck = playerHand.concat(game.tableCards);

        // returns true because we have four of a kind
        var fourOfAKindCheck = game.checkMultiple(cardsToCheck, 4);

        //pass condition
        expect(fourOfAKindCheck).to.equal('10');
        done();
    });

    it('should check for a full house', function(done) {
      var game = new Game();

      var playerHand = [
          { suit: 'club', value: 10 },
          { suit: 'spade', value: 10 }
          ];

      // Four-of-a-kind using two hand cards and two table cards
      game.tableCards = [
          { suit: 'heart', value: 10 },
          { suit: 'diamond', value: 9 },
          { suit: 'club', value: 2 },
          { suit: 'spade', value: 2 },
          { suit: 'heart', value: 14 }
      ];

      var fullHouseCheck = game.checkFullHouse(playerHand);

      //pas condition
      expect(fullHouseCheck).to.equal(true);
      done();
    });

    it('should check for two pairs', function(done) {
      var game = new Game();

      var playerHand = [
          { suit: 'club', value: 11 },
          { suit: 'spade', value: 10 }
          ];

      // Four-of-a-kind using two hand cards and two table cards
      game.tableCards = [
          { suit: 'heart', value: 10 },
          { suit: 'diamond', value: 9 },
          { suit: 'club', value: 2 },
          { suit: 'spade', value: 11 },
          { suit: 'heart', value: 14 }
      ];

      var twoPairsCheck = game.checkTwoPairs(playerHand);

      //pass condition
      expect(twoPairsCheck).to.equal(true);
      done();
    });

    it('should check for a flush', function(done) {
        var players = []
        for (var i = 0; i < 5; i++){
            players.push(new Player());
        }

        var game = new Game(players);


        var playerHand = [
            { suit: 'spade', value: 5 },
            { suit: 'spade', value: 3 }
        ];

        game.tableCards = [
            { suit: 'spade', value: 7 },
            { suit: 'spade', value: 9 },
            { suit: 'spade', value: 10 },
            { suit: 'heart', value: 8 },
            { suit: 'heart', value: 3 }
        ];

        var suits = game.checkFlush(playerHand);

        expect(suits).to.equal(true);
        done()
    });

    it('should check for a straight', function(done) {
        var game = new Game();

        var playerHand = [
            { suit: 'club', value: 2 },
            { suit: 'spade', value: 3 }
        ];

      // Four-of-a-kind using two hand cards and two table cards
        game.tableCards = [
            { suit: 'heart', value: 5 },
            { suit: 'diamond', value: 7 },
            { suit: 'club', value: 6 },
            { suit: 'spade', value: 8 },
            { suit: 'heart', value: 9 }
        ];

        var straight = game.straight(playerHand);

        //pas condition
        expect(straight).to.equal(9);
        done();
    })
});
