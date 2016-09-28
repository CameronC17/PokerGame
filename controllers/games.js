var Game = require('../game/game.js');
var Player = require('../game/player.js');
var tables = [];
var User = require('../models/user')
function joinGame(req, res) {

}

function controlGame(req, res) {
  //checks what user we are playing as
  // console.log(req.body.user);
  if(req.body.user != undefined) {

  } else {
    console.log("User not logged in!");
    res.sendStatus(403);
  }

}

function getUserCredentials(userID){
  var credentials = [];
  User.findOne({ _id: userID }, function(err, user) {
    if (user) {
        // Sets the session user id to equal the logged in user id.
        console.log(user.username);
        res.sendStatus(200);
    } else {
        if (err) {
            console.log(err.message);
        } else {
            console.log("There's no user with those credentials!");
        }
        res.sendStatus(400);
    }
});

}


function createGame(req, res) {
  var players = [];

  // for (var i = 0; i < 5; i++){
  //   players.push(new Player());
  // }
  // function Player(username, id, wallet, hand, handValue)
  players.push(new Player())
  tables.push(new Game(players));

  var game = tables[tables.length - 1];

  game.startGame();
  var playerCards = game.getPlayerCards();

  req.session.gameId = tables[tables.length - 1];
  res.json(playerCards);
}



module.exports = {
    create: createGame,
    control: controlGame
}
