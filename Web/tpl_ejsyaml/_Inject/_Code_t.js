const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
const { testHelper,testFN} = require('_test/testHelper');
var $ = {
	isTest:true,
	ext_ut:{
		//include1:resolveInclude,
		include(ejs_file,data={}){
			var _ejs = fs.readFileSync(ejs_file).toString();
			return ejs.render(_ejs,data);
		},
		include1(ejs_file,data={},cb=()=>{}){
			ejs.renderFile(ejs_file,data).then(r=>{
				cb(r);
			});
		},
		Path:path.resolve
	}
	,resolvePath(file){
		return path.resolve(`./tpl_ejsyaml/_Inject/${file}`);
	}
	,render(){
        // const input = this.resolvePath(inputPath);
        // const output = this.resolvePath(outputPath);
	}
}
//##_Inject----------------------------------------
let {include,Path} = $.ext_ut;
 
var _enum = {
	map_csharpType: {
		"string":"string",
		"int":"int",
		"float":"decimal",
		"array":"object[]",
		"date":"date",
		"boolean":"bool",
	},
	map_UI : {
		string(filed){return `<input type=text "form.${filed.Name}"/>`},
		int(filed){return ''},
		date(filed){return `<el-date-picker type="date" class="eui-fix" v-model="form.${filed.Name}">\r\n\t</el-date-picker>`},
		float(filed){return ''},
		array(filed){return `<el-input type="textarea" v-model="form.${filed.Name}" rows="3">\r\n\t</el-input>`},
		boolean(filed){return ``},
	},
}
var _Part = {
	gnePartCfg:{
		tpl_resolvePath:"`@{@.resolvePath('${val}')}`",
		tpl_include:"`@{@.resolvePath('${val}')}`",
		v20210627(json,cb=null){
			let {render} = $;
			//搭配 isTest ,解決 include 在測試和正式 情境中, 非同步的處理問題
			let {isTest=false} = $;
			var _tplA = _.template('"${key}":[${list}],');
			var _tplB = _.template(_Part.gnePartCfg.tpl_resolvePath);
			var Src = [];
			_.each(json,(val,key)=>{ 
				var list = [];
				if (Array.isArray(val)){
					list = val.map(el=>{
						return _tplB({val:el}).replace(/@/gi,'$')
					})
				}else{
					list.push(_tplB({val}).replace(/@/gi,'$'));
				}
				var x = _tplA({key,list:list.join(',')})
				Src.push(x);
			})
			var _file = $.resolvePath('./_InjectPart.ejs');
			if (isTest){
				return include(_file, {Src},cb);
			}
			var r = $.render(_file,'_part.cfg', {Src});
			return r;
		}
	},
	v20210627(partCfg,Src,isTest=false){
		var _Test = [JSON.stringify(Src,null,4)];
		if (_.isPlainObject(partCfg)==false){
			var _part =  include(partCfg);
			_Test.push(`[PartCfg]\r\n${_part}`);
			partCfg = JSON.parse(_part);
		}
		var _r = {}
		_.each(partCfg,(v,k)=>{
			_Test.push(`[${k}]`);
			var r  = v.map(el=>{
				return include(el,Src);
			})
			_r[k] = r;
			_Test.push(r.join('\r\n'));
		}) 
		if (isTest) return _Test;
		return _r;
	}

}
var _Code = {
	v20210625(){

	}
}
var _Code_fn = {

	view(code){
		if (_.isPlainObject(code)){
			return JSON.stringify(code,null,4);
		}else if (Array.isArray(code)){
			return code.join('\r\n');
		}
		return code;
	},
	genCode_Inject(){
		var _file = $.resolvePath("_Code_t.js");
		_file
		var _tar =  $.resolvePath("_Code.js");
		var _key = '//##_Inject----------------------------------------';
		var _code = fs.readFileSync(_file).toString();
		var arr = _code.split(_key);
		arr.shift()
		arr.pop(); 
		arr.unshift(`let {fs,_,moment,ejs,} = $.ext_ut;`);
		fs.writeFileSync(_tar,arr.join(_key));
	},
	map_type:{
		v20210626(_filed){
			let {Val} = _filed;
			var JS = typeof(Val);
			switch(JS){
				case "object":
					if (Val === null){
						JS = 'string';
					} else  if (Array.isArray(Val)){
						JS = 'array';
					} else if (_.isPlainObject(Val)){
						JS = 'json';
					}
					break;
				case "string":
					if (moment(Val).isValid()){
						JS = "date";
					}
					break;
				case "number":
					JS =_.isInteger(Val)
						?"int"
						:"float" 
					break;
				default:
					break;
			}
			return {
				JS,
				csharp:_enum.map_csharpType[JS]
			}
		}
	},
	HTML:{
		v20210626(Name,I18nPrefix,_filed){
			var _self = this;
			return {
				label :_Code_fn.parse_label.v20210625(Name,I18nPrefix),
				get Input(){
					return _Code_fn.parse_UI.v20210626(_filed);
				}
			}
		}
	},
	parse_UI:{
		v20210626(_filed){
			var UI = "";
			let _fn = _enum.map_UI[_filed.Code.map_type.JS];
			if (_fn!=null){
				UI = `${_fn(_filed)}`;
			}
			return UI;
		},
		v20210625(filed){
			var UI = "";
			let _fn = _enum.map_UI[filed.map_type.JS];
			if (_fn!=null){
				UI = `${_fn(filed)}`;
			}
			filed.UI = UI;
		}
	},
	parse_label:{
		v20210625(Name,Prefix){
			var _Prefix =  _.isEmpty(Prefix)?"i18n.":Prefix;
			return `${_Prefix=="i18n."?':':''}label="${_Prefix}${Name}"`;
		},
	},
	parseRow:{
		v20210626(arg,setPath = 'Fileds'){
			let {row,I18nPrefix} = arg;
			if (row==null) return ;
			var fields = [];
			for(var Name in row){
				var Val = row[Name];
				var _filed = {
					Name
					,Val
					,get Code(){
						var _self = this;
						return {
							get HTML(){
								return  _Code_fn.HTML.v20210626(Name,I18nPrefix,_self)
							},
							get map_type(){
								return _Code_fn.map_type.v20210626(_self);
							}
						}
					}
				};
				fields.push(_filed);
			}
			_.set(arg, setPath, fields);
			return arg;
		},
		/*
		移植自 D:\A\Code\github\MyKata\MyKata_Web\Web\tpl_ejsyaml\_Inject\ext_ut.js
		isZip)將資料壓縮
		 */
		v20210625(arg,setPath = 'Fileds'){
			let {row,I18nPrefix} = arg;
			if (row==null) return ;
			var fields = [];
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
						csharp:_enum.map_csharpType[JS]
					}
					,label :_Code_fn.parse_label.v20210625(Name,I18nPrefix)
				};
				_Code_fn.parse_UI.v20210625(_filed)
				fields.push(_filed);
			}
			_.set(arg, setPath, fields);
			return arg;
		}
	},
	JsonCode:{
		/*
		移植自 D:\A\Code\github\MyKata\MyKata_Web\Web\Vue_Prd\Vue_Utility.js
		isZip)將資料壓縮
		 */
		v20210625(val,isZip=false){
			var _r ={
				_:null,
				isObj:false,
				isZip,
				get val(){
					return this._;
				},
				set val(o){
					this._ = o;
					try {
						if (_.isString(o)){
							this._ = JSON.parse(o);
						}
					} catch (error) {
						
					}
					this.isObj = _.isPlainObject(this._);
				},
				toJsonStr(isZip=this.isZip){
					if (this.isObj){
						var _r  = isZip
							? JSON.stringify(this._)
							: JSON.stringify(this._,null,'\t');
						return _r;
					}
					return null;
				}
			}
			_r.val = val;
			return _r;
		}
	}
}
//##_Inject----------------------------------------
 
