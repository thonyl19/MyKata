const ADODB = require('node-adodb');
var _ = require('lodash');

const util = require('util');


let cts = 'Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\A\\Code\\股\\DBS\\分析.accdb;Persist Security Info=False;'
const connection = ADODB.open(cts);
console.log(connection);

var DAO = {
	cn_分析 :'Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\A\\Code\\股\\DBS\\分析.accdb;Persist Security Info=False;'
	,get_分析(sqlCmd){
        let _self = this;
		try {
			return ADODB.open(_self.cn_分析).query(sqlCmd);
		} catch (error) {
			console.log(error);
		}
	}

	,cn:ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\A\\Code\\股\\DBS\\Database1.accdb;Persist Security Info=False;')
	,async test(){
        let _self = this;

		console.log('step0');
		
		 // 带返回的查询
		console.log('step1');
		return await this.cn.query('SELECT * FROM [tmp];');
			// .on('done', function (data){
			// 	console.log(JSON.stringify(data, null, '  '));
			//  })
			// .on('fail', function (data){
			// 	console.log(data);
			//   });
	}
	,test1:function(){
		console.log('step0');
		
		 // 带返回的查询
		console.log('step1');
		this.cn
			.execute('11_EPS_分析')
			.on('done', function (data){
				console.log(JSON.stringify(data, null, '  '));
			 })
			.on('fail', function (data){
				console.log(data);
			  });
	}
}


let g= DAO.test();
g; 