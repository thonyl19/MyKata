
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
		$._.set(Src,"selectize",selectize);
		return Src;
	},
	parsePart($,include=()=>{}, partCfg = './_part.cfg'){
		let {fs} = $.ext_ut;
		if (_.isPlainObject(partCfg)==false){
			partCfg = $.resolvePath(partCfg);
			var _json = fs.readFileSync(partCfg);
			partCfg =  JSON.parse(_json);
		}
		var _Part = {
			partCfg,
			get(Src){
				var _r = {};
				_.each(this.partCfg,(_EJSs,key)=>{
					if (_.isString(_EJSs)){
						_EJSs = [_EJSs];
					}
					_r[key] = _EJSs.map(el=>{
						var _ejs = $.resolvePath(`${el}`);
						_ejs
						return include(_ejs,Src);
					})
				})
				return _r;
			}
		}
		return _Part;
	},
}