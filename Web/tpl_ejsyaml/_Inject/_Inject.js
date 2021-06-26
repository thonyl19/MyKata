
var injectCfg = {
	_移除plog:0,
	_重覆操作:1,
	_連續操作:2,
	_復原:9,
	_復原且刪除:91
}
var _Point = {
	v20210615(point){
		var match_key =  point.match(/\[(.)+\]/g)||['-?-'];
		var key = match_key[0].replace("[","").replace("]","");

		let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
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
		};
		arg
		return arg;
	}
}
var _Plog = {
	v20210615(target){
		var _r = {
			target,
			log :`${target}.log`,
			__log:null,
			checkExists(type=0){
				var _tar = type == 0 
					? this.target
					: this.log
					;
				return fs.existsSync(_tar);
			},
			Read_Target(){
				if (this.checkExists()){
					return fs.readFileSync(this.target);
				}
				return null;
			},
			read(){
				if (this.__log!=null) return this.__log;
				if (this.checkExists(1)){
					this.__log = JSON.parse(fs.readFileSync(this.log));
					return this.__log;
				}
				return [];
			},
			write(logData,newData = null){
				var _log = this.read();
				_log
				_log.push(logData); 
				var _json = JSON.stringify(_log);
				fs.writeFileSync(this.log,_json);
				if (newData != null){
					fs.writeFileSync(this.target,newData);
				}
				return this;
			},
 
			reverse(mode){
				var [_code] = this.read();
			},
			del(){
				if (this.checkExists(1)) fs.unlinkSync(this.log);
			},
			last(){
				if (this.checkExists(1)){
					return _.last(this.read());
				}
				return null;
			},
		}
		return _r;
	}
}
var _Inject = {
	_fn:{
		getPoint(data){
			var Point =  new RegExp(`(|\t)(.)+(##|#_)(.)+`,'g');
			return  data.match(Point);
		},
		genCode_Inject(){
			var _file = $.resolvePath("_Inject_t.js");
			var _tar =  $.resolvePath("_Inject.js");
			var _key = '//##_Inject----------------------------------------';
			var _code = fs.readFileSync(_file).toString();
			var arr = _code.split(_key);
			arr.shift()
			arr.pop();
			fs.writeFileSync(_tar,arr.join(_key));
		},
	},
	v20210625(cfg,$,include){
		let {list=[],mode} = cfg;
		
		var _arg = {

		}
		return _arg;
	},
	Inject($,include){
		//$.ext_ut.include = include;
		//let {fs} = $.ext_ut;
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
 
			parsePlog(Part){
				var _arg = {
					mode,
					plog: inject.list.map(file=>{return Plog(file,Part)}) 
				}
				return _arg;
			},
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
	parseInjectPoint(injectCfg,Part){
		// var ext_ut = $.ext_ut;
		// let {fs} = $.ext_ut;
		var _fn = {
			parseInjectPoint(point){
				let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
				var match_key =  point.match(/\[(.)+\]/g)||['-?-'];
				var key = match_key[0].replace("[","").replace("]","");
				start 
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
					Part:Part[key]
				};
				arg
				return arg;
			},
		}
		var arr = [];
		var _reg = new RegExp(`(|\t)(.)+(##|#_)(.)+`,'g');
		for (var file of injectCfg.list){
			var _ejs = `${file}.ejs`;
			var isReinject = fs.existsSync(_ejs);
			file = isReinject ?_ejs : file;
			var _base = fs.readFileSync(file).toString();
			if (!isReinject) ext_ut.writeFile(`${_ejs}`,_base);
			var _matchs = _base.match(_reg)||[];
			var _arg = {
				file,
				matchs:_matchs.map(_fn.parseInjectPoint)
			}
			arr.push(_arg);
		}
		return arr;
	},
	parseRelatePath(basePath,src){
		// var basePath = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\";
		// var src = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\_InjectTest\\_part.ejs.log";
		var basePathArr 
			= _.isArray(basePath)
			? basePath
			: basePath.split('\\');
		var srcArr = src.split('\\');
		var relate = "./";
		basePathArr.forEach(el=>{
			let [idx0] = srcArr;
			if (el == idx0){
				srcArr.shift();
			}else if (idx0 == null){}
			else{
				relate += "../";
			}
		})
		var _path = `${relate}${srcArr.join('/')}`;
		return _path;
	},
	parsePart(partCfg = './_part.cfg'){
		let {fs} = $.ext_ut;
		if (_.isPlainObject(partCfg)==false){
			partCfg = $.resolvePath(partCfg);
			//var _json = fs.readFileSync(partCfg);
			var _json = include(partCfg);
			//return _json;
			partCfg =  JSON.parse(_json);
			return partCfg;
		}
		var _Part = {
			partCfg,
			get(Src,isTest=false){
				var _r = {};
				_.each(this.partCfg,(_EJSs,key)=>{
					if (_.isString(_EJSs)){
						_EJSs = [_EJSs];
					}
					_r[key] = _EJSs.map(_ejs=>{
						return isTest ? _ejs : include(_ejs,Src);
					})
				})
				return _r;
			}
		}
		return _Part;
	},
	InjectPartEJS(){
		let {fs,_,path}= $.ext_ut;
		let {injectPart}= $.data;
		var _fn = {
			
			exec(injectMode){
				var _Plog_PartEJS  = _Inject.Plog_PartEJS;
				var _Plog  = _Inject.Plog("");
				console.log(this);
				_Plog = _Plog_PartEJS = this;
				switch(injectMode){
					case injectCfg._連續操作:
						base = fs.readFileSync(_Plog.target).toString();
						this.write(base);
						break;
					default:
						if (_Plog.exists){
							base = _Plog.last();
							var _point = this.parsePoint(base);
							_point.inject(injectPart);
						}else{ 
							base = fs.readFileSync(_Plog.target).toString();
							if (injectMode==injectCfg._重覆操作){
								_Plog.write(base);
								var _p = _Plo_Plog_PartEJSg.parsePoint(base);
								var _code = base.replace(_p.point,_p.oldCfg);
								_r.ParseOld(base);
							} 
							//_r.base = base;
						}
						break;
				}
							
			},
			newSrc:  $.resolvePath('_InjectPart.ejs'),
			/*
			確認 _part.ejs 是否存在 ,不存在則直接建立一個
				*/
			async CreadNew_PartEjs(target){ 
				if (fs.existsSync(target)==false){
					await $.render(this.newSrc, target, {});
				}
			},
			GetOldCfg(code){
				var [match] = code.match(/\/\/#_(\s\S|[^##])+\/\/@#/g);
				match = match.replace(/(^\/\/#_Cfg|\/\/@#$)/g,"");
				var _json  = JSON.parse(match.toString());
				return _json;
			},
			ReplaceCfg(cfg){
				let {targetPath} = injectPart;
				if (targetPath == null) return cfg;
				basePathArr = targetPath.split('\\');
				_.each(injectPart.cfg,(v,k)=>{
					cfg[k] = _Inject.parseRelatePath(basePathArr,v) 
				})
				return cfg;
			},
			parsePoint(code){
				let {target} = this;
				code
				var [point] = code.match(/(.)+\/\/#_(\s\S|[^##])+\/\/@#/g);
				let [tabs] = point.match(/(|\t|\s)+/g); 
				
				var _r = {
					point,
					tabs,
					get oldCfg(){
						var conten = this.point.replace(/(\/\/#_Cfg|\/\/@#$)/g,"");
						return JSON.parse(conten.toString());
					},
					inject(injectCfg){
						let {targetPath,cfg} = injectCfg;
						if (targetPath == null) return this.oldCfg;
						basePathArr = targetPath.split('\\');
						injectPart
						_.each(cfg,(v,k)=>{
							cfg[k] = _Inject.parseRelatePath(basePathArr,v) 
						})
						var _newCodeArr = JSON.stringify(cfg,null,4).split('\n');
						_newCodeArr
						_newCodeArr.unshift(`${this.tabs}//#_Cfg`);
						_newCodeArr.push(`//@#`);
						code = code.replace(point,_newCodeArr.join(`\r\n${this.tabs}`));
						fs.writeFileSync(target,code);
						return cfg;
					}
				}
				return _r;
			},
			ParseOld(base){

			},
			ParseLog(base){
				var _p = this.parsePoint(base);
				var _code = base.replace(_p.point,_p.oldCfg);
				this.
				_code
				_p;
			}
		}
		var target = `${injectPart.targetPath}_part.ejs`;
		_fn.CreadNew_PartEjs(target);
		_fn = _Inject.Plog(target,_fn);
		return _fn;
	},
 
	_Plog_PartEJS(target){
		var _base = {
			test(){
				return this;
			},
			exec(injectMode){
				var _Plog_PartEJS  = _Inject.Plog_PartEJS;
				var _Plog  = _Inject.Plog;
				_Plog = _Plog_PartEJS = this;
				switch(injectMode){
					case injectCfg._連續操作:
						base = fs.readFileSync(_Plog.target).toString();
						this.write(base);
						break;
					default:
						if (_Plog.exists){
							base = _Plog.last();
							var _point = _Plog_PartEJS.parsePoint(base);
							var _code = base.replace(_point.point,_point.oldCfg);
							_code
							//console.log(this.target);
							fs.writeFileSync(_Plog.target,_code);
						}else{
							base = fs.readFileSync(_Plog.target).toString();
							if (injectMode==injectCfg._重覆操作){
								_Plog.write(base);
								var _p = _Plog.parsePoint(base);
								var _code = base.replace(_p.point,_p.oldCfg);
								_r.ParseOld(base);
							} 
							//_r.base = base;
						}
						break;
				}
							
			},
			get newSrc(){
				return  $.resolvePath('_InjectPart.ejs');
			},
			/*
			確認 _part.ejs 是否存在 ,不存在則直接建立一個
			 */
			async CreadNew_PartEjs(target){ 
				if (fs.existsSync(target)==false){
					await $.render(this.newSrc, target, {});
				}
			},
			GetOldCfg(code){
				var [match] = code.match(/\/\/#_(\s\S|[^##])+\/\/@#/g);
				match = match.replace(/(^\/\/#_Cfg|\/\/@#$)/g,"");
				var _json  = JSON.parse(match.toString());
				return _json;
			},
			ReplaceCfg(cfg){
				let {targetPath} = injectPart;
				if (targetPath == null) return cfg;
				basePathArr = targetPath.split('\\');
				_.each(injectPart.cfg,(v,k)=>{
					cfg[k] = _Inject.parseRelatePath(basePathArr,v) 
				})
				return cfg;
			},
			parsePoint(code){
				code
				var [point] = code.match(/\/\/#_(\s\S|[^##])+\/\/@#/g);
				var _r = {
					point,
					get oldCfg(){
						var conten = this.point.replace(/(^\/\/#_Cfg|\/\/@#$)/g,"");
						return JSON.parse(conten.toString());
					},
					inject(targetPath){
						if (targetPath == null) return cfg;
						basePathArr = targetPath.split('\\');
						_.each(injectPart.cfg,(v,k)=>{
							cfg[k] = _Inject.parseRelatePath(basePathArr,v) 
						})
						var _newCode = JSON.stringify()
						code = code.replace(point)
	
						return cfg;
					}
				}
				return _r;
			},
			ParseOld(base){
	
			},
			ParseLog(base){
				var _p = this.parsePoint(base);
				var _code = base.replace(_p.point,_p.oldCfg);
				this.
				_code
				_p;
			}
		}
		return _Inject.Plog(target,_base);
 
	},
	Plog(target,exten={}){
		var base = {
			target,
			test(){
				console.log(this);
				return this;
			},
			exec(){},
			get exists(){
				console.log(this.plog); 
				return fs.existsSync(this.plog);
			},
			get plog(){
				console.log(this.target); 
				return `${this.target}.log`;
			},
			remove(){
				if (this.exists) fs.unlinkSync(this.plog);
			},
			reverse(mode){
				var [_code] = this.read();
				if (_code !=null){
					fs.writeFileSync(this.target,_code);
					if (mode == injectCfg._復原且刪除){
						this.remove();
					}
				}
			},
			last(){
				if (this.exists){
					var arr = this.read();
					return _.last(arr);
				}
				return null;
			},
			read(){
				if (this.exists){
					console.log( this.plog);
					var _code = fs.readFileSync(this.plog).toString();
					_code
					return JSON.parse(_code);
				}
				return [];
			},
			write(data){
				var _data = this.read();
				_data.push(data);
				var _json = JSON.stringify(_data);
				fs.writeFileSync(this.plog,_json);
				return this;
			},
		}
		return _.merge(base,exten);
	},
	_Plog:{
		test(){},
		exec(){},
		get exists(){
			console.log(this.plog); 

			return fs.existsSync(this.plog);
		},
		target:'',
		get plog(){
			console.log(this.target); 
			return `${this.target}.log`;
		},
		remove(){
			if (this.exists) fs.unlinkSync(this.plog);
		},
		reverse(mode){
			var [_code] = this.read();
			if (_code !=null){
				fs.writeFileSync(this.target,_code);
				if (mode == injectCfg._復原且刪除){
					this.remove();
				}
			}
		},
		last(){
			if (this.exists){
				var arr = this.read();
				return _.last(arr);
			}
			return null;
		},
		read(){
			if (this.exists){
				console.log( this.plog);
				var _code = fs.readFileSync(this.plog).toString();
				_code
				return JSON.parse(_code);
			}
			return [];
		},
		write(data){
			var _data = this.read();
			_data.push(data);
			var _json = JSON.stringify(_data);
			fs.writeFileSync(this.plog,_json);
			return this;
		},
	},
 
	ViewLog(Log,mode = 1 ){
		var arr = [];
		if (Log == null) return "";
		if (mode == 0 ) return JSON.stringify(Log,null,4);
		let {Inject} = Log;
		_.each(Inject.plog,(plog)=>{
			delete plog.act.base;
			_.each(plog.act.point,(point)=>{
				arr.push(`\r\n[${point.key}]`);
				if (point.part!=null){
					arr.push(point.part.join('\r\n'));
				}
			})
		})
		
		if (mode!= 2) arr.unshift(JSON.stringify(Log,null,4));
		return arr.join('\r\n');
	},
	parsePartCfg(cfg){
		let {_} = $.ext_ut;
		for(var key in cfg){
			cfg[key] = $.resolvePath(cfg[key]);
		}
		return cfg;
	},	
	
	genCode_Part(){
		var _file = $.resolvePath("_Inject_t.js");
		var _tar =  $.resolvePath("_Inject.js");
		var _key = '//##_Inject----------------------------------------';
		var _code = fs.readFileSync(_file).toString();
		var arr = _code.split(_key);
		arr.shift()
		arr.pop();
		fs.writeFileSync(_tar,arr.join(_key));
	},
}

var Part = {
	v20210625(){
		return "test";
	}
}
$._Inject = _Inject;
$.Part = Part.v20210625;
