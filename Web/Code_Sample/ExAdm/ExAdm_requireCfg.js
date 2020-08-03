require.config({
	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue",
		vuex: "https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex",
		styled:"https://cdn.jsdelivr.net/npm/vue-styled-components@1.5.1/dist/vue-styled-components.min",
		fa_css:"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome",
		
		"ELEMENT": "https://unpkg.com/element-ui@2.13.0/lib/index",
		"eui-css": "https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index",
		"lodash": 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min',
		//示範載入
		'_data': "./_tmpData",
		"bts45":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min",
		"bts45-css":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min",
		d3:"https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
		c3:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
		c3_css:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min"
	
	},
	map: {
		"*": {
			css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
	shim: {
		vuex:{deps:['vue']},
		bts45:{deps: ['css!bts45-css']},
		ELEMENT: { deps: ['vue', 'css!eui-css','css!fa_css'] },
		c3:{deps:['d3', 'css!c3_css'] }
	}
});

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


require
	(["jquery", 'lodash', "vue","vuex", "ELEMENT","styled","CSS"]
	, ($, _, Vue ,Vuex , ELEMENT, styled ,exFn) => {
	Vue.use(Vuex);
	ELEMENT.install(Vue);
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
			  </div>`,
			props:{
				i_width:{
					type:Number,
					default:10
				},
				i_height:{
					type:Number,
					default:10
				}
			}
		},
		left: {
			template: `
			<ul class="tpl">
				<li v-for="(grp,main_key) in _sample" >
					<a class="itme-main">{{main_key}}</a>
					<ul class="tpl">
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
				action: [Object, Function, String]
			},
			computed:{
				_sample(){
					var _self = this;
					if (!_self.$store.state.exFn) return false;
					var _r = {};
					let {exFn} = _self.$store.state;
					for (var item in exFn){
						var grp = exFn[item];
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
			template: `<div>
			<header class="mk">
            <div class="container">
                  
            </div>
        </header>
        <el-scrollbar class="part-A " tag="div">
            <el-scrollbar class="left" 
                :noresize="false"
            >
                <x-tpl-sample-left :action.sync="currentTab"></x-tpl-sample-left>
            </el-scrollbar>
            <div class="main">
                <div>
                    <input type="button" value="Copy" @click="copy" />
                    <input type="button" value="Copy Components" @click="copy_com" />
                    <textarea v-model="Code" @blur="change()"></textarea>
                    <component v-bind:is="currentComponent"
                        ></component>
                </div>
            </div>
		</el-scrollbar>
		</div>
			`,
			data() {
				return {
					currentTab: 'tpl-sample-test',
					Code: ''
	
				}
			},
			props:['exFn'],
			computed: {
				sample(){
					var _self = this;
					if (!_self.$store.state.exFn) return false;
					return  _self.$store.state.exFn;
				},
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
		},
		main_v1: {
			template: `
			<dl class="flex f-row">
				<dt>
					<x-tpl-sample-left :action.sync="currentTab"></x-tpl-sample-left>
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
					currentTab: 'tpl-sample-test',
					Code: ''
	
				}
			},
			props:['exFn'],
			computed: {
				sample(){
					var _self = this;
					if (!_self.$store.state.exFn) return false;
					return  _self.$store.state.exFn;
				},
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
	if (exFn) {
		for (var name in tpl_sample) {
			Vue.component(`x-tpl-sample-${name}`, tpl_sample[name]);
		}
		// var main = Vue.extend(tpl_sample.main);
		// new main().$mount('#app');
		const store = new Vuex.Store({
			state: {
				exFn
			},
			//mutations: {}
		});
		new Vue({
			el: '#app',
			store,
		});
	} else {
		alert('找不到 sample object!')
	}
});
