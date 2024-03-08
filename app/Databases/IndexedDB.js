class IndexedDB extends AbstractDatabase {
	constructor(errorsHandler) {
		super(errorsHandler);

		this._database = null;
	}

	init(onupgradeneeded, onsuccess) {
		let openIndexDB = indexedDB.open(this._databaseName);

		openIndexDB.onupgradeneeded = () => {
			this._database = openIndexDB.result;
			onupgradeneeded();
		};

		openIndexDB.onsuccess = () => {
			this._database = openIndexDB.result;
			onsuccess();
		};

		openIndexDB.onerror = () => {
			this._errorsHandler.dbError(openIndexDB.error);
		};
	}

	createTable(tableName) {
		if ( !this._database.objectStoreNames.contains(tableName) ) {
			this._database.createObjectStore(tableName, {
				keyPath: 'id',
				autoIncrement: true
			});
		} else {
			this._errorsHandler.dbError('Таблица ' + tableName + ' уже существует');
		}
	}

	put(tableName, data, callback = function() {}) {
		let transaction = this._database.transaction(tableName, 'readwrite');
		let store = transaction.objectStore(tableName);
		let request = store.put(data);

		transaction.oncomplete = (e) => {
		  callback(request.result);
		};

		transaction.onabort = () => {
			this._errorsHandler.dbError('Ошибка сохранения.');
		}
	}

	get(tableName, key, callback = function() {}) {
		let transaction = this._database.transaction(tableName, 'readonly');
		let store = transaction.objectStore(tableName);
		let request = key ? store.get(key) : store.getAll();

		transaction.oncomplete = (e) => {
		  callback(request.result);
		};

		transaction.onabort = () => {
			this._errorsHandler.dbError('Ошибка чтения.');
		}
	}

	delete(tableName, key, callback = function() {}) {
		let transaction = this._database.transaction(tableName, 'readwrite');
		let store = transaction.objectStore(tableName);
		let request = key ? store.delete(key) : store.clear();

		transaction.oncomplete = (e) => {
		  callback();
		};

		transaction.onabort = () => {
			this._errorsHandler.dbError('Ошибка удаления.');
		}
	}
}