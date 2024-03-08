class Templates {
	constructor() {
		this._templates = {
			loader:
				`<div class="app-loader-wrapper">
					<div class="app-loader-content">
						<h1 class="app-name">Sakura - Планировщик задач</h1>
						<span class="app-loader">
							<span class="app-loader-progress"></span>
						</span>
					</div>
				</div>`,

			app:
				`<div class="app-header">
					<div class="app-controls-wrapper">
						<ul class="app-controls app-sort-controls">
							<li class="app-control app-sort-control"><button type="button" class="button app-tasks-sort active" data-status="">Все задачи</button></li>
							<li class="app-control app-sort-control"><button type="button" class="button app-tasks-sort" data-status="0">Аактивные</button></li>
							<li class="app-control app-sort-control"><button type="button" class="button app-tasks-sort" data-status="1">Выполненые</button></li>
						</ul>

						<ul class="app-controls app-main-controls">
							<li class="app-control"><button type="button" class="button button-accent app-add-checklist">Добавить чек-лист</button></li>
						</ul>
					</div>
				</div>
				<div class="app-body">
					<div class="app-content"></div>
				</div>
				<div class="app-footer">
					<ul class="app-controls app-main-controls">
						<li class="app-control"><button type="button" class="button button-accent app-add-checklist">Добавить чек-лист</button></li>
					</ul>
				</div>`,

			checkList:
				`<div class="app-check-list">
					<div class="app-cl-header">
						<ul class="app-controls app-cl-controls">
							<li class="app-control app-cl-control">
								<button type="button" title="Редактировать" class="button app-edit-checklist">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-license="https://fontawesome.com/license/free">
										<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
									</svg>
									<span>Ред.</span>
								</button>
							</li>
							<li class="app-control app-cl-control">
								<button type="button" title="Удалить" class="button app-remove-checklist app-remove-control">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-license="https://fontawesome.com/license/free">
										<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
									</svg>
									<span>Удалить</span>
								</button>
							</li>
						</ul>
						<div class="app-cl-title-wrapper">
							<h2 class="app-cl-title" data-field="title"></h2>
						</div>
					</div>

					<div class="app-tasks"></div>

					<div class="app-cl-footer">
						<ul class="app-controls app-cl-tasks-controls">
							<li class="app-control"><button type="button" class="button button-accent app-add-task">Добавить задание</button></li>
						</ul>
					</div>
				</div>`,

			task:
				`<div class="app-task">
					<div class="app-task-content-wrapper"> 
						<div class="app-task-content">
							<h3 class="app-task-title" data-field="title"></h3>
							<p class="app-task-description" data-field="description"></p>
							<div class="app-task-check-wrapper">
								<label>
									<input type="checkbox" class="app-task-check" value="">
									<span class="app-status-label"></span>
								</label>
							</div>
						</div>
						<div class="app-task-controls">
							<ul class="app-controls app-task-controls">
								<li class="app-control app-task-control">
									<button type="button" title="Редактировать" class="button app-edit-task">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-license="https://fontawesome.com/license/free">
											<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
										</svg>
										<span>Ред.</span>
									</button>
								</li>
								<li class="app-control app-task-control">
									<button type="button" title="Удалить" class="button app-remove-task app-remove-control">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-license="https://fontawesome.com/license/free">
											<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
										</svg>
										<span>Удалить</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>`,

			textSetting:
				`<div class="app-setting-field" data-type="text">
					<label>
						<span class="app-setting-label"></span>
						<input data-field="name" type="text" data-value="attr" value="">
					</label>
				</div>`,

			hiddenSetting:
				`<input type="hidden" value="">`,

			textareaSetting:
				`<div class="app-setting-field" data-type="textarea">
					<label>
						<span class="app-setting-label"></span>
						<textarea data-field="name" data-value="content" rows="5"></textarea>
					</label>
				</div>`,

			checkboxSetting:
				`<div class="app-setting-field" data-type="checkbox">
					<label>
						<input data-field="name" type="checkbox" data-value="attr">
						<span class="app-setting-label"></span>
					</label>
				</div>`,

			popupSettings:
				`<div class="app-popup-wrapper">
					<form class="app-popup">
						<div class="app-popup-header">
							<h4 class="app-popup-title"></h4>
							<button class="button app-close-popup app-close" type="button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-license="https://fontawesome.com/license/free">
									<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
									</svg>
							</button>
						</div>

						<div class="app-popup-body"></div>

						<div class="app-popup-footer">
							<div class="app-popup-controls">
								<ul class="app-controls">
									<li class="app-popup-control"><input type="submit" class="button button-accent app-save-popup"></li>
									<li class="app-popup-control"><button type="button" class="button app-close-popup">Отмена</button></li>
								</ul>
							</div>
						</div>
					</form>
				</div>`
		};
	}

	_setContent(template, className, html) {
		let elements = template.querySelectorAll(className);
		for ( let i = 0; i < elements.length; i++ ) {
			elements[i].innerHTML = html;
		}
	}

	_setAttr(template, className, name, value) {
		let elements = template.querySelectorAll(className);
		for ( let i = 0; i < elements.length; i++ ) {
			// Append to an existing one, such as a class.
			let oldValue = elements[i].getAttribute(name) ? elements[i].getAttribute(name) + ' ' : '';
			elements[i].setAttribute(name, oldValue + value);
		}
	}

	_getTemplate(name) {
		let domParer = new DOMParser();
		let html = domParer.parseFromString(this._templates[name], 'text/html');

		return html;
	}

	getSettingsPopupTemplate(model, title, action, hiddenSettings = []) {
		let fields = model.getFields();
		let keys = Object.keys(fields);
		let settingsHTML = '';
		for ( let i = 0; i < keys.length; i++ ) {
			let field = fields[keys[i]];

			// Don't display field if it's private.
			if ( field.private ) {
				continue;
			}

			let settingTemplate = this._getTemplate(field.type + 'Setting');
			this._setContent(settingTemplate, '.app-setting-label', field.label);
			this._setContent(settingTemplate, '[data-value="content"]', field.value);
			this._setAttr(settingTemplate, '[data-field="name"]', 'name', keys[i]);

			if ( field.type == 'checkbox' ) {
				this._setAttr(settingTemplate, '[type="checkbox"]', 'value', field.checkboxValue);
				if ( field.value == field.checkboxValue ) {
					this._setAttr(settingTemplate, '[type="checkbox"]', 'checked', 'checked');
				}
			} else {
				this._setAttr(settingTemplate, '[data-value="attr"]', 'value', field.value);
			}

			settingsHTML += settingTemplate.body.innerHTML;
		}

		for ( let i = 0; i < hiddenSettings.length; i++ ) {
			let settingTemplate = this._getTemplate('hiddenSetting');
			this._setAttr(settingTemplate, 'input', 'name', hiddenSettings[i].name);
			this._setAttr(settingTemplate, 'input', 'value', hiddenSettings[i].value);

			settingsHTML += settingTemplate.body.innerHTML;
		}

		let popupTemplate = this._getTemplate('popupSettings');
		this._setContent(popupTemplate, '.app-popup-title', title);
		this._setContent(popupTemplate, '.app-popup-body', settingsHTML);
		this._setAttr(popupTemplate, '.app-popup', 'data-id', model.getValue('id'));
		this._setAttr(popupTemplate, '.app-popup', 'class', 'app-' + action + '-popup');
		this._setAttr(popupTemplate, '.app-save-popup', 'value', 'Сохранить');

		return popupTemplate.body.innerHTML;
	}

	getRemoveConfirmTemplate(model, title, action) {
		let popupTemplate = this._getTemplate('popupSettings');
		this._setContent(popupTemplate, '.app-popup-title', title);
		this._setContent(popupTemplate, '.app-popup-body', 'Вы уверены?');
		this._setAttr(popupTemplate, '.app-popup', 'data-id', model.getValue('id'));
		this._setAttr(popupTemplate, '.app-popup', 'class', 'app-' + action + '-popup');
		this._setAttr(popupTemplate, '.app-save-popup', 'value', 'Удалить');

		return popupTemplate.body.innerHTML;
	}

	getAppTemplate(checkLists) {
		let checkListsHTML = '';
		for ( let list of checkLists.values() ) {
			checkListsHTML += this.getCheckListTemplate(list);
		}

		let appTemplate = this._getTemplate('app');
		this._setContent(appTemplate, '.app-content', checkListsHTML);

		return appTemplate.body.innerHTML;
	}

	getCheckListTemplate(checkList) {
		let tasksHTML = '';
		for ( let task of checkList.getTasks().values() ) {
			tasksHTML += this.getTaskTemplate(task);
		}

		let checkListsTemplate = this._getTemplate('checkList');
		this._setContent(checkListsTemplate, '.app-tasks', tasksHTML);
		this._setContent(checkListsTemplate, '.app-cl-title', checkList.getValue('title'));
		this._setAttr(checkListsTemplate, '.app-check-list', 'data-model', checkList.constructor.name);
		this._setAttr(checkListsTemplate, '.app-check-list, .app-edit-checklist, .app-remove-checklist', 'data-id', checkList.getValue('id'));
		this._setAttr(checkListsTemplate, '.app-add-task', 'data-list-id', checkList.getValue('id'));

		return checkListsTemplate.body.innerHTML;
	}

	getTaskTemplate(task) {
		let taskTemplate = this._getTemplate('task');
		this._setContent(taskTemplate, '.app-task-title', task.getValue('title'));
		this._setContent(taskTemplate, '.app-task-description', task.getValue('description'));
		this._setContent(taskTemplate, '.app-status-label', task.getFieldLabel('status'));
		this._setAttr(taskTemplate, '.app-task', 'data-model', task.constructor.name);
		this._setAttr(taskTemplate, '.app-edit-task, .app-remove-task, .app-task, .app-task-check', 'data-id', task.getValue('id'));
		this._setAttr(taskTemplate, '.app-task', 'data-status', task.getValue('status'));

		if ( task.getValue('status') == 1 ) {
			this._setAttr(taskTemplate, '.app-task-check', 'checked', 'checked');
		}

		return taskTemplate.body.innerHTML;
	}

	getLoaderTemplate() {
		let loaderTemplate = this._getTemplate('loader');

		return loaderTemplate.body.innerHTML;
	}
}