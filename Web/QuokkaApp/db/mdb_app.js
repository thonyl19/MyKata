//https://github.com/d-band/koa-mapper

const path = require("path");
const ADODB = require("node-adodb");
var _ = require("lodash");
const util = require("util");
const strip = require('sql-strip-comments');
const { parse } = require("path");
const moment = require('moment');


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
		values
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


//資料庫基礎程序
var _base = {
	//Connect 
	Conn:{
		v2020607(cfg) {
			//cfg
			var cts = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${cfg.filePath};`;
			//var cts = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${cfg.filePath};Persist Security Info=False;`;
			return ADODB.open(cts);
		}
	},
	//執行查詢
	Exec:{
		async v2020607(sql){
			sql
			let {Conn,cfg}  = this;
			console.log({Conn,cfg})
			//mdb_app.jsconsole.log(_App);
			return await Conn(cfg).execute(sql);
		},
		async v20210117(sql,isUpdate){
			sql
			let {Conn,cfg}  = this;
			console.log({Conn,cfg})
			if (isUpdate){
				return await Conn(cfg).execute(sql);
			}
			return await Conn(cfg).query(sql);
		}
	},
	//參數對映程序
	Prep:{
		v2020607(sql,arg,def={}){
			var curDB=this;
			return {
				curDB,
				get Code(){
					var _arg = _.merge(def,arg);
					//console.log({def,arg,_arg});
					return _base.parseCode.v2020607(sql,_arg);
				},
				async exec(){
					//console.log({Code:this.Code}); 
					return await curDB.Exec(this.Code);
				}
			}
		},
		//因應 Update 的處理需求 
		v20210117(sql,arg,def,isUpdate=false){
			var curDB=this;
			return {
				curDB,
				get Code(){
					var _arg = _.merge(def,arg);
					return _base.parseCode.v2020607(sql,_arg);
				},
				async exec(){
					return await curDB.Exec(this.Code,isUpdate);
				}
			}
		}
	},
	ViewTable:{
		async v20201125(tableName){
			var sql = `select * from ${tableName};`;
			return await this.Exec(sql);
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
		/*
		增加轉出 Views 的功能
		 */
		v20201125(dbApp,baseFn){
			let {Views} = dbApp;
			if (Views!=null){
				_.each(Views,(view)=>{
					var _target = dbApp[view]
					var isNotHas = _target !=null;
					 
				})
			}
			var r =  _.merge(dbApp,base);
			return r;
		},
		v2020607(cfg,base){
			var r =  _.merge(cfg,base);
			//console.log({'parseCfg_v2020607':r});
			return r;
		},
		

	}
}

let mdbApp = {
	v2020607:{
		//資料物件初始化程序
		Init(cfg){
			var _App = mdbApp.v2020607;
			var _self = this;
			if (cfg!=null) _self.cfg = cfg;
			//console.log({'v2020607.Init':_self});
			return _base.parseCfg.v2020607(_self,
			{
				Conn:_base.Conn.v2020607,
				Exec:_base.Exec.v2020607,
				Prep:_base.Prep.v2020607,
				ViewTable:_base.ViewTable.v20201125,
			})
		}
	},
	v20210117:{
		//資料物件初始化程序
		Init(cfg){
			var _App = mdbApp.v2020607;
			var _self = this;
			if (cfg!=null) _self.cfg = cfg;
			//console.log({'v2020607.Init':_self});
			return _base.parseCfg.v2020607(_self,
			{
				Conn:_base.Conn.v2020607,
				Exec:_base.Exec.v20210117,
				Prep:_base.Prep.v20210117,
				ViewTable:_base.ViewTable.v20201125,
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
			UserSId:null
		},
		Select(arg={},isTest=false){
			//console.log(arg);
			var sql = `
			SELECT 	* 
			FROM	[User] 
			WHERE	:UserSId is null
					OR (:UserSId is not null 
						And  UserSId =:UserSId)
			`;

			return mdb_demo.Prep(sql,arg,this.def);
		}
	},
	Log:{
		Select(arg={},isTest=false){
			//console.log( this.def);
			var sql = `
			SELECT 	* 
			FROM 	Log 
			`;
			return mdb_demo.Prep(sql,arg,this.def);
		} 
	},
	Ping:{
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM 	Ping 
			`;
			return mdb_demo.Prep(sql,arg,this.def);
		}
	},
	Opction:{
		def:{
			grp_type:null
		},
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM 	Opction 
			WHERE	:grp_type is null
					OR (:grp_type is not null 
						And  grp_type =:grp_type)
			`;
			return mdb_demo.Prep(sql,arg,this.def);
		}
	},
}.Init();

var mdb_demo1 = {
	Init:mdbApp.v20210117.Init,
	cfg:{
		filePath:path.join(__dirname,'../../../_demo.mdb')
	},
	User:{
		def:{
			UserSId:null
		},
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM	[User] 
			WHERE	:UserSId is null
					OR (:UserSId is not null 
						And UserSId = :UserSId)
			`;
			let {UserSId} = arg;
			if (UserSId!=null){
				arg.UserSId = parseInt(UserSId);
			}
			return mdb_demo1.Prep(sql,arg,this.def);
		}
	},
	Log:{
		def:{
			LogSID:null
		},
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM 	Log 
			WHERE	:LogSID is null
					OR (:LogSID is not null 
						And LogSID = :LogSID)
			`;
			let {LogSID} = arg;
			if (LogSID!=null){
				arg.LogSID = parseInt(LogSID);
			}
			return mdb_demo1.Prep(sql,arg,this.def);
		},
		Update(arg={},isTest=false){
			var sql = `
			UPDATE	Log 
			SET		TaskSID = :TaskSID,
					[note] = :note,
					work_times = :work_times,
					start_time = :start_time,
					end_time = :end_time,
					Loger = :Loger,
					mapSID = :mapSID,
					flag = :flag
			WHERE	LogSID = :LogSID
			`;
			
			arg.LogSID = parseInt(arg.LogSID);
			arg.work_times = moment(arg.work_times).toDate();
			arg.start_time = moment(arg.start_time).toDate();
			arg.end_time = moment(arg.end_time).toDate();
			console.log(arg);
			return mdb_demo1.Prep(sql,arg,this.def,true);
		},
	},
	Ping:{
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM 	Ping 
			`;
			return mdb_demo1.Prep(sql,arg,this.def);
		}
	},
	Opction:{
		def:{
			grp_type:null
		},
		Select(arg={},isTest=false){
			var sql = `
			SELECT 	* 
			FROM 	Opction 
			WHERE	:grp_type is null
					OR (:grp_type is not null 
						And  grp_type =:grp_type)
			`;
			return mdb_demo1.Prep(sql,arg,this.def);
		}
	},
}.Init();

var t = {
	async '動態指定DB'(){
		/*
		在這個案例中碰到一個很奇怪的問題,
		_demo.mdb 怎麼弄都無法調用成功, 但 官網的 node-adodb.mdb 就可以 ,
		但是相同的使用程序 ,在 [使用 mdb_demo.TableFunction] 就可以正常的 work ,
		經研判,應該是該表 有問題才會造成無法成功讀取,
		後來無意間猜想,會不會是有名稱上衝突的問題,故特別改成 [user] ,
		結果問題 就自然解決了.
		*/
		var cfg = {
			filePath:path.join(__dirname,'./_demo.mdb')
			//filePath:path.join(__dirname,'../../node_modules/node-adodb/examples/node-adodb.mdb')
		};
		var _app = mdbApp.v2020607.Init(cfg);
		console.log({'動態指定DB':_app});
		var r = await _app.Exec('select * from [user]');
		r;
	},
	async '使用 mdb_demo.TableFunction'(){
		mdb_demo;
		var z = await mdb_demo.Log.Select().exec();
		console.log({z});
		
	},
	async '使用 mdb_demo.TableFunction_params'(){
		mdb_demo;
		var z = await mdb_demo1.User.Select({UserSId:2}).exec();
		console.log(z);
		
	},
	async '查詢'(){
		mdb_demo;
		var z = await mdb_demo.ViewTable('DayLog_1_PingAdd');
		console.log({z});
		
	},
	async 'B'(){
		var db = mdbApp.v2020607.Init();
		var arg = {
			A:'test'
		}
		var r = await db.Prep('select :A as A',arg).exec();
		r
	},
	async '用mdb_demo'(){
		mdb_demo;
		var z = await mdb_demo1.User.Select().exec();
		console.log({z});
		
		var arg = {UserSId:1};
		var z1 = await mdb_demo1.User.Select(arg).exec();
		z1
	},
	async '*Update'(){
		var start_time = "2020-05-28T16:00:00Z";
		start_time
		var arg = {"LogSID":1,"TaskSID":68,"note":null,"work_times":5
		,start_time
		,"end_time":new Date("1970-01-01T00:00:00Z")
		,"Loger":1
		,"editTime":new Date("1970-01-01T00:00:00Z")
		,"mapSID":0,"flag":null}
		var z = await mdb_demo1.Log.Update(arg).exec();
		z
		console.log({z});
		 
	},
	
}
_.each([t],fn=>{
	_.each(fn,(e,k)=>{
		if (k.substr(0,1)=="*"){
			e();
		}
	})
})

 

module.exports = {
	mdb_demo
	,mdb_demo1
};