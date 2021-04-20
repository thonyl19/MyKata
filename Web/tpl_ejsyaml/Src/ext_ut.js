"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//exports.generateTemplate = exports.CancelError = void 0;

const Path = require("path");
const ejs = require("ejs");
const _ = require("lodash");
var iconv = require('iconv-lite');
const fs = require("fs");
var ext_ut = {
	writeFile(path,data,isBig5=false){
		if (options.isBig5){
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
	ssplit(){
		var _tpl = (key)=>{ return `<%_ Src.ut.echo_file('~${key}.txt',(el)=>{ _%>
			<%- el %><% }) %>`};
		var Cfg = {
			Src:`./MVC/gti/SequenceNum.cshtml`,
			ExpPath:ext_ut.ts_BasePath('Page/Test/')
		}
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
			_arr.pop()
			el = _arr.join('\n');
			ext_ut.writeFile(el,`${_fileName}`);
			_cfg[key]=el;
		})
		ext_ut.writeFile(_base,`${Cfg.ExpPath}Main.ejs`);

		//ops.save(_base,`${Cfg.ExpPath}Main.ejs`,false)
		//ops.testJson(_cfg)
	}

}
module.exports = {};