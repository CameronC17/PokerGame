var User = require('../models/user');



function createUser(req, res) {
	User.create(req.body, function (err, user) {
		if (err) console.log(err.message);
		console.log(req.body);
		res.sendStatus(201)
	});
};

function updateUser(req, res) {
	console.log(req.body);
	User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ runValidators: true },
		function (err, user) {
			if (err) return res.status(500).send(err);
			res.sendStatus(200);
		}
    );
}

module.exports = {
	create: createUser,
	update: updateUser
};
