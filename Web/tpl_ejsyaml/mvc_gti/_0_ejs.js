/*
[Ref]
https://nunjucks.bootcss.com/
*/
import * as _ from 'lodash';
import path from "path";
let ejs = require('ejs');
let moment = require('moment');
const fs = require('fs');
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
        ts_BasePath(relPath){
            return `./tpl_ejsyaml/mvc_gti/${relPath}`
        },
        _fn(data,cb){
            var _arr = Array.isArray(data)
                ?data
                :data.split('\n')
                ;
            return _arr.map(cb);
        },
        save(data,filename="test.txt",isRelPath=true){
            var _fullPath = isRelPath
                ? ops.ts_BasePath(filename)
                : filename;
            fs.writeFileSync(`${_fullPath}`,data,'utf-8');
        },
        save_part(basePath,args){
            for(var item in args){
                var _s = args[item].join('\n');
                var _n = `${basePath}${item}`;
                _n
                ops.save(_s,`${basePath}${item}`);
            }
        },
        async save_grp(basePath,grps,arg){
            for(var grp in grps){
                var items = grps[grp];
                for(var idx in items){
                    var _ejs = items[idx];
                    items[idx] = await ejs.renderFile(_ejs, arg);``
                }
                var _FileName = `${basePath}${grp}`;
                var _Code = items.join('\r\n');
                ops.save(_Code,_FileName);
            }
        },
        async parse_point(BaseArg,point){
            point
            var _code = [];
            let {PART,PIECE,ut} = BaseArg;
            _.forEach(PART,async (el,part)=>{
                part
                let arg = el[point];
                console.log(arg)
                if (arg!=null){
                    var _ejs = ops.ts_BasePath(`${part}/${point}.ejs`);
                    _ejs
                    var _s = await ejs.renderFile( _ejs , {arg:{PART ,ut}});
                    _s
                    _code.push(_s);
                }
            })
            let _grp = PIECE[point]; 
            //console.log(_grp);
            if (_grp!=null){
                _grp.map(async(el)=>{
                    var _s = await ejs.renderFile( el ,{arg:BaseArg});
                    _s
                    _code.push(_s);
                })
            }
            return await _code;
        },
        async save_point(basePath,point,arg){
            for(var el in point){
                switch(el){
                    case "Main": 
                        break;
                    //case "Htm_Toolbar":
                    //case "Vue_Methods":
                    default:
                        var arr = await ops.parse_point(arg,el);
                        arr
                        var _file = `${basePath}~${el}.txt`;
                        _file
                        ops.save(arr.join('\r\n'),_file,false); 
                        break;
                }
            }
            var _Code = await ejs.renderFile( `${basePath}Main.ejs`, {arg});
            var _FileName = `${basePath}_Main.${point.Main}`;
            _FileName
            ops.save(_Code,_FileName,false);
        },
        ejs(fileName,ext="ejs"){``
            return `./tpl_ejsyaml/mvc_gti/${fileName}.${ext}`
        },
        testJson(data,filename="~test.json"){
            var s = JSON.stringify(data,null,4);  
            ops.save(s,filename); 
            return s;
        },
