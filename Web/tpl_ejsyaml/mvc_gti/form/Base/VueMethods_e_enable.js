e_enable(Enable) {
	var _self = this;
	let param = {
		SID : this.getSID(),
		Enable
	}
	var url = '@Url.Action("Enable")';
	var _ajax = {
		url,
		param,
		type: 'post',
		async success(res) {
			//debugger
			let { Success, Data, Message = ""} = res;
			if (Success) {
			} else {
				_self.form.ENABLE_FLAG = !Enable;
				await _self.$nextTick();
			}
			_self.isLock = false;
			_self.$UT.parent_reload();
		}
	};
	return $.submitForm(_ajax);
},