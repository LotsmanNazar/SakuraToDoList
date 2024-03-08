class View {
	constructor(wrapper) {
		this._wrapper = wrapper;
		this._templates = new Templates();
	}

	// Popup
	_openPopup(popupHTML) {
		let body = document.querySelector('body');
		this._wrapper.insertAdjacentHTML('beforeend', popupHTML);

		this.triggerUpdateAnimation();

		body.classList.add('app-overflow-hidden');
		let popupWrapper = this._wrapper.querySelector('.app-popup-wrapper');
		popupWrapper.style['transition'] = '0.5s';
		popupWrapper.style['opacity'] = 1;
	}

	// To avoid sending multiple events.
	lockPopup(popupWrapper) {
		let controls = popupWrapper.querySelectorAll('.button');
		for ( let i = 0; i < controls.length; i++ ) {
			controls[i].setAttribute('disabled', 'disabled');
		}
	}

	openSettingsPopup(model, title, action, hiddenSettings) {
		let popupHTML = this._templates.getSettingsPopupTemplate(model, title, action, hiddenSettings);
		this._openPopup(popupHTML);
	}

	openRemoveConfirmPopup(model, title, action) {
		let popupHTML = this._templates.getRemoveConfirmTemplate(model, title, action);
		this._openPopup(popupHTML);
	}

	closePopup() {
		let body = document.querySelector('body');
		let popupWrapper = this._wrapper.querySelector('.app-popup-wrapper');
		body.classList.remove('app-overflow-hidden');

		this.lockPopup(popupWrapper);
		popupWrapper.style['opacity'] = 0;
		// Transition 0.5s
		setTimeout( () => {
			popupWrapper.remove();
		}, 500);
	}

	// CheckLists
	addCheckList(model) {
		let checkListHTML = this._templates.getCheckListTemplate(model);
		let listsWrapper = this._wrapper.querySelector('.app-content');
		listsWrapper.insertAdjacentHTML('beforeend', checkListHTML);

		listsWrapper.lastChild.scrollIntoView({
        behavior: 'smooth'
    });
	}

	updateCheckList(checkList) {
		let checkListView = this._wrapper.querySelector('.app-check-list[data-id="' + checkList.getValue('id') + '"]');
		let checkListHTML = this._templates.getCheckListTemplate(checkList);
		checkListView.insertAdjacentHTML('afterend', checkListHTML);
		checkListView.remove();
	}

	removeCheckList(id) {
		let modelView = this._wrapper.querySelector('.app-check-list[data-id="' + id + '"]');
		modelView.remove();
	}

	// Tasks
	addTask(model, listID) {
		let taskHTML = this._templates.getTaskTemplate(model);
		let tasksWrapper = this._wrapper.querySelector('.app-check-list[data-id="' + listID + '"] .app-tasks');
		tasksWrapper.insertAdjacentHTML('beforeend', taskHTML);
	}

	updateTask(task) {
		let taskView = this._wrapper.querySelector('.app-task[data-id="' + task.getValue('id') + '"]');
		let taskHTML = this._templates.getTaskTemplate(task);
		taskView.insertAdjacentHTML('afterend', taskHTML);
		taskView.remove();
	}

	removeTask(id) {
		let modelView = this._wrapper.querySelector('.app-task[data-id="' + id + '"]');
		modelView.remove();
	}

	// Sort Controls
	sortTasks(control, status) {
		let tasksView = this._wrapper.querySelectorAll('.app-task');
		let activeControl = this._wrapper.querySelector('.app-tasks-sort.active');
		let appContent = this._wrapper.querySelector('.app-content');
		activeControl.classList.remove('active');
		control.classList.add('active');

		this.fadeOut(appContent, 0);

		for ( let i = 0; i < tasksView.length; i++ ) {
			let taskView = tasksView[i];
			let taskStatus = taskView.getAttribute('data-status');

			if ( status && taskStatus != status ) {
				this.fadeOut(taskView, 0);
			} else {
				this.fadeIn(taskView, 0);
			}
		}

		// If the task list was empty
		this.triggerUpdateAnimation();

		this.fadeIn(appContent, 500);
	}

	// App
	createAppView(checkLists, delay) {
		let body = document.querySelector('body');
		this._wrapper.innerHTML = this._templates.getAppTemplate(checkLists);
		this.fadeOut(this._wrapper, 0);
		body.classList.add('app-sakura-todolist-loaded');
		this.triggerUpdateAnimation();
		this.fadeIn(this._wrapper, delay);
	}

	showLoader(time) {
		this._wrapper.innerHTML = this._templates.getLoaderTemplate();
		let loader = this._wrapper.querySelector('.app-loader-progress');
		this.triggerUpdateAnimation();
		loader.style['transition'] = time + 'ms';
		loader.style['width'] = '100%';
	}

	// Animations
	fadeIn(element, time) {
		element.style['transition'] = time + 'ms';
		element.style['opacity'] = 0;
		element.style['display'] = 'block';
		this.triggerUpdateAnimation();
		element.style['opacity'] = 1;
	}

	fadeOut(element, time) {
		element.style['transition'] = time + 'ms';
		element.style['opacity'] = 0;

		if ( time ) {
			setTimeout( () => {
				element.style['display'] = 'none';
			}, time);
		} else {
			element.style['display'] = 'none';
		}
	}

	triggerUpdateAnimation() {
		// Hack to start the animation
		// https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
		// this._wrapper.offsetWidth or setTimeout
		this._wrapper.offsetWidth;
	}
}