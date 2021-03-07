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
        echo:{outputFunctionName:'echo' }
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
    var _tmp = {
        base:`<h1>Hello <%= name %></h1>`,
        array:`<%= people.join(", "); %>`,
        array_1:`
            <% people.forEach(el=>{ %>
                <li><%= el%></li>
            <% }); %>`,
        switch_1:`
            <% switch (el) {
            case 'A' : %>
                    1
                    <% break;
            
            case 'B' : %>
                    2
                    <% break;
            
            case 'C' : %>
                    3
                    <% break;
            
            } %>
        `,
        condtion:`
            <% if (typeof(el) == "string") {%>
                el is String
            <% } else if  (typeof(el) == "number"){%>
                el is Number
            <% } else if  (typeof(el) == "boolean"){%>
                    el is Boolean
            <% } else if  (typeof(el) == "date"){%>
                el is Date
            <% }%>
        `,
        condtion_1:`
            <% list.forEach(el=>{ %>
                <li><%= fn(el)%></li>
            <% }); %>
        `,
        fun:`
            <% function user(user) { %>
                <li><strong><%= user.name %></strong> is a <%= user.age %> year old <%= user.species %>.</li>
            <% } %>
          
          <ul>
            <% users.map(user) %>
          </ul>
        `,
        echo:`
            <% 
                for(var idx in users){
                    echo(idx);
                }
            -%>
        `
    }
    var fn = {
        save(data,filename="test.txt"){
            fs.writeFileSync(`./tpl/ejs/${filename}`,data,'utf-8');
        },
        '讀入 template'(){
            var s = ejs.renderFile('./tpl/ejs/T01.ejs', { name: 'EJS ' });
            s
        },
        'T02 - 使用 lodash'(){
            //把 lodash 當成參數傳入使用
            var arg ={_:_, name: 'esj ' };
            var s = ejs.renderFile('./tpl/ejs/T02.ejs',arg);
            s
        },
 
        '字串 templage'(){
            var s = ejs.render(_tmp.base, { name: 'test' });
            s
        },
        '陣列'(){
            var s = ejs.render(_tmp.array, { people : ['geddy', 'neil', 'alex'] });
            s
            var s1 = ejs.render(_tmp.array_1, { people : ['geddy', 'neil', 'alex'] });
            s1
        },
        '解析物件'(){
            var food = {
                'ketchup': '5 tbsp',
                'mustard': '1 tbsp',
                'pickle': '0 tbsp'
            };
            var s = ejs.render(_tmp.array,{food} );
            console.log(s)
        },
        'switch 語法'(){
            ['A','B','C'].forEach(el=>{
                var s = ejs.render(_tmp.switch_1,{el} );
                s
            })
        },
        'condtion 語法'(){
            ['A',1,true,new Date()].forEach(el=>{
                var s = ejs.render(_tmp.condtion,{el} );
                s
            })
        },
        'function 用法'(){
            let {users} = _data;
            var s = ejs.render(_tmp.fun,{users} );
            console.log(s)
        },
        'condtion 語法--進階應用'(){
            /*
            這種用法只有一個神字可以形容,
                完全可能不用再煩惱判斷難以閱讀的問題了
            */
            var arg = {
                fn(el){
                    var x = typeof(el);
                    switch (x) {
                        case "string":
                        case "number":
                        case "boolean":
                            return `${x}`;
                            break;
                        default:
                            return "x";
                            break;
                    }
                },
                list:['A',1,true,new Date()]
            }
            var s = ejs.render(_tmp.condtion_1,arg);
            s
        },
        async 'T03 - echo 用法'(){
            let {users} = _data; 
            var s = await ejs.renderFile
                ('./tpl/ejs/T03.ejs'
                ,{users} 
                //重點是要補上這一段
                ,ops.echo);
            fn.save(s,"_tmp.txt")
        },
        async '*T04 - include 用法'(){
            let {users} = _data; 
            var s = await ejs.renderFile
                ('./tpl/ejs/T04.ejs'
                ,{users} 
                //重點是要補上這一段
                ,ops.echo);
            s
            fn.save(s,"_tmp.txt")
        },
    } 
    //己移走
    var _sql = {
        tpl_Insert:_.template(`<%= tab%>:<%= key%> as <%= key%>`),
        tpl_SelectFiled:_.template(`<%= tab%><%= key%>`),
        tpl_WhereCD:_.template(`(:<%= key%> is null
                OR (:<%= key%> is not null
                    AND <%= key%> = :<%= key%>))`),
        tpl_UpDate_mdb:_.template(`<%= tab%><%= key%> = IIf(isnull(:<%= key%>),<%= key%>,:<%= key%>)`),           
        parse_mdb(arg){
            let {row} = arg;
            arg.Filed = [];
            arg.SelectFiled = [];
            arg.Insert = [];
            arg.WhereCD = [];
            arg.UpDate = [];
            var idx=0;
           _.each(row,(val,key)=>{
                var tab = (idx % 3 ==0) ?"":"\t";
                arg.Filed.push(key);
                arg.SelectFiled.push(_sql.tpl_SelectFiled({key,tab}));
                arg.Insert.push(_sql.tpl_Insert({key,tab}));
                arg.WhereCD.push(_sql.tpl_WhereCD({key}));
                arg.UpDate.push(_sql.tpl_UpDate_mdb({key,tab}));
                idx++; 
            })            
        },
        parseWherCD(row){
            var arr = [];
            var idx = 0;
            _.each(row,(val,key)=>{
                var _r = `:${key} is null 
                OR (:${key} is not null 
                    And ${key} = :${key})`;
                if (idx !=0){
                    _r = `
            AND (${_r})`;
                }
                arr.push(_r);
                idx++;
            })
            return arr;
        },
        parseInsert(row){
            var arr = [];
            var idx = 0;
            _.each(row,(val,key)=>{
                var _r = `:${key} as ${key} `;
                if (idx !=0){
                    _r = `
            , ${_r}`;
                }
                arr.push(_r);
                idx++;
            })
            return arr;
        }
    }
    //己移走
    var _case = {
        'el_table'(){
            var filed = _data.filed_1; 
            var s = ejs.renderFile('./tpl/ejs/el_table.ejs',{filed} );
            fn.save(s,"./_tmp.txt"); 
        },
        async 'i18n_json'(){
            var filed = _data.filed_1; 
            var Prefix = "@RES.";
            var s = await ejs.renderFile
                ('./tpl/ejs/i18n_json.ejs'
                ,{filed,Prefix}
                , ops.echo );
            s 
            fn.save(s,"./_tmp.txt");  
        },
        async 'db_CRUD_mdb.ejs'(){
            var arg = {
                TableName:"Log"
                ,row:_data.filed_1
                ,Delete:true
                ,schema:true
            }
            _sql.parse_mdb(arg);
            //控制不輸出
            arg.Insert = null;
            arg.SelectFiled = null;
            arg.UpDate = null;
            arg.Delete = null;
            arg.schema = null;
            var s = await ejs.renderFile
                ('./tpl/ejs/db_CRUD.ejs'
                , arg 
                , ops.echo );
            s 
            fn.save(s,"./_tmp.txt");  
        },
    }


    _.each([fn,_case],(_fn)=>{
        _.each(_fn,(e,k)=>{
            if (k.substr(0,1)=="*"){
                e();
            }
        })
    })
})()