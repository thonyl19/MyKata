const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
var injectCfg = {
	_移除plog:0,
	_重覆操作:1,
	_連續操作:2,
	_復原:9,
	_復原且刪除:91
}
var ext_ut = {
	fs,
	
	map_csharpType: {
		"string":"string",
		"int":"int",
		"float":"decimal",
		"array":"object[]",
		"date":"date",
		"boolean":"bool",
	},
	map_UI : {
		int(filed){return ''},
		date(filed){return `<el-date-picker type="date" class="eui-fix" v-model="form.${filed.Name}">\r\n\t</el-date-picker>`},
		float(filed){return ''},
		array(filed){return `<el-input type="textarea" v-model="form.${filed.Name}" rows="3">\r\n\t</el-input>`},
		boolean(filed){return ``},
	},
	get_list(){
		var arr =[];
		var _dir = './QuokkaApp'
		fs.readdir(_dir, {withFileTypes: true})
		  .filter(item => !item.isDirectory())
		  .map(item => { 
			  arr.push(item.name);
		})
	},
	writeFile(path,data,isBig5=false){
		if (isBig5){
			data = iconv.encode(data, 'big5');
		}
		fs.writeFile(path, data, "UTF-8", function(err) {
			if (err) throw err;
			console.log("檔案寫入操作完成!");
		})
	},
	ts_BasePath(relPath){
		return `./tpl_ejsyaml/mvc_gti/${relPath}`
	},
	parse_label(Name,Prefix){
		var _Prefix =  _.isEmpty(Prefix)?"i18n.":Prefix;
		return `${_Prefix=="i18n."?':':''}label="${_Prefix}${Name}"`;
	},
	parse_UI(filed){
		var UI = "";
		let _fn = ext_ut.map_UI[filed.map_type.JS];
		if (_fn!=null){
			UI = `${_fn(filed)}`;
		}
		filed.UI = UI;
	},
	parseRow(arg,setPath = 'Fileds'){
		let {row,I18nPrefix} = arg;
		if (row==null) return ;
		var fileds = [];
		for(var Name in row){
			var val = row[Name];
			var JS = typeof(val);
			switch(JS){
				case "object":
					if (val === null){
						JS = 'string';
					} else  if (Array.isArray(val)){
						JS = 'array';
					} else if (_.isPlainObject(val)){
						JS = 'json';
					}
					break;
				case "string":
					if (moment(val).isValid()){
						JS = "date";
					}
					break;
				case "number":
					JS =_.isInteger(val)
						?"int"
						:"float" 
					break;
				default:
					break;
			}
			var _filed = {
				Name
				,val
				,"map_type":{
					JS,
					csharp:ext_ut.map_csharpType[JS]
				}
				,label :ext_ut.parse_label(Name,I18nPrefix)
			};
			ext_ut.parse_UI(_filed)
			fileds.push(_filed);
		}
		_.set(arg, setPath, fileds);
		return arg;
	},
 
	parsePart($,include=()=>{}, partCfg = './_part.cfg'){
		//let {fs} = $.ext_ut;
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
		// var ext_ut = $.ext_ut;
		let {fs} = ext_ut;
		var _fn= {
			parsePoint(point){
				let [start] =  point.match(/(|\t)(.)+(##|#_)/g);
				var match_key =  point.match(/\[(.)+\]/g)||['-?-'];
				var key = match_key[0].replace("[","").replace("]","");
				let [tabs] = start.match(/(|\t|\s)+/g); 
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
							if (mode==injectCfg._重覆操作) this.write(base);
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
				ext_ut.writeFile(this.file,_json);
				return this;
			},
 			 
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
			_復原(mode){
				inject.list.forEach(file => {
					Plog(file).reverse(mode);
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
			case injectCfg._復原且刪除:
				_fn._復原(mode);
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
	InjectLog(Log,mode = 1 ){
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
var _test ={
	$:{
		resolvePath(file){ return file}
	},
	'*Inject'(){
		var Src = {
            "name": "ddl_Route",
            "syncFiled": "form.SID",
            "attr": {
                "auto_drowdown": true
            },
            "mode": {
                "v_model": 2,
                "Computed": 0,
                "Watch": 1
            },
            "triggerEvent": {
                "name": "query_PartNo1",
                "url": "Url.Action(\"SearchEDC\")",
                "FnArgs": "keyword"
            },
            "dynSet": {
                "v_model": "form.SID"
            },
            "API": {
                "isPost": 0,
                "name": "query_PartNo1",
                "arg": "string keyword"
            }
        }
		var inject = {
			"list": [
				"D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\MVC\\gti\\SequenceNumController.cs",
				"D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\MVC\\gti\\SequenceNum.cshtml"
			],
			"mode": 0,
			Part:{
				RuleFor:'../mvc_gti/CSharp/v8n/RuleFor'
			}
		}
		var $ = {
			data:{Src,inject},
			resolvePath(){}
		}
		
		ext_ut.Inject($,()=>{});
	},
	'Part'(){
		var _partCfg 
			//= '../mvc_gti/gt_UI/ENABLE_FLAG';
			= 'D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\gt_UI\\vue_selectize\\basic\\_part.cfg';
		var _r = ext_ut.Part(_test.$,()=>{},_partCfg);
		_r
	}
} 

// _.each(_test,(e,k)=>{
// 	if (k.substr(0,1)=="*"){
// 		e();
// 	}
// })
module.exports = {ext_ut}