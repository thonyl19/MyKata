﻿const _ = require('lodash');
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
	
	Inject(injectCfg,part){
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

module.exports = {ext_ut}