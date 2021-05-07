/*
jquery-awesome-cursor

*/


var __fn = ($,_,Vue)=>{
	debugger
	let views = {
	"?css-jss用例"() {
		/*
				Ref:
					https://cssinjs.org/jss-api?v=v10.0.3
					https://cssinjs.org/?v=v10.0.3
				*/
		var styles = `{
				  wrapper {
					  padding: 40px;
					  background: #f7df1e;
					  text-align: center;
					  color: "red";
				  },
			  }
			  `;

		var _jss = jss.create();
		const { classes } = _jss.createStyleSheet(styles).attach();
		var _vue = {
			template: `
				  <div>
					  <A class="${classes.wrapper}">test</A>
				  </div>`
		};
		return { _vue };
	},
	"?css-sc用例1"() {
		/*
				Ref: vue-styled-components
				*/
		var Wrapper = styled.default.div`{
				  display: flex;
				  flex-direction: column;
				  align-items: center;
				  justify-content: center;
				  width: 100%;
				  padding: 50px;
				  color: #444;
				  border: 1px solid #1890ff;
			  }
			  `;
		Vue.component("Wrapper", Wrapper);

		var _vue = {
			template: `
				  <div>
					  <Wrapper  >test</Wrapper>
				  </div>`
		};
		return { _vue };
	},
	"css-sc用例2"() {
		var _css = `
				  .wrapper {
					  padding: 50px;
					  color: red;
					  border: 1px solid #1890ff;
				  }
				  `;

		var _vue = {
			template: `
				  <div>
					  <div class="wrapper">test</div>
				  </div>`
		};
		return { _vue, _css };
	},
	FontAwesome() {
		var _vue = {
			template: `
				  <dl class="flex f-col">
					  <dt>[旋轉範例]</dt>
					  <dd>
						  <i class="fa fa-spinner fa-spin"></i>
						  <i class="fa fa-refresh fa-spin"></i>
						  <i class="fa fa-cog fa-spin"></i>
					  </dd>
					  <dt>[觸發旋轉]</dt>
					  <dd>
						  <i class="fa fa-quote-left fa-2x pull-left fa-border" @click="case1"></i>
					  </dd>
					  <dt>[Stacked Icons(疊圖)]</dt>
					  <dd>
						  <span class="fa-stack fa-lg">
								  <i class="fa fa-square-o fa-stack-2x"></i>
								  <i class="fa fa-twitter fa-stack-1x"></i>
						  </span>
						  fa-twitter on fa-square-o<br>
						  <span class="fa-stack fa-lg">
							  <i class="fa fa-circle fa-stack-2x"></i>
							  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
						  </span>
						  fa-flag on fa-circle<br>
						  <span class="fa-stack fa-lg">
							  <i class="fa fa-square fa-stack-2x"></i>
							  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
						  </span>
						  fa-terminal on fa-square<br>
						  <span class="fa-stack fa-lg">
							  <i class="fa fa-camera fa-stack-1x"></i>
							  <i class="fa fa-ban fa-stack-2x text-danger"></i>
						  </span>
						  fa-ban on fa-camera
					  </dd>
				  </dl>`,
			methods: {
				case1() { }
			}
		};
		return { _vue };
	},


	"dl-flex"() {
		/* 用例說明
				1.dl 套用 flex 的呈現
				2.input.radio 的使用
				3.v-for 無法直接在 input 內使用,估計是因為 input 沒有 end tag ,
					所以只能利用 li 再隔一層   
	 
				*/
		var _css = `
				  .case-dl-flex dt ,
				  .case-dl-flex dd
				  {
					  border:ridge red 1px;
				  }
				  `;
		var _vue = {
			template: `
				  <div class="case-dl-flex">
					  <ul>
						 <li v-for="(item, idx) in list"><input type="radio" v-model="group" :value=idx />{{item}}</li>
					  </ul>
					  <dl :class="sty">
						  <dt>dt</dt>
						  <dt>dt</dt>
						  <dd><BR /><BR /><BR /><BR /><BR /></dd>
					  </dl>
				  </div>`,
			data() {
				return {
					list: ["原始", "f-col", "f-row"],
					group: 0
				};
			},
			computed: {
				sty() {
					if (this.group == 0) return "";
					return `flex ${this.list[this.group]}`;
				}
			}
		};
		return { _vue, _css };
	},
	"fa-fw"() {
		/*
				Ref:https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons
				1.使用 fa-fw 設定, 讓 fa 的項目可以不被圖片大小影響 到 整個外圍的 tag
				2.學習使用 :stype :class 的動態設定方式
				*/
		var _vue = {
			template: `
				  <div>
					  <input type="checkbox" v-model="set" />fa-fw <br />
					  <input type="range" min="1" max="10" v-model="range" >{{range}}
					  <div  :style="{fontSize:range +'rem' }">
						  <div><i class="fa fa-edit" :class="{'fa-fw':set}" style="background:DodgerBlue"></i></div>
						  <div><i class="fa fa-remove" :class="{'fa-fw':set}" style="background:SkyBlue"></i></div>
					  </div>
				  </div>
				  `,
			data() {
				return {
					set: true,
					range: 1
				};
			}
		};
		return { _vue };
	},

	animation() {
		/*
				Ref:
					https://www.oxxostudio.tw/articles/201803/css-animation.html
					https://www.gradient-animator.com/
				*/
		var _obj = {
			_css: `
				  .sample1{
					  position: relative;
					  left:0;
					  width:50px;
					  height:50px;
					  background:#f00;
					  animation-name:oxxo;
					  animation-duration:2s;
					  animation-iteration-count:infinite
				  }
				  @keyframes oxxo{
					  from{
						  left:0;
					  }
					  to{
						  left:100px;
					  }
				  }
  
				  .sample2{
					  margin: 1em;
					  border-radius: 10px;
					  box-sizing: border-box;
					  border-width: 1px;
					  border-style: solid;
					  border-color: rgba(121, 121, 121, 1);
					  background: linear-gradient(var(--pos,10deg), rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 153, 1) 100%, rgba(0, 255, 153, 1) 100%);
					  animation: gradient 2s linear infinite;
					  
					  
				  }
				  @keyframes gradient {
					  0% { 
						  --pos:10deg; 
					  } 
					  100% { 
						  --pos:360deg; 
					  }
				  }
				  `,
			// animation: gradient 2s infinite ;
			// animation-name:gradient;
			//     animation-duration:2s;
			//     animation-iteration-count:infinite;
			_vue: {
				template: `
					  <div>
						  <div class="sample1"></div>
						  <h1 class="sample2">sample2</h1>
					  </div>`
			}
		};
		return _obj;
	},
	animation_Case() {
		/*
				Ref:
					https://codepen.io/thebabydino/pen/BxxMwg
					https://codepen.io/thebabydino/pen/pVVYKL
					https://codepen.io/thebabydino/pen/bMMJWK
				*/
		var _obj = {
			_vue: {
				template: `
					  <div>
					  </div>`
			}
		};
		return _obj;
	},

	scroll() {
		/*
		[Ref]
		  https://css-tricks.com/custom-scrollbars-in-webkit/
		  https://github.com/inuyaksa/jquery.nicescroll
		  http://webkit-scroll-gen.sourceforge.net/
		  https://codepen.io/GhostRider/pen/GHaFw
		  https://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/
		 */

		var _obj = {
			_css: `
		  :root {
			--webkit_scrollbar:7px;
			--webkit_scrollbar-button:3px;
		  }
		  @keyframes oxxo{
			0%{
			}
			100%{
				overflow-x: hidden !important;
				overflow-y: hidden !important;
			}
		}
  
		  .sty-scroll {
			margin-bottom: .35em;
			overflow-y: auto;
			width:60rem;
			height:10rem;
		  }
  
		  .sty-scroll.hover:hover {
			overflow-x: auto !important;
			overflow-y: auto !important;
			padding-right: var(--webkit_scrollbar) !important;
		}
  
		  //限制只有 y 軸會顯示
		  .sty-scroll.hover.hover-y:hover {
			overflow-x: hidden !important;
			padding-right: calc(var(--webkit_scrollbar)*2) !important;
		}
	
	  
			  .sty-scroll.hover:hover{
				overflow-x: scroll !important;
				overflow-y: scroll !important;
			  }
	  
			  .sty-scroll.hover{
				//保留 scrollbar 空間,避免 UI 閃動
				-webkit-animation: oxxo 3s ease 1 normal;
				-moz-animation: oxxo 3s ease 1 normal;
				-o-animation: oxxo 3s ease 1 normal;
				animation: oxxo 3s ease 1 normal;
				overflow-x: hidden;
				overflow-y: hidden;
				padding-right: calc(var(--webkit_scrollbar)*2) !important;
			  }
			  .sty-scroll::-webkit-scrollbar-track {
				border-radius: 10px;
				background: rgba(0,0,0,0.1);
				//border: 1px solid #62C905;
			  }
			  
			  .sty-scroll::-webkit-scrollbar-thumb {
				-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
				border-radius: 10px;
				background-color: #F5F5F5;
			  }
			  
			  .sty-scroll::-webkit-scrollbar-thumb:hover {
				background: #fff;
			  }
			  
			  .sty-scroll::-webkit-scrollbar-thumb:active {
				background: linear-gradient(left, #22ADD4, #1E98BA);
			  }
	  
			  .sty-scroll::-webkit-scrollbar {
				width: var(--webkit_scrollbar); 
				height:var(--webkit_scrollbar); 
				background: rgba(0,0,0,0);
			  }
	  
			  .sty-scroll::-webkit-scrollbar-button {
				width: var(--webkit_scrollbar_button); 
				height:var(--webkit_scrollbar_button); 
				background: rgba(0,0,0,0);
			  }
			`,
				_vue: {
					template: `
				<div >
				  <input type="checkbox" v-model="hover" @click="hover=!hover" />[hover]{{hover}} <br/>
				  <input type="checkbox" v-model="hover_y" @click="hover_y=!hover_y" />[hover-y]{{hover_y}} <br/>
				  <input type="range" v-model.num="webkit_scrollbar" min=3 max=20   />滑軌主體size[webkit-scrollbar]{{webkit_scrollbar}} <br/>
				  <input type="range" v-model.num="webkit_scrollbar_button" min=0 max=30   />滑軌內部兩端保留空間size[webkit_scrollbar_button]{{webkit_scrollbar_button}} <br/>
				  
				  <div class="sty-scroll" :class="[hover?'hover':'',hover_y?'hover-y':'']">
					<iframe src="vue.htm" scrolling="no" style="width:150%;height:150%;"></iframe>
				  </div>
				</div>`,
					data() {
						return {
							hover: false,
							hover_y: false,
							webkit_scrollbar: 7,
							webkit_scrollbar_button: 3,
							form: {
								webkit_scrollbar_track: {
									radius: 10
								}
							}
						}
					},
					methods: {
						setProp(key, val) {
							document.documentElement.style.setProperty(key, val);
						}
					},
					watch: {
						webkit_scrollbar() {
							this.setProp('--webkit_scrollbar', this.webkit_scrollbar + 'px');
						},
						webkit_scrollbar_button() {
							this.setProp('--webkit_scrollbar_button', this.webkit_scrollbar_button + 'px');
						}

					}

				}
			};
			return _obj;
		},

		'margin 的問題'() {
			/*
			[Ref]
			  https://css-tricks.com/box-sizing/
		
			使用 magin 需要注意, 在 width:100% 的情形下,無論 box-sizing 是那一種模式,
			   margin 跟 width:100 會有衝突造成跑版的情形, 基本上 ,
			   如果是要滿邊且內縮的需求, 單獨使用 margin 即可. 
			   但高度的部份 就需要再找解法了,
			
			*/
			var _obj = {
				_css: `
			.sty-div{
			  margin:.5em;
			  height:100%;
			}
			.border-box{
			  -webkit-box-sizing: border-box;
			  -moz-box-sizing: border-box;
			  box-sizing:border-box;
			}
			.content-box{
			  -webkit-box-sizing:content-box;
			  -moz-box-sizing: content-box;
			  box-sizing:content-box;
			}
			.width100{
			  width:100%;
			}
			`,
				_vue: {
					template: `
				<div>
				  <button @click="mode = mode=='border-box'?'content-box':'border-box'">{{mode}}</button>
				  <div style="width:10em;height:10em" class="area-mk" :class=[mode]>
					<div class="sty-div area-mk" :class="[width100?'width100':'',mode]" @click="width100=!width100">[isWidth100]{{width100}}</div>
				  </div>
				</div>
				`
					, data() {
						return {
							mode: 'border-box',
							width100: true
						}
					}
				}
			};
			return _obj;
		},
		iframe() {
			/*
			https://ddstudio.tw/pure-css-responsive-iframe/
			*/
			var _obj = {
				_css: `
			.sty-iframe{
			  margin:.5em;
			  height:100%;
			}
			`,
				_vue: {
					template: `
				  <x-tpl-sample-range>
					<div class="sty-iframe area-mk"></div>
				  </x-tpl-sample-range>
				`
					, data() {
						return {
							width: 10,
							height: 10
						}
					}
				}
			};
			return _obj;
		},
		'PageFoot'() {
			/*
			[Ref]
			  https://hongkiat.github.io/on-scroll-footer/
			*/
			var _obj = {
				_vue: {
					template: `
						  <div>
						  </div>`
				}
			};
			return _obj;
		},
		std() {
			var _obj = {
				_vue: {
					template: `
						  <div>
						  </div>`
				}
			};
			return _obj;
		},
		def() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var _obj = {
				_css: `
			  .Group{
				margin: 1em;
					border-radius: 3px;
					box-sizing:border-box;
					border: 1px solid #ccc;
					display:table;              
			  }
			  .Group input[type=text],
			  .Group button{
				display:table-cell;
			  }
			  .Group input[type=text]{
				  height: 34px;
				  padding: 0px 12px;
				  font-size: 14px;
				  line-height: 1.42857143;
				  color: #555;
				  background-color: #fff;
				  background-image: none;
				  border: 0px solid #ccc;
				  border-radius: 4px;
				  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
				  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
				  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
				  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
				  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
			  
			  }
			  `,
				_vue: {
					template: `
					 <div>
						${_note}
						<div class=Group>
						  <input type="text" />
						  <button>test</button>
						</div>
					 </div>
					 `,
					data() {
						return {
						}
					}
				}
			};
			return _obj;
		},
	};
	let Case = {
		'*实现未读消息小红点'(){
			var _note = `https://blog.csdn.net/Wonder233/article/details/80613902`
			var _obj = {
				_note
				,_css:`
				.el-button.is-change{
					position: relative;
				}
		  
				.el-button.is-change::before{
					content: " ";
					border: 5px solid red;/*设置红色*/
					border-radius:5px;/*设置圆角*/
					position: absolute;
					z-index: 1000;
					right: 3px;
					top: -3px;
					margin-right: -7px;
					animation-name: kf_dot;
					animation-duration: 1s;
					animation-iteration-count: infinite;
				}
				@keyframes kf_dot {
					from {
						border-color: #fb0000;
					}
			
					to {
						border-color: #ff9999;
					}
				}
			
				`
				,_vue:{
					template: `
						<div>
						<span class="red-point">设置</span>
						<BR />
						<el-button type="primary" size="mini" icon="fa fa-file-o"  class="red-point"
                             >设置
	                    </el-button>
						</div>
					`,
					data() {
						return {
							};
					},
					mounted() { },
					methods: { }
				}

			}
			return _obj;
		},
		'Attrib'() {
			var _note = `
			<pre>
			因應工作需求,需要使用 attrib 的方式綁定樣式,
			此外,一併解決 input.focus 時,預設黑外框的問題
			</pre>
			`;
			var _obj = {
				_css:`
				input{
					outline: 0;
				}
				input[required]{
					border: 1px solid #27c24c;
				}

				`,
				_vue: {
					template: `
					<div>
						${_note}
						<input  type="text" required />
					</div>
					`,
					data(){
						return {}
					}
				}
			};
			return _obj;
		},
		'sty-edc'() {
			var _note = `
			  <pre>
			  </pre>
			  `;
			var _obj = {
				_css: `
				  dl.sty-edc {
					  display: inline-table;
					  color: #fff;
					  margin-right: 5px;
				  }
				  
				  .sty-edc dd, .sty-edc dt {
					  display: table-cell;
					  padding: 1px 7px;
				  }
				  
				  .sty-edc dt {
					  background-color: #777;
					  border-radius: 5px 0 0 5px;
				  }
				  
				  .sty-edc dd {
					  background-color: #5cb85c;
				  }
				  
				  .sty-edc .bg-danger {
					  background-color: #d9534f;
				  }
				  
				  .sty-edc dd:last-child {
					  border-radius: 0 5px 5px 0;
				  }
	  
				  .sty-edc.fx dd{
					  background-color: #5bc0de;
				  }
				  .fx .green{
					  color:#5cb85c;
				  }
				  .fx .red{
					  color:#d9534f;
				  }
				  `,
				_vue: {
					template: `
					  <div>
						  ${_note}
						  <dl class="sty-edc">
							  <dt>UCL / LCL</dt>
							  <dd>150</dd>
							  <dd class="bg-danger">50</dd>
						  </dl>
						  <h3>本想另外試作不一樣的效果,但有點畫蛇添足了,故而取消</h3>
						  <dl class="sty-edc fx">
							  <dt>UCL / LCL</dt>
							  <dd class="green">150</dd>
							  <dd class="red">50</dd>
						  </dl>
					  </div>
					  `,
					data() {
						return {}
					}
				}
			};
			return _obj;
		},
		'percentage-circle'() {
			var _note = `
				  <pre>
				  http://circle.firchow.net/
				  套入 css-percentage-circle 做實現
				  </pre>
				  `;
			var _obj = {
				_css: `
				  .sty{
				  width:10em;
				  height:10em;
				  background:#ffff0038;
				  }
				  .sty1{
				  opacity:0.5;
				  }
			  `,
				_vue: {
					template: `
					  <div>
						  ${_note}
						  {{range}}<input type="range" min="0" max="100" v-model="range" class="slider" />
						  <div class="sty">
						  <div class="sty1 c100" :class="[per]" style="fontSize:7rem;" >
							  <span>50%</span>
							  <div class="slice">
							  <div class="bar"></div>
							  <div class="fill"></div>
							  </div>
						  </div>
						  </div>
					  </div>
					  `,
					data() {
						return {
							range: 0,
						}
					}
					, computed: {
						per() {
							return `p${this.range}`;
						}
					}
				}
			};
			return _obj;
		},
		'percentage-circle-1'() {
			var _note = `
				 <pre>
				 待完成,預計以迴圈的方式,將 p?? 組成陣列字組,
				 塞給CSS 做處理 
				 </pre>
				 `;

			var _obj = {
				_css: `
				  *, *:before, *:after {
					  box-sizing: border-box;
				  }
				  .set-size {
					  font-size: 10em;
				  }
				  .pie-wrapper .label {
					  background: #34495e;
					  border-radius: 50%;
					  bottom: 0.4em;
					  color: #ecf0f1;
					  cursor: default;
					  display: block;
					  font-size: 0.25em;
					  left: 0.4em;
					  line-height: 2.6em;
					  position: absolute;
					  right: 0.4em;
					  text-align: center;
					  top: 0.4em;
					}
					  .pie-wrapper--solid.progress {
						  background: linear-gradient(to right, #3498db 50%, #34495e 50%);
						}
					  .pie-wrapper--solid.progress:before {
						  background: #3498db;
						  transform: rotate(43.2deg);
					  }
					  .pie-wrapper--solid.progress-r {
						  background: linear-gradient(to right, #3498db 50%, #34495e 50%);
						}
					  .pie-wrapper--solid.progress-r:before {
						  background: #3498db;
						  //transform: rotate(43.2deg);
					  }
					.pie-wrapper {
						margin: 15px;
						position: relative;
						height: 1em;
						width: 1em;
						  //   float: left;
					}
					.pie-wrapper--solid {
					  border-radius: 50%;
					  overflow: hidden;
					}
					.pie-wrapper--solid:before {
					  border-radius: 0 100% 100% 0%;
					  content: '';
					  display: block;
					  height: 100%;
					  margin-left: 50%;
					  transform-origin: left;
					}
					.pie-wrapper--solid .label {
					  background: transparent;
					}
				  `,
				_vue: {
					template: `
						  <div>
						  ${_note}
						  <input type="range" min="10" max="200" v-model="range" />{{range}}
						  <div class="pie-wrapper pie-wrapper--solid progress-r" :style="[size]">
							  <span class="label">88<span class="smaller">%</span></span>
						  </div>
						  </div>
					  `,
					data() {
						return {
							range: 10
						}
					},
					computed: {
						size() {
							return { fontSize: this.range + 'px' }
						},
						tr() {

						}
					},

				}
			};
			return _obj;
		},
	}
	let Table = {
		'Case1'() {
			var _note = `
			  <pre>
			  1.字體隨著版面動態放大
			  2.表格樣式
			  3.在這個個案中,表格是需要撐滿高度,且平均分配,經實驗後,用 table 實現最簡單
			  </pre>
			  `;
			var _obj = {
				_css: `
			  .sty-1 {
				//讓表格格線變細 , 需搭配 border="1"
				border-collapse: collapse;
				border-spacing: 0;
	  
				//字體動態放大的關鍵
				font-size: 2.35vmin;
				font-weight: 900;
				text-align: center;
				width: 97%;
				font-family: Arial, Helvetica, sans-serif;
				color: #666;
				text-shadow: 1px 1px 0px #fff;
				background: #fafafa;
				margin-bottom: 2rem;
				border: #ccc 1px solid;
				-moz-border-radius: 3px;
				-webkit-border-radius: 3px;
				border-radius: 3px;
				-moz-box-shadow: 0 1px 2px #d1d1d1;
				-webkit-box-shadow: 0 1px 2px #d1d1d1;
				box-shadow: 0 1px 2px #d1d1d1;
	  
				height:40vh;
			}
			.sty-1 tr {
				background: #f4f4f4;
			}
			.sty-2 {
				height:40vh;
				font-size: 2.35vmin;
				text-align: center;
				width: 97%;
				font-family: Arial, Helvetica, sans-serif;
				color: white;
				margin: 2rem;
				background-color:#14224a;
			}
			.sty-2 .list{
				background-color: rgba(255, 255, 255, 0.45);
			}
			
			//.sty-2 td.list:nth-of-type(2),
			//.sty-2 td.list:not(:first-child)
			.sty-2 td.list:last-of-type(1){
				border-radius: 0 0 30px 30px;
			}
			.sty-2 .z-left{
				background-color: rgba(12, 107, 156,0.5);
			}
			.sty-2 .z-right{
				background-color: rgba(82, 191, 200,.45);
			}
			  `,
				_vue: {
					template: `
					<div>
					   ${_note}
					   	<el-select v-model="set_sty" >
							<el-option
								v-for="item in options"
								:key="item"
								:label="item"
								:value="item">
							</el-option>
					 	</el-select>
					   <table :class="[set_sty]"  border="1"  >
						  <tr height="30%">
							  <td width="60%" class="z-left">待投工單數</td>
							  <td class="z-right">30</td>
						  </tr>
						  <tr height="20%">
							  <td colspan="2" class="list">明細 List...</td>
						  </tr>
						  <tr height="30%">
							  <td class="z-left">在製工單數</td>
							  <td class="z-right">700</td>
						  </tr>
						  <tr height="20%">
							  <td colspan="2" class="list">明細 List...</td>
						  </tr>
					  </table>
					</div>
					`
					,data(){
						return{
							set_sty:'sty-2',
							options:[
								'sty-1',
								'sty-2'
							]
						}
					}
				}
			};
			return _obj;
		},
		'blueTable'() {
			var _note = `
			   <pre>
			   https://divtable.com/table-styler/
			   https://stackoverflow.com/questions/45933894/table-design-in-javafx/45941245
				參考 ,未完成   
			   </pre>
			   `;
			var _obj = {
				_css:`
				table.blueTable {
					border: 1px solid #1C6EA4;
					background-color: #EEEEEE;
					width: 100%;
					text-align: left;
					border-collapse: collapse;
				  }
				  table.blueTable td, table.blueTable th {
					border: 1px solid #AAAAAA;
					padding: 3px 2px;
				  }
				  table.blueTable tbody td {
					font-size: 13px;
				  }
				  table.blueTable tr:nth-child(even) {
					background: #D0E4F5;
				  }
				  table.blueTable thead {
					background: #1C6EA4;
					background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
					background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
					background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
					border-bottom: 2px solid #444444;
				  }
				  table.blueTable thead th {
					font-size: 15px;
					font-weight: bold;
					color: #FFFFFF;
					border-left: 2px solid #D0E4F5;
				  }
				  table.blueTable thead th:first-child {
					border-left: none;
				  }
				  
				  table.blueTable tfoot {
					font-size: 14px;
					font-weight: bold;
					color: #FFFFFF;
					background: #D0E4F5;
					background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
					background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
					background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
					border-top: 2px solid #444444;
				  }
				  table.blueTable tfoot td {
					font-size: 14px;
				  }
				  table.blueTable tfoot .links {
					text-align: right;
				  }
				  table.blueTable tfoot .links a{
					display: inline-block;
					background: #1C6EA4;
					color: #FFFFFF;
					padding: 2px 8px;
					border-radius: 5px;
				  }
				`,
				_vue: {
					template: `
						<div>
						${_note}
						<table class="blueTable">
<thead>
<tr>
<th>head1</th>
<th>head2</th>
<th>head3</th>
<th>head4</th>
</tr>
</thead>
<tfoot>
<tr>
<td colspan="4">
<div class="links"><a href="#">&laquo;</a> <a class="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
</td>
</tr>
</tfoot>
<tbody>
<tr>
<td>cell1_1</td>
<td>cell2_1</td>
<td>cell3_1</td>
<td>cell4_1</td>
</tr>
<tr>
<td>cell1_2</td>
<td>cell2_2</td>
<td>cell3_2</td>
<td>cell4_2</td>
</tr>
<tr>
<td>cell1_3</td>
<td>cell2_3</td>
<td>cell3_3</td>
<td>cell4_3</td>
</tr>
<tr>
<td>cell1_4</td>
<td>cell2_4</td>
<td>cell3_4</td>
<td>cell4_4</td>
</tr>
</tbody>
</table>
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
		//http://johnsardine.com/example/simple-little-table/
	}
	let Layout = {
		'RWD-Title'() {
			var _note = `
			  <pre>
			  個案需求 
			  1.在大螢幕時,標題置中
			  2.在小螢幕時,標題靠左
			  3.有個功能圖示,要浮動置左
			  4.Timer 功能
			  </pre>
			  `;
			var _obj = {
				_css: `
				@media screen and (min-width: 750px) {
					.ds-algin {
						text-align: left !important;
					}
				}
			
				@media screen and (min-width: 950px) {
					.ds-algin {
						text-align: center !important;
					}
				}
				.bg-green {
				  font-family: color: #656565;
				  font-family: "微軟正黑體","Source Sans Pro", sans-serif;
				  background: rgb(55, 188, 155);
				  color: #fff !important;
				}
				.ds-title {
				  font-size: 2.37rem;
				  font-weight: 800;
				  color: white;
				  padding: 0px 35px;
			  }
		  
			  .ds-timer {
				  position: absolute;
				  right: 0;
				  bottom: 0;
				  margin-right: 1em;
				  margin-top: 7px;
				  font-size: 1.5rem;
			  }
		  
			  .ds-switch {
				  position: absolute;
				  left: 3px;
				  top: 5px;
				  cursor: pointer;
			  }
			  `,
				_vue: {
					template: `
					<div>
					   ${_note}
					   <div class="bg-green ds-algin" style="position:relative">
							<span class="ds-title">製造生產監控指標</span>
							<span class="ds-timer ">{{ date }} {{ time }}</span>
							<i class="ds-switch fa fa-desktop"></i>
						</div>
					</div>
					`,
					data() {
						return {
							time: '',
							date: '',
						}
					},
					mounted() {
						var _self = this;
						_self.Timer();
					},
					methods: {
						Timer() {
							var _self = this;
							var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
							var timerID = setInterval(updateTime, 1000);
							updateTime();
							function updateTime() {
								var cd = new Date();
								_self.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
								_self.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
							};

							function zeroPadding(num, digit) {
								var zero = '';
								for (var i = 0; i < digit; i++) {
									zero += '0';
								}
								return (zero + num).slice(-digit);
							}
						}
					}
				}
			};
			return _obj;
		},
		'仿element-ui 官網'() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var _obj = {
				_css: `
			   .main{
				   height:100%;
				   overflow-y:hidden;
				   display:block;
				   margin:0px;
			   }
			   .f-row dd div
			   {
				  height:100%;
				   
			   } 
				`,
				_vue: {
					template: `
						<div style="height:100%">
						${_note}
						<div class="main area-mk">
						</div>
						</div>
					`,
					data() {
						return {
						}
					}
				}
			};
			return _obj;
		},
	}
	var Position = {
		'浮動工具'() {
			var _note = `
				 <pre>
				 實現 浮動 toolbox 基礎和 動態調試的功能 
				 </pre>
				 `;
			var _obj = {
				_css: `
				  .base {
					  position:relative;
					  margin-bottom: 20px;
					  margin-right:3px !important;
					  border: #ccc 1px solid;
					  border-radius: 4px;
					  height:5em;
				  }
	   
				  
				  .base.ext .toolbox.hide{
					  display:none;
				  }
				  .base.ext:hover .toolbox{
					  display: inline-block;;
				  }
				  .toolbox{
					  border: #ccc 1px solid;
					  height:3em;
					  position:absolute;
					  /*
					  left:.7rem;
					  top:-3.1rem;*/
					  padding: 0 .7rem .7rem 0;
					  /*避免移動時產生自動隱藏的issue*/
					  width:50%;
					  opacity:1;
					  z-index:-1;
				  }
				  .toolbox:hover{
					  opacity:1 !important;
				  }
				  .toolbox  {
					  padding: 7px;
				  }
				  
				  `,
				_vue: {
					template: `
						  <div>
						  ${_note}
						  <div class="base ext">
							  <div class="toolbox" :class="[class_hide]" :style="sty_pos">
								  
							  </div>
							  [hide]<input type="checkbox" v-model="hide" /><br/>
							  <div>
								  <input type="text" v-model="pos1.val" />
								  <span v-for="op in pos1.ops" >
									  <input type="radio" v-model="pos1.checked" 
										  :value="op" 
										  :checked="pos1.checked==op"  />
									  {{op}}
									  </span>
							  </div>
							  <div>
								  <input type="text" v-model="pos2.val" />
								  <span v-for="op in pos2.ops" >
									  <input type="radio" v-model="pos2.checked" 
										  :value="op" 
										  :checked="pos2.checked==op"  />
									  {{op}}
									  </span>
							  </div>
							  [sty_pos]{{sty_pos}}
						  </div>
						  </div>
					  `,
					data() {
						return {
							hide: false,
							pos1: {
								ops: ['left', 'right'],
								checked: "left",
								val: '.7rem'
							},
							pos2: {
								ops: ['top', 'bottom'],
								checked: "top",
								val: '-3.1rem'
							}
						}
					},
					computed: {
						class_hide() {
							return this.hide ? "" : "hide";
						},
						sty_pos() {
							var _css = {}
							_css[this.pos1.checked] = this.pos1.val;
							_css[this.pos2.checked] = this.pos2.val;
							return _css;
						}
					}
				}
			};
			return _obj;
		},

	}
	let Attrib = {
		"text-shadow"() {
			/* 用例說明
					1.主要是動態呈現  text-shadow 的效果.
					2.應用 html5 input.type="range" 做數字控制
					3.應用 Vue :style 的動態樣式控制
					4.應用 Vue 的 dom style.cssText 處理
					5.應用 watch 機制
					*/
			var _vue = {
				template: `
					  <div>
						  {{range}}<input type="range" min="1" max="10" v-model="range" class="slider" id="myRange">
						  <div ref="styObj" :style="styleObject">text-shadow</div>
						  <div>{{styleObject}}</div>
						  <div>cssText:{{sty}}</div>
					  </div>`,
				data() {
					return {
						range: 10,
						sty: ""
					};
				},
				computed: {
					styleObject() {
						return {
							"font-size": "30px",
							color: "rgba(0,0,0,0)",
							"text-shadow": `0 0 ${this.range}px rgba(255,0,0,1)`
						};
					}
				},
				watch: {
					styleObject() {
						let { styObj } = this.$refs;
						if (styObj != null) {
							this.sty = styObj.style.cssText;
						}
					}
				}
			};
			return { _vue };
		},
		'text-overflow'(){
			var _note = `<pre>
			https://blog.xuite.net/vexed/tech/22596484-%E7%94%A8+CSS+%E8%AE%93%E9%81%8E%E9%95%B7%E6%BA%A2%E5%87%BA%E7%9A%84%E5%AD%97%E7%9C%81%E7%95%A5%E8%AE%8A+...
如果文字超過邊界,自動以 ... 方式呈現</pre>
			`
			var _obj = {
				_css: `
			 
			.sty-1{
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			.items{
				white-space:nowrap;
			}
			`,
				_vue: {
					template: `
					<div>
				${_note}
				  <x-tpl-sample-range>
					<div class="sty-1 area-mk">使用設定的字串代表被切斷的字串。</div>
					<div class="selectize-input items has-options form-control full has-items">
						<div class="item sty-1" data-value="GTI20091612080907042">
							<h5><span class="label label-primary ">ROUTE_NO111111111</span> OPER</h5>
						</div>
					</div>
				  </x-tpl-sample-range>
				  </div>
				`
				}
			};
			return _obj;
		}
	}
	var Background = {
		'gradient'() {
			var _note = `
			我們是一個高雄的熱血創意團隊，成員有韌體工程師、網頁前後端工程師
				以及視覺設計師，憑著一股對網頁技術無止盡的愛，
			在 2015 年，實現了真正用 Web 跨入 IOT 的完整過程，
			創造出物聯網嶄新的服務：Webduino，透過純粹撰寫 HTML 
				與 Javascript 的網頁語法，就能夠玩轉各式各樣物聯網好玩的應用，為廣大的開發者和網頁設計師，創造了前所未有的開發模式，這個開發模式，將引領物聯網的潮流，將翻轉物聯網的生態，帶來各式各樣的創意與契機！ 
			`;
			var _obj = {
				_note,
				_css:`
				div.base{
					height:5em;
				}
				`,
				_vue: {
					template: `
						<div>
						{{range}}<input type="range" min="1" max="100" v-model="range" class="slider" id="myRange">
						<div class='base' ref="styObj"> </div>
						<textarea  v-model="csstxt"></textarea>
					`,
					data(){
						return {
							range:10,
						}
					},
		 
					computed:{
						csstxt() {
							let _css = `
									background:#BCCDD6;
									background:linear-gradient(#BCCDD6 0%, #FFFFFF ${this.range}%, #BCCDD6 100%);									  
								  `;
							this.bind(this.$refs.styObj,_css);
							return _css;
						},
 					},
					methods:{
						bind(styObj,css){
							debugger
							if (styObj != null) {
								styObj.style.cssText = css;
							}
						}
					},
					 
				}
			};
			return _obj;
		},
		"linear-gradient"() {
			var _obj = {
				_vue: {
					template: `
						  <div class="lg">
							  [linear-gradient]{{myRange}}<input type="range" min="10" max="360" v-model="myRange" class="slider" >
							  <h1 ref="styObj">資料統計</h1>
							  <textarea  v-model="csstxt"></textarea>
						  </div>
						  `,
					data() {
						return {
							myRange: 10
						};
					},
					mounted() {
						this.$refs.styObj.style.cssText = this.csstxt;
					},
	
					computed: {
						csstxt() {
							debugger;
							let _css = `
									  margin: 1em;
									  border-radius: 10px;
									  box-sizing:border-box;
									  border-width:1px;
									  border-style:solid;
									  border-color:rgba(121, 121, 121, 1);
									  background:linear-gradient(${this.myRange}deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 153, 1) 100%, rgba(0, 255, 153, 1) 100%);
								  `;
							let { styObj } = this.$refs;
							if (styObj != null) {
								styObj.style.cssText = _css;
							}
							return _css;
						}
					}
					/*
								//以下是經過簡化後, 不需要的方法,留存備忘
								methods:{
									bindCss(){
										let {styObj} = this.$refs;
										if (styObj != null){
											styObj.style.cssText = this.csstxt;
										}
									}
								},
								watch:{
									// csstxt(){
									//     this.bindCss()
									// },
									
									不 work
									'this.$refs.styObj.style.cssText'(){
										debugger
									}
									
									原本的作用是希望在初始化時,就處理一次,但 因為 styObj 是 null,
										所以不 work 留存備忘之
									csstxt:{
										immediate: true, // makes the watcher fire on first render, too.
										handler() {
											debugger
											let {styObj} = this.$refs;
											if (styObj != null){
												styObj.style.cssText = this.csstxt;
											}
										}
									}
								}
								*/
				}
			};
			return _obj;
		},
	}
	return {
		views,
		Attrib,
		Case, Table, Layout, Position,
		Background,
	};
}
(function () {
	var arr = [
		'jquery',
		'lodash',
		'vue',
		//'jss',
	];
	var cfg = {
		paths:{
			jss:'https://cdn.jsdelivr.net/npm/jss@10.1.1/dist/jss.min',
			'jss-preset-default':'https://cdn.jsdelivr.net/npm/jss-preset-default@10.1.1/dist/jss-preset-default.min',
		},
		shim: {
			jss:{deps:['jss-preset-default']},
		}
	}
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg, __fn});
	}else{
		window.sample = __fn();
	}
}());
