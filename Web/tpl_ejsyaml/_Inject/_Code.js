let {fs,_,moment,ejs,} = $.ext_ut;//##_Inject----------------------------------------
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
