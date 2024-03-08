class Helper {
	validateTaskData(formData) {
		let validate = true;
		if ( !formData.get('status') ) {
			formData.set('status', 0);
		}

		formData.forEach((value, key) => {
		  if ( value === '' ) {
		  	validate = false;
		  }
		});

		return validate ? formData : false;
	}

	validateCheckListData(formData) {
		let validate = true;
		
		formData.forEach((value, key) => {
		  if ( value === '' ) {
		  	validate = false;
		  }
		});

		return validate ? formData : false;
	}
}