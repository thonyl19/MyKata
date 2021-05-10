var part = {
	parse(Src,_){
		let {el_radio_group,I18nPrefix=""} = Src;
		let _list = [];
		var isMvvm =  I18nPrefix == "i18n.";
		el_radio_group.list.map(el=>{
			var label = el;
			var display =  `${I18nPrefix}${el}`;
			if (_.isPlainObject(el)){
				var key = Object.keys(el)[0];
				label = el[key];
				display = `${I18nPrefix}${el[key]}`;
			}
			if (isMvvm){
				display = `{{${display}}}`;
			}
			_list.push({label,display});
		})
		$._.set(el_radio_group,"list",_list);
		Src = {Src:el_radio_group};
		return Src;
	},
	parsePartCfg(Src,include,cfgPath="./"){
		var arr = [];
		var _path = $.resolvePath(`${cfgPath}/_part.cfg`);
		return include(_path,{Src});
	},
 
	parsePartCfg_x(Src,include,cfgPath){
		var _fn = {
			parsePart_item(path,part,items){
				var arr = [];
				var _path = $.resolvePath (`${cfgPath}/`);
				if (typeof(items) === "string" ) items = [items]
				arr = items.map(el=>{
					var _s = `${_path}${el}.ejs`;
					_s
					return _s;
				})
				return arr;
			},
			parsePart_cfg(partName){
				var part = {};
				var _path = $.resolvePath (`${cfgPath}/`);
				var _cfg = include(_path);
				let chk_Path = $.ext_ut.fs.existsSync(_path);
				if(chk_Path){
					var _cfg = $.ext_ut.fs.readFileSync(_path);
					_cfg
					var _json = JSON.parse(_cfg);
					_.each(_json,(v,k)=>{
						part[k] = _fn.parsePart_item(partName,k,v);
					})
					part
					return part;
				}
				return _cfg;
			},
 
		}
		let {part = {}} = Src;
		for (var k in part){
			var v = part[k];
			part[k] = _fn.parsePart_cfg(k,v);
		}
		$._.set(Src,'part' , part);
	},
	async parsePart(include,Src){
		var _fn = {
			parsePart_item(path,part,items){
				var arr = [];
				var _path = ext_ut.ts_BasePath(`${path}/`);
				if (typeof(items) === "string" ) items = [items]
				arr = items.map(el=>{
					var _s = `${_path}${el}.ejs`;
					_s
					return _s;
				})
				return arr;
			},
			parsePart_cfg(partName){
				var part = {};
				var _path = ext_ut.ts_BasePath(`${partName}/_part.cfg`);
				_path
				let chk_Path = fs.existsSync(_path);
				if(chk_Path){
					var _cfg = fs.readFileSync(_path);
					_cfg
					var _json = JSON.parse(_cfg);
					_.each(_json,(v,k)=>{
						part[k] = _fn.parsePart_item(partName,k,v);
					})
					part
					return part;
				}
				return null;
			},
			parsePart_0(include,Src,part,part_code){
				part
				let {point={}} = Src;
				part
				for (var k in part_code){
					k
					var _code = part_code[k].map((el)=>{
						//console.log(el)
						return include(el, {Src});
						//return await ejs.renderFile(el, {Src});
					})
					_code
					var _part_asName = part[k];
					var _point_key = _part_asName || k; 
					var arr = point[_point_key] || [];
					point[_point_key] = arr.concat(_code)
				}
				$._.set(Src,'point', point);
			},
		}
		
		let {part=[]} = Src;
		for (var k in part){
			var v = part[k];
			var _part_code = _fn.parsePart_cfg(k,v);
			_fn.parsePart_0(include,Src,v,_part_code);
		}
		return Src;
	},
}