var local_path = '../node_modules/';
var __req_cfg = {
	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		jquery: [
			`${local_path}jquery/dist/jquery.min`
			,"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		],
		"lodash": [
			`${local_path}lodash/lodash.min`
			,'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min'
			],
		"ELEMENT": "https://unpkg.com/element-ui@2.13.0/lib/index",
		"eui-css": "https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index",
		"moment":"https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min",
		vue: [
			`${local_path}vue/dist/vue.min`
			,"https://cdn.jsdelivr.net/npm/vue/dist/vue"
			],
		Vue_Utility:"../Vue_Prd/Vue_Utility",
		UI_App:"../Vue_Prd/UI_App",
		UI_AppExt:"../Vue_Prd/UI_AppExt",
		vuex: "https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex",
		styled:"https://cdn.jsdelivr.net/npm/vue-styled-components@1.5.1/dist/vue-styled-components.min",
		fa_css:"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome",
		Mock:"https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min",
		//示範載入
		'_data': "./_tmpData",
		"bts337":"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min",
		"bts337-css":"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min",
		
		d3:"https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
		c3:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
		c3_css:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
	},
	map: {
		"*": {
			css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
	shim: {
		vue:{exports: 'Vue'},
		jquery:{exports: '$'},
		lodash:{exports: '_'},
		vuex:{deps:['vue']},
		bts337:{deps: ['css!bts337-css']},
		ELEMENT: { deps: ['vue', 'css!eui-css','css!fa_css','css!fa_css'] },
		c3:{deps:['d3', 'css!c3_css'] },
		UI_AppExt:{deps:['vue','Vue_Utility','UI_App']}
 	}
}
require.config(__req_cfg);
window.gEx = {
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
	],
	exList:[
		'c3_0.7.15',
		'Chart_2.7.1',
		'VuePager',
		'element-ui-2.13',
		'CSS',
		'bootstrap3.3.7',
		'bootstrap4.5.0',
		
		'froala_2.7',
		'echarts',
		'jquery_dataTables',
		'layer_2.3',
		'selectize_0.12.6',
		'vue_2.x',
		'vue-window_2.4.2',
		'vue-window_2.4.2',
		'vue-window_2.4.2',
	],
	chgUrl(fnName){
		var _url = new URL(location);
		_url.hash = fnName;
		window.history.pushState(null, null,_url.toString());
	},
	getCurrentEx(){
		//debugger
		var _url = new URL(location);
		var Ex = _url.hash;
		return Ex != "" ? Ex.substr(1) :"CSS" ;
	}
}


require
	(["jquery", 'lodash', "vue","vuex", "ELEMENT","styled","bts337"]
	, ($, _, Vue ,Vuex , ELEMENT, styled, bts337) => {
	Vue.use(Vuex);
	ELEMENT.install(Vue);
	window.Vue = Vue;
	window._ = _;
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
		switch:{
			template: `
			<div>
				<el-button type="text" @click="ShowModules">切換範例集合</el-button>
				<el-dialog
					:visible.sync="SwitchModulesDialog"
					width="70%"
					:append-to-body="true"
					title="切換範例集合"
					center>
					<div class="list-group">
						<button type="button" class="list-group-item" v-for="(item) in list" @click=chgUrl(item) >{{item}}</button>
					</div>
				</el-dialog>
			</div>
			`,
			computed:{
				list(){
					return window.gEx.exList;
				},
				...Vuex.mapState([
					'SwitchModulesDialog'
				])
			},
			methods:{
				...Vuex.mapMutations(['chgUrl','ShowModules']),
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
			<header>
				<x-tpl-sample-switch></x-tpl-sample-switch>
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
	}
	for (var name in tpl_sample) {
		Vue.component(`x-tpl-sample-${name}`, tpl_sample[name]);
	}
	// var main = Vue.extend(tpl_sample.main);
	// new main().$mount('#app');
	const store = new Vuex.Store({
		state: {
			exFn:{},
			SwitchModulesDialog:false
		},
		mutations: {
			ShowModules(state){
				state.SwitchModulesDialog = true;
			},
			chgUrl(state,item) {
				var _self = this;
				window.gEx.chgUrl(item);
				require([item],(_item) => {
					let {arr,cfg = null,__fn} = _item;
					var _cfg  = cfg == null
						? __req_cfg
						: _.merge({},__req_cfg,cfg)
						;
					var _req = require.config(_cfg);
					_req(arr,(...deps)=>{
						var exFn = __fn(...deps);
						state.exFn = exFn;
						state.SwitchModulesDialog = false;
					});
				})
			}
		}
	});
	new Vue({
		el: '#app',
		store,
		mounted() {
			this.$store.commit('chgUrl', window.gEx.getCurrentEx());
		},
	});
});
