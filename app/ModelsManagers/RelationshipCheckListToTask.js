/*
	Needs optimization:
	- Search by key, instead of iterating over all elements
	- Transactions
	- Problem n + 1
*/

class RelationshipCheckListToTask {
	constructor(checkListsManager, tasksManager) {
		this._checkListsManager = checkListsManager;
		this._tasksManager = tasksManager;
	}

	getAll(callback = function() {}) {
		this._checkListsManager.getAll((checkLists) => {
			this._tasksManager.getAll((tasks) => {
				for ( let task of tasks.values() ) {
					// Map object
					checkLists.get(task.getValue('listID')).getTasks().set(task.getValue('id'), task);
				}

				callback(checkLists);
			});
		});
	}

	getByID(id, callback = function() {}) {
		this._checkListsManager.getByID(id, (checkList) => {
			if ( !checkList.getValue('id') ) {
				callback(checkList);
				return;
			}

			this._tasksManager.getAll((tasks) => {
				for ( let task of tasks.values() ) {
					if ( task.getValue('listID') == id ) {
						checkList.getTasks().set(task.getValue('id'), task);
					}
				}

				callback(checkList);
			});
		});
	}

	removeByID(id, callback = function() {}) {
		this.getByID(id, (checkList) => {
			// Map object
			let length = checkList.getTasks().size;
			let count = 0;

			if ( !length ) {
				this._checkListsManager.removeByID(id, callback);
				return;
			}

			for ( let task of checkList.getTasks().values() ) {
				// Create callback
				let callbackTasks = function() {
					if ( this.count == length - 1 ) {
						// Delete the list after deleting all tasks.
						this._checkListsManager.removeByID(id, callback);
					}
				}

				// Save current loop position
				callbackTasks = callbackTasks.bind({_checkListsManager: this._checkListsManager, count: count});

				this._tasksManager.removeByID(task.getValue('id'), callbackTasks);

				count++;
			}
		});
	}
}