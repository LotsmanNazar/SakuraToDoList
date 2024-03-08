class AbstractModel {
	constructor() {
		this._fields = {}
	}

	getFields() {
		return this._fields;
	}

	getValue(name) {
		return this._fields[name].value;
	}

	getFieldLabel(name) {
		return this._fields[name].label;
	}

	setValue(name, value) {
		if ( this._fields[name].dataType == 'int' ) {
			value = Number(value);
		}

		this._fields[name].value = value;
	}

	mapData(data) {
		if ( data.constructor.name == 'FormData' ) {
			// From form element
			data.forEach((value, key) => {
			  this.setValue(key, value);
			});
		} else {
			// From database
			let keys = Object.keys(this._fields);
			for ( let i = 0; i < keys.length; i++ ) {
				let key = keys[i];
				this.setValue(key, data[key]);
			}
		}
	}

	toDataForDB() {
		let data = {};
		let keys = Object.keys(this._fields);
		// 	To normal object
		for ( let i = 0; i < keys.length; i++ ) {
			let key = keys[i];
			if ( this._fields[key].value === null ) {
				continue;
			}

			data[key] = this._fields[key].value;
		}

		return data;
	}
}