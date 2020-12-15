/*
https://vuetifyjs.com/zh-Hans/getting-started/installation/
*/
var __fn = ($, _ , styled, Vue, Vuetify) => {
 
 
	let Elements = {
		'*基礎用法'() {
			var _note = `
			<pre>
			   	一開始使用時,就出了跑版的問題,本查官網時,還以需要 rest.css 來處理,
				   https://vuetifyjs.com/zh-Hans/styles/css-reset/
				串了許久才從這裡找到問題點,
					https://www.bookstack.cn/read/vuetifyjs-2.2.26/81a85c910ce7b804.md#ek11np
					为了使您的应用能正常运行，您必须用 v-app 组件包裹您的应用。请参阅 Application 组件的文档。
				重點就是需要多包一層 v-app ,問題就自己解決了
			</pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					vuetify: new Vuetify(),
					template: `
						<div>
						${_note}
						<v-app>
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
					    </v-app>
					</div>
					`,
					data(){
						return {
							dialogm1: '',
        dialog: false,
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
 