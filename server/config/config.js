
var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://mvuser:mvuser@kahana.mongohq.com:10094/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};