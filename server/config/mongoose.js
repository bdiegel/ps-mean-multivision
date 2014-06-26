var mongoose = require('mongoose');

module.exports = function(config) {

	// connection to MongoDB
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('multivision db opened');
	});

};


// // define a schema 
// var messageSchema = mongoose.Schema( {message: String} );
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;
// // retrieve a document from Mongo
// Message.findOne().exec(function(err, messageDoc) {
// 	mongoMessage = messageDoc.message;
// });

// we outgrew this simple routing ...
//app.get('/partials/:partialPath', function(req, res) {
//	res.render('partials/' + req.params.partialPath);
