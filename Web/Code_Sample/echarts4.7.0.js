/*
https://echarts.apache.org/zh/feature.html
*/

var __fn = ($, _, styled, Vue, moment, echarts) => {
  var _fn = {
    BarData(ops = {}) {
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
      return _.merge(_data, ops);
    },
    dyn(ops = {}) {
      var _vue = {
        template: `
				<div ref="echart" style="height:100%;">test</div>
				`,
        data() {
          return {
            chart: null,
          };
        },
        props: {
          value: {
            type: Object,
            default() {},
          },
          size: {
            type: Object,
            default: null,
          },
        },
        watch: {
          value: {
            deep: true,
            immediate: false,
            handler() {
              //debugger
              this.setOptions();
            },
          },
          size() {
            if (this.size == null) return;
            var _self = this;
            _self.$nextTick(() => {
              _self.chart.resize();
            });
          },
        },
        mounted() {
          debugger;
          this.chart = echarts.init(this.$refs.echart);
          this.setOptions();
        },
        methods: {
          setOptions() {
            var _self = this;
            _self.$nextTick(() => {
              console.log(_self.value);
              _self.chart.setOption(_self.value, true);
            });
          },
        },
      };
      return _.merge(_vue, ops);
    },
    dyn2(ops = {}) {
      return _fn.dyn({
        template: `
					<x-tpl-sample-range :i_width.sync="i_width" :i_height.sync="i_height">
						<div ref="echart" style="height:100%;" :resize="resize" >test</div>
					</x-tpl-sample-range>
				`,
        data() {
          return {
            chart: null,
            i_width: 50,
            i_height: 50,
          };
        },
        computed: {
          resize() {
            var i = this.i_width + this.i_height;
            if (this.chart == null) return;
            this.chart.resize();
            return i;
          },
        },
      });
    },
  };
  var Basic = {
    基本原型() {
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
          data() {
            return {
              chart: null,
            };
          },
          mounted() {
            this.initCharts();
          },
          methods: {
            initCharts() {
              debugger;
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
    動態數據和寛高() {
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
        _css: ``,
        _vue: {
          components: { dyn: _fn.dyn() },
          template: `
						<div>
						${_note}
						<button @click="test">test</button>{{i_width}}
						<x-tpl-sample-range :i_width.sync="i_width" :i_height.sync="i_height">
							<dyn v-model="ops" ref="chart" :size="{i_width,i_height}"   /></dyn>
						</x-tpl-sample-range>
						</div>
					`,
          data() {
            return {
              i_width: 10,
              i_height: 10,
              ops: {},
            };
          },
          methods: {
            test() {
              this.ops = _fn.BarData();
            },
          },
        },
      };
      return _obj;
    },
    "拖曳範例.v2"() {
      var _note = `
			   <pre>
			   https://echarts.apache.org/examples/zh/editor.html?c=line-draggable
			   1.己完整實現需求
			   
			   </pre>
			   
			   `;

      var _obj = {
        _css: ``,
        _vue: {
          template: `
						<div>
						${_note}
						{{data}}
						<div id="container" class="area-mk"  style="height: 30em; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" ></div>
						</div>
					`,
          data() {
            var data = [
              [15, 0],
              [-50, 10],
              [-56.5, 20],
              [-46.5, 30],
              [-22.1, 40],
            ];
            var symbolSize = 15;

            return {
              myChart: null,
              data,
              symbolSize,
              option: {
                title: {
                  text: "Try Dragging these Points",
                },
                tooltip: {
                  triggerOn: "none",
                  formatter: function (params) {
                    return (
                      "X: " +
                      params.data[0].toFixed(2) +
                      "<br>Y: " +
                      params.data[1].toFixed(2)
                    );
                  },
                },
                grid: {},
                xAxis: {
                  min: -100,
                  max: 80,
                  type: "value",
                  axisLine: { onZero: false },
                },
                yAxis: {
                  min: -30,
                  max: 60,
                  type: "value",
                  axisLine: { onZero: false },
                },
                dataZoom: [
                  {
                    type: "slider",
                    xAxisIndex: 0,
                    filterMode: "empty",
                  },
                  {
                    type: "slider",
                    yAxisIndex: 0,
                    filterMode: "empty",
                  },
                  {
                    type: "inside",
                    xAxisIndex: 0,
                    filterMode: "empty",
                  },
                  {
                    type: "inside",
                    yAxisIndex: 0,
                    filterMode: "empty",
                  },
                ],
                series: [
                  {
                    id: "a",
                    type: "line",
                    smooth: true,
                    //TODO:symbolSize
                    symbolSize,
                    data: data,
                  },
                ],
              },
            };
          },
          mounted() {
            var _self = this;
            var dom = document.getElementById("container");
            _self.myChart = echarts.init(dom);
            setTimeout(function () {
              debugger;
              // Add shadow circles (which is not visible) to enable drag.
              _self.myChart.setOption({
                graphic: echarts.util.map(_self.data, function (
                  item,
                  dataIndex
                ) {
                  return {
                    type: "circle",
                    position: _self.myChart.convertToPixel("grid", item),
                    shape: {
                      cx: 0,
                      cy: 0,
                      r: _self.symbolSize / 2,
                    },
                    invisible: true,
                    draggable: true,
                    /*
										這一段很重要 ,原本的寫法如下
											ondrag: echarts.util.curry(onPointDragging, dataIndex),
										但問題是在 onPointDragging 會取不到 position ,
											進而產生拖曳失敗的問題
										*/
                    ondrag() {
                      _self.onPointDragging(dataIndex, this.position);
                    },
                    onmousemove: echarts.util.curry(
                      _self.showTooltip,
                      dataIndex
                    ),
                    onmouseout: echarts.util.curry(
                      _self.hideTooltip,
                      dataIndex
                    ),
                    z: 100,
                  };
                }),
              });
            }, 0);
            window.addEventListener("resize", _self.updatePosition);
            _self.myChart.on("dataZoom", _self.updatePosition);
            _self.myChart.setOption(_self.option, true);
          },
          methods: {
            updatePosition() {
              debugger;
              var _self = this;
              this.myChart.setOption({
                graphic: echarts.util.map(_self.data, function (
                  item,
                  dataIndex
                ) {
                  return {
                    position: _self.myChart.convertToPixel("grid", item),
                  };
                }),
              });
            },
            showTooltip(dataIndex) {
              //debugger
              this.myChart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: dataIndex,
              });
            },
            hideTooltip(dataIndex) {
              //debugger
              this.myChart.dispatchAction({
                type: "hideTip",
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
              debugger;
              var _site = this.myChart.convertFromPixel("grid", position);
              //少了這一段 ,就沒有響應式的作用
              this.$set(this.data, dataIndex, _site);
              let { data } = this;
              this.myChart.setOption({
                series: [
                  {
                    id: "a",
                    data,
                  },
                ],
              });
            },
          },
        },
      };
      return _obj;
    },
    "~拖曳範例.v1"() {
      var _note = `
			<pre>
			https://echarts.apache.org/examples/zh/editor.html?c=line-draggable
			這裡是保留範例,其主要問題是無法實現 data 的動態呈現,
				在 v2 版本中,就己經排除了這個問題了.	
			</pre>
			   `;
      var _fn = () => {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var symbolSize = 20;
        var data = [
          [15, 0],
          [-50, 10],
          [-56.5, 20],
          [-46.5, 30],
          [-22.1, 40],
        ];

        option = {
          title: {
            text: "Try Dragging these Points",
          },
          tooltip: {
            triggerOn: "none",
            formatter: function (params) {
              return (
                "X: " +
                params.data[0].toFixed(2) +
                "<br>Y: " +
                params.data[1].toFixed(2)
              );
            },
          },
          grid: {},
          xAxis: {
            min: -100,
            max: 80,
            type: "value",
            axisLine: { onZero: false },
          },
          yAxis: {
            min: -30,
            max: 60,
            type: "value",
            axisLine: { onZero: false },
          },
          dataZoom: [
            {
              type: "slider",
              xAxisIndex: 0,
              filterMode: "empty",
            },
            {
              type: "slider",
              yAxisIndex: 0,
              filterMode: "empty",
            },
            {
              type: "inside",
              xAxisIndex: 0,
              filterMode: "empty",
            },
            {
              type: "inside",
              yAxisIndex: 0,
              filterMode: "empty",
            },
          ],
          series: [
            {
              id: "a",
              type: "line",
              smooth: true,
              symbolSize: symbolSize,
              data: data,
            },
          ],
        };

        setTimeout(function () {
          // Add shadow circles (which is not visible) to enable drag.
          myChart.setOption({
            graphic: echarts.util.map(data, function (item, dataIndex) {
              return {
                type: "circle",
                position: myChart.convertToPixel("grid", item),
                shape: {
                  cx: 0,
                  cy: 0,
                  r: symbolSize / 2,
                },
                invisible: true,
                draggable: true,
                ondrag: echarts.util.curry(onPointDragging, dataIndex),
                onmousemove: echarts.util.curry(showTooltip, dataIndex),
                onmouseout: echarts.util.curry(hideTooltip, dataIndex),
                z: 100,
              };
            }),
          });
        }, 0);

        window.addEventListener("resize", updatePosition);

        myChart.on("dataZoom", updatePosition);

        function updatePosition() {
          myChart.setOption({
            graphic: echarts.util.map(data, function (item, dataIndex) {
              return {
                position: myChart.convertToPixel("grid", item),
              };
            }),
          });
        }

        function showTooltip(dataIndex) {
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: dataIndex,
          });
        }

        function hideTooltip(dataIndex) {
          myChart.dispatchAction({
            type: "hideTip",
          });
        }

        function onPointDragging(dataIndex, dx, dy) {
          data[dataIndex] = myChart.convertFromPixel("grid", this.position);

          // Update data
          myChart.setOption({
            series: [
              {
                id: "a",
                data: data,
              },
            ],
          });
        }
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      };
      var _obj = {
        _css: ``,
        _vue: {
          template: `
						<div>
						${_note}
						<div id="container" class="area-mk"  style="height: 30em; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" ></div>
						</div>
					`,
          data() {
            return {};
          },
          mounted() {
            _fn();
          },
        },
      };
      return _obj;
    },
    圓餅圖() {
      var _note = `
			   <pre>
			   https://echarts.apache.org/examples/zh/view.html?c=doc-example/tutorial-styling-step0&edit=1&reset=1
			   </pre>
			   `;
      var _obj = {
        _css: ``,
        _vue: {
          components: { dyn: _fn.dyn() },
          template: `
						<div>
						${_note}
						<x-tpl-sample-range :i_width.sync="i_width" :i_height.sync="i_height">
							<dyn v-model="ops" ref="chart" :size="{i_width,i_height}" /></dyn>
						</x-tpl-sample-range>
						</div>
					`,
          data() {
            return {
              i_width: 10,
              i_height: 10,
              ops: {
                series: [
                  {
                    name: "访问来源",
                    type: "pie",
                    radius: "55%",
                    roseType: "angle",
                    data: [
                      { value: 235, name: "视频广告" },
                      { value: 274, name: "联盟广告" },
                      { value: 310, name: "邮件营销" },
                      { value: 335, name: "直接访问" },
                      { value: 400, name: "搜索引擎" },
                    ],
                  },
                ],
              },
            };
          },
        },
      };
      return _obj;
    },
    "*儀表盤Gauge"() {
      var _note = `
			   <pre>
			   https://echarts.apache.org/examples/zh/editor.html?c=gauge
			   1.基本的數據變動功能己經能完成,但發現有個缺陷,
			   	就是在動態變更寛高後,指針就無法依數值變動,只有 lable 的值會變更
			   
			   </pre>
			   `;
      var _obj = {
        _css: ``,
        _vue: {
			components: { dyn: _fn.dyn2() },
			template: `
							<div>
							${_note}
							<div>[完成度{{i_val/100}}]<input type="range" min="10" max="10000" v-model.num="i_val" class="slider" ></div>
								<dyn v-model="ops" ref="chart"/></dyn>
							</div>
						`,
			data() {
				return {
				i_val: 5000,
				};
			},
			computed: {
				ops() {
				var i = this.i_val / 100;
				return {
					tooltip: {
					formatter: "{a} <br/>{b} : {c}%",
					},
					toolbox: {
					feature: {
						restore: {},
						saveAsImage: {},
					},
					},
					series: [
					{
						name: "业务指标",
						type: "gauge",
						detail: { formatter: "{value}%" },
						data: [{ value: i, name: "完成率" }],
					},
					],
				};
				//return this.ops_data;
				},
			},
        },
      };
      return _obj;
    },
    "?鼠标拖动指针改变数值"() {
      var _note = `
			   <pre>
			   https://www.shuzhiduo.com/A/n2d9yV0wdD/
			   </pre>
			   `;
      var _obj = {
        _css: ``,
        _vue: {
          	components: { dyn: _fn.dyn2() },
			template: `
				<div>
				${_note}
				{{p1}},  {{p2}},{{dynCmp}},{{i_val}}
				<dyn v-model="ops" ref="chart"/></dyn>
				</div>
			`,
			data() {
				return {
					i_val:40,
					minAngle : 0,
					maxAngle : 180,
					maxValue : 100,
					p1:{x:0,y:0},
					p2:{x:0,y:0}
				};
			},
			mounted(){
				debugger;
				var _self = this;
				this.$nextTick(()=>{
					console.log("mounted");
					var _chart = _self.myChart;
					_chart._zr.on('mousedown', function(event) {
						_self.changeValue(event);
						_chart._zr.on('mousemove', _self.changeValue);
					});
					_chart._zr.on('mouseup', function(event) {
						_chart._zr.off('mousemove', _self.changeValue);
					})
					_self.x();
				})
			},
			computed: {
				p1_(){
					if (this.myChart==null) return {x:0,y:0};
					var _char = this.$refs.chart.$el;

					var w = _char.clientWidth,
					h = _char.clientHeight;
					var _arg =  {
						x:parseInt(w, 0) / 2,
						y:parseInt(h, 0) / 2
					}
					console.log(_arg);
					return _arg;
				},
				ops() {
					var i = this.i_val;// / 100;
					return {
						title: {
							text: "业务指标", //标题文本内容
						},
						toolbox: {
							//可视化的工具箱
							show: true,
						},
						tooltip: {
							//弹窗组件
							formatter: "{a} <br/>{b} : {c}%",
						},
						series: [
						{
							name: "业务指标",
							type: "gauge",
							detail: {
							formatter: "{value}%",
							},
							data: [
							{
								value: i,
								name: "完成率",
							},
							],
						},
						],
					};
				//return this.ops_data;
				},
				myChart(){
					let {chart= null} = this.$refs;
					if (chart==null) return chart;
					return chart.chart;
				},
				dynCmp(){
					currentAngle = Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x) * 180 / Math.PI;
					dataRatio = this.maxValue / this.maxAngle;
					if(currentAngle < this.minAngle || currentAngle > this.maxAngle) {
						let _angle = Math.abs(currentAngle);
						if(_angle > 90) {
							currentAngle = this.maxAngle;
						} else {
							currentAngle = this.minAngle;
						}
					}
					// 转换回数据值, 这里就是实际的值, 默认保留2位小数.
					let value = (currentAngle * dataRatio ).toFixed(2);
					return {
						currentAngle,
						dataRatio,
						value
					}

				}
			},
			methods:{
				x(){
					debugger
					var _char = this.$refs.chart.$el;
					var {
						width,
						height
						} = getComputedStyle(_char);
					var w = _char.clientWidth,
					 h = _char.clientHeight;
					this.p1.x = parseInt(width.slice(0, -2), 0) / 2;
					this.p1.y =parseInt(height.slice(0, -2), 0) / 2;
				},
				changeValue(event) {
					
					//console.log(event);
					this.p2.x = event.offsetX;
					this.p2.y = event.offsetY;
					//return ;
					// 当前点击位置的角度.
					//this.currentAngle;
					// 边界处理
					
					//option.series[0].data[0].value = value;
					this.i_val = this.dynCmp.value;
					this.myChart.setOption(this.ops);
					//this.myChart.setOption(option);
				}

			}
        },
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
