var part = {
	parse(Src){
		let {el_radio_group,I18nPrefix=""} = Src;
		let _list = [];
		var isMvvm =  I18nPrefix == "i18n.";
		el_radio_group.list.map(el=>{
			var label = el;
			var display =  `${I18nPrefix}${el}`;
			if ($._.isPlainObject(el)){
				var keys =  Object.keys(el);
				let [key] = keys;
				label = key;
				display = `${I18nPrefix}${el[key]}`;
			}
			if (isMvvm){
				display = `{{${display}}}`;
			}
			_list.push({label,display});
		})
		$._.set(el_radio_group,"list",_list);
		//$._.set(Src,'el_radio_group',el_radio_group);
		return {Src:el_radio_group};
	}
}