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
            fs.writeFileSync(`./tpl/ejs/mvc/${filename}`,data,'utf-8');
        }
    }
    var _data = {
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
    var _tpl = {
        gti_el_table_col(filed){return `<el-table-column :label="i18n.${filed}"
    prop="${filed}" sortable="custom"
    :sort-orders="$UT.sort_order"></el-table-column>`},
    

    }
 
 
 
    var _gti = {
        async '*el_table'(){
            var arg = {
                row:_data.filed_1,
                TableColumn:[]
            }
            for(var filed in arg.row){
                var arr = _tpl.gti_el_table_col(filed).split('\n');
                arg.TableColumn = arg.TableColumn.concat(arr);
            }
            var s = await ejs.renderFile('./tpl/ejs/mvc/el_table.ejs',arg );
            ops.save(s,"~tmp.cshtml"); 
        },
        async 'i18n_json'(){
            var arg = {
                filed:_data.filed_1
                ,Prefix: "@RES."
            }
            var s = await ejs.renderFile
                ('./tpl/ejs/mvc/i18n_json.ejs'
                , arg
                , ops.echo );
            s 
            ops.save(s,"~tmp.txt");  
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