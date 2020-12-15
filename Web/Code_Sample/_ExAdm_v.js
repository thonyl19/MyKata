﻿//var local_path = '../node_modules/';
window.gEx = {
	local_path : '../node_modules/',
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
	exList:{
		Vue:['vue_2.x',
		'VuePager',
		'element-ui-2.13',
		'vue-test'
		],
		Layout:[
			'CSS',
			'bootstrap3.3.7',
			'bootstrap4.5.0',
			'bulma0.9.1',
			'Vuetify_2x',
		],
		Chart:[
			'c3_0.7.15',
			'Chart_2.7.1',
			'echarts4.7.0',
			//'echarts',
		],
		Tool:[
			'selectize_0.12.6',
			'jquery_ex',
			'jquery_dataTables',
			'froala_2.7',
			'layer_2.3',
		]
	},
	chgUrl(fnName){
		//debugger
		var _url = new URL(location);
		//_url.hash = `${key}/${fnName}`;
		_url.hash = fnName;
		window.history.pushState(null, null,_url.toString());
	},
	getCurrentEx(){
		//debugger
		var _base = "Layout/CSS" ;//["Layout","CSS" ];
		var _url = new URL(location);
		var Ex = _url.hash;
		if (Ex != ""){
			_base = Ex.substr(1);//.split('/');
		}
		return _base ;
	}
}
var __req_cfg = {
	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		jquery: [
			`${window.gEx.local_path}jquery/dist/jquery.min`
			,"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		],
		"lodash": [
			`${window.gEx.local_path}lodash/lodash.min`
			,'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min'
		],
		"ELEMENT": [
			`${window.gEx.local_path}element-ui/lib/index`
			,"https://unpkg.com/element-ui@2.13.0/lib/index",
		],
		"eui-css":[
			`${window.gEx.local_path}element-ui/lib/theme-chalk/index` 
			,"https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index"
		],
		vue: [
			`${window.gEx.local_path}vue/dist/vue.min`
			,"https://cdn.jsdelivr.net/npm/vue/dist/vue"
			],
		vuex:[
			`${window.gEx.local_path}vuex/dist/vuex.min`
			,"https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex"
		],
		styled:[
			`${window.gEx.local_path}vue-styled-components/dist/vue-styled-components.min`
			,"https://cdn.jsdelivr.net/npm/vue-styled-components@1.5.1/dist/vue-styled-components.min"
		],
		fa_css:[
			`${window.gEx.local_path}font-awesome/css/font-awesome.min`
			,"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome"
		],
		"bts337":[
			`${window.gEx.local_path}bootstrap/dist/js/bootstrap.min`
			,"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min"
		],
		"bts337-css":[
			`${window.gEx.local_path}bootstrap/dist/css/bootstrap.min`
			,"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min"
		],
		"vuetify2x":"https://cdn.jsdelivr.net/npm/vuetify@2.3.20/dist/vuetify.min",
		"vuetify2x-css":"https://cdn.jsdelivr.net/npm/vuetify@2.3.20/dist/vuetify.min",
		"vuetify2x-icon":'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min',
		//"rescss":"https://cdn.jsdelivr.net/npm/rest-css@0.1.2/src/rest",
		axios:`${window.gEx.local_path}axios/dist/axios.min`,
 		Vue_Utility:"../Vue_Prd/Vue_Utility",
		UI_App:"../Vue_Prd/UI_App",
		UI_AppExt:"../Vue_Prd/UI_AppExt",
		Mock:"https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min",
		moment:"https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min",
 
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
		ELEMENT: { deps: ['vue', 'css!eui-css','css!fa_css'] },
		vuetify2x:{deps:['vue','css!fa_css','css!vuetify2x-icon','css!vuetify2x-css']},
		UI_AppExt:{deps:['vue','Vue_Utility','UI_App']},
 	}
}
require.config(__req_cfg);



require
	(["jquery", 'lodash', "vue","vuex","styled",
	"vuetify2x",
	"bts337"
]
	, ($, _, Vue ,Vuex ,styled,
		Vuetify,
		bts337
			) => {
				debugger
	Vue.use(Vuex);
	//Vue.use(Vuetify);
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
			},
			watch: {
				i_width(val){
					this.$emit('update:i_width',val);
				},
				i_height(val){
					this.$emit('update:i_height',val);
				}
			},
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
					<el-row :gutter="10">
						<el-col :span="6" v-for="(items,key) in list">
							<h4><span class="label label-primary">{{key}}</span></h4>
							<div class="list-group">
								  <a class="list-group-item" v-for="(item) in items" @click=_chgUrl(key,item) >{{item}}</a>
							</div>
						</el-col>
					</el-row>
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
				_chgUrl(key,item){
					this.$store.commit('chgUrl', `${key}/${item}`);
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
			template: `<v-app id="inspire">
			<v-navigation-drawer
			  v-model="drawer"
			  app
			>
			  <!--  -->
			</v-navigation-drawer>
		
			<v-app-bar app>
			  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
		
			  <v-toolbar-title>Application</v-toolbar-title>
			</v-app-bar>
		
			<v-main>
			  <!--  -->
			</v-main>
		  </v-app>
			`,
			data() {
				return {
					currentTab: 'tpl-sample-test',
					Code: '',
					drawer: null 
				}
			},
			computed: {
				...Vuex.mapState([
					'loading'
				]),
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
		'view-raw':{
			template:`
			<div>
				<h3>{{ title }}</h3>
				<pre>{{ valueString }}</pre>
			</div>
			`,
			props :{
				title: {
					required: true,
					type: String
				},
				value: {
					required: true
				}
			},
			computed: {
				valueString() {
				  return JSON.stringify(this.value, null, 2);
				}
			  }
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
			SwitchModulesDialog:false,
			loading:false
		},
		mutations: {
			ShowModules(state){
				state.SwitchModulesDialog = true;
			},
			chgUrl(state,item) {
				var _self = this;
				state.loading = true;
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
						state.loading = false;
					});
				})
			}
		}
	});
	new Vue({
		el: '#app',
		Vuetify,
		store,
		mounted() {
			this.$store.commit('chgUrl', window.gEx.getCurrentEx());
		},
	});
});
