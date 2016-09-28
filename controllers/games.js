var Game = require('../game/game.js');
var Player = require('../game/player.js');
var User = require('../models/user');

var tables = [];
var playerPool = [];

function joinPool(req, res) {
  if(req.body.user != undefined) {
    getUserCredentials(req.body.user, addUserToPool, req, res);
  } else {
    res.send(403);
  }
}
//function Player(username, id, wallet, hand, handValue){

function addUserToPool(userinfo, req, res) {
  playerPool.push(userinfo);
  //here we can tell the user to wait for a game
  //but for now were gonna start a game, this is all fake data

  var players = [new Player(playerPool[0].username, playerPool[0].id, 10000, null, null), new Player(),  new Player(), new Player(), new Player()];

  tables.push(new Game(players));

  var game = tables[tables.length - 1];

  game.startGame();
  var playerCards = game.getPlayerCards();

  req.session.gameId = tables[tables.length - 1];
  res.json(playerCards);
}

function controlGame(req, res) {
  //checks what user we are playing as
  console.log(req.body.user);
  if(req.body.user != undefined) {
    var userInfo = getUserCredentials(req.body.user);
    //console.log(userInfo);
    if (userInfo) {
      //console.log(userInfo);
      res.sendStatus(200);
    } else {
      console.log("There's no user with those credentials!!!!!!!!");
      res.sendStatus(403);
    }
  } else {
    console.log("User not logged in!");
    res.sendStatus(403);
  }

}

function getUserCredentials(userID, callback, req, res){
  User.findOne({ _id: userID }, function(err, user) {
    if (user) {
        // Sets the session user id to equal the logged in user id.
        callback(user, req, res);
    } else {
        if (err) {
            console.log(err.message);
        } else {
            console.log("There's no user with those credentials!????????");
        }
        res.send(403);
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
    join: joinPool,
    control: controlGame
}
