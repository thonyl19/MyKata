(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue,root._);
    }
}(this, function ($, Vue, _) {
    let _Vue = {
        inheritAttrs: false,
        props: {
            label: String,
            value: Vue.prototype.$PropDef.FullType(),
            readonly: {
                type: Boolean,
                default: false
            }
        },
        template: `<div class="form-group col-lg-6 col-sm-12">
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
                  </div>`,
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
        },
    }
    Vue.component('bts-grp-filed', _Vue);
}));
