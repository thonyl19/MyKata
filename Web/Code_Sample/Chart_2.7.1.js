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
	//debugger;
	let { Line, Bar, mixins } = VueChartJs;
	const { reactiveProp, reactiveData } = mixins;
	let _data = {
		MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		chartColors : {
			red: 'rgb(255, 99, 132)',
			orange: 'rgb(255, 159, 64)',
			yellow: 'rgb(255, 205, 86)',
			green: 'rgb(75, 192, 192)',
			blue: 'rgb(54, 162, 235)',
			purple: 'rgb(153, 102, 255)',
			grey: 'rgb(201, 203, 207)'
		},
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
		dyn_btn(ops={}){
			var _base = {
				template:`<div>
				<button @click="randomizeData">Randomize Data</button>
				<button @click="addDataset">Add Dataset</button>
				<button @click="removeDataset">Remove Dataset</button>
				<button @click="addData">Add Data</button>
				<button @click="removeData">Remove Data</button>
				</div>`,
				props:{
					value:{
						type:Object,
						default:{}
					},
					max:{
						type:Number,
						default:100
					}
				},
				methods:{
					RndData() {
						return Math.round(Math.random() * this.max);
					},
					ReSet(){
						debugger;
						console.log( this.value);
						var _data = JSON.parse(JSON.stringify(this.value));
						this.$emit('input',_data);
					},
					randomizeData(){
						debugger
						//let {datasets=null} = this.value;
						if (this.value == null){
							this.value = _data.Bar().data;
							//this.value.datasets= [];
							this.value.datasets.splice(0, 1);
						}
						var datasets = this.value.datasets;
						var _self = this;
						if (datasets.length==0) return this.addDataset();
						_.each(datasets,(function(item) {
							var _arr = item.data.map(function() {
								return _self.RndData();
							});
							item.data = _arr;
						}));
						//console.log(datasets);
						this.ReSet();
					},
					addDataset(){
						debugger
						var _self = this;
						var labels = this.value.labels;
						let datasets = this.value.datasets;
						var colorNames = Object.keys(_data.chartColors);
						var colorName = colorNames[datasets.length % colorNames.length];
						var newColor = _data.chartColors[colorName];
						var newDataset = {
							label: `Dataset ${datasets.length}`,
							backgroundColor: newColor,
							borderColor: newColor,
							data: [],
							//fill: false
						};
						//this.$set(newDataset,'data',[]);
						for (var index = 0; index < labels.length; ++index) {
							newDataset.data.push(_self.RndData());
						}
						datasets.push(newDataset);
						this.ReSet();
	
					},
					addData(){
						let datasets = this.value.datasets;
						datasets.forEach((dataset)=> {
							dataset.data.push(this.RndData());
						})
						this.ReSet();
	
					},
					removeDataset(){
						let datasets = this.value.datasets;
						//datasets.pop();
						datasets.splice(0, 1);
						this.ReSet();
					},
					removeData(){
						var labels = this.value.labels;
						let datasets = this.value.datasets;
						labels.splice(-1, 1);
						datasets.forEach(function(dataset) {
							dataset.data.pop();
						});
						this.ReSet();
	
					},
				}
			};
			return _.merge(_base,ops);
		},
		dyn_btn_1(ops={}){
			var _base = {
				template:`<div>
				<button @click="randomizeData">Randomize Data</button>
				<button @click="addDataset">Add Dataset</button>
				<button @click="removeDataset">Remove Dataset</button>
				<button @click="addData">Add Data</button>
				<button @click="removeData">Remove Data</button><br>
				</div>`,
				props:{
					value:{
						type:Object,
						default:{}
					},
					max:{
						type:Number,
						default:100
					},
					renew:{
						type:Function,
						default(){}
					}
				},
				methods:{
					RndData() {
						var _labels = this.value.labels;
						var _self = this;
						_.each(this.value.datasets,(item)=>{
							var _arr = _labels.map(()=>{
								return _.random(0, _self.max);
							})
							item.data = _arr;
						})
					},
					ReSet(){
						console.log(this.value);
						this.$emit('input',this.value);
						this.renew();
					},
					randomizeData(){
						var datasets = this.value.datasets;
						if (datasets.length==0){
							this.addDataset();
							return ;
						}
						this.RndData();
						this.ReSet();
					},
					addDataset(){
						debugger
						var _self = this;
						var labels = this.value.labels;
						let datasets = this.value.datasets;
						var colorNames = Object.keys(_data.chartColors);
						var colorName = colorNames[datasets.length % colorNames.length];
						var newColor = _data.chartColors[colorName];
						var newDataset = {
							label: `Dataset ${datasets.length}`,
							backgroundColor: newColor,
							borderColor: newColor,
							data: [],
							fill: false
						};
						var _arr = labels.map(()=>{
							return _.random(0, _self.max);
						})
						newDataset.data = _arr;
						datasets.push(newDataset);
						this.ReSet();
	
					},
					addData(){
						var month = _data.MONTHS[this.value.labels.length % _data.MONTHS.length];
						this.value.labels.push(month);

						var _self = this;
						let datasets = this.value.datasets;
						datasets.forEach(function(dataset) {
							dataset.data.push(_.random(0, _self.max));
						});
						this.ReSet();
					},
					removeDataset(){
						let datasets = this.value.datasets;
						datasets.pop();
						this.ReSet();
					},
					removeData(){
						var labels = this.value.labels;
						let datasets = this.value.datasets;
						labels.splice(-1, 1);
						datasets.forEach(function(dataset) {
							dataset.data.pop();
						});
						this.ReSet();
	
					},
				}
			};
			return _.merge(_base,ops);
		},
		dyn_options(ops={}){
			var _base = {
				template:`<div>
				<input type=checkbox @click="cgh_AxisY" v-model="isMultAxis" />[isMultAxis]
				</div>`,
 				props:{
					value:{
						type:Object,
						default:{}
					},
 					renew:{
						type:Function,
						default(){}
					}
				},
				computed:{
					isMultAxis(){
						let {yAxes=[]}= this.scales;
						return yAxes.length == 2;
					},
					scales(){
						let {scales={}} = this.value;
						return scales;
					},
 
				},
				methods:{
					ReSet(){
						console.log(this.value);
						this.$emit('input',this.value);
						this.renew();
					},
					cgh_AxisY() {
						let {yAxes=[]}= this.scales;
						if (yAxes.length == 2){
							yAxes.pop();
						}else{
							yAxes.push({
								id:'yAxes_2',
								type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
								display: true,
								position: 'right',
								gridLines: {
									drawOnChartArea: false, // only want the grid lines for one axis to show up
								},
							});
						}
						this.ReSet();

					},
				}
			};
			return _.merge(_base,ops);
		},
		dyn_Char(extends_type = Line,ops={}) {
			var _obj =  {
				mixins: [reactiveProp],
				extends: extends_type,
				mounted() {
					//console.log([this.chartData, this.options]);
					this.renderChart(this.chartData, this.options);
				},
			};
			return _.merge(_obj,ops);
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
            console.log([this.chartData, this.options]);
            // this.chartData 在 mixin 创建.
            // 如果你需要替换 options , 请创建本地的 options 对象
            this.renderChart(this.chartData, this.options);
          },
        },
      };
      return _obj;
    },
    "*reactiveProp"() {
      var _note = `
		<pre>
		[Ref]https://vue-chartjs.org/zh-cn/guide/#%E6%9B%B4%E6%96%B0-charts
		搭配 reactiveProp 將 chart 封裝後,程序內會自动创建名为 chartData 的props参数, 
		并为这个参数添加vue watch. 当数据改变, 如果数据在数据集中改变, 
		它将调用update(); 如果添加了新的数据集, 它将调用renderChart() 
		此外,也一併試作了 backgroundColor 動態變更的測試,
		經實測,只有 利用 canvas 的處理機制,才有可能產生漸層的效果
		</pre>
		`;
		var _dyn = _data.dyn_Char() ;
		
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
						<input type="range" min="10" max="99" v-model.number="color">[color]{{color}}%
						{{datacollection}}
						<line-chart ref="chart" :chartData="datacollection" height="150px" />
						</div>
					`,
			data() {
				return {
				datacollection: null,
				color:10,
				data:[]
				};
			},
			watch:{
				color(){
					this.fillData(1);
				}
			},
			mounted() {
				this.fillData();
			},
			methods: {
				fillData(type=0) {
				debugger;
				var gradientFill = this.$refs.chart.$refs.canvas
					.getContext("2d")
					.createLinearGradient(this.color, 0, 0, 450);
				gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
				gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
					if (type==0 || this.data.length==0){
						this.data = [
							[this.getRandomInt(), this.getRandomInt()]
							,[this.getRandomInt(), this.getRandomInt()]
						]
					}
					
				var _backgroundColor = `#f879${this.color}${this.color}`;
				this.datacollection = {
					labels: [this.getRandomInt(), this.getRandomInt()],
					datasets: [
					{
						label: "Data One",
						backgroundColor: _backgroundColor, // "#f87979",
						data: this.data[0],
					},
					{
						label: "Data One",
						backgroundColor: gradientFill,
						data: this.data[1],
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
				debugger;
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
    動態寛高() {
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
									:chart-data="char_1.data"
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
	'動態資料測試'() {
		var _note = `
			<pre>
			此測試是從 VueChartJs基本用法.reactiveProp 拆出來的,
				主要是為更方便調試,並更仔細記錄試驗的重點
				此外,在套用 dynX 並反覆的測試後,得到以下結論
			[test_case.case0]
				1.正確的運行依序為 
					Randomize Data > Add Dataset > Remove Dataset
					在此順序的基礎上,產生的數據都可以有效的使用 Randomize Data 做動態處理
				2.在前一點的基礎上發現,初始打入的 satasets 的集合,
					將會固定住 chart 動態值可以顯現的數量,
					也就是,如果在 Add Dataset 時 只新增了兩個, 
					那麼在 Remove Dataset 之後,不論怎麼操作,最多只能在兩個集合內做變動
			[test_case.case1]
				1.主要測試方向,是以拿掉 reactiveProp,改自定義 chartdata 和 watch ,
					但測試結果更糟, Randomize Data 之後,就再也無法動態變更資料了,
					連 case0() 的效果也不work了
			</pre>
			`; 
		var test_case={
			case0(){
				//基本型
				return {
					dyn_chart:_data.dyn_Char(),
					dyn_btn:_data.dyn_btn()
				}
			},
			case1(){
				//基本型
				return {
					//mixins 換掉,改用自建 chartdata
					dyn_chart:_data.dyn_Char(Line,{
						mixins: [],
						props: ["options","chartdata"],
						mounted() {
							this.renderChart(this.chartdata, this.options);
						},
						watch: {
							chartdata () {
								debugger
								console.log(this.chartdata);
								this.renderChart(this.chartdata, this.options);
							}
						}
					}),
					dyn_btn:_data.dyn_btn({
						methods:{
							ReSet(){
								this.$emit('input',this.value);
							},
						}
					})
				}
			},
		}
 
		var _obj = {
			_css: ``,
			_vue: {
				components: test_case.case0(),
				template: `
					<div>
					${_note}
					<dyn_btn v-model="datacollection"></dyn_btn>
					{{_view}}
					<dyn_chart ref="chart" :chartData="datacollection" height="150px" />
					</div>
				`,
				data() {
					return {
						datacollection: null,
					};
				},
				computed:{
					_view(){
						try {
							return JSON.parse(JSON.stringify(this.datacollection));
						} catch (error) {
							
						}
						return {};
					}
				}
				
			},
		};
		return _obj;
	},
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
				1._data.dyn_Char 簡易用法,但需要須搭配 components
				2.data 中相關的設定值,都是 for data 的樣式 ,
					例如 backgroundColor ,作用的對像,是 data 項目的 背景色
				3.但很奇怪的是, gradientFill 的用法在 VueChartJs基本用法.reactiveProp
					的案例中,卻可以正常的運作
				</pre>
				`;
      var xBar = _data.dyn_Char(Bar);
      let { data, options } = _data.Bar();
      //data.datasets[0].backgroundColor = "#fff";
      var _obj = {
        _css: ``,
        _vue: {
          components: { xBar },
          template: `
						<div style="background-color:aliceblue">
						${_note}
						<button @click="T01">T01</button><br />
						{{chart_data}}
						<xBar ref="chart" :chart-data="chart_data" :options="options" height="150px"></xBar>
						</div>
					`,
          data() {
            return {
              x_data: null,
              options,
            };
          },
          computed: {
            chart_data() {
              debugger;
              if (this.x_data != null) return this.x_data;
              return data;
            },
          },
          methods: {
            T01() {
              var gradientFill = this.$refs.chart.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);
              gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
              gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
              let { labels, datasets } = data;
              datasets[0].backgroundColor = gradientFill;
              //="#328fde";
              var _tmp = { labels, datasets };
              console.log(_tmp);
              this.x_data = _tmp;
            },
          },
        },
      };
      return _obj;
    },
  };
  var Options = {
	'*HTML-legend_legendCallback'() {
		var _note = `
		<pre>
		[Ref]https://codepen.io/udarakasun/pen/QYLgeM
		</pre>
		`;
		var dyn = _data.dyn_Char();
		var _obj = {
			_css:``,
			_vue: {
				components:{dyn},
				template: `
					<div>
					${_note}
					<dyn :chartData="data" :options="options" height="150px"></dyn>
 
					</div>
				`,
				data(){
					let {data,options} = _data.Bar();
					options = _.merge(options,{
						legend: {
							display: false
						},
						legendCallback(chart) {
							console.log(chart.data.datasets);
							var text = [];
							text.push('<ul class="' + chart.id + '-legend">');
							for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
								text.push('<li><span id="legend-' + i + '-item" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"   onclick="updateDataset(event, ' + '\'' + i + '\'' + ')">');
								if (chart.data.labels[i]) {
									text.push(chart.data.labels[i]);
								}
								text.push('</span></li>');
							}
							text.push('</ul>');
							return text.join("");
						}
					})
					return {
						data,options
					}
				},
			}
		};
		return _obj;
	},
  }
  var ChartJS= {
		'ctx建立方式'() {
			var _note = `
				<pre>
				[Ref]https://www.chartjs.org/samples/latest/charts/line/basic.html
				原生的語法,對動態數據更新完全沒 vue-chart 的問題
				</pre>
				`;
			var _obj = {
				_css:``,
				_vue: {
					components:{
						dyn_btn:_data.dyn_btn_1(),
						dyn_options:_data.dyn_options()
					},
					template: `
						<div>
						${_note}
						<dyn_btn v-model="data" :renew="renew"></dyn_btn>
						<dyn_options v-model="options" :renew="renew"></dyn_options>
						<div style="width:75%;">
							<canvas ref="canvas"></canvas>
						</div>
						</div>
					`,
					data(){
						return {
							options: {
								responsive: true,
								title: {
									display: true,
									text: 'Chart.js Line Chart'
								},
								tooltips: {
									mode: 'index',
									intersect: false,
								},
								hover: {
									mode: 'nearest',
									intersect: true
								},
								scales: {
									xAxes: [{
										display: true,
										scaleLabel: {
											display: true,
											labelString: 'Month'
										}
									}],
									yAxes: [{
										id:'yAxes_1',
										display: true,
										scaleLabel: {
											display: true,
											labelString: 'Value'
										}
									}]
								}
							},
							data: {
								labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
								datasets: [{
									label: 'My First dataset',
									backgroundColor: _data.chartColors.red,
									borderColor: _data.chartColors.red,
									data: [ ],
									fill: false,
									yAxisID: 'yAxes_1',
								}, {
									label: 'My Second dataset',
									fill: false,
									backgroundColor: _data.chartColors.blue,
									borderColor: _data.chartColors.blue,
									data: [ ],
									//yAxisID: 'yAxes_2',
								}]
							},
							_chart:null
						}
					},
					mounted() {
						this.render();
					},
					computed:{
						_view(){
							try {
								return JSON.parse(JSON.stringify(this.data));
							} catch (error) {
								
							}
							return {};
						}
					},
 					methods:{
						renew_ops(){

						},
						renew(){
							debugger;
							this._chart.update();
						},
						update(){
							//this.Rnd_Data();
							this._chart.update();
						},
						render(){
							var ctx = this.$refs.canvas.getContext('2d');
							this.Rnd_Data();
							var config = {
								type: 'line',
								data:this.data,
								options:this.options
							}
							this._chart = new Chart(ctx, config);
						},
						Rnd_Data(){
							var _labels = this.data.labels;
							_.each(this.data.datasets,(item)=>{
								var _arr = _labels.map(()=>{
									return _.random(0, 100);
								})
								item.data = _arr;
							})
						}
					}
				}
			};
			return _obj;
		},
  }
  return {
	VueChartJs基本用法,
	ChartJS,
	Options,
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
    //debugger;
    define({ arr, cfg, __fn });
  } else {
    debugger;
    let { jQuery, _, styled, Vue, Chart, VueChartJs } = window;
    window.sample = __fn(jQuery, _, styled, Vue, Chart, VueChartJs);
  }
})();
