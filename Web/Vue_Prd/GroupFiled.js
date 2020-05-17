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
        }
    }
    Vue.component('el-grp-filed', _fn.el_mode());
    Vue.component('bts-grp-filed', _fn.bts_mode());
    Vue.component('bts-options', _fn.bts4_options());
}));
