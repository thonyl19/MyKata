
var part = {
	parse(Src,_){
		let {selectize,API} = Src;
		let dynSet = {};
		switch(selectize.mode.v_model){
			case 0://基本型
				dynSet = {
					v_model: `${selectize.name}.val`,
				};
				break;
			case 1://Computed
				dynSet = {
					v_model: `c_${selectize.name}`,
				};
				break;
			case 2://Watch
				dynSet = {
					v_model: `${selectize.syncFiled}`,
				};
				break;
		}
		API.name = selectize.triggerEvent.name;
		API.arg = `string ${selectize.triggerEvent.FnArgs}`;
		$._.set(selectize,"dynSet",dynSet);
		$._.set(selectize,"API",API);
		Src = {Src:selectize};
		return Src;
	},
}