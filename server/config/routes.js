var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


module.exports = function(app) {

	// Rest endpoint to list all Users
	app.get('/api/users', 

		// express will invoke this function
		auth.requiresRole('admin'),

		// only gets called if previous function succeeds
		function(req, res) {
			User.find({}).exec(function(err, collection) {
				res.send(collection);
			});
		}
	);

	// routing for partials
	app.get('/partials/*', function(req, res) {
	  res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function(req, res) {
		//res.render('index');
		res.render('index', {
			bootstrappedUser: req.user 
		});
	});

};