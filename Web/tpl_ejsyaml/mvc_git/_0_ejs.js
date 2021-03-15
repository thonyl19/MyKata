/*
[Ref]
https://nunjucks.bootcss.com/
*/
import * as _ from 'lodash';
import path from "path";
let ejs = require('ejs');
const fs = require('fs');
ejs._ = _;
(()=>{
    var ops = {
        echo:{outputFunctionName:'echo' },
        save(data,filename="test.txt"){
            fs.writeFileSync(`./tpl_ejsyaml/mvc_git/${filename}`,data,'utf-8');
        },
        ejs(fileName){
            return `./tpl_ejsyaml/mvc_git/${fileName}.ejs`
        }
    }
    var _file = {
        json_i18n:'',
        gt_toolbar:'',
    }
    for (var e in _file){
        _file[e] =  ops.ejs(e);
    }


    var _data = {
        row: {
            CREATE_DATE: "2021-01-13 13:50:00"
            ,CREATE_USER: "EIS"
            ,ENCODE_FORMAT_CONTROL_SID: "GTI21011313500003072"
            ,ENCODE_FORMAT_NAME: "LotNoRework"
            ,ENCODE_FORMAT_NO: "LotNoRework"
            ,ENCODE_FORMAT_SID: "GTI20111910362484429"
            ,ENCODE_FORMAT_TYPE: "Lot"
            ,RESET_FORMAT_MASK: "14-03-2224P...."
            ,SERIAL_LAST_VALUE: "01"
            ,UPDATE_DATE: "2021-01-13 13:50:00"
            ,UPDATE_USER: "EIS"
        },
        filed_1 : {
            "ROUTE_SID": "GTI20101517555209104",
            "ROUTE_NO": "C030-19",
            "ROUTE": "单面阳极板（子流程）",
            "ROUTE_CATEGORY": "R",
            "DEFAULT_VERSION": 1,
            "VERSION_DESCRIPTION": null,
            "MAX_VERSION": 2,
            "CREATE_USER": "mes",
            "CREATE_DATE": "2020-10-15 17:56:21",
            "UPDATE_USER": "mes",
            "UPDATE_DATE": "2020-10-30 14:13:41"
        },
        users: [
            { name: 'Tobi', age: 2, species: 'ferret' },
            { name: 'Loki', age: 2, species: 'ferret' },
            { name: 'Jane', age: 6, species: 'ferret' }
          ]
    }
 
 
 
 
    var _gti = {
        async 'el_table'(){
            
            var s = await ejs.renderFile('./tpl/ejs/mvc/el_table.ejs',arg );
            ops.save(s,"~tmp.cshtml"); 
        },
        async '*gt_toolbar'(){
            var arg = {
                bts:[
                    'e_Add',
                    'e_query',
                    'e_clear',
                ]  
            } 
            var s = await ejs.renderFile(_file.gt_toolbar,arg );
            ops.save(s,"~tmp.html");  
        },
        async 'json_i18n'(){
            var arg = {
                Prefix:'@Face.',
                row : _data.row
            } 
            var s = await ejs.renderFile(_file.json_i18n,arg );
            ops.save(s,"~tmp.json");  
        },
 
    }


    _.each([_gti],(_fn)=>{
        _.each(_fn,(e,k)=>{
            if (k.substr(0,1)=="*"){
                e();
            }
        })
    })
})()