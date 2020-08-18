require.config({
	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue",
		"ELEMENT": "https://unpkg.com/element-ui@2.13.0/lib/index",
		"eui-css": "https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index",
		"lodash": 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min',
		//示範載入
		'_data': "./_tmpData",
		"bts45":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min",
		"bts45-css":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min",
	},
	map: {
		"*": {
			css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
	shim: {
		'ELEMENT': { deps: ['vue', 'css!eui-css'] },
		'bts45':{deps: ['css!bts45-css']},
	}
});
debugger
require(["jquery", 'lodash', "vue", "ELEMENT"], ($, _, Vue, ELEMENT) => {
	ELEMENT.install(Vue);
	new Vue({
		el: '#app',
		methods: {
			exec1() {
				//此方法無實質效用
				var js = ["./_base_requirejs_case1.js"];
				var $head = $("head");
				for (var i = 0; i < js.length; i++) {
					var s =`<script data-main="${js[i]}" src="https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js" crossorigin="anonymous"></script>`;
					$head.append(s);
				}
			},
			exec2() {
				//不 work
				var Employee = require("./_base_requirejs_case1.js");
			},
			exec3() {
				/*
				測試以 UMD 架構載入資料,可以 work
				*/
				require(["_data"], (_data) => {
					debugger
				});
			},
			exec4(){
				/*
				演示 使用 define 定義程序--math ,
					並實現測載入結果
				*/
				require(["bts45",'ex_define'], function (bts45,math){
					debugger
				　　alert(math.add(1,1));
				});
			},
 			exec5() {
				 /*
				演示 使用 define 定義程序-- ex_define1 ,
					並實現測載入結果, 
				其中一併 測試載入 css 的效果
				*/
				require(["ex_define1"], (fn) => {
					fn.test();
				});
			},
			exec() {
				/*
			   演示 使用 define 定義程序-- ex_define1 ,
				   並實現測載入結果, 
			   其中一併 測試載入 css 的效果
			   */
			   require(["ex_define21"], (fn) => {
				   fn.test();
			   });
		   },
			exec_() {
				debugger
				/*
			   演示 使用 define 定義程序-- ex_define1 ,
				   並實現測載入結果, 
			   其中一併 測試載入 css 的效果
			   */
			  var cfg = {
					paths: {
						"ex_define21":"ex_define21",
						d3:"https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
						c3:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
						c3_css:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min"
					},
					shim: {
						c3: { deps: ['d3', 'css!c3_css'] },
						ex_define21:{deps:['c3']}
					}
				}
			   require(cfg, ($,ex_define21) => {
				   debugger
			   });
		   },
		}
	});
});
