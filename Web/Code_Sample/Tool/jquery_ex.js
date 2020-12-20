/*
 
	*/

var __fn = ($,_,Vue,ELEMENT
	//,ICountUp 
	,queryBuilder
		,sortable
		,interact
		,SQLParser
	,waypoint
	,CountUp
	) => {
	debugger
	var 輕型套件 = {
		'CountUp'() {
			var _note = `
			   <pre>數據動態變動
			   [Ref]https://github.com/hisahayashi/jquery.countUp
			   </pre>
			   `;
			var motheds = {
				base(){
					$('.counter').countUp({ last: 1000 });
				},
				case1(){
					var param2 = {
						//起始數值
						start: 1000,
						//最終顯示值
						last: 1,
						//持續時間
						duration: 1000,
						//變動幀數
						frame: 1000 / 30,
						update: function( value ){
							console.log(value)
						},
						complete: function( value ){
							console.log(`complete:${value}`)
						}
					};
					$('.counter').countUp(param2);
				},
				case2(){
					var param3 = {
						last: 1000000,
						duration: 3500,
						frame: 1000 / 30,
					  };
					  $('.counter').countUp(param3);
				}

			}
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<dl>
							<dd v-for="(item,key) in list" @click="item">{{key}}</dd>
						</dl>
						<div class="counter"></div>
						</div>
					`,
					data(){
						return {
							
						}
					},
					computed: {
						list(){
							return motheds;
						}
					},
					mounted() {
					},
				}
			};
			return _obj;
		},
		'*vue_countUp'() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						</div>
					`,
					data(){
						return {
						}
					} 
				   }
			};
			return _obj;
		},
		Waypoint(){
			var _note = `
			   <pre>
				[Ref]http://imakewebthings.com/waypoints/guides/getting-started/
			   </pre>
			   `;

			var list = {
				base:{
					Note:`基礎用例`,
					Code(key,vm){
						$(`.sty-${key}`).waypoint({
							handler() {
								vm.$notify({
									message: `[${key}] hit`,
								});
							}
						});
					}
				},
				offset:{
					Note:`將處理程序選項作為第一個參數傳遞給waypoint`,
					Code(key,vm){
						$(`.sty-${key}`).waypoint((direction)=>{
							var msg = {
								message: `[${key}] hit 25% from top of window`,
							}
							vm.$notify(msg);
						  }, {
							offset: '25%'
						  });
					}
				},
				context:{
					Note:`將處理程序選項作為第一個參數傳遞給waypoint`,
					Code(key,vm){
						var _sel = `.sty-${key}`;
						$(_sel).waypoint((direction)=>{
							var msg = {
								message: `Context example triggered`,
							}
							vm.$notify(msg);
						  }, {
							context: $(_sel)
						  });
					}
				}
			};
			var _obj = {
				_css:`
				.t-sty li {
					height:20rem;
					border:red 1px solid;
				}
				`,
				_vue: {
					template: `
						<div>
						${_note}
						<ul class="t-sty">
							<li v-for="(item,key) in list" :class="'sty-'+key">{{key}}：{{item.Note}}</li>
						</ul>
						</div>
					`,
					data(){
						return {
							list
						}
					},
					mounted(){
						var _self = this;
						_.each(list,(item,key)=>{
							//debugger
							item.Code(key,_self);
						})
					},
					methods: {
						fn(item,key){
							var _sty = `${key}`;
							item(_sty,this);
							return _sty;
						}
					},

				   }
			};
			return _obj;
		},
	}  
	var QueryBuilder = {
		'Base'() {
			var _note = `
			<pre>
			https://querybuilder.js.org/index.html
			</pre>
			`;
			var rules_basic = {
				condition: 'AND',
				rules: [{
				  id: 'price',
				  operator: 'less',
				  value: 10.25
				}, {
				  condition: 'OR',
				  rules: [{
					id: 'category',
					operator: 'equal',
					value: 2
				  }, {
					id: 'category',
					operator: 'equal',
					value: 1
				  }]
				}]
			  };

			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div id="builder-basic"></div>
						</div>
					`,
					data(){
						return {
						}
					},
					mounted() {
						debugger
						$('#builder-basic').queryBuilder({
							//plugins: ['bt-tooltip-errors'],
							
							filters: [{
							  id: 'name',
							  label: 'Name',
							  type: 'string'
							}, {
							  id: 'category',
							  label: 'Category',
							  type: 'integer',
							  input: 'select',
							  values: {
								1: 'Books',
								2: 'Movies',
								3: 'Music',
								4: 'Tools',
								5: 'Goodies',
								6: 'Clothes'
							  },
							  operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
							}, {
							  id: 'in_stock',
							  label: 'In stock',
							  type: 'integer',
							  input: 'radio',
							  values: {
								1: 'Yes',
								0: 'No'
							  },
							  operators: ['equal']
							}, {
							  id: 'price',
							  label: 'Price',
							  type: 'double',
							  validation: {
								min: 0,
								step: 0.01
							  }
							}, {
							  id: 'id',
							  label: 'Identifier',
							  type: 'string',
							  placeholder: '____-____-____',
							  operators: ['equal', 'not_equal'],
							  validation: {
								format: /^.{4}-.{4}-.{4}$/
							  }
							}],
						  
							rules: rules_basic
						  });
					},
				},


			};
			return _obj;
		},
		'*Plugins'() {
			//必須要補上這一段 ,不然會報錯.....
			window['interact'] = interact;
			window['SQLParser'] = SQLParser;
			
			var rules_plugins = {
				condition: 'AND',
				rules: [{
				  id: 'name',
				  operator: 'equal',
				  value: 'Mistic'
				}, {
				  condition: 'OR',
				  rules: [{
					id: 'category',
					operator: 'in',
					value: [1, 2]
				  }, {
					id: 'in_stock',
					operator: 'equal',
					value: 0
				  }]
				}]
			  };
			  
			var _note = `
			   <pre>
			   https://querybuilder.js.org/assets/demo-plugins.js
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<el-button @click="reset">reset</el-button>
						<el-button @click="set">set</el-button>
						<el-button @click="get">get</el-button>
						<el-button @click="getSQL">getSQL</el-button>
						<el-button @click="setRulesFromSQL">setRulesFromSQL</el-button>
						<textarea v-model=Code>
						</textarea>
						<div id="builder-plugins"></div>
						</div>
					`,
					data(){
						return {
							jqQB:null,
							code:"",
						}
					},
					computed:{
						Code(){
							return JSON.stringify(this.code,null,4);
						}
					},
					mounted() {
						this.jqQB =  $('#builder-plugins');
						this.jqQB.queryBuilder({
							plugins: [
								'sortable',
							   	'filter-description',
							   	'unique-filter',
							   	'bt-tooltip-errors',
							//   	'bt-selectpicker',
							//   'bt-checkbox',
							 	'invert',
								'not-group',
							],
							filters: [{
							  id: 'name',
							  label: 'Name',
							  type: 'string',
							  unique: true,
							  description: 'This filter is "unique", it can be used only once'
							}, {
							  id: 'category',
							  label: 'Category',
							  type: 'integer',
							  input: 'checkbox',
							  values: {
								1: 'Books',
								2: 'Movies',
								3: 'Music',
								4: 'Goodies'
							  },
							  color: 'primary',
							  description: 'This filter uses Awesome Bootstrap Checkboxes',
							  operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
							}, {
							  id: 'in_stock',
							  label: 'In stock',
							  type: 'integer',
							  input: 'radio',
							  values: {
								1: 'Yes',
								0: 'No'
							  },
							  colors: {
								1: 'success',
								0: 'danger'
							  },
							  description: 'This filter also uses Awesome Bootstrap Checkboxes',
							  operators: ['equal']
							}, {
							  id: 'price',
							  label: 'Price',
							  type: 'double',
							  validation: {
								min: 0,
								step: 0.01
							  }
							}],
						  
							rules: rules_plugins
						  });
					}, 
					methods:{
						reset(){
							this.jqQB.queryBuilder('reset');
						},
						set(){
							this.jqQB.queryBuilder('setRules', rules_plugins);
						},
						get(){
							this.code = this.jqQB.queryBuilder('getRules');
							// if (!$.isEmptyObject(result)) {
							// 	alert(JSON.stringify(result, null, 2));
							// }
						},
						getSQL(){
							//https://querybuilder.js.org/plugins.html
							this.code =  this.jqQB.queryBuilder('getSQL',false , true);
						},
						setRulesFromSQL(){
							this.jqQB.queryBuilder('setRulesFromSQL', "name = 'Mistic' AND\n(\ncategory IN(1, 2) OR\nin_stock = 0\n)\n");

						}
						
					}
				}
			};
			return _obj;
		},
	}
	var Interact = {
		//https://interactjs.io/docs/

	}
	var Example = {
		'?scroll效果'() {
			var _note = `
			   <pre>
			   參考 https://webduino.io/
			   捲動時,headToolBar 的動態效果
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						</div>
					`,
					data(){
						return {
						}
					} 
				   }
			};
			return _obj;
		},
	}
	return {
		Example,
		輕型套件 ,
		QueryBuilder,
		Interact
	};
};

(function () {
	var cfg = {
		paths: {
			countUp:'https://cdn.jsdelivr.net/npm/jquery-countup@1.0.1/src/jquery.countUp.min',
			//vue_countUp:'https://cdn.jsdelivr.net/npm/vue-countup-v2@4.0.0/dist/countup.umd.min',
			//'https://cdn.jsdelivr.net/npm/countup.js@2.0.7/dist/countUp.umd',
			waypoint:'https://cdn.jsdelivr.net/npm/waypoints@4.0.1/lib/jquery.waypoints.min',
			//counterup:'https://cdn.jsdelivr.net/npm/jquery.counterup@2.1.0/jquery.counterup'
			QueryBuilder:'https://cdn.jsdelivr.net/npm/jQuery-QueryBuilder/dist/js/query-builder.min',
			//"QueryBuilder":'https://cdn.jsdelivr.net/npm/jQuery-QueryBuilder/dist/js/query-builder.standalone.min',
			'QueryBuilder-css':'https://cdn.jsdelivr.net/npm/jQuery-QueryBuilder/dist/css/query-builder.default.min',
			'dot/doT':'https://cdn.jsdelivr.net/npm/dot@1.1.3/doT.min',
			'jquery-extendext':'https://cdn.jsdelivr.net/npm/jquery-extendext@1.0.0/jquery-extendext.min',
			'sortable':'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			'interact':'https://cdn.jsdelivr.net/npm/interact.js@1.2.8/interact.min',
			'sql-parser':'https://cdn.jsdelivr.net/npm/sql-parser-mistic@1.2.3/browser/sql-parser.min',
		},
		shim:{
			'countUp':{deps: ["jquery"]},
			'vue_countUp':{deps: ["countUp"]},
			'waypoint':{deps: ['jquery']},
			'QueryBuilder':{deps: ['jquery','dot/doT','jquery-extendext','css!QueryBuilder-css','sortable','interact']},
		},
		urlArgs: function(id, url) {
			console.log({id, url});
			var args = 'v=1';
			if (url.indexOf('view.html') !== -1) {
				args = 'v=2'
			}
	
			return (url.indexOf('?') === -1 ? '?' : '&') + args;
		}
	};

	var arr = ["jquery", "lodash", "vue","ELEMENT"
		,'QueryBuilder'
			,'sortable'
			,'interact'
			,'sql-parser'
		,'countUp'
		//,'vue_countUp'
		,'waypoint'
		//,'counterup'
	];
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg, __fn});
	}else{
		window.sample = __fn(window.$,window._,window.Vue);
	}
})();