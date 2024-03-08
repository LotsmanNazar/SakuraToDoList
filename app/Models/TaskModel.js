class TaskModel extends AbstractModel {
	constructor() {
		super();

		this._fields = {
			id: {
				label: '',
				type: 'number',
				dataType: 'int',
				value: null,
				private: true
			},

			listID: {
				label: '',
				type: 'number',
				dataType: 'int',
				value: null,
				private: true
			},

			title: {
				label: 'Заголовок',
				type: 'text',
				dataType: 'str',
				value: ''
			},

			description: {
				label: 'Описание',
				type: 'textarea',
				dataType: 'str',
				value: ''
			},

			status: {
				label: 'Выполнено',
				type: 'checkbox',
				checkboxValue: 1,
				dataType: 'int',
				value: 0
			}
		}

		this._checkList = null;
	}

	getCheckList() {
		return this._checkList;
	}

	setCheckList(checkList) {
		this._checkList = checkList;
	}
}