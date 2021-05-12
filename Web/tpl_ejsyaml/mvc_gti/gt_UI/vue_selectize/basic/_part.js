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
	Inject1(injectCfg,part){
		var _fn = {
			parseInjectPoint(_match){
				if (_match==null || _match.length == 0) return false;
				_match
				let [point] = _match;
				let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
				start 
				let [tabs] = start.match(/(|\t)+/g); 
				let [injectKey] = start.match(/(##|#_)/g); 
				let arg = {
					point,
					tabs,
					injectKey,
					get isInjectAfter(){
						return this.injectKey == "##";
					}
				};
				arg
				return arg;
			},
			inject_item(base,data,Inject){
				if (Inject == false) return base;
				if (_.isArray(data)){
					data = data.join('\r\n');
				}
				var _code = data.split('\r\n').join(`\r\n${Inject.tabs}`);
				if (Inject.isInjectAfter){
					_code = `${Inject.point}\r\n${Inject.tabs}${_code}`;
				}else{
					_code = `${Inject.tabs}${_code}\r\n${Inject.point}`;
				}
				base = base.replace(Inject.point,_code);
				return base;
			},
		}
		var _target = `${injectCfg.path}${injectCfg.file}`;
		var _ejs = `${_target}.ejs`;
		let isReinject = fs.existsSync(_ejs);
		var _src = isReinject ?_ejs : _target;
		var _base = fs.readFileSync(_src);
		if (!isReinject) ext_ut.writeFile(`${_ejs}`,_base);
		_base = _base.toString();
		_.each(part,(v,k)=>{
			var _reg = new RegExp(`(|\t)(.)+(##|#_)${k}(.)+`,'gi');
			var _match = _base.match(_reg);
			_match
			var _Inject = _fn.parseInjectPoint(_match);  
			_base = _fn.inject_item(_base,v,_Inject);
		})
		ext_ut.writeFile(`${_target}`,_base);
		return _base;
	}
}