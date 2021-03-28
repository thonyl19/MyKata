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
e_del() {
	//debugger
	var _self = this;
	let { ENCODE_FORMAT_SID } = _self.form;
	if (ENCODE_FORMAT_SID == null) {
		var msg = "@RES.BLL.Message.ErrorMessage".replace("{0}", "SID 不正確!");
		_self.$Alert.Err(msg);
		return;
	}
	this.leyer_idx = parent.layer.getFrameIndex(window.name);
	this.$confirm(_self.i18n.ConfirmDel, '提示', _self.confirm_arg).then(() => {
		var url = '@Url.Action("Delete")';
		var _ajax = {
			url,
			param: { SID: ENCODE_FORMAT_SID },
			type: 'post',
			success :_self.Ajax_success
		};
		$.submitForm(_ajax);
	});
},
e_save() {
	var _self = this;
	let param = {
		main: _self.form,
		items: _self.grid.data
	};
	if (param.items.length == 0) {
		_self.MessageMustInputOne();
		return;
	}
	this.$confirm(_self.i18n.ConfirmSave, '提示',_self.confirm_arg).then(() => {
		var url = _self.isAddMode
			? '@Url.Action("Create")'
			: '@Url.Action("Update")'
			;
		var _ajax = {
			url,
			param,
			type: 'post',
			success :_self.Ajax_success
		};
		//console.log(JSON.stringify(param,null));
		$.submitForm(_ajax);
	});
},
Ajax_success(res) {
	let { Success, Data, Message = ""} = res;
	if (Success) {
		var _self = this;
		var isDelMark = this.leyer_idx != null;
		var _msg = isDelMark
			? '@RES.BLL.Message.DeleteSuccessfulmsg'
			: '@RES.BLL.Message.SaveSuccessful'
			;
		this.$UT.parent_reload();
		this.$Alert.Success(_msg).then(() => {
			if (isDelMark) {
				parent.layer.close(_self.leyer_idx);
			} else {
				_self.reload(Data);
			}
		});
	} else {
		this.$Alert.Warning(Message);
	}
},

reload(Data) {
	if (this.isAddMode) {
		let { SID } = Data;
		this.$URL.chgSearchParam({ SID }, true);
	} else {
		location.replace(location.href);
	}
},
//#region [ToolBar 相關程序]
v_query(){
	//TODO:v_query
},
//#endregion [ToolBar 相關程序]