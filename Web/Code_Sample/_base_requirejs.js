require.config({
  //避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		vue:"https://cdn.jsdelivr.net/npm/vue/dist/vue",
		"ELEMENT":"https://unpkg.com/element-ui@2.13.0/lib/index",
		"eui-css":"https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index",
		"lodash":'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min',
		//示範載入
		//'_data':"./_tmpData"
	},
	map: {
		"*": {
			css:"https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
    shim: {
        'ELEMENT':{deps: ['vue','css!eui-css']},
    }
});
require(["jquery","lodash","vue","ELEMENT"], ($,_,Vue,ELEMENT)=> {
	ELEMENT.install(Vue);
	let Views = {
		std1() {
		var _note = `
					<pre>
					</pre>
					`;
		var _obj = {
			_vue: {
				template: `
							<div>
								${_note}
							</div>
							`,
				data() {
					return {};
				},
			},
		};
		return _obj;
		},
	};

	window.sample = {
		Views,
	};

	new Vue({
		el:'#app',
		methods:{
			exec(){
				debugger
				var tmpData = require("./_tmpData.js");
 
			},
			exec1(){
				debugger
				var Employee = require("./_base_requirejs_case1.js");
				// var js = ["./_base_requirejs_case1.js"];
				// var $head = $("head");
				// for (var i = 0; i < js.length; i++) {
				// 	var s =`<script data-main="${js[i]}" src="https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js" crossorigin="anonymous"></script>`;
				// 	$head.append(s);
				// }
			}
		}
	});
});
