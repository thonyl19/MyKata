(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        //浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root.Vue);
    }
}(this, function ($, Vue) {
    /* 
    V1.0 第一版
    */
    let _Vue = {
        props: {
            options: {
                type: Array,
                default: []
            },
            selectize_ops: {
                type: Object,
                default: {}
            },
            value: {
                type: String,
                default: ""
            },
            input_value: {
                type: [String, Number],
                default: null
            },
            is_formcontrol: {
                type: Boolean,
                default: true
            },
            event_enter: {
                type: Function,
                default: null
            },
            group_no: {
                type: String,
                default: null
            },
            ops: {
                type: Object,
                default() {
                    return {
                        labelField: 'PARA_DSER',
                        valueField: 'PARAMETER_NO',
                    }
                }
            },
            icon_search: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            fn_query: Vue.prototype.$PropDef.Fun()
        },
        template: `
        <div class="x-ddl-dyn-load input-group">
            <div class="input-group-addon" v-show="isShowIcon">
                <i class="fa fa-search" aria-hidden="true" ></i>
            </div>
            <div v-show="readonly==false">
                <select></select>
            </div>
            <span class="input-group-btn btn" v-if="readonly" readonly>
                {{value}} <br v-if="value==''" />
            </span>
        </div >
        `,

        data() {
            return {
                sel_idx: 0
            }
        },
        mounted: function () {
            var vm = this;
            var selectize_def = {
                create: vm.fn_create,
                theme: 'links',
                labelField: 'PARA_DSER',
                valueField: 'PARAMETER_NO',
                searchField: ['PARA_DSER', 'PARAMETER_NO'],
                render: {
                    option_create(data, escape) {
                        if (this.currentResults.total == 0) {
                            return '<div class="create"><span class="label label-success">Search</span> ' + escape(data.input) + '</div>'
                        }
                        return "";
                    }
                }
            }
            let { render = {} } = vm.selectize_ops;
            vm.selectize_ops.render = _.defaultsDeep(render, selectize_def.render);
            var opt = Object.assign(selectize_def, vm.selectize_ops);
            if (vm.options != null)
                opt.options = vm.options;
            vm.sel = $('select', vm.$el)
                .selectize(opt)
                .on("change", vm.fn_change)[0]
                .selectize;

            vm.sel.setValue(vm.value, true);
            if (vm.is_formcontrol) {
                vm.sel.$control.addClass('form-control');
            }
            if (vm.isShowInput) {
                vm.sel.$control.addClass('selectize-input-fix');
            }
            if (vm.event_enter == null) {
                vm.event_enter = function (event, selObj) {
                    let { $Alert = null, $i18n_Face = null } = vm;
                    var _msg = 'Data Not Find!!';
                    if ($Alert != null) {
                        $Alert.Err(_msg);
                    } else {
                        alert(_msg);
                    }
                }
            }

            vm.sel.$control_input.keypress(function (e) {
                if (e.which == 13) {
                    vm.event_enter(e, vm.sel);
                }
            })

        },
        computed: {
            isShowIcon() {
                return this.icon_search && (this.readonly == false);
            },
            selected_el: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('update:value', val);
                }
            },
            input_val: {
                get() {
                    return this.input_value;
                },
                set(val) {
                    this.$emit('update:input_value', val);
                }
            },
            isShowInput() {
                return this.input_value != null;
            }
        },
        watch: {
            value: function (val) {
                this.sel.setValue(val, true);
            },
            options: function (options) {
                if (options == null) return;
                var val = this.sel.getValue();
                this.sel.clearOptions();
                this.sel.addOption(options);
                this.sel.refreshOptions(false);
                this.sel.setValue(val);
            }
        },
        destroyed: function () {
            this.sel.destroy();
        },
        methods: {
            fn_change(value) {
                debugger
                var _val = this.sel.getValue();
                if (Array.isArray(_val)) {
                    let [z = ""] = _val;
                    _val = z;
                }
                this.value = _val;
                this.$emit('update:value', _val);
                this.$emit('input', _val);
            },
            fn_create(input, callback) {
                var _self = this;
                _self.fn_query(input, (data) => {
                    _self.value = "";
                    _self.sel.clear(true);
                    _self.sel.setTextboxValue("");
                    setTimeout(() => {
                        _self.sel.refreshOptions(true);
                    }, 1000);
                });
                return false;
            },
            err_REASON() {
                this.err_FieldRequired(this.$i18n_Face().ACTION_REASON);
            },
            err_FieldRequired(filedName) {
                var _self = this;
                var title = _self.$i18n_Message().FieldRequired.replace
                    ("{0}"
                        , filedName
                    )
                var options = {
                    title,
                    onAfterClose() {
                        var _obj = $('.selectize-input > input', _self.$el.parentNode);
                        _obj.focus();
                    }
                };
                _self.$Alert.Err(options);
            },
            getSelectedRow() {
                var _sel = this.sel;
                var SelectedRow = $.map(_sel.items, function (value) {
                    return _sel.options[value];
                });
                return SelectedRow;
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
    }
    Vue.component('x-ddl-dyn-load', _Vue);
}));
