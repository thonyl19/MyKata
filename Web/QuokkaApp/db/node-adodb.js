/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
import path from "path";
import ADODB from "node-adodb";
import util from "util";
 
 
(()=>{
    //官網範例基礎查詢
    var _filePath = path.join(__dirname,'./_demo.mdb');
    var _BaseFilePath = path.join(__dirname,'../../node_modules/node-adodb/examples/node-adodb.mdb');

    var _base = {
        get_Cnn(){
            var cfg = `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${_BaseFilePath};`;
            return ADODB.open(cfg);
        },
        '不带返回的执行'(){
            
            _base.get_Cnn()
            .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)') 
            .then(data => {
                console.log(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error(error); 
            });
        },
        '带返回标识的执行'(){
            _base.get_Cnn()
                .execute('INSERT INTO Users(UserName, UserSex, UserBirthday, UserMarried) VALUES ("Bill", "Male", "1991/3/9", 0)', 'SELECT @@Identity AS id')
                .then(data => {
                    console.log(JSON.stringify(data, null, 2));
                })
                .catch(error => {
                    console.error(error);
                });
        },
        '带字段描述的查询'(){
            _base.get_Cnn()
            .schema(20)
            .then(schema => {
                console.log(JSON.stringify(schema, null, 2));
            })
            .catch(error => {
                console.error(error);
            });
        },
        async '*async'(){
            try {
              const users = await _base.get_Cnn().query('SELECT * FROM Users');
          
              console.log(JSON.stringify(users, null, 2));
            } catch (error) {
              console.error(error);
            }
          }
    }


    var fn = {
         
    }
    _.each(_base,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()