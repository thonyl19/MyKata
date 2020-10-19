/*
https://github.com/rlemaigre/Easy-DnD
https://codesandbox.io/s/example-2-r8n1k?file=/package.json
不能從  CDN 下,而 node_modules 無法取用....
*/
var __fn = ($, _, styled, Vue,VueEasyDnD) => {
	var 基本應用 = {
		'*def'() {
			debugger
			let  {Drag, Drop, DropMask } = VueEasyDnD;
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
	};
	return { 基本應用 };
};
(function () {
  	var arr = ["jquery", "lodash", "styled", "vue","VueEasyDnD"];
	var cfg = {
		paths: {
			VueEasyDnD:
				`${window.gEx.local_path}/vue-easy-dnd/dist/vue-easy-dnd`,
		},
 
		//依賴
		shim: {
			VueEasyDnD: {
				deps: ["vue"],
			},
		},
	};
	if (typeof define === "function" && define.amd) {
		define({ arr,cfg, __fn });
	} else {
		window.sample = __fn();
	}
})();
