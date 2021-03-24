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
        testJson(data,filename="~test.json"){
            var s = JSON.stringify(data,null,4);  
            ops.save(s,filename); 
            return s;
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
                if (_val == "" ){
                    args[_name] =  ops.ejs(_pathName);
                }else if (typeof(_val) === "string"){
                    _val
                    args[_name] =  ops.ejs(_pathName,_val);
                }else{
                    ops.parseFile(args[_name] ,`${_pathName}/`);
                }
            }
        },
        parse_ext_rule(filed ,rule){
            return [];
        },
        
    }
    var ut = {
        echo(data,cb){
            var _arr = Array.isArray(data)
                ?data
                :data.split('\n')
                ;
            return _arr.map(cb);
        },
        parse_label(item,Prefix){
            var _Prefix =  _.isEmpty(Prefix)?"i18n.":Prefix;
            return `${_Prefix=="i18n."?':':''}label="${_Prefix}${item.label}"`;
        }
    }
    var _file = {
        el_table:{
            _main:'',
            VueTpl:'',
            VueGridData:'',
            VueGridMethos:'',
            gt_form_col:'',
        },
        form:{
            SequenceNum_Item:'cshtml',
        },
        piece:{
            json_i18n:'',
            gt_toolbar:'',
            vue_data_form:'',
            vue_data_i18n:'',
        }
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
            "ROUTE_NO": "C030-19",
            "ROUTE": "?面?极板（子流程）",
            "ROUTE_CATEGORY": "R",
            "DESCRIPTION": "",

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
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                mark:false, 
                Prefix:'',
                SID_Filed,
                row,
                Fileds:ops.parseFileds(row),
                Table_操作欄位:_tpl_gti_table.gti_el_table_操作欄位(SID_Filed),
                TableColumn:[],
                ext_rule:{
                    ROUTE_NO:{
                        Action_Item:'ROUTE_SID'
                    }
                },
                _fn,
                ut,
            }
            for(var filed in arg.row){
                let ext_rule = arg['ext_rule'][filed];
                var arr =  (ext_rule==null)
                    ? _tpl_gti_table.gti_el_table_col(filed).split('\n')
                    : ops.parse_ext_rule(filed,ext_rule);
                    ;
                arg.TableColumn = arg.TableColumn.concat(arr);
            }
            var arg_json = ops.testJson(arg,"el_table/~arg.json");  
            
            var zz = { 
                html_tpl : await ejs.renderFile(_file.el_table.VueTpl,arg ),
                x : await ejs.renderFile(_file.el_table.gt_form_col,arg ),
                vue_GridData : await ejs.renderFile(_file.el_table.VueGridData,{}),
                vue_GridMethos:await ejs.renderFile(_file.el_table.VueGridMethos,{}),
                vue_data_form : await ejs.renderFile(_file.piece.vue_data_form,arg),
                vue_data_i18n : await ejs.renderFile(_file.piece.vue_data_i18n,arg),
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
            var s = await ejs.renderFile(_file.piece.gt_toolbar,arg ); 
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