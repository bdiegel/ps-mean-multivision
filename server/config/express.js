var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	stylus = require('stylus');

module.exports = function(app, config) {
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}


	// Express 4.x changes:
	// - the 'configure' function is obsolete
	// - install middleware modules separately:
	//   (morgan, body-parser, stylus) 
	  
	//app.configure(function() {
	
	//app.set('views', __dirname + '/server/views');
	app.set('views', config.rootPath + '/server/views');

	app.set('view engine', 'jade');
	app.use(morgan({ format: 'dev', immediate: true }));
	// cookie-parser needed for passport
	app.use(cookieParser(''));
	// deprecated: app.use(bodyParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	// session needed for passport
	app.use(session({secret: 'multi vision unicorns'}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware(
	{
	  //src: __dirname + '/public',
	  src: config.rootPath + '/public',
	  compile: compile
	}
	));
	//app.use(express.static(__dirname + '/public'));
	app.use(express.static(config.rootPath + '/public'));
	//});
};