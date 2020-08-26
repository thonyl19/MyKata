var _req_cfg = {
	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		  jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		  vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue",
		  ELEMENT: "https://unpkg.com/element-ui@2.13.0/lib/index",
		  "eui-css":
		  "https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/theme-chalk/index",
		  lodash: "https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min",
		  //示範載入
		  _data: "./_tmpData",
		  bts45:
		  "https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min",
		  "bts45-css":
		  "https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min",
	  },
	  map: {
		  "*": {
		  css:
			  "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		  },
	  },
	  //依賴
	  shim: {
		  ELEMENT: { deps: ["vue", "css!eui-css"] },
		  bts45: { deps: ["css!bts45-css"] },
	  },
	  config:{
		  bar:{size:'test'}
	  }
  }
require.config(_req_cfg);
require(["jquery", "lodash", "vue", "ELEMENT"], ($, _, Vue, ELEMENT) => {
	ELEMENT.install(Vue);
	var _fn = {
		'case_25'(){
			require(["case_25"], (fn) => {
				debugger
				var _cfg = _.merge({},_req_cfg,fn.cfg);
				var _req = require.config(_cfg)
				_req(fn.arr,(...fns)=>{
					debugger;
					var z = fn.__fn(...fns);
					console.log(z);
				});
			});
		},
		'case_24'(){
			require(["case_24"], (fn) => {
				debugger
				//fn.test();
			});
		},
		'case_23'(){
			require(["case_23"], (fn) => {
				fn.test();
			});
		},
		'-case_22'(){
			/*計劃實驗 解決相依性的問題,
				打算 將以下結構 放到 case 中,
				使能實現 config by case 
				VuePager:{deps:['vue','vuejs-paginate','vue-pagination'
					]},
				在本範例 中並沒有得到預期的效果, fn 傳回的是 undefine ,
					但子程序在隨便會被觸發執行,
					就理解上 , 必須是透過 define 來讓 程序來完成程序加載
			 */
			require(["case_22"], (fn) => {
				fn.test();
			});
		},
		'case_21'(){
			/*
			解決 崁套 過多的問題,使 結構更簡練
			一並實測 load by case 的應用
			*/
			require(["case_21"], (fn) => {
				fn.test();
			});
		},
		'case_20'(){
			/*
			依據 case_11 演化出 v2 版本的寫法
			這一版的測試方向為
				-解決多檔應用時 define arr 被覆蓋的問題
			*/
			require(["case_20"], (fn) => {
				fn.test();
			});
		},
		'case_11 - 使用 define 定義程序'(){
			/*
			這一版的測試方向有2
				1.現解和實現 define 的用法
				2.試驗 define 抽離 arr 的寫法
				3.試驗 define load by file 的寫法
			演示 使用 define 定義程序-- case_11 ,
				並實現測載入結果, 
			其中一併 測試載入 css 的效果
	
			第一次試驗這一段並沒有成功 ,主要是因為 下面的路徑不正確
				'https://www.jsdelivr.com/package/npm/mock-js'
			再取另一個來測試時發現,是可以這樣做  動態 載入的,
				但與寫在 require.config 中不同的地方在於,
				這裡就必須要加 .js 的副檔名,
				才能正確work ,連 css 也可使用.
			*/
			require(["case_11"], (fn) => {
				fn.test();
			});
		},
		'case_1 - 使用 define 定義程序--math ,並實現測載入結果'(){
			//一併測試載入 bts45
			require(["bts45", "case_1"], function (bts45, math) {
				alert(math.add(1, 1));
			});
		},
		'module 用法'(){
			debugger
			/*
			//https://segmentfault.com/a/1190000002401665
			試出來的結果,並不如文件所示,可以取到 config 中的set
			反而是取到 定義 module 的 id,url 的資訊
			*/
			
			require(["case_module"], (cfg) => {
				debugger
				console.log({cfg})
			});
			
			//不正確用法
			//var x  = require(['module']);

			//不正確用法
			// var x = define(['module'],(cfg)=>{
			// 	debugger
			// 	console.log({cfg});
			// 	return {cfg};
			// });
			
		},
		'import'(){
			import("./_tmpData").then((tmpData) => {
				debugger
			});
		},
		'測試以 UMD 架構載入資料'(){
			require(["_data"], (_data) => {
				console.log({_data})
			});
		},
		
		'-測試使用 Append Tag方式執行'(){
			//此方法無實質效用,並沒有如預想的載入檔案
			var js = ["./case_0.js"];
			var $head = $("head");
			for (var i = 0; i < js.length; i++) {
				var s = `<script data-main="${js[i]}" src="https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js" crossorigin="anonymous"></script>`;
				$head.append(s);
			}
		},
		'-測試直接載入'(){
			/* 不 work
			[Vue warn]: Error in v-on handler: "Error: Module name "case0" has not been loaded yet for context: _. Use require([])
			*/
			var Employee = require("./case_0");
		},
		
	}
  new Vue({
	el: "#app",
	computed: {
		_list(){
			return _fn
		}
	},
    methods: {
   
 
      exec() {
        /*
			   演示 使用 define 定義程序-- ex_define1 ,
				   並實現測載入結果, 
			   其中一併 測試載入 css 的效果
			   */
        require(["ex_define22"], (fn) => {
          debugger;
          fn.test();
        });
      },
      exec_21() {
        /*
			   演示 使用 define 定義程序-- ex_define1 ,
				   並實現測載入結果, 
			   其中一併 測試載入 css 的效果
			   */
        require(["ex_define21"], (fn) => {
          fn.test();
        });
      },
      exec_22() {
        debugger;
        /*
				演示 使用 define 定義程序-- ex_define1 ,
					並實現測載入結果, 
				其中一併 測試載入 css 的效果,
				但結果並沒有如預其中傳入,但在試驗時發現一件很妙的事,
				P1 執行時 ,其內容是沒有正確的work 的,
					可以從其中的 debugger 中發現, $,ex_define21 是沒資料
				在接著 P2 執行時, 其 d3 會有資料 

				原本以為 P1 是錯誤的, 把它  mark 掉後,
					結果其後的 P2 執行就報錯了.
				
			   	*/
        var cfg = {
          paths: {
            ex_define21: "ex_define21",
            d3: "https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
            c3: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
            c3_css: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
          },
          shim: {
            c3: { deps: ["d3", "css!c3_css"] },
            ex_define21: { deps: ["c3"] },
          },
        };
		debugger;
		
        //p1
        require(cfg, ($, ex_define21) => {
          debugger;
        });
        //p2
        require(["d3", "css!c3_css"], (d3) => {
          //
          debugger;
        });
      },
      exec_22_1() {
		/*
		此試例 是依 exec_22 做延伸假設,就是 前例中的 P1 ,
			其實就等同於做了 require.config ,
			實測結果確如其然.
		進一步的假設是, 能否把 require 當成物件傳入子程序,
			由子程序中自行處理
		但其結果是 不work , req 為 undefined
		*/
        var cfg = {
          paths: {
            ex_define21: "ex_define21",
            d3: "https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
            c3: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
            c3_css: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
          },
          shim: {
            c3: { deps: ["d3", "css!c3_css"] },
            ex_define21: { deps: ["c3"] },
          },
        };
        debugger;
        //p1
        require.config(cfg);
        //p2
        require([require,"d3", "css!c3_css"], (req,d3) => {
          //
          debugger;
        });
	  },
		exec_22_22() {
			/*
			但,在其後的測試應用時發現, exec_22 試例中,
				一定要先執行 p1 的假設是錯的,
				p1 之所以會錯,是因為 最原始的 cfg 中,
				並沒有 "d3", "css!c3_css" 的設置,
				才會因此報錯.
			下例,可以印證,根本不需要 q1 的程序
			*/
			require(['jquery' ], ($) => {
				debugger;
			});
		},
		exec_31(){
			var cfg = {
				paths: {
					d3: "https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
					c3: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
					c3_css: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
				},
				shim: {
					c3: { deps: ["d3", "css!c3_css"] },
				},
			};
			// require.config(cfg);
			debugger;

			// require(["d3", "css!c3_css"], (req,d3) => {
			// 	//
			// 	debugger;
			// });
			require(cfg,()=>{
				define(function(require, exports, module) {
						debugger;
						var a = require('a'),
							b = require('b');
				
						//Return the module value
						return function () {};
					}
				);
			})
		}
	},
  });
});
