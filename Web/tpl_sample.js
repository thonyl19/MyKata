(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        factory(root.jQuery);
    }
}(this, function ($) {
    $(()=>{
 
        let {sample} = window;
        if (sample){
            var tpl_sample = {
                left:{
                    template :`
                    <ul>
                        <li v-for="(grp,main_key) in sample"><a class="itme-main">{{main_key}}</a>
                            <ul>
                                <li v-for="(item,item_key) in grp" class="over-fun">
                                    <a @click="act(item)"> {{item_key}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    `,
                    props:{
                        sample:Object,
                        action:[Object,Function,String]
                    },
                    methods:{
                        act(obj){
                            this.$emit('update:action', obj)
                        }
                    }
                },
                test:{
                    template:`<div>test</div>`
                },
                main:{
                    template:`
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
                    data(){
                        return {
                            sample,
                            currentTab: 'tpl-sample-test',
                            Code: ''
                            
                        }
                    },
                   
                    computed: {
                        currentComponent() {
                            var isString = typeof(this.currentTab) == "string";
                            if (isString){
                                var _obj = views[this.currentTab];
                                this.Code = _obj;
                                return `x-${this.currentTab}`;
                            }
                            this.Code = this.currentTab;
                            var {_vue,_css} = this.currentTab();
                            return _vue;
                        }
                    },
                    methods: {
                        change() {
                            if (this.Code == null) return ;
                            var _code =  this.Code.toString();
                            _code = _code.replace(/\bfunction /gi,"");
                            eval('var _fn = function '+ _code);
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
        }else
        {
            alert('找不到 sample object!')
        }
    })
}));
 
