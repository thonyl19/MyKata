/*
 
	*/

var __fn = ($,_,Vue,CountUp,ICountUp ,waypoint) => {
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
 
	return {
		輕型套件 
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
		},
		shim:{
			'countUp':{deps: ["jquery"]},
			'vue_countUp':{deps: ["countUp"]},
			'waypoint':{deps: ['jquery']},
		}
	};

	var arr = ["jquery", "lodash", "vue"
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