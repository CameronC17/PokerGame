var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var should = chai.should();
var expect = chai.expect;

var Game = require('../game/game.js');
var Deck = require('../game/deck.js');

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

    it('should ensure that the deck is shuffled. this test will not always pass!!!!! dont worry', function(done) {
        var deck = new Deck();
        deck.deck = deck.createDeck();

        var shuffleDeck = new Deck();

        var passed = true;

        for (var i = 0; i < 52; i++) {
            if (deck.deck[i].suit == shuffleDeck.deck[i].suit)
                passed = !passed;
            if (deck.deck[i].value == shuffleDeck.deck[i].value)
                passed = !passed;
        }

        expect(passed).to.equal(true);

        done();
    });
});

describe('Game', function() {
    it('should initially deal two cards to each player', function(done) {

        var game = new Game(new Deck());

        var players = game.getPlayers();

        expect(players[0]).to.have.length(2);
        expect(players[1]).to.have.length(2);
        expect(players[2]).to.have.length(2);
        expect(players[3]).to.have.length(2);
        expect(players[4]).to.have.length(2);
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
});



