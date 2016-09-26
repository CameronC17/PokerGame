var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();
var router = require('./config/routes');

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/poker');

var User = require('./models/user');

app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: 'qwerty'
}));


// load current user
app.use(function (req, res, next) {
	if (!req.session.user) {
		res.locals.user = false;
		next();
	} else {
		User.findById(req.session.user, function(err, user) {
			if (user) {
				req.user = user;
				res.locals.user = user;
			} else {
				req.session.user = null;
				delete res.locals.user;
			}
			next(err);
		});
	};
});

// // check for login on all routes except sessions
// app.use(/^\/(?!sessions|users).*/, function(req, res, next) {
//   if (!req.user) {
//     res.redirect('/sessions/new');
//   } else {
//     next();
//   }
// });


app.use('/api', router);


app.listen(port, function(){
  console.log("express app is listening on port " + port);
});
