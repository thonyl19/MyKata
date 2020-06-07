(()=>{
	const path = require("path");
	path
	const ADODB = require('node-adodb');
	var _ = require('lodash');
	
	const util = require('util');
	var _filePath = path.join(__dirname,'./_demo.mdb');
	
	let cts = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${_filePath};Persist Security Info=False;`
	const connection = ADODB.open(cts);
	console.log(connection);
	
	let mdb_App = {
		get cts() {
			this.cfg.filePath;
			return `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${this.cfg.filePath};Persist Security Info=False;`;
		},
		getConn(cfg) {
			var cts = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${cfg.filePath};Persist Security Info=False;`;
			return ADODB.open(cts);
		},
		async ExecSQL(cmd, cfg = this.cfg) {
		  console.log(cfg);
	  
		  if (cfg == null || cfg == undefined)
			throw new Error("must have db config.");
		  return new Promise(async (resolve, reject) => {
			let result = null,
			  connection = null;
			try {
			  result = mdb_App.getConn(cfg).query(cmd);
			  result;
			} catch (err) {
			  //logUtil.errorLogger.error(`ExecSQL-Err)${cmd} , ${err}`);
			} finally {
			  resolve(result);
			}
		  });
		},
		parse(args, parseMap, cmd, cfg = this.cfg) {
		  let params = {};
		  // _.each(parseMap, (el, key) => {
		  // 	parseMap;
		  // 	let _map = args[key];
		  // 	params[key] = [el, _map, parseMap[key].name];
		  // });
		  // if (cmd == null) return params;
	  
		  return {
			cmd,
			async exec() {
			  return mdb_App.ExecSQL(this.cmd, cfg);
			},
		  };
		},
	};

	  
	  var mdb_demo_x = {
		  	
			cfg: {
				filePath: path.join(__dirname, "./_demo.mdb"),
			},
			set(cfg){
				_.merge(this.cfg,cfg);
				return this;
			},
			ExecSQL: mdb_App.ExecSQL,
			parse: mdb_App.parse,
			User: {
			parseMap: {
				// SN: sql.Int,
				// GirdID: sql.Int,
				// DSItemSN: sql.Int,
				// header: sql.NVarChar,
				// dataType: sql.VarChar,
				// format: sql.VarChar,
				// seq: sql.Int,
				// ext: sql.NVarChar,
			},
			// Select(args, isTest) {

			// 	return mdb_demo.parse(
			// 		args,
			// 		this.parseMap,
			// 		`
			// 		SELECT	*
			// 		FROM    Users
			// 		`
			// 	);
			// },
			//   Ins(args, isTest) {
			// 	return testDB.parse(
			// 	  args,
			// 	  this.parseMap,
			// 	  `
			// 		  INSERT  INTO Users
			// 			  (--SN ,
			// 				  GirdID ,
			// 				  DSItemSN ,
			// 				  header ,
			// 				  dataType ,
			// 				  format ,
			// 				  seq ,
			// 				  ext)
			// 		  SELECT  --@SN AS SN ,
			// 				  @GirdID AS GirdID ,
			// 				  @DSItemSN AS DSItemSN ,
			// 				  @header AS header ,
			// 				  @dataType AS dataType ,
			// 				  @format AS format ,
			// 				  @seq AS seq ,
			// 				  @ext AS ext     
			// 		  SELECT  SCOPE_IDENTITY()  as SN
			// 		  `
			// 		);
			//   },
			},
	  };
	var tmpFn=(...A)=>{return this}
	var mdbApp = {
		set:tmpFn
		,SQL:tmpFn
		,Exec:tmpFn
		,init:tmpFn
		,parseQ(db,sql,arg){
			return {
				get Code(){
					return db.SQL(sql,arg);
				},
				Exec(){
					db.Exec(this.Code);
				}
			}
		}
	}
	var mdb_demo = {
		dbObj:mdbApp.init({
			cfg:{

			}
		})
		,SQL:tmpFn
		,Exec:tmpFn
		,Table:{
			Select(arg,isTest=false){
				var sql = `select 'A' AS test ;`;
				return mdbApp.parseQ(mdb_demo.dbObj,sql,arg) 
				
				// {
				// 	get Code(){
				// 		return mdbApp.SQL(sql,arg);
				// 	},
				// 	Exec(){
				// 		mdb_demo.set().Exec(this.Code);
				// 	}
				// }
			}
		}
		//非 Table 的特殊查詢,或執行程序 
		,SP_Query(arg,isTest=false){
			var sql = `select 'A' AS test ;`;
			return {
				get Code(){},
				Exec(){
					mdb_demo.set().Exec(this.Code);
				}
			}
		}
	};
	var QueryMode = {
		'基本查詢'(){
			try {
				var sql =`select 'A' AS test ;`
				// init
				var db = mdbApp.set({});
				var r1 = db.SQL(sql,{});
				//r1 {Exec(),code}
				var r2 = db.Exec(sql,{});
				
			} catch (error) {
				console.log(error);
			}
		},
		/* 
		是 by 指定資料庫,直接做好預設的 config ,
			並By Table 做好 CRUD 和延伸應用
		*/
		'定製化查詢'(){
			var query = mdb_demo.Table.Select({});
			//query.Code
			//query.Exec()
		}
	}
	_.each([QueryMode],fn=>{
		_.each(fn,(e,k)=>{
			if (k.substr(0,1)=="_"){
				e();
			}
		})
	})
})()
