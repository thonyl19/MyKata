/*
[2020/6/4]
    當初試用它 的原因, 是因為 語法中,有支援  parame 的功能.
    最後棄用的點是在於,當程式串起來後,要執行查詢時 ,
        第一時就拋出以下的 err
            [Error: Connection was destroyed before execution of sql: select * from Log] 
    在官方完全找不到相關可以解決問題的線索.
    而且 ,原本以為它會像 node-adodb 有支援存取 sehema 的 API ,
        但初步追查詢了一下,似乎是沒有這個功能.

*/
const ADODB = require('adodb');
const path = require("path");
var _ = require('lodash');
(async()=>{

    var fn = {
        'base'(){
            ADODB;
            var _filePath = path.join(__dirname,'./_demo.mdb');
            _filePath
            const connStr 
                = `rovider=Microsoft.Jet.OLEDB.4.0;Data Source=${_filePath}`; 
                //=`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${_filePath};Persist Security Info=False;`;
            
            const pool = ADODB.createPool(connStr);
            //const pool = ADODB.createConnection(connStr);
            //pool.schema(20)
            //pool
            pool.query('select * from Log', (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                }
            
                pool.end();
            });
        },
        '_A'(){
            var sql = `
                select  *
                from    sql
                where   a = :a
                        And b = :b

            `
            var values = {
                a:1,
                b:'a'
            };
            var x = ADODB.utils.queryFormat(sql,values);
            x;
        },
        '_'(){},
    }
	
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()