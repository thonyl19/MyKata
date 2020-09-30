/*
 
	*/

var __fn = ($,_,Vue,CountUp,waypoint) => {
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
	}  
	var Waypoint = {
		'*def'() {
			var _note = `
			   <pre>
				[Ref]http://imakewebthings.com/waypoints/guides/getting-started/
			   </pre>
			   `;

			var list = {
				base(sty,vm){
					debugger
					$(`.sty-${sty}`).waypoint({
						handler: function() {
							vm.$notify({
								message: 'base',
								type: 'success'
							  });
						}
					})
				}
			}
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
							<li v-for="(item,key) in list" :class="'sty-'+key">{{key}}</li>
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
							item(key,_self);
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
		輕型套件,
		Waypoint
	};
};

(function () {
	var cfg = {
		paths: {
			countUp:'https://cdn.jsdelivr.net/npm/jquery-countup@1.0.1/src/jquery.countUp.min',
			//'https://cdn.jsdelivr.net/npm/countup.js@2.0.7/dist/countUp.umd',
			waypoint:'https://cdn.jsdelivr.net/npm/waypoints@4.0.1/lib/jquery.waypoints.min',
			//counterup:'https://cdn.jsdelivr.net/npm/jquery.counterup@2.1.0/jquery.counterup'
		},
		shim:{
			'countUp':{deps: ["jquery"]},
			'waypoint':{deps: ['jquery']},
		}
	};

	var arr = ["jquery", "lodash", "vue"
		,'countUp'
		,'waypoint'
		//,'counterup'
	];
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg, __fn});
	}else{
		window.sample = __fn(window.$,window._,window.Vue);
	}
})();