var injectCfg = {
	_移除plog:0,
	_重覆操作:1,
	_連續操作:2,
	_復原:9
}
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
	parsePart($,include = ()=>{}, partCfg = './_part.cfg'){
		let {fs} = $.ext_ut;
		if (_.isPlainObject(partCfg)==false){
			var _json = fs.readFileSync($.resolvePath(`${partCfg}`));
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
						return include(_ejs,Src);
					})
				})
				return _r;
			}
		}
		return _Part;
	},
	Plog(target,Part = {}){
		var ext_ut = $.ext_ut;
		let {fs} = ext_ut;
		var _fn= {
			parsePoint(point){
				let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
				var match_key =  point.match(/\[(.)+\]/g)||['-?-'];
				var key = match_key[0].replace("[","").replace("]","");
				let [tabs] = start.match(/(|\t)+/g); 
				let [injectKey] = start.match(/(##|#_)/g); 
				 
				let arg = {
					key,
					point,
					tabs,
					injectKey,
					get isInjectAfter(){
						return this.injectKey == "##";
					},
					get part(){
						return Part[key];
					}
				};
				arg
				return arg;
			},
		}
		var _arg = {
			get exists(){
				return fs.existsSync(this.file);
			},
			target,
			file :`${target}.log`,
			init(mode){
				data = this.read();
				var base;
				switch(mode){
					case injectCfg._連續操作:
						base = fs.readFileSync(this.target).toString();
						this.write(base);
						break;
					default:
						if (this.exists){
							base = this.last();
						}else{
							base = fs.readFileSync(this.target).toString();
							if (mode!=null) this.write(base);
						}
						break;
				}
				var _Reg = new RegExp(`(|\t)(.)+(##|#_)(.)+`,'g');	
				var point = base.match(_Reg)||[];
				var _r = {
					base,
					point: point.map(_fn.parsePoint),
				}
				return _r;
			},
			remove(){
				if (this.exists) fs.unlinkSync(this.file);
			},
			reverse(){
				var [_code] = this.read();
				if (_code !=null){
					ext_ut.writeFile(this.target,_code);
				}
			},
			last(){
				if (this.exists){
					return _.last(this.read());
				}
				return null;
			},
			read(){
				if (this.exists){
					return JSON.parse(fs.readFileSync(this.file).toString());
				}
				return [];
			},
 			write(data){
				var _data = this.read();
				_data.push(data);
				var _json = JSON.stringify(_data);
				ext_ut.writeFile(this.file,_json);
				return this;
			},
 			 
		}
		return _arg;
	},
	Inject($,include){
		let {fs} = $.ext_ut;
		let {Src,inject} = $.data;
		let {mode = 0, partCfg=["./_part.cfg"]} = inject;
		let {parsePart,Plog} = this;

		var _Reg = {
			Point: new RegExp(`(|\t)(.)+(##|#_)(.)+`,'g')		
		}
		
		var _fn ={
 			_移除plog(){
				inject.list.forEach(file => {
					Plog(file).remove();
				});
			},
			_復原(){
				inject.list.forEach(file => {
					Plog(file).reverse();
				});
			},
			parsePart(){
				if (_.isPlainObject(partCfg)){
					partCfg = [partCfg];
				}else{
					partCfg = partCfg.map(el=>{
						var _json = include(el,{Src});
						return JSON.parse(_json);
					})
				}
				var _Part = {};
				for(var _partCfg of partCfg){
					_.each(_partCfg,(_EJSs,key)=>{
						if (_.isString(_EJSs)){
							_EJSs = [_EJSs];
						}
						_Part[key] = _EJSs.map(el=>{
							var _ejs = $.resolvePath(`${el}`);
							return include(_ejs,Src);
						})
					})
				}
				return _Part;
			},
			 
			parsePoint(point){
				let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
				var match_key =  point.match(/\[(.)+\]/g)||['-?-'];
				var key = match_key[0].replace("[","").replace("]","");
				let [tabs] = start.match(/(|\t)+/g); 
				let [injectKey] = start.match(/(##|#_)/g); 
				 
				let arg = {
					key,
					point,
					tabs,
					injectKey,
					get isInjectAfter(){
						return this.injectKey == "##";
					},
					Part:[]
				};
				arg
				return arg;
			},
			parsePlog(Part){
				var _arg = {
					mode,
					plog: inject.list.map(file=>{return Plog(file,Part)}) 
				}
				return _arg;
			},
			parseInject(file){
				var _arg = {
					mode,
					plog: Plog(file)
				}
				_arg
				return _arg;
			}
		}
		switch(mode){
			case injectCfg._移除plog:
				_fn._移除plog();
				break;
			case injectCfg._復原:
				_fn._復原();
				break;
			case injectCfg._重覆操作:
			case injectCfg._連續操作:
				var Part = parsePart($,include,partCfg);
				var _r = {
					Src,
					Inject: _fn.parsePlog(Part.get(Src)),
					Part,
				}
				for(var plog of _r.Inject.plog){
					var _plog 
						= plog.act
						= plog.init(mode);
					_plog.point.forEach(Cfg=>{
						var data = Cfg.part;
						if (data == null || data.length == 0 ) return null;
						if (_.isArray(data)){
							data = data.join('\r\n');
						}
						var _code = data.split('\r\n').join(`\r\n${Cfg.tabs}`);
						if (Cfg.isInjectAfter){
							_code = `${Cfg.point}\r\n${Cfg.tabs}${_code}`;
						}else{
							_code = `${Cfg.tabs}${_code}\r\n${Cfg.point}`;
						}
						_plog.base = _plog.base.replace(Cfg.point,_code);
					})
					$.ext_ut.writeFile(plog.target,_plog.base);
				}
				return _r;
				break;

		}
 	},

}