var _Code_v20210615 = {
	A01(){
		/*Line to Code */

	}
}

var _Code_fn_v20210615 = {
	B00(){ 
		_Code_fn.genCode_Inject();
	},
	B01(){
		/*JsonCode
		*/
		var _list = {
			"null":null,
			"空字串":"",
			"Json":`{"A":"a"}`
		}
		var _t = {};
		for (var key in _list){
			var t = _Code_fn.JsonCode.v20210625(_list[key]);
			_t[key] = {
				t,"toJsonStr":t.toJsonStr(true)
			}
		}
		this.be(_t).T();
	},
	B020(){
		/*parseRow 
		*/
		var _t ={
			row: {
				"string":"string",
				"int":1,
				"float":1.5,
				"array":[],
				"date":"2020-10-15 17:56:21",
				"boolean":true,
			}
		}
		var _r = _Code_fn.parseRow.v20210626(_t);
		this._be(_r).T();		

	},
	B021(){
		/*parseRow 
		*/
		var _t ={
			row: {
				"string":"string",
				"int":1,
				"float":1.5,
				"array":[],
				"date":"2020-10-15 17:56:21",
				"boolean":true,
			}
		}
		var _r = _Code_fn.parseRow.v20210625(_t);
		this._be(_r).T();		

	},
	B03:[function(){
		/*
		gnePartEJS 將 _Part.ejsyaml 中的 part 設定,轉出成 _part.js
		*/
		var r = {
			"Html_Code": "../gt_form",
			"Vue_Data": [
				"../form",
				"../../../piece/Vue_Data/i18n"
			],
			"Vue_Methods": "Vue_Methods"
		}
		_Part.gnePartCfg.v20210627(r,(_r)=>{
			this._be(_r).T(); 
		});
		
	},"",testHelper.FileType.txt],
	B041:[function(){
		var Src ={
			"row": {
				"ROUTE_NO": "C030-19",
				"ROUTE": "?面?极板（子流程）",
				"ROUTE_CATEGORY": "R",
				"DESCRIPTION": "",
				"ENABLE_FLAG": true
			},
			"Fileds": [
				{
					"Name": "ROUTE_NO",
					"val": "C030-19",
					"map_type": {
						"JS": "string",
						"csharp": "string"
					},
					"label": ":label=\"i18n.ROUTE_NO\""
				},
				{
					"Name": "ROUTE",
					"val": "?面?极板（子流程）",
					"map_type": {
						"JS": "string",
						"csharp": "string"
					},
					"label": ":label=\"i18n.ROUTE\""
				},
				{
					"Name": "ROUTE_CATEGORY",
					"val": "R",
					"map_type": {
						"JS": "string",
						"csharp": "string"
					},
					"label": ":label=\"i18n.ROUTE_CATEGORY\""
				},
				{
					"Name": "DESCRIPTION",
					"val": "",
					"map_type": {
						"JS": "string",
						"csharp": "string"
					},
					"label": ":label=\"i18n.DESCRIPTION\""
				},
				{
					"Name": "ENABLE_FLAG",
					"val": true,
					"map_type": {
						"JS": "boolean",
						"csharp": "bool"
					},
					"label": ":label=\"i18n.ENABLE_FLAG\""
				}
			],
			"ext_mode": {
				"ENABLE_FLAG": true
			}
		} 
		
		//_Code_fn_v20210615.B01.src();
		var Cfg = {
			"Html_Code": [
				"d:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\gt_UI\\form\\gt_form_col.ejs"
			]
		}
		var _r = _Part.v20210627(Cfg,{Src},true).join('\r\n');
		this._be(_r).T();
	},"",testHelper.FileType.txt],
 

}

testFN.v20210615.Qoka("./tpl_ejsyaml/_Inject/_Code/~v20210625/",[_Code_v20210615,_Code_fn_v20210615]
   //,/A03/gi
);