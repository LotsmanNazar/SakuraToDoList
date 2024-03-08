class CheckListModel extends AbstractModel {
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

			title: {
				label: 'Заголовок',
				type: 'text',
				dataType: 'str',
				value: ''
			}
		}

		this._tasks = new Map();
	}

	getTasks() {
		return this._tasks;
	}
}