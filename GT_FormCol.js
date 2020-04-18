(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue);
    }
}(this, function ($, Vue) {
    let _Vue = {
        props: {
            label: String,
            value: {
                type: Object,
                default: null
            },
            placeholder: {
                type: String,
                default: '123'
            },
            readonly: {
                type: Object,
                default: false
            }
        },
        template: `<div class="form-group col-lg-6 col-sm-12">
                    <slot name="lable" >
                        <label class="col-lg-4 col-sm-4 control-label">{{label}}</label>
                    </slot>
                    <div class="col-lg-8 col-sm-8">
                        <slot>
                            <input type="text" class="form-control" :placeholder="readonly?'':placeholder" v-model="c_val" v-bind:readonly="readonly" />
                        </slot>
                    </div>
                  </div>`,

        computed: {
            c_val: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('update:value', val);
                }
            }
        },
    }
    Vue.component('gt-form-col', _Vue);
}));
