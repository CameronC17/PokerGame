var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');



router.route('/users')
  .post(usersController.create);

module.exports = router;
