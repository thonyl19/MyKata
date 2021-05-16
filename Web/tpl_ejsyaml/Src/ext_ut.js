const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
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
			async parsePart_0(include,Src,part,part_code){
				part
				let {point={}} = Src;
				part
				for (var k in part_code){
					k
					var _code = part_code[k].map(async (el)=>{
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
				Src.point = point;
			},
		}
		
		let {part=[]} = Src;
		for (var k in part){
			var v = part[k];
			var _part_code = _fn.parsePart_cfg(k,v);
			await _fn.parsePart_0(include,Src,v,_part_code);
		}
		return Src;
	},
	parsePoint(Src){
		console.log({Src});
		let {point={},part=[]} = Src;
		part.map(el=>{
			_.each(el,(v,k)=>{
				var _map = point[k];
				var arr = v.split('\r\n');
				point[k] = _map == null
					?arr
					: _.concat(point[k],arr)
					;
			})
		})
		point
		_.set(Src,'point',point);
		return Src;
	},
	Part($,include = ()=>{}, partCfg = './_part.cfg'){
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
	Plog(target){
		var _arg = {
			data:null,
			target,
			file :`${target}.plog`,
			remove(){
				return fs.unlinkSync(this.file);
			},
			reverse(){
				var _code = this.first();
				if (_code !=null){
					ext_ut.writeFile(this.target,_code);
				}
			},
			last(){
				this.read();
				return _.last(this.data);
			},
			first(){
				this.read();
				let [first] = this.data; 
				return first;
			}, 
			read(isRenew=false){
				if (isRenew || this.data == null){
					this.data = JSON.parse(fs.readFileSync(this.file).toString());
				}
				return this.data;
			},
			write(data){
				if (data!=null) this.data.push(data);
				var _json = JSON.stringify(this.data);
				ext_ut.writeFile(this.file,_json);
			}
		}
		if (fs.existsSync(_arg.file)==false) return null;
		return _arg;
	},
	Inject($,include){
		let {Src,inject} = $.data;
		let {mode = 0, Part=["./_part.cfg"]} = inject;

		var _Reg = {
			Point: new RegExp(`(|\t)(.)+(##|#_)(.)+`,'g')		
		}
		var injectCfg = {
			_移除plog:0,
			_重覆操作:1,
			_連續操作:2,
			_復原:3
		}
		var _fn ={
			chkFile(file,cb=null){
				var isExists = fs.existsSync(file);
				if (isExists && cb !=null){
					cb(file);
				}
				return isExists;
			},
			_移除plog(){
				inject.list.forEach(file => {
					var _plog = ext_ut.Plog(file);
					if (_plog!=null)_plog.remove()
				});
			},
			_復原(){
				inject.list.forEach(file => {
					var _plog = ext_ut.Plog(file);
					if (_plog!=null)_plog.reverse()
				});
			},
			parsePart(){
				if (_.isPlainObject(Part)){
					Part = [Part];
				}else{
					Part = Part.map(el=>{
						var _json = include(el,{Src});
						return JSON.parse(_json);
					})
				}
				var _Part = {};
				for(var _partCfg of Part){
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
					get_plog(){
						return 
					},
					Part:[]
				};
				arg
				return arg;
			},
			parseInject(file){
				var _ejs = `${file}.ejs`;
				var isReinject = fs.existsSync(_ejs);
				var _file = isReinject ?_ejs : file;
				var _base = fs.readFileSync(_file).toString();
				var points = _base.match(_Reg.Point)||[];
				var _arg = {
					mode,
					file,
					points:points.map(_fn.parsePoint),
					get_plog(){
						return ext_ut.Plog(this.file);
					}
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
		}
		var Point = inject.list.map(_fn.parseInject) ;
		Part =　_fn.parsePart();
		Part
		//var z = Point[0].points[0].get_plog();
		
		console.log({ Point});
	},
	Inject_(Point){
		// var ext_ut = $.ext_ut;
		// let {fs} = $.ext_ut;
		var _fn = {
			inject_point(base,Cfg){
				var data = Cfg.Part;
				if (data == null) return base;
				if (_.isArray(data)){
					data = data.join('\r\n');
				}
				var _code = data.split('\r\n').join(`\r\n${Cfg.tabs}`);
				if (Cfg.isInjectAfter){
					_code = `${Cfg.point}\r\n${Cfg.tabs}${_code}`;
				}else{
					_code = `${Cfg.tabs}${_code}\r\n${Cfg.point}`;
				}
				base = base.replace(Cfg.point,_code);
				return base;
			},
			inject_file(injectCfg){
				let {mode= ext_ut.injectCfg._預設} = injectCfg;
				var _ejs = `${injectCfg.file}.ejs`;
				var isReinject = fs.existsSync(_ejs);
				var _target = isReinject ? _ejs : injectCfg.file;
				if (!isReinject){
					fs.copyFileSync(injectCfg.file,_ejs);
				}else{ 
					switch(mode){
						case ext_ut.injectCfg._刪除EJS:
							return _fn.remove_ejs(_ejs);
							break;
						case ext_ut.injectCfg._連續:
							//console.log({mode,file:injectCfg.file,_ejs});
							fs.copyFileSync(injectCfg.file,_ejs);
							break;
					}
				}
				
				var _base = fs.readFileSync(_target).toString();
				for(var point of injectCfg.matchs){
					_base = _fn.inject_point(_base,point);
				}
				ext_ut.writeFile(`${injectCfg.file}`,_base);
			},
			remove_ejs(file){
				fs.unlinkSync(file);
			}
		}
		for (var _item of Point){
			_fn.inject_file(_item);
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
			let {mode = 0} = injectCfg;
			var _ejs = `${file}.ejs`;
			var isReinject = fs.existsSync(_ejs);
			var _file = isReinject ?_ejs : file;
			var _base = fs.readFileSync(_file).toString();
			switch(mode){
				case ext_ut.injectCfg._復原:
					if (isReinject){
						fs.unlinkSync(file);
						fs.renameSync(_ejs,file);
					}
					break;
				default:
					var _matchs = _base.match(_reg)||[];
					var _arg = {
						mode,
						file,
						matchs:_matchs.map(_fn.parseInjectPoint)
					}
					arr.push(_arg);
					break;
			}
			
		}
		return arr;
	},
	
	

	async ssplit(Cfg){
		var _tpl = (key)=>{ return `{{tpl}}`};
		let chk_Path = fs.existsSync(Cfg.ExpPath);
			if (!chk_Path){ 
				fs.mkdirSync(Cfg.ExpPath);
			}
		var _base = await fs.readFileSync(Cfg.Src);
		_base = _base.toString();

		var _list = _base.match(/##(\s\S|[^##])+@#/g);
		var _cfg = {}
		_.each(_list,(el,idx)=>{
			let [key] = el.match(/##.+/);
			key = key.replace("##","");
			_base = _base.replace(el,_tpl(key));
			var _fileName = `${Cfg.ExpPath}${key}.ejs`;
			var _arr = el.split('\n');
			_arr.shift();
			_arr.pop();
			el = _arr.join('\n');
			ext_ut.writeFile(el,`${_fileName}`);
			_cfg[key]=el;
		})
		ext_ut.writeFile(_base,`${Cfg.ExpPath}Main.ejs`);
		ext_ut.writeFile(_cfg,`${Cfg.ExpPath}~Cfg.json`);
	},
	parsePartCode(Src,part){
		var arr = [];
		arr.push(JSON.stringify(Src,null,4));
		_.each(part,(v,k)=>{
			arr.push(`\r\n[${k}]`);
			var _arr =  v.map(el=>{return el});
			arr = arr.concat(_arr);
		})
		return arr.join('\r\n');
	},
	parsePartCfg($,Src,include,relPath="./"){
		var arr = [];
		let {Part} = $.data;
		var isPart = Part != null;
		var _path = $.resolvePath(`${relPath}/_part.cfg`);
		var _cfg = isPart 
			? Part
			: JSON.parse(include(_path,{Src}));
		_.each(_cfg,(v,k)=>{
			if ($._.isString(v)){
				v = [v];
			}
			_cfg[k] = v.map(el=>{
				var _ejs = $.resolvePath(`${relPath}/${el}`);
				return include(_ejs,Src);
			})
		})
		return _cfg;
	},
	 
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

_.each(_test,(e,k)=>{
	if (k.substr(0,1)=="*"){
		e();
	}
})
module.exports = {ext_ut}