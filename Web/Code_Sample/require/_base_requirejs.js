require.config({
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
});
debugger;
require(["jquery", "lodash", "vue", "ELEMENT"], ($, _, Vue, ELEMENT) => {
  ELEMENT.install(Vue);
  new Vue({
    el: "#app",
    methods: {
      exec1() {
        //此方法無實質效用
        var js = ["./_base_requirejs_case1.js"];
        var $head = $("head");
        for (var i = 0; i < js.length; i++) {
          var s = `<script data-main="${js[i]}" src="https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js" crossorigin="anonymous"></script>`;
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
          debugger;
        });
      },
      exec4() {
        /*
				演示 使用 define 定義程序--math ,
					並實現測載入結果
				*/
        require(["bts45", "ex_define"], function (bts45, math) {
          debugger;
          alert(math.add(1, 1));
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
		debugger;
		require(cfg, ($, ex_define21) => {
			debugger;
		});
	  }
    },
  });
});
