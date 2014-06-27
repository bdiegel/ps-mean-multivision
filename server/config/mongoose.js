var mongoose = require('mongoose');

module.exports = function(config) {

	// connection to MongoDB
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('multivision db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			User.create( { firstName: 'Bart', lasName: 'Simpson', userName: 'bart'});
			User.create( { firstName: 'Lisa', lasName: 'Simpson', userName: 'lisa'});
			User.create( { firstName: 'Homer', lasName: 'Simpson', userName: 'homer'});
			User.create( { firstName: 'Marge', lasName: 'Simpson', userName: 'marge'});
		}
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
