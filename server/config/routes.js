var auth = require('./auth');


module.exports = function(app) {

	// routing for partials
	app.get('/partials/*', function(req, res) {
	  res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);


	app.get('*', function(req, res) {
		res.render('index');
		// res.render('index', {
		// 	mongoMessage: mongoMessage
		// });
	});

};