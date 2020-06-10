﻿(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue,root._,root.Mock);
    }
}(this, function ($, Vue, _,Mock) {
var _note = {
    jdt_table_cfg:`


    `   

};
    var _fn = {
        mock_map:{
            "string":["@name"],
            "boolean":["Y","N"],
            "number":["@integer(60, 100)"],
            "date": ["@datetime"],
            "symbol":["@id"],
            "object":["@id"],
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
        parse_cols(string_val,genObj,split=','){
            var _self = this;
            var _r = [];
            var _arr = string_val.split('\n');
            _.each(_arr,(val,idx)=>{
                let [one,two,three=""] = val.split(split); 
                three = eval(three);
                _r.push(genObj(one,two,three));
            })
            return _r;
        },

        parse_row(jsonObj,genObj){
            var _self = this;
            var _r = [];
            _.each(jsonObj,(val,name)=>{
                _r.push(genObj(name,name,val));
            })
            return _r;
        },
        simple_tpl(template,immediate=false){
            var _vue = {
                template,
                props:['value'],
				watch:{
					value:{
						handler(val, oldName) {
                            this.$emit('input',val);
                        },
                        deep: true,
                        immediate,
					}
				}
            }
            return _vue;
        },
        
        pw_input() {
            var _obj = {
                    template: `
                    <div>
                        <el-button type="warning" size="small" round 
                            v-if="SyncBack!=false" 
                            @click="SyncBack(JsonCode)">SyncBack</el-button>
                        <el-button type="success" size="small" round
                            v-if="Exec!=false"  
                            @click="Exec(JsonCode)">Exec</el-button>
                        <el-button type="primary" size="small" round
                            v-if="Renew!=false"  
                            @click="Renew(JsonCode.isZip)">重新產生數據</el-button>
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
                        value:{
                            type:String,
                        },
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
                            if (isChgTab){
                                this.tab = "B";
                                this.tabC = "C1"	
                            } 
                            if (!JsonCode.val) return ;
                            let _act = JsonCode.isObj
                                ? _fn.parse_row
                                : _fn.parse_cols
                                ;
                            _act(JsonCode.val,this.genObj);
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
                                    cols.push(_self.genObj(col_name,ops));
                                })
                                _self.tableData = cols;
                            }
                        },
    
                        genObj(name,pass,ops){
                            var _r = {
                                name,
                                ops,
                                get code(){
                                    var _code = {};
                                    _code[`${this.name}|+1`] = this.ops;
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
                        parse_cols(string_val){
                            var _self = this;
                            var _r = [];
                            var _arr = string_val.split('\n');
                            _.each(_arr,(name,idx)=>{
                                _r.push(_self.genObj(name,['@name']));
                            })
                            _self.tableData = _r;
                        },
     
                        // parse_row(jsonObj){
                        //     var _self = this;
                        //     var _r = [];
                        //     _.each(jsonObj,(val,name)=>{
                        //         var ops = _self.map[$.type(val)];
                        //         _r.push(_self.genObj(name,ops));
                        //     })
                        //     _self.tableData = _r;
                        // }
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
                            {{ scope.row.ops }}
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
                                ? _fn.parse_row
                                : _fn.parse_cols
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
                        var mock_ops = _fn.mock_map[$.type(data_val)];
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
    }
    Vue.component('pw-input', _fn.pw_input());
    Vue.component('pw-mock', _fn.pw_mock());
    Vue.component('pw-mock-cfg', _fn.pw_mock_cfg());
    Vue.component('jdt-table-cfg', _fn.jdt_table_cfg());
}));
