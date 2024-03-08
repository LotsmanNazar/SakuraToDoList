class ServiceLocator {
	constructor() {
		this._servicesContext = {}
	}

	add(name, services) {
		this._servicesContext[name] = services;
	}

	get(name) {
		return this._servicesContext[name];
	}
}