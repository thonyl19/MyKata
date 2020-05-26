/*
https://v3.bootcss.com/getting-started/
https://github.com/ElemeFE/element/tree/dev/packages
*/

let Views = {
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
  std() {
	var _vue = {
	  template: `
				<div>
				</div>`
	};
	return {_vue};
  },
};

let Case = {
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
		  <el-button @@click="dialog1=false">取 消</el-button>
		  <el-button type="primary" @@click="dialog1=false">确 定</el-button>
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
  
  'Bts .btn-group'() {
	var _note = `
	  <pre>
	  1.原本希望利用 bts.input-group 來實作 group btn 的效果,
		但發現, el-ui 跟 bts 會產生互斥的問題,後來發現根本是搞錯了,
		應該是要用 btn-group
	  2.而原本 input-group 的問題,經測試發現,主要是因為 group 中,
		只能有一個主物件設為 form-control , 第二個 form-control 一定會破壞排版 ,
		所以 button ,得用 input-group-btn 來協助整合 ,
		但 input  就無法整入了
	  </pre>
	   `;
	var _obj = {
	   _vue: {
		  template: `
			 <div>
				${_note}
				<h3>.btn-group</h3>
				<div class="btn-group">
				  <el-button class="btn btn-default" >el-button</el-button>
				  <input type="button" class="btn  btn-default" value="html_button" />
				  <button  class="btn  btn-default">button</button> 
				</div>
				<h3>.input-group</h3>
				<div class="input-group">
				  <span class="input-group-addon" id="basic-addon1">@</span>
				  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
				  <span class="input-group-btn">
					<el-button class="btn btn-default" >el-button</el-button>
					<input type="button" class="btn  btn-default" value="html_button" />
					<button  class="btn  btn-default">button</button>
				  </span>
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
  
}

var Row = {
  'def'() {
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

let Vue_Prd = {
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
					<power-form-bts :form_base="form_base"  />
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
}
let Tool = {
	'*jq-dtable'() {
		var _note = `
		<pre>
		1.auto_col
			1-1.auto_data
			1-2.byMock Set
		</pre>
		`;
		var _obj = {
			_css:``,
			_vue: {
				template: `
				<el-tabs v-model="tab" type="border-card">
					<el-tab-pane label="Note" name="A">${_note}</el-tab-pane>
					<el-tab-pane label="Input" name="B">
						<input type=checkbox v-model="isMock"/>Mock
						<el-button type="primary" size="small" round @click="fn_quick">quick</el-button>
						<el-button type="success" size="small" round @click="fn_simple">simple</el-button>
						<el-input type="textarea" v-model="val">
						</el-input>
					</el-tab-pane>
					<el-tab-pane label="View" name="C">
						<demo-jdt-table ref="jqDT" 
							:auto_col="auto_col" 
							:jdt_set="jdt_set"
							:jdt_data="jdt_data"
							:mock="mock"></demo-jdt-table>
					</el-tab-pane>
					<el-tab-pane label="Ops" name="D" >
						<el-button type="primary" size="small" round @click="fn_Ops()">Ops</el-button>
						<el-button type="primary" size="small" round @click="fn_Ops(true)">OpsZip</el-button>
						<el-button type="primary" size="small" round @click="fn_GenView()">TryView</el-button>
						<el-input type="textarea" v-model="Ops" />
					</el-tab-pane>
					<el-tab-pane label="Code" name="E" >
						<el-input type="textarea" v-model="Code" />
					</el-tab-pane>
					<el-tab-pane label="Mock" name="F" >
						<el-button type="primary" size="small" round @click="fn_Mock">Exec</el-button>
						<el-input type="textarea" v-model="MockCode" />
					</el-tab-pane>
				</el-tabs>
					
				`,
				data(){
					return {
						isMock:true,
						tab:'B',
						val:'A\nB',
						Ops:'',
						auto_col:null,
						jdt_set:null,
						jdt_data:null,
						Code:'',
						mock:null,
						MockCode:''
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
					fn_Mock(){
						this.mock = JSON.parse(this.MockCode);
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
					fn_simple(arg=this.val){
						this.auto_col = null
						this.jdt_set = JSON.parse(arg);
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
window.sample = {Tool ,Views ,Row,Group ,Case,Fail,Vue_Prd, };
