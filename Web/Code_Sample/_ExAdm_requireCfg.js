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
			'parse',
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
		ImgSrc:"../img", 
		UI_App:"../Vue_Prd/UI_App",
		UI_AppExt:"../Vue_Prd/UI_AppExt",
		Mock:"https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min",
		moment:"https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min",
		run_prettify:'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify',
		vue_codemirror:'https://cdn.jsdelivr.net/npm/vue-codemirror@4.0.6/dist/vue-codemirror',
		"es6-promise":'https://cdn.jsdelivr.net/npm/es6-promise@4.2.8/dist/es6-promise.auto.min',
		screenfull:'https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.min',
		//'https://cdn.jsdelivr.net/npm/es-screenfull@3.0.2-patch/dist/screenfull.min',
		//'https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.min',
	},
	map: {
		"*": {
			css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
			//sass:'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.min.js',
		},
	},
	//依賴
	shim: {
		vue:{exports: 'Vue'},
		jquery:{exports: '$'},
		lodash:{exports: '_'},
		vuex:{deps:['vue']},
		screenfull:{deps: ['es6-promise']},
		bts337:{deps: ['css!bts337-css']},
		ELEMENT: { deps: ['vue', 'css!eui-css','css!fa_css'
			//,'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=sons-of-obsidian&autoload=true&lang=css'
			,'vue_codemirror'
		]},
		vue_codemirror:{deps:[
			'codemirror/mode/javascript/javascript'
			// active-line.js
  			,'codemirror/addon/selection/active-line'
			// styleSelectedText
			, 'codemirror/addon/selection/mark-selection'
			, 'codemirror/addon/search/searchcursor'
			// highlightSelectionMatches
			, 'codemirror/addon/scroll/annotatescrollbar'
			, 'codemirror/addon/search/matchesonscrollbar'
			, 'codemirror/addon/search/searchcursor'
			, 'codemirror/addon/search/match-highlighter'

			// keyMap
			, 'codemirror/mode/clike/clike'
			, 'codemirror/addon/edit/matchbrackets'
			, 'codemirror/addon/comment/comment'
			, 'codemirror/addon/dialog/dialog'
			, 'css!codemirror/addon/dialog/dialog'
			, 'codemirror/addon/search/searchcursor'
			, 'codemirror/addon/search/search'
			, 'codemirror/keymap/sublime'

			// foldGutter
			, 'css!codemirror/addon/fold/foldgutter'
			, 'codemirror/addon/fold/brace-fold'
			, 'codemirror/addon/fold/comment-fold'
			, 'codemirror/addon/fold/foldcode'
			, 'codemirror/addon/fold/foldgutter'
			, 'codemirror/addon/fold/indent-fold'
			, 'codemirror/addon/fold/markdown-fold'
			, 'codemirror/addon/fold/xml-fold'


			, 'css!codemirror/lib/codemirror'
			, 'css!codemirror/theme/darcula'
			//, 'sass!'
			//, 'css!codemirror/theme/base16-dark'
		]},
		vuetify2x:{deps:['vue','css!fa_css','css!vuetify2x-icon','css!vuetify2x-css']},
		UI_AppExt:{deps:['vue','Vue_Utility','UI_App']},
	},
	urlArgs: function(id, url) {
		console.log({id, url});
		var args = 'v=1';
		if (url.indexOf('view.html') !== -1) {
			args = 'v=2'
		}

		return (url.indexOf('?') === -1 ? '?' : '&') + args;
	},
	"packages": [
		{
			name: "codemirror",
			location: "https://cdn.jsdelivr.net/npm/codemirror@5.59.0",
			main: "lib/codemirror.min"
		},
	],
	
}
require.config(__req_cfg);



