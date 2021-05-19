var _Inject = {
	path:{
		resolvePath:  $.ext_ut.Path.resolve('./'),
		cwd:$.cwd
	},
	parsePart(include=()=>{}, partCfg = './_part.cfg'){
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
					_r[key] = _EJSs.map(el=>{
						return el;
						var _ejs = $.resolvePath(`${el}`);
						return isTest ? _ejs : include(_ejs,Src);
					})
				})
				return _r;
			}
		}
		return _Part;
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
	}	

}

x