//         SaveJson(data,filename="~test.json"){
//             var z = path.extname(filename);
// z
//             var s = JSON.stringify(data,null,4);  
//             ops.save(s,filename); 
//             return s;
//         },
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
        parseRow(arg,setPath = 'Fileds'){
            let {row,Prefix} = arg;
            if (row==null) return ;
            var fileds = [];
            var ext_mode = {}; 
            for(var Name in row){
                var val = row[Name];
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
                var _arg = {
                    Name
                    ,val
                    ,"map_type":{
                        JS,
                        csharp:map_csharpType[JS]
                    }
                    ,label :ut.parse_label(Name,Prefix)
                }
                fileds.push(_arg);

                switch(Name){
                    case "ENABLE_FLAG":
                        ext_mode[Name] = true;
                        break;
                }
            }
            _.set(arg, setPath, fileds);
            _.set(arg, 'ext_mode', ext_mode);
            //console.log(arg);
            return arg;
        },
        
        parseFile(args,path=""){
                for (var _name in args){
                    var _val = args[_name];
                var _pathName = `${path}${_name}`;
                if (_val == "" ){
                    args[_name] =  ops.ejs(_pathName);
                }else if (typeof(_val) === "string"){
                    args[_name] =  ops.ejs(_pathName,_val);
                }else{
                    ops.parseFile(args[_name] ,`${_pathName}/`);
                }
            }
        },
        parse_ext_rule(filed ,rule){
            return [];
        },
        async parse_toolbar(arg){
            let {toolbar = {}} = arg; 
            var html_toolbar = [];
            var html_fun = "";
            var vue_computed = {};
            await _.each(toolbar,async(val,key)=>{
                switch(key){
                    default:
                        var fun = `${key}`;
                        if (val=="1"){
                            fun = `v_${key.substr(2)}`;
                            vue_computed[fun]=key;
                            //vue_computed.push({key,fun});
                        } 
                        html_fun += `:${key}="${fun}" `;
                        break;
                }
            })

            html_toolbar.push(html_fun);
            var  ENABLE_FLAG = _.get(arg,"ext_mode.ENABLE_FLAG");
            ENABLE_FLAG
            if (ENABLE_FLAG){
                html_toolbar.push(`:enable.sync="ENABLE_FLAG" `);
            }
            _.set(arg, 'html.toolbar', html_toolbar);
            _.set(arg, 'vue.computed.toolbar', vue_computed);
        },
        parse_gt_toolbar(arg){
            let {toolbar = {}} = arg; 
            var html_fun ="",
                Htm_Toolbar=[],
                Vue_Computed=[],
                Vue_Methods=[];
            _.each(toolbar,(val,key)=>{
                val
                switch(key){
                    default:
                        Vue_Methods.push(key);
                        var fun = `${key}`;
                        fun
                        if (val=="1"){
                            fun = `v_${key.substr(2)}`;
                            Vue_Computed.push(key);
                        } 
                        html_fun += `:${key}="${fun}" `;
                        break;
                }
            })
            Htm_Toolbar.push(html_fun); 
            var  ENABLE_FLAG = _.get(arg,"ext_mode.ENABLE_FLAG");
            ENABLE_FLAG
            if (ENABLE_FLAG){
                Htm_Toolbar.push(`:enable.sync="ctr_ENABLE.val" `);
                ops.parse_ENABLE_FLAG(arg);
            }
            var gt_toolbar = { 
                Htm_Toolbar,
                Vue_Computed, 
                Vue_Methods
            };
            _.set(arg, 'PART.gt_toolbar', gt_toolbar);
        },
        parse_ENABLE_FLAG(arg){
            var cfg = {
                Vue_Data:[],
                Vue_Watch:[],
                Vue_Methods:[]
            };
           _.set(arg,"PART.ENABLE_FLAG",cfg);
        },
    }
    var ut = {
        _,
        echo(data,cb){
            var _arr = Array.isArray(data)
                ?data
                :data.split('\n')
                ;
            return _arr.map(cb);
        },
        async echo_file(fileName,cb){
            fileName
            var data = this.fn_inc(fileName);
            var _arr = Array.isArray(data)
                ?data
                :data.split('\n')
                ;
            return _arr.map(cb);
        },
        async echo_rander(fileName,arg,cb){
            fileName
            arg
            var data = this.fn_inc(fileName,arg);
            data
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
        Controller:{
            Base:{
                _main:'cs'
            }
        },
        ENABLE_FLAG:{
            Controller:'cs',
            Vue_Data:'js',
            Vue_Methods:'js',
            Vue_Watch:'js',
        },
        gt_toolbar:{
            Html:'cshtml',
            Vue_Computed:'js',
            Vue_Methods:'js'
        },
        v8n:{
            Base:'cs',
            RuleFor:'',
            Check:'',
        },
        el_table:{
            _main:'cshtml',
            VueTpl:'',
            VueGridData:'',
            VueGridMethos:'',
            gt_form_col:'',
            PagerQuery:{
                Vue_Data:''
            },
        },
        form:{
            Base:{
                Form:'cshtml',
                VueComputedToolbar:'',
            },
            SequenceNum_Item:'cshtml',
            toolbar_mode_1:'',
        },
        piece:{
            json_i18n:'',
            gt_toolbar:'cshtml',
            gt_form_col:'cshtml',
            el_table_column:'cshtml',
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
            "ENABLE_FLAG":true
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
                _fn,
            } 
            //ops.testJson(zz);   
            //return ;
            var zz1 = await ejs.renderFile(_file.el_table._main,zz );
            ops.save(zz1,"el_table/~tmp.cshtml");    
        },
        async 'SequenceNum_Item_Cfg'(){
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                Prefix:'',
                SID_Filed,
                row,
                Fileds:ops.parseFileds(row),
                ext_rule:{
                    ROUTE_NO:{
                        Action_Item:'ROUTE_SID'
                    }
                },
                ut,
                toolbar:{
                    e_query:"1",
                    e_add:"",
                    e_del:"",
                    e_save:"",
                    e_clear:"",
                    //e_import:""
                }
            }
            await ops.parse_toolbar(arg);
            // for(var filed in arg.row){
            //     let ext_rule = arg['ext_rule'][filed];
            //     var arr =  (ext_rule==null)
            //         ? _tpl_gti_table.gti_el_table_col(filed).split('\n')
            //         : ops.parse_ext_rule(filed,ext_rule);
            //         ;
            //     arg.TableColumn = arg.TableColumn.concat(arr);
            // }
            var arg_json = ops.testJson(arg,"form/SequenceNum_Item.json"); 
            
            arg.VueComputedToolbar = await ejs.renderFile(_file.form.VueComputedToolbar,arg);
            var s = await ejs.renderFile(_file.form.SequenceNum_Item, arg );
            ops.save(s,"form/~tmp.cshtml"); 
        },
        async 'Form'(){
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                RESOURCE_NAME:'RESOURCE_NAME',
                Prefix:'',
                SID_Filed,
                row,
                ext_rule:{
                    ROUTE_NO:{
                        Action_Item:'ROUTE_SID'
                    }
                },
                toolbar:{
                    e_query:"1",
                    e_add:"",
                    e_del:"",
                    e_save:"",
                    e_clear:"",
                    //e_import:""
                },
                ut,
                cols:[{
                    label:`label="test"`,
                    prop:"test"
                }],
                tabs:{
                    A:{
                        label:'',
                        //form
                    },
                    B:{
                        grid:{
                            cols:[{
                                label:`label="test"`,
                                prop:"test"
                            }]
                        }
                    },
                },
                el_table:{
                    Html:[],
                    Vue_Methods:{}
                }
            }
            ops.parseRow(arg);
            ops.parse_gt_toolbar(arg);
            var arg_json = ops.testJson(arg,"form/Base/Form.json"); 
            var _part = {
                "~Htm_Toolbar.cshtml": [
                    _file.gt_toolbar.Html
                ],
                "~Htm_FormCol.cshtml":[
                    _file.piece.gt_form_col
                ],
                "~Vue_Data.js":[
                    _file.piece.vue_data_form,
                    _file.piece.vue_data_i18n,
                    _file.el_table.PagerQuery.Vue_Data,
                    _file.ENABLE_FLAG.Vue_Data,
                ],
                "~Vue_Computed.js":[
                    _file.gt_toolbar.Vue_Computed,
                ],
                "~Vue_Watch.js":[
                    _file.ENABLE_FLAG.Vue_Watch,
                ],
                "~Vue_Methods.js":[
                    _file.ENABLE_FLAG.Vue_Methods,
                    _file.gt_toolbar.Vue_Methods,
                ],
                // "~Check.cs": [
                //     _file.v8n.Check
                // ],
                "_tmp.cshtml":[
                    _file.form.Base.Form
                ]
            }
            await ops.save_grp(`form/Base/`,_part,{arg} );


            // arg.VueComputedToolbar = await ejs.renderFile(_file.form.Base.VueComputedToolbar,arg);
            // var s = await ejs.renderFile(_file.form.Base.Form, arg );
            // ops.save(s,"form/Base/~tmp.cshtml"); 
        },
        async '*Form'(){
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                RESOURCE_NAME:'RESOURCE_NAME',
                Prefix:'',
                SID_Filed,
                row,
                ext_rule:{
                    ROUTE_NO:{
                        Action_Item:'ROUTE_SID'
                    }
                },
                toolbar:{
                    e_query:"1",
                    e_add:"",
                    e_del:"",
                    e_save:"",
                    e_clear:"",
                    //e_import:""
                },
                ut,
                cols:[{
                    label:`label="test"`,
                    prop:"test"
                }],
                tabs:{
                    A:{
                        label:'',
                        //form
                    },
                    B:{
                        grid:{
                            cols:[{
                                label:`label="test"`,
                                prop:"test"
                            }]
                        }
                    },
                },
                el_table:{
                    Html:[],
                    Vue_Methods:{}
                },
                PIECE:{
                    Vue_Data:[
                        _file.piece.vue_data_form,
                        _file.piece.vue_data_i18n,
                    ]
                },
            }
            ops.parseRow(arg);
            ops.parse_gt_toolbar(arg);
            var arg_json = ops.testJson(arg,"form/Base/Form.json"); 
            var point = {
                Main:'cshtml', 
                Htm_Toolbar:1,
                Vue_Data:1,
                Vue_Computed:1,
                Vue_Watch:1,
                Vue_Methods:1,
            }
            await ops.save_point(ops.ts_BasePath(`form/Base/`),point,arg);


            // arg.VueComputedToolbar = await ejs.renderFile(_file.form.Base.VueComputedToolbar,arg);
            // var s = await ejs.renderFile(_file.form.Base.Form, arg );
            // ops.save(s,"form/Base/~tmp.cshtml"); 
        },
        async 'v8n'(){
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var arg = {
                TableName:'PF_ROUTE',
                RESOURCE_NAME:'RESOURCE_NAME',
                Prefix:'RES.BLL.Face.',
                SID_Filed,
                row,
                Fileds:ops.parseFileds(row),
                ut,
            }
            var arg_json = ops.testJson(arg,"v8n/Base.json"); 
             
            var _part = {
                "~RuleFor.cs": [
                    _file.v8n.RuleFor
                ],
                "~Check.cs": [
                    _file.v8n.Check
                ],
                "~tmp.cs":[
                    _file.v8n.Base
                ]
            }
            await ops.save_grp(`v8n/`,_part,{arg} );
        },

        async 'Controller_Base'(){
            let basePath = `Controller/Base/`;
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var TableName = 'PF_ROUTE';

            var arg = {
                Areas:'ADM',
                FunctionName:"QcLevel",
                RESOURCE_NAME:'RESOURCE_NAME',
                TableName,
                Prefix:'RES.BLL.Face.',
                CheckDataRule:`//serv.svcRoute.CheckDataRule = serv.CheckDataRule_${TableName};`,
                SID_Filed,
                row,
                ut,
            }
            arg = ops.parseRow(arg);
            var arg_json = ops.testJson(arg,`${basePath}Base.json`); 
             
            var _part = {
                "~Enable.cs": [
                    _file.ENABLE_FLAG.Controller
                ],
                "~tmp.cs":[
                    _file.Controller.Base._main
                ]
            }
            await ops.save_grp(basePath,_part,{arg} );
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