/// #region [VueComupteToolbar] 
v_query() {
	return {
		//TODO:
		visable: true,
		enable: true,
		fn: this.e_query
	}
},
/// #endregion [VueComupteToolbar] 
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
isAddMode() {
	var url = new URL(location);
	var SID = url.searchParams.get('SID') ?? "";
	var isAddMode = (SID == "");
	return isAddMode;
},