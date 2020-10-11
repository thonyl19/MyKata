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
						//this.$refs.echart.resize();
						this.chart.resize();
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
						<canvas ref="echart"></canvas>
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
		'動態數據和寛高'() {
			var _note = `
			   <pre>
			   [Ref]https://blog.csdn.net/weixin_43606158/article/details/96457167?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.add_param_isCf&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromBaidu-1.add_param_isCf
			   1. dyn 程序中,利用 監控 size 的數值變化,觸發 RWD 的效果 , 
					由此確知 , echart 的 RWD 機制,得要有以下兩個要素
					   1.父層的寛高設置
					   2.執行 圖層.resize()

			   </pre>
			   `;
			var _obj = {
				_css:``,
				_vue: {
					components:{dyn:_fn.dyn()},
					template: `
						<div>
						${_note}
						<button @click="test">test</button>{{i_width}}
						<x-tpl-sample-range :i_width.sync="i_width" :i_height.sync="i_height">
							<dyn v-model="ops" ref="chart" :size="{i_width,i_height}"   /></dyn>
						</x-tpl-sample-range>
						</div>
					`,
					data(){
						return {
							i_width:10,
							i_height:10,
							ops:{}
						}
					},
					watch:{
						i_width(){
							//debugger;
							//this.$refs.chart.resize();
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
		'*拖曳範例'() {
			var _note = `
			   <pre>
			   https://echarts.apache.org/examples/zh/editor.html?c=line-draggable
			   1.己初步完成可以拖曳的功能,但 數據的變動並沒有能動態繋結到 畫面 
			   		具體的問題還找不到,
			   
			   </pre>
			   
			   `;

			 
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						{{data}}
						<div id="container" class="area-mk"  style="height: 30em; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" ></div>
						</div>
					`,
					data(){
						var data =  [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];
						var symbolSize = 15;

						return {
							myChart:null,
							data,
							symbolSize,
							option : {
								title: {
									text: 'Try Dragging these Points'
								},
								tooltip: {
									triggerOn: 'none',
									formatter: function (params) {
										return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
									}
								},
								grid: {
								},
								xAxis: {
									min: -100,
									max: 80,
									type: 'value',
									axisLine: {onZero: false}
								},
								yAxis: {
									min: -30,
									max: 60,
									type: 'value',
									axisLine: {onZero: false}
								},
								dataZoom: [
									{
										type: 'slider',
										xAxisIndex: 0,
										filterMode: 'empty'
									},
									{
										type: 'slider',
										yAxisIndex: 0,
										filterMode: 'empty'
									},
									{
										type: 'inside',
										xAxisIndex: 0,
										filterMode: 'empty'
									},
									{
										type: 'inside',
										yAxisIndex: 0,
										filterMode: 'empty'
									}
								],
								series: [
									{
										id: 'a',
										type: 'line',
										smooth: true,
										//TODO:symbolSize
										symbolSize,
										data: data
									}
								]
							}
						}
					},
					mounted() {
						var _self = this;
						var dom = document.getElementById("container");
						_self.myChart = echarts.init(dom);
						setTimeout(function () {
							debugger
							// Add shadow circles (which is not visible) to enable drag.
							_self.myChart.setOption({
								graphic: echarts.util.map(_self.data, function (item, dataIndex) {
									return {
										type: 'circle',
										position:_self.myChart.convertToPixel('grid', item),
										shape: {
											cx: 0,
											cy: 0,
											r: _self.symbolSize / 2
										},
										invisible: true,
										draggable: true,
										/*
										這一段很重要 ,原本的寫法如下
											ondrag: echarts.util.curry(onPointDragging, dataIndex),
										但問題是在 onPointDragging 會取不到 position ,
											進而產生拖曳失敗的問題
										*/
										ondrag(){_self.onPointDragging(dataIndex,this.position);},
										onmousemove: echarts.util.curry(_self.showTooltip, dataIndex),
										onmouseout: echarts.util.curry(_self.hideTooltip, dataIndex),
										z: 100
									};
								})
							});
						}, 0);
						window.addEventListener('resize', _self.updatePosition);
						_self.myChart.on('dataZoom', _self.updatePosition);
						_self.myChart.setOption(_self.option, true);
					}, 
					methods:{
						updatePosition() {
							debugger
							var _self = this;
							this.myChart.setOption({
								graphic: echarts.util.map(_self.data, function (item, dataIndex) {
									return {
										position: _self.myChart.convertToPixel('grid', item)
									};
								})
							});
						},
						showTooltip(dataIndex) {
							//debugger
							this.myChart.dispatchAction({
								type: 'showTip',
								seriesIndex: 0,
								dataIndex: dataIndex
							});
						},
						hideTooltip(dataIndex) {
							//debugger
							this.myChart.dispatchAction({
								type: 'hideTip'
							});
						},
						/*
						原本的寫法如下
							 onPointDragging(dataIndex, dx, dy)
						但 dx,dy 沒有相應的作用, 故而改成傳入 position
						其實,這一段主要是處理拖曳後,將最後移動到的座標值,
							丟給 echart 做圖形重繪的動作
						*/
						onPointDragging(dataIndex, position) {
							debugger
							var _site = this.myChart.convertFromPixel('grid', position);
							//少了這一段 ,就沒有響應式的作用
							this.$set(this.data,dataIndex,_site);
							let {data } = this;
							this.myChart.setOption({
								series: [{
									id: 'a',
									data
								}]
							});
						}
					}
				}
			};
			return _obj;
		},
		'~拖曳範例'() {
			var _note = `
			   <pre>
			   https://echarts.apache.org/examples/zh/editor.html?c=line-draggable
			   </pre>
			   `;
			var _fn = ()=>{
				var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
var symbolSize = 20;
var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

option = {
    title: {
        text: 'Try Dragging these Points'
    },
    tooltip: {
        triggerOn: 'none',
        formatter: function (params) {
            return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
        }
    },
    grid: {
    },
    xAxis: {
        min: -100,
        max: 80,
        type: 'value',
        axisLine: {onZero: false}
    },
    yAxis: {
        min: -30,
        max: 60,
        type: 'value',
        axisLine: {onZero: false}
    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty'
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'empty'
        }
    ],
    series: [
        {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: data
        }
    ]
};


setTimeout(function () {
    // Add shadow circles (which is not visible) to enable drag.
    myChart.setOption({
        graphic: echarts.util.map(data, function (item, dataIndex) {
            return {
                type: 'circle',
                position: myChart.convertToPixel('grid', item),
                shape: {
                    cx: 0,
                    cy: 0,
                    r: symbolSize / 2
                },
                invisible: true,
                draggable: true,
                ondrag: echarts.util.curry(onPointDragging, dataIndex),
                onmousemove: echarts.util.curry(showTooltip, dataIndex),
                onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                z: 100
            };
        })
    });
}, 0);

window.addEventListener('resize', updatePosition);

myChart.on('dataZoom', updatePosition);

function updatePosition() {
    myChart.setOption({
        graphic: echarts.util.map(data, function (item, dataIndex) {
            return {
                position: myChart.convertToPixel('grid', item)
            };
        })
    });
}

function showTooltip(dataIndex) {
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: dataIndex
    });
}

function hideTooltip(dataIndex) {
    myChart.dispatchAction({
        type: 'hideTip'
    });
}

function onPointDragging(dataIndex, dx, dy) {
    data[dataIndex] = myChart.convertFromPixel('grid', this.position);

    // Update data
    myChart.setOption({
        series: [{
            id: 'a',
            data: data
        }]
    });
}
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
			}
			var _obj = {
				_css:``,
				_vue: {
					template: `
						<div>
						${_note}
						<div id="container" class="area-mk"  style="height: 30em; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" ></div>
						</div>
					`,
					data(){
						return {
						}
					},
					mounted() {
						_fn();
					}, 
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
