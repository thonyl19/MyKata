const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
const { exec } = require('child_process');
var $ = {
	data:{},
	ext_ut:{_,fs,path},
	resolvePath(x){
		return path.resolve(`./tpl_ejsyaml/_Inject/${x}`);
	},
	render(file,tar,data){
		var _code = ejs.renderFile(file,{},null,(err, str)=>{
			fs.writeFileSync(tar,str);
		});
	}
}
//##_Inject----------------------------------------
var injectCfg = {
	_移除plog:0,
	_重覆操作:1,
	_連續操作:2,
	_復原:9,
	_復原且刪除:91
}
var _Inject = {
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
	//將傳入的值,直接轉換 格式化後的 JSON Code ,以便檢視
	ViewJsonCode(data){
		return JSON.stringify(data,null,4);
	},
	/*
	mode:
		0) 將傳入的值,直接轉換 格式化後的 JSON Code ,以便檢視
		1)
	*/
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
$._Inject = _Inject;
//##_Inject----------------------------------------
var _test = {

	async '*t_InjectPartEJS'(){
		$.data.injectPart = {
			"targetPath": "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\_InjectTest\\",
			"cfg": {
				"Html_Code": "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\_InjectTest\\_part.ejs"
			},
			"mode": 0
		}
		// var f = fs.readFileSync(`${$.data.injectPart.cfg.Html_Code}.log`);
		// console.log(await f.toString());
		//f
		//var z = _Inject.InjectPartEJS().exec(injectCfg._重覆操作);
			//= _Inject.InjectPartEJS().exec();
		//z.CreadNew();
		
		//VSCode Jump
		var _plog 
			//= _Inject.InjectPartEJS();
			= _Inject.Plog();
		_plog = _Inject.InjectPartEJS();
		//測試
		_plog.test();
		
		//執行
		_plog.exec(injectCfg._重覆操作);

		//_plog.remove();
		//var _inject =  _Inject.InjectPartEJS().init(injectCfg._重覆操作);
		//_inject
		 
	},
	't_export_Inject'(){ 
		_Inject.genCode_Inject();
	},
	'轉換相對路徑'(){
		var basePath = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\";
		var src = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\_InjectTest\\_part.ejs.log";
		var z = _Inject.parseRelatePath(basePath,src);
	},
	'取得即有的資料置換成新的'(){
		var s =`
		var _cfg = 
		//#_Cfg
		{
			"Html_Code":"vue-selectize.ejs"
		}
		//@#
		$._Inject.parsePartCfg(_cfg);
		`;
		var _r = _Inject.InjectPartEJS().exec();
		var _json = _r.GetOldCfg(s);
		_r.ReplaceCfg(_json);
		_json
 	},
}

_.each(_test,(e,k)=>{
	if (k.substr(0,1)=="*"){
		e();
	}
})