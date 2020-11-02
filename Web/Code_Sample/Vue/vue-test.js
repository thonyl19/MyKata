/*

*/
var __fn = ($, _, styled, Vue,VueMask,vuedraggable) => {
	var VueTheMask= {
		'*def'() {
			Vue.use(VueMask);
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
						<input type="tel" v-mask="'##/##/####'" />
					</div>
					`,
					data(){
						return {}
					}
				}
			};
			return _obj;
		},
	}
	var VueDraggable = {
		/*
		程序中會使用到 sortablejs ,必須 load 到 local .....
		*/
		'*def'() {
			debugger
			let {draggable} = vuedraggable;
			var _note = `
			   <pre>
			   https://david-desmaisons.github.io/draggable-example/
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					components: {
						draggable,
					},
					template: `
						<div>
						${_note}
						<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
							<div v-for="element in myArray" :key="element.id">{{element.name}}</div>
						</draggable>
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
	var vue_easy_dnd = {
		/*
		https://github.com/rlemaigre/Easy-DnD
		https://codesandbox.io/s/example-2-r8n1k?file=/package.json
		不能從  CDN 下,而 node_modules 無法取用....
		*/
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
	return { VueTheMask
		//, VueDraggable 
		//,vue_easy_dnd 
	};
};
(function () {
	var arr = ["jquery", "lodash", "styled", "vue"
		,"VueTheMask"
		//,"vuedraggable"
	  	//,"VueEasyDnD"
	];
	var cfg = {
		paths: {
			VueTheMask:'https://cdn.jsdelivr.net/npm/vue-the-mask@0.11.1/dist/vue-the-mask.min',
			Sortable:'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			vuedraggable:'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.2/dist/vuedraggable.umd.min',
			VueEasyDnD:
				`${window.gEx.local_path}/vue-easy-dnd/dist/vue-easy-dnd`,
		},
 
		//依賴
		shim: {
			vuedraggable:{deps:['Sortable']},
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
