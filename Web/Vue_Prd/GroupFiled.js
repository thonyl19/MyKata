(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue,root._);
    }
}(this, function ($, Vue, _) {
    var _fn = {
        base(..._extArgs){
            var _base = {
                inheritAttrs: false,
                props: {
                    label: String,
                    value: Vue.prototype.$PropDef.FullType(),
                    readonly: {
                        type: Boolean,
                        default: false
                    }
                },
                computed: {
                    inputListeners: function () {
                        var vm = this;
                        // `Object.assign` merges objects together to form a new object
                        return Object.assign({},
                        // We add all the listeners from the parent
                        this.$listeners,
                        // Then we can add custom listeners or override the
                        // behavior of some listeners.
                        {
                            // This ensures that the component works with v-model
                            input: function (event) {
                                debugger
                                vm.$emit('input', event.target.value)
                            }
                        }
                        )
                    }
                }
            }
            _.merge(_base,..._extArgs)
            return _base;
        },
        el_mode(){
            return _fn.base({
                template: `
                    <el-col :md="12" :xs="24">
                        <el-row>
                            <slot name="lable" >
                                <el-col :span="8" :xs="24">
                                    {{label}}
                                </el-col>
                            </slot>
                            <el-col :span="16" :xs="24">
                                <slot>
                                    <input type="text"
                                        v-bind="$attrs"
                                        v-bind:value="value"
                                        v-bind:readonly="readonly"
                                        v-on="inputListeners"
                                        class="form-control"
                                        />
                                </slot>
                            </el-col>
                        </el-row>
                    </el-col>
                `
            });
        },
        bts_mode(){
            return _fn.base({
                template: `
                <div class="form-group col-lg-6 col-sm-12">
                    <slot name="lable" >
                        <label class="col-lg-4 col-sm-4 control-label">{{label}}</label>
                    </slot>
                    <div class="col-lg-8 col-sm-8">
                        <slot>
                            <input type="text"
                                v-bind="$attrs"
                                v-bind:value="value"
                                v-bind:readonly="readonly"
                                v-on="inputListeners"
                                class="form-control"
                                />
                        </slot>
                    </div>
                </div>
                `
            });
        }
        ,bts4_options(){
            var _obj = {
                template: `
                <div :class="[classByVer(false)]">
                    <div v-for="(item) in list" :class="[classByVer()]">
                        <input :type="type"  
                            :name="name"  
                            :value="item"
                            v-model="checked"  />
                        {{item}}
                    </div>
                </div>
                `,
                props:{
                    type:{
                        type:String,
                        default:'radio'
                    },
                    name:{
                        type:String,
                        default:"grp"
                    },
                    value:{
                        type: [String,Array,Object],
                        default(){
                            return null;
                        }
                    },
                    list:{
                        type:Array
                    },
                    bts_ver:{
                        type:[Number,String],
                        default:3
                    }
                },
                computed:{
                    checked:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            //console.log([val,this.value]);
                            this.$emit('input', val);
                        }
                    }
                },
                methods: {
                    classByVer(isItems=true){
                        var chk = `${this.bts_ver}${isItems?'B':'A'}`;
                        var r = ""
                        switch(chk){
                            case "3A":
                                r = "row";
                                break;
                            case "3B":
                                r = "col-md-2";
                                break;
                            case "4A":
                                r = "d-flex justify-content-start";
                                break;
                            case "4B":
                                r = "p-2";
                                break;
                        }
                        return r;
                    },
                },
            }
            return _obj;
        },
        power_form_base(arg){
            var _vue = {
                inheritAttrs:false,
                template: `
                <div>{{form}}
                <el-row>
                    <el-grp-filed 
                        v-for="(item,key) in form"
                        :label="item.label"
                        :key=key
                        >
                        <component
                            :ops="item"
                            :is="item.type"    
                            v-model="item.val"
                            >
                            </component>
                        </el-grp-filed>
                </el-row>
                </div>
                `,
                props:{
                    quick:{
                        type:Array,
                    },
                    form_base:{
                        type:Object,
                    },
                    filed_map:{
                        type:Object
                    }
                },   
                data(){
                    return {
                        form:{},
                        FiledMap:{
                            input:'el-input',
                            select:'el-select',
                            checkbox:'el-checkbox',
                            radio:'el-radio',
                            date:'el-date-picker',
                            textarea:'el-input',
                        }
                    }
                },
                mounted() {
                    if (this.filed_map !=undefined){
                        this.FiledMap = _.merge(this.FiledMap,this.filed_map);
                    }
                    if (this.form_base != undefined){
                        this.__mode_std();
                    }else{
                        this.__mode_quick();
                    }
                    
                },
                methods:{
                    __mode_quick(){
                        var _r = {};
                        var _type = this.FiledMap['input'];
                        _.each(this.quick,(val)=>{
                            var _base = {
                                label:val,
                                type:_type,
                                val
                            }
                            _r[val]=_base;
                        })
                        this.form = _r;
                    },
                    __mode_std(){
                        var _self = this;
                        var _r = {};
                        var _type = _self.FiledMap['input'];
                        _.each(this.form_base,(val,key)=>{
                            var _t = typeof(val);
                            var _base = {
                                label:key,
                                type:_type,
                                val
                            }
                            _t
                            switch(_t){
                                case "string":
                                    if (val.substr(0,1) == '~'){
                                        _base.type = _self.FiledMap.textarea;
                                    }
                                    //基於轉換處理的考量,先不自動把日期字段判斷為日期物件
                                    //else if (isNaN(Date.parse(val))==false){}
                                    break;
                                // case "number":
                                //     break;
                                case "boolean":
                                    _base.type = _self.FiledMap.checkbox;
                                    break;
                                case "object":
                                    //val
                                    //key
                                    if (_.isNull(val)){
                                        //
                                    }else if (_.isArray(val)){
                                        let [first=""] = val;
                                        _base.val = first;
                                        _base.type = _self.FiledMap.select;
                                        _base.src= val;
                                    }else if (_.isDate(val)){
                                        _base.type = _self.FiledMap.date;
                                    }else if (_.isPlainObject(val)){
                                        let {checkbox,radio,textarea,select,src} = val;
                                        if (textarea!=null){
                                            _base.type = 'textarea';
                                            _base.val = textarea;
                                        }
                                        if (checkbox!=null){
                                            _base.type =_self.FiledMap.checkbox;
                                            _base.val = checkbox;
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
                                        //_base.type = _self.FiledMap[_base.type];
                                    }
                                    break;
                            }
                            _r[key]= _base;
                        })
                        this.form = _r;
                    }
                }
            }
            return _.merge(_vue,arg);
        }
        ,power_form_el(){
            return _fn.power_form_base({

            });
        },
        power_form_el_radio(){
            var _vue = {
                    inheritAttrs:false,
                    template: `
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item) in list" :label="item" :key="item">{{item}}</el-checkbox>
                    </el-checkbox-group>
                    `,
                    computed:{
                        list(){
                            let {src=[]} = this.ops;
                            return src;
                        }
                    }
            } ;
            return _vue;
        }
    }
    Vue.component('el-grp-filed', _fn.el_mode());
    Vue.component('bts-grp-filed', _fn.bts_mode());
    Vue.component('bts-options', _fn.bts4_options());
    Vue.component('power-form-el', _fn.power_form_el());
    Vue.component('el-radio-pw-ext', _fn.power_form_el_radio());
    
}));
