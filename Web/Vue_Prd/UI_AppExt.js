(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'vue','lodash','Mock','ELEMENT'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue,root._,root.Mock);
    }
}(this, function ($, Vue, _,Mock,ELEMENT) {
    //debugger
var _note = {
    jdt_table_cfg:`


    `   

};
    // Vue.directive('debug', {
    //     // 当被绑定的元素插入到 DOM 中时……
    //     update: function (el) {
    //         // 聚焦元素
    //         el.focus()
    //     }
    // })
    var pw_fn = {
        map_DataType:{
            string:{
                mock:["@name"],
                ui:['input']
            },
            boolean:{
                mock:["Y","N"],
                ui:['el-checkbox']
            },
            number:{
                mock:["@integer(60, 100)"],
                ui:['input']
            },
            date:{
                mock: ["@datetime"],
                ui:['el-date-picker']
            },
            array:{
                mock: ["@datetime"],
                ui:['select']
            },
            symbol:{
                mock:["@id"],
                ui:['input']
            },
            object:{
                mock:["@id"],
                ui:['input']
            }
            // old:{
            //     input:'input',
            //     select:'el-select',
            //     checkbox:'el-checkbox',
            //     radio:'el-radio',
            //     date:'el-date-picker',
            //     textarea:'el-input-pw-ext',
            // }
        },
        map_mock:{
            "string":["@name"],
            "boolean":["Y","N"],
            "number":["@integer(60, 100)"],
            "date": ["@datetime"],
            "symbol":["@id"],
            "object":["@id"],
        },
                //專門處理 以行為單位的設定格式
                parse_cols(string_val,filedObj,split=','){
                    var _self = this;
                    var _r = [];
                    var _arr = string_val.split('\n');
                    _.each(_arr,(val,idx)=>{
                        /*
                        這裡預設規劃為3個欄位
                        1.欄位抬頭
                        2.欄位綁定對應,類似實際對應欄位 
                        3.欄位值,以此做為欄位型別判斷
                        */
                        
                        let [col_title,col_bind,col_val] = val.split(split); 
                        col_val = eval(col_val);
                        _r.push(filedObj(col_title,col_bind,col_val));
                    })
                    return _r;
                },
                //專門處理 JsonString 為設定格式
                parse_row(jsonObj,filedObj){
                    var _self = this;
                    var _r = [];
                    _.each(jsonObj,(val,name)=>{
                        _r.push(filedObj(name,name,val));
                    })
                    return _r;
                },
    }

    var _fn = {


        /*先保留 日後移除  */
        FiledMap:{
            old:{
                input:'input',
                select:'el-select',
                checkbox:'el-checkbox',
                radio:'el-radio',
                date:'el-date-picker',
                textarea:'el-input-pw-ext',
            }
        },
        /*
        text:
        json:......
        fn:.......
        radio:[-1,0,1...]
        check:[-1,0,1...]
        */
        parse_Exten(val,note,input_ops){
            //Exten
        },



        // pw_fn:{
        //     v20200818(){
        //         return {
        //             data(){
    
        //             },
        //             methods: {
        //                 parse_cols:_fn.parse_cols,
        //                 parse_row:_fn.parse_row,
        //             },
        //         }
        //     }
        // },
        
        pw_debug:{
            v20200619(){
                return {
                    template:`<div v-if="debug!=null">{{debug}}</div>`,
                    props:{
                        debug:Vue.prototype.$PropDef.FunAppend()
                    },
                }
            }
        },
        /*
        新增 支援 debug 模式,應用請參見 pw_tabs 
        'debug',
        */
        pw_baseModel(immediate=true){
            return {
                props:['value', 'dyn_prop'],
                watch:{
                    value:{
                        handler(val, oldName) {
                            this.$emit('input',val);
                            this.$emit('update:value',val);
                        },
                        immediate,
                        deep: true
                    },
                    dyn_prop:{
                        handler(val, oldName) {
                            this.$emit('dyn_prop',val);
                        },
                        immediate,
                        deep: true
                    },
                }
            }
        },
        /* 或可改直接使用 pw_baseModel,會比較符合官方規範和更好擴展 
         */
        simple_tpl(template,immediate=false){
            var _vue = {
                mixins:[_fn.pw_baseModel(immediate)],
                template,
            }
            return _vue;
        },
        pw_ToolGrp:{
            v2020905(){
                var _obj =  {
                    template: `
                    <span>
                        <el-button type="warning" size="small" round 
                            >SyncBack</el-button>
                    </span>
                    `,
                    props:{
                        cfg:{
                            type:Object,
                            default:{}
                        }
                    }
                    ,computed:{
                        _cfg(){
                            var _r = {};
                            _.each(this.cfg,(val,key)=>{

                            })
                            return _r;
                        }
                    }
                };
                return _obj;
            },
            v2020904(){
                var _obj =  {
                        template: `
                        <span>
                            <el-button type="warning" size="small" round 
                                v-if="SyncBack!=false" 
                                >SyncBack</el-button>
                            
                            <el-button type="success" size="small" round
                                v-if="Exec!=false"  
                                >Exec</el-button>
                            <el-button type="primary" size="small" round
                                v-if="Renew!=false"  
                                >重新產生數據</el-button>
                        </span>
                        `,
                        props:{
                            //沒設定則不顯示
                            Exec:Vue.prototype.$PropDef.FunEnable(),
                            /*
                            v1:應考慮由原生 的 fun 中,做預設不切換為宜
                            v0:預設的定義是,不會觸發頁籤切換行為 ,故而會傳入一個 false 
                            */
                            Renew:Vue.prototype.$PropDef.FunEnable(),
                            SyncBack:Vue.prototype.$PropDef.FunEnable(),
                        },
                };
                return _obj;
            }
        },
        pw_input:{
            V20200905(){
                var _obj = {
                    mixins:[_fn.pw_baseModel(false)],
                    template: `
                    <div>
                        <pw-debug v-bind="$attrs" />
                        <span>
                        <el-button type="warning" size="small" round 
                            v-if="SyncBack!=false" 
                            @click="SyncBack(JsonCode)">SyncBack</el-button>
                        <el-button type="success" size="small" round
                            v-if="Exec!=false"  
                            @click="Exec(JsonCode)">Exec</el-button>
                        <el-button type="primary" size="small" round
                            v-if="Renew!=false"  
                            @click="Renew(JsonCode.isZip)">重新產生數據</el-button>
                            </span>
                        <slot :JsonCode="JsonCode" />
                        <el-checkbox v-model="JsonCode.isZip" 
                            v-if="JsonCode.isObj" 
                            @change="Input_Src=JsonCode.toJsonStr()">zip_json</el-checkbox>
                        <div style="position:relative">
                            <h5 v-if="JsonCode.isObj"><span class="label label-info" style="position:absolute;right:0px;z-index:999;opacity:0.7;">JsonType</span></h5>
                            <el-input type="textarea" v-model="Input_Src" />
                        </div>
                    </div>
                    `,
                    data(){
                        return {
                            _exec:{
                                type:'info',
                                fn(){}
                            },
                            JsonCode:Vue.prototype.$UT.JsonCode(null)
                        }
                    },
                    props:{
                        //沒設定則不顯示
                        Exec:Vue.prototype.$PropDef.FunEnable(),
                        /*
                        v1:應考慮由原生 的 fun 中,做預設不切換為宜
                        v0:預設的定義是,不會觸發頁籤切換行為 ,故而會傳入一個 false 
                        */
                        Renew:Vue.prototype.$PropDef.FunEnable(),
                        SyncBack:Vue.prototype.$PropDef.FunEnable(),

                    },
                    computed:{
                        Input_Src:{
                            get(){
                                this.chk_Json(this.value);
                                return this.value;
                            },
                            set(val){
                                this.chk_Json(val);
                                this.$emit('input',val);
                                this.$emit('update:value',val);
                            }
                        },
                        
                    },
                    methods:{
                        act(name){
                            var _act = this[name];
                            if (_.isFunction(_act)) this
                        },
                        fn_ZipJson(JsonCode){
                            //請改用 JsonCode.toJsonStr() 先保留 ,日後會移除 
                            if (JsonCode.isObj){
                                this.Input_Src = this.zip_json
                                    ? JSON.stringify(JsonCode.val)
                                    : JSON.stringify(JsonCode.val,null,'\t');
                            }
                        },
                        chk_Json(val){
                            //console.log({chk_Json:val});
                            this.JsonCode = this.$UT.JsonCode(val,this.JsonCode.isZip);
                            return this.JsonCode.isObj;
                        }
                    }
                };
                return _obj;
            }
        },
        x_component:{
            v20200905(){
                return {
                    mixins:[_fn.pw_baseModel()],
                    template:`
                        <component v-bind="dyn_prop"></component>
                    `,
                    computed:{
                        dyn_prop(){
                            let {dyn_prop={}} = this.value;
                            return dyn_prop;
                        },
                        is(){
                            let {is="",tabs=null} = this.value;
                            if (is == "" && tabs !=null) is = 'pw-tabs'
                            return is;
                        },
                        val:{
                            get(){
                                let {val=null,__chgTab=null} = this.value;
                                //自動補上 val 參數
                                if (val == null && _.isPlainObject(this.value)){
                                    this.$set(this.value,'val',"");
                                }
                                switch(this.is){
                                    case "pw-tabs":
                                        var _tabObj = this.value;
                                        //以下這段 code 與 pw_tabs 有重覆,
                                        //  先 mark 掉,日後不用再刪除 
                                        // if (__chgTab==null){
                                        //     debugger
                                        //     //1非常規的用法,故而特意名為 __chgTab ,以便追查
                                        //     this.$set(_tabObj,'__chgTab',(name)=>{
                                        //         _tabObj.val = name;
                                        //         return _tabObj.tabs[name];
                                        //     });
                                        // }
                                        return _tabObj;
                                        break;
                                }
                                return this.value.val;
                            },
                            set(val){
                                switch(this.is){
                                    case "pw-tabs":
                                        this.value = val;
                                        break;
                                    default:
                                        this.value.val = val;
                                        break;
                                }
                            }
                        },
                    },
                }
            },
            v20200614(){
                return {
                    //v-bind="dyn_prop"
                    mixins:[_fn.pw_baseModel()],
                    template:`
                        <component 
                            :is="is"
                            v-model="val"
                            v-bind="$attrs"
                        ></component>
                    `,
                    computed:{
                        dyn_prop(){
                            let {dyn_prop={}} = this.value;
                            return dyn_prop;
                        },
                        is(){
                            let {is="",tabs=null} = this.value;
                            if (is == "" && tabs !=null) is = 'pw-tabs'
                            return is;
                        },
                        val:{
                            get(){
                                let {val=null,__chgTab=null} = this.value;
                                //自動補上 val 參數
                                if (val == null && _.isPlainObject(this.value)){
                                    this.$set(this.value,'val',"");
                                }
                                switch(this.is){
                                    case "pw-tabs":
                                        var _tabObj = this.value;
                                        //以下這段 code 與 pw_tabs 有重覆,
                                        //  先 mark 掉,日後不用再刪除 
                                        // if (__chgTab==null){
                                        //     debugger
                                        //     //1非常規的用法,故而特意名為 __chgTab ,以便追查
                                        //     this.$set(_tabObj,'__chgTab',(name)=>{
                                        //         _tabObj.val = name;
                                        //         return _tabObj.tabs[name];
                                        //     });
                                        // }
                                        return _tabObj;
                                        break;
                                }
                                return this.value.val;
                            },
                            set(val){
                                switch(this.is){
                                    case "pw-tabs":
                                        this.value = val;
                                        break;
                                    default:
                                        this.value.val = val;
                                        break;
                                }
                            }
                        },
                    },
                }
            }
        },
        pw_tabs:{
            v20200905(){
                return {
                    mixins:[_fn.pw_baseModel(false)],
                    template:`
                    <div>
                        <div v-if="debug!=false">{{debug}}</div>
                        <el-tabs :type="tab_type" v-model="val">
                            <template v-for="(tab,key,idx) in tabs">
                                <el-tab-pane v-if="key!='value'"
                                    :label="key" 
                                    :name="key" 
                                    :key="idx"
                                    >
                                    <component 
                                        
                                        v-bind="tabs[key]" 
                                        :debug="tabs[key]"></component>
                                </el-tab-pane>
                            </template> 
                        </el-tabs>
                    </div>
                    `,
                    props:{
                        tabs:{
                            type:Object,
                            default:{}
                        }
                    },
                    computed:{
                           
                        _dyn_prop(){
                            return {};
                            let {dyn_prop=null} = this.dyn_prop;
                            return dyn_prop;
                        },
                        // tabs(){
                        //     let {tabs={}} = this.dyn_prop;
                        //     return tabs;
                        // },
                        tab_type(){
                            // let {tab_type='border-card'} = this.dyn_prop;
                            // return tab_type;
                            return 'border-card';
                            let {tab_type='border-card'} = this.dyn_prop;
                        },
                        val:{
                            get(){
                                debugger
                                let {val="",__chgTab =null} = this.dyn_prop;
                                if (val=="") {
                                     let [idx0=""]= Object.keys(this.tabs);
                                     val = idx0;
                                }
                                var _tabObj = this.dyn_prop;
                                if (__chgTab==null){
                                    //2執行頁籤切換,一併傳回該 tab 的資料物件,以便後續操作 
                                    this.$set(_tabObj,'__chgTab',(name)=>{
                                        _tabObj.val = name;
                                        return _tabObj.tabs[name];
                                    });
                                }
                                return val;
                            },
                            set(val){
                                this.dyn_prop.val = val;
                            }
                        }
                    }


                }
            },
            v20200614(){
                return {
                    //,_fn.pw_debug.v20200619
                    mixins:[_fn.pw_baseModel(false)],
                    template:`
                    <div>
                        <pw-debug v-bind="$attrs"/>
                        <div v-if="debug!=false">{{debug}}</div>
                        <el-tabs :type="tab_type" v-model="val">
                            <el-tab-pane
                                v-for="(tab,key,idx) in tabs" 
                                :label="key" 
                                :name="key" 
                                :key="idx"
                                >
                                <pw-tool-grp v-bind="dyn_prop" />
                                <x-component v-model="tabs[key]" /></x-component>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    `,
                    data(){
                        return {
                            tab:''
                        }
                    },
                    computed:{
                        dyn_prop(){
                            debugger
                            let {dyn_prop=null} = this.value;
                            return dyn_prop;
                        },
                        tabs(){
                            let {tabs={}} = this.value;
                            return tabs;
                        },
                        tab_type(){
                            let {tab_type='border-card'} = this.value;
                            return tab_type;
                        },
                        val:{
                            get(){
                                debugger
                                let {val="",__chgTab =null} = this.value;
                                if (val=="") {
                                     let [idx0=""]= Object.keys(this.tabs);
                                     val = idx0;
                                }
                                var _tabObj = this.value;
                                if (__chgTab==null){
                                    //2執行頁籤切換,一併傳回該 tab 的資料物件,以便後續操作 
                                    this.$set(_tabObj,'__chgTab',(name)=>{
                                        _tabObj.val = name;
                                        return _tabObj.tabs[name];
                                    });
                                }
                                return val;
                            },
                            set(val){
                                this.value.val = val;
                            }
                        }
                    },
                }
            }
        },
        /*
        把 pw_mock_cfg 另外再拆出來,主要是為了讓 pw_mock 可以更單純
            的被其他開發應用需求 調用.
        */
        pw_mock_cfg(){
            var _obj = {
                    components:{'pw-mock-cfg-col':_fn.pw_mock_cfg_col()},
                    template: `
                    <el-tabs :type="tab_type" v-model="tab">
                        <el-tab-pane label="Input" name="A" v-if="Input_show">
                            <pw-input v-model="Input" :Exec="GenConfig" />
                        </el-tab-pane>
                        <el-tab-pane label="Config" name="B">
                            <el-button type="danger" size="small" round @click="RestMockCode">RestMockCode</el-button>
                            <pw-mock-cfg-col v-model="tableData" />
                        </el-tab-pane>
                        <el-tab-pane label="Mock" name="C" >
                            <el-tabs v-model="tabC">
                                <el-tab-pane label="Code" name="C0" >
                                    <pw-input ref="MockCode" v-model="MockCode" 
                                        :Renew="renew_MockCode"
                                        :SyncBack="SyncBack_Config"/>
                                </el-tab-pane>
                                <el-tab-pane label="Data" name="C1" >
                                    <pw-input ref="MockData" v-model="MockData" 
                                        :Renew="renew_MockData"/>
                                </el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>
                    </el-tabs>
                    
                    `,
                    props:{
                        tab_type:{
                            type:String,
                            default:'border-card'
                        },
                        input_src:{
                            type:String,
                        },
                        mock:{
                            type:[String,Object],
                        }
                    },
                    watch:{
                        tab(val){
                            switch(val){
                                case "C":
                                    this.switch_TabC();
                                    break;
                            }
                        },
                        tabC(val){
                            this.switch_TabC();
                        },
                        input_src:{
                            immediate: true, // makes the watcher fire on first render, too.
                            handler(){
                                var JsonCode = Vue.prototype.$UT.JsonCode(this.input_src);
                                this.GenConfig(JsonCode,false);
                            }
                        },
                    },
                    computed:{
                        //決定最終存取那個資源
                        Input:{
                            get(){
                                if (this.Input_show){
                                    return this.Input_Src;
                                } 
                                return this.input_src;
                            },
                            set(val){
                                if (this.Input_show){
                                    this.Input_Src = val;
                                }else{
                                    this.$emit('update:input_src', val);
                                } 
                            }
                        },
                        Input_show(){
                            var show = this.input_src == null;
                            if (!show && this.tab=="A") this.tab = "B";
                            return show;
                        },
                        o_MockCode(){
                            return this.$refs.MockCode;
                        },
                        o_MockData(){
                            return this.$refs.MockData;
                        },
                        test_MockCode(){
                            if (!this.o_MockCode) return {};
                            return this.o_MockCode.JsonCode;
                        }
                    },
                    data(){
                        return {
                            tab:'A',
                            tabC:"C1",
                            data_zip:false,
                            mock_zip:false,
                            tableData:[]
                            ,MockCode:''
                            ,MockData:''
                            ,Input_Src:'A\nB'
                        }
                    },
                    methods:{
                        RestMockCode(){
                            this.$confirm('此動作將直接覆寫掉現在的MockCode?', '提示', {
                                confirmButtonText: 'yes',
                                cancelButtonText: 'cancel',
                                type: 'warning'
                              }).then(() => {
                                this.MockCode = "";
                                this.MockData = "";
                                this.tab = "C";
                                this.tabC = "C1";
                              }).catch(() => {
                              });
                        },
                        switch_TabC(val=this.tabC){
                            switch(val){
                                case "C0":
                                    if (this.MockCode!="") return ;
                                    //this.MockCode = this.renew_mock();
                                    break;
                                case "C1":
                                    if ((!this.MockData)==false) return ;
                                    if (this.MockCode==""){
                                        this.renew_MockCode
                                            (this.o_MockData.zip_json
                                            ,false);
                                        //issue:沒這麼處理,會造成 mockdata 產生異常
                                        this.o_MockCode.chk_Json(this.MockCode);
                                    }
                                    this.renew_MockData();
                                    break;
                            }
                        },
                        GenConfig(JsonCode,isChgTab=true){
                            debugger
                            if (isChgTab){
                                this.tab = "B";
                                this.tabC = "C1"	
                            } 
                            if (!JsonCode.val) return ;
                            let _act = JsonCode.isObj
                                ? pw_fn.parse_row
                                : pw_fn.parse_cols
                                ;
                            this.tableData =  _act(JsonCode.val,this.filedObj);
                        },
                        renew_MockCode(isChgTab=false){
                            //if (isChgTab) this.tab = "B";
                            let {zip_json=false} = this.o_MockCode ?? {}
                            this.MockCode = this.genMockCode(true,zip_json);
                        },
                        
                        renew_MockData(zip_json=this.o_MockData.zip_json){
                            /*
                            parseMockData 時 ,資料是源於 o_MockCode ,
                                但是是否要zip ,卻必須是依據 o_MockData 的設定,
                                為簡便處理,所以需要利用以下程序來 處理
                            */
                            let _JsonCode = Object.assign({},this.o_MockCode.JsonCode);
                            _JsonCode.isZip = zip_json;
                            
                            this.MockData = this.parse_MockData
                                (_JsonCode
                                ,true);
                        },
                        parse_MockData(JsonType, toSting=false){
                            let {isObj=false,val,isZip=false} = JsonType;
                            if (isObj){
                                var _mockdata = Mock.mock(val).data;
                                if (toSting){
                                    return isZip
                                        ? JSON.stringify(_mockdata)
                                        : JSON.stringify(_mockdata,null,'\t');
                                }
                                return _mockdata;
                            }
                            return null;
                        },
                        genMockCode(toSting=false,isZip=false){
                            return this.parse_MockCode
                                    (this.tableData,
                                    toSting,
                                    isZip);
                        },
                        parse_MockCode(ColObj,toSting,isZip = this.o_MockCode){
                            var _obj = {};
                            _.each(ColObj,(item)=>{
                                let {code={}} = item;
                                _obj = _.merge(_obj,code);
                            })
                            var _mockCode = {'data|5':[_obj]};
                            if (toSting){
                                var _code = this.o_MockCode.isZip
                                    ? JSON.stringify(_mockCode)
                                    : JSON.stringify(_mockCode,null,'\t');
                                return _code;
                            }
                            return _mockCode;
                        },

                        SyncBack_Config(JsonType,isChgTab=true){
                            if (isChgTab){
                                this.tab = "B";
                            }
                            if (JsonType.isObj){
                                var _self = this;
                                let [key0=null] = _.keys(JsonType.val);
                                if (key0==null || _.isArray(JsonType.val[key0])==false){
                                    console.error('SyncBack_Config()-解析不到正確資料');
                                    return;
                                }
                                var cols=[];
                                var _mock = JsonType.val[key0][0];
                                _.each(_mock,(ops,key)=>{
                                    debugger
                                    let [col_name] = key.split('\|');
                                    cols.push(_self.filedObj(col_name,ops));
                                })
                                _self.tableData = cols;
                            }
                        },
    
                        filedObj(name,pass,data_val=""){
                            var mock_ops = pw_fn.map_mock[$.type(data_val)];
                            var _r = {
                                name,
                                mock_ops,
                                get code(){
                                    var _code = {};
                                    _code[`${this.name}|+1`] = this.mock_ops;
                                    return _code;
                                },
                                mock(){
                                    this.demo = Mock.mock(this.code)[this.name];
                                    return this.demo;
                                }
                            };
                            _r.mock();
                            return _r;
                        },
                        
                    }
            };
            return _obj;
        },
        pw_mock_cfg_col(){
            return _fn.simple_tpl(`
                <el-table
                    :data="value"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="欄位名稱"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="選項"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.mock_ops }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="demo"
                        width="250">
                        <template slot-scope="scope">
                            <span class="" @click="scope.row.mock()">{{ scope.row.demo }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            `);
        },
        pw_mock(){
            var _obj = {
                template: `
                <el-tabs v-model="tabC">
                    <el-tab-pane label="Code" name="C0" >
                        <pw-input ref="MockCode" v-model="MockCode" 
                            :Renew="Renew"
                            :SyncBack="SyncBack">
                        </pw-input>
                    </el-tab-pane>
                    <el-tab-pane label="Data" name="C1" >
                        <pw-input ref="MockData" v-model="MockData" 
                            :Renew="renew_MockData"/>
                    </el-tab-pane>
                </el-tabs>
                `,
                props:{
                    SyncBack:Vue.prototype.$PropDef.FunEnable(),
                    Renew:Vue.prototype.$PropDef.FunEnable()
                }
            };
            return _.merge(_fn.pw_mock_cfg(), _obj);
        },
        jdt_table_cfg(){
            var _vue = {
                components:{
                    'jdt-table-cfg-col': _fn.jdt_table_cfg_col()
                },
				template: `
                <el-tabs v-model="tab" type="border-card">
                    <el-tab-pane label="Note" name="A">
<pre>${_note.jdt_table_cfg}</pre>
					</el-tab-pane>
					<el-tab-pane label="Input" name="B">
                        <pw-input v-model="input_val" :Exec="GenConfig"/>
					</el-tab-pane>
					<el-tab-pane label="Config" name="C">
						<el-tabs v-model="tabC">
							<el-tab-pane label="Code" name="C0">
                                <pw-input ref="cfg_Code" v-model="Config.input_Code" 
                                    :Exec="Exec_ConfigCode"
                                    :Renew="()=>{Config.input_Code='';Act_ConfigCode();}"
                                    />
							</el-tab-pane>
                            <el-tab-pane label="Columns" name="C1">
                                <jdt-table-cfg-col v-model="Config.grid_Col" />
							</el-tab-pane>
							<el-tab-pane label="Exten" name="C2">
                                <pw-input v-model="Config.Exten" />
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>
					<el-tab-pane label="Mock" name="D" >
                        <pw-mock tab_type="" ref="oMock"
                            :input_src.sync="Mock.Code"
                            :mock.sync="Mock.Data" />
					</el-tab-pane>
				</el-tabs>
					
				`,
				data(){
					return {
                        Config:{
                            input_Code:'',
                            grid_Col:[],
                            Exten:`{
                                "responsive":true,
                                "paging": false,
                                "fixedColumns": true,
                                "ordering":true
                            }`
                        },
                        Mock:{
                            Code:'',
                            Data:'',
                        },
                        jdt_code:'',
						input_val:'A\nB',
                        input_ConfigCode:'',
						row:{B:2,A:'A',C:new Date(),E:true,F:{}},
						isMock:true,
						tab:'B',
						tabC:'C1',
						tab_F:'F1',
						Ops:'',
						auto_col:[],
						jdt_set:null,
						jdt_data:null,
						Code:'',
						mock:null,
						mock_zip:false
					}
				},
				watch:{
					tab(val){
						switch(val){
                            case "C":
                                //if (this.jdt_code !="") 
                                break;
							case "D":
								this.Act_MockData();
								break;
							case "E":
								this.fn_Code();
								break;
						}
					},
                    tabC(val){
                        switch(val){
                            case "C0":
                                this.Act_ConfigCode();
                                break;
						}
                    },
					isMock(val){
						if (val==false) this.mock = null;
					}
				},
				methods:{
					GenConfig(JsonCode,isChgTab=true){
                        debugger
						if (isChgTab){
							this.tab = "C";
							this.tabB = "C1"	
						} 
                        if (!JsonCode.val) return ;
                        var _act = JsonCode.isObj
                                ? pw_fn.parse_row
                                : pw_fn.parse_cols
                                ;
                        this.Config.grid_Col = _act (JsonCode.val , this.genObj);
                    },
                    Act_ConfigCode(zip_json=false){
                        debugger
                        if (this.Config.input_Code!='') return ;
                        var _cfg = {
                            columns:[]
                        };
                        _.each(this.Config.grid_Col,(el)=>{
                            let {title,data}=el;
                            _cfg.columns.push({title,data});
                        })
                        var _ext_JsonCode = this.$UT.JsonCode(this.Config.Exten);
                        if (_ext_JsonCode.isObj){
                            _cfg = _.merge(_cfg,_ext_JsonCode.val);
                        }
                        var _JsonCode = this.$UT.JsonCode(_cfg,zip_json) 
                        this.$refs.cfg_Code.fn_ZipJson(_JsonCode);
                    },
                    Exec_ConfigCode(JsonCode){
                        if (!JsonCode.isObj) return;
                        var _self = this;
                        _self.tabC = "C1";

                        //TODO:Exten - 先不處理回溯的功能
                        let {columns=[]} = JsonCode.val;
                        let _cols = [];
                        _.each(columns,(el)=>{
                            let {title,data} = el;
                            _cols.push(_self.genObj(title,data));
                        })
                        _self.Config.grid_Col = _cols;
                    },
                    Act_MockData(){
                        debugger
                        if ((!this.Mock.Data)==false) return ;
                        if (this.Mock.Code==""){
                            var _code = this.gen_MockCode();
                            // this.renew_MockCode
                            //     (this.o_MockData.zip_json
                            //     ,false);
                            // //issue:沒這麼處理,會造成 mockdata 產生異常
                            // this.o_MockCode.chk_Json(this.MockCode);
                        }
                        this.renew_MockData();
                    },
                    renew_MockCode(){

                    },
                    gen_MockCode(){
                        debugger;
                        return this.$refs.oMock.parse_MockCode(this.Config.grid_Col);
                    },
					genObj(title, data , data_val = ""){
                        data = data ?? title;
                        var mock_ops = pw_fn.map_mock[$.type(data_val)];
						var _r = {
							title,
							data,
							mock_ops,
							get col_code(){
								let {title,data} = this;
								return {title,data};
							},
							get mock_code(){
								var _code = {};
								_code[`${this.data}|+1`] = this.mock_ops;
								return _code;
							},
							mock(){
								this.demo = Mock.mock(this.mock_code)[this.data];
								return this.demo;
							}
						};
						_r.mock();
						return _r;
					},
					fn_BindMockData(){
						debugger
						var _r = this.$refs.pw_mock.MockCode;
						if (!_r){
							_r = this.$refs.pw_mock.genMockData(true);
						}
						this.jdt_data = JSON.parse(_r);
						this.tab = "C";
					},
					fn_Ops(isZip=false){
						debugger
						this.Ops = this.$refs.jqDT.getOps(true,isZip);
					},
					fn_Code(){
						if (this.Ops == null || this.Ops == "") this.fn_Ops();
						var arg = JSON.parse(this.Ops);
						this.Code = this.$refs.jqDT.genCode(arg);
						console.log(this.Code);
					},
					fn_GenView(){
						this.fn_simple(this.Ops);
					}
				}
            }
            return _vue;
        },
        jdt_table_cfg_col(){
            return _fn.simple_tpl(
                `<el-table
                    :data="value"
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="欄位名稱"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="data"
                        label="對應欄位"
                        />
                    <el-table-column
                        label="Mock選項"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.mock_ops }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="demo"
                        width="250">
                        <template slot-scope="scope">
                            <span class="" @click="scope.row.mock()">{{ scope.row.demo }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                `);
        },
        jdt_table_cfg_ext(){
            /*
            responsive:[true,'自適應折行'],
            paging: false,
            fixedColumns: true,
            ordering
                                */
            return _fn.simple_tpl( `
                <el-table
                    :data="value"
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="欄位名稱"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="data"
                        label="對應欄位"
                        />
                    <el-table-column
                        label="Mock選項"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.mock_ops }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="demo"
                        width="250">
                        <template slot-scope="scope">
                            <span class="" @click="scope.row.mock()">{{ scope.row.demo }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                `);
        },
        power_form_base:{
            20200614(){

            },
            old(arg){
                var _vue = {
                    inheritAttrs:false,
                    props:{
                        quick:{
                            type:Array,
                        },
                        form_base:{
                            type:Object,
                        },
                        filed_map:{
                            type:Object
                        },
                        debug:{
                            default:false
                        }
                    },   
                    data(){
                        return {
                            form:{},
                            FiledMap:_fn.FiledMap.old
                        }
                    },
                    mounted(){
                        if (this.filed_map !=undefined){
                            this.FiledMap = _.merge(this.FiledMap,this.filed_map);
                        }
                        this.__mode_quick();
                        this.__mode_std();
                    },
                    watch: {
                        quick(){
                            this.__mode_quick();
                        },
                        form_base(){
                            this.__mode_std();
                        }
                    },
                    methods:{
                        __mode_quick(){
                            if (this.quick ==undefined || this.form_base != undefined ) return ;
                            var _r = {};
                            _.each(this.quick,(label)=>{
                                var _base = {
                                    label,
                                    type:this.FiledMap.input,
                                    val:''
                                }
                                if (this.debug) _base.val = label;
                                _r[label]=_base;
                            })
                            this.form = _r;
                        },
                        __mode_std(){
                            if (this.form_base == undefined ) return ;
                            var _self = this;
                            var _r = {};
                            _.each(this.form_base,(val,label)=>{
                                var _t = typeof(val);
                                var _base = {
                                    label,
                                    type:_self.FiledMap.input,
                                    val
                                }
                                switch(_t){
                                    case "string":
                                        if (val.substr(0,1) == '~'){
                                            _base.type = _self.FiledMap.textarea;
                                        }
                                        //基於轉換處理的考量,先不自動把日期字段判斷為日期物件
                                        //else if (isNaN(Date.parse(val))==false){}
                                        break;
                                    // case "number":break;
                                    case "boolean":
                                        _base.type = _self.FiledMap.checkbox;
                                        break;
                                    case "object":
                                        if (_.isNull(val)){
                                        }else if (_.isArray(val)){
                                            _base.type = _self.FiledMap.select;
                                            _base.src= val;
                                            if (val.length !=0){
                                                _base.type +='-pw-ext';
                                            }
                                        }else if (_.isDate(val)){
                                            _base.type = _self.FiledMap.date;
                                        }else if (_.isPlainObject(val)){
                                            let {checkbox,radio,textarea,select,src,type,label} = val;
                                            if (type != null && label != null){
                                                console.log(val);
                                                _base = val;
                                                break;
                                            } 
                                            if (textarea!=null){
                                                _base.type = _self.FiledMap.textarea    ;
                                                _base.val = textarea;
                                            }
                                            if (checkbox!=null){
                                                _base.type =_self.FiledMap.checkbox;
                                                _base.val 
                                                    = _.isArray(checkbox)
                                                    ? checkbox
                                                    : [checkbox]
                                                    ;
                                            }else if (radio!=null){
                                                _base.type =_self.FiledMap.radio;
                                                _base.val = radio;
                                            }else if (select!=null){
                                                _base.type =_self.FiledMap.select;
                                                _base.val = select;
                                            }
                                            if (src !=null){
                                                _base.src = src;
                                                _base.type +="-pw-ext";
                                            }
                                        }
                                        break;
                                }
                                _r[label]= _base;
                            })
                            this.form = _r;
                        }
                    }
                }
                return _vue;
            }
        }
        ,pw_form_el_ext(){
            return {
                mixins:[_fn.power_form_base.old()],
                template: `
                <el-row>
                    <el-grp-filed 
                        v-for="(item,key) in form"
                        :label="item.label"
                        :key=key
                        v-model="item.val"
                        >
                        <component
                            :ops="item"
                            :is="item.type"
                            v-if="item.type!='input'"    
                            v-model="item.val"
                            >
                            </component>
                        </el-grp-filed>
                </el-row>
                `,
            };
        },
        pw_form_bts_ext:{
            old(){
                return {
                    mixins:[_fn.power_form_base.old()],
                    template: `
                    <div class="form-horizontal gt-form">
                        <div v-for="(item,key) in form">
                            <bts-grp-filed 
                                :label="item.label"
                                :key=key
                                v-model="item.val">
                                <component
                                    :ops="item"
                                    :is="item.type"
                                    v-if="item.type!='input'"    
                                    v-model="item.val">
                                </component>
                            </bts-grp-filed>
                        </div>
                    </div>
                    `,
                    methods:{
                        genCode(arg){
                            var tpl = {
                                main(list,_form){
                                    return `form:${JSON.stringify(_form,null,'\t')}
    <div class="form-horizontal gt-form">${list.join('')}
    </div>`;
                                },
                                item(key,item){
                                    var isBaseType =  (item.type=='input');
                                    var _model = `v-model="form.${key}"`;
                                    return `\n\t<bts-grp-filed label="${item.label}" ${isBaseType?_model:''}>${tpl.byType(isBaseType,_model,item)}</bts-grp-filed>`
                                },
                                byType(isBaseType,_model,item){
                                    if (isBaseType) return "";
                                    return `\n\t\t<${item.type} ${_model} />\n\t`
                                }
                            };
                            var list = []
                            var _form = {};
                            _.each(arg,(val,key)=>{
                                list.push(tpl.item(key,val));
                                _form[key]=key;
                            })
                            return tpl.main(list,_form);
                        }
                    }
                };
            }
        },
        'pw_form_cfg_col'() {
            return _fn.simple_tpl(
                `<el-table
                    :data="value"
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        label="欄位抬頭"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="ui_type"
                        label="欄位型別"
                        />
                    <el-table-column
                        label="demo"
                        width="250">
                        <template slot-scope="scope">
                            <x-component :is="scope.row.ui_type"/>
                        </template>
                    </el-table-column>
                </el-table>
                `);
        },
        'pw_form_ext':{
            v20200622(){
                return {
                    template:`
                    <x-component :is="is">
                        <slot></slot>
                    </x-component>
                    `,
                    props:{
                        //{bts|el}
                        type:{
                            type:String,
                            default:'bts'
                        },
                        //{col|dataRow}
		                quick:{
                            type:[String,Array,Object]
                        },
		                schema:{
                            type:[Object]
                        },
                        mock:{
                            type:[Object]
                        }
                    },
                    computed: {
                        is(){
                            return `power-form-${this.type}`
                        }
                    },
                }
            }
        },
        'pw_form_cfg':{
            /*
            全新架構,以 dyn_cfg 基礎做動態生成
            */
            v20200618(){
                return {
                    template:`<pw-tabs v-model="pw_model" :debug="debug"></pw-tabs>`,
                    data(){
                        var _self= this;
                        return {
                            pw_model:{
                                val:'',
                                tabs:{
                                    //基礎資料輸入
                                    Input:{
                                        is:'pw-input',
                                        dyn_prop:{
                                            Exec:_self.InputA_Exec
                                        },
                                        val:"A,,true\nB,,\nC,,['A']"
                                    },
                                    Config:{
                                        dyn_prop:{
                                            Exec:_self.InputA_Exec,
                                            SyncBack(){}
                                        },
                                        tabs:{
                                            
                                            code:{
                                                is:'pw-input',
                                            },
                                            grid:{
                                                is:'pw-form-cfg-col',
                                                dyn_prop:{
                                                    Exec:_self.InputA_Exec
                                                },
                                                val:[],
                                            }
                                        }
                                    },
                                    View:{
                                        is:'power-form-bts-ext',
                                        dyn_prop:{
                                            quick:[]
                                        }
                                    },
                                    Json:{

                                    },
                                    Code:{

                                    }
                                }
                            }
                        }
                    },
                    computed:{
                        main_tab(){
                            return this.pw_model.tabs;
                        },
                        tab_View(){
                            return this.main_tab.View;
                        },
                        tab_Config(){
                            return this.main_tab.Config;
                        },
                        debug(){
                            //return false;
                            return this.base;
                        },
                    },
                    methods:{
                        InputA_Exec(JsonCode){
                            var x = [];
                            var _parse = JsonCode.isObj
                                ? pw_fn.parse_row
                                : pw_fn.parse_cols
                                ;
                            var _tab = this.pw_model
                                    .__chgTab('Config')
                                    .__chgTab('grid');
                            _tab.val = _parse(JsonCode.val,this.genFiled);
                        },
                        genFiled(title, ui_type , data_val = ""){
                            //data = data ?? title;
                            var _map = pw_fn.map_DataType[$.type(data_val)];
                            var _r = {
                                title,
                                ui_type:_map.ui[0],
                                mock_ops: _map.mock,
                                get col_code(){
                                    let {title,data} = this;
                                    return {title,data};
                                },
                                get mock_code(){
                                    var _code = {};
                                    _code[`${this.data}|+1`] = this.mock_ops;
                                    return _code;
                                },
                                mock(){
                                    this.demo = Mock.mock(this.mock_code)[this.data];
                                    return this.demo;
                                }
                            };
                            _r.mock();
                            return _r;
                        },
                    }
                }
            },
            v20200614(){
                return { 
                    template: `
                        <el-tabs :type="tab_type"  >
                            <el-tab-pane label="Input" name="A" >
                                <pw-input  />
                            </el-tab-pane>
                        </el-tabs>
                        `,
                    props:{
                        tab_type:{
                            type:String,
                            default:'border-card'
                        },
                    }
                }
            }
        },
        power_form_el_options(op_type){
            return {
                template:`
                <el-${op_type}-group v-model="val">
                    <el-${op_type} v-for="(item) in ops_src" 
                        :label="item" 
                        :key="item"
                         /> 
                </el-${op_type}-group>`,
                inheritAttrs:false,
                props:{
                    value:{
                        type:[Object],
                        default(){
                            return {
                                //選項列表
                                ops:[],
                                //選取值,如果是 checkbox 複選,需傳入 array 型態的變數
                                val:[],
                            }
                        }

                    }
                },
                computed:{
                    ops_src(){
                        let {ops=[]} = this.value;
                        return ops;
                    },
                    val:{
                        get(){
                            //if (_.isBoolean(this.value)) return this.value;
                            //let {val=false} = this.value;
                            return this.value.val;
                        },
                        set(val){
                            // if (_.isBoolean(this.value)) {
                                
                            // }
                            //  this.value;
                            this.value.val = val;
                            this.$emit('input',this.value);
                        }
                    }
                }
            };
        },
    }
    Vue.prototype.$pw_fn = pw_fn;

    Vue.component('jdt-table-cfg', _fn.jdt_table_cfg());
    
    Vue.component('pw-input', _fn.pw_input.V20200905());
    Vue.component('pw-mock', _fn.pw_mock());
    Vue.component('pw-mock-cfg', _fn.pw_mock_cfg());
    Vue.component('pw-el-radio', _fn.power_form_el_options('radio'));
    Vue.component('pw-el-checkbox', _fn.power_form_el_options('checkbox'));
    Vue.component('power-form-bts-ext', _fn.pw_form_bts_ext.old());
    Vue.component('power-form-el-ext', _fn.pw_form_el_ext());

    Vue.component('pw-form', _fn.pw_form_ext.v20200622());
    Vue.component('pw-form-cfg', _fn.pw_form_cfg.v20200618());
    Vue.component('pw-form-cfg-col', _fn.pw_form_cfg_col());
    Vue.component('pw-tabs', _fn.pw_tabs.v20200614());
    Vue.component('pw-tabs-n', _fn.pw_tabs.v20200905());
    Vue.component('x-component', _fn.x_component.v20200614());
    Vue.component('x-component-1', _fn.x_component.v20200905());
    Vue.component('pw-tool-grp', _fn.pw_ToolGrp.v2020905());
    Vue.component('pw-debug', _fn.pw_debug.v20200619());
    
    
}));
