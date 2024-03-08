class AbstractDatabase {
	constructor(errorsHandler) {
		this._errorsHandler = errorsHandler;

		this._databaseName = 'database';
	}

	init() {}

	createTable(tableName) {}

	add(tableName, data, callback = function() {}) {}

	get(tableName, key, callback = function() {}) {}

	delete(tableName, key, callback = function() {}) {}
}