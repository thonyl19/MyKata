//#region [ENABLE_FLEG]
_enable(val) {
    var _self = this;
    _self.form.ENABLE_FLAG = val ? 'T' : 'F';
    let param = {
        entity = _self.form
    }
    var url = '@Url.Action("Enable")';
    var _ajax = {
        url,
        param,
        type: 'post',
        automessage: false,
        async success(res) {
            let { Success, Data, Message = "", Exception} = res;
            if (Success) {
                _self.$UT.parent_reload();
                _self.$Alert.Success(Message, true);

            } else {
                _self.form.ENABLE_FLAG = !Enable;
                await _self.$nextTick();
                /* jessie 用法,先保留
                self.isTriggerUpdEnable = false;
                self.enable = !this.enable;
                self.$Alert.Warning(Message);
                console.log(Exception);
                */
            }
            _self.isLock = false;
        }
    };
    return $.submitForm(_ajax);
},
//#endregion [ENABLE_FLEG]