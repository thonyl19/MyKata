(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        //浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root.Vue, root._);
    }
 }(this, function ($, Vue, _) {
    var _fn = {
        selectize_def(...args) {
            var _base = {
                create: false,
                maxItems: 1,
                theme: 'links',
                labelField: 'Display',
                valueField: 'No',
                searchField: ['Display', 'No'],
            }
            return _.merge(_base, ...args)
        },
        /**
         * 特殊 render 程序 
         */
        render_sty: {
            GTMES(arg) {
                var _base = {
                    render: {
                        option(data, escape) {
                            let { labelField, valueField } = this.settings;
                            return `
                            <div class="option">
                            <span class="label label-primary">${escape(data[valueField])}</span> ${escape(data[labelField])}
                            </div>
                        `;
                        },
                        item(data, escape) {
                            let { labelField, valueField } = this.settings;
                            return `<div class="item"><span class="label label-primary">${escape(data[valueField])}</span> ${escape(data[labelField])}</div>`;
                        }
                    }
                }
                return _.merge(_base, arg)
            }
        },
        Base() {
            return {
                props: {
                    value: {
                        type: [String, Array],
                        default: ''
                    },
                    options: {
                        type: Array,
                        default: null
                    },
                    selectize_ops: {
                        type: Object,
                        default() { return {} }
                    },
                    is_formcontrol: {
                        type: Boolean,
                        default: false
                    },
                    auto_drowdown: {
                        type: Boolean,
                        default: false
                    },
                    readonly: {
                        type: Boolean,
                        default: false
                    },
                    render_sty: {
                        type: String,
                        default: null
                    },
                    event_enter: Vue.prototype.$PropDef.FunAppend(),
                    //auto_load: Vue.prototype.$PropDef.FunAppend(),
                },
                template: '<div class="x-vue-selectize"><select></select></div>',
                mounted() {
                    var _self = this;
 
                    var opt = _self._init_ops();
                    if (_self.render_sty != null) {
                        let render = _fn.render_sty[_self.render_sty];
                        if (render != null) {
                            ops = render(ops);
                        }
                    }
                    console.log({ 'select:mounted': opt })
 
                    _self.sel = $('select', _self.$el)
                        .selectize(opt)[0]
                        .selectize;
 
                    _self.sel.on("change", _self.fn_change);
                    _self.sel.setValue(_self.selected_val, true);
 
                    if (_self.is_formcontrol) {
                        _self.sel.$control.addClass('form-control');
                    }
 
                    _self.sel.$control_input.keypress(function (e) {
                        if (e.which == 13) {
                            let { event_enter = _self.def_event_enter } = vm;
                            event_enter(e, _self.sel);
                        }
                    })
                    if (_self.readonly) {
                        _self.sel.lock();
                    }
                    _self.__mounted_after();
                },
                watch: {
                    options(options) {
                        this.bind_options(options);
                    },
                    readonly(val) {
                        if (val) {
                            this.sel.lock();
                        } else {
                            this.sel.unlock();
                        }
                    },
                    value(val) {
                        //console.log({ '[select:watch]': val })
                        this.sel.setValue(val, true);
                    }
                },
                computed: {
                    selected_val: {
                        get() {
                            return this.value;
                        },
                        set(val) {
                            //if (typeof (val) == "string") val = [val];
                            //if (this.single_value && val.length != 0) {
                            //    val = val[0];
                            //}
                            //console.log({ '[selected_val:computed]': val })
                            this.$emit('input', val);
                        }
                    },
                    readonly_input() {
                        return this.fn_View();
                    }
                },
                destroyed: function () {
                    this.sel.destroy();
                },
                methods: {
                    __mounted_after(){ },
                    _init_ops() {
                        var _ops = _fn.selectize_def(this.selectize_ops);
                        if (this.options != null)
                            _ops.options = this.options;
                        return _ops;
                    },
                    bind_options(options, isAutoDrowDown = this.auto_drowdown) {
                        if (options == null) return;
                        var val = this.selected_val;
                        this.sel.clearOptions();
                        this.sel.addOption(options);
                        this.sel.refreshOptions(isAutoDrowDown);
                        this.sel.setValue(val);
                    },
                    def_event_enter(event, selObj) {
                        let { $Alert = null } = this;
                        var _msg = 'Data Not Find!!';
                        if ($Alert != null) {
                            $Alert.Err(_msg);
                        } else {
                            alert(_msg);
                        }
                    },
                    fn_change() {
                        var _val = this.sel.getValue();
                        this.selected_val = _val;
                    },
                    getSelectedRow() {
                        var _sel = this.sel;
                        var SelectedRow = $.map(_sel.items, function (value) {
                            return _sel.options[value];
                        });
                        return SelectedRow;
                    },
                    fn_View(isHtml = false) {
                        debugger
                        var _arr = [];
                        _arr = Array.isArray(this.value)
                            ? this.value
                            : [this.value];
                        var re = _arr.join(',');
                        if (re == "" && isHtml) re = '<br />';
                        return re;
                    },
                }
            }
        },
        Bts_DynQuery() {
            var _obj = _.merge(_fn.Base(), {
                template: `
                    <div class="x-vue-selectize-grp input-group" :style="fix_layout">
                        <slot name="addon" v-if="icon_search" >
                            <div class="input-group-addon btn" v-if="readonly==false" @click="icon_search_click">
                                <i class="fa fa-search" aria-hidden="true" ></i>
                            </div>
                        </slot>
                        <input type="text" class="form-control" v-if="readonly_type=='TT'" readonly v-model="readonly_input" /> 
                        <div v-show="select_show" >
                            <select></select>
                        </div>
                    </div >
                    `,
                props: {
                    icon_search: {
                        type: Boolean,
                        default: true
                    },
                    icon_search_click: Vue.prototype.$PropDef.Fun(),
                    is_formcontrol: {
                        type: Boolean,
                        default: true
                    },
                    fn_query: Vue.prototype.$PropDef.Fun(),
                    query_when_filterd_zero: {
                        type: Boolean,
                        default: true
                    },
                    readonly_filed: {
                        type: String,
                        default: null
                    },
                    readonly_inputType: {
                        type: Boolean,
                        default: true
                    }
                },
                computed: {
                    readonly_type() {
                        var A = this.readonly ? "T" : "F";
                        var B = this.readonly_inputType ? "T" : "F";
                        return A + B;
                    },
                    select_show() {
                        return this.readonly_type != 'TT';
                    },
                    fix_layout() {
                        var isNeedFix = this.readonly_type == "TF" || this.readonly_type == "TT";
                        if (isNeedFix || !this.icon_search) {
                            return { display: 'block !important' }
                        }
                        return {};
                    },
                    isShowIcon() {
                        return this.icon_search && (this.readonly == false);
                    }
                },
                methods: {
                    _init_ops() {
                        var _self = this;
                        var _base = {
                            create: this.fn_create,
                            render: {
                                option_create(data, escape) {
                                    //console.log([_self.query_when_filterd_zero , this.currentResults.total]);
                                    if (_self.query_when_filterd_zero == false || this.currentResults.total == 0) {
                                        return `
                                        <div class="option"> 
                                            <span class="label label-success">Query</span> ${escape(data.input)}
                                        </div>
                                        `
                                    }
                                    return "";
                                }
                            }
                        };
                        var _ops = _fn.selectize_def(_base, this.selectize_ops);
                        if (this.options != null)
                            _ops.options = this.options;
                        return _ops;
                    },
                    fn_create(input, callback) {
                        var _self = this;
                        _self.fn_query(input, (data) => {
                            _self.selected_val = "";
                            _self.sel.clear(true);
                            _self.sel.setTextboxValue("");
                        });
                        return false;
                    },
 
                }
            });
            return _obj;
        },
        Bts_ExtenInput() {
        },
        GT_GroupPara() {
            var _obj = _.merge(_fn.Base(), {
                props: {
                    is_formcontrol: {
                        type: Boolean,
                        default: true
                    },
                    input_value: {
                        type: [String, Number],
                        default: null
                    },
                    group_no: {
                        type: String,
                        default: null
                    },
                     
                    selectize_ops: {
                        type: Object,
                        default() {
                            return {
                                labelField: 'name',
                                valueField: 'email',
                                searchField: ['email', 'name'],
                            }
                        }
                    },
                },// :style="fix_layout"
                template: `
                    <div class="vue-selectize-group-para input-group ">
                        <slot name="addon" >
                            <span class="input-group-btn" v-if="isShowInput">
                                <input type="text" class="btn btn-grp "  v-model="input_val" v-bind:readonly="readonly" />
                            </span>
                        </slot>
                        <input type="text" class="form-control" v-if="readonly" readonly v-model="readonly_input" /> 
                        <span  v-show="readonly==false">
                            <select />
                        </span>
                        
                    </div >
                    `,
                computed: {
                    isShowInput() {
                        return this.input_value != null;
                    }
                    , readonly_html() {
                        debugger
                        return this.fn_View(true);
                    },
                    fix_layout() {
                        var A=this.readonly?"T":"F";
                        var B=this.isShowInput?"T":"F"
                        switch(A+B){
                            case "TF":
                            case "FF":
                                return { display: 'block !important' }
                                break;
                        }
                        return {};
                    },
                    input_val: {
                        get() {
                            return this.input_value;
                        },
                        set(val) {
                            this.$emit('update:input_value', val);
                        }
                    },
                },
                methods: {
                    __mounted_after(){
                        var _self = this;
                        _self.bind_options([
                            {email: 'brian@thirdroute.com', name: 'Brian Reavis',tt:'A'},
                            {email: 'nikola@tesla.com', name: 'Nikola Tesla',tt:'B'},
                            {email: 'someone@gmail.com', name: 'name',tt:'C'}
                         ]);

                        return ;
                        _self.api_GroupPara(_self.group_no, (data) => {
                            _self.options = data;
                        })
                    },
                    api_GroupPara(GroupNo, cb) {
                        var _self = this;
                        var url = _self.$URL.chg_Path('MES/WorkOrder/GroupPara', { GroupNo });
                        var _ajax = {
                            url,
                            type: 'get',
                            success(data) {
                                switch (typeof (cb)) {
                                    case "function":
                                        cb(data);
                                        break;
                                    case "boolean":
                                        //tode
                                        break;
                                }
 
                            }
                        };
                        $.submitForm(_ajax);
                    },
                }
            });
            return _obj;
        }
    }
    Vue.component('vue-selectize', _fn.Base());
    Vue.component('vue-selectize-dynquery', _fn.Bts_DynQuery());
    Vue.component('vue-selectize-group-para', _fn.GT_GroupPara());
 
 }));
 