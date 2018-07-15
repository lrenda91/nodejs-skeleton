const f = require('util').format;

const MongoClient = require('mongodb').MongoClient;
const config = require('../config').mongo;

function wrap(fn) {
	var dbConnection;
	MongoClient.connect(buildURI(config), { useNewUrlParser: true })
	.then(function(db) {
		dbConnection = db;
		console.log("Database connected!");
	})
	.then(function () {
		return fn(dbConnection.db(config.dbName));
	})
	.then(function (result) {
		if (result) {
			//console.log('Result: ' + JSON.stringify(result, null, 2));
		}
	})
	.then(function () {
		dbConnection.close();
		console.log('Database connection closed!');
	})
	.catch(function (error) {
		console.log('error ' + error);
		dbConnection.close();
	});
}

function buildURI(cfg) {
	var res = 'mongodb://';
	if (cfg.credentials) {
		res += f('%s:%s@', cfg.credentials.user, cfg.credentials.password);
	}
	res += f('%s:%d', cfg.host, cfg.port);
	if (cfg.dbName) res += f('/%s', cfg.dbName);
	console.log(res);
	return res;
}

module.exports = {
	usingConnection: wrap
};
