(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        factory(root.jQuery,root._);
    }
}(this, function ($,_) {
    $(() => {
        window.tmpData = {
            "mydata": [
                { "id": "1", "invdate": "2007-10-01", "name": "test", "note": "note", "amount": "200.00", "tax": "10.00", "total": "210.00" },
                { "id": "2", "invdate": "2007-10-02", "name": "test2", "note": "note2", "amount": "300.00", "tax": "20.00", "total": "320.00" },
                { "id": "3", "invdate": "2007-09-01", "name": "test3", "note": "note3", "amount": "400.00", "tax": "30.00", "total": "430.00" },
                { "id": "4", "invdate": "2007-10-04", "name": "test", "note": "note", "amount": "200.00", "tax": "10.00", "total": "210.00" },
                { "id": "5", "invdate": "2007-10-05", "name": "test2", "note": "note2", "amount": "300.00", "tax": "20.00", "total": "320.00" },
                { "id": "6", "invdate": "2007-09-06", "name": "test3", "note": "note3", "amount": "400.00", "tax": "30.00", "total": "430.00" },
                { "id": "7", "invdate": "2007-10-04", "name": "test", "note": "note", "amount": "200.00", "tax": "10.00", "total": "210.00" },
                { "id": "8", "invdate": "2007-10-03", "name": "test2", "note": "note2", "amount": "300.00", "tax": "20.00", "total": "320.00" },
                { "id": "9", "invdate": "2007-09-01", "name": "test3", "note": "note3", "amount": "400.00", "tax": "30.00", "total": "430.00" },
                { "id": "10", "invdate": "2007-09-01", "name": "test3", "note": "note3", "amount": "400.00", "tax": "30.00", "total": "430.00" },
                { "id": "11", "invdate": "2007-09-01", "name": "test3", "note": "note3", "amount": "400.00", "tax": "30.00", "total": "430.00" }
            ]
        }

        let { sample } = window;
        if (sample) {
            var tpl_sample = {
                range: {
                    template: `
                      <div>
                        <div>[width]{{i_width}}vw<input type="range" min="10" max="100" v-model.num="i_width" class="slider" id="myRange"></div>
                        <div>[height]{{i_height}}vh<input type="range" min="10" max="100" v-model.num="i_height" class="slider" id="myRange"></div>
                        <div class="area-mk" :style="{ height: i_height+'vh',width:i_width+'vw' }">
                            <slot>
                                <a>default</a>
                            </slot></li>
                        </div>
                      </div>`
                    , data() {
                        return {
                            i_width: 10,
                            i_height: 10
                        }
                    }
                },
                left: {
                    template: `
                    <ul>
                        <li v-for="(grp,main_key) in _sample" >
                            <a class="itme-main">{{main_key}}</a>
                            <ul>
                                <li v-for="(item,item_key) in grp" class="over-fun" :class="[sel==item_key?'sel':'']" >
                                    <a @click="act(item,item_key)"> {{item_key}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    `,
                    data(){
                        return {
                            sel:''
                        }
                    },
                    props: {
                        sample: Object,
                        action: [Object, Function, String]
                    },
                    computed:{
                        _sample(){
                            
                            var _self = this;
                            var _r = {};
                            let {def=''} = _self.sample;
                            for (var item in _self.sample){
                                var grp = _self.sample[item];
                                var keys = Object.keys(grp);
                                var arr = keys.filter((o)=>{
                                    return  o.substring(0,1)=="*";
                                })
                                if (arr.length !=0){
                                    var _fn = grp[arr[0]];
                                    _self.act(_fn)
                                }
                                _r[item] = grp;
                            }
                            return _r;
                        }
                    },
                    methods: {
                        act(obj,item_key) {
                            this.sel = item_key; 
                            this.$emit('update:action', obj)
                        }
                    }
                },
                test: {
                    template: `<div>test</div>`
                },
                main: {
                    template: `
                    <dl class="flex f-row">
                        <dt>
                            <x-tpl-sample-left :sample="sample" :action.sync="currentTab"></x-tpl-sample-left>
                        </dt>
                        <dd style="height:95vh ;">
                            <div>
                                <input type="button" value="Copy" @click="copy" />
                                <input type="button" value="Copy Components" @click="copy_com" />
                                <textarea v-model="Code" @blur="change()"></textarea>
                                <component v-bind:is="currentComponent"
                                    ></component>
                            </div>
                        </dd>
                    </dl>
                    `,
                    data() {
                        return {
                            //window.window
                            sample,
                            currentTab: 'tpl-sample-test',
                            Code: ''

                        }
                    },

                    computed: {
                        currentComponent() {
                            var isString = typeof (this.currentTab) == "string";
                            if (isString) {
                                return `x-${this.currentTab}`;
                            }
                            this.Code = this.currentTab;
                            var { _vue, _css } = this.currentTab();
                            if (_css != null) styled.injectGlobal`${_css}`;
                            return _vue;
                        }
                    },
                    methods: {
                        change() {
                            if (this.Code == null) return;
                            var _code = this.Code.toString();
                            _code = _code.replace(/\bfunction /gi, "");
                            eval('var _fn = function ' + _code);
                            this.currentTab = _fn;
                        },
                        copy() {

                        },
                        copy_com() {

                        }
                    },
                }
            }

            for (var name in tpl_sample) {
                Vue.component(`x-tpl-sample-${name}`, tpl_sample[name]);
            }
            var main = Vue.extend(tpl_sample.main);
            new main().$mount('#app');
        } else {
            alert('找不到 sample object!')
        }
    })
}));

