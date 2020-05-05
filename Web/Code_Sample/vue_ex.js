﻿/*
[Note]
    https://github.com/guahsu/Vue-TurnTable/

*/
 
let API = {
    '*searchpanes'() {
        /**
         * https://datatables.net/reference/api/#searchpanes
         * 
         */
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
             template: `
                <div>
                   ${_note}
    
                </div>
                `
          }
       };
       return _obj;
    },
    __def() {
        /*
        Vue.directive('numberOnly', {
            bind: function (el) {
                debugger
                this.handler = function (e) {
                    e.srcElement.value = e.srcElement.value.replace(/\D+/, '')
                }.bind(this)
                el.addEventListener('input', this.handler)
            },
            unbind: function (el) {
                debugger
                el.removeEventListener('input', this.handler)
            }
        })
        
        */
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
             template: `
                <div>
                   ${_note}
    
                </div>
                `
          }
       };
       return _obj;
    },
    'v-html'() {
        /*
        1. v-html 試例
        2. 在 產生出來的html 中,己經無再使用 vue 相關程序功能
        */
        var _vue = {
            data() {
                return { checked: 'true' }
            },
            template: `
        <div>{{checked}}
            <span  v-html="fn()"></span>
        </div>`,
            methods: {
                fn() {
                    return '<input type="checkbox" v-model="checked" />'
                }
            }
        };
        return { _vue };
    },

}
var Views = {
    '.number .lazy'() {
        //https://medium.com/pierceshih/vue-js-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-day2-v-model%E8%B3%87%E6%96%99%E9%9B%99%E5%90%91%E7%B6%81%E5%AE%9A-9d54a82e23e5
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
             template: `
                <div>
                   ${_note}
    
                </div>
                `
          }
       };
       return _obj;
    },
    destroyed() {
        var _vue = {
            "template": "<div>destroyed 測試,當切換到另一個頁籤時觸發.</div>",
            destroyed() {
                alert('物件己被銷毀!');
            }
        }
        return { _vue };
    },
    array_reNew() {
        /*
        測試 Array 資料變動作法.
        1.如果是一般單純的數據陣列,似乎使用 直接替代掉的作法即可
        */
        var _vue = {
            template: `
        <div>
            <ul>
                <li v-for="(value) in list">{{value}}</li>
            </ul>
            <input type="button" value="正確做法" @click="exec" />
            <input type="button" value="錯誤做法??" @click="exec1" />
        </div>
`,
            data() {
                return {
                    list: [1, 2, 3]
                }
            },
            methods: {
                exec() {
                    this.list.splice(0);
                    this.autoAdd(5);
                },
                exec1() {
                    this.list = [{ A: 'A' }, { B: 'B' }, { C: 'C' }];
                },
                autoAdd(x) {
                    for (var i = 0; i < x; i++) {
                        this.list.push(i);
                    }
                }
            }
        }
        return { _vue };
    },



    vuex範例() {
        const store = new Vuex.Store({
            state: {
                count: 0
            },
            mutations: {
                increment: state => state.count++,
                decrement: state => state.count--
            }
        });

        var _vue = {
            template: `
            <div>
                <p>{{ count }}</p>
                <p>
                    <button @click="increment">+</button>
                    <button @click="decrement">-</button>
                </p>
            </div>`,
            computed: {
                count() {
                    //取得 store的資料
                    return store.state.count
                }
            },
            methods: {
                increment() {
                    store.commit('increment');
                },
                decrement() {
                    store.commit('decrement');
                }
            }
        };
        return { _vue };
    },
    router範例() {
        const http404 = {
            template: '<div>http404 path is : {{$route.path}}</div>',
            mounted() {
                console.log(this.$route.path);
            }
        }
        const index = {
            template: '<div>index path is : {{$route.name}}</div>',
            mounted() {
                console.log(this.$route.path);
            }
        }
        const panda = {
            template: '<div>panda path is : {{$route.path}}</div>',
            mounted() {
                console.log(this.$route.path);
            }
        }

        const router = new VueRouter({
            mode: 'history',
            routes: [
                {
                    path: "#",
                    name: "root",
                    //redirect: '/index'
                },
                {
                    path: "#index",
                    name: "index",
                    component: index
                },
                {
                    path: "#panda",
                    name: "panda",
                    component: panda
                },
                {
                    path: "**",
                    name: "http404",
                    component: http404
                }
            ]
        })
        var _obj = {
            router,
            template: `
        <div>
            <router-link to="#">Root</router-link> |
            <router-link to="#index">Index</router-link> |
            <router-link to="#panda">Panda</router-link> |
            <router-link to="#http404">http404</router-link>
            <router-view></router-view>
        </div>
        `
        };
        return _obj;
    },

    '自定義物件案例'() {
        var list = {
            props: {
                items: Array
            },
            methods: {
                removeItem_(index, props) {
                    console.log(props);
                    alert('test');
                    this.$emit('delete', index)
                }
            },
            template: `
            <ul>
                <li v-for="item, index in items">
                <slot name="item" :item="item" :index="index" :removeItem="removeItem_">
                    <span>Default slot: {{ item }} <button @click="$emit('delete', index)">X</button></span>
                </slot></li>
            </ul>
       `
        };
        Vue.component('list', list);

        var _vue = {
            template: `
        <div>
            輸入資料後,按enter 即可新增項目<input type="text" v-model="text" @keyup.enter="addItem" />
            <list :items="items" @delete="removeItem"></list>
            <list :items="items" @delete="removeItem">
                <template slot="item" slot-scope="zzz">
                    <span @click="zzz.removeItem(zzz.index,zzz)">{{ zzz.item }}</span>
                    <button @click="removeItem(zzz.index)">X</button>
                </template>
            </list>
        </div>`,
            data() {
                return {
                    text: '',
                    items: ['foo', 'bar']
                }
            },
            methods: {
                addItem() {
                    this.items.push(this.text)
                    this.text = ''
                },
                removeItem(index) {
                    this.items.splice(index, 1)
                },
            }
        };
        return { _vue };
    },

    event案例() {
        var _obj = {
            template: `
            <div>
                <div onclick="alert('test')">
                    <a id="inner" @click="handleOnclick($event)" href="#">點此演示事件被攔截的情形</a>
                    <button id="xx" >點此區塊,觸發上層事件,演示未攔擮情形.</button>
                </div>
            </div>`,
            methods: {
                handleOnclick(ev) {
                    ev = ev || window.event;
                    if (confirm('截獲 event, 是否中斷 event?')) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        ev.stopImmediatePropagation();
                    }
                    return false;
                }
            }
        };
        return _obj;
    },


    returnTemplate() {
        /*
        未完成
        需求為,希望在 fu 中,return html code ,並在 UI 中生成 domObj
        */
        var _vue = {
            template: `
        <div>{{fn('test')}}
        </div>`,
            methods: {
                fn(val) {
                    return `<a><input type="checkbox" />${val}</a>`;
                }
            }
        };
        return { _vue };
    },

    DynamicHtml_v1() {
        /*
        參考自 https://jsfiddle.net/Linusborg/1zdzu7k1/
        */
        var dynamic = {
            props: {
                'template': Object,
            },
            data() {
                return {
                    templateRender: null,
                };
            },
            render(h) {
                if (!this.templateRender) {
                    return h('div', 'loading...');
                } else { // If there is a template, I'll show it
                    return this.templateRender();
                }
            },
            watch: {
                // Every time the template prop changes, I recompile it to update the DOM
                template: {
                    immediate: true, // makes the watcher fire on first render, too.
                    handler() {
                        var res = Vue.compile(this.template);
                        this.templateRender = res.render;

                        // staticRenderFns belong into $options,
                        // appearantly
                        this.$options.staticRenderFns = []

                        // clean the cache of static elements
                        // this is a cache with the results from the staticRenderFns
                        this._staticTrees = []

                        // Fill it with the new staticRenderFns
                        for (var i in res.staticRenderFns) {
                            //staticRenderFns.push(res.staticRenderFns[i]);
                            this.$options.staticRenderFns.push(res.staticRenderFns[i])
                        }
                    }
                }
            },
        };

        var _vue = {
            data() {
                return {
                    html: [
                        '<div><span>First template--{{msg}}</span></div>',
                        '<div><span>Second template</span></div>',
                        '<div>Working template, no staticRenderFns here</div>'],
                    index: 0,
                }
            },
            template: `
        <div>
            <button @click="index = 0">First</button>
            <button @click="index = 1">Second</button>
            <button @click="index = 2">I work, no staticRenderFns here</button>
            <dynamic v-bind:template="html[index]"></dynamic>
        </div>`,
            components: {
                dynamic
            },
        };
        return { _vue };
    },
    DynamicHtml_v1_1() {
        /*衍生試作
        原本是想 利用 Vue.compile 的功能,看能不能讓 dynamic 產生的是  _obj.data.msg  的資料
        但得證的結果是, 仍是取到 dynamic.data.msg  的資料
        */
        var Loading = {
            template: `<div>Loading...</div>`
        }
        var _dynamic = {
            //增加 msg , cb
            props: {
                'template': Object,
                'msg': String,
                'cb': Function
            },
            data() {
                return {
                    templateRender: null,
                    //msg:'dynamic'
                };
            },
            render(h) {
                if (!this.templateRender) {
                    return h(Loading);
                } else { // If there is a template, I'll show it
                    return this.templateRender();
                }
            },
            watch: {
                // Every time the template prop changes, I recompile it to update the DOM
                template: {
                    // makes the watcher fire on first render, too.
                    immediate: true,
                    handler() {
                        debugger
                        var res = this.template;
                        this.templateRender = res.render;

                        // staticRenderFns belong into $options, 
                        // appearantly
                        this.$options.staticRenderFns = []

                        // clean the cache of static elements
                        // this is a cache with the results from the staticRenderFns
                        this._staticTrees = []

                        // Fill it with the new staticRenderFns
                        for (var i in res.staticRenderFns) {
                            //staticRenderFns.push(res.staticRenderFns[i]);
                            this.$options.staticRenderFns.push(res.staticRenderFns[i])
                        }
                    }
                }
            },
        };

        var _vue = {
            //增加 :msg="msg" :cb="cb"
            template: `
        <div>
            <button @click="index = 0">First</button>
            <button @click="index = 1">Second</button>
            <button @click="index = 2">I work, no staticRenderFns here</button>
            <dynamic :template="html[index]" :msg="msg" :cb="cb"></dynamic>
            
        </div>`,
            data() {
                return {
                    html: [
                        Vue.compile('<div id="mount-point"><span>First template-{{msg}}</span></div>'),
                        Vue.compile('<input type=text :value="msg" @keyup="cb(msg)" />'),
                        Vue.compile('<div id="mount-point">Working template, no staticRenderFns here-{{msg}}</div>')
                    ],
                    index: 0,
                    msg: '_obj'
                }
            },
            methods: {
                cb(val) {
                    console.log(val);
                }
            }
        }
        return { _vue };
    },


    DynamicHtml_v2() {
        /*
            Ref:https://jsfiddle.net/Linusborg/47ejdvyy/4/
            比 V1 更為精簡
        */
        var Loading = {
            template: `<div>Loading...</div>`
        }
        var dynamic = {
            functional: true,
            template: '#dynamic',
            props: ['template'],
            render(h, context) {
                const template = context.props.template
                const component = template ? { template } : Loading
                return h(component)
            }
        }
        var _vue = {
            template: `
        <div>
            <button @click="index = 0">First</button>
            <button @click="index = 1">Second</button>
            <button @click="index = 2">I work, no staticRenderFns here</button>
            <dynamic :template="html[index]"></dynamic>
        </div>`,
            data() {
                return {
                    html: [
                        '<div id="mount-point"><span>First template</span></div>',
                        '<div id="mount-point"><span>Second template</span></div>',
                        '<div id="mount-point">Working template, no staticRenderFns here</div>'
                    ],
                    index: 0,
                }
            },
            components: {
                dynamic
            },
        }
        return { _vue };
    },
    DynamicHtml_v3() {
        /*
            Ref:https://jsfiddle.net/Linusborg/47ejdvyy/6/
            加入資料 傳遞機制 其作工原理為                 
            1.dynamic.data 是取自 _vue.computed().propsData 
            2.propsData 中 ,將 value 另外做成 child_value
            3.dynamic 在 render 時,會依據 變更後的值 , 動態生成一個 dynComponent,
                再 rander 到 UI上 
            4.試著 加入  keep-alive ,但沒有起到緩存的作用

        */
        var Loading = {
            template: `<div>Loading...</div>`
        }
        var dynamic = {
            functional: true,
            data() {
                return {
                    z: ""
                }
            },
            props: {
                template: String,
                data: { type: Object, default: () => ({}) },
                cb: Function
            },
            render(h, context) {
                //context 傳入的 是未生成 component 前的資料參數

                //debugger
                let { template } = context.props;

                const dynComponent = {
                    template,
                    data() { return context.props.data },
                    methods: {
                        cb: context.props.cb
                    }
                }
                console.log('render:', context.props.data);
                const component = template ? dynComponent : Loading;
                return h(component);
            }
        }
        var _vue = {
            //增加一個 label 以便呈現 父子層之間的資料傳遞效果
            template: `
        <div>
            <div>父層的 Value: <input type="text" v-model="value"></div>
            <button @click="index = 0">First</button>
            <button @click="index = 1">Second</button>
            <button @click="index = 2">I work, no staticRenderFns here</button>
            <div>動態子層</div>
            <keep-alive>
                <dynamic :template="html[index]" :data="propsData" :cb="cb"></dynamic>
            </keep-alive>
        </div>`,
            data() {
                return {
                    value: 'Foo',
                    html: [
                        //增加一個 input 以便試驗同步的效果 
                        `<div><span>child_value</span> <span>{{child_value}} 
                    <input type=text v-model="child_value"  @keyup="cb(child_value)"/></span>
                </div>
                `,
                        '<div><span>First template</span> <span>{{child_value}}</span></div>',
                        '<div>Working template, no staticRenderFns here <span>{{child_value}}</span></div>'
                    ],
                    //data: ['temp1', 'temp2', 'temp3'],
                    index: 0,
                }
            },
            computed: {
                propsData() { return { child_value: this.value } }
            },
            components: {
                dynamic
            },
            methods: {
                cb(val) {
                    this.value = val;
                }
            }
        }
        return { _vue };
    },
    VueCmd() {
        var _vue = {
            template: `
        <div>
        </div>`
        };
        console.log(Vue.options.components);
        return { _vue };
    },
    'resizer-box'() {
        //https://jsfiddle.net/Linusborg/jmo9Lknn/
        var _vue = {
            template: `
        <div>
        </div>`
        };
        return { _vue };
    },
    render範例() {
        /*
        Ref: http://doc.vue-js.com/v2/guide/render-function.html
        1. render 使用方法 
        2. v-model.number 限定資料型的用法 
        3. render(h) 其實就是 render(createElement) 的簡式通用法 
        */
        var x_dy = {
            render(h) {
                console.log(this.level);
                return h(
                    'h' + this.level,   // tag name 标签名称
                    this.$slots.default // 子组件中的阵列
                )
            },
            props: {
                level: {
                    type: Number,
                    required: true
                }
            }
        }
        var _vue = {
            template: `
        <div>
            {{range}}<input type="range" min="1" max="6" v-model.number="range" class="slider" id="myRange">
            <x_dy :level=range>test</x_dy>
        </div>`,
            data() {
                return {
                    range: 1
                }
            },
            components: {
                x_dy
            }

        };
        return { _vue };
    },

    'keyup.enter'() {
        var _obj = {
            data() {
                return { msg: 0 }
            },
            template: `
        <div>
        <h1>{{ msg }}</h1>
             <input v-on:keyup.enter="onEnter" />
        </div>`,
            methods: {
                onEnter() {
                    this.msg++;
                }
            }
        };
        return _obj;
    },
    動態CSS() {
        var _obj = {
            _vue: {
                template: `
            <div>
                [linear-gradient]{{myRange}}<input type="range" min="10" max="40" v-model="myRange" class="slider" >
                <h1 ref="styObj">資料統計</h1>
                <textarea  v-model="csstxt"></textarea>
            </div>
            `,
                data() {
                    return {
                        myRange: 10,
                    }
                },
                mounted() {
                    //必須需這樣處理,才能讓樣式在初始化時,被設定上去。
                    this.$refs.styObj.style.cssText = this.csstxt;
                },

                computed: {
                    csstxt() {
                        let _css = `
                        font-size:${this.myRange}px;
                    `
                        let { styObj } = this.$refs;
                        if (styObj != null) {
                            styObj.style.cssText = _css;
                        }
                        return _css;
                    },
                },
            }
        };
        return _obj;
    },
    'Vue.extend'() {
        /*
        https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API
        1.使用 extend 建立一個“子類”
        2.動態將 子類 實例化後,掛載到指定 tag 上
        */
        var Profile = Vue.extend({
            template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
            data() {
                return {
                    firstName: 'Walter',
                    lastName: 'White',
                    alias: 'Heisenberg'
                }
            }
        })
        var _vue = {
            template: `
        <div><a id="ex_extend"></a>
        </div>`,
            mounted() {
                new Profile().$mount('#ex_extend');
            },
        };
        return { _vue };
    },
    'Vue.compile'() {
        var res = Vue.compile('<div><span>{{ msg }}</span></div>')
        var _vue = {
            data() {
                return { msg: 'hello' }
            },
            render: res.render,
            staticRenderFns: res.staticRenderFns
        };
        return { _vue };
    },
    設置全域Fun() {
        /*
        https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/228790/
        */
        Vue.prototype.changeData = function () {//changeData是函式名
            alert('執行成功');
        }
        var _vue = {
            template: `
        <Button @click="Exec">Call changeData
        </Button>`,
            methods: {
                Exec() {
                    this.changeData();
                }
            },

        };
        return { _vue };
    }
}
var Props = {
    基本用法() {
        var _note = `
        <pre>演示 props 的應用方式
        1.如果純字串填值的話,必須如 Case1 的寫法 -- 不加 : 前綴,
        2.如果是以傳動態變數的話,則必須以 Case2 的寫法 加 : 前綴
        3.額外試出,似乎不加 : 前綴也行 ,雖然省事 ,但會有識別上的顧慮</pre>`

        var ex_compoment = {
            "template": "<h1>{{message}}</h1>",
            "props": ["message"]
        }
        //Vue.component('ex_compoment', ex_compoment);
        var _vue = {
            template: `
        <div>
            ${_note}
            <ex_compoment message=\"Case1\"></ex_compoment>
            <ex_compoment :message="Case2"></ex_compoment>
            <ex_compoment message="Case2"></ex_compoment>
        </div>
        `,
            components: { ex_compoment },
            data() {
                return {
                    Case2: "Case2"
                }
            }
        }
        return { _vue };
    },
    'props fun應用'() {
        var _note = `
        <pre>利用prop 多型的機制
        1.fun1 預設false ,當不賦值時,可控制 button 自動不顯示或 disabled
        2.當有傳入 fun() 時,則會顯示 button 並將之綁上 click 事件.</pre>
        `
        var ex_compoment = {
            "template": `
            <div>{{fun1==false?'不傳值,預設不顯示.':fun1}}
                <button v-if="fun1!=false" @click="fun1">觸發事件</button>
                <button :disabled="fun1==false"  @click="fun1">觸發事件</button>
            </div>`,
            "props": {
                fun1: {
                    type: [Boolean, Function],
                    default: false
                }
            }
        }

        var _obj = {
            _vue: {
                template: `
              <div>
                ${_note}
                <ex_compoment ></ex_compoment>
                <ex_compoment :fun1="act"></ex_compoment>
                </div>
              `,
                components: { ex_compoment },
                data() {
                    return {
                        Case2: "Case2"
                    }
                },
                methods: {
                    act() {
                        alert('test');
                    }
                }
            }
        };
        return _obj;
    },
    '.sync 用法'() {
        var _note = `
        <pre>在子物件中,如果 要對 prop 進來的變數做值的變更,
        必須要透過 另一個變數來做處理,否則會出現如下錯誤訊息：
            Avoid mutating a prop directly since the value will be overwritten whenever 
            the parent component re-renders. Instead, use a data or computed property 
            based on the prop's value. Prop being mutated: "value"
        主要的大意是, vue 在父組件重新渲染時，prop 的值都會被覆蓋，
            這樣會造成子物件連帶受影響,因此,應該要避免直接修改 prop 的值
        </pre>
        `;
     var dynamic = {
        props: {
            title: String,
            value: {
                type: [String,Object],
                default(){
                   return null;
                }
            },
            placeholder: {
                type: String,
                default: '123'
            }
        },
        template: `<dl>
                        <dt>{{title}}</dt>
                        <dd>
                            <slot>
                                <input type="text" class="form-control" :placeholder="placeholder" v-model="c_val" />
                            </slot>
                        </dd>
                    </dl>
                    `,
        computed:{
           c_val:{
              get(){
                 return this.value;
              },
              set(val){
                 this.$emit('update:value', val);
              }
           }
        },
     };
     var _obj = {
        _vue: {
           template: `
              <div>
                 ${_note}
                <div>[form]{{form}}</div>
                <dynamic title="批號" :value.sync="form.value_1"></dynamic>
              </div>
              `,
           components:{dynamic},
           data(){
              return {
                 form:{ value_1:'',
                 }
              }
           }
        }
     };
     return _obj;
    },
    '預設值範例'() {
        var _note = `
            未完成
            <pre>這個範例是在專案中碰到的使用情境.
            1.如果在 props 參數初始化時,要能取用到 data 內的參數,就必須得使用 $options.data() 的方式取得
            2.

            </pre>
            `;
        var ex_compoment = {
            "template": "<h1>[arg1]{{arg1}}[ops]{{ops}}</h1>",
            props:{
                arg1:{
                    type:Object,
                    default(){
                        debugger
                        return this.$options.data().arg_base;
                    }
                },
                ops:Object,
            },
            data(){
                return {
                    arg_base:{
                        A:"這個是帶預設值的範例"
                    }
                }
            },
            mounted() {
                var _def = {
                    msg:"這是預設值"
                };
                this.ops =  $.extend(_def, this.ops);
            },
        };
        var ex_compoment_p = {
            "template": `
            <div>
                <ex_compoment :arg_1="arg" :ops="ops"></ex_compoment>
            </div>
            `,
            components:{ex_compoment},
            props:{
                arg:{
                    type:Object,
                    default(){
                        debugger
                        return this.$options.data().arg_base;
                    }
                }
            },
            data(){
                return {
                    arg_base:{
                        A:"這個是帶預設值的範例"
                    }
                }
            },
            computed: {
                ops() {
                    var _ops = $.extend({}, this.def_ops, this.selectize_ops);
                    return _ops;
                }
            }
        }
        var _obj = {
            _vue: {
                template: `
                    <div>
                        ${_note}
                        <ex_compoment_p></ex_compoment_p>
                        <ex_compoment_p :arg="AA"></ex_compoment_p>
                    </div>
                    `,
                components:{ex_compoment_p},
                data(){
                    return {
                        AA:{
                            T:'這個是有傳入的樣本'
                        }
                    }
                }
            }
        };
        return _obj;
    },
}
var rxjs = {
    連撃限制() {
        var _vue = {
            data() {
                return {
                    clicks: 0
                }
            },
            "template": `
            <div>限制點撃每秒只能作用一次,其餘不會觸發<input type=button ref='myButton' value='exec'>
            <div>{{clicks}}</div></div>
        `,
            mounted() {
                let _self = this;
                //Rx.Observable.fromEvent(this.$refs.myButton, 'click')
                //.subscribe(_self.exec);
                let z = Rx.Observable.fromEvent(this.$refs.myButton, 'click');
                z.throttleTime(1000)
                    //.scan(count => count + 1, 0)
                    .subscribe(_self.exec);

            },
            methods: {
                exec() {
                    this.clicks++;
                }
            }
        };
        return { _vue };
    },

    連續輸入延遲反應() {
        var _vue = {
            data() {
                return {
                    val: '',
                    cb_val: '',
                    keyupObs: null,
                }
            },
            template: `
            <div>限制點撃每秒只能作用一次,其餘不會觸發
                <input type=text ref='myTxt' v-model='val' >
            <div>當前己輸入值：{{val}} , 1秒後才整個接收的完整值：{{cb_val}}</div></div>
        `,
            mounted() {
                let _self = this;
                //Rx.Observable.fromEvent(this.$refs.myButton, 'click')
                //.subscribe(_self.exec);
                this.keyupObs = Rx.Observable
                    .fromEvent(this.$refs.myTxt, 'keyup')
                    .debounceTime(700)
                    .subscribe(_self.exec);
            },
            destroyed() {
                this.keyupObs.unsubscribe();
                console.log('keyupObs 註銷', this.keyupObs);
            },
            methods: {
                exec() {
                    this.cb_val = this.val;
                }
            }
        };
        return { _vue };
    },

}
var Fail = {
    'prop 異常現象'() {
        var _note = `
        <pre>[props fun應用] 的機制在專案應用時,碰到這樣詭異的問題
        1.如範例 同樣都是綁上 act() 的程序,但顯示時,AddVer 始終顯示 false
        2.但改成 fun_Add ,就可以正確的傳入 function
        3.奇怪的是,個案搬到這裡測試時,是可以正常運作的 .....</pre>
        `
        var ex_compoment = {
            "template": `
            <div>[AddVer]{{AddVer}} <br />
            [fun_Add]{{fun_Add}}
            </div>`,
            "props": {
                AddVer: {
                    type: [Boolean, Function],
                    default: false
                },
                fun_Add: {
                    type: [Boolean, Function],
                    default: false
                }
            }
        }

        var _obj = {
            _vue: {
                template: `
              <div>
                ${_note}
                <ex_compoment :AddVer="act" :fun_Add="act"></ex_compoment>
            </div>
              `,
                components: { ex_compoment },
                data() {
                    return {
                        Case2: "Case2"
                    }
                },
                methods: {
                    act() {
                        alert('test');
                    }
                }
            }
        };
        return _obj;
    },

}

window.sample = { API, Views, Props, rxjs, Fail  }