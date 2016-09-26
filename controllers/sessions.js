// The session controller creates/deletes sessions.
// A session is created by logging in with a valid username/password.

var User = require('../models/user')

// GET login form
function newSession(req, res) {
    res.render('sessions/new', { title: "Login" });
}

// POST login details to create the session
// This logs the user in
function createSession(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (user && user.password == req.body.password) {
            // Sets the session user id to equal the logged in user id.
            req.session.user = user.id;
            console.log("user logged in "+ req.body.username );
            res.redirect('/');
        } else {
            if (err) {
                console.log(err.message);
            } else {
                console.log("There's no user with those credentials!");
            }

            res.redirect('/sessions/new');
        }
    });
}

// Deletes the user's session.
// This logs the user out.
function deleteSession(req, res) {
    delete req.session.user;

    res.redirect('/sessions/new');
}

module.exports = {
    new: newSession,
    create: createSession,
    delete: deleteSession
}
