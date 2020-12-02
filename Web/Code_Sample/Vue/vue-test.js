/*

*/
var __fn = ($, _, styled, Vue,bts337,VueMask,draggable,VueDragDrop,VueDraggable  ) => {
	var VueTheMask= {
		'?def'() {
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
	//https://sortablejs.github.io/Vue.Draggable/#/simple
	var Vue_Draggable = {

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
		'拖曳table-col'() {
			var _note = `
			   <pre>
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/table-column-example.vue
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div class="row">
							<div class="col-lg-6">
							<h3>Draggable table</h3>

							<table class="table table-striped">
								<thead class="thead-dark">
								<draggable v-model="headers" tag="tr">
									<th v-for="header in headers" :key="header" scope="col">
									{{ header }}
									</th>
								</draggable>
								</thead>
								<tbody>
								<tr v-for="item in list" :key="item.name">
									<td v-for="header in headers" :key="header">{{ item[header] }}</td>
								</tr>
								</tbody>
							</table>
							</div>
							<x-tpl-sample-view-raw class="col-lg-3" :value="list" title="List" />
						    <x-tpl-sample-view-raw class="col-lg-3" :value="headers" title="Headers" />
						</div>
					`,
					data(){
						return {
							headers: ["id", "name", "sport"],
							list: [
								{ id: 1, name: "Abby", sport: "basket" },
								{ id: 2, name: "Brooke", sport: "foot" },
								{ id: 3, name: "Courtenay", sport: "volley" },
								{ id: 4, name: "David", sport: "rugby" }
							],
							dragging: false
						}
					} 
				}
			};
			return _obj;
		},
		'拖曳table-row'() {
			var _note = `
			   <pre>
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/table-example.vue
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div class="row">
							<div class="col-lg-8">
							<h3>Draggable table</h3>

							<table class="table table-striped">
								<thead class="thead-dark">
									<tr>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Sport</th>
									</tr>
								</thead>
								<draggable v-model="list" tag="tbody">
									<tr v-for="item in list" :key="item.name">
									<td>{{ item.id }}</td>
									<td>{{ item.name }}</td>
									<td>{{ item.sport }}</td>
									</tr>
								</draggable>
							</table>
							</div>
							<x-tpl-sample-view-raw class="col-lg-3" :value="list" title="List" />
						    
						</div>
					`,
					data(){
						return {
							headers: ["id", "name", "sport"],
							list: [
								{ id: 1, name: "Abby", sport: "basket" },
								{ id: 2, name: "Brooke", sport: "foot" },
								{ id: 3, name: "Courtenay", sport: "volley" },
								{ id: 4, name: "David", sport: "rugby" }
							],
							dragging: false
						}
					} 
				}
			};
			return _obj;
		},
		'two-list'() {
			var _note = `
			   <pre>
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/two-list-headerslots.vue
			   </pre>
			   `;
			let id = 1;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div class="row">
						<div class="col-lg-3">
						  <h3>First draggable with header</h3>
						  <button class="btn btn-secondary" @click="add">Add</button>
						  <button class="btn btn-secondary" @click="replace">Replace</button>
						  <div
							slot="header"
							class="btn-group list-group-item"
							role="group"
							aria-label="Basic example"
							>
						  <draggable
							id="first"
							:list="list"
							class="list-group"
							draggable=".item"
							group="a" >
							<div
							  class="list-group-item item"
							  v-for="element in list"
							  :key="element.name" >
							  {{ element.name }}
							</div>
					
							
						  </draggable>
						  </div>

						</div>
					
						<div class="col-lg-3">
						  <h3>Second draggable with header</h3>
						  <button class="btn btn-secondary" @click="add2">Add</button>
						  <button class="btn btn-secondary" @click="replace2">Replace</button>
							  <draggable :list="list2" class="list-group" 
							  	draggable=".item" group="a">
							<div
							  class="list-group-item item"
							  v-for="element in list2"
							  :key="element.name" >
							  {{ element.name }}
							</div>
						  </draggable>
						</div>
					
						<x-tpl-sample-view-raw class="col-lg-3" :value="list" title="List" />

						<x-tpl-sample-view-raw class="col-lg-3" :value="list2" title="List2" />
					  </div>
					</div>
					`,
					data(){
						return {
							list: [
							  { name: "John 1", id: 0 },
							  { name: "Joao 2", id: 1 },
							  { name: "Jean 3", id: 2 }
							],
							list2: [{ name: "Jonny 4", id: 3 }, { name: "Guisepe 5", id: 4 }]
						  };
					},
					methods: {
						add: function() {
						  this.list.push({ name: "Juan " + id, id: id++ });
						},
						replace: function() {
						  this.list = [{ name: "Edgard", id: id++ }];
						},
						add2: function() {
						  this.list2.push({ name: "Juan " + id, id: id++ });
						},
						replace2: function() {
						  this.list2 = [{ name: "Edgard", id: id++ }];
						}
					  } 
				   }
			};
			return _obj;
		},
		'?into row'() {
			var _note = `
			   <pre>
			   draggable .draggable 是用來指定,要拖曳的對象
			   未完成,因為 在 置入整列 的處理上 ,沒能達到想要的效果
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div class="row">
							<div class="col-lg-6">
 
							<draggable   
								:list="list"
								class="list-group"
								ghost-class="ghost"
								draggable=".item"
								group="a" >
								<div
									class="list-group-item item"
									v-for="element in list"
									:key="element.name" >
							  		{{ element.id }}-{{ element.name }}
								</div>
						  </draggable>
		 
						</div>
						<div class="col-lg-6">
							<h3>置入特定欄位</h3>
							<table class="table table-striped">
								<thead class="thead-dark">
									<tr>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Items</th>
									</tr>
								</thead>
								<tr v-for="item in list_table" :key="item.name">
								<td scope="row">{{ item.id }}</td>
								<td>{{ item.name }}</td>
								<td><draggable v-model="item.list" 
									  group="a">
									{{item.list.length}}
								</draggable></td>
								</tr>
								
							</table>
							<h3>置入整列</h3>
							<table class="table table-striped">
								<thead class="thead-dark">
									<tr>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Items</th>
									</tr>
								</thead>
								<draggable
									v-model="list_table"
									tag="tbody" 
									@change="log"
									@add="add"
									draggable=".item"
									group="a"
									>
									<tr v-for="item in list_table" 
										:key="item.name" >
										<td>{{ item.id }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.list.length }}</td>
									</tr>
								</draggable>  
							</table>
						</div>
						</div>
						
						</div>
					`,
					data(){
						return {
							enabled: true,
							list:  window.gEx.mydata,
							list_table: [
								{ id: 1, name: "Abby", sport: "basket" ,list:[]},
								{ id: 2, name: "Brooke", sport: "foot" ,list:[]},
								{ id: 3, name: "Courtenay", sport: "volley" ,list:[]},
								{ id: 4, name: "David", sport: "rugby",list:[] }
							],
							dragging: false
						}
					} ,
					methods: {
						log: function(evt) {
							window.console.log(evt);
						  },
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
		}
	};

	var vue_drag_drop = {
		//https://github.com/cameronhimself/vue-drag-drop/
		'base'() {
			Vue.use(VueDragDrop);
			var _note = `
			   <pre>
			   https://jsfiddle.net/cameronhimself/hvvaadk9/
			   </pre>
			   `;
			var _obj = {
				_css:`
					.drag,
					.drop {
					font-family: sans-serif;
					display: inline-block;
					border-radius: 10px;
					background: #ccc;
					position: relative;
					padding: 30px;
					text-align: center;
					vertical-align: top;
					}

					.drag {
					color: #fff;
					cursor: move;
					background: #777;
					border-right: 2px solid #555;
					border-bottom: 2px solid #555;
					}

					.drop {
					background: #eee;
					border-top: 2px solid #ccc;
					border-left: 2px solid #ccc;
					}

				`,
				_vue: {
					template: `
						<div>
						${_note}
						{{list}}
						<drag class="drag" :transfer-data="{ draggable }">Drag Me</drag>
  						<drop class="drop" v-model="list"  @drop="handleDrop">Dropzone</drop>
						</div>
					`,
					data(){
						return {
							 draggable: 'Drag Me',
							 list:[]
						}
					} ,
					methods: {
						handleDrop(data, event) {
							var _vm = event.currentTarget.__vue__;
							_vm.$attrs.value.push(data);
							_vm.$emit('input',_vm.$attrs.value);
						  	//alert(`You dropped with data: ${JSON.stringify(data)}`);
						},
					  },
				   }
			};
			return _obj;
		},
		'*into row'() {
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
						<div class="row">
							<div class="col-lg-6">
							<ul>
							<drag class="drag list-group-item item" tag="li"
								v-for="element in list" 
								:key="element.name"
								:transfer-data="element">
									{{ element.id }}-{{ element.name }}
								</drag>
							</ul>
						</div>
						<div class="col-lg-6">
							<h3>置入特定欄位</h3>
							<table class="table table-striped">
								<thead class="thead-dark">
									<tr>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Items</th>
									</tr>
								</thead>
								<tr v-for="item in list_table" :key="item.name">
								<td scope="row">{{ item.id }}</td>
								<td>{{ item.name }}</td>
								<td><drop class="drop" @drop="handleDrop" v-model="item.list">
									{{item.list.length}}
									</drop>
								</td>
								</tr>
								
							</table>
							<h3>置入整列</h3>
							<table class="table table-striped">
								<thead class="thead-dark">
									<tr>
									<th scope="col">Id</th>
									<th scope="col">Name</th>
									<th scope="col">Items</th>
									</tr>
								</thead>
								<drop class="drop" @drop="handleDrop" v-for="item in list_table" 
									v-model="item.list" tag="tr">
										<td>{{ item.id }}</td>
										<td>{{ item.name }}</td>
										<td>{{ item.list.length }}</td>
								<drop>  
							</table>
						</div>
						</div>
						
						</div>
					`,
					data(){
						return {
							enabled: true,
							list:  window.gEx.mydata,
							list_table: [
								{ id: 1, name: "Abby", sport: "basket" ,list:[]},
								{ id: 2, name: "Brooke", sport: "foot" ,list:[]},
								{ id: 3, name: "Courtenay", sport: "volley" ,list:[]},
								{ id: 4, name: "David", sport: "rugby",list:[] }
							],
							dragging: false
						}
					} ,
					methods: {
						handleDrop(data, event) {
							var _vm = event.currentTarget.__vue__;
							_vm.$attrs.value.push(data);
							_vm.$emit('input',_vm.$attrs.value);
							//alert(`You dropped with data: ${JSON.stringify(data)}`);
						},
						log: function(evt) {
							window.console.log(evt);
						  },
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
		}
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
	var vue_draggable = {
		'?def'() {
			//console.log(VueDraggable);
			//let { VueDraggableDirective } =  VueDraggable;
			Vue.use(VueDraggable.default);
			var _note = `
			   <pre>
			   https://github.com/Vivify-Ideas/vue-draggable
			   己可呈現拖曳,但試不出 範例的效果
			   </pre>
			   `;
			var _obj = {
				_css:`
				.drag-wrapper {
					display: flex;
					justify-content: center;
				  }
				  
				  .drag-wrapper ul {
					display: flex;
					flex-direction: column;
					padding: 3px !important;
					min-height: 70vh;
					width: 100px;
					float:left;
					list-style-type:none;
					overflow-y:auto;
					border:2px solid #888;
					border-radius:0.2em;
					background:#8adccc;
					color:#555;
					margin-right: 5px;
				  }
				  
				  /* drop target state */
				  .drag-wrapper ul[aria-dropeffect="move"] {
					border-color:#68b;
					background:#fff;
				  }
				  
				  /* drop target focus and dragover state */
				  .drag-wrapper ul[aria-dropeffect="move"]:focus,
				  .drag-wrapper ul[aria-dropeffect="move"].dragover
				  {
					outline:none;
					box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
				  }
				  
				  /* draggable items */
				  li {
					display:block;
					list-style-type:none;
					margin:0 0 2px 0;
					padding:0.2em 0.4em;
					border-radius:0.2em;
					line-height:1.3;
				  }
				  
				  li:hover {
					box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
				  }
				  
				  /* items focus state */
				  li:focus
				  {
					outline:none;
					box-shadow:0 0 0 2px #68b, inset 0 0 0 1px #ddd;
				  }
				  
				  /* items grabbed state */
				  li[aria-grabbed="true"]
				  {
					background:#5cc1a6;
					color:#fff;
				  }
				  
				  @keyframes nodeInserted {
					  from { opacity: 0.2; }
					  to { opacity: 0.8; }
				  }
				  
				  .item-dropzone-area {
					  height: 2rem;
					  background: #888;
					  opacity: 0.8;
					  animation-duration: 0.5s;
					  animation-name: nodeInserted;
				  }
				`,
				_vue: {
					// directives: {
					// 	dragAndDrop: VueDraggableDirective
					//   },
					template: `
						<div>
						${_note}
							<div  v-drag-and-drop:options="options"
								class="drag-wrapper">
								<ul>
								<li>Item 1</li>
								<li>Item 2</li>
								<li>Item 3</li>
								</ul>
								<ul  >
								<li>Item 4</li>
								<li>Item 5</li>
								<li>Item 6</li>
								</ul>
								<ul>
								<li>Item 7</li>
								<li>Item 8</li>
								<li>Item 9</li>
								</ul>
							</div>
						</div>
					`,
					data(){
						const componentInstance = this;
						return {
							options: {
								// dropzoneSelector: 'ul',
								// draggableSelector: 'li',
								// handlerSelector: null,
								// reactivityEnabled: true,
								multipleDropzonesItemsDraggingEnabled: true,
								// showDropzoneAreas: true,
								onDragend(event) {
									componentInstance.someDummyMethod();
						  
									if (!event.droptarget) {
									  console.log('event is dropped out');
									}
								}
							}
						}
				  },
				  methods: {
					someDummyMethod() {
					  console.log('Hello from someDummyMethod');
					}
				  } 
				}
			};
			return _obj;
		},		
	}
	return { VueTheMask
		, Vue_Draggable 
		, vue_drag_drop
		, vue_draggable
		//,vue_easy_dnd 
	};
};
(function () {
	var arr = ["jquery", "lodash", "styled", "vue","bts337"
		,"VueTheMask"
		,"vuedraggable"
		,"vue-drag-drop"
		,"VueDraggable"
	  	//,"VueEasyDnD"
	];
	var cfg = {
		paths: {
			VueTheMask:'https://cdn.jsdelivr.net/npm/vue-the-mask@0.11.1/dist/vue-the-mask.min',
			vuedraggable:'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.2/dist/vuedraggable.umd.min',
			'sortablejs':'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			//VueEasyDnD:`https://cdn.jsdelivr.net/npm/vue-dnd@0.1.1/index.min`,
			'vue-drag-drop':'https://cdn.jsdelivr.net/npm/vue-drag-drop@1.1.4/dist/vue-drag-drop.browser',
			'VueDraggable':"https://cdn.jsdelivr.net/npm/vue-draggable@2.0.6/lib/vue-draggable.min",
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
