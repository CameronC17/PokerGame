var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var sessionController = require('../controllers/sessions');

// Session routes
router.route('/users/login')
      .post(sessionController.create)
      .delete(sessionController.delete);

router.route('/sessions/new')
      .get(sessionController.new);

router.route('/users')
  .post(usersController.create);

module.exports = router;
