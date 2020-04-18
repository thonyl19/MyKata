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
    V1.2
        1.增加 event_enter ,以處理刷條碼找到不資料的處理功能
        2.修正 is_formcontrol 綁定方式
    V1.1 
        1.修改 selectize_ops 沒設定則帶 def 值
        2.values 回傳值改定義為 一律回傳 Array
        3.支援 :values.sync 的綁定方式
    V1.0 第一版
    
    */
    let _Vue = {
        props: {
            options: Object,
            selectize_ops: {
                type: Object,
                default: {}
            },
            values: Array,
            is_formcontrol: {
                type: Boolean,
                default: false
            },
            event_enter: {
                type: Function,
                default: null
            }
        },
        template: '<select><slot></slot></select>',
        mounted: function () {
            //debugger
            var vm = this;
            var selectize_def = {
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
                            <h5> <span class="label label-primary">${escape(data[valueField])}</span> ${escape(data[labelField])}</h5>
                            </div>
                        `;
                    },
                    item(data, escape) {
                        let { labelField, valueField } = this.settings;
                        return `<div class="item"><h5> <span class="label label-primary">${escape(data[valueField])}</span> ${escape(data[labelField])}</h5></div>`;
                    }
                }

            }
            var opt = $.extend(selectize_def, vm.selectize_ops);
            if (vm.options != null)
                opt.options = vm.options;
            vm.sel = $(vm.$el)
                .selectize(opt)
                .on("change", function () {
                    var _val = vm.sel.getValue();
                    if (typeof (_val) == "string") _val = [_val];
                    vm.values = _val;
                    vm.$emit('update:values', _val);
                    vm.$emit('input', _val);
                })[0].selectize;
            vm.sel.setValue(vm.values, true);

            if (vm.is_formcontrol) {
                vm.sel.$control.addClass('form-control');
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
        },
        watch: {
            values: function (value) {
                this.sel.setValue(value, true);
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
            }
        }
    }
    Vue.component('x-reason-select', _Vue);
}));
