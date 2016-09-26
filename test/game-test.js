var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var Game = require('../game/game.js');
var Deck = require('../game/deck.js');
var should = chai.should();
var expect = chai.expect;

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
    })
})

