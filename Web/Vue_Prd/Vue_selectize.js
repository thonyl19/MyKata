(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        //浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root.Vue,root._);
    }
}(this, function ($, Vue,_) {
    var _fn = {
        selectize_def(...args){ 
            var _base = {
                create: false,
                theme: 'links',
                labelField: 'Display',
                valueField: 'No',
                searchField: ['Display', 'No'],
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
            return _.merge(_base,...args)
        },
        Base(){
            return {
                props: {
                    value: {
                        type: [String, Array],
                        default: ''
                    },
                    options:  {
                        type: Array,
                        default: null
                    },
                    selectize_ops: {
                        type: Object,
                        default(){return {}}
                    },
                    is_formcontrol: {
                        type: Boolean,
                        default: false
                    },
                    event_enter: Vue.prototype.$PropDef.FunAppend(),
                    auto_drowdown:{
                        type: Boolean,
                        default: false
                    },
                    readonly: {
                        type: Boolean,
                        default: false
                    },
                },
                template: '<div class="x-vue-selectize"><select></select></div>',
                mounted() {
                    var _self = this;
                    
                    var opt =_self._init_ops();
                    _self.sel = $('select',_self.$el)
                        .selectize(opt)[0]
                        .selectize;
                    
                    _self.sel.on("change", _self.fn_change);
                    _self.sel.setValue(_self.selected_val, true);
        
                    if (_self.is_formcontrol) {
                        _self.sel.$control.addClass('form-control');
                    }
        
                    _self.sel.$control_input.keypress(function (e) {
                        if (e.which == 13) {
                            let {event_enter=_self.def_event_enter} = vm;
                            event_enter(e, _self.sel);
                        }
                    })
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
                    }
                },
                computed: {
                    selected_val: {
                        get() {
                            return this.value;
                        },
                        set(val) {
                            if (typeof(val)=="string") val =[val];
                            this.$emit('update:value', val);
                            this.$emit('input', val);
                        }
                    },
                    
                },
                destroyed: function () {
                    this.sel.destroy();
                },
                methods: {
                    _init_ops(){
                        //debugger
                        var _ops = _fn.selectize_def(this.selectize_ops);
                        if (this.options != null)
                            _ops.options = this.options;
                        return _ops;
                    },
                    bind_options(options,isAutoDrowDown=this.auto_drowdown){
                        if (options == null) return;
                        var val = this.sel.getValue();
                        this.sel.clearOptions();
                        this.sel.addOption(options);
                        this.sel.refreshOptions(isAutoDrowDown);
                        this.sel.setValue(val);
                    },
                    def_event_enter(event, selObj) {
                        let { $Alert = null} = this;
                        var _msg = 'Data Not Find!!';
                        if ($Alert != null) {
                            $Alert.Err(_msg);
                        } else {
                            alert(_msg);
                        }
                    },
                    fn_change(){
                        var _val = this.sel.getValue();
                        //console.log({'fn_change':_val});
                        if (typeof (_val) == "string") _val = [_val];
                        this.selected_val = _val;
                    },
                    getSelectedRow() {
                        var _sel = this.sel;
                        // let {items} = _sel;
                        // if (items==null) return [];
                        var SelectedRow = $.map(_sel.items, function (value) {
                            return _sel.options[value];
                        });
                        return SelectedRow;
                    }
                }
            }
        },
        Bts_DynQuery(){
            var _obj =  _.merge(_fn.Base(),{
                template: `
                    <div class="x-vue-selectize-grp input-group">
                        <div class="input-group-addon" v-show="readonly==false">
                            <i class="fa fa-search" aria-hidden="true" ></i>
                        </div>
                        <div :class="[isShowIcon?'':'input-group-btn']"  v-show="readonly==false">
                            <select></select>
                        </div>
                        <span class="input-group-btn" v-if="readonly" readonly>
                            <span class="btn" v-html="readonly_html"></span>
                        </span>
                    </div >
                    `,
 
                props:{
                    icon_search: {
                        type: Boolean,
                        default: true
                    },
                    is_formcontrol: {
                        type: Boolean,
                        default: true
                    },
                    fn_query: Vue.prototype.$PropDef.Fun(),
                    query_when_filterd_zero:{
                        type: Boolean,
                        default: true
                    },
                    readonly_filed: {
                        type: String,
                        default: null
                    }
                },
                computed:{
                    isShowIcon() {
                        return this.icon_search && (this.readonly == false);
                    },
                    readonly_html(){
                        var _arr = [];
                        // if (this.readonly_filed !=null){
                        //     _arr = this.options.map(el=>{

                        //     })
                        //     _.each(this.options,(el)=>{
                        //         _arr.push(el[this.readonly_filed]);
                        //     })
                        //     if (_arr.length !=0){
                        //         return _arr.join(',');
                        //     }
                        // } 
                        _arr = Array.isArray(this.value)
                            ?this.value
                            :[this.value];
                        //console.log([this.value,this.selected_val]);
                        if (_arr.length == 0){
                            return '<br />';
                        }
                        return _arr.join(',');
                    }
                },
                methods: {
                    _init_ops(){
                        var _self = this;
                        var _base = {
                            create: this.fn_create,
                            render: {
                                option_create(data, escape) {
                                    //console.log([_self.query_when_filterd_zero , this.currentResults.total]);
                                    if (_self.query_when_filterd_zero==false || this.currentResults.total == 0) {
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
                        var _ops = _fn.selectize_def(_base,this.selectize_ops);
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
        }
    }
    Vue.component('vue-selectize', _fn.Base());
    Vue.component('vue-selectize-dynquery', _fn.Bts_DynQuery());
}));
