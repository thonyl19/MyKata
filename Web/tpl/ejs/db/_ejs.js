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
            fs.writeFileSync(`./tpl/ejs/db/${filename}`,data,'utf-8');
        },
        Ptabs(absTabs=0){
            /* 縮排控制
            relateTabs:相對縮排
            */
            return (relateTabs)=>{
                return '\t'.repeat(absTabs+relateTabs);
            }
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
        Insert:_.template(`<%= Ptabs(0)%>:<%= key%> as <%= key%>`),
        SelectFiled:_.template(`<%= Ptabs(0)%><%= key%>`),
        WhereCD:_.template(`(:<%= key%> is null
<%= Ptabs(1)%>OR (:<%= key%> is not null
<%= Ptabs(2)%>AND <%= key%> = :<%= key%>))`),
        UpDate_mdb:_.template(`<%= Ptabs(0)%><%= key%> = IIf(isnull(:<%= key%>),<%= key%>,:<%= key%>)`),           
    }
 
    var _parse = {
        mdb(arg){
            let {row} = arg;
            arg.Filed = [];
            arg.SelectFiled = [];
            arg.Insert = [];
            arg.WhereCD = [];
            arg.UpDate = []; 
            var idx=0;
           _.each(row,(val,key)=>{
                var tabs = (idx % 3 ==0) ?0:1;
                let Ptabs = ops.Ptabs(tabs);
                arg.Filed.push(key);
                arg.SelectFiled.push(_tpl.SelectFiled({key,Ptabs}));
                arg.Insert.push(_tpl.Insert({key,Ptabs}));
                arg.WhereCD.push(_tpl.WhereCD({key,Ptabs:ops.Ptabs(3)}));
                arg.UpDate.push(_tpl.UpDate_mdb({key,Ptabs}));
                idx++; 
            })            
        },

    }
    var mdb = {
        async '*db_CRUD_mdb.ejs'(){
            var arg = { 
                TableName:"Log"
                ,row:_data.filed_1
                ,Delete:true
                ,schema:true
            }
            _parse.mdb(arg);
            //控制不輸出
            //arg.Insert = null;
            //arg.SelectFiled = null;
            //arg.UpDate = null;
            // arg.Delete = null;
            // arg.schema = null;
            var s = await ejs.renderFile
                ('./tpl/ejs/db/db_CRUD.ejs'
                , arg 
                , ops.echo );
            s 
            ops.save(s,"~tmp.txt");  
        },
    }


    _.each([mdb],(_fn)=>{
        _.each(_fn,(e,k)=>{
            if (k.substr(0,1)=="*"){
                e();
            }
        })
    })
})()