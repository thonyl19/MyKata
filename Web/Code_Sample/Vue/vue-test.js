 
/*

*/
var __fn = ($, _, styled, Vue,bts337
	,VueMask,draggable,VueDragDrop
		,SmoothDnD,VueSmoothDnd 
			,VueFullCalendar
			
			//,dayGridPlugin
	//,VueDraggableDirective
	) => {
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
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/simple.vue
			   `;
			   let id = 1;
			var _obj = {
				_note,
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
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/table-column-example.vue
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<div>
						<div class="row">
							<div class="col-lg-6">
							<h3>Draggable table col</h3>

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
							dragging: true
						}
					} 
				}
			};
			return _obj;
		},
		'拖曳table-row'() {
			var _note = `
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/table-example.vue
			   https://onedrive.live.com/view.aspx?resid=492F148C66C33613%2137895&id=documents&wd=target%28Vue-Ext.one%7C52F72BC1-F7F1-4DB6-9581-8FECB8E80909%2F%E6%8B%96%E6%9B%B3table-row%7C32C00A11-6FC2-4B4D-81BF-2ACEA03C3F75%2F%29onenote%3Ahttps%3A%2F%2Fd.docs.live.net%2F492f148c66c33613%2FOneNote%2F%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80%2FVue-Ext.one%23%E6%8B%96%E6%9B%B3table-row&section-id=%7B52F72BC1-F7F1-4DB6-9581-8FECB8E80909%7D&page-id=%7B32C00A11-6FC2-4B4D-81BF-2ACEA03C3F75%7D&end=  
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<div>
						<div class="row">
							<div class="col-lg-8">
							<h3>Draggable table row</h3>

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
			   https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/two-list-headerslots.vue
			   https://onedrive.live.com/view.aspx?resid=492F148C66C33613%2137895&id=documents&wd=target%28Vue-Ext.one%7C52F72BC1-F7F1-4DB6-9581-8FECB8E80909%2Ftwo-list%7CC83FE750-DBBB-4C72-B5CC-12CBE62898B9%2F%29onenote:https://d.docs.live.net/492f148c66c33613/OneNote/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/Vue-Ext.one#two-list&section-id={52F72BC1-F7F1-4DB6-9581-8FECB8E80909}&page-id={C83FE750-DBBB-4C72-B5CC-12CBE62898B9}&end  
			   `;
			let id = 1;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<div>
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
							  	draggable=".item" group="b">
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
			   draggable .draggable 是用來指定,要拖曳的對象
			   未完成,因為 在 置入整列 的處理上 ,沒能達到想要的效果
			   `;
			var _obj = {
				_note,
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
			   https://jsfiddle.net/cameronhimself/hvvaadk9/
			   `;
			var _obj = {
				_note,
				_css:`
					.vue_drag_drop .drag,
					.vue_drag_drop .drop {
						font-family: sans-serif;
						display: inline-block;
						border-radius: 10px;
						background: #ccc;
						position: relative;
						padding: 30px;
						text-align: center;
						vertical-align: top;
					}

					.vue_drag_drop .drag {
					color: #fff;
					cursor: move;
					background: #777;
					border-right: 2px solid #555;
					border-bottom: 2px solid #555;
					}

					.vue_drag_drop .drop {
					background: #eee;
					border-top: 2px solid #ccc;
					border-left: 2px solid #ccc;
					}

				`,
				_vue: {
					template: `
						<div class="vue_drag_drop">
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
						//處理放下事件
						handleDrop(data, event) {
							//取得事件對象的 vue 實體
							var _vm = event.currentTarget.__vue__;
							//對 vue 實體 的 value 放入資料
							_vm.$attrs.value.push(data);
							_vm.$emit('input',_vm.$attrs.value);
						  	//alert(`You dropped with data: ${JSON.stringify(data)}`);
						},
					  },
				   }
			};
			return _obj;
		},
		'into row'() {
			var _note = `
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<div>
						<div class="row">
							<div class="col-lg-6">
							<ul>
							<drag class="drag list-group-item item" tag="li"
								v-for="element in list" 
								:key="element.name"
								:transfer-data="element"
								@dragend="myListener">
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
										<td>
											<ul>
												<drag class="drag list-group-item item" tag="li"
													v-for="element in item.list" 
													:key="element.name"
													:transfer-data="element"
													@dragend="myListener">
														{{ element.id }}-{{ element.name }}
												</drag>
											</ul>
										</td>
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
						myListener(data, event) {
							//處理項目被移除後,資料異動程序
							debugger
							var _vm = event.currentTarget.__vue__;
							console.log(_vm.$attrs.idx)
							// myArg === 'foo'
						},
						handleDrop(data, event) {
							debugger
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
		},
		/* eslint-disable */
		/* eslint-disable */
		
		'DragImage'() {
			var _note = `
			https://github.com/cameronhimself/vue-drag-drop-demo/blob/master/src/DragImage.vue
			原作中的 :image="require('./assets/drag.png')" 並沒有實作,
				主要是因為 require 配置的問題,後來改用 img 直接放在 drag 內,
			   `;
			var _obj = {
				_note,
				_css:`
				.drag-img .drop {
					font-family: sans-serif;
					display: inline-block;
					border-radius: 10px;
					background: #ccc;
					position: relative;
					padding: 30px;
					text-align: center;
					vertical-align: top;
				}
				`,
				_vue: {
					template: `
						<div class="drag-img">
							<drag class="drag"
							:transfer-data="{ example: 'drag-image' }">
							<img src="../img/head.png" class="card-img-top" alt="...">
							</drag>
							<drop class="drop" @drop="handleDrop">drop</drop>
						</div>
					`,
					data(){
						return {
						}
					}, 
					methods: {
						handleDrop(data) {
							this.$message(`You dropped with data: ${JSON.stringify(data)}`);
						},
					},
				   }
			};
			return _obj;
		},
		/* eslint-disable */
		
		'DropEffects'() {
			var _note = `
			https://github.com/cameronhimself/vue-drag-drop-demo/blob/master/src/DropEffects.vue
			   `;
			var _obj = {
				_note,
				_css:`
				.drop-effcts .drop {
					font-family: sans-serif;
					display: inline-block;
					border-radius: 10px;
					background: #ccc;
					position: relative;
					padding: 30px;
					text-align: center;
					vertical-align: top;
				}
				.drop-effcts .drop.over {
					border-color: #aaa;
					background: #ccc;
				}
				`,
				_vue: {
					template: `
						<div class="drop-effcts">
						<div>
							<drag class="drag"
								:transfer-data="{ example: 'drop effects (copy)' }"
								:effect-allowed="['copy']"
								drop-effect="copy"
							>"copy"</drag>
							<drag class="drag"
								:transfer-data="{ example: 'drop effects (move)' }"
								:effect-allowed="['move']"
								drop-effect="move"
							>"move"</drag>
							<drag class="drag"
								:transfer-data="{ example: 'drop effects (link)' }"
								:effect-allowed="['link']"
								drop-effect="link"
							>"link"</drag>
							<drag class="drag"
								:transfer-data="{ example: 'drop effects (none)' }"
								:effect-allowed="['none']"
								drop-effect="none"
							>"none"</drag>
						</div>
						<div>
							<drop class="drop"
								:class="{ over }"
								@dragover="over = true"
								@dragleave="over = false"
								@drop="handleDrop">
									drop
							</drop>
						</div>
						</div>
					`,
					data(){
						return {
							over: false 
						}
					},
					methods: {
						handleDrop(data) {
							this.over = false;
							this.$message(`You dropped with data: ${JSON.stringify(data)}`);
						},
					},
				}
			};
			return _obj;
		},
		/* eslint-disable */
		
		'*Lists'() {
			var _note = `
			https://github.com/cameronhimself/vue-drag-drop-demo/blob/master/src/Lists.vue
			   `;
			var _obj = {
				_note,
				_css:`
				.lists .drop {
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
					display: inline-block;
					padding: 30px;

				}
				.drag.A { background: #aaa; }
				.drag.B { background: #888; }
				.drag.C { background: #666; }
				.drag.D { background: #444; }
				.drag.E { background: #222; }
				.drag.F { background: #000; }
				.drop {
					display: inline-block;
					vertical-align: top;
					padding: 15px;
					margin-bottom: 20px;
					width: auto;
					height: auto;
				}
				`,
				_vue: {
					template: `
						<div class="lists">
						<div v-for="(list, i) in lists" :key="i">
			<drop class="drop list" @drop="handleDrop(list, ...arguments)">
				<drag v-for="item in list"
					class="drag"
					:key="item"
					:class="{ [item]: true }"
					:transfer-data="{ item: item, list: list, example: 'lists' }">
						{{ item }}
				</drag>
			</drop>
		</div>
						</div>
					`,
					data(){
						return {
							lists: [
								['A', 'B', 'C'],
								['D', 'E', 'F'],
							],
						}
					} ,
					methods: {
						handleDrop(toList, data) {
							const fromList = data.list;
							if (fromList) {
								toList.push(data.item);
								fromList.splice(fromList.indexOf(data.item), 1);
								toList.sort((a, b) => a > b);
							}
						},
					},
				}
			};
			return _obj;
		},
		'Groups'() {
			var _note = `
			https://github.com/cameronhimself/vue-drag-drop-demo/blob/master/src/Groups.vue
			把相同的項目從 drag 移到 drop 即可呈現效果   
			`;
			var _obj = {
				_note,
				_css:`
				.grp .drag,.grp .drop {
					display: inline-block;
					font-family: sans-serif;
					display: inline-block;
					border-radius: 10px;
					background: #ccc;
					position: relative;
					padding: 30px;
					text-align: center;
					vertical-align: top;
				}
				.drop.allowed {
					background-color: #dfd;
				}
				`,
				_vue: {
					template: `
						<div class="grp">
							<div>
								<h3>drag</h3>
								<drag v-for="group in groups" class="drag"
									:key="group"
									:transfer-data="{ group, example: 'groups' }"
									@dragstart="dragging = group"
									@dragend="dragging = null">
										{{ group }}
								</drag>
							</div>
							<div>
								<h3>drop</h3>
								<drop v-for="group in groups" class="drop"
									:key="group"
									:class="{ allowed: dragging === group }"
									@dragover="handleDragover(group, ...arguments)"
									@drop="handleDrop">
										{{ group }}
								</drop>
							</div>
						</div>
					`,
					data(){
						return {
							groups: ['A', 'B', 'C'],
							dragging: null,
						}
					}
					,
					methods: {
						handleDragover(group, data, event) {
							if (group !== data.group) {
								event.dataTransfer.dropEffect = 'none';
							}
						},
						handleDrop(data) {
							this.$message(`You dropped with data: ${JSON.stringify(data)}`);
						},
					}, 
				}
			};
			return _obj;
		},
		'Basic list support'() {
			var _note = `
			https://cameronhimself.github.io/vue-drag-drop/
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<div>
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

	var vue_smooth_dnd = {
		'??def'() {
			var _note = `
			   <pre>
			   https://kutlugsahin.github.io/vue-smooth-dnd/#/drag-class
			   https://github.com/kutlugsahin/vue-smooth-dnd
			   未完成
			   </pre>
			   `;
			debugger
			let { Container, Draggable }  =  VueSmoothDnd;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
							<div class="simple-page">
								<Container @drop="onDrop">            
								<Draggable v-for="item in items" :key="item.id">
									<div class="draggable-item">
									{{item.data}}
									</div>
								</Draggable>
								</Container>
							</div>
						</div>
					`,
					components: { Container, Draggable },
					data() {
						return {
						items: generateItems(50, i => ({ id: i, data: "Draggable " + i }))
						};
					},
					methods: {  
						onDrop(dropResult) {
						this.items = applyDrag(this.items, dropResult);
						}
					}
				}
			};
			return _obj;
		},
	}

	var vue_Fullcalendar = {
		'??base'() {
			debugger
			var _note = `
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					components: {
						FullCalendar:VueFullCalendar // make the <FullCalendar> tag available
					},
					template: `
						<div>
							<FullCalendar :events="fcEvents"/>
						</div>
					`,
					data(){
						return {
							fcEvents :[{
								title     :  'event1',
								start     : '2021-02-21',
								cssClass  : 'family',
								YOUR_DATA : {}
							  },
							  {
								title     : 'event2',
								start     : '2021-02-21',
								end       : '2021-02-22',
								cssClass  : ['family', 'career'],
								YOUR_DATA : {}
							  }],
							calendarOptions: {
								// plugins: [ dayGridPlugin
								// 	//, interactionPlugin 
								// ],
								//initialView: 'dayGridMonth'
							}
						}
					} 
				}
			};
			return _obj;
		},
	}
	
	var fullCalendar = {
		'*base'() {
			debugger
			var _note = `
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					components: {
						FullCalendar 
					},
					template: `
						<div>
							<FullCalendar :events="fcEvents"/>
						</div>
					`,
					data(){
						return {
							fcEvents :[{
								title     :  'event1',
								start     : '2021-02-21',
								cssClass  : 'family',
								YOUR_DATA : {}
							  },
							  {
								title     : 'event2',
								start     : '2021-02-21',
								end       : '2021-02-22',
								cssClass  : ['family', 'career'],
								YOUR_DATA : {}
							  }],
							calendarOptions: {
								// plugins: [ dayGridPlugin
								// 	//, interactionPlugin 
								// ],
								//initialView: 'dayGridMonth'
							}
						}
					} 
				}
			};
			return _obj;
		},
	}
	var code_gen = {
		/* eslint-disable */
		
		'*def'() {
			var _note = `
			   `;
			var _obj = {
				_note,
				_css:``,
				_vue: {
					template: `
						<pre v-text="msg">
						</pre>
					`,
					data(){
						return {
							test:{A:1,B:2},
							msg:`
							public StaffMaster(
								int staffId,
								string staffName,
								string address,
								DateTime createdDate
							)
							${test}
							{
								StaffId = staffId;
								StaffName = staffName;
								Address = address;
								CreatedDate = createdDate;
							}						
							`
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
		, vue_smooth_dnd
		, vue_Fullcalendar
		, code_gen
		//, fullCalendar
		//,vue_easy_dnd 
	};
};
(function () {
	var arr = ["jquery", "lodash", "styled", "vue","bts337"
		,"VueTheMask","vuedraggable","vue-drag-drop"
			,"smooth-dnd","vue-smooth-dnd"
			,'vue-FullCalendar'
			//,"vFullCalendar"
			//,"FullCalendar"//,"VueFullcalendar-daygrid"

		//,"VueDraggable"
	  	//,"VueEasyDnD"
	];
	var cfg = {
		paths: {
			VueTheMask:'https://cdn.jsdelivr.net/npm/vue-the-mask@0.11.1/dist/vue-the-mask.min',
			vuedraggable:'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.2/dist/vuedraggable.umd.min',
			'sortablejs':'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			//VueEasyDnD:`https://cdn.jsdelivr.net/npm/vue-dnd@0.1.1/index.min`,
			'vue-drag-drop':'https://cdn.jsdelivr.net/npm/vue-drag-drop@1.1.4/dist/vue-drag-drop.browser',
			'vue-smooth-dnd':'https://cdn.jsdelivr.net/npm/vue-smooth-dnd@0.8.1/dist/vue-smooth-dnd.min',
			'smooth-dnd':'https://cdn.jsdelivr.net/npm/smooth-dnd@0.12.1/dist/index.min',
			'VueDraggable':"https://cdn.jsdelivr.net/npm/vue-draggable@2.0.6/lib/vue-draggable.min",
			"vue-FullCalendar":"https://cdn.jsdelivr.net/npm/vue-fullcalendar@1.0.9/dist/vue-fullcalendar.min",
			//'vFullCalendar':"https://cdn.jsdelivr.net/npm/@fullcalendar/vue@5.5.0/dist/main.global.min",
			//FullCalendar:"https://cdn.jsdelivr.net/npm/fullcalendar@5.5.0/main",
			//'VueFullcalendar-daygrid':"https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@5.5.0/main.global.min",
			
		},
 
		//依賴
		shim: {
			VueEasyDnD: {
				deps: ["vue"],
			},
			"vue-smooth-dnd":{
				deps: ["vue","smooth-dnd"],
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
