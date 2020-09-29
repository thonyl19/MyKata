/*
https://echarts.apache.org/zh/feature.html
*/

var __fn = ($, _, styled, Vue, moment, echarts) => {
	var _fn = {
		BarData(ops={}){
			var _data = {
				title: {
				text: "ECharts 入门示例",
				},
				tooltip: {},
				xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
				},
				yAxis: {},
				series: [
					{
						name: "销量",
						type: "bar",
						data: [5, 20, 36, 10, 10, 20],
					},
				],
			};
			return _.merge(_data,ops);
		},
		dyn(ops={}){
			var _vue =  {
				template: `
				<div ref="echart" style="height:100%;">test</div>
				`,
				data(){
					return{
						chart:null,
					}
				},
				props:{
					value:{
						type:Object,
						default(){}
					},
					size:{
						type:Object,
						default:null
					}
				},
				watch:{
					value:{
						deep:true,
						immediate:false,
						handler(){
							//debugger
							//console.log(this.value);
							this.setOptions();
						}
					},
					size(){
						if(this.size == null) return;
						this.$refs.echart.resize();
					}

				},
				mounted(){
					//debugger
					this.chart = echarts.init(this.$refs.echart);
				},
				methods: {
					setOptions() {
						this.chart.setOption(this.value);
					},
				},
			}
			return _.merge(_vue,ops);
		}
	};
	var Basic = {
		"基本原型"() {
			var _note = `
				<pre>
				[Ref]https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/chart.html#demo
				實作需注意以下事項
				1.ECharts 的初始化,必須先設置對應的 tag ,才能初始化
				2. tag 本身需要設置 height  , 畫面才有辦法正常的 render
				</pre>
				`;
			var _obj = {
				_css: ``,
				_vue: {
					template: `
						<div>
						${_note}
						<x-tpl-sample-range>
							<canvas ref="echart"></canvas>
						</x-tpl-sample-range>
						</div>
					`,
					data(){
						return{
							chart:null,
						}
					},
					mounted() {
						this.initCharts();
					},
					methods: {
						initCharts() {
							debugger
							this.chart = echarts.init(this.$refs.echart);
							this.setOptions();
						},
						setOptions() {
							this.chart.setOption({
								title: {
								text: "ECharts 入门示例",
								},
								tooltip: {},
								xAxis: {
								data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
								},
								yAxis: {},
								series: [
									{
										name: "销量",
										type: "bar",
										data: [5, 20, 36, 10, 10, 20],
									},
								],
							});
						},
					},
				},
			};
			return _obj;
		},
		'*動態數據'() {
			var _note = `
			   <pre>
			   [Ref]https://blog.csdn.net/weixin_43606158/article/details/96457167?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.add_param_isCf&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.add_param_isCf
			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					components:{dyn:_fn.dyn()},
					template: `
						<div>
						${_note}
						<button @click="test">test</button>
						<x-tpl-sample-range>
							<dyn v-model="ops" :size /></dyn>
						</x-tpl-sample-range>
						</div>
					`,
					data(){
						return {
							ops:{}
						}
					},
					methods:{
						test(){
							this.ops = _fn.BarData();
						}
					} 
				}
			};
			return _obj;
		},
	};
	return { Basic };
};
(function () {
  var cfg = {
    paths: {
      echarts: ["https://cdn.jsdelivr.net/npm/echarts@4.7.0/dist/echarts.min"],
      ElementResize:
        "https://cdn.jsdelivr.net/npm/element-resize-detector@1.2.1/dist/element-resize-detector.min",
    },

    //依賴
    shim: {
      echarts: { deps: ["moment"], exports: "echarts.js" },
    },
  };
  var arr = [
    "jquery",
    "lodash",
    "styled",
    "vue",
    "moment",
    "echarts",
    "ElementResize",
  ];
  if (typeof define === "function" && define.amd) {
    //debugger;
    define({ arr, cfg, __fn });
  } else {
    debugger;
    let { jQuery, _, styled, Vue, Chart, VueChartJs } = window;
    window.sample = __fn(jQuery, _, styled, Vue, Chart, VueChartJs);
  }
})();
