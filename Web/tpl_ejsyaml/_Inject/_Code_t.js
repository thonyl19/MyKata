const _ = require('lodash');
const path = require( "path");
const ejs = require('ejs');
const moment = require('moment');
const fs = require('fs');
const { testHelper,testFN} = require('_test/testHelper');

//##_Inject----------------------------------------
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
var _Code = {
	v20210625(){

	}
}
var _Code_fn = {
	genCode_Inject(){
		var _file = path.resolve("tpl_ejsyaml/_Inject/_Code_t.js");
		_file
		var _tar =  path.resolve("tpl_ejsyaml/_Inject/_Code.js");
		var _key = '//##_Inject----------------------------------------';
		var _code = fs.readFileSync(_file).toString();
		var arr = _code.split(_key);
		arr.shift()
		arr.pop();
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
	B02(){
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

	}
}

testFN.v20210615.Qoka("./tpl_ejsyaml/_Inject/_Code/~v20210625/",[_Code_v20210615,_Code_fn_v20210615]
   //,/A03/gi
);