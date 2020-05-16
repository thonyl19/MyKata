﻿/*
https://bootstrap.hexschool.com/
*/

let Grid = {
  "Order classes"() {
	var _note = `
			<pre>
				使用 .order- class 來控制內容中 可見的內容 順序,
				1.依據 order-? 決定顯示的順序
				2. order-last , order-first 直接改變顯示位置
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
					<div>
						${_note}
						<div class="container">
							<div class="row">
								<div class="col">
									First, but unordered
								</div>
								<div class="col order-12">
									Second, but last
								</div>
								<div class="col order-1">
									Third, but first
								</div>
							</div>
						</div>
					</div>
					`,
		data() {
		  return {};
		},
	  },
	};
	return _obj;
  },
  "Margin 通用類別"() {
	var _note = `
			<pre>
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
					<div  >
						${_note}
						<div class="container mk">
							<div class="row">
							<div class="col-md-4">.col-md-4</div>
							<div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
							</div>
							<div class="row">
							<div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
							<div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
							</div>
							<div class="row">
							<div class="col-auto mr-auto">.col-auto .mr-auto</div>
							<div class="col-auto">.col-auto</div>
							</div>
						</div>
					</div>
					`,
	  },
	};
	return _obj;
  },
};
let 元件 = {
  Alert() {
	var _note = `
			<pre>
				這裡是透過 jq plugin 來處理,所以目前試不出來.
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
					<div>
						${_note}
						<div class="alert alert-primary" role="alert">
							A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
						</div>
					</div>
					`,
		mounted() {
		  $(".alert").alert();
		},
	  },
	};
	return _obj;
  },
  Badge() {
	var _note = `
	<pre>
	https://bootstrap.hexschool.com/docs/4.2/components/badge/
	1.與 button 做組合應用
	2.單獨使用 的應用情境 
	3.搭配 hyperlink 的使用情境 
	</pre>
			`;
	var _obj = {
	  _css: ``,
	  _vue: {
		template: `
				<div>
					${_note}
					<button type="button" class="btn btn-primary">
						Notifications <span class="badge badge-light">4</span>
					</button>

					<h3>小圖示式的標籤應用</h3>
					<span class="badge badge-primary">Primary</span>
					<span class="badge badge-secondary badge-pill">Secondary</span>
					<h3>連結應用</h3>
					<a href="#" class="badge badge-primary">Primary</a>
					<a href="#" class="badge badge-secondary">Secondary</a>
				</div>
				`,
		data() {
		  return {};
		},
	  },
	};
	return _obj;
  },
  "*Breadcrumb"() {
	var _note = `
			<pre>
			麵包屑
			https://bootstrap.hexschool.com/docs/4.2/components/breadcrumb/
			
			</pre>
			`;
	var _obj = {
	  _css: ``,
	  _vue: {
		template: `
				<div>
					${_note}
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
							<li class="breadcrumb-item"><a href="#">Library</a></li>
							<li class="breadcrumb-item active" aria-current="page">Data</li>
						</ol>
					</nav>
				</div>
				`,
		data() {
		  return {};
		},
	  },
	};
	return _obj;
  },
  Button_base() {
	var _note = `
			<pre>
			https://bootstrap.hexschool.com/docs/4.2/components/button-group/
			1. .btn-group 為基本的組合單位
			2. 搭配 .btn-toolbar 可以再組合成為一個群單位           
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
					<div>
						${_note}
						<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
							<div class="btn-group mr-2" role="group" aria-label="First group">
								<button type="button" class="btn btn-secondary">1</button>
								<button type="button" class="btn btn-secondary">2</button>
								<button type="button" class="btn btn-secondary">3</button>
								<button type="button" class="btn btn-secondary">4</button>
							</div>
							<div class="btn-group mr-2" role="group" aria-label="Second group">
								<button type="button" class="btn btn-secondary">5</button>
								<button type="button" class="btn btn-secondary">6</button>
								<button type="button" class="btn btn-secondary">7</button>
							</div>
							<div class="btn-group" role="group" aria-label="Third group">
								<button type="button" class="btn btn-secondary">8</button>
							</div>
						</div>
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
let utilities = {
  Border() {
	var _note = `
			<pre>
			1.border 讓 el 產生邊框
			2.border-{top|right|top|bottom} 消除 el 邊框
			3.border-{primary...} 加上色彩
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
					<div>
						${_note}
						<div class="mk block">
							<span class="border">border</span>
							<span class="border-top">border-top</span>
							<span class="border-right">border-right</span>
							<span class="border-bottom">border-bottom</span>
							<span class="border-left">border-left</span>
							<BR/><br/>
							<span class="border border-0">border-0</span>
							<span class="border border-top-0">border-top-0</span>
							<span class="border border-right-0">border-right-0</span>
							<span class="border border-bottom-0">border-bottom-0</span>
							<span class="border border-left-0">border-left-0</span>
							<br/><br/>
							<span v-for="item in color" class="border" :class="['border-'+item]">{{item}}</span>
							<br/><br/>
							<span v-for="item in rounded" class="border"  :class="['rounded'+(item==''?'':'-'+item)]">rounded-{{item==''?'':item}}</span>

						</div>
 
					</div>
					`,
		data() {
		  return {
			color: [
			  "primary",
			  "secondary",
			  "success",
			  "danger",
			  "warning",
			  "info",
			  "light",
			  "dark",
			  "white",
			],
			rounded: [
			  "",
			  "top",
			  "right",
			  "bottom",
			  "left",
			  "circle",
			  "pill",
			  "0",
			],
		  };
		},
	  },
	};
	return _obj;
  },
  clearfix() {
	var _note = `
		  <pre>
		  https://bootstrap.hexschool.com/docs/4.2/utilities/clearfix/
		  1.演示如何使用清除浮動。不使用清除浮動，外層 div 將不會包覆按鈕而導致跑版
		  2.還有 Sass mixin 應用
		  </pre>
		  `;
	var _obj = {
	  _vue: {
		template: `
				<div>
				   ${_note}
				   <input type="checkbox" v-model="clearfix" />clearfix<br />
				   <div class="bg-info " :class="[clearfix?'clearfix':'']">
					 <button type="button" class="btn btn-secondary float-left">Example Button floated left</button>
					 <button type="button" class="btn btn-secondary float-right">Example Button floated right</button>
				  </div>
				</div>
				`,
		data() {
		  return {
			clearfix: false,
		  };
		},
	  },
	};
	return _obj;
  },
  "Close icon"() {
	var _note = `
		   <pre>
		   https://bootstrap.hexschool.com/docs/4.2/utilities/close-icon/
		   1.預設會將 圖示浮動到最右邊
		   </pre>
		   `;
	var _obj = {
	  _vue: {
		template: `
				 <div>
					${_note}
					<button type="button" class="close" aria-label="Close">
					 <span aria-hidden="true">&times;</span>
					 </button>
				 </div>
				 `,
		data() {
		  return {};
		},
	  },
	};
	return _obj;
  },
  Color() {
	var _note = `
			<pre>
			https://bootstrap.hexschool.com/docs/4.2/utilities/colors/#color
			1.text-? 文字類
			2.bg-? 背景類
			3.背景漸層 需搭配 sass
			</pre>
			`;
	var _obj = {
	  _vue: {
		template: `
		<div>
			${_note}
			<div class="mk block">
			<div class="text-primary">.text-primary</div>
			<div class="text-secondary">.text-secondary</div>
			<div class="text-success">.text-success</div>
			<div class="text-danger">.text-danger</div>
			<div class="text-warning">.text-warning</div>
			<div class="text-info">.text-info</div>
			<div class="text-light bg-dark">.text-light</div>
			<div class="text-dark">.text-dark</div>
			<div class="text-body">.text-body</div>
			<div class="text-muted">.text-muted</div>
			<div class="text-white bg-dark">.text-white</div>
			<div class="text-black-50">.text-black-50</div>
			<div class="text-white-50 bg-dark">.text-white-50</div>

			<h1>背景色</h1>
			<div class="mb-2 bg-primary text-white">.bg-primary</div>
			<div class="mb-2 bg-secondary text-white">.bg-secondary</div>
			<div class="mb-2 bg-success text-white">.bg-success</div>
			<div class="mb-2 bg-danger text-white">.bg-danger</div>
			<div class="mb-2 bg-warning text-dark">.bg-warning</div>
			<div class="mb-2 bg-info text-white">.bg-info</div>
			<div class="mb-2 bg-light text-dark">.bg-light</div>
			<div class="mb-2 bg-dark text-white">.bg-dark</div>
			<div class="mb-2 bg-white text-dark">.bg-white</div>
			<div class="mb-2 bg-transparent text-dark">.bg-transparent</div>

			<br/>
			<div class="mb-2 bg-dark text-white bg-gradient-primary">.bg-gradient-primary</div>
			</div>
		</div>
		`,
		data() {
		  return {};
		},
	  },
	};
	return _obj;
  	},
	"Display 屬性"() {
		var _note = `
				<pre>
				https://bootstrap.hexschool.com/docs/4.2/utilities/display/
				1. .d-{value} for xs
					value 可以替換成以下：
						none	inline		inline-block	block
						table	table-cell	table-row		
						flex	inline-flex
				2. .d-{breakpoint}-{value} for sm, md, lg, and xl.
					ex:d-md-block 會在大螢幕 設為 block 樣式 ,效果可以透過縮小頁面來呈現
				3. 要在給定的螢幕上顯示一個元素，您可以將一個 .d-*-none 與 .d-*-* 
					結合起來，例如 .d-none.d-md-block.d-xl-none 將隱藏所有螢幕尺寸的元素，
					除了中型和大型設備
				4. 在 print 時的應用
					.d-print-{value}
				</pre>
				`;
		var _obj = {
		_vue: {
			template: `
				<div>
					${_note}
					<div class="d-inline p-2 bg-primary text-white">d-inline</div>
					<div class="d-inline p-2 bg-dark text-white d-md-block">d-inline d-md-block</div>
				</div>
				`,
			data() {
			return {};
			},
		},
		};
		return _obj;
	},
	'*Flex'() {
		var _note = `
		<pre>
		https://bootstrap.hexschool.com/docs/4.2/utilities/flex/
		1.方向性的語法
			flex-{row|column}|{-reverse}
		</pre>
		   `;
		var dyn = {
			template: `
			<div class="d-flex justify-content-start">
				<div v-for="(item) in list" class="p-2">
 
					<input :type="type"  
						:name="name"  
						:value="item"
						v-model="checked"  />
					{{item}}
				</div>
			</div>
			`,
			props:{
				type:{
					type:String,
					default:'radio'
				},
				name:{
					type:String,
					default:"grp"
				},
				value:{
					type: [String,Array,Object],
					default(){
						return null;
					}
				},
				list:{
					type:Array
				}
			},
 
			computed:{
				// selected:{
				// 	get(){
				// 		return this.value;
				// 	},
				// 	set(val){
				// 		console.log([val,this.value]);
				// 		this.$emit('input', val);
				// 	}
				// },
				checked:{
					get(){
						return this.value;
					},
					set(val){
						console.log([val,this.value]);
						this.$emit('input', val);
					}
				}
			}
		}
		var _obj = {
			_css:``,
			_vue: {
				template: `
					<div>
					${_note} 

					<h3>方向性</h3>
					<dyn  :list="direction" v-model="direction_sel"></dyn>
						<div class="mk">
						<div class="d-flex bd-highlight mb-3" :class="['flex-'+direction_sel]">
						<div class="p-2 bd-highlight">Flex item 1</div>
						<div class="p-2 bd-highlight">Flex item 2</div>
						<div class="p-2 bd-highlight">Flex item 3</div>
						</div>
						<h4>reverse</h4>
						<div class="d-flex  bd-highlight" :class="['flex-'+direction_sel+'-reverse']">
						<div class="p-2 bd-highlight">Flex item 1</div>
						<div class="p-2 bd-highlight">Flex item 2</div>
						<div class="p-2 bd-highlight">Flex item 3</div>
						</div>
					</div>
					
					<h3>調整內容 justify-content-{{justify_sel}} </h3>
						<dyn name="grp1" :list="justify" v-model="justify_sel"></dyn>
						<div class="bd-example mk">
							<div class="d-flex  bd-highlight mb-3" 
								:class="['justify-content-'+justify_sel]">
								<div class="p-2 bd-highlight">Flex item</div>
								<div class="p-2 bd-highlight">Flex item</div>
								<div class="p-2 bd-highlight">Flex item</div>
							</div>
						</div>
					</div>
				`,
				data(){
					return {
						set:true,
						direction_sel:"row",
						direction:['row','column'],
						justify:["start",
							"end",
							"center",
							"between",
							"around"],
						justify_sel:'start',
					}
				},
				components:{dyn},
				// computed: {
				// 	direction(){
				// 		return this.set?'row':'column'
				// 	}
				// }, 
			}
		};
		return _obj;
	},
};
window.sample = {
  Grid,
  元件,
  utilities,
};
