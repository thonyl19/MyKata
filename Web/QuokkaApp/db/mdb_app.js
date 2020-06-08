const path = require("path");
const ADODB = require("node-adodb");
var _ = require("lodash");
const util = require("util");
const strip = require('sql-strip-comments');
var ut = {
	//http://shamansir.github.io/JavaScript-Garden/#types.typeof
	is(type, obj) {
		let clas = Object.prototype.toString.call(obj).slice(8, -1);
		return obj !== undefined && obj !== null && clas === type;
	},

	fmtSQLDate(value){
		if (ut.is('Date', value)) {
			let year = value.getFullYear(),
				month = value.getMonth() + 1,
				day = value.getDate(),
				hours = value.getHours(),
				minutes = value.getMinutes(),
				seconds = value.getSeconds();

			value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		}

		return value;
	},

	// http://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
	escapeSql (val) {
		if (ut.is(val) === 'String') {
			val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
				switch (s) {
					case "\0":
						return "\\0";
					case "\n":
						return "\\n";
					case "\r":
						return "\\r";
					case "\b":
						return "\\b";
					case "\t":
						return "\\t";
					case "\x1a":
						return "\\Z";
					case "'":
						return "''";
					case '"':
						return '""';
					default:
						return "\\" + s;
				}
			});
		}

		return val;
	},

	// named parameters
	queryFormat (sql, values) {
		sql = strip(sql);

		// if (!values) return sql;

		//TODO не заменять параметры внутри текстовых литералов
		return sql.replace(/:(\w+)/g, function (txt, key) {
			let res;
			if (values && values.hasOwnProperty(key)) {
				if (
					(values[key] === null)
					|| (values[key] === undefined)
					|| (values[key] != values[key]) // is NaN
				) {
					res = 'NULL';
				} else if (ut.is('Date', values[key])) {
					res = `#${ut.fmtSQLDate(values[key])}#`;
				} else {
					res = ut.escapeSql(values[key]);
					if (ut.is('String', res)) {
						res = "'" + res + "'"
					}
				}

				return res;
			}
			return txt;
		});
	}

}


var _base = {
	Conn:{
		async v2020607(cfg) {
			var cts = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${cfg.filePath};Persist Security Info=False;`;
			return ADODB.open(cts);
		}
	},
	Exec:{
		async v2020607(sql){
			let {_App,cfg} = this;
			//cfg
			//mdb_app.jsconsole.log(_App);
			var db = await _App.Conn(cfg);
			return await db.query(sql);
		}
	},
	Prep:{
		v2020607(sql,arg,def={}){
			arg = _.merge(def,arg);
			let {_App} = this;
			return _App.parsePrep(this,sql,arg);
		}
	},
	parseCode:{
		v2020607: ut.queryFormat
	},
	parsePrep:{
		v2020607(curDB,sql,arg){
			//console.log({curDB});
			return {
				curDB,
				get Code(){
					return curDB._App.parseCode(sql,arg);
				},
				async exec(){
					//console.log({Code:this.Code}); 
					return await curDB.Exec(this.Code);
				}
			}
		}
	},
	parseCfg:{
		v2020607(cfg,base){
			cfg = cfg!=null
				? cfg
				:{
					cfg:{
						filePath:path.join(__dirname,'./_demo.mdb')
					}
				};
			var r =  _.merge(cfg,base);
			return r;
		}
	}
}

let mdbApp = {
	v2020607:{
		parseCode:_base.parseCode.v2020607,
		parsePrep:_base.parsePrep.v2020607,
		parseCfg:_base.parseCfg.v2020607,
		Conn:_base.Conn.v2020607,
		Init(){
			var _App = mdbApp.v2020607;
			return _App.parseCfg(this,
			{
				_App,
				Exec:_base.Exec.v2020607,
				Prep:_base.Prep.v2020607,
			})
		}
	}
}
var mdb_demo = {
	Init:mdbApp.v2020607.Init,
	cfg:{
		filePath:path.join(__dirname,'./_demo.mdb')
	},
	User:{
		def:{
			UserId:null
		},
		Select(arg={},isTest=false){
			var sql = `
			select 	* 
			from Users 
			where 	:UserId is null
					OR (:UserId <> null 
						And  UserId =:UserId)
			`;
			return mdb_demo.Prep(sql,arg,this.def);
		}
	},
	Log:{
		Select(arg={},isTest=false){
			var sql = `
			select 	* 
			from 	Log 
			`;
			return mdb_demo.Prep(sql,arg,this.def);
		} 
	}
}.Init();


var t = {
	async 'A'(){
		r= "_A"
		var db = mdbApp.v2020607.Init();
		//console.log(db)
		var r = await db.Exec('select * from Users');
		r;
	},
	async 'B'(){
		var db = mdbApp.v2020607.Init();
		var arg = {
			A:'test'
		}
		var r = await db.Prep('select :A as A',arg).exec();
		r
	},
	async 'C'(){
		mdb_demo;
		var z = await mdb_demo.User.Select().exec();
		console.log({z});
		
		var arg = {UserId:1};
		var z1 = await mdb_demo.User.Select(arg).exec();
		z1
	},
	async '_C1'(){
		mdb_demo;
		var z = await mdb_demo.Log.Select().exec();

		
		console.log({z});
		
	}
}
// _.each([t],fn=>{
// 	_.each(fn,(e,k)=>{
// 		if (k.substr(0,1)=="_"){
// 			e();
// 		}
// 	})
// })

 

module.exports = {
	mdbApp
};