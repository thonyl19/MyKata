const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
var ext_ut = {
	map_csharpType: {
		"string":"string",
		"int":"int",
		"float":"decimal",
		"array":"object[]",
		"date":"date",
		"boolean":"bool",
	},
	map_UI : {
		int(filed){},
		date(filed){return `<el-date-picker type="date" class="eui-fix" v-model="form.${filed.Name}">\r\n\t</el-date-picker>`},
		float(filed){},
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
		let {row,Prefix} = arg;
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
				,label :ext_ut.parse_label(Name,Prefix)
			};
			ext_ut.parse_UI(_filed)
			fileds.push(_filed);
		}
		_.set(arg, setPath, fileds);
		return arg;
	},
	async parsePart(Src){
		console.log({Src});
		let {point={},part=[]} = Src;
		await _.each(part,async(el)=>{
			var _part = ext_ut.ts_BasePath(`${el}/part.ejs`);
			console.log({_part});
			let chk_Path = fs.existsSync(_part);
			if (chk_Path){
				var _code  = await ejs.renderFile(_part, {Src});
				console.log(typeof(_code));
				_code
				if (_code=="") return ;
				_code = JSON.parse(_code);
				_code
				_.each(_code,async (v,k)=>{
					v
					var _map = point[k];
					var arr = v.split('\r\n');
					arr
					point[k] = _map == null
						?arr
						: _.concat(point[k],arr)
						;
				})
			}
		})
		point
		_.set(Src,'point',point);
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
	chkDirPath(DirPath,autoMK = true){
		let chk_Path = fs.existsSync(DirPath);
		if (!chk_Path && autoMK){ 
			fs.mkdirSync(DirPath);
		}
		return chk_Path;		
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
}

module.exports = {ext_ut}