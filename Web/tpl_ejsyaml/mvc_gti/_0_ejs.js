/*
[Ref]
https://nunjucks.bootcss.com/
*/
import * as _ from 'lodash';
import path from "path";
let ejs = require('ejs');
let moment = require('moment');
const fs = require('fs');
ejs._ = _;
(()=>{
    var map_csharpType = {
		"string":"string",
		"int":"int",
		"float":"decimal",
		"array":"object[]",
		"date":"date",
		"boolean":"bool",
	}
    var ops = {
        echo:{outputFunctionName:'echo' },
        _fn(data,cb){
            var _arr = Array.isArray(data)
                ?data
                :data.split('\n')
                ;
            return _arr.map(cb);
        },
        save(data,filename="test.txt"){
            fs.writeFileSync(`./tpl_ejsyaml/mvc_gti/${filename}`,data,'utf-8');
        },
        ejs(fileName,ext="ejs"){
            return `./tpl_ejsyaml/mvc_gti/${fileName}.${ext}`
        },
        testJson(data){
            var s = JSON.stringify(data,null,4);  
            ops.save(s,"~test.json"); 
        },
        parseFileds(row){
            var fileds = [];
            for(var label in row){
                var val = row[label];
                var JS = typeof(val);
            
                switch(JS){
                    case "object":
                        if (val === null){
                            JS = 'string';
                        } else  if (Array.isArray(val)){
                            JS = 'array';
                        }
                        break;
                    case "string":
                        if (moment(val).isValid()){
                            JS = "date";
                        }
                        break;
                    case "number":
                        JS =_.isInteger(val)
                            ?"int"
                            :"float" 
                        break;
                    default:
                        break;
                }
                var arg = {
                    label
                    ,val
                    ,"map_type":{
                        JS,
                        csharp:map_csharpType[JS]
                    }
                }
                fileds.push(arg);
            }
            return fileds;
        },
        parseFile(args,path=""){
            for (var _name in args){
                var _val = args[_name];
                var _pathName = `${path}${_name}`;
                _pathName
                _val
                if (_val == "" ){
                    args[_name] =  ops.ejs(_pathName);
                }else if (typeof(_val) === "string"){
                    _val
                    args[_name] =  ops.ejs(_pathName,_val);
                }else{
                    _val
                    ops.parseFile(args[_name] ,`${_pathName}/`);
                }
            }
        },
        parse_ext_rule(filed ,rule){
            filed
            rule
            return [];
        }
    }
    var _file = {
        json_i18n:'',
        gt_toolbar:'',
        el_table:{
            _main:'',
            VueTpl:'',
            VueData:'',
            VueGridMethos:'',
        },
        form:{
            SequenceNum_Item:'cshtml',
        },
        vue_data_form:'',
        vue_data_i18n:'',
    }
    ops.parseFile(_file);
    console.log(_file);


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
        gti_el(){

        },
 
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
        async '*el_table'(){
            let {_fn} = ops;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                mark:false, 
                Prefix:'@Face.',
                SID_Filed,
                row:_data.filed_1,
                Fileds:ops.parseFileds(_data.filed_1),
                Table_操作欄位:_tpl_gti_table.gti_el_table_操作欄位(SID_Filed),
                TableColumn:[],
                ext_rule:{
                    ROUTE_NO:{
                        Action_Item:'ROUTE_SID'
                    }
                },
                _fn
            }
            for(var filed in arg.row){
                let ext_rule = arg['ext_rule'][filed];
                var arr =  (ext_rule==null)
                    ? _tpl_gti_table.gti_el_table_col(filed).split('\n')
                    : ops.parse_ext_rule(filed,ext_rule);
                    ;
                arg.TableColumn = arg.TableColumn.concat(arr);
            }
            ops.testJson(arg); 
            
            var zz = {
                html_tpl : await ejs.renderFile(_file.el_table.VueTpl,arg ),
                vue_GridData : await ejs.renderFile(_file.el_table.VueData,{}),
                vue_GridMethos:await ejs.renderFile(_file.el_table.VueGridMethos,{}),
                vue_data_form : await ejs.renderFile(_file.vue_data_form,arg),
                vue_data_i18n : await ejs.renderFile(_file.vue_data_i18n,arg),
                _fn
            } 
            //ops.testJson(zz); 
            //return ;
            var zz1 = await ejs.renderFile(_file.el_table._main,zz );
            ops.save(zz1,"el_table/~tmp.cshtml");    
        },
        async 'el_table'(){
            arg
            var s = await ejs.renderFile('./tpl/ejs/mvc/el_table.ejs',arg );
            ops.save(s,"~tmp.cshtml"); 
        },
        async 'gt_toolbar'(){
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