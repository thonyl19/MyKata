/*
https://github.com/agershun/alasql/wiki/XLSX

*/

import _ from 'lodash';
import path from "path";
import alasql from 'alasql';
import Mock from 'mockjs';

(()=>{
    var _filePath = path.join(__dirname,'./_demo.xlsx');


    var fn = {
        '讀取整個表的資料'(){ 
            var sql 
                = `select * from xlsx("${_filePath}") `;
                //跟上面的語句等價 
                //= `select * from xlsx("${_filePath}",{sheetid:"Sheet1"}) `;
            alasql.promise(sql)
                .then(function(data){
                    console.log(data);
                }).catch(function(err){
                    console.log('Error:', err);
                });
        },
        async '讀取Range'(){
            var sql  = `select * from xlsx("${_filePath}",{range:"A1:D10"}) `;
            var data = await alasql.promise(sql);
            data;
        },
        async 'Read headers'(){ 
            /*
            不會再把第一欄當成欄位名稱,而是改以 xls.clo[A,B,C..] 
                做為欄位檯頭
            */
            var sql  = `select * from xlsx("${_filePath}",{headers:false}) `;
            var data = await alasql.promise(sql);
            data;
        },
        async 'write'(){ 
            var data = Mock.mock({
                "array|10": [
                {
                    "name|+1": [
                    "Hello",
                    "Mock.js",
                    "!"
                    ]
                }
                ]
            }).array;
            data
            var mystyle = {
                headers:true, 
                column: {style:{Font:{Bold:"1"}}},
                rows: {1:{style:{Font:{Color:"#FF0077"}}}},
                cells: {1:{1:{
                  style: {Font:{Color:"#00FFFF"}}
                }}}
              };
            var _test = path.join(__dirname,'./_demo~write.xls');

            var sql  
                /*
                這個語法的問題是,不會自動將 欄位名稱寫入
                */
                = `select * INTO XLSX("${_test}",?) FROM ? `;
                /*
                這個語法在開啟時會有錯誤訊息出現
                    ,原因不明,但寫入的資料是正確的
                */
                //= `select * INTO XLSXML("${_test}",?) FROM ? `;
            var z = await alasql.promise(sql,[mystyle,data]);
            z
        },
        async '_insert'(){ 
                          
            var _test = path.join(__dirname,'./_demo~write.xls');

            var sql  
                /*
                這個語法的問題是,不會自動將 欄位名稱寫入
                */
                = `INSERT INTO XLSX("${_test}") VALUES ('name',2863223) `;
                /*
                這個語法在開啟時會有錯誤訊息出現
                    ,原因不明,但寫入的資料是正確的
                */
                //= `select * INTO XLSXML("${_test}",?) FROM ? `;
            var z = await alasql.promise(sql);
            z
        },
        async '_'(){ },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
    //fn.write();
})()