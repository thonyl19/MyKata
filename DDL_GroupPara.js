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
                type: [String, Number],
                default: {}
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
            readonly: {
                type: Object,
                default: false
            }
        },
        template: `
        <div class="input-group x-ddl-group-para">
            <slot name="addon" >
                <input type="text" class="form-control" v-if="isShowInput" v-model="input_val" v-bind:readonly="readonly" />
            </slot>
            <span class="input-group-btn" style="min-width:130px;" v-show="readonly==false">
                <select />
            </span>
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
                create: false,
                theme: 'links',
                labelField: 'PARA_DSER',
                valueField: 'PARAMETER_NO',
                searchField: ['PARA_DSER', 'PARAMETER_NO'],

                render: {
                    option(data, escape) {
                        let { labelField, valueField } = this.settings;
                        return `
                            <div class="option"><h5>${escape(data[labelField])}</h5></div>
                        `;
                    },
                    item(data, escape) {
                        let { labelField, valueField } = this.settings;
                        return `<div class="item"><h5>${escape(data[labelField])}<h5></div>`;
                    }
                }

            }
            let { placeholder } = vm.selectize_ops;
            if (placeholder != null) {
                debugger
            }
            var opt = $.extend(selectize_def, vm.selectize_ops);
            if (vm.options != null)
                opt.options = vm.options;
            vm.sel = $('select', vm.$el)
                .selectize(opt)
                .on("change", function () {
                    debugger
                    var _val = vm.sel.getValue();
                    if (Array.isArray(_val)) {
                        let [z = ""] = _val;
                        _val = z;
                    }
                    vm.value = _val;
                    vm.$emit('update:value', _val);
                    vm.$emit('input', _val);
                })[0].selectize;
            vm.sel.setValue(vm.value, true);
            if (vm.is_formcontrol) {
                vm.sel.$control.addClass('form-control');
            }
            if (vm.isShowInput) {
                vm.sel.$control.addClass('selectize-input-fix');
            }
            if (vm.event_enter == null) {
                vm.event_enter = function (event, selObj) {
                    let { $Alert = null, $i18n_Face = null } = this;
                    var _msg = 'Data Not Find!!';
                    //$i18n_Face == null
                    //? 'Data Not Find!!'
                    //: ""
                    //;
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
                    //e.target.focus();
                }
            })

            if (vm.group_no != null) {
                vm.api_GroupPara(vm.group_no, (data) => {
                    vm.options = data;
                })
            }
        },
        computed: {
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
    Vue.component('x-ddl-group-para', _Vue);
}));
