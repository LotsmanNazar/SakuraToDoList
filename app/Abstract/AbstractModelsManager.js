class AbstractModelsManager {
	constructor(database) {
		this._database = database;
		this._table = '';
		this._modelClass = null;
		this._relationships = {};
	}

	setRelationship(name, relationship) {
		this._relationships[name] = relationship;
	}

	getTable() {
		return this._table;
	}

	getByID(id, callback = function() {}) {
		if ( Number(id) ) {
			this._database.get(this._table, Number(id), (data) => {
				let model = new this._modelClass();

				// Fill the model with data, if there is no data, then return an empty model.
				if ( data ) {
					model.mapData(data);
				}

				callback(model);
			});
		} else {
			let model = new this._modelClass();
			callback(model);
		}
	}

	removeByID(id, callback = function() {}) {
		this._database.delete(this._table, Number(id), callback);
	}

	getAll(callback = function() {}) {
		this._database.get(this._table, '', (data) => {
			let modelsList = new Map();
			for ( let i = 0; i < data.length; i++ ) {
				let item = data[i];
				let model = new this._modelClass();
				model.mapData(item);
				modelsList.set(item.id, model);
			}

			callback(modelsList);
		})
	}

	save(model, callback = function() {}) {
		this._database.put(this._table, model.toDataForDB(), (id) => {
			// When saving new items, need to set the ID.
			model.setValue('id', id);
			callback(model)
		});
	}
}