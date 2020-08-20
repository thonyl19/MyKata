(function () {
  debugger;
  var arr = ["lodash"
	, "styled"
	, "vue"
	, "https://cdn.jsdelivr.net/npm/vuejs-paginate@2.1.0/dist/index.min.js",
	, 'https://cdn.rawgit.com/matfish2/vue-pagination/master/dist/vue-pagination.min.js'
//   , "vuejs-paginate"
//   , "vue-pagination"
  //,'JwPagination'
];
  define(arr,function (_, styled, vue, v_paginate ,v_pagination
	//,v_JwPagination
	){
	debugger
	//Vue.component('jw-pagination', v_JwPagination);
	vue.use(v_pagination);
	//console.log(v_paginate);
	var vue_pagination = {
		'*def'() {
			var _note = `
			   <pre>
			   [Ref]https://jsfiddle.net/matfish2/rnw8jjs3/
			   </pre>
			   `;
			var _obj = {
				_css:`
				#pagination {
					margin-top:10px;
					text-align:center;
				  }
				  
				  h3 {
					margin-top:10px;
					text-align:center;
				  }
				  
				  div {
					margin-top:10px;
				  }
				  
				  small {
					font-size:14px;
				  }
				`,
				_vue: {
					template: `
						<div>
						${_note}
						<div id="pagination">
							<button class="btn btn-primary" @click="refresh()">Refresh</button>
							<button class="btn btn-default" @click="prev()">Prev</button>
							<button class="btn btn-default" @click="next()">Next</button>
							<button class="btn btn-default" @click="prevChunk()">Prev Chunk</button>
							<button class="btn btn-default" @click="nextChunk()">Next Chunk</button>
							<div >
							Records:
							<input type="text" @keyup="refresh()" v-model="records">
							Per Page:
							<input type="text" @keyup="refresh()" v-model="perpage">
							</div>

							<h3>Displaying page {{table1Page}} out of {{totalPages}} <small>({{PerPage}} records per page)</small></h3>

							<pagination ref="table" for="table" :per-page="PerPage" :records="Records"></pagination>
							<p v-if="!Records">No records</p>
							
							<p class="note">
							Check out the <a href="https://jsfiddle.net/matfish2/f5h8xwgn/" target="_blank">vue-tables</a> package, now using this pagination component.</p>
							</div>
						</div>
					`,
					data(){ 
						return {
						table1Page:1,
					  table2Page:1,
					  code:'table1',
					  records:100,
					  perpage:10
					}},
					computed:{
						PerPage: function() {
					  return this.perpage?parseInt(this.perpage):25;
					  },
					  Records: function() {
					  return this.records?parseInt(this.records):0;
					  },
					  totalPages: function() {
						  let {table} = this.$refs;
						  if (table==null) return 0;
					  	return table.totalPages;
					  }
					},
					methods: {
						refresh: function() {
						  this.$refs.table.setPage(1);
					  },
					   prev: function() {
						  return this.$refs.table.prev();
					  },
					  next: function() {
						  return this.$refs.table.next();
					  },
					  prevChunk: function() {
						  return this.$refs.table.prevChunk();
					  },
					  nextChunk: function() {
						  return this.$refs.table.nextChunk();
					  }
					},
					ready: function() {
						this.$on('vue-pagination::table', function(page) {
						  this.table1Page = page;	
					  });
					}
				  }
				   
			};
			return _obj;
		},
	};
    var vuejs_paginate = {
      "def"() {
        var _note = `
				   <pre>
				   </pre>
				   `;
        var _obj = {
			_css: ``,
			_vue: {
				template: `
					<div>
					${_note}
						<paginate 
							:pageCount="10"
							:containerClass="'pagination'"
							:clickHandler="clickCallback">
							</paginate>
					</div>
				`,
				components:{'paginate': v_paginate},
				data() {
					return {};
				},
				methods: {
					clickCallback: function(page) {
					console.log(page)
					}
				}
			},
        };
        return _obj;
      },
	};
	var JwPagination = {
		'base'() {
			const exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
			var _note = `
			   <pre>
			   無法使用 required 下載
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
										<div class="card-body">
							<div v-for="item in pageOfItems" :key="item.id">{{item.name}}</div>
						</div>
						<div class="card-footer pb-0 pt-3">
							<jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
						</div>
						</div>
					`,
					data(){
						return {
							exampleItemsexampleItems,
							pageOfItems: []
						}
					},
					methods:{
						onChangePage(pageOfItems) {
							// update page of items
							this.pageOfItems = pageOfItems;
						}
					}
				   }
			};
			return _obj;
		},
	};
    return {vue_pagination, vuejs_paginate ,JwPagination};
  });
})();
