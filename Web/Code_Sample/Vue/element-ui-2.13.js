/*
https://v3.bootcss.com/getting-started/
https://github.com/ElemeFE/element/tree/dev/packages
*/
var __fn = (
	$, _ , styled, Vue,Mock,moment,
	ELEMENT,UI_AppExt,axios,VueDragDrop,InfiniteLoading
)=> 
{
	//debugger;
	let Views = {

		'巢狀 el-tabs 範例'() {
			var _note = `
			   <pre>
			   此範例為 pw-tabs poc ,
			   </pre>
			   `;
			var dyn = {
				template:`
					<el-tabs>
							<el-tab-pane
								v-for="(tab,key,idx) in tabs" 
								:label="key" 
								:name="key" 
								:key="idx"
								>
								<component
									v-model="tabs[key]"
									:is="tab.is"
									/>
							</el-tab-pane>
						</el-tabs>
				`,
				props:['value'],
				computed:{
					tabs(){
						let {tabs=[]} = this.value;
						return tabs;
					},
				},
			};
			var _obj = {
				_css:``,
				_vue: {
					components:{'pw-tabs-z':dyn},
					template: `
						<div>
						${_note}
						<pw-tabs-z v-model="tabs1" />
						<pw-tabs-z v-model="tabs2" />
						</div>
					`,
					data(){
						return {
							tabs1:{
								tabs:{
									Input:{},
									Config:{},
								}
							}
							,tabs2:{
								tabs:{
									Input:{},
									Config:{
										is:'pw-tabs',
										tabs:{
											AAAAA:{},
											BBBB:{},
										}
									},
								}
							}
						}
					} 
				   }
			};
			return _obj;
		},
	
	  "自定義 el-select 項目圖示"() {
		var _css = `
				img {
					width: 20px;
					height: 20px;
				}
	
				.prefix {
					margin-top: 10px;
				}
				`;
		var _vue = {
		  template: `
					<el-select v-model="value" value-key="value" placeholder="Select">
						<template slot="prefix"><img class="prefix" :src="value.photo" /></template>
						<el-option v-for="item in outlet" :key="item.value" :label="item.label" :value="item">
						<img :src="item.photo"> {{ item.label }}
						</el-option>
					</el-select>
					`,
		  data() {
			return {
			  outlet: [
				{
				  value: "mcd",
				  label: "McDonald",
				  photo:
					"https://upload.wikimedia.org/wikipedia/commons/5/50/McDonald%27s_SVG_logo.svg"
				},
				{
				  value: "kfc",
				  label: "KFC",
				  photo:
					"https://kfcku.com/uploads/media/logo-footer.png"
				},
				{
				  value: "pizzahut",
				  label: "Pizza Hut",
				  photo:
					"https://vignette.wikia.nocookie.net/logopedia/images/b/b3/Pizza_Hut_Logo_2.png/revision/latest?cb=20161129133747"
				}
			  ],
			  value: null
			};
		  },
		  created() {
			this.value = this.outlet[0];
		  }
		};
		return { _vue, _css };
	  },

	};
	
	let Case = {
		'el-switch active-value'() {
			var _note = `
			<pre>
			在開發時碰到的一個案例,當下在處理 el-switch 時,怎麼操作都不無法正確反應,
				最後發現問題的徵癥點在於 ,最終需要處理的數據 fixedTip 必須是 number,
				但 active-value 如果沒有用 :active-value 設定的話,
				最後傳入 fixedTip 的值一定會變成是 string ,
				所以最後的解法 ,就是改用 :active-value 方式處理.
			但很奇怪的是,在 這裡沒辦法複現沒有反應的這個問題,充其量只能呈現出,
				兩個方法傳參數的格式差別而己
			</pre>
			`;
			var dyn = {
					template: `
						<el-switch v-model.num="fixedTip"
							active-value=2
							:inactive-value=1 />
					`,
					props: {
						cfg: {
							type: Object,
							default() {
								return {};
							}
						}
					},
					computed: {
						fixedTip:{
							get(){
								let { fixedTip = 1 } = this.cfg;
								return fixedTip;
							},
							set(val){
								this.cfg.fixedTip = val;
								this.$emit('update:cfg', this.cfg);
							}
						}
					},
			}
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<div>
						${_note}
						<dyn :cfg.sync="cfg"/>
						{{cfg}}
					</div>
					`,
					components:{dyn},
					data(){
						return {
							cfg:{
								fixedTip:"1"
							}
	
						}
					} 
				}
			};
			return _obj;
		},
		'bts.form-control'() {
			/*
			在套用 form-control 之後 , element UI 的樣式會出現跑版的問題,
			目前仍找不到比較好的解決方案
			*/
			var _vue = {
			template: `
						<div>
						<div><input type="checkbox" v-model="isUse" />套用 form-control</div>
						<el-select :class="[isUse?'form-control':'']"  v-model="sel">
						<el-option v-for="item in list_box_type"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
						</div>`,
						data(){
						return {
							isUse:true,
							sel:0,
							list_box_type: [
							{
								value: 0,
								label: 'ZGB'
							}, {
								value: 1,
								label: 'Lens'
							}, {
								value: 2,
								label: 'T-Spacer'
							}
						],
						}
						}
			};
			return {_vue};
		},
		'el-checkbox Tab控制'(){
			/*
			情境需求:
			1.基本的輸入,是以 [備註記錄],[位置碼] 為主
			2.因為[備註記錄] 大多都重覆,為了增加建檔效率,所以,設 Keep 功能,
				讓[備註記錄] 可以保留,直接輸入下筆[位置碼]
			3.總合 1,2 的需求,輸入操作的控制為以下模式
			A:第一次輸入
				tab依序為[備註記錄][Keep][位置碼]
		
			需求變更,此段己不必要,先保留
			*/
			var _vue = {
				template: `
				<div>
					<el-input ref="errCode" placeholder="请输入内容" size="mini" style="width:50rem;" tabindex="1">
					<template slot="prepend">
						備註記錄
					</template>
					<template slot="append">
						<el-checkbox v-model="isKeep" @@click="isKeep=!isKeep"> Keep</el-checkbox>
					</template>
					</el-input>
			
					<el-input placeholder="请输入内容" size="mini" @@keyup.enter.native="mapCode_input($event)" v-model="mapCode" style="width:30rem;" tabindex="3">
						<template slot="prepend">
							位置碼
						</template>
					</el-input>
				</div>`,
				data(){
				return {
					isKeep: false,
					mapCode: "",
					errCode: "",
					
				}
				},
				methods: {
				isKeepErrCode(isErrCodeFocus) {
					if (this.isKeep == false) {
						this.errCode = ""
						if (isErrCodeFocus) this.$refs.errCode.focus();
					};
				},
				},
			};
			return {_vue};
		},

		
		'版本控制'() {
			var _obj = {
			_vue:{
				template: `
				<div>
				<el-autocomplete
				popper-class="my-autocomplete"
				v-model="state"
				:fetch-suggestions="querySearch"
				placeholder="请输入内容"
				@select="handleSelect">
				<template slot="append">
				<el-switch
					active-color="#13ce66"
					inactive-color="#ff4949">
				</el-switch>
				
				</template>
				<template slot="prepend">
					<el-button type="primary" icon="el-icon-s-flag"></el-button>
				</template>
				
				<i
					class="el-icon-search el-input__icon"
					slot="suffix"
					@click="handleIconClick">
				</i>
				<template slot-scope="{ item }">
					<div class="name">{{ item.value }}</div>
					<span class="addr">{{ item.address }}</span>
				</template>
				
				</el-autocomplete>
			
				<el-autocomplete>
				<template slot="prepend">
					<el-button type="primary" icon="el-icon-s-flag"></el-button>
				</template>
				<template>
					<el-select >
					<el-option
						v-for="item in ver_list"
						:key="item.ver"
						:label="item.ver"
						:value="item.ver">
					</el-option>
					</el-select>
				</template>
				<template slot="append">
					<el-switch
						active-color="#13ce66"
						inactive-color="#ff4949">
					</el-switch>
				</template>
			</el-autocomplete>
		</div>
				
				`,
				data() {
					return {
					restaurants: [],
					state: '',
					ver_list:[
						{ ver: 1, en: true ,def:false},
						{ ver: 2, en: false ,def:false},
						{ver:3,en:false,def:true}
					]
					};
				},
				methods: {
					querySearch(queryString, cb) {
					var restaurants = this.restaurants;
					var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
					// 调用 callback 返回建议列表的数据
					cb(results);
					},
					createFilter(queryString) {
					return (restaurant) => {
						return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
					};
					},
					loadAll() {
					return [
						{ "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
						{ "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
						{ "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
						{ "value": "泷千家(天山西路店)", "address": "天山西路438号" },
						{ "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
						{ "value": "贡茶", "address": "上海市长宁区金钟路633号" },
						{ "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
						{ "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
						{ "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
						{ "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
						{ "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
						{ "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
						{ "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
						{ "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
						{ "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
						{ "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
						{ "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
						{ "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
						{ "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
						{ "value": "枪会山", "address": "上海市普陀区棕榈路" },
						{ "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
						{ "value": "钱记", "address": "上海市长宁区天山西路" },
						{ "value": "壹杯加", "address": "上海市长宁区通协路" },
						{ "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
						{ "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
						{ "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
						{ "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
						{ "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
						{ "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
						{ "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
						{ "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
						{ "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
						{ "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
						{ "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
						{ "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
						{ "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
						{ "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
						{ "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
						{ "value": "浏阳蒸菜", "address": "天山西路430号" },
						{ "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
						{ "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
						{ "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
						{ "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
						{ "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
						{ "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
						{ "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
						{ "value": "阳阳麻辣烫", "address": "天山西路389号" },
						{ "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
					];
					},
					handleSelect(item) {
					console.log(item);
					},
					handleIconClick(ev) {
					console.log(ev);
					}
				},
				mounted() {
					this.restaurants = this.loadAll();
				}
		
			}};
			return _obj;
		},
		'Reload-Timer'() {
			var _note = `
			<pre>
			這個是專案上的需求 ,主要是要能呈現一個圓型計時圖示,以便做 Reload 的倒數計時,
				並提供 提前 Reload (按鈕觸發)的功能
			</pre>
			`;
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<div>
						${_note}
						<el-button type="text" @click="renew" >
							<el-progress type="circle" :percentage="percentage" 
									width="20"
									:show-text="false" :stroke-width="4"
									color="#515253"></el-progress>
						</el-button>
					</div>
					`,
					data(){
						return {
							renewSec: 10,
							times: 0,
							timer: null,
						}
					},
					mounted() {
						this.fn_timer();
					},
					computed: {
						percentage() {
							var prgs = this.times / this.renewSec;
							if (prgs >= 1) {
								this.times = 0;
								window.clearTimeout(this.timer);
								return 0;
							}
							return prgs * 100;
						}
					},
					methods: {
						fn_timer(){
							var _self = this;
							_self.timer = setInterval(() => {
								_self.times++;
							}, 1000);							
						},
						renew(){
							this.times = 0;
							window.clearTimeout(this.timer);	
						}
					},
				}
			};
			return _obj;
		},
		'fmoney'() {
			var _note = `
			<pre>
			https://segmentfault.com/a/1190000022299780
			</pre>
			`;
			var dyn = {
				inheritAttrs:false,
				template:`
					<el-input v-model="formatVal"
						v-bind="$attrs"
						v-on="inputEvn"
					></el-input>
				`,
				props:{
					value:{
						type:[String,Number],
						default:null,
						desc:'Value'
					},
					format: {
                        type: [Function, String],
                        default: null,
                        desc: 'format Function/FunctionName'
                    }
				},
				data(){
					return {
						formatVal:'',
						act_format(){}
					}
				},
				computed: {
					inputEvn(){
						var vm=this;
						return Object.assign({},this.$listeners,{
							input(val){
								debugger
								vm.formatVal=val;
								vm.$emit('input',val.replace(/,/g,''));
							},
							blur(event){
								vm.formatVal=vm.act_format(vm.value);
								if (vm.$listeners.blur){
									vm.$listeners.blur(event);
								}
							},
							focus(event){
								vm.formatVal = vm.value;
							}
						})
					}
				},
				created(){
					if (this.format == null){
						this.act_format = this.Thousands;
					} else if  (_.isFunction(this.format)){
						this.act_format = this.format;
					}else if (_.isString(this.format)){
						this.act_format = this[this.format];
					}
					this.formatVal = this.act_format(this.value);
				},
				methods:{
					//將資料格式化為 千分位
 					Thousands(n){
						debugger
						if(!n) return n;  
						let str = n.toString().split('.');  
						let re = /\d{1,3}(?=(\d{3})+$)/g;  
						let n1 = str[0].replace(re, "$&,");  
						return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}`; 
					},
					CellPhone(v){
						
					}
				}
			};
			var _obj = {
				_css:``,
				_vue: {
					components:{dyn},
					template: `
					<div>
						${_note}
						{{formatVal}}
						<h3>基本用法</h3>
						<dyn v-model="formatVal"></dyn>
						<h3>Function</h3>
						<dyn v-model="formatVal" :format="testFun"></dyn>
					</div>
					`,
					data(){
						return {
							formatVal:100
						}
					},
					methods:{
						testFun(val){
							debugger
							return val.toString().replace(/./g,"-");
						}
					}
				}
			};
			return _obj;
		},
	};
	let Fail = {
	
	  ''() {
		var _obj = {
		   _vue:{
			  template: `
			  <div>
				<pre></pre>
				
			  </div>
			  `
		   }};
		return _obj;
	 },
	'el-switch 應用問題'() {
		var _obj = {
			_css:`
			  .el-switch.el-button.fix{
				height:40px;
	
			  }
			  .el-switch.el-button.fix .el-switch__core{
				top:-3px;
			  }
			`,
		   _vue:{
			 data(){
			   return {
				Fix:true
			   }
			 },
			  template: `
			  <div>
			
			<pre>
			swith 物件無法整合進 el-button-group ,而且會出現順序錯置的問題,
			  但後來發現, 將 switch 加上 el-button 的樣式,可以讓顯示位置正確排列,
			  但呈現上還是有問題,主要的原因就是 tag 的高度計算有問題,
			  此外,還有顯示偏移.
			使用 css fix ,可以勉強解掉上述的問題,但仍不算最佳解
	
			</pre>
			  <input type=checkbox v-model="Fix" />[Css Fix] {{Fix}}
			  <div class="form-group has-success has-feedback">
				<el-button-group>
				  <el-button >Order 1</el-button>
				  <el-switch class="el-button" :class="[Fix?'fix':'']"
					active-color="#13ce66"
					inactive-color="#ff4949">
				  </el-switch>
				  <el-button   >Order 3</el-button>
	
				</el-button-group>
			  </div>
			
			<pre>*這個案列中 , swith 雖然有順利合成 group
			,但是再加上個 button 就出現 bug ,但相同的語句加在最前面
			,是可以正常顯示的 ,目前的結論是:
			1.switch 沒辦法和其他的 control 有效整合.
			2.唯一可行的做法,就只能是 el-input 中,使用 slot 的方式,
			  將 switch 單獨放於前或後,只有要混到,還是會產生錯誤.
			  </pre>
			<el-input >
			  <template slot="prepend">
				<el-button type="primary" icon="el-icon-s-flag"></el-button>
			  </template>
			  <template slot="append">
				<el-button type="primary" icon="el-icon-s-flag"></el-button>
			  </template>
			  <template slot="append">
				<el-switch
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
			  </template>
			  <template slot="append">
				<el-button type="primary" icon="el-icon-s-flag"></el-button>
			  </template>
		  </el-input>
		  <el-input >
			<template slot="prepend">
				  <el-switch
					active-color="#13ce66"
					inactive-color="#ff4949">
				  </el-switch>
			  </template>
			  <template slot="append">
				  <el-switch
					active-color="#13ce66"
					inactive-color="#ff4949">
				  </el-switch>
			  </template>
		  </el-input>
		  </div>
			  `
		   }};
		return _obj;
	 },
	}
	var Group = {
	  
	  '*Bts .btn-group'() {
		var _note = `
		  <pre>
		1.原本希望利用 bts.input-group 來實作 group btn 的效果,
			但發現, el-ui 跟 bts 會產生互斥的問題,後來發現根本是搞錯了,
			應該是要用 btn-group
		2.而原本 input-group 的問題,經測試發現,主要是因為 group 中,
			只能有一個主物件設為 form-control , 第二個 form-control 一定會破壞排版 ,
			所以 button ,得用 input-group-btn 來協助整合 ,
		3. el-input 也可以成功整入,但發現 ,當前 el-ui 的版本 ,沒有 clearabl 的效果
		4. el-input 雖然可以整入,但如果裡面有其他 的form-control 就會相衝
		  </pre>
		   `;
		var _obj = {
		   _vue: {
			  template: `
				 <div>
					${_note}
					<h3>.btn-group</h3>
					<div class="btn-group">
						<el-input placeholder="请输入内容"
								v-model="val_1"></el-input>
					  	<el-button class="btn btn-default" >el-button</el-button>
					  	<input type="button" class="btn  btn-default" value="html_button" />
					  	<button  class="btn  btn-default">button</button> 
					</div>
					<h3>.input-group</h3>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">@</span>
						<el-input placeholder="请输入内容"
								v-model="val_1" clearabl></el-input>
						<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
					  <span class="input-group-btn">
						<el-button class="btn btn-default" >el-button</el-button>
						<input type="button" class="btn  btn-default" value="html_button" />
						<button  class="btn  btn-default">button</button>
					  </span>
					</div>
					<h3>el-input</h3>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">@</span>
						<el-input placeholder="请输入内容"
							v-model="val_1" clearabl></el-input>
						<span class="input-group-addon" id="basic-addon1">@</span>
					</div>
					<h3>el-input 與 form-control</h3>
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">@</span>
						<el-input placeholder="请输入内容"
							v-model="val_1" clearabl></el-input>
						<input type="text" class="form-control" placeholder="form-control" aria-describedby="basic-addon1">
					</div>
				 </div>
				 `,
			  data(){
				 return {
					 val_1:null
				}
			  } 
		   }
		};
		return _obj;
	 
	 
	  },
	  
	}
	
	var Row = {
	  '測試範例'() {
		  var _note = `
			 <pre>
			 </pre>
			 `;
		  var _obj = {
			_css:`
			.el-row {
			  margin-bottom: 20px;
			  &:last-child {
				margin-bottom: 0;
			  }
			}
			.el-col {
			  border-radius: 4px;
			}
			.bg-purple-dark {
			  background: #99a9bf;
			}
			.bg-purple {
			  background: #d3dce6;
			}
			.bg-purple-light {
			  background: #e5e9f2;
			}
			.grid-content {
			  border-radius: 4px;
			  min-height: 36px;
			}
			.row-bg {
			  padding: 10px 0;
			  background-color: #f9fafc;
			}
			`,
			 _vue: {
				template: `
				   <div>
					  ${_note}
					  <el-row :gutter="20">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="12">
						  <el-row :gutter="20">
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						  </el-row>
						</el-col>
					  </el-row>
					  <el-row :gutter="20">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="12">
						  <el-row :gutter="20">
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
							<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						  </el-row>
						</el-col>
					  </el-row>
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
	
	}
	
	let _dataBase = {

		tabs_基本型(op_is = 'pw-input-v2'){
			return {
				tabs:{
					Input:{
						is:op_is,
					},
					Config:{
						is:'el-input'
					},
				}
			}
		},
		tabs_多層式(op_is = 'pw-input-v2'){
			return {
				is:'pw-tabs-n',
				tabs:{
					InputA:{
						is:op_is,
					},
					ConfigA:{
						is:'pw-tabs-n',
						tabs:{
							AAAAA:{
								is:'el-input'
							},
							BBBB:{
								is:op_is,
							},
						}
					},
				}
			} 
		},
		'@DynUI'(){
			/*
			基本上,沒必要考慮  ref 設置的問題,因為直接以 DataObj 做操作即可
			*/
			var arr = [
				'pw-input-v2'
			]
			var 各型基本樣式 = {};
			_.each(arr,(el)=>{
				各型基本樣式[el]={is:el};
			}) 
			return {
				簡式:{}
				,各型基本樣式 
				,'pw_tabs_n':{
					//is:'pw-tabs-n',
					tabs:{
						InputA:{
							is:'pw-input-v2',
						},
						ConfigA:{
							//is:'pw-tabs-n',

							tabs:{
								AAAAA:{
									is:'el-input'
								},
								BBBB:{
									is:'pw-input-v2',
								},
							}
						},
					}

				}
			}
		},
		/*
		
		'@Tabs':{
			is:'pw-tabs'
		}
		
		*/
	}
	let Vue_Prd = {
		'pw-dyn-ui'() {
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
						<h3>pw_tabs_n</h3>
							<pw-dyn-ui v-model="pw_tabs_n" :debug="pw_tabs_n"/>
						<button @click="exe1">test</button>
						<h3>簡易型</h3>
							<pw-dyn-ui v-model="simple" />
						<h3>各型基本樣式</h3>
							{{baseCase}}
							<pw-dyn-ui v-for="(item) in baseCase" 
								v-model="item" />
					</div>
					`,
					data(){
						let {各型基本樣式:baseCase ,簡式:simple ,pw_tabs_n} = _dataBase['@DynUI']()

						return  {
							baseCase,
							simple
							,pw_tabs_n
						}
					},
					 
					methods:{
						exe1(){
							debugger;
						}
					}
				}
			};
			return _obj;
		},
		'pw-tabs-n'() {
			var _note = `
			<pre>
			在component 模式, 必須要多做個 v-bind 的程序,
				這樣才能讓 is 正確的 作用
			</pre>
			`;
		 var _obj = {
			 _css:``,
			 _vue: {
				 template: `
					 <div>
					 ${_note}
					 <h3>base</h3>
					 <button @click="exec1">test</button>
					 <pw-tabs-n v-model="tabs1" 
					 	:debug="tabs1" />
					 <h3>component 模式</h3>
					 <component v-model="tabs2" v-bind="tabs2" 
					 	:debug="tabs2" />
					 </div>
				 `,
				 data(){
					 return {
						 tabs1:_dataBase.tabs_基本型()
						 ,tabs2:_dataBase.tabs_多層式()
					 }
				 },
				 methods:{
					exec1(){
						debugger;
						var x = this.tabs1.__chgTab('Config');
						console.log(x);
					 }
				 }
			 }
		 };
		 return _obj;
		},

		'pw-input-v2'() {
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
						<h3>基本應用</h3>
						<pw-input-v2 v-model="case1"/>
						<h3>component 模式</h3>
						<component v-model="case2.value" is="pw-input-v2" />
						<component v-bind.sync="case2" :debug="case2"/>
						</div>
					`,
					data(){
						return {
							case1:'',
							case2:{
								is:'pw-input-v2',
								value:''
							}
						}
					} 
				   }
			};
			return _obj;
		},
		'x-component'() {
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
						<h3>基本應用</h3>
						<x-component v-bind.sync="case1" :debug="case1"/>
						</div>
					`,
					data(){
						return {
							case1:{
								is:'pw-input',
								value:''
							}
						}
					} 
				}
			};
			return _obj;
		},
		'x-component - pw-tabs'() {
			var _note = `
			<pre>
			以 Josn 的格式設定,動態產生 tab 頁籤
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						
						<h3>pw-tabs 基本</h3>
						{{tabs1}}
						<x-component v-model="tabs1"/>
						<h3>pw-tabs 多階</h3>
						<x-component v-model="tabs2"/>
						</div>
					`,
					data(){
						return {
							tabs1:{
								is:'pw-tabs',
								tabs:{
									Input:{
										is:'pw-input',
									},
									Config:{},
								}
							}
							,tabs2:{
								is:'pw-tabs',
								tabs:{
									InputA:{},
									ConfigA:{
										is:'pw-tabs',
										tabs:{
											AAAAA:{},
											BBBB:{
												is:'pw-input',
												dyn_prop:{
													Exec(){
														alert('test');
													}
												}
											},
										}
									},
								}
							},tabs3:{
								tabs:{
									AAAAA:{},
									BBBB:{},
								}}
						}
					} 
				   }
			};
			return _obj;
		},
		'_pw-tool-grp'() {
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
						<h3>基本應用</h3>
						<button @click="base.Exec">test</button>
						<pw-tool-grp v-bind="base" />
						</div>
					`,
					data(){
						let {Exec} = this;
						return {
							base:{
								Exec
							}
						}
					},
					methods: {
						Exec(){
							alert('Exec');
						}
					},
				}
			};
			return _obj;
		},


		'__pw-tabs-n'() {
			var _note = `
			   <pre>
			   因為 解決不了 v-bind 時 , 對 v-model=value 的繋結問題,
			   所以只能先擱置目前的處理
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<h3>基本型</h3>
						<button @click="T01">T01</button>
						<pw-tabs-n v-bind="base" :debug="base"></pw-tabs-n>
						<pw-tabs-n v-model="base.val" :tabs="base.tabs"  :debug="base"></pw-tabs-n>
						
						</div>
					`,
					//<pw-tabs-n-1 :dyn_prop="base" :debug="base"></pw-tabs-n-1>
					data(){
						return {
							//基礎原型
							base:{
								tabs:{
									Input:{
										is:'pw-input',
									},
									Config:{
										is:'pw-tabs-n',
										value:'',
										tabs:{
											AAAAA:{},
											BBBB:{
												is:'pw-input',
											},
										}
									},
								},
								__chgTab(name){
									this.val = name;
									return this.tabs[name];
								}
							}
						}
					},
					methods:{
						T01(){
							alert(this.base.__chgTab('Input'));
						}
					} 
				}
			};
			return _obj;
		},
		'power_form_el_options'() {
			var _note = `
				   <pre>
				   演示以 power_form_el_options 為基礎,所實作出的 
				   pw-el-checkbox
				   pw-el-radio
				   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						{{cfg}}
						<pw-el-checkbox v-model="cfg"/>
						{{cfg1}}
						<pw-el-radio-pw v-model="cfg1"/>
						</div>
					`,
					data(){
						return {
							cfg:{
								ops:['A','B'],
								//必須設為 array 型別才能正確取得值
								value:[]
							},
							cfg1:{
								ops:['A','B'],
								value:[]
							}
						}
					} 
				   }
			};
			return _obj;
		},
		  'bts-grp-filed'() {
		  var _note = `
			 <pre>bts-grp-filed 的用例
			 1.基本型
			 2.應用型 - 混搭其他 基本物件 
			 3.應用型 - .btn-group 用法,不過,這裡在 RWD 呈現沒,沒有自適應的效果 
			 </pre>
			 `;
		  //let {_vue,_css} = Group['.btn-group']('')
		  var _obj = {
			  _css:``,
			 _vue: {
				template: `
				   <div>
					  ${_note}
					  <div>[input value]{{value}}</div>
					  <h3>el-grp-filed</h3>
					  <el-row>
						<el-grp-filed 
						  label="基本型" 
						  v-model="value"
						  placeholder="test"
						  ></el-grp-filed>
						<el-grp-filed
						  label="應用型" >
							<input type="checkbox" v-model="_check_value"/>
						</el-grp-filed>
					  </el-row>
					  
					  <h3>bts-grp-filed</h3>
					  <bts-grp-filed 
						label="基本型" 
						v-model="value"
						placeholder="test"
						></bts-grp-filed>
					  <bts-grp-filed
						label="應用型" >
						  <input type="checkbox" v-model="_check_value"/>
					  </bts-grp-filed>
					   
				   </div>
				   `,
				//components:{dyn:_vue},
				data(){
				   return {
					value:''
				  }
				},
				computed: {
				  _check_value:{
					get(){
					  if (typeof(this.value)!='boolean') return true;
					  return this.value;
					},
					set(val){
					  this.value=val;
					}
				  }
				}, 
			 }
		  };
		  return _obj;
		   },
		'power-form'() {
			var _note = `
			<pre>
			</pre>
			`;
			var _obj = {
				_css:``,
				_vue: {
					//<power-form-el :form_base="form_base" /> 
					template: `
					<div>
					${_note}
						<power-form-bts-ext :quick="quick"  />
						<power-form-bts-ext :form_base="form_base"  />
					</div>
					`,
					data(){
						return {
							quick:['A','B'],
							form_base:{
								select:['A','B'],
								select_1:{src:['A','B'],select:'A'},
								text_s:'',
								text_i:1,
								text_i1:1.1,
								text_n:null,
								checkbox:true, //{checkbox:['A','B']}
								checkbox_1:{checkbox:['A'],src:['A','B']}, //{checkbox:['A','B']}
								radio:{radio:'A',src:['A','B']},
								date:new Date(),
								textarea:'~',
								textarea_1:{textarea:''},
								己轉換:{ "label": "textarea", "type": "el-input-pw-ext", "val": "~" },
								//直接填入 tpl 取代掉
								tpl:{ "label": "tpl", "type": {template:`<div>test</div>`}, "val": "~" }
	
							},
						}
					}
				}
			};
			return _obj;
		},
		'jdt-table'() {
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
						{{jdt_data}}
						<jdt-table :jdt_set="jdt_set" 
							:jdt_data="jdt_data"
							:act_item="act_item" />
							<el-dialog width="50%"
							:visible.sync="dialog_edit"
							append-to-body>
							
						<div class="form-horizontal gt-form">
								<bts-grp-filed label="表單類型" v-model="dialog_edit_src.表單類型"></bts-grp-filed>
								<bts-grp-filed label="表單代碼" v-model="dialog_edit_src.表單代碼"></bts-grp-filed>
								<bts-grp-filed label="表單名稱" v-model="dialog_edit_src.表單名稱"></bts-grp-filed>
								<bts-grp-filed label="檢驗對象" v-model="dialog_edit_src.檢驗對象"></bts-grp-filed>
								<bts-grp-filed label="表單負責單位" v-model="dialog_edit_src.表單負責單位"></bts-grp-filed>
							</div>
							<div class="clearfix hidden-xs"></div>
							</el-dialog>
					</div>
					`,
					data(){
						return {
							dialog_edit:false,
							dialog_edit_src:{},
							jdt_set: {
								"columns": [
									{
										"title": "表單類型",
										"data": "表單類型",
										"sTitle": "表單類型",
										"mData": "表單類型"
									},
									{
										"title": "表單代碼",
										"data": "表單代碼",
										"sTitle": "表單代碼",
										"mData": "表單代碼"
									},
									{
										"title": "表單名稱",
										"data": "表單名稱",
										"sTitle": "表單名稱",
										"mData": "表單名稱"
									},
									{
										"title": "檢驗對象",
										"data": "檢驗對象",
										"sTitle": "檢驗對象",
										"mData": "檢驗對象"
									},
									{
										"title": "表單負責單位",
										"data": "表單負責單位",
										"sTitle": "表單負責單位",
										"mData": "表單負責單位"
									}
								],
								"ordering": false,
								"responsive": true,
								"searching": false,
								columnDefs: [
									{
										className: 'e_click', "targets": [1]
										, createdCell(td, cellData, rowData, row, col) {
											$(td).html(`<a href='javascript:void(0)'>${cellData}</a>`);
										}
									}
								],
							},
							mock: {
								"data|5": [
									{
										"表單類型|1": ["IPQC"],
										"表單代碼|+1": ["@@id"],
										"表單名稱|+1": ["表單名稱A", "表單名稱A"],
										"檢驗對象|1": ["LOT"],
										"表單負責單位|+1": ["製造", "品管"]
									}
								]
							}
							,jdt_data:Mock.mock({"data|5": [
								{
									"表單類型|1": ["IPQC"],
									"表單代碼|+1": ["@id"],
									"表單名稱|+1": ["表單名稱A", "表單名稱A"],
									"檢驗對象|1": ["LOT"],
									"表單負責單位|+1": ["製造", "品管"]
								}
							]}).data
						}
					},
					computed:{
						mock_data(){
							var x = Mock.mock(this.mock).data;
							console.log(x);
							return x;
						}
					},
					methods:{
						act_item(filed, data) {
							switch (filed) {
								case "表單代碼":
									let { 表單代碼 } = data;
									let _item = _.find(this.jdt_data,(el)=>{return el.表單代碼 == 表單代碼});
									console.log({_item});
									this.dialog_edit = true;
									this.dialog_edit_src = _item;
									break;
							}
						},
					}
				}
			};
			return _obj;
		},
		'_pw-tabs-n-v20200905'() {
			var _note = `
			   <pre>
			   因為 $attrs.sync 無法解決 設定 value 的問題,
			   所以先封存
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<h3>base</h3>
						<pw-tabs-n v-model="tabs1.value" 
							:tabs="tabs1.tabs" :debug="tabs1" />
						<h3>component 模式</h3>
						<component v-bind.sync="tabs2" :debug="tabs2" />
						</div>
					`,
					data(){
						return {
							tabs1:{
								tabs:{
									Input:{
										is:'pw-input-v2',
									},
									Config:{},
								}
							}
							,tabs2:{
								is:'pw-tabs-n',
								tabs:{
									InputA:{
										is:'pw-input-v2',
									},
									ConfigA:{
										is:'pw-tabs-n',
										tabs:{
											AAAAA:{},
											BBBB:{
												is:'pw-input-v2',
												dyn_prop:{
													Exec(){
														alert('test');
													}
												}
											},
										}
									},
								}
							},tabs3:{
								tabs:{
									AAAAA:{},
									BBBB:{},
								}}
						}
					} 
				}
			};
			return _obj;
		},
	}
	let Tool = {
		'pw-form-cfg'() {
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
						<pw-form-cfg></pw-form-cfg>
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
		'pw_form_cfg_col'() {
			var _note = `
			   <pre>
			   pw_form_cfg_col
			   依據 傳入的 data 資料,轉成表格式的顯示
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						{{data}}
						<pw-form-cfg-col v-model="data"></pw-form-cfg-col>
						</div>
					`,
					data(){
						return {
							data:[
								{title:'title',ui_type:'ui_type',ui_type:'el-input'}
							]
						}
					} 
				   }
			};
			return _obj;
		},
		'String Tpl'() {
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
						return {}
					}
				}
			};
			return _obj;
		},
		'power-form-cfg'() {
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
						<pw-form-cfg></pw-form-cfg>
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
		'power-form-cfg 原型'() {
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
						[基本應用]
						<pw-form >
						<div class="form-group col-lg-6 col-sm-12"><label class="col-lg-4 col-sm-4 control-label">text_s</label> <div class="col-lg-8 col-sm-8"><input type="text" class="form-control"></div></div><div class="form-group col-lg-6 col-sm-12"><label class="col-lg-4 col-sm-4 control-label">text_s</label> <div class="col-lg-8 col-sm-8"><input type="text" class="form-control"></div></div>
						</pw-form>
						[quick]
						<pw-form :quick="quick1" >
						</pw-form>
						</div>
					`,
					data(){
						return {
							quick1:['A','B'],
							quick2:{}
						}
					} 
				   }
			};
			return _obj;
		},
		'jdt-table-cfg'() {
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<div>
						<jdt-table-cfg></jdt-table-cfg>
					</div>
					`,
					data(){
						return {}
					}
				}
			};
			return _obj;
		},
		'pw-mock'() {
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
						<pw-mock-cfg></pw-mock-cfg>
					</div>
					`,
					data(){
						return {}
					}
				}
			};
			return _obj;
		},
		'jdt-table-ext'() {
			var _note = `
			<pre>
			</pre>
			`;
			var _obj = {
				_css:``,
				
				/*
									<h3>base auto inin</h3>
						<jdt-table-ext ></jdt-table-ext>
						<h3>jdt_set</h3>
						<jdt-table-ext :jdt_set="baseSet"></jdt-table-ext>
						<h3>jdt_set , mock </h3>
						<jdt-table-ext :jdt_set="baseSet" :mock="mock"></jdt-table-ext>		
						<h3>auto_col</h3>
						<jdt-table-ext :auto_col="auto_col"></jdt-table-ext>
	
				
				*/
						
				_vue: {
					template: `
					<div>
						${_note}
						<h3>mock</h3>
						<jdt-table-ext :mock="mock"></jdt-table-ext>
	
						<h3>jdt_data</h3>
						<jdt-table-ext :jdt_data="mock_data"></jdt-table-ext>
					</div>
					`,
					data(){
						return {
							auto_col:['A','B'],
							baseSet: {
								"columns": [
									{
										"title": "表單類型",
										"data": "表單類型",
										"sTitle": "表單類型",
										"mData": "表單類型"
									},
									{
										"title": "表單代碼",
										"data": "表單代碼",
										"sTitle": "表單代碼",
										"mData": "表單代碼"
									},
									{
										"title": "表單名稱",
										"data": "表單名稱",
										"sTitle": "表單名稱",
										"mData": "表單名稱"
									},
									{
										"title": "檢驗對象",
										"data": "檢驗對象",
										"sTitle": "檢驗對象",
										"mData": "檢驗對象"
									},
									{
										"title": "表單負責單位",
										"data": "表單負責單位",
										"sTitle": "表單負責單位",
										"mData": "表單負責單位"
									}
								],
								"responsive": true,
								"searching": false,
								columnDefs: [
									{
										className: 'e_click', "targets": [1]
										, createdCell(td, cellData, rowData, row, col) {
											$(td).html(`<a href='javascript:void(0)'>${cellData}</a>`);
										}
									}
								],
							},
							mock: {
								"data|5": [
									{
										"表單類型|1": ["IPQC"],
										"表單代碼|+1": ["@@id"],
										"表單名稱|+1": ["表單名稱A", "表單名稱A"],
										"檢驗對象|1": ["LOT"],
										"表單負責單位|+1": ["製造", "品管"]
									}
								]
							}
						}
					} ,
					computed:{
						mock_data(){
							var x = Mock.mock(this.mock).data;
							console.log(x);
							return x;
						}
					}
				}
			};
			return _obj;
		},
	
	 
		'jq-dtable'() {
			var _note = `
			<pre>
			1.auto_col
				1-1.auto_data
				1-2.byMock Set
			</pre>
			`;
			/*
			<pw_mock ref="pw_mock" :input_src.sync="auto_col" :row="row"></pw_mock>
			<el-tab-pane label="View" name="E" >
							<jdt-table ref="jqDT" 
									:jdt_set="jdt_set"
									:jdt_data="jdt_data"
									></jdt-table>
						</el-tab-pane>
						<el-tab-pane label="Code" name="F" >
							<el-input type="textarea" v-model="Code" />
						</el-tab-pane>
			*/
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<el-tabs v-model="tab" type="border-card">
						<el-tab-pane label="Note" name="A">${_note}</el-tab-pane>
						<el-tab-pane label="Input" name="B">
							<pw_input v-model="input_val" >
								<template v-slot:default="slotProps">
									<el-button type="primary" size="small" round  @click="GenConfig(slotProps.JsonType)">GenConfig</el-button>
								</template>
							</pw_input>
						</el-tab-pane>
						<el-tab-pane label="Config" name="C">
							<el-tabs v-model="tabC">
								<el-tab-pane label="Code" name="C0">
									<pw_input  :isJsonType="true"/>
								</el-tab-pane>
								<el-tab-pane label="Columns" name="C1">
									<el-table
										:data="grid_src"
										style="width: 100%">
										<el-table-column
											prop="title"
											label="欄位名稱"
											width="180">
										</el-table-column>
										<el-table-column
											prop="data"
											label="對應欄位"
											/>
										<el-table-column
											label="Mock選項"
											>
											<template slot-scope="scope">
												{{ scope.row.mock_ops }}
											</template>
										</el-table-column>
										<el-table-column
											label="demo"
											width="250">
											<template slot-scope="scope">
												<span class="" @click="scope.row.mock()">{{ scope.row.demo }}</span>
											</template>
										</el-table-column>
									</el-table>
								</el-tab-pane>
								<el-tab-pane label="Exten" name="C2">
									<pw_input  :isJsonType="true"/>
								</el-tab-pane>
							</el-tabs>
						</el-tab-pane>
						<el-tab-pane label="Mock" name="D" >
							<pw_mock tab_type="" />
						</el-tab-pane>
						
					</el-tabs>
						
					`,
					 
					data(){
						return {
							grid_src:[],
							input_val:'A\nB',
							row:{B:2,A:'A',C:new Date(),E:true,F:{}},
							isMock:true,
							tab:'B',
							tabC:'C1',
							tab_F:'F1',
							Ops:'',
							auto_col:[],
							jdt_set:null,
							jdt_data:null,
							Code:'',
							mock:null,
							mock_zip:false
						}
					},
					watch:{
						tab(val){
							switch(val){
								case "D":
									if (this.Ops == null || this.Ops == "") this.fn_Ops();
									break;
								case "E":
									this.fn_Code();
									break;
							}
						},
	
						isMock(val){
							if (val==false) this.mock = null;
						}
					},
					methods:{
						GenConfig(JsonType,isChgTab=true){
							debugger
							if (isChgTab){
								this.tab = "C";
								this.tabB = "C1"	
							} 
							var _val = this.input_val;
							if (!_val) return ;
							if (JsonType.is){
								this.bind_row(JsonType.obj);
							}else{
								this.bind_cols(_val);
							}
						},
						bind_cols(string_val){
							var _self = this;
							var _r = [];
							var _arr = string_val.split('\n');
							_.each(_arr,(name,idx)=>{
								_r.push(_self.genObj(name,name,['@name']));
							})
							_self.grid_src = _r;
						},
						genObj(title,data,mock_ops){
							//{ title: "Name" }
							var _r = {
								title,
								data,
								mock_ops,
								get col_code(){
									let {title,data} = this;
									return {title,data};
								},
								get mock_code(){
									var _code = {};
									_code[`${this.data}|+1`] = this.mock_ops;
									return _code;
								},
								mock(){
									this.demo = Mock.mock(this.mock_code)[this.data];
									return this.demo;
								}
							};
							_r.mock();
							return _r;
						},
						fn_BindMockData(){
							debugger
							var _r = this.$refs.pw_mock.MockCode;
							if (!_r){
								_r = this.$refs.pw_mock.genMockData(true);
							}
							this.jdt_data = JSON.parse(_r);
							this.tab = "C";
						},
						fn_quick(){
							this.jdt_set = null;
							this.auto_col = this.val.split('\n');
							if (this.isMock){
								var _obj = {};
								_.each(this.auto_col,(el)=>{
									_obj[`${el}|+1`] = ['@name','@id','@integer(60, 100)','@@datetime'];
								});
								this.mock = {'data|5': [ _obj]};
								this.MockCode = JSON.stringify(this.mock,null,'\t');
							}
							this.tab = "C";
						},
						fn_simple(arg){
							this.auto_col = null
							this.jdt_set = JSON.parse(arg);
							this.$refs.jqDT.Render(this.jdt_set);
							this.tab = "C";
						},
						fn_Ops(isZip=false){
							debugger
							this.Ops = this.$refs.jqDT.getOps(true,isZip);
						},
						fn_Code(){
							if (this.Ops == null || this.Ops == "") this.fn_Ops();
							var arg = JSON.parse(this.Ops);
							this.Code = this.$refs.jqDT.genCode(arg);
							console.log(this.Code);
						},
						fn_GenView(){
							this.fn_simple(this.Ops);
						}
					}
				}
			};
			return _obj;
		},
	 
		'power-form'() {
			var _note = `
			<pre>
			</pre>
			`;
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<el-tabs v-model="tab" type="border-card">
						<el-tab-pane label="Note" name="A">${_note}</el-tab-pane>
						<el-tab-pane label="Input" name="B">
							<el-button type="primary" size="small" round @click="fn_quick">quick</el-button>
							<el-button type="success" size="small" round @click="fn_simple">simple</el-button>
							<el-input type="textarea" v-model="val">
							</el-input>
						</el-tab-pane>
						<el-tab-pane label="View" name="C">
							<power-form-bts ref="PwForm" :quick="quick" :form_base="form_base" />
						</el-tab-pane>
						<el-tab-pane label="Json" name="D" >
							<el-button type="primary" size="small" round @click="fn_Json()">Json</el-button>
							<el-button type="primary" size="small" round @click="fn_Json(true)">ZipJson</el-button>
							<el-button type="primary" size="small" round @click="fn_GenView()">GenView</el-button>
							<el-input type="textarea" v-model="Json" />
						</el-tab-pane>
						<el-tab-pane label="Code" name="E" >
							<el-input type="textarea" v-model="Code" />
						</el-tab-pane>
					</el-tabs>
						
					`,
					data(){
						return {
							tab:'B',
							val:'A\nB',
							Json:'',
							form_base:null,
							quick:null,
							Code:''
						}
					},
					watch:{
						tab(val){
							switch(val){
								case "D":
									if (this.Json == null || this.Json == "") this.fn_Json();
									break;
								case "E":
									this.fn_Code();
									break;
							}
						}
					},
					methods:{
						fn_quick(){
							this.form_base = null
							this.quick = this.val.split('\n');
							this.tab = "C";
						},
						fn_simple(){
							this.quick = null
							this.form_base = JSON.parse(this.val);
							this.tab = "C";
						},
						fn_Json(isZip=false){
							var s = isZip 
								?JSON.stringify(this.$refs.PwForm.form).replace(/\"/gi,"'")
								:JSON.stringify(this.$refs.PwForm.form,null,'\t')
								;
							this.Json = s;
						},
						fn_Code(){
							this.tab = "E";
							if (this.Json == null || this.Json == "") this.fn_Json();
							var arg = JSON.parse(this.Json);
							this.Code = this.$refs.PwForm.genCode(arg);
							//console.log(this.Code);
						},
						fn_GenView(){
							this.val = this.Json;
							this.fn_simple();
						}
					}
				}
			};
			return _obj;
		},
	}
	var 程式產生器 = {
		'el-table-column'() {
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
						<pw-tabs-n v-model="base"  ></pw-tabs-n>
						</div>
					`,
					data(){
						var _self= this;
						return {
							base:{
								val:'',
								tabs:{
									Input:{
										is:'pw-input',
										dyn_prop:{
											Exec:_self.InputA_Exec
										},
										val:"A,,true\nB,,\nC,,['A']"
									},
									Code:{
										is:'pw-input',
										val:''
									}
								}
							}
						}
					},
					methods: {
						InputA_Exec(JsonCode){
							this.base.val = "Code";
							var _r =  JsonCode.Act(this.filedObj);
							this.base.tabs.Code.val = _r.join('\n');
						},
						filedObj(name,filed,data_val=""){
							var _r = 
	`<el-table-column
		prop="${name}"
		label="${filed??name}"
		></el-table-column>`
							return _r;
						},
					},
				}
			};
			return _obj;
		},
	
	}
	var Table = {
		'*兩欄併一行'() {
			var _note = `
			   <pre>
			   </pre>
			   `;
			var dyn1 = {
				template: `
					<div>
						<h6 v-for="(item) in arr">{{item}}</h6>
					</div>
					`,
				props:{
					value:{
						type:[String,Date],
						default(){
							""
						}
					},
					split:{
						type:String,
						default:" "
					},
					moment:{
						type:Function,
						default:null
					}
				},
				computed:{
					arr(){
						var _tmp = this.value;
						if (_.isDate(_tmp)){
							var _hasMoment = this.moment!=null;
							if(_hasMoment){
								_tmp = moment(_tmp).format('YYYY-MM-DD HH:mm:ss')
							}else{
								_tmp = _tmp.toISOString().substring(0, 10);
							}
						}
						return _tmp.split(this.split);
					}
				}
				
			};
			var _obj = {
				_css:``,
				_vue: {
					components:{dyn1},
					template: `
						<div>
						${_note}
						<el-table
							:data="tableData"
							style="width: 100%"
							highlight-current-row
							>
 								<el-table-column
									label="Name"
									width="180"
									prop="name">
									<template slot-scope="scope">
										<el-tag type="success"  size="mini" >{{scope.row.name}}</el-tag>
										<div>{{scope.row.invdate}}</div>
									</template>
								</el-table-column>
								<el-table-column
									label="Name"
									width="180"
									prop="name">
									<template slot-scope="scope">
										<dyn1 v-model="val_1"></dyn1>
									</template>
								</el-table-column>
								<el-table-column
									label="Date"
									width="180"
									prop="name">
									<template slot-scope="scope">
										<dyn1 v-model="val_2"></dyn1>
									</template>
								</el-table-column>
								<el-table-column
									label="Date_moment"
									width="180"
									prop="name">
									<template slot-scope="scope">
										<dyn1 v-model="val_2" moment="moment"></dyn1>
									</template>
								</el-table-column>
							</el-table>
						</div>
						</div>
					`,
					data(){
						return {
							val_1:'2015-10-10 10:10:10',
							val_2:new Date(),
							tableData:window.gEx.mydata
						}
					} 
				   }
			};
			return _obj;
		},
		'sort'() {
			var _note = `
			   <pre>
			   	1.sortable:
				   後端排序:custom  前端排序與否:T/F ,
				   但實測試時發現 只能直接用 sortable ,加上 T/F 就沒有排序的效果了
				2.前端排序的功能必須注意, el-table-column 一定要設定 prop 值
				3. default-sort 是預設的排序方式
				4.後端排序 需搭配 在 el-table 設置 sort-change 的事件,
					並實作相應的查詢程序才能生效 
				5. sort-change 是監聽 table 的排序事件 ,所以 前端排序的動作也會觸發到該事件,
					前後端排序混用時必須小心.

			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
							<el-table ref="ETable" :data="tableData" empty-text="　"
								highlight-current-row
								:default-sort="{prop: 'name', order: 'descending'}"
								@sort-change="sort_change"
								>
								<el-table-column prop="name" label="Name(前端排序)" width="*" sortable >
									<template slot-scope="scope">
										{{scope.row.name}}
									</template>
								</el-table-column>
								<el-table-column label="Invdate(後端排序)" prop="invdate" width="*" sortable="custom">
									
								</el-table-column>
								 
								amount
							</el-table>
						</div>
					`,
					data(){
						return {
							tableData:window.gEx.mydata,
							sort_orders:[
								'ascending', 
								'descending'
								//不排序
								, null]
						}
					},
					methods:{
						sort_change(column, prop, order ){
							var isServerSiteOrder = column.column.sortable == "custom";
							var _s = JSON.stringify({column, prop, order,isServerSiteOrder},"",4);
							this.$message({
								title: 'HTML 片段',
								dangerouslyUseHTMLString: true,
								message: _s
							  });
						}
					}
				}
			};
			return _obj;
		},
		'行內編輯功能'() {
			var _note = `
			   <pre>
			   因應專案上的需求,實作 行內編輯的功能
			   1.利 row-class-name 的功能,以實現設定指定行的的樣式.
			   2.利用 css 的組合性條件,由行的樣式名稱 切換行內的顯示和編輯模式
			   3.ESC 取消編輯的功能
			   </pre>
			   `;
			var _obj = {
				_css:`
					.sty-edit {
						display:none;
					}
					.edit-row .sty-edit {
						display:inline;
					}

					.edit-row div.sty-view {
						display:none;
					}
				`,
				_vue: {
					template: `
						<div>
						${_note}
						{{currentRow}}<br>
						<el-table
							:data="tableData"
							style="width: 100%"
							highlight-current-row
							:row-class-name="row_sty"
							@current-change="handleCurrentChange"
							>
								<el-table-column
									label="Edit"
									width="180">
									<template slot-scope="scope">
										<button @click="Edit(scope)">edit</button>
									</template>
								</el-table-column>
								<el-table-column
									label="Name"
									width="180"
									prop="name">
									<template slot-scope="scope">
										<el-input class="sty-edit" type=text v-model="scope.row.name" />
										<div class="sty-view">{{scope.row.name}}</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					`,
					data(){
						return {
							//RowIdx:-1,
							currentRow:null,
							tableData:window.gEx.mydata
						}
					},
					watch:{
						currentRow() {
							if (this.currentRow == null) {
								window.removeEventListener("keyup", this.onEscapeKeyUp);
							} else {
								window.addEventListener("keyup", this.onEscapeKeyUp);
							}
						}
					},
					methods:{
						onEscapeKeyUp(event) {
							if (event.which === 27) {
								this.currentRow = null;
							}
						},
						Edit(scope){
							debugger
							//this.RowIdx = scope.$index;
							this.currentRow = scope.row;
						},
						row_sty(item){
							debugger
							let {rowIndex,row} =item;
							var isEditRow = row===this.currentRow;
							return isEditRow ? "edit-row":"";
						},
						handleCurrentChange(val) {
							debugger
							this.currentRow = val;
						}
					}
				}
			};
			return _obj;
		},
		'單選'() {
			var _note = `
			   <pre>
			   [Ref]https://www.twblogs.net/a/5c1f1776bd9eee16b3da5d16
			   1.在 el-table 中,實現 radio 單選功能
			   2.實現點撃行 做 選取/取消 的功能
			   3.實現 radio 和點撃行的連動程序
			   </pre>
			   `;
			var _obj = {
				_css:`
				.el-table__body tr.current-row>td{
					background-color: #ecfff2 !important;
				}
				`,
				_vue: {
					template: `
						<div>
						${_note}
						<br />{{currentRow}}
								<el-table ref="ETable" :data="options" empty-text="　"
									highlight-current-row
									@row-click="row_click"
									>
									<el-table-column label = "" width="60" >
										<template slot-scope="scope">
											<el-radio  v-model="SelIdx" :label="scope.$index" 
												@click.native.prevent="change(scope,event)">
													<i></i>
											</el-radio>
										</template>
									</el-table-column>
									<el-table-column label="Name" width="*">
										<template slot-scope="scope">
											{{scope.row.name}}
										</template>
									</el-table-column>
									<el-table-column label="I18n.ROUTE" width="*">
										<template slot-scope="scope" v-if="scope.row.TO_OPER_CATEGORY == 'R'">
										<H5><span class="label label-primary">{{scope.row.ROUTE_NO}}</span> {{scope.row.ROUTE}}</H5>
										</template>
									</el-table-column>
								</el-table>
							
						</div>
					`,
					data(){
						return {
							SelIdx:null,
							currentRow:null,
							options:window.gEx.mydata
						}
					},
					methods:{
						change(scope,event){
							event.stopPropagation();
							//需要補上 rowIndex , 相關處理轉交給 row_click 處理
							event.currentTarget.rowIndex = scope.$index;
							this.row_click(scope.row,null,event);
						},
						row_click(row, column, event) {
							debugger
							this.SelIdx = event.currentTarget.rowIndex;
							var isSameObj  = this.currentRow === row;
							if (isSameObj){
								this.currentRow 
									= this.SelIdx 
									= null;
							}else{
								this.currentRow = row;
							}
							this.$refs.ETable.setCurrentRow(this.currentRow);
						}
						
					}

				   }
			};
			return _obj;
		},
 
	}
	var 原生元件 = {
		'Pagination'() {
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
						<el-checkbox v-for="(value, name) in object" v-model="object[name]" >{{ name }}</el-checkbox>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-size="100"
							:layout="layouts"
							:total="1000">
						</el-pagination>
						<h3>[slot]</h3>
						<el-pagination  background  
							@size-change="handleSizeChange"   
							@current-change="handleCurrentChange" 
							:current-page="currentPage"  
							:page-size="100" layout="slot,pager" :total="1000">
									<spane class="ensure-btn" >確定</spane>
									<el-button>button</el-button>
						</el-pagination>
						</div>
					`,
					data(){
						return {
							currentPage:1,
							
							object:{
								total:true,
								sizes:true,
								prev:true,
								pager:true, 
								next:true, 
								jumper:true
							}, 
						}
					} ,
					computed:{
						layouts(){
							var arr =   [];
							_.each(this.object ,(el,key)=>{
								if (el) arr.push(key);
							})
							return arr.join(',');
						}
					},
					methods: {
						handleSizeChange(val) {
						  console.log(`每页 ${val} 条`);
						},
						handleCurrentChange(val) {
						  console.log(`当前页: ${val}`);
						}
					  },
				   }
			};
			return _obj;
		},
		'el-checkbox'() {
			var _note = `
			<pre>
			true/false label 應用實例
			</pre>
			`;
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<div>
						${_note}
						<el-checkbox v-model="checked1" label="备选项1" true-label="A" false-label="B" border></el-checkbox>
						<el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
						{{[checked1,checked2]}}
					</div>
					`,
					data(){
						return {
							checked1: "",
							checked2: false,
						}
					}
				}
			};
			return _obj;
		},
		'?infinite-loading'() {
			var _note = `
			   <pre>
			   https://jsfiddle.net/PeachScript/uyjb6z34/
			   未完成 ,因為移植的範例 API ,無法做 CROSS 調用
			   </pre>
			   `;
			const api = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
			var _obj = {
				_css:`
					.el-table .cell {
						white-space: nowrap;
						overflow: hidden;
					}
				`,
				_vue: {
					components: {
						InfiniteLoading,
					  },
					template: `
						<div>
						${_note}
						<el-table
							:data="list"
							height="624"
							border>
							<el-table-column
								prop="title"
								label="Hacker News Title">
							</el-table-column>
							<el-table-column
								prop="author"
								label="Author"
								width="125">
							</el-table-column>

							<infinite-loading
								slot="append"
								@infinite="infiniteHandler"
								force-use-infinite-wrapper=".el-table__body-wrapper">
								</infinite-loading>
						</el-table>
						</div>
					`,
					data() {
						return {
						   page: 1,
							list: [],
					  	};
					},
					mounted() {
						//this.infiniteHandler(this.$state);
					},
					methods: {
					  	infiniteHandler($state) {
							alert('test')
							console.log(api);
							axios.get(api, {
								headers: 
									{'Access-Control-Allow-Origin': '*' 
									,'Access-Control-Allow-Headers': '*'},
								
								params: {
						 		page: this.page,
								},		
					 		}).then(({ data }) => {
								if (data.hits.length) {
									this.page += 1;
									this.list = this.list.concat(data.hits);
									$state.loaded();
								} else {
									$state.complete();
								}
							});
					  	},
					}
				}
			};
			return _obj;
		},
	}
	var Dialog = {
		'拖曳寛高'() {
			var _note = `
			   <pre>
			   https://github.com/guokangf/vue-element-utils
			   https://cloud.tencent.com/developer/article/1712938
			   </pre>
			   `;
			var dialogDragWidth = {
				bind(el) {
					const dragDom = el.querySelector('.el-dialog');
					const lineEl = document.createElement('div');
					lineEl.style =
						'width: 2px; background: inherit; height: 80%; position: absolute; right: 0; top: 0; bottom: 0; margin: auto; z-index: 1; cursor: w-resize;';
					lineEl.addEventListener(
						'mousedown',
						function(e) {
							// 鼠标按下，计算当前元素距离可视区的距离
							const disX = e.clientX - el.offsetLeft;
			
							// 当前宽度
							const curWidth = dragDom.offsetWidth;
			
							document.onmousemove = function(e) {
								e.preventDefault(); // 移动时禁用默认事件
								// 通过事件委托，计算移动的距离
								const l = e.clientX - disX;
								dragDom.style.width = `${curWidth + l}px`;
							};
			
							document.onmouseup = function(e) {
								document.onmousemove = null;
								document.onmouseup = null;
							};
						},
						false
					);
					dragDom.appendChild(lineEl);
				}
			}
			Vue.directive('el-dialog-drag-width', dialogDragWidth);
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<button @click="dialogVisible=true">show</button>
						<el-dialog
							title="提示"
							:visible.sync="dialogVisible"
							width="30%"
							:close-on-click-modal="false"
							v-el-dialog-drag-width
						>
							<span>这是一段信息</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
							</span>
						</el-dialog>
						</div>
					`,
					data(){
						return {
							dialogVisible :true
						}
					} 
				   }
			};
			return _obj;
		},
		'拖曳位置,寛高'() {
			var _note = `
			   <pre>
				[Ref]
				https://blog.csdn.net/sinat_21902709/article/details/86545444	
				https://rnseia.github.io/2019/02/22/element-ui%E5%AE%9E%E7%8E%B0dialog%E5%8F%AF%E6%8B%96%E6%8B%BD%E4%BD%8D%E7%BD%AE%E5%8F%8A%E5%AE%BD%E9%AB%98/
				拖曳可用,但寛高無法正常使用,所以棄置另尋方案
				</pre>
			   `;
			   Vue.directive('dialogDrag', {
				bind(el, binding, vnode, oldVnode) {
				  const dialogHeaderEl = el.querySelector('.el-dialog__header')
				  const dragDom = el.querySelector('.el-dialog')
				  dialogHeaderEl.style.cursor = 'move'
			  
				  // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
				  const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
			  
				  dialogHeaderEl.onmousedown = (e) => {
					// 鼠标按下，计算当前元素距离可视区的距离
					const disX = e.clientX - dialogHeaderEl.offsetLeft
					const disY = e.clientY - dialogHeaderEl.offsetTop
			  
					// 获取到的值带px 正则匹配替换
					let styL, styT
			  
					// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
					if (sty.left.includes('%')) {
					  styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
					  styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
					} else {
					  styL = +sty.left.replace(/\px/g, '')
					  styT = +sty.top.replace(/\px/g, '')
					}
			  
					document.onmousemove = function(e) {
					  // 通过事件委托，计算移动的距离
					  const l = e.clientX - disX
					  const t = e.clientY - disY
			  
					  // 移动当前元素
					  dragDom.style.left = `${l + styL}px`
					  dragDom.style.top = `${t + styT}px`
			  
					  // 将此时的位置传出去
					  // binding.value({x:e.pageX,y:e.pageY})
					}
			  
					document.onmouseup = function(e) {
					  document.onmousemove = null
					  document.onmouseup = null
					}
				  }
				}
			  })
 
			var _obj = {
				_css:`
				
				`,
				_vue: {
					template: `
						<div>
						${_note}
						<button @click="dialogVisible=true">show</button>
						<el-dialog
							:visible.sync="dialogVisible"
							v-dialogDrag
							>
							test
						</div>
					`,
					data(){
						return {
							dialogVisible :true
						}
					} 
				   }
			};
			return _obj;
		},

		"dialog 自適高度"() {
			/*
			當在 el-dialog 的內容超過螢幕範圍時,原生的樣式不支援做內容捲動的呈現,
				而是整個 el-dialog 做整頁的捲動
					*/
			var _obj = {
			  _css: `
						.abow_dialog {
							display: flex;
							justify-content: center;
							align-items: Center;
							overflow: hidden;
						}
						.abow_dialog .el-dialog {
							margin: 0 auto !important;
							height: 90%;
							overflow: hidden;
							width: 85rem !important;
							max-width: 95vw;
						}
						.abow_dialog .el-dialog__body {
							position: absolute;
							left: 0;
							top: 54px;
							bottom: 0;
							right: 0;
							padding: 1em 2.3em;
							z-index: 1;
							overflow: hidden;
							overflow-y: auto;
						}
						`,
			  _vue: {
				template: `
							<div>
								
								<el-dialog title="搜尋" :visible.sync="visible" :class="[switch_model?'abow_dialog':'']">
									<div>
										<input type=checkbox v-model="switch_model" />content scroll
									</div>
									<iframe scrolling="no" src="element-ui-2.13.htm" style="height:120vh;"></iframe>
								</el-dialog>
							</div>`,
				data() {
				  return {
					switch_model: true,
					visible: true
				  };
				}
			  }
			};
			return _obj;
		  },
		'子視窗列印'() {
			var _note = `
			   <pre>
			   [ref]
			   列印範例
			   	https://plungjan.name/SO/testprintiframe.html
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
							<el-dialog
									fullscreen="true"
									title="提示"
									:visible.sync="dialogVisible"
									width="80%"
									height="100%"
									 >
								<iframe id="printf" src="css.htm" frameborder="0" width="100%" height="600px" onload="focus();print();"></iframe>
								<span slot="footer" class="dialog-footer">
									<el-button @click="print">列印</el-button>
									<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
								</span>
							</el-dialog>
						</div>
					`,
					data(){
						return {
							dialogVisible:false
						}
					},
					methods:{
						print(){
							// window.frames["printf"].focus();
							// window.frames["printf"].print();
							var frm = document.getElementById('printf').contentWindow;
							// frm.postMessage ('test', '*');
							// frm.focus();
							// frm.print();
							frm.printPage();
						}
					} 
				   }
			};
			return _obj;
		},
		'el-dialog 樣式'(){
			/*
			情境需求:
			1.自定義 dialog header 樣式
			2.dialog 設定圓角
				2-1. el-dialog__header 需要再補設 border-radius ,
					才不會造成頭部的圓角被蓋掉
		
			*/
			var _css = `
			.el-dialog__header {
				border-radius: 7px 7px 0px 0px;
				background-color: #5d9cec;
				padding: 13px !important;
				color: #fff;
				text-align: left;
			}
		
			.el-dialog {
				border-radius: 7px;
			}
		
			
			`;
			var _vue = {
			template: `
			<div>
			<el-dialog  
					:append-to-body="true"
					:visible.sync="dialog1"
					width="35rem"
					class="ver-modify"
					:show-close="false"
					center>
			<label slot="title">
				版本管理
			</label>
		
				<span slot="footer" class="dialog-footer">
				<el-button @@click="dialog1=false">取消</el-button>
				<el-button type="primary" @@click="dialog1=false">確定</el-button>
				</span>
			</el-dialog></div>`,
			data(){
				return {
				dialog1: true
		
				}
			},
			methods: {
		
			},
			};
			return {_vue,_css};
		},
	}
	var 工作日誌 = {
		'PartA'() {
			var _obj = {
				_css:``,
				_vue: {
					template: `
					<div>
						<div class="row">
							<div class="col-lg-6">
								<ul>
									<drag class="drag list-group-item item" tag="li"
										v-for="(el,idx) in list_src" 
										:idx="idx"
										:transfer-data="el"
										@dragend="Dragend">
											{{idx}}.{{ el.item }}({{ el.time }}
										</drag>
								</ul>
							</div>
							<div class="col-lg-6">
									<table class="table table-striped">
									<thead class="thead-dark">
										<tr>
										<th scope="col">時數</th>
										<th scope="col">工作項</th>
										<th scope="col">時數</th>
										</tr>
									</thead>
									<drop class="drop" @drop="Drop" v-for="(item,idx) in tar_list" 
										:idx="idx" tag="tr">
											<td>{{ item.times }}</td>
											<td>{{ item.nickName }}</td>
											<td>{{ item.list }}</td>
									<drop>  
								</table>
							</div>
						</div>
					</div>
					`,
					data(){
						return {
							tar_list:[]
						}
					},
					props:{
						list_src:{
							type:Array
						},
						list_tar:{
							type:Array
						} 
					} ,
					watch: {
						list_tar(){
							var arr = [];
							var _self = this;
							_.each(this.list_tar,(el)=>{
								let {list} = el ;
								if (list==null){
									_self.$set(el,'list',[]);
								}
								arr.push(el);
							})
							this.tar_list = arr ;
						}
					},
					methods: {
						Dragend(data, event) {
							debugger
							var _vm = event.currentTarget.__vue__;
							var idx = _vm.$attrs.idx;
							this.list_src.splice(idx,1);
							this.$emit('update:list_src',this.list_src);
						},
						Drop(data, event) {
							//debugger
							var _vm = event.currentTarget.__vue__;
							var idx = _vm.$attrs.idx;
							var _item = this.list_tar[idx];
							_item.list.push(data);
							_item.times = _.sumBy(_item.list,'time');
							this.$emit('update:list_tar',this.list_tar);
						},
					}
				}
			};
			return _obj;
		},
		'*def'() {
			var _note = `
			   <pre>
			   
			   </pre>
			   `;
			var _obj = {
				_css:`
				.el-table td, .el-table th {
					padding: 5px 0;
				}
				`,
				_vue: {
					components:{'part-a':工作日誌.PartA()._vue},
					template: `
						<div>
						${_note}
						
							{{Sum}}
						<el-input
							type="textarea"
							:rows="15"
							placeholder="请输入内容"
							v-model="input_txt">
						  </el-input>
						<el-date-picker
						  v-model="value1"
						  type="date"
						  placeholder="选择日期">
						</el-date-picker>
						<part-a :list_src.sync="list_src" :list_tar.sync="tableData"></part-a>
						
						</div>
					`,
					data(){
						return {
							Sum:0,
							input_txt:'A(5B(5',
							value1:null,
							tableData:[],
							list_src:[],
							colConfigs : [
								{ prop: 'nickName', label: '簡稱' },
								{ prop: 'progress', label: '進度' },
								{ prop: 'sts', label: '狀態' }
							  ],
							  dbx:null
						}
					},
					watch:{
						'input_txt'(val){
							this.dbx(val);
						}
					},
					mounted() {
						this.f_工項輸入();
						this.query();
					}, 
					methods:{
						change(){
							console.log(this.input_txt);
						},
						query(){
							var _self = this;
							var _arg =  {headers: 
								{'Access-Control-Allow-Origin': '*' 
								,'Access-Control-Allow-Headers': '*'},
							};
							axios.get('http://192.168.0.104:3000/api/view/DayLog_1_PingAdd')
								.then((res)=>{
									console.log(res);
									let {data} = res
									_self.tableData = data;
								})
						},
						f_工項輸入(){
							var _self = this;
							this.dbx = _.debounce((val)=>{
								var _sum = 0;
								//debugger
								var arr = val.split('\n');
								var _list_src = [];
								_.each(arr,(el)=>{
									let [item,time=""] = el.split('(');
									time = item==""?0:eval(time);
									_sum+=time;
									_list_src.push({
										item,time 
									})
								})
								_self.Sum = _sum;
								_self.list_src = _list_src;
							} , 750
							,{ 'leading': false,
								//'trailing': false
							});
						}
					}
				}
			};
			return _obj;
		},
	}
	 return {Tool ,Views ,Row,Group ,Case,Fail,Vue_Prd,Table,Dialog
		,原生元件,程式產生器,工作日誌};
}
(function () {
	var arr = [
		"jquery","lodash","styled","vue",'Mock','moment',
		'ELEMENT'
		,'UI_AppExt'
		,'axios'
		,"vue-drag-drop"
		,"InfiniteLoading"
	 ];
	 var cfg = {
		paths: {
			'vue-drag-drop':'https://cdn.jsdelivr.net/npm/vue-drag-drop@1.1.4/dist/vue-drag-drop.browser',
			vuedraggable:'https://cdn.jsdelivr.net/npm/vuedraggable@2.24.2/dist/vuedraggable.umd.min',
			'sortablejs':'https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min',
			"InfiniteLoading":'https://unpkg.com/vue-infinite-loading@2.4.5/dist/vue-infinite-loading'
		},
		shim:{
		}
	};
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg,__fn});
	}else{
		window.sample = __fn();
	}
}());

 
