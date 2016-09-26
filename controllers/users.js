var User = require('../models/user');


function createUser(req, res){
  User.create(req.body, function(err, user){
    if (err) console.log(err.message);
    console.log(req.body);
    res.status(200).redirect('/api');
  });
};

module.exports = {
  create: createUser
};
