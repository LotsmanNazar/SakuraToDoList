class CheckListsManager extends AbstractModelsManager {
	constructor(database) {
		super(database);

		this._table = 'checkLists';
		this._modelClass = CheckListModel;
	}

	getAllWithTasks(callback) {
		this._relationships.tasks.getAll(callback);
	}

	getByIDWithTasks(id, callback) {
		this._relationships.tasks.getByID(id, callback);
	}

	removeByIDWithTasks(id, callback) {
		this._relationships.tasks.removeByID(id, callback);
	}
}