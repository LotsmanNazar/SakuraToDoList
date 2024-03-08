class TasksManager extends AbstractModelsManager {
	constructor(database) {
		super(database);

		this._table = 'tasks';
		this._modelClass = TaskModel;
	}

	getAllWithCheckList(callback) {
		this._relationships.checkList.getAll(callback);
	}

	getByIDWithCheckList(id, callback) {
		this._relationships.checkList.getByID(id, callback);
	}
}