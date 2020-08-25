var local_path = '../node_modules/'
require.config({
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
			
		vue: [
			`${local_path}vue/dist/vue.min`
			,"https://cdn.jsdelivr.net/npm/vue/dist/vue"
			],
		vuex: "https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex",
		styled:"https://cdn.jsdelivr.net/npm/vue-styled-components@1.5.1/dist/vue-styled-components.min",
		fa_css:"https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome",
		Mock:"https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min",
		//示範載入
		'_data': "./_tmpData",
		"bts337":"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min",
		"bts337-css":"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min",
		// "bts45":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min",
		// "bts45-css":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min",
		d3:"https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
		c3:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
		c3_css:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
		ChartJs:"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min",
		VueChartJs:'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min',
		'vue-froala-wysiwyg':"https://cdn.jsdelivr.net/npm/vue-froala-wysiwyg@3.0.6/dist/vue-froala.min"
		//'vuejs-paginate':"https://cdn.jsdelivr.net/npm/vuejs-paginate@2.1.0/dist/index.min",
		//'vue-pagination':'https://cdn.rawgit.com/matfish2/vue-pagination/master/dist/vue-pagination.min'
		//'JwPagination':'https://cdn.jsdelivr.net/npm/jw-vue-pagination@1.0.3/lib/JwPagination.min',
	},
	map: {
		"*": {
			css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
	shim: {
		jquery:{exports: '$'},
		lodash:{exports: '_'},
		vuex:{deps:['vue']},
		bts337:{deps: ['css!bts337-css']},
		ELEMENT: { deps: ['vue', 'css!eui-css','css!fa_css'] },
		c3:{deps:['d3', 'css!c3_css'] },
		chart:{
			deps:[
				'vue'
				,'ChartJs'
				,'VueChartJs'
				]
		},
		'vue-froala-wysiwyg':{deps: ['vue'
			//,'vue-froala'
			,"css!https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css"
			]}
		//bts45:{deps: ['jquery','css!bts45-css']},
 	}
});

 
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
		'bootstrap4.5.0',
		'bootstrap4.5.0',
		'bootstrap4.5.0',
		'bootstrap4.5.0',
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
	(["jquery", 'lodash', "vue","vuex", "ELEMENT","styled","bts337",window.gEx.getCurrentEx()]
	, ($, _, Vue ,Vuex , ELEMENT, styled, bts337 ,exFn) => {
	debugger
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
		/*
		<ul class="list-group">
						<li class="list-group-item" v-for="(item) in list" @click=chg(item) >{{item}}</li>
					</ul>
		*/
		switch:{
			template: `
			<div>
				<el-button type="text" @click="centerDialogVisible = true">切換範例集合</el-button>
				<el-dialog
					:visible.sync="centerDialogVisible"
					width="70%"
					:append-to-body="true"
					title="切換範例集合"
					center>
					<div class="list-group">
						<button type="button" class="list-group-item" v-for="(item) in list" @click=chg(item) >{{item}}</button>
					</div>
				</el-dialog>
			</div>
			`,
			data(){
				return {
					centerDialogVisible:true
				}
			},
			computed:{
				list(){
					return window.gEx.exList;
				}
			},
			methods:{
				chg(item){
					var _self =this;
					window.gEx.chgUrl(item);
					require([item],(exFn) => {
						debugger
						_self.$store.state.exFn = exFn;
						_self.centerDialogVisible = false;
					});
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
