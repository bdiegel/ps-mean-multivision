var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	stylus = require('stylus'),
	mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path);
}


// Express 4.x changes:
// - the 'configure' function is obsolete
// - install middleware modules separately:
//   (morgan, body-parser, stylus) 
  
//app.configure(function() {
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(morgan({ format: 'dev', immediate: true }));
// deprecated: app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(stylus.middleware(
{
  src: __dirname + '/public',
  compile: compile
}
));
app.use(express.static(__dirname + '/public'));
//});



// connection to MongoDB
if (env === "development")
	mongoose.connect('mongodb://localhost/multivision');
else
	mongoose.connect('mongodb://mvuser:mvuser@kahana.mongohq.com:10094/multivision');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('multivision db opened');
});

// define a schema 
var messageSchema = mongoose.Schema( {message: String} );
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
// retrieve a document from Mongo
Message.findOne().exec(function(err, messageDoc) {
	mongoMessage = messageDoc.message;
});

// routing for partials
app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');

