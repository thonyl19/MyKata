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
                        FiledMap:{
                            input:'input',
                            select:'el-select',
                            checkbox:'el-checkbox',
                            radio:'el-radio',
                            date:'el-date-picker',
                            textarea:'el-input-pw-ext',
                        }
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
            return _.merge(_vue,arg);
        }
        ,power_form_el(){
            return _fn.power_form_base({
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
            });
        },
        power_form_bts(){
            return _fn.power_form_base({
                template: `
                <div class="form-horizontal gt-form">
                    <bts-grp-filed 
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
                        </bts-grp-filed>
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
            });
        },
        power_form_el_options(arg){
            if (_.isString(arg)){
                arg = {
                    template: `
                    <el-${arg}-group v-model="val">
                        <el-${arg} v-for="(item) in list" :label="item" :key="item" /> 
                    </el-${arg}-group>
                    `,
                }
            }
            var _vue = _.merge({
                inheritAttrs:false,
                props:{
                    value:{
                        type:[Object,Array,String]
                    },
                    ops:{
                        type:Object
                    }
                },
                computed:{
                    list(){
                        let {src=[]} = this.ops;
                        return src;
                    },
                    val:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            this.$emit('input',val);
                        }
                    }
                }
            }
            ,arg) ;
            return _vue;
        },
        power_form_el_select(){
            var _vue =  _fn.power_form_el_options({
                template: `
                <el-select v-model="val" clearable placeholder="请选择">
                    <el-option
                        v-for="item in list"
                        :key="item"
                        :label="item"
                        :value="item" />
                </el-select>
                `,
            });
            //console.log(_vue);
            return _vue ;
        },
        power_form_el_input(){
            var _vue = {
                inheritAttrs:false,
                template:`
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="val">
                    </el-input>
                `,
                props:{
                    value:{
                        type:String
                    },
                },
                computed:{
                    val:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            this.$emit('input',val);
                        }
                    }
                }
            };
            return _vue;
        }
    }
    Vue.component('el-grp-filed', _fn.el_mode());
    Vue.component('bts-grp-filed', _fn.bts_mode());
    Vue.component('bts-options', _fn.bts4_options());
    Vue.component('power-form-el', _fn.power_form_el());
    Vue.component('power-form-bts', _fn.power_form_bts());
    Vue.component('el-radio-pw-ext', _fn.power_form_el_options('radio'));
    Vue.component('el-checkbox-pw-ext', _fn.power_form_el_options('checkbox'));
    Vue.component('el-select-pw-ext', _fn.power_form_el_select());
    Vue.component('el-input-pw-ext', _fn.power_form_el_input());
    
}));
