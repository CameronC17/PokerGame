var User = require('../models/user');


function createUser(req, res){
  User.create(req.body, function(err, user){
    if (err) console.log(err.message);
    console.log(req.body);
    res.sendStatus(200)
  });
};

module.exports = {
  create: createUser
};
