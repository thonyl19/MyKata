/*
https://vuetifyjs.com/zh-Hans/getting-started/installation/
*/
var __fn = ($, _ , styled, Vue, Vuetify) => {
 
 
	let Elements = {
		'*def'() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					vuetify: new Vuetify(),
					template: `
						<div>
						${_note}
						<v-alert
							color="#2A3B4D"
							dark
							icon="mdi-firework"
							dense
							>
							Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Vivamus quis mi. Quisque ut nisi. Maecenas malesuada.
							</v-alert>
							<v-alert
							color="#C51162"
							dark
							icon="mdi-material-design"
							border="right"
							>
							Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. In ut quam vitae odio lacinia tincidunt.
							</v-alert>
							<v-alert
							color="primary"
							dark
							icon="mdi-vuetify"
							border="left"
							prominent
							>
							Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur at lacus ac velit ornare lobortis.
							</v-alert>

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
		'vuetify2x'
	];
	var cfg = {
		// paths: {
		// 	"bulma":"https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min",
		
		// },
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
 