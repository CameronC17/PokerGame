var Game = require('../game/game.js');
var Player = require('../game/player.js');
var User = require('../models/user');

var tables = [];
var playerPool = [];

function joinPool(req, res) {
  if(req.body.user != undefined) {
    //in here we can check if we are going to do singl=e player or multiplayer
    //if (req.body.gameMode == "multi") etc etc etc
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
  // console.log(req.body.bet);
  if(req.body.bet > 0){
    console.log(req.body.bet)
  }else if(req.body.call == 'true'){
    console.log('calling');
  }else if(req.body.check == 'true'){
    console.log('checking');
  }else if(req.body.fold == 'true'){
    console.log('folding');
  }
  res.sendStatus(200);
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
