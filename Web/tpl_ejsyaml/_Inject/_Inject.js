var injectCfg = {
	_移除plog:0,
	_重覆操作:1,
	_連續操作:2,
	_復原:9,
	_復原且刪除:91
}
$._Inject = {
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
		let {fs}= $.ext_ut;
		let {injectPart}= $.data;
		var exec = function(injectMode){
			var _self = this;
			var base = "";
			switch(injectMode){
				case injectCfg._連續操作:
					base = fs.readFileSync(this.target).toString();
					this.write(base);
					break;
				default:
					if (this.exists){
						base = this.last();
					}else{
						base = fs.readFileSync(this.target).toString();
						if (injectMode==injectCfg._重覆操作) this.write(base);
					}
					break;
			}
			//var _list = _baseCode.match(/##(\s\S|[^##])+@#/g);
			var _r = {
				get exists(){
					return fs.existsSync(_self.target);
				},
			}
			return _r;
		}
		return $._Inject.Plog(`${injectPart.targetPath}\_part.ejs`,exec);
	},
	Plog(target,exec=()=>{}){
		let {fs} = $.ext_ut;
 		var _arg = {
			exec,
			get exists(){
				return fs.existsSync(this.file);
			},
			target,
			file :`${target}.log`,
			remove(){
				if (this.exists) fs.unlinkSync(this.file);
			},
			reverse(mode){
				var [_code] = this.read();
				if (_code !=null){
					ext_ut.writeFile(this.target,_code);
					if (mode == injectCfg._復原且刪除){
						this.remove();
					}
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
				$.ext_ut.writeFile(this.file,_json);
				return this;
			},
		}
		return _arg;
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
 