var part = {
	parse(Src,_){
		let {selectize} = Src;
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
		$._.set(selectize,"dynSet",dynSet);
		Src = {Src:selectize};
		return Src;
	}
}