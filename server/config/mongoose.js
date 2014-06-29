var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config) {

	// connection to MongoDB
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('multivision db opened');
	});

	// Create User Schema
	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String,
		salt: String,
		hashed_pwd: String
	});
	userSchema.methods = {
		authenticate: function(passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	};

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'bart');
			User.create( { firstName: 'Bart', lastName: 'Simpson', userName: 'bart', salt: salt, hashed_pwd: hash } );
			salt = createSalt();
			hash = hashPwd(salt, 'lisa');
			User.create( { firstName: 'Lisa', lastName: 'Simpson', userName: 'lisa', salt: salt, hashed_pwd: hash } );
			salt = createSalt();
			hash = hashPwd(salt, 'homer');
			User.create( { firstName: 'Homer', lastName: 'Simpson', userName: 'homer', salt: salt, hashed_pwd: hash } );
			salt = createSalt();
			hash = hashPwd(salt, 'marge');
			User.create( { firstName: 'Marge', lastName: 'Simpson', userName: 'marge', salt: salt, hashed_pwd: hash } );
		}
	});


};


function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}


function hashPwd(salt, pwd) {
	// hash message authentication code
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}

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
