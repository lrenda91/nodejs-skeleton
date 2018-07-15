const dbManager = require('./dbManager.js');

function find(filter) {
	dbManager.usingConnection(function (dbConnection) {
		return dbConnection.collection('test').find(filter).toArray();
	});
}

module.exports = {
	find: find
};
