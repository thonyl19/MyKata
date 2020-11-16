/*

*/
var __fn = ($, _, styled, Vue,VueMask,draggable) => {
	var VueTheMask= {
		'*def'() {
			Vue.use(VueMask);
			var _note = `
			<pre>
			</pre>
			`;
			var _obj = {
				_css:`
				
				`,
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
		'Simple'() {
			debugger
			//let {draggable} = draggable;
			var _note = `
			   <pre>
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/simple.vue
			   </pre>
			   `;
			   let id = 1;
			var _obj = {
				_css:`
				.buttons {
					margin-top: 35px;
				  }
				  .ghost {
					opacity: 0.5;
					background: #c8ebfb;
				  }
				`,
				_vue: {
					components: {
						draggable,
					},
					template: `
						<div>
						${_note}
						<div class="row">
						<div class="col-2">
						  <div class="form-group">
							<div
							  class="btn-group-vertical buttons"
							  role="group"
							  aria-label="Basic example"
							>
							  <button class="btn btn-secondary" @click="add">Add</button>
							  <button class="btn btn-secondary" @click="replace">Replace</button>
							</div>
					
							<div class="form-check">
							  <input
								id="disabled"
								type="checkbox"
								v-model="enabled"
								class="form-check-input"
							  />
							  <label class="form-check-label" for="disabled">DnD enabled</label>
							</div>
						  </div>
						</div>
					
						<div class="col-6">
						  <h3>Draggable {{ draggingInfo }}</h3>
					
						  <draggable
							:list="list"
							:disabled="!enabled"
							class="list-group"
							ghost-class="ghost"
							:move="checkMove"
							@start="dragging = true"
							@end="dragging = false"
						  >
							<div
							  class="list-group-item"
							  v-for="element in list"
							  :key="element.name"
							>
							  {{ element.name }}
							</div>
						  </draggable>
						</div>
					
						<rawDisplayer class="col-3" :value="list" title="List" />
					  </div>
					`,
					data(){
						return {
							enabled: true,
							list: [
								{ name: "John", id: 0 },
								{ name: "Joao", id: 1 },
								{ name: "Jean", id: 2 }
							],
							dragging: false
						}
					} ,
					computed: {
						draggingInfo() {
						  return this.dragging ? "under drag" : "";
						}
					  },
					  methods: {
						add: function() {
						  this.list.push({ name: "Juan " + id, id: id++ });
						},
						replace: function() {
						  this.list = [{ name: "Edgard", id: id++ }];
						},
						checkMove: function(e) {
						  window.console.log("Future index: " + e.draggedContext.futureIndex);
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
		, VueDraggable 
		//,vue_easy_dnd 
	};
};
(function () {
	var arr = ["jquery", "lodash", "styled", "vue"
		,"VueTheMask"
		,"vuedraggable"
	  	//,"VueEasyDnD"
	];
	var cfg = {
		paths: {
			VueTheMask:'https://cdn.jsdelivr.net/npm/vue-the-mask@0.11.1/dist/vue-the-mask.min',
			vuedraggable:'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.2/dist/vuedraggable.umd.min',
			'sortablejs':'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			//VueEasyDnD:`https://cdn.jsdelivr.net/npm/vue-dnd@0.1.1/index.min`,
		},
 
		//依賴
		shim: {
			VueEasyDnD: {
				deps: ["vue"],
			},
		},
		// urlArgs: function(id, url) {
		// 	debugger
		// 	var args = 'v=1';
		// 	if (url.indexOf('view.html') !== -1) {
		// 		args = 'v=2'
		// 	}
	
		// 	return (url.indexOf('?') === -1 ? '?' : '&') + args;
		// }
	};
	if (typeof define === "function" && define.amd) {
		define({ arr,cfg, __fn });
	} else {
		window.sample = __fn();
	}
})();
