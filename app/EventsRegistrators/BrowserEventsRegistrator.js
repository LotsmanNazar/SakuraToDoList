class BrowserEventsRegistrator {
	constructor() {
		// Save callbacks to delete later
		this._callbacks = {};
	}

	_checkElement(data, element, name, e) {
		if ( data.compare(element, name, e) ) {
			for ( let c = 0; c < data.callbacks.length; c++ ) {
				let callback = data.callbacks[c].callback;
				let context = Object.assign({}, data.callbacks[c].context);
				context.element = element;

				let callbackContext = callback.bind(context);
				callbackContext(e);
			}
		}
	}

	_init() {
		// Register all required event types.
		let types = Object.keys(this._callbacks);
		for ( let i = 0; i < types.length; i++ ) {
			document.addEventListener(types[i], (e) => {
				let type = e.type;
				let elementsNames = Object.keys(this._callbacks[type]);

				for ( let n = 0; n < elementsNames.length; n++ ) {
					let element = e.target;
					let name = elementsNames[n];

					if ( !this._callbacks[type][name].propagation ) {
						this._checkElement(this._callbacks[type][name], element, name, e);
						continue;
					}

					while (element.parentElement) {
						this._checkElement(this._callbacks[type][name], element, name, e);
						element = element.parentElement;
					}
				}
			});
		}
	}

	setUp(controller, serviceLocator) {
		// CheckLists
		this.registerByClass('app-add-checklist', 'click', controller.checkListEditClick, serviceLocator.get('editCheckList'));
		this.registerByClass('app-edit-checklist', 'click', controller.checkListEditClick, serviceLocator.get('editCheckList'));
		this.registerByClass('app-remove-checklist', 'click', controller.checkListRemoveClick, serviceLocator.get('removeCheckList'));
		this.registerByClass('app-edit-checklist-popup', 'submit', controller.saveCheckList, serviceLocator.get('editCheckList'));
		this.registerByClass('app-remove-checklist-popup', 'submit', controller.removeCheckList, serviceLocator.get('editCheckList'));

		// Tasks
		this.registerByClass('app-add-task', 'click', controller.taskEditClick, serviceLocator.get('editTask'));
		this.registerByClass('app-edit-task', 'click', controller.taskEditClick, serviceLocator.get('editTask'));
		this.registerByClass('app-remove-task', 'click', controller.taskRemoveClick, serviceLocator.get('removeTask'));
		this.registerByClass('app-edit-task-popup', 'submit', controller.saveTask, serviceLocator.get('editTask'));
		this.registerByClass('app-remove-task-popup', 'submit', controller.removeTask, serviceLocator.get('removeTask'));
		this.registerByClass('app-task-check', 'change', controller.checkTask, serviceLocator.get('editTask'));

		// Popup
		this.registerByClass('app-close-popup', 'click', controller.closePopupClick, serviceLocator.get('closePopup'));
		this.registerByClass('app-popup-wrapper', 'click', controller.closePopupClick, serviceLocator.get('closePopup'), false);

		// Sort Controls
		this.registerByClass('app-tasks-sort', 'click', controller.sortTasks, serviceLocator.get('sortTasks'));

		this._init();
	}

	/*
		className - css class
		type - event type (click, submit adn etc)
		data - context with the necessary services
		propagation - stop at the current element or continue searching
	*/
	registerByClass(className, type, callback, data = {}, propagation = true) {
		if ( this._callbacks[type] === undefined ) {
			this._callbacks[type] = {};
		}

		if ( this._callbacks[type][className] === undefined ) {
			this._callbacks[type][className] = {
				propagation: propagation,
				callbacks: [],
				// Different ways of registering an event may require different conditions.
				compare: function(element, name, e) {
					return element.classList.contains(name);
				}
			};
		}

		this._callbacks[type][className].callbacks.push({
			callback: callback,
			context: data
		});
	}

	deRegisterByClass(className, type) {
		delete this._callbacks[type][className];
	}
}