/*
	Needs optimization:
	- Search by key, instead of iterating over all elements
	- Transactions
	- Problem n + 1
*/

class RelationshipTaskToCheckList {
	constructor(checkListsManager, tasksManager) {
		this._checkListsManager = checkListsManager;
		this._tasksManager = tasksManager;
	}

	getAll(callback = function() {}) {
		this._tasksManager.getAll((tasks) => {
			// Map object
			let length = tasks.size;
			let count = 0;
			for ( let task of tasks.values() ) {
				// Create callback
				let callbackTasks = function(checkList) {
					this.task.setCheckList(checkList);

					if ( this.count == length - 1 ) {
						callback(tasks);
					}
				}

				// Save current loop position
				callbackTasks = callbackTasks.bind({task: task, count: count});

				this._checkListsManager.getByID(task.getValue('listID'), callbackTasks);

				count++;
			}
		});
	}

	getByID(id, callback = function() {}) {
		this._tasksManager.getByID(id, (task) => {
			if ( !task.getValue('id') ) {
				callback(task);
				return;
			}

			this._checkListsManager.getByID(task.getValue('listID'), (checkList) => {
				task.setCheckList(checkList);
				callback(task);
			});
		});
	}
}