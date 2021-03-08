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
    var _tpl_gti_table = {
        gti_el_table_col(filed){return `<el-table-column :label="i18n.${filed}"
    prop="${filed}" sortable="custom"
    :sort-orders="$UT.sort_order"></el-table-column>`},
        gti_el_table_操作欄位(filed){return `<el-table-column :label="i18n.操作" min-width="20">
    <template slot-scope="scope">
        <el-button size="small" circle 
                    type="danger"
                    icon="el-icon-delete"
                    :disabled="scope.row.QUOTE_ONCE=='T'"
                    @@click="e_del(scope.row.${filed})"
                    ></el-button>
    </template>
</el-table-column>`},
 
    }
    var _tpl_gti_table_arg = {
        gti_el_table_col(filed){return `<el-table-column :label="i18n.${filed.name}"
    prop="${filed.name}" sortable="custom"
    :sort-orders="$UT.sort_order">
        <template slot-scope="scope">
            <el-button type="text" @@click="act_Item(scope.row.${filed.name})">{{scope.row.${filed.name}}}</el-button>
        </template>
    </el-table-column>`},
        gti_el_table_操作欄位(filed){return `<el-table-column :label="i18n.操作" min-width="20">
    <template slot-scope="scope">
        <el-button size="small" circle 
                    type="danger"
                    icon="el-icon-delete"
                    :disabled="scope.row.QUOTE_ONCE=='T'"
                    @@click="e_del(scope.row.${filed})"
                    ></el-button>
    </template>
</el-table-column>`},
 
    }
 
 
 
    var _gti = {
        async 'el_table'(){
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                SID_Filed,
                row:_data.filed_1,
                Table_操作欄位:_tpl_gti_table.gti_el_table_操作欄位(SID_Filed).split('\n'),
                TableColumn:[]
            }
            for(var filed in arg.row){
                var arr = _tpl_gti_table.gti_el_table_col(filed).split('\n');
                arg.TableColumn = arg.TableColumn.concat(arr);
            }
            var s = await ejs.renderFile('./tpl/ejs/mvc/el_table.ejs',arg );
            ops.save(s,"~tmp.cshtml"); 
        },
        async 'el_table_arg'(){
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                SID_Filed,
                row:_data.filed_1,
            }
            for(var filed in arg.row){
                var arr = _tpl_gti_table.gti_el_table_col(filed).split('\n');
                arg.TableColumn = arg.TableColumn.concat(arr);
            }
            var s = await ejs.renderFile('./tpl/ejs/mvc/el_table.ejs',arg );
            ops.save(s,"~cfg.json"); 
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