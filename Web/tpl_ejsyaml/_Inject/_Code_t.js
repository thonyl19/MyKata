const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
const { testHelper,testFN} = require('_test/testHelper');
var $ = {
	isTest:true,
	input:"p:\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\gt_UI\\form\\Basic",
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
		string(filed){return ``},
		int(filed){return ''},
		date(filed){return `<el-date-picker type="date" class="eui-fix" v-model="form.${filed.Name}">\r\n\t</el-date-picker>`},
		float(filed){return ''},
		array(filed){return `<el-input type="textarea" v-model="form.${filed.Name}" rows="3">\r\n\t</el-input>`},
		boolean(filed){return ``},
	},
	map_GTForm_Col(){
		return  _.extend({}, _enum.map_UI, {
			string(filed){return `<input type=text "form.${filed.Name}" />`},
		})
	}
}

var _Part_ver = {
	gnePartCfg:{
		tpl_resolvePath:"`@{@.resolvePath('${val}')}`",
		tpl_include:"`@{@.resolvePath('${val}')}`",
		relateTplPath:"`@{_Code.V202106.relateTplPath('${val}')}`",
		v20210627(json,RootPath=""){
			let {render} = $;
			//搭配 isTest ,解決 include 在測試和正式 情境中, 非同步的處理問題
			let {isTest=false} = $;
			var _tplA = _.template('"${key}":[${list}],');
			var _tplB = _.template(_Part_ver.gnePartCfg.relateTplPath );
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
			var _file = _Code_ver.relateTplPath('./_Inject/_InjectPart.ejs');
			if (isTest){
				return include(_file, {Src});
			}
			var r = $.render(_file,'_part.cfg', {Src});
			return r;
		}
	},
	parseCode:{
		v20210627(partCfg,Src,isTest=false){
			var _TestLog = [JSON.stringify(Src,null,4)];
			if (_.isPlainObject(partCfg)==false){
				var _part =  include(partCfg);
				_TestLog.push(`[PartCfg]\r\n${_part}`);
				partCfg = JSON.parse(_part);
			}
			var _result = {} 
			_.each(partCfg,(val,key)=>{
				_TestLog.push(`[${key}]`);
				var arr_Code  = val.map(el=>{
					return include(el,Src);
				})
				_result[key] = arr_Code;
				_TestLog.push(arr_Code.join('\r\n'));
			}) 
			if (isTest) return _TestLog;
			return _result;
		}
	}

}
var _Part = {
	V202106:{
		gnePartCfg:_Part_ver.gnePartCfg.v20210627,
		parseCode:_Part_ver.parseCode.v20210627
	},
}


var _Code_ver = {
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
	relateTplPath(file,KeyPath=''){
		let {input} = $;
		input
		var reg = new RegExp(``,'gi');
		var [Root=""] = input.match(/(.)+tpl_ejsyaml(\\|\/)/gi)||[]
		Root
		return `${Root}${file}`;
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
		v20210626(Name,Src,_filed){
			let {I18nPrefix,map_UI=_enum.map_UI} = Src;
			var _self = this;
			return {
				label :_Code_ver.parse_label.v20210625(Name,I18nPrefix),
				get Input(){
					return _Code_ver.parse_UI.v20210626(_filed,map_UI);
				}
			}
		}
	},
	parse_UI:{
		v20210626(_filed,map_UI){
			var UI = "";
			let _fn = map_UI[_filed.Code.map_type.JS];
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
			let {row} = arg;
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
								return  _Code_ver.HTML.v20210626(Name,arg,_self)
							},
							get map_type(){
								return _Code_ver.map_type.v20210626(_self);
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
					,label :_Code_ver.parse_label.v20210625(Name,I18nPrefix)
				};
				_Code_ver.parse_UI.v20210625(_filed)
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

var _Code = {
	V202106:{
		relateTplPath:_Code_ver.relateTplPath,
		parseRow:_Code_ver.parseRow.v20210626
	}
}

//##_Inject----------------------------------------
 
var _Code_v20210615 = {
	A01(){
		/*Line to Code */

	}
}

var _Code_fn_v20210615 = {
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
			var t = _Code_ver.JsonCode.v20210625(_list[key]);
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
		var _r = _Code_ver.parseRow.v20210626(_t);
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
		var _r = _Code_ver.parseRow.v20210625(_t);
		this._be(_r).T();		

	},

 

}

var _Part_V202106 = {
	A01:[function(){
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
		var _r = _Part.V202106.gnePartCfg(r,"");
		this._be(_r).T(); 
		
	},"",testHelper.FileType.txt],
	A02(){
		/*
		測試 parseRow
		*/
		var Src ={
			"row": {
				"ROUTE_NO": "C030-19",
				"ROUTE": "?面?极板（子流程）",
				"ROUTE_CATEGORY": "R",
				"DESCRIPTION": "",
				"ENABLE_FLAG": true
			},
		} 
		_Code.V202106.parseRow(Src);
		this.be(Src).T();
	},

	A031:[function(){
		var Src = _Part_V202106.A02.src();
		var Cfg = {
			"Html_Code": [
				$.resolvePath('../mvc_gti/gt_UI/form/gt_form_col.ejs')
			]
		}
		var _r = _Part.V202106.parseCode(Cfg,{Src},true).join('\r\n');
		this._be(_r).T();

		var _r1 = _Part.V202106.parseCode(Cfg,{Src});
		_Part_V202106._A032.be(_r1).T();

		//測試使用自定義的 map_UI	
		Src = _Code.V202106.parseRow(Src);
		Src.map_UI = _enum.map_GTForm_Col();
		var _使用自定義 = _Part.V202106.parseCode(Cfg,{Src},true).join('\r\n');
		_Part_V202106._A033.be(_使用自定義).T();

	},"",testHelper.FileType.txt],
	_A032:[testHelper.FileType.json,"PartCode"],
	_A033:[testHelper.FileType.txt,"map_GTForm_Col"],
}

testFN.v20210615.Qoka("./tpl_ejsyaml/_Inject/_Code/~v20210625/",[_Code_v20210615,_Code_fn_v20210615]
   //,/A03/gi
);
testFN.v20210615.Qoka("./tpl_ejsyaml/_Inject/_Part/~v202106/",[_Part_V202106]
   //,/A03/gi
);
_Code_ver.genCode_Inject();
 