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
    var map_UI = {
		int(filed){},
		date(filed){return `<el-date-picker type="date" class="eui-fix" v-model="form.${filed.Name}">\r\n\t</el-date-picker>`},
		float(filed){},
		array(filed){return `<el-input type="textarea" v-model="form.${filed.Name}" rows="3">\r\n\t</el-input>`},
		boolean(filed){return ``},
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
        save(data,filename="test.txt",isRelPath=true,isbig5=false){
            var _fullPath = isRelPath
                ? ops.ts_BasePath(filename)
                : filename;
            if (isbig5){
                data = `\uFEFF${data}`;
            }
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
                    //items[idx] = await ejs.renderFile(_ejs, arg);``
                    items[idx] = await _ejs(arg);
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
            if (_grp!=null){
                _grp.map(async(el)=>{
                    var _s = await ejs.renderFile( el ,{arg:BaseArg});
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
                        var _code = point[el];
                        if (Array.isArray(_code)){
                            _code = _code.join('\r\n');
                        }
                        var _file = `${basePath}~${el}.txt`;
                        _file
                        ops.save(_code,_file,false); 
                        break;
                }
            }
        },
        save_point1(basePath,point){
            let {list,part} = point;
            list
            for(var el in list){
                el
                var isArray = list[el];
                var _code 
                    = isArray
                    ? list[el]
                    : [];
                for (var item in part){
                    item
                    var _subCode = part[item][el];
                    if (_subCode!=null){
                        _code.push(_subCode);
                    } 
                }
                _code
                var _file = `${basePath}~${el}.txt`;
                _file
                ops.save(_code.join('\r\n'),_file,false); 
            }
        },
        ejs(fileName,ext="ejs"){``
            return `./tpl_ejsyaml/mvc_gti/${fileName}.${ext}`
        },
        ejs_fn(fileName,ext){``
            ext = _.isNumber(ext)
                ?'ejs'
                :ext;
            return async(arg)=>{
                var _ejs =  `./tpl_ejsyaml/mvc_gti/${fileName}.${ext}`;
                return await ejs.renderFile(_ejs,arg);
            } 
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
        parseRow(arg,setPath = 'Fileds'){
            let {row,Prefix} = arg;
            if (row==null) return ;
            var fileds = [];
            var part = {}; 
            for(var Name in row){
                var val = row[Name];
                var JS = typeof(val);
                switch(JS){
                    case "object":
                        if (val === null){
                            JS = 'string';
                        } else  if (Array.isArray(val)){
                            JS = 'array';
                        } else if (_.isPlainObject(val)){
                            JS = 'json';
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
                var _filed = {
                    Name
                    ,val
                    ,"map_type":{
                        JS,
                        csharp:map_csharpType[JS]
                    }
                    ,label :ut.parse_label(Name,Prefix)
                };
                ut.parse_UI(_filed)
                fileds.push(_filed);

                switch(Name){
                    case "ENABLE_FLAG":
                        part[Name] = true;
                        break;
                }
            }
            _.set(arg, setPath, fileds);
            _.set(arg, 'part', part);
            return arg;
        },
        
        parseFile(args,path=""){
                for (var _name in args){
                    var _val = args[_name];
                var _pathName = `${path}${_name}`;
                var _fnName = `${path}${_name}`;
                if (_.isPlainObject(_val)){
                    ops.parseFile(args[_name] ,`${_pathName}/`);
                }else{
                    args[_name] = ops.ejs_fn(_pathName,_val);
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
        parse_gt_toolbar(Src){
            let {toolbar = {}} = Src; 
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
            var  ENABLE_FLAG = _.get(Src,"ext_mode.ENABLE_FLAG");
            ENABLE_FLAG
            if (ENABLE_FLAG){
                Htm_Toolbar.push(`:enable.sync="ctr_ENABLE.val" `);
                ops.parse_ENABLE_FLAG(Src);
            }
            var gt_toolbar = { 
                Htm_Toolbar,
                Vue_Computed, 
                Vue_Methods
            };
            _.set(Src, 'gt_toolbar', gt_toolbar);
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
        parse_UI(filed){
            /*
            {
                    Name
                    ,val
                    ,"map_type":{
                        JS,
                        csharp:map_csharpType[JS]
                    }
                    ,label :ut.parse_label(Name,Prefix)
                }
            */
            var UI = "";
            let _fn = map_UI[filed.map_type.JS];
            if (_fn!=null){
                UI = `${_fn(filed)}`;
            }
            filed.UI = UI;
        },
        async parse_z(arg){
            arg
            //ejs 是 key word , 其內容為 'ejs filename':{綁定內容}
            let {ejs:ejs_cfg} = arg; 
            ejs_cfg
            var _ejsFileName = Object.keys(ejs_cfg)[0];
            _ejsFileName
            var _ejsFilePath = ops.ts_BasePath(`${_ejsFileName}.ejs`);
            var _ejsArg = ejs_cfg[_ejsFileName];
            _ejsFilePath
            _ejsArg.ut = ut;
            var data = await ejs.renderFile(_ejsFilePath,{arg:_ejsArg});
            arg.arr = data.split('\n');
            return arg;
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
        parse_label(Name,Prefix){
            var _Prefix =  _.isEmpty(Prefix)?"i18n.":Prefix;
            return `${_Prefix=="i18n."?':':''}label="${_Prefix}${Name}"`;
        },
        echo_arr(arr,cb,tab=""){
            //arr
            _.each(arr,(x)=>{
                x
                if (_.isArray(x)){
                    //x
                    ut.echo_arr(x,cb,tab+"\t")
                }else{
                    cb(`${tab}${x}`);
                }
            })
        }
    }
    var _file = {
        Page:{
            Basic:'cshtml',
            GridView_Query:'cshtml',
        },
        Controller:{
            Basic:{
                _main:'cs'
            }
        },
        ENABLE_FLAG:{
            Controller:1,
            Vue_Data:1,
            Vue_Computed:1,
            Vue_Methods:1,
            Vue_Watch:1,
        },
        gt_toolbar:{
            Html_Code:1,
            Vue_Computed:1,
            Vue_Methods:1
        },
        v8n:{
            Base:'cs',
            RuleFor:1,
            Check:1,
        },
        el_table:{
            EditRow:{
                Html_Code:1,
                Vue_Data:1,
                Vue_Methods:1,
            },
            Basic:{
                el_table:1,
                el_table_col:1,
                Vue_Data:1,
                Vue_Methods:1,
            },
            PagerQuery:{
                el_table:1,
                Vue_Data:1,
                Vue_Methods:1,
            },
            _main:'cshtml',
            VueTpl:1,
            VueGridData:1,
            VueGridMethos:1,
            gt_form_col:1,
            
        },
        form:{
            Basic:{
                gt_form:1,
                gt_form_col:1,
                Html_Code:1,
                Vue_Data:1,
                Vue_Methods:1,
            },
            Base:{
                Form:'cshtml',
                VueComputedToolbar:1,
            },
            SequenceNum_Item:'cshtml',
            toolbar_mode_1:1,
        },
        piece:{
            el_tab:1,
            json_i18n:1,
            gt_toolbar:1,
            gt_form_col:'cshtml',
            gt_form_20210406:1,
            xx:'',
            el_table:1,
            el_table_col:1,
            el_table_column:'cshtml',
            vue_data_form:1,
            vue_data_i18n:1,
            Vue_Data:{
                i18n:1,
                form:1,
            },
            Vue_Methods:{
                getSID:1
            },
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
            "DESCRIPTION": [],
            "ENABLE_FLAG":true,
            "CREATE_DATE": "2020-10-15 17:56:21",
            "ZZZ": {},
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
          ],
         
        formx:{
            ejs:{
                'piece/gt_form':{
                    ejs:{
                        'piece/gt_form':{
                            ejs:{
                                'piece/gt_form':{
                                    ejs:{
                                        'piece/gt_form':{
                                            ejs:{
                                                'piece/gt_form':{
                                                    ejs:{
                                                        'piece/gt_form_col':{}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        tabs:{
            "A":{
                "label":"label",
                "SubCode":["SubCode"]
            },
            "B":{
                "label":"label",
                "SubCode":["SubCode"]
            }
        },
    }
 
    var _mvc_gti = {
        Controller:{
            Basic:{
                Main(arg){

                }
            }
        },
        form:{
            
            Base:{
                Main(arg){
                    var _r = {
                        "Htm_Toolbar": [
                            ":e_query=\"v_query\" :e_add=\"e_add\" :e_del=\"e_del\" :e_save=\"e_save\" :e_clear=\"e_clear\" ",
                            ":enable.sync=\"ctr_ENABLE.val\" "
                        ],
                        "Vue_Computed": [
                            "e_query"
                        ],
                        "Vue_Methods": [
                            "e_query",
                            "e_add",
                            "e_del",
                            "e_save",
                            "e_clear"
                        ]
                    }
                    _.set(arg);
                }
            },
            gt_form_col(arg){
                var _arr = [
                    "A",
                    "B",
                    "C",
                ];
                return _arr;
            },
            async Basic(Src,SubCode){
                if (SubCode == null){
                    SubCode = (await _file.form.Basic.gt_form_col({Src})).split('\n');
                }
                var _arg = {
                    Src,
                    SubCode,
                    grid_Src:'grid.data'
                }
                var point = {
                    Html_Form:await _file.form.Basic.gt_form(_arg),
                    Vue_Data:await _file.piece.Vue_Data.form(Src),
                    Vue_Methods:await _file.form.Basic.Vue_Methods(_arg),
                }
                return point;
            },
        },
        async gt_toolbar(Src){
            let {toolbar} = Src;
            var Html_Code = [],
                Vue_Computed = [],
                Vue_Methods=[]
                ;
            _.each(toolbar,(val,key)=>{
                val
                key
                switch(key){
                    case "Cfg":
                        Html_Code.push(val);
                        break;
                    default:
                        var fun = `${key}`;
                        if (val==1){
                            Vue_Computed.push(key);
                            fun = `v_${key.substr(2)}`;
                        }
                        var _method 
                            = _.isString(val)
                            ? `${key}${val}`
                            : `${key}(){}`
                            ;
                        _method
                        Html_Code.push(`:${key}="${fun}"`);
                        Vue_Methods.push(_method); 
                        break;
                }
            })

            // html_toolbar.push(html_fun);
            // var  ENABLE_FLAG = _.get(arg,"ext_mode.ENABLE_FLAG");
            // ENABLE_FLAG
            // if (ENABLE_FLAG){
            //     html_toolbar.push(`:enable.sync="ENABLE_FLAG" `);
            // }
            _.set(Src, 'toolbar.Html_Code', Html_Code);
            _.set(Src, 'toolbar.Vue_Computed', Vue_Computed);
            _.set(Src, 'toolbar.Vue_Methods', Vue_Methods);
            
            // _.set(arg, 'vue.computed.toolbar', vue_computed);

            toolbar
            var _arg = {Src};
            _arg
            var point = {
                Html_ToolBar:await _file.gt_toolbar.Html_Code(_arg), 
                Vue_Computed:await _file.gt_toolbar.Vue_Computed(_arg),
                Vue_Methods:await _file.gt_toolbar.Vue_Methods(_arg),
            }
            point
            return point;
        },
        el_table:{
            async Basic(Src,SubCode){
                if (SubCode == null){
                    SubCode = (await _file.el_table.Basic.el_table_col({Src})).split('\n');
                }
                var _arg = {
                    Src,
                    SubCode,
                    grid_Src:'grid.data'
                }
                var point = {
                    Html_Code:await _file.el_table.Basic.el_table(_arg),
                    Vue_Data:await _file.el_table.Basic.Vue_Data(_arg),
                    Vue_Methods:await _file.el_table.Basic.Vue_Methods(_arg),
                }
                return point;
            },
            async PagerQuery(Src,SubCode){
                if (SubCode == null){
                    SubCode = (await _file.el_table.Basic.el_table_col({Src})).split('\n');
                }
                var _arg = {
                    Src,
                    SubCode,
                    grid_Src:'grid.data'
                }
                var point = {
                    Html_Code:await _file.el_table.PagerQuery.el_table(_arg),
                    Vue_Data:await _file.el_table.PagerQuery.Vue_Data(_arg),
                    Vue_Methods:await _file.el_table.PagerQuery.Vue_Methods(_arg),
                }
                return point;
            },
            async EditRow(Src,SubCode){
                // if (SubCode == null){
                //     SubCode = (await _file.el_table.Basic.el_table_col({Src})).split('\n');
                // }
                var _arg = {
                    Src,
                    SubCode:[],
                    grid_Src:'grid.data'
                }
                var point = {
                    Html_Code:await _file.el_table.EditRow.Html_Code(_arg),
                    Vue_Data:await _file.el_table.EditRow.Vue_Data(_arg),
                    Vue_Methods:await _file.el_table.EditRow.Vue_Methods(_arg),
                }
                return point;
            }
        },
        elUI:{
            async el_tab(Tabs){
                var keys = Object.keys(Tabs);
                var point = {
                    Html_Tabs:await _file.piece.el_tab({Tabs}),
                    Vue_Data:`tabIdx:'${keys[0]}'`
                }
                
                return point;
            },
            el_tab_pane(arr){
                var _base = {};
                return _base;
            },
            
            async el_table_col(arg){
                var _ejs = _file.piece.el_table_col;
                _ejs
                var s = await ejs.renderFile(_ejs, arg,{async:true});
                return s;
            }
        },
        ///
        async ENABLE_FLAG(Src){
            var _arg = {Src};
            var point = {
                Ctr_Code:await _file.ENABLE_FLAG.Controller(_arg),
                Vue_Computed:await _file.ENABLE_FLAG.Vue_Computed(_arg),
                Vue_Methods:await _file.ENABLE_FLAG.Vue_Methods(_arg),
            }
            point
            return point;
        },
        ENABLE_FLAG_20210411(arg){
            var _base = {
                Controller:{
                    './tpl_ejsyaml/mvc_gti/ENABLE_FLAG/Controller':{}
                },
                Vue_Methods:{
                    './tpl_ejsyaml/mvc_gti/ENABLE_FLAG/Vue_Methods':{}
                },
                Vue_Computed:{
                    './tpl_ejsyaml/mvc_gti/ENABLE_FLAG/Vue_Computed':{}
                }
            }
            return _base;
        },
        
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
                POINT:{
                    Htm_Toolbar:{
                        gt_toolbar: [
                            ":e_query=\"v_query\" :e_add=\"e_add\" :e_del=\"e_del\" :e_save=\"e_save\" :e_clear=\"e_clear\" ",
                            ":enable.sync=\"ctr_ENABLE.val\" "
                        ],
                        'piece.vue_data_form':[

                        ]
                    },
                    Vue_Data:1,
                    Vue_Computed:1,
                    Vue_Watch:1,
                    Vue_Methods:1,
                } 

            }
            var point = {
                Main:'cshtml', 
                Htm_Toolbar:1,
                Vue_Data:1,
                Vue_Computed:1,
                Vue_Watch:1,
                Vue_Methods:1,
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
            
            await ops.save_point(ops.ts_BasePath(`form/Base/`),point,arg);



            // arg.VueComputedToolbar = await ejs.renderFile(_file.form.Base.VueComputedToolbar,arg);
            // var s = await ejs.renderFile(_file.form.Base.Form, arg );
            // ops.save(s,"form/Base/~tmp.cshtml"); 
        },
        // 20210330
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
        async 'v8n-OK'(){
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var Src = {
                TableName:'PF_ROUTE',
                RESOURCE_NAME:'RESOURCE_NAME',
                Prefix:'RES.BLL.Face.',
                SID_Filed,
                row,
                Fileds:ops.parseFileds(row),
                ut,
            }
            var arg_json = ops.testJson(Src,"v8n/Base.json"); 
             
            var _point = {
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
            await ops.save_grp(`v8n/`,_point,{Src} );
        },

        async 'Controller_Base-OK'(){
            let basePath = `Controller/Basic/`;
            let {_fn} = ops;
            let {row} = _data;
            var SID_Filed = 'ROUTE_SID'; 
            var TableName = 'PF_ROUTE';

            var Src = {
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
            Src = ops.parseRow(Src);
            var arg_json = ops.testJson(Src,`${basePath}Base.json`); 
             
            var _part = {
                "~Enable.cs": [
                    _file.ENABLE_FLAG.Controller
                ],
                "~tmp.cs":[
                    _file.Controller.Basic._main
                ]
            }
            await ops.save_grp(basePath,_part,{Src} );
        },


        /*
        試作失敗, 原本是希望能利用這種階層格式,來動態生成需要的排版 ,
            但實際碰上的問題是,因為非同步機制的關係,
            子層應該有的縮排效果無法正確的處理,
            最後只能放棄這個方法 
        */
        async '~gt_form_20210406'(){
            ut.echo_ejs= async function (arg,cb){
                arg
                //ejs 是 key word , 其內容為 'ejs filename':{綁定內容}
                let {ejs:ejs_cfg} = arg; 
                if (ejs_cfg !=null){
                    var _ejsFileName = Object.keys(ejs_cfg)[0];
                    _ejsFileName
                    var _ejsFilePath = ops.ts_BasePath(`${_ejsFileName}.ejs`);
                    var _ejsArg = ejs_cfg[_ejsFileName];
                    _ejsFilePath
                    _ejsArg.ut = ut;
                    var data = await ejs.renderFile(_ejsFilePath,{arg:_ejsArg},{async: true});
                    var _arr = data.split('\n');
                    return _arr.map(cb);
                }
                
            }
            var arg  = {
                arg:{
                    ut,
                    ejs:{
                        'piece/gt_form_20210406':{
                            ejs:{
                                'piece/gt_form_20210406':{
                                    ejs:{
                                        'piece/gt_form_20210406':{
                                            ejs:{
                                                'piece/gt_form_20210406':{
                                                    ejs:{
                                                        'piece/gt_form_20210406':{
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
            //var s = await ejs.renderFile(_file.piece.gt_form,{arg:_data.tabsx,ut},{async: true});
            var s = await ejs.renderFile(_file.piece.gt_form_20210406,arg,{async: true});
            ops.save(s,"~test.cshtml");  
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

    var _test = {
        async '以陣列形式產生縮排-OK'(){
            let arg = {arr:[
                "A",
                "B",
                "C",
                [
                    "A",
                    "B",
                    [
                        "A",
                        "B",
                        "C",
                        [
                            "A",
                            "B",
                            "C",
                        ],
                        "D"
                    ],
                    "C",
                    
                ],
            ]};   
            arg.ut = ut;
            var s = await ejs.renderFile(_file.piece.xx,{arg});
            s
            ops.save(s,"~test.cshtml");  
        },
        "parseRow"(){
            var _arg = {
                Prefix:'@Face.',
                row:_data.row
            } 
            ops.parseRow (_arg);
            ops.testJson(_arg);
            return _arg;
        },
        async "el_table_col"(){
            var arg = _test.parseRow();
            var s = await _mvc_gti.elUI.el_table_col({arg});
            ops.save(s,"~test.cshtml"); 
        },
        async "x"(){
            var _ejs = {
                "Prefix": "@Face.",
                "row": {
                    "ROUTE_NO": "C030-19",
                    "ROUTE": "?面?极板（子流程）",
                    "ROUTE_CATEGORY": "R",
                    "DESCRIPTION": "",
                    "ENABLE_FLAG": true
                },
                "Fileds": [
                    {
                        "Name": "ROUTE_NO",
                        "val": "C030-19",
                        "map_type": {
                            "JS": "string",
                            "csharp": "string"
                        },
                        "label": "label=\"@Face.ROUTE_NO\""
                    },
                    {
                        "Name": "ROUTE",
                        "val": "?面?极板（子流程）",
                        "map_type": {
                            "JS": "string",
                            "csharp": "string"
                        },
                        "label": "label=\"@Face.ROUTE\""
                    },
                    {
                        "Name": "ROUTE_CATEGORY",
                        "val": "R",
                        "map_type": {
                            "JS": "string",
                            "csharp": "string"
                        },
                        "label": "label=\"@Face.ROUTE_CATEGORY\""
                    },
                    {
                        "Name": "DESCRIPTION",
                        "val": "",
                        "map_type": {
                            "JS": "string",
                            "csharp": "string"
                        },
                        "label": "label=\"@Face.DESCRIPTION\""
                    },
                    {
                        "Name": "ENABLE_FLAG",
                        "val": true,
                        "map_type": {
                            "JS": "boolean",
                            "csharp": "bool"
                        },
                        "label": "label=\"@Face.ENABLE_FLAG\""
                    }
                ],
                "ext_mode": {
                    "ENABLE_FLAG": true
                },
                ejs:{
                    'piece/el_table':{
                        ejs:{
                            'piece/el_table_col':{}
                        }
                    }
                    // 'piece/el_tableA':{
                    //     ejs:{
                    //         'piece/el_table_colB':{}
                    //     }
                    // }
                }
            }  ;
            var fn = async (ejsCfg,arg)=>{
                if (arg == null) arg = ejsCfg;
                let {ejs:_ejsCfg=null} = ejsCfg; 
                if (_ejsCfg == null) return [];
                var _ejsKeys = Object.keys(_ejsCfg);
                _ejsKeys
                var _SubCode = [];
                await _.each(_ejsKeys,async (key)=>{
                    var _subEjs = _ejsCfg[key];
                    _subEjs
                    var SubCode = await fn(_subEjs,arg);
                    SubCode
                     var _ejsFilePath = ops.ts_BasePath(`${key}.ejs`);
                    _ejsFilePath
                    var data = await ejs.renderFile(_ejsFilePath,{arg,SubCode});
                    data
                    _SubCode.push(data);
                });
                
                ejsCfg.SubCode = _SubCode;
                return ejsCfg;
            }
            var zz = await fn(_ejs);
            _ejs
            ops.testJson(zz);
        },
        async "陣列排版原型"(){
            var Src ={
                ut,
                row:_data.row
            }
            ops.parseRow(Src);
            Src;
            // Src.SubCode = await _mvc_gti.elUI.el_table_col({Src})
            // ops.testJson(Src);
            // var data = await ejs.renderFile(_file.piece.el_table,{Src});
            // ops.save(data,"~test.txt");
            var data = await _mvc_gti.elUI.el_table({Src});
            data 
            ops.save(data,"~test.txt");
        },
        async "Tabs-OK"(){
            var Tabs = _data.tabs;
            var Src ={
                ut,
                row:_data.row
            }
            ops.parseRow(Src);
            // var _point = await _mvc_gti.el_table.Basic({Src});
            // _point
            // Tabs.A.SubCode =  (await _mvc_gti.el_table.Basic({Src})).split('\n');
            // ops.testJson(Tabs);
            //ops.save(Tabs.A.SubCode,"~test.txt"); 
            
            var point = await _mvc_gti.elUI.el_tab(Tabs);

            var _basePath = "piece/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point(ops.ts_BasePath(_basePath),point);

        },
        async "el_table.Basic - OK"(){
            var Src ={
                ut,
                row:_data.row
            }
            ops.parseRow(Src);
            var point = await _mvc_gti.el_table.Basic({Src});
            var _basePath = "el_table/Basic/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point(ops.ts_BasePath(_basePath),point);

        },
        async "el_table.PagerQuery"(){
            var Src ={
                ut,
                Prefix:'',
                SID:'ROUTE_NO',
                row:_data.row,
            }
            ops.parseRow(Src);
            var point = await _mvc_gti.el_table.PagerQuery({Src});
            var _basePath = "el_table/PagerQuery/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point(ops.ts_BasePath(_basePath),point);
        },
        async "el_table.EditRow"(){
            var Src ={
                ut,
                Prefix:'',
                SID:'ROUTE_NO',
                row:_data.row,
            }
            ops.parseRow(Src);
            var point = await _mvc_gti.el_table.EditRow({Src});
            var _basePath = "Page/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point(ops.ts_BasePath(_basePath),point);
            var page = await _file.Page.Basic({Src});
            page
            ops.save(page,`${_basePath}~page.cshtml`);
            var p = "H:/SSMES_Dev/Genesis_MVC/Areas/Example/Views/Act/"
            ops.save(page,`${p}page~.cshtml`,false,true); 

        },
        async "Page.Basic.Grid"(){
            var Src ={
                ut,
                Prefix:'',
                SID:'ROUTE_NO',
                row:_data.row,
                toolbar:{
                    e_add:0,
                    //e_del:0,
                    //e_save:0,
                    e_query:'(){this.query(1);}',
                    e_clear:0,
                    //Cfg:`fixed='top'`,
                },
                Form:{
                    //有設參數,Form 才會產生自己的查詢程序,預設應是不產生
                    //QueryUrl:'@Url.Action("ListData_","Route",new { area="MES"})'
                } 
            }
            ops.parseRow(Src);
            var point = {
                list:{
                    Html_ToolBar:0,
                    Html_Form:0,
                    Html_Code:0,
                    Vue_Data:[
                        await _file.piece.Vue_Data.i18n(Src),
                    ],
                    Vue_Computed:0,
                    Vue_Methods:[
                        await _file.piece.Vue_Methods.getSID(Src), 
                    ],
                },
                part:{
                    ToolBar : await _mvc_gti.gt_toolbar(Src),
                    Form : await _mvc_gti.form.Basic(Src),
                    GridView : await _mvc_gti.el_table.PagerQuery(Src),
                }
            }
            var _basePath = "Page/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point1(ops.ts_BasePath(_basePath),point);
            var page = await _file.Page.Basic({Src});
            ops.save(page,`${_basePath}~page.cshtml`);
            var p = "H:/SSMES_Dev/Genesis_MVC/Areas/Example/Views/Act/"
            ops.save(page,`${p}page~.cshtml`,false); 
        },
        async "Page.Basic"(){
            var Src ={
                ut,
                Prefix:'',
                SID:'ROUTE_NO',
                row:_data.row,
                toolbar:{
                    e_add:0,
                    e_del:0,
                    e_save:0,
                    //e_clear:0,
                    //Cfg:`fixed='top'`,
                }  
            }
            ops.parseRow(Src);
            var point = {
                list:{
                    Html_Code:0,
                    Vue_Data:[
                        await _file.piece.Vue_Data.i18n(Src),
                    ],
                    Vue_Computed:0,
                    Vue_Methods:[
                        await _file.piece.Vue_Methods.getSID(Src), 
                    ],
                },
                part:{
                    ToolBar : await _mvc_gti.gt_toolbar(Src),
                    GridView : await _mvc_gti.el_table.Basic(Src),
                }
            }
            var _basePath = "Page/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point1(ops.ts_BasePath(_basePath),point);
            var page = await _file.Page.Basic({Src});
            ops.save(page,`${_basePath}~page.cshtml`);
            var p = "H:/SSMES_Dev/Genesis_MVC/Areas/Example/Views/Act/"
            ops.save(page,`${p}page~.cshtml`,false); 
        },
        async 'gt_toolbar-OK'(){
            var Src = {
                ut,
                toolbar:{
                    e_Add:0,
                    e_add:1,
                    e_del:0,
                    e_save:0,
                    e_clear:0,
                    Cfg:`fixed='top'`
                }  
            } 
            
            var point = await _mvc_gti.gt_toolbar(Src); 
            var _basePath = ops.ts_BasePath("gt_toolbar/");
            ops.testJson(Src,`gt_toolbar/~Cfg.json`);
            ops.save_point(_basePath,point);
        },
        async 'ENABLE_FLAG - OK'(){
            var Src = {
                ut,
                row:_data.row
            } 
            ops.parseRow(Src);

            var point = await _mvc_gti.ENABLE_FLAG(Src); 
            var _basePath = "ENABLE_FLAG/";
            ops.testJson(Src,`${_basePath}~Cfg.json`);
            ops.save_point(ops.ts_BasePath(_basePath),point);
        },
        async 'ssplit'(){
            var _tpl = (key)=>{ return `<%_ Src.ut.echo_file('~${key}.txt',(el)=>{ _%>
                <%- el %><% }) %>`};
            var Cfg = {
                Src:`./MVC/gti/SequenceNum.cshtml`,
                ExpPath:ops.ts_BasePath('Page/Test/')
            }
            let chk_Path = fs.existsSync(Cfg.ExpPath);
                if (!chk_Path){ 
                    fs.mkdirSync(Cfg.ExpPath);
                }
            var _base = await fs.readFileSync(Cfg.Src);
            _base = _base.toString();

            var _list = _base.match(/##(\s\S|[^##])+@#/g);
            var _cfg = {}
            _.each(_list,(el,idx)=>{
                let [key] = el.match(/##.+/);
                key = key.replace("##","");
                _base = _base.replace(el,_tpl(key));
                var _fileName = `${Cfg.ExpPath}${key}.ejs`;
                var _arr = el.split('\n');
                _arr.shift();
                _arr.pop()
                el = _arr.join('\n');
                ops.save(el,`${_fileName}`,false);
                _cfg[key]=el;
            })
            ops.save(_base,`${Cfg.ExpPath}Main.ejs`,false)
            ops.testJson(_cfg)

        }
    }

    _.each([_gti,_test],(_fn)=>{
        _.each(_fn,(e,k)=>{
            if (k.substr(0,1)=="*"){
                e();
            }
        })
    })
})()