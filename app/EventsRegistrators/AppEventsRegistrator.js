class AppEventsRegistrator {
	constructor() {
		this._events = {};
	}

	setUp(controller, serviceLocator) {
		this.register('firstStartApp', controller.firstStartApp, serviceLocator.get('firstStartApp'));
		this.register('startApp', controller.startApp, serviceLocator.get('startApp'));
	}

	register(eventName, callback, context) {
		this._events[eventName] = callback.bind(context);
	}

	deRegister(eventName) {
		delete this._events[eventName];
	}

	trigger(eventName, data) {
		if ( this._events[eventName] === undefined ) {
			return;
		}

		this._events[eventName](data);
	}
}