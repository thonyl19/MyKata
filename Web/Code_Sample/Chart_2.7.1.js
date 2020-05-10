let { Line,Bar ,mixins } = VueChartJs;
const { reactiveProp } = mixins;
let Views = {
   Bar_case1() {
       var _note = `
          <pre>
          https://github.com/apertureless/vue-chartjs
          </pre>
          `;
       var _obj = {
          _vue: {
            extends: Bar,
            mounted () {
               // Overwriting base render method with actual data.
               this.renderChart({
                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                 datasets: [
                   {
                     label: 'GitHub Commits',
                     backgroundColor: '#f87979',
                     data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                   }
                 ]
               })
             } 
          }
       };
       return _obj;
    },
   Line_case1() {
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
            extends: Line,
            props: ['data', 'options'],
            mounted () {
              this.renderChart(this.data, this.options)
            }
          }
       };
       return _obj;
    },
   '_std1'() {
      var _note = `
         <pre>
         https://vue-chartjs.org/zh-cn/guide/#%E6%9B%B4%E6%96%B0-charts
         </pre>
         `;
      var dyn = {
         extends: Line,
         mixins: [reactiveProp],
         props: ['options'],
         mounted () {
           // this.chartData 在 mixin 创建.
           // 如果你需要替换 options , 请创建本地的 options 对象
           this.renderChart(this.chartData, this.options)
         }
      };
      var _obj = {
         _vue: {
            template: `
               <div>
                  ${_note}
                  <div class="small">
                     <line-chart :chart-data="datacollection"></line-chart>
                     <button @click="fillData()">Randomize</button>
                  </div>
               </div>
               `,
            components:{'line-chart':dyn},
            data(){
               return {
                  datacollection: null
              }
            } ,
            mounted () {
               this.fillData()
             },
             methods: {
               fillData () {
                  debugger
                 this.datacollection = {
                   labels: [this.getRandomInt(), this.getRandomInt()],
                   datasets: [
                     {
                       label: 'Data One',
                       backgroundColor: '#f87979',
                       data: [this.getRandomInt(), this.getRandomInt()]
                     }, {
                       label: 'Data One',
                       backgroundColor: '#f87979',
                       data: [this.getRandomInt(), this.getRandomInt()]
                     }
                   ]
                 }
               },
               getRandomInt () {
                 return Math.floor(Math.random() * (50 - 5 + 1)) + 5
               }
             }
         }
      };
      return _obj;
   },
};

window.sample = { 
  Views 
};
