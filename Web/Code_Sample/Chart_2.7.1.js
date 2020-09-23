var __fn = (
  $,
  _,
  styled,
  Vue,
  moment,
  chart,
  VueChartJs,
  elementResizeDetectorMaker
) => {
  debugger;
  let { Line, Bar, mixins } = VueChartJs;
  const { reactiveProp, reactiveData } = mixins;
  let _data = {
    Bar() {
      return {
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Dataset #1",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: [65, 59, 20, 81, 56, 55, 40],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                stacked: true,
                gridLines: {
                  display: true,
                  color: "rgba(255,99,132,0.2)",
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      };
    },
  };
 
  let VueChartJs基本用法 = {
    Bar_case1() {
		var _note = `
			<pre>
			https://github.com/apertureless/vue-chartjs
			最基本的應用
			</pre>
			`;
		var _obj = {
			_vue: {
			extends: Bar,
			mounted() {
				// Overwriting base render method with actual data.
				this.renderChart({
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				datasets: [
					{
					label: "GitHub Commits",
					backgroundColor: "#f87979",
					data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
					},
				],
				});
			},
			},
		};
		return _obj;
    },
	dynChar(extends_type = Line) {
		var _note = `
		   <pre>
		   提供一個 可以快速生成 並套用 components,只需要傳入 extends_type 即可
		   </pre>
		   `;
		var _obj = {
			_css:``,
			_vue:{
				mixins: [reactiveProp],
				extends:extends_type,
				mounted() {
					console.log([this.chartData,this.options])
					this.renderChart(this.chartData, this.options);
				},
			}  
		};
		return _obj;
	},
    "~reactiveData "() {
      var _note = `
		   <pre>
		   ！實作未完成
		   reactiveData 创建一个本地的chartData变量, 不是props参数! 
		   以及创建一个对这个变量的 watcher. 如果你需要单一目的的图表, 
		   以及在图表组件中进行API调用的时候, 这将非常有用
		   [Ref]https://vue-chartjs.org/zh-cn/guide/#%E6%9B%B4%E6%96%B0-charts
		   </pre>
		   `;
      var _obj = {
        _css: ``,
        _dyn: {
          extends: Line,
          mixins: [reactiveData],
          mounted() {
			console.log([this.chartData,this.options])
            // this.chartData 在 mixin 创建.
            // 如果你需要替换 options , 请创建本地的 options 对象
			this.renderChart(this.chartData, this.options);
          },
        },
      };
      return _obj;
    },
    reactiveProp() {
      var _note = `
		<pre>
		[Ref]https://vue-chartjs.org/zh-cn/guide/#%E6%9B%B4%E6%96%B0-charts
		搭配 reactiveProp 將 chart 封裝後,程序內會自动创建名为 chartData 的props参数, 
		并为这个参数添加vue watch. 当数据改变, 如果数据在数据集中改变, 
		它将调用update(); 如果添加了新的数据集, 它将调用renderChart() 
		</pre>
		`;
      var _dyn = {
        extends: Line,
        mixins: [reactiveProp],
        props: ["options"],
        mounted() {
          // this.chartData 在 mixin 创建.
          // 如果你需要替换 options , 请创建本地的 options 对象
          this.renderChart(this.chartData, this.options);
        },
      };
      var _obj = {
        _css: ``,
        _dyn,
        _vue: {
          components: {
            LineChart: _dyn,
          },
          template: `
                    <div>
                    ${_note}
					<button @click="fillData()">Randomize</button>
					{{datacollection}}
                    <line-chart :chart-data="datacollection" height="150px" />
                    </div>
                `,
          data() {
            return {
              datacollection: null,
            };
          },
          mounted() {
            this.fillData();
          },
          methods: {
            fillData() {
              this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                  {
                    label: "Data One",
                    backgroundColor: "#f87979",
                    data: [this.getRandomInt(), this.getRandomInt()],
                  },
                  {
                    label: "Data One",
                    backgroundColor: "#f87979",
                    data: [this.getRandomInt(), this.getRandomInt()],
                  },
                ],
              };
            },
            getRandomInt() {
              return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
          },
        },
      };
      return _obj;
    },
    std1() {
      var _note = `
         <pre>
         https://vue-chartjs.org/zh-cn/guide/#%E6%9B%B4%E6%96%B0-charts
         </pre>
         `;
      var dyn = {
        extends: Line,
        mixins: [reactiveProp],
        props: {
          chartData: {
            type: Object,
          },
          options: {
            type: Object,
            defaut() {
              return {
                responsive: true,
                maintainAspectRatio: true,
              };
            },
          },
        },
        mounted() {
          console.log({ options: this.options });
          // this.chartData 在 mixin 创建.
          // 如果你需要替换 options , 请创建本地的 options 对象
          this.renderChart(this.chartData, this.options);
        },
      };
      var _obj = {
        _css: `
            .flex{
               display:flex;
               flex-direction: column;
               height:30vh;
            }
            .f-g1{
               flex-grow: 1;
               border:1px dotted red;
            }
         `,
        //
        _vue: {
          template: `
               <div>
                  ${_note}
                  <div>
                     <button @click="fillData()">Randomize</button>
                     <input type="range" min="10" max="90" v-model.number="width">[width]{{range_w}}%
                     <input type="range" min="10" max="50" v-model.number="height">[height]{{range_h}}vh<br />
                     [responsive]<input type="checkbox" v-model="ops.responsive" />
                     [maintainAspectRatio]<input type="checkbox" v-model="ops.maintainAspectRatio" />{{ops}}
                     <div class="flex" :style="{width:range_w+'%',height:range_h+'vh'}">
                        
                        <div class="f-g1" ref="wrap">
                           <line-chart  ref="chart" 
                              :chart-data="datacollection" 
                              :options="ops" 
                              style="position: relative;margin: auto;height:10px;" 
                              
                              ></line-chart>
                        </div>
                        <div class="f-g1"><br/></div>
                     </div>
                  </div>
               </div>
               `,
          components: { "line-chart": dyn },
          data() {
            return {
              width: 90,
              height: 50,
              datacollection: null,
              ops: {
                responsive: true,
                maintainAspectRatio: false,
              },
            };
          },
          computed: {
            range_w() {
              return this.width;
            },
            range_h() {
              return this.height;
            },
          },
          mounted() {
            var _self = this;
            this.fillData();

            /*
               原本要試作監聽 resize 事件後,做 update size 
               相關程序 ,但沒有成功,先擱置之
               */
            const contall = this.$refs.wrap;
            const chart = this.$refs.chart;
            chart.$refs.canvas.parentNode.style.height = `${contall.clientHeight}px`;
            // //引入插件
            // //[Ref]https://www.jianshu.com/p/1d7694609f1b
            const erd = elementResizeDetectorMaker({
              strategy: "scroll",
            });
            // // 监听父元素尺寸变化，来重置图表属性
            erd.listenTo(contall, function (element) {
              console.log(element);
              // 图表自带的重置函数
              //_self.$data._chart.update();
              chart.$refs.canvas.parentNode.style.height = `${contall.clientHeight}px`;
            });
          },
          methods: {
            fillData() {
              this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                  {
                    label: "Data One",
                    backgroundColor: "#f87979",
                    data: [this.getRandomInt(), this.getRandomInt()],
                  },
                  {
                    label: "Data One",
                    backgroundColor: "#f87979",
                    data: [this.getRandomInt(), this.getRandomInt()],
                  },
                ],
              };
            },
            getRandomInt() {
              return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
          },
        },
      };
      return _obj;
    },
  };

  let RWD = {
    Chart原生方法() {
      var _note = `
         <pre>
         https://codepen.io/chartjs/pen/YVWZbz
         參考此案例,以原生語法實作RWD
         </pre>
         `;
      var _obj = {
        _css: `
         canvas {
           border: 1px dotted red;
         }
         
         .chart-container {
           position: relative;
           margin: auto;
           height: 80vh;
           width: 70vw;
         }
         
         `,
        _vue: {
          template: `
               <div>
                  ${_note}
                    <div class="chart-container">
                       <canvas id="chart"></canvas>
                    </div>
               </div>
               `,
          mounted() {
            Chart.Bar("chart", _data.Bar());
          },
        },
      };
      return _obj;
    },
    vueChat用法() {
		var _note = `
			<pre>
			</pre>
			`;
      	var _obj = {
			_css: `
			canvas {
			border: 1px dotted red;
			}
			
			.chart-container {
			position: relative;
			margin: auto;
			height: 80vh;
			width: 70vw;
			}
			
			`,
			_vue: {
				extends: Bar,
				mounted() {
					//透過這裡將 樣式綁定,使 RWD work
					this.cssClasses = "chart-container";
					// Overwriting base render method with actual data.
					let { data, options } = _data.Bar();
					this.renderChart(data, options);
				},
			},
      	};
      return _obj;
    },
    "*動態寛高"() {
      var _note = `
         <pre>
		 reactiveProp 搭配 elementResizeDetectorMaker
		 [說明]
		 1.設置一個 wrap_div 以做為決定 圖寛高的父層
		 2.設 兩個 range 以動態調整 wrap_div 的寛高
		 3.resize() 為 綁定 wrap_div 寛高變動的事件,
		 	並藉此
         </pre>
         `;
      let { _dyn } = VueChartJs基本用法.reactiveProp();
      var _obj = {
        _css: `
				.border{
					border:1px dotted blue;
				}
				`,
        _vue: {
          template: `
					<div>
						${_note}
						<div>
							<input type="range" min="10" max="90" v-model.number="width">[width]{{width}}%
							<input type="range" min="10" max="250" v-model.number="height">[height]{{height}}px<br />
							chart_hh:{{chart_hh}}
							<div ref="wrap_div" class="border" :style="{width:width+'%',height:height+'px'}">
								<line-chart class="chart-container"
									:chartData="char_1.data"
									:options="char_1.options"
									:styles="myStyles"
									/>
							</div>
						</div>
					</div>
					`,
          components: { "line-chart": _dyn },
          data() {
            return {
              chart_hh: 0,
              width: 90,
              height: 250,
              char_1: _data.Bar(),
            };
          },
          computed: {
            myStyles() {
              return {
                height: `${this.chart_hh}px`,
                position: "relative",
              };
            },
          },
          mounted() {
            this.resize();
          },
          methods: {
            resize() {
              var _self = this;
              var wrap_div = this.$refs.wrap_div;
              const erd = elementResizeDetectorMaker({
                strategy: "scroll",
              });
              erd.listenTo(wrap_div, function (element) {
                debugger;
                _self.chart_hh = $(element).height();
              });
            },
          },
        },
      };
      return _obj;
    },
    "?Dashboard"() {
      var _note = `
         <pre>
         在這個工作需求中,原本是想要利用 Flex 自動配置高度的機制,
            讓圖表可以自動填滿,並自適應,但實作時發現,寛度可以實現這樣的需求 ,
            但高度怎麼試就是沒辦法.
         最後只能退而求次,用 動態計算高度的方式,來解決這個自動填滿的問題
         </pre>
         `;
      var _obj = {
        _vue: {
          template: `
               <div>
                  ${_note}
   
               </div>
               `,
        },
      };
      return _obj;
    },
  };
  let QA = {
    template整合應用() {
      var _note = `
			<pre>
			Q:測試 template 整合應用
			A:不行.
			[Ref]https://vue-chartjs.org/guide/#vue-single-file-components
			模板標籤無法合併
			</pre>
			`;
      var _obj = {
        _vue: {
          extends: Line,
          props: ["data", "options"],
          mounted() {
            this.renderChart(this.data, this.options);
          },
        },
      };
      return _obj;
    },
  };
  let Style = {
    "?動態變更bar的顏色"() {
      	var _note = `
				<pre>
				[Ref]https://www.itwork.club/2020/03/06/gradient-background-color-in-chart-js/
					https://stackoverflow.com/questions/59294806/how-to-add-gradient-background-to-line-chart-vue-chart-js
					https://github.com/apertureless/vue-chartjs/issues/439#issuecomment-438595442
				有效果,但是會報錯,而且運作的效果怪怪的 ,必須游標帶過才會產生變化.
				此範例演示以下重點.
				1.VueChartJs基本用法.dynChar 簡易用法,但需要須搭配 components
				2.data 中相關的設定值,都是 for data 的樣式 ,
					例如 backgroundColor ,作用的對像,是 data 項目的 背景色
				
				</pre>
				`;
		var xBar = VueChartJs基本用法.dynChar(Bar)._vue;
		let { data, options } = _data.Bar();
		//data.datasets[0].backgroundColor = "#fff";
		var _obj = {
			_css: ``,
			_vue: {
				components:{xBar},
				template: `
						<div style="background-color:aliceblue">
						${_note}
						<button @click="T01">T01</button><br />
						{{chart_data}}
						<xBar ref="chart" :chartData="chart_data" :options="options" height="150px"></xBar>
						</div>
					`,
				data() {
					return {
						x_data:null, 
						options
					};
				},
				computed:{
					chart_data(){
						debugger
						if (this.x_data != null) return this.x_data;
						return data;
					}
				},
				methods:{
					T01(){
						
						var gradientFill = this.$refs.chart.$refs.canvas.getContext('2d')
						 	.createLinearGradient(0, 0, 0, 450);
						gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
						gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
						let {labels,datasets} = data;
						datasets[0].backgroundColor
							//=gradientFill;
							="#328fde";
						var _tmp = {labels,datasets};
						console.log(_tmp);
						this.x_data= _tmp;
					}
				}
			},
		};
      	return _obj;
    },
  };
  return {
    VueChartJs基本用法,
    RWD,
    Style,
    QA,
  };
};

(function () {
  var cfg = {
    paths: {
      chart: [
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart",
        "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart",
      ],
      VueChartJs: [
        "https://cdn.jsdelivr.net/npm/vue-chartjs@3.5.1/dist/vue-chartjs",
        "https://unpkg.com/vue-chartjs/dist/vue-chartjs",
      ],
      ElementResize:
        "https://cdn.jsdelivr.net/npm/element-resize-detector@1.2.1/dist/element-resize-detector.min",
    },
    map: {
      "chart.js": {
        "chart.js":
          "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.js",
      },
    },
    //依賴
    shim: {
      chart: { deps: ["moment"], exports: "chart.js" },
      VueChartJs: {
        deps: ["vue"],
      },
    },
  };
  //$, _, styled, Vue, ChartJs, VueChartJs
  var arr = [
    "jquery",
    "lodash",
    "styled",
    "vue",
    "moment",
    "chart",
    "VueChartJs",
    "ElementResize",
  ];

  if (typeof define === "function" && define.amd) {
    debugger;
    define({ arr, cfg, __fn });
  } else {
    debugger;
    let { jQuery, _, styled, Vue, Chart, VueChartJs } = window;
    window.sample = __fn(jQuery, _, styled, Vue, Chart, VueChartJs);
  }
})();
