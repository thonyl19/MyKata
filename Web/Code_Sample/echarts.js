var __fn = ($,_,styled,Vue,chart,elementResizeDetectorMaker,echarts,vCharts)=>{
	debugger
	let Views = {
      std1() {
         var _note = `
            <pre>
            </pre>
            `;
         var _obj = {
            _vue: {
               template: `
                  <div>
                     ${_note}
                     <input type="range" min="10" max="90" v-model.number="width">[width]{{range_w}}%
                     <input type="range" min="10" max="50" v-model.number="height">[height]{{range_h}}vh<br />
                     <div ref="chartWrap" :style="{width:range_w+'%',height:range_h+'vh'}">
                        <ve-line :data="chartData"  ref="chart"></ve-line>
                     </div>
                  </div>
                  `,
               data(){
                  return {
                     width:90,
                     height:50,
                     chartData: {
                        columns: ['日期', '销售额'],
                        rows: [
                          { '日期': '1月1日', '销售额': 123 },
                          { '日期': '1月2日', '销售额': 1223 },
                          { '日期': '1月3日', '销售额': 2123 },
                          { '日期': '1月4日', '销售额': 4123 },
                          { '日期': '1月5日', '销售额': 3123 },
                          { '日期': '1月6日', '销售额': 7123 }
                        ]
                      }
                 }
               } ,
               computed: {
                  range_w(){
                     return this.width;
                  },
                  range_h(){
                     return this.height;
                  }
               },
               mounted() {
                  const contall = this.$refs.chartWrap;
                  const _chart = this.$refs.chart;
                  //引入插件
                  //[Ref]https://www.jianshu.com/p/1d7694609f1b
                  const erd = elementResizeDetectorMaker({
                     strategy: 'scroll'
                  })
                  // 监听父元素尺寸变化，来重置图表属性
                  erd.listenTo(contall, function(element) {
					  debugger
                     console.log(element);
                     // 图表自带的重置函数
                     _chart.echarts.resize()
                  })
               },
            }
         };
         return _obj;
      },
   };
   
	let RWD = {
		//https://jsfiddle.net/vue_echarts/pm7peL40/1/
		//https://v-charts.js.org/#/skill-demo?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98%e7%a4%ba%e4%be%8b
	}
	return{ 
		Views 
	};
}


(function () {
	/*
	目前 ExAdm 載入機制不 work
	*/
	var cfg = {
		paths: {
			'echarts_js':"https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min"
			,'v-charts':"https://cdn.jsdelivr.net/npm/v-charts"
			//,'v-charts':"https://cdn.jsdelivr.net/npm/v-charts/lib/index.min"
		},
		shim:{
			'echarts_js':{deps: ['vue'
				,"chart.js"
				]}
			,'v-charts':{deps:['echarts_js']}
		}
	};
	var arr_1 = ["jquery", "lodash", "styled", "vue"
		,"chart.js"
		,"https://cdn.jsdelivr.net/npm/element-resize-detector@1.2.1/dist/element-resize-detector.js"
		,"https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"
		//,'echarts_js'
		, "https://cdn.jsdelivr.net/npm/v-charts/lib/index.min.js"
	];
	var arr = ["jquery", "lodash", "styled", "vue"
		,"chart.js"
		,"https://cdn.jsdelivr.net/npm/element-resize-detector@1.2.1/dist/element-resize-detector.js"
		,'echarts_js'
		, "v-charts"
	];
	if (typeof define === 'function' && define.amd) {
		define({arr,cfg, __fn});
	}else{
		window.sample = __fn();
	}
})();