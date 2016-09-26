
class Game {
    constructor(deck) {
        this.deck = deck;

        // Array of player's hands
        this.players = [ {
            player: {
                hand: [],
                stake: 0
            }
        },[],[],[],[] ];

        this.dealInitial();
    }

    dealInitial() {
        for(var i = 0; i < this.players.length; i++) {
            this.players[i].push(this.deck.popFromDeck());
            this.players[i].push(this.deck.popFromDeck());
        }
    }

    getPlayers() {
        return this.players;
    }
}

module.exports = Game;