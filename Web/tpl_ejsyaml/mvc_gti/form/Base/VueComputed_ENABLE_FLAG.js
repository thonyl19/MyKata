ENABLE_FLAG:{
	get() {
		let { ENABLE_FLAG = 'F' } = this.form;
		return ENABLE_FLAG == 'T';
	},
	set(val) {
		//debugger
		this.form.ENABLE_FLAG = val? 'T':'F';
	}
},