require
	(["jquery", 'lodash', "vue","vuex","styled",
	"ELEMENT",
	"bts337",
	'vue_codemirror' ,
	'screenfull'
	//'codemirror/keymap/sublime'
	//,'run_prettify'
	]
	, ($, _, Vue ,Vuex ,styled,
		ELEMENT,
		bts337,
		VueCodemirror ,
		screenfull
		//sublime
		//, run_prettify
		) => {
	debugger
	Vue.use(Vuex);
	Vue.use(VueCodemirror);
	ELEMENT.install(Vue);
	window.Vue = Vue;
	window._ = _;
	// if (window.screenfull.enabled) {
	// 	window.screenfull.request();
	// }
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
				<el-button type="primary"  size="small" round @click="ShowModules">切換範例集合</el-button>
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
		info:{
			//<pre class="prettyprint lang-html linenums"><code class="language-js" v-html="parse_Code"></code> </pre>
			template: `
			<el-tabs v-model="activeName" >
				<el-tab-pane label="Note" name="note"><pre>
{{parse_Note}}</pre></el-tab-pane>
				<el-tab-pane label="Code" name="code">
					<input type="button" value="Copy" @click="copy" />
					<input type="button" value="Copy Components" @click="copy_com" />
					<codemirror
						ref="cmEditor"
						v-model="parse_Code"
						:options="cmOptions"
						/>
				</el-tab-pane>
			</el-tabs>

			
			`,
			props:{
				Code:{
					type:String
				},
				Note:{
					type:String
				},
			},
			data() {
				return {
					activeName: 'code',
					cmOptions: {
						tabSize: 4,
						mode: {name: "javascript", json: true},//'text/javascript',
						//mode: 'text/javascript',
						theme: 'darcula',
						lineNumbers: true,
						line: true,
						styleActiveLine: true,
						keyMap: "emacsy",
						matchBrackets: true,
						lineWrapping: true,
					  },
					x:{
						tabSize: 4,
					styleActiveLine: true,
					lineNumbers: true,
					line: true,
					mode: 'text/javascript',
					lineWrapping: true,
					theme: 'default'
					}
				}
			},
			computed:{
				parse_Note(){
					var arr = this.Note.split('\n');
					_.remove(arr , (el)=>{ return el.trim()==""});
					let [r0] = arr;
					if (r0 != null){
						var _reg = /^\t+/g;
						let [m0] = r0.match(_reg)||[];
						if (m0 !=null){
							var _reg1 = new RegExp(`${m0}`, 'g');
							arr = _.map(arr,(el=>{
								return el.replace(_reg1,"");
							}));
						}
					}
					return arr.join('\n');
				},
				parse_Code(){
					debugger
					//var x =  PR.prettyPrintOne(this.Code.toString());
					//return CodeMirror.fromTextArea(this.Code.toString());
					return this.Code.toString();
				}
			},
			methods: {
				copy(){},
				copy_com(){}
			},
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
				<div class="main" v-loading="loading">
					<x-tpl-sample-info :Code="Code" :Note="Note"></x-tpl-sample-info>
					<div class="max_area">
						<i class="ds-switch fa fa-desktop" @click="Switch"></i>
						<component v-bind:is="currentComponent" 
							></component>
					</div>
				</div>
			</el-scrollbar>
		</div>
			`,
			// <el-button type="primary" plain circle>
			// 			</el-button>
			data() {
				return {
					currentTab: 'tpl-sample-test',
					Code: '',
					Note:''
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
					//debugger
					var isString = typeof (this.currentTab) == "string";
					if (isString) {
						return `x-${this.currentTab}`;
					}
					this.Code = this.currentTab;
					var { _vue, _css ,_note =""} = this.currentTab();
					this.Note = _note;
					if (_css != null) styled.injectGlobal`${_css}`;
					return _vue;
				}
			},
			methods: {
				Switch(){
					debugger
					//const element = document.getElementById('max_area');
					const element =  document.querySelector('.max_area');
					window.screenfull.request(element);
				},
				change() {
					if (this.Code == null) return;
					var _code = this.Code.toString();
					_code = _code.replace(/\bfunction /gi, "");
					eval('var _fn = function ' + _code);
					this.currentTab = _fn;
				},
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
		store,
		mounted() {
			this.$store.commit('chgUrl', window.gEx.getCurrentEx());
		},
	});
});
