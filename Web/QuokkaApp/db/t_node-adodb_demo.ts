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
	
	var fn = {
		'get_User'(){
			let _self = this;
			try {
				var r = ADODB.open(cts).query("select * from Users");
				r;
			} catch (error) {
				console.log(error);
			}
		}
	}
	_.each([fn],fn=>{
		_.each(fn,(e,k)=>{
			if (k.substr(0,1)=="_"){
				e();
			}
		})
	})
})()
