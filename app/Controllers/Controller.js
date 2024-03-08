class Controller {
	// CheckLists
	checkListEditClick(e) {
		let checkListID = this.element.getAttribute('data-id');
		this.checkListsManager.getByID(checkListID, (checkListModel) => {
			this.view.openSettingsPopup(checkListModel, 'Редактирование списка задач', 'edit-checklist');
		});
	}

	checkListRemoveClick(e) {
		let checkListID = this.element.getAttribute('data-id');
		this.checkListsManager.getByID(checkListID, (checkListModel) => {
			this.view.openRemoveConfirmPopup(checkListModel, 'Удаление списка задач', 'remove-checklist');
		});
	}

	saveCheckList(e) {
		e.preventDefault();

		let checkListID = this.element.getAttribute('data-id');

		let taskID = this.element.getAttribute('data-id');
		let formData = this.helper.validateCheckListData(new FormData(this.element));
		if ( !formData ) {
			this.errorsHandler.emptyFields();
			return;
		}

		this.checkListsManager.getByIDWithTasks(checkListID, (checkListModel) => {
			checkListModel.mapData(formData);

			this.checkListsManager.save(checkListModel, (checkListModel) => {
				if ( Number(checkListID) ) {
					this.view.updateCheckList(checkListModel)
				} else {
					this.view.addCheckList(checkListModel);
				}

				this.view.closePopup();
			});
		});
	}

	removeCheckList(e) {
		e.preventDefault();

		let checkListID = this.element.getAttribute('data-id');
		this.checkListsManager.removeByIDWithTasks(checkListID, () => {
			this.view.removeCheckList(checkListID);
			this.view.closePopup();
		});
	}

	// Tasks
	taskEditClick(e) {
		let taskID = this.element.getAttribute('data-id');
		let listID = this.element.getAttribute('data-list-id');
		// Pass the id of the list to which the task will be added.
		let hiddenSettings = !taskID ? [{name: 'listID', value: listID}] : [];

		this.tasksManager.getByID(taskID, (taskModel) => {
			this.view.openSettingsPopup(taskModel, 'Редактирование задачи', 'edit-task', hiddenSettings);
		});
	}

	taskRemoveClick(e) {
		let taskID = this.element.getAttribute('data-id');
		this.tasksManager.getByID(taskID, (taskModel) => {
			this.view.openRemoveConfirmPopup(taskModel, 'Удаление задачи', 'remove-task');
		});
	}

	saveTask(e) {
		e.preventDefault();

		let taskID = this.element.getAttribute('data-id');
		let formData = this.helper.validateTaskData(new FormData(this.element));
		if ( !formData ) {
			this.errorsHandler.emptyFields();
			return;
		}

		this.tasksManager.getByID(taskID, (taskModel) => {
			taskModel.mapData(formData);

			this.tasksManager.save(taskModel, (taskModel) => {
				if ( Number(taskID) ) {
					this.view.updateTask(taskModel);
				} else {
					this.view.addTask(taskModel, taskModel.getValue('listID'));
				}

				this.view.closePopup();
			});
		});
	}

	removeTask(e) {
		e.preventDefault();

		let taskID = this.element.getAttribute('data-id');
		this.tasksManager.removeByID(taskID, () => {
			this.view.removeTask(taskID);
			this.view.closePopup();
		});
	}

	checkTask(e) {
		let taskID = this.element.getAttribute('data-id');

		this.tasksManager.getByID(taskID, (taskModel) => {
			if ( this.element.checked ) {
				taskModel.setValue('status', 1);
			} else {
				taskModel.setValue('status', 0);
			}

			this.tasksManager.save(taskModel, (taskModel) => {
				this.view.updateTask(taskModel);
			});
		});
	}

	// Popup
	closePopupClick(e) {
		this.view.closePopup();
	}

	// Sort Controls
	sortTasks(e) {
		let status = this.element.getAttribute('data-status');
		this.view.sortTasks(this.element, status);
	}

	// App
	firstStartApp() {
		this.database.createTable('tasks');
		this.database.createTable('checkLists');
	}

	startApp() {
		this.checkListsManager.getAllWithTasks((checkLists) => {
			// Fake load
			let delay = 1700;
			this.view.showLoader(delay);
			setTimeout(() => {
				this.view.createAppView(checkLists, delay / 2);
			}, delay);
		});
	}
}