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
            fs.writeFileSync(`./tpl_ejsyaml/待分類/${filename}`,data,'utf-8');
        },
        ejs(fileName){
            return `./tpl_ejsyaml/待分類/${fileName}.ejs`
        }
    }
    var _file = {
        json_i18n:'',
        gt_toolbar:'',
    }
    for (var e in _file){
        _file[e] =  ops.ejs(e);
    }

    var _ejs = {
        //REASON_SID = code.REASON_SID,
        資料表欄位轉換成linq_new:`
            <%_ for(var el of list){ _%>
                <%= el%> = <%=PerFix%><%=el%>,
            <%_ }; _%>`,

        gt_form_col:`
        <%_ for(var el of list){ _%>
            <gt-form-col <%=PerFix=='i18n.'?':':''%>label="<%=PerFix%><%=el%>"
                    v-model="form.<%=el%>"
                    :readonly="readonly"
                    ></gt-form-col>
        <%_ }; _%>
        `
    }

    var _data = {
        row: {
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
            "UPDATE_DATE": "2020-10-30 14:13:41",
            "ROUTE_VER_SID": "GTI20101517562109108"
        },
        filed_list:'ROUTE_SID, ROUTE_NO, ROUTE, ROUTE_CATEGORY, DEFAULT_VERSION, VERSION_DESCRIPTION, MAX_VERSION, CREATE_USER, CREATE_DATE, UPDATE_USER, UPDATE_DATE',
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
        async '資料表欄位轉換成linq_new'(){
            var arr = _data.filed_list.split(',');
            var list = []
            for(var el of arr ){
                list.push(el.trim());
            }
            var arg = {
                PerFix:'R0.',
                list
            }
            var s = await ejs.render(_ejs.資料表欄位轉換成linq_new,arg );
            ops.save(s,"~tmp.txt"); 
        },
        async '*json to gt-form'(){
      
            var list = Object.keys(_data.row)
            var arg = {
                PerFix:'i18n.',
                list
            }
            var s = await ejs.render(_ejs.gt_form_col,arg );
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