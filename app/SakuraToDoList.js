class SakuraToDoList {
	constructor(wrapper) {
		this._wrapper = wrapper;

		// Creating application components
		this._helper = new Helper();
		this._errorsHandler = new ErrorsHandler();

		this._view = new View(this._wrapper);
		this._controller = new Controller();
		
		this._database = new IndexedDB(this._errorsHandler);
		this._tasksManager = new TasksManager(this._database);
		this._checkListsManager = new CheckListsManager(this._database);

		this._browserEventsRegistrator = new BrowserEventsRegistrator();
		this._appEventsRegistrator = new AppEventsRegistrator();
		this._serviceLocator = new ServiceLocator();
	}

	init() {
		let relationshipCheckListToTask = new RelationshipCheckListToTask(this._checkListsManager, this._tasksManager);
		let relationshipTaskToCheckList = new RelationshipTaskToCheckList(this._checkListsManager, this._tasksManager);
		this._checkListsManager.setRelationship('tasks', relationshipCheckListToTask);
		this._tasksManager.setRelationship('checkList', relationshipTaskToCheckList);

		// Set context for controller methods, methods only know what it needs.
			this._serviceLocator.add('editCheckList', {
				view: this._view,
				checkListsManager: this._checkListsManager,
				helper: this._helper,
				errorsHandler: this._errorsHandler
			});

			this._serviceLocator.add('removeCheckList', {
				view: this._view,
				checkListsManager: this._checkListsManager
			});

			this._serviceLocator.add('editTask', {
				view: this._view,
				tasksManager: this._tasksManager,
				helper: this._helper,
				errorsHandler: this._errorsHandler
			});

			this._serviceLocator.add('removeTask', {
				view: this._view,
				tasksManager: this._tasksManager
			});

			this._serviceLocator.add('closePopup', {
				view: this._view
			});

			this._serviceLocator.add('sortTasks', {
				view: this._view
			})

			this._serviceLocator.add('firstStartApp', {
				database: this._database
			});

			this._serviceLocator.add('startApp', {
				view: this._view,
				checkListsManager: this._checkListsManager
			});

		// Register events
			this._browserEventsRegistrator.setUp(this._controller, this._serviceLocator);
			this._appEventsRegistrator.setUp(this._controller, this._serviceLocator);

		// Launch the application when the database has loaded
			this._database.init(
				() => {
					// Create tables
					this._appEventsRegistrator.trigger('firstStartApp');
				},

				() => {
					// Display data
					this._appEventsRegistrator.trigger('startApp');
				}
			);
	}
}