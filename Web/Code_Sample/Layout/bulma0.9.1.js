/*
https://bootstrap.hexschool.com/
*/
var __fn = ($, _ , styled, Vue, bulma) => {
 
 
	let Elements = {
		'*Button'() {
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
						<a class="button is-primary">
						Button
						</a>
						<h3>按鈕群組 - buttons </h3>
						[is-normal]<el-checkbox v-model="is_normal" />
						<div class="buttons are-small">
							<button class="button">Small</button>
							<button class="button">Small</button>
							<button class="button">Small</button>
							<button :class="['button', is_normal?'is-normal':'']">Normal</button>
							<button class="button">Small</button>
						</div>
						</div>
					`,
					data(){
						return {
							is_normal:false
						}
					} 
				   }
			};
			return _obj;
		},
	};
	return {
		Elements,
		
	};
};
(function () {
	//$, _ , styled, Vue, bts45
	var arr = [
		'jquery',
		'lodash',
		'styled',
		'vue',
		'css!bulma'
	];
	var cfg = {
		paths: {
			"bulma":"https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min",
		
		},
		// shim:{
		// 	"bulma":{deps: ['css!bulma-css']},
		// }
	};
	if (typeof define === "function" && define.amd) {
		define({arr, cfg, __fn});
	}else{
		window.sample = __fn();
	}
})();
 