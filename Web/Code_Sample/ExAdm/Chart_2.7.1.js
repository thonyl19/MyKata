var __fn = ($, _, styled, Vue,ChartJs
	,VueChartJs
	) => {
	debugger
	let { Line, Bar, mixins } = VueChartJs;
	// const { reactiveProp } = mixins;
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
  let Views = {
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
    Line_case1() {
      var _note = `
          <pre>
          lineTension: 0 //轉折改用直角
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

    "std1"() {
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
    原生語法() {
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
           width: 80vw;
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
           width: 80vw;
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
    "flex"() {
      var _note = `
         <pre>
         </pre>
         `;
      var dyn = {
        extends: Line,
        mixins: [reactiveProp],
        props: ["chartData", "options"],
        mounted() {
          this.renderChart(this.chartData, this.options);
        },
      };
      var _obj = {
        _css: `
               .flex{
                  display:flex;
                  flex-direction: column;
               }
               .f-g1{
                  flex-grow: 1;
                  border:1px dotted red;
               }
                
                
                .chart-container {
                  position: relative;
                  margin: auto;
                }
            `,
        /*
            <div class="chart-container">
                                 <canvas id="chart"></canvas>
                              </div>
            */
        _vue: {
          template: `
                  <div>
                     ${_note}
                     <div>
                        <input type="range" min="10" max="90" v-model.number="width">[width]{{range_w}}%
                        <input type="range" min="10" max="50" v-model.number="height">[height]{{range_h}}vh<br />
                        <div ref="wrap_div" class="flex" :style="{width:range_w+'%',height:range_h+'vh'}">
                           <div class="f-g1" >
                              <line-chart class="chart-container"
                                 :chartData="char_1.data"
                                 :options="char_1.options"
                                 :styles="myStyles"
                                 />
                           </div>
                           <div class="f-g1"><br/></div>
                           <div class="f-g1"  ><br/></div>
                        </div>
                     </div>
                  </div>
                  `,
          components: { "line-chart": dyn },
          data() {
            return {
              hh: 10,
              width: 90,
              height: 50,
              char_1: _data.Bar(),
            };
          },
          computed: {
            range_w() {
              return this.width;
            },
            range_h() {
              return this.height;
            },
            myStyles() {
              return {
                height: `${this.hh}px`,
                position: "relative",
              };
            },
          },
          mounted() {
            this.t02();

            /*
                  $('.f-g1').each((idx,el)=>{
                     erd.listenTo(el, function(element) {
                        // console.log($(element));
                        _self.hh = $(element).height();
                        $('canvas',element).each((idx,_el)=>{
                           debugger
                           _el.parentNode.style.height = `${_self.hh}px`;
                        })
                        // 图表自带的重置函数
                        //_self.$data._chart.update();
                        //chart.$refs.canvas.parentNode.style.height = `${contall.clientHeight}px`;
                     })
                  })
                  */
          },
          methods: {
            t01() {
              debugger;
              var wrap_div = this.$refs.wrap_div;
              const erd = elementResizeDetectorMaker({
                strategy: "scroll",
              });
              erd.listenTo(wrap_div, function (element) {
                console.log(element);
                // 图表自带的重置函数
                //_self.$data._chart.update();
                //chart.$refs.canvas.parentNode.style.height = `${contall.clientHeight}px`;
              });
            },
            t02() {
              var _self = this;
              var wrap_div = this.$refs.wrap_div;
              const erd = elementResizeDetectorMaker({
                strategy: "scroll",
              });
              erd.listenTo(wrap_div, function (element) {
                _self.hh = $(".f-g1:eq(0)", element).height();
                // .each((idx,el)=>{
                //    $(el).height
                // })
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

	return {
		Views,
		RWD,
		QA,
	};
};
(function () {
	var arr = ["jquery", "lodash", "styled", "vue"
		,'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js'  
		//,'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js'
		,'https://cdn.jsdelivr.net/npm/vue-chartjs@3.5.1/dist/vue-chartjs.min.js'
		
	];
	var arr1 = ["jquery", "lodash", "styled", "vue"
		,'chart'
		//,'Chart_2.7.1'
		//,'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js'  
		//,'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js'
		//,'https://cdn.jsdelivr.net/npm/vue-chartjs@3.5.1/dist/vue-chartjs.min.js'
		,'ChartJs'
		,'VueChartJs'
	];
  	define(arr, __fn);
})();
