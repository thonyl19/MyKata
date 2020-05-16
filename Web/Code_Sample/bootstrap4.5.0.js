/*
https://bootstrap.hexschool.com/
*/

let Grid = {
	'Order classes'() {
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
				data(){
					return {
				  }
				} 
			}
		};
		return _obj;
	},
	'Margin 通用類別'() {
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
					`
			}
		};
		return _obj;
	},
};
let 元件 ={
	'Alert'() {
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
						$('.alert').alert()
					},
			}
		};
		return _obj;
	},
	'Badge'() {
		var _note = `
	<pre>
	https://bootstrap.hexschool.com/docs/4.2/components/badge/
	1.與 button 做組合應用
	2.單獨使用 的應用情境 
	3.搭配 hyperlink 的使用情境 
	</pre>
			`;
		var _obj = {
			_css:``,
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
				data(){
					return {}
				}
			}
		};
		return _obj;
	},
	'*Breadcrumb'() {
		var _note = `
			<pre>
			麵包屑
			https://bootstrap.hexschool.com/docs/4.2/components/breadcrumb/
			
			</pre>
			`;
		var _obj = {
			_css:``,
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
				data(){
					return {}
				}
			}
		};
		return _obj;
	},
	'Button_base'() {
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
					data(){
						 return {}
					}
			  }
		};
		return _obj;
	},

}
let utilities = {
	'Border'() {
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
				data(){
					return {
						color:["primary",
						"secondary",
						"success",
						"danger",
						"warning",
						"info",
						"light",
						"dark",
						"white"],
						rounded:["",
							"top",
							"right",
							"bottom",
							"left",
							"circle",
							"pill",
							"0",
						]
					}
				}
				
			}
		};
		return _obj;
	},

}
window.sample = { 
	Grid ,元件 , utilities
};
