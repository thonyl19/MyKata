/*
https://github.com/selectize/selectize.js/tree/master/docs
*/

var _def = 
{
   options(){
      return [
         {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
         {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
         {email: 'someone@gmail.com'}
      ]
   },
   ops(){
      var obj = {
         delimiter: ',',
         persist: false,
         valueField: 'email',
         labelField: 'name',
         searchField: ['name', 'email'],
      };
      return obj;
   }
};
let Views = {
  Base() {
      var _obj = {
         _vue:{
            template: `
            <div>
               <select></select>
            </div>
            `,
            mounted() {
               var ops = _def.ops();
               ops.options = _def.options();
               $('select',this.$el).selectize(ops);
            },
         }};
      return _obj;
   }
};
var Vue_Prd = {
   'vue-selectize_0'() {
      debugger;
      var _note =`
          <pre>基本型應用</pre>
          `;
      var x_ops = _def.ops();
      //x_ops.options = _def.options();
      var options = _def.options();
      var _obj = {
          _vue: {
             template: `
                <div>
                   ${_note}
                   <div>[values]{{values}}</div>
                   <vue-selectize v-model="values" :options="options"  :selectize_ops="x_ops"></vue-selectize>
                </div>
                `,
             data(){
               return  {
                  values:'',
                  options,
                  x_ops
               }
             } 
          }
       };
       return _obj;
   },
   'vue-selectize_1'() {
       var _note = `
          <pre>應用型
          1.動態載入,複選測試,auto_drowdown
          2.反自動下拉模式,是為了演示,當載入資料後,
            auto_drowdown 不要產生預定的行為,就可以用 bind_options 的程序,
            另外完成這樣需求.
          </pre>
          `;
          var x_ops = _def.ops();
          x_ops.maxItems = 2;
          var _obj = {
            _vue: {
               template: `
                  <div>
                     ${_note}
                     <div>[values]{{values}}</div>
                     [資料更新後,自動顯示]<input type=checkbox v-model="auto_drowdown" />
                     <button @click="Load">Load Data</button>
                     <button @click="Load1">Load Data(反自動下拉模式)</button>
                     <vue-selectize ref="sel" v-model="values" :options="options" :selectize_ops="x_ops" :auto_drowdown="auto_drowdown"></vue-selectize>
                  </div>
                  `,
               data(){
                 return  {
                    values:'',
                    auto_drowdown:false,
                    options:[],
                    x_ops
                 }
               },
               methods: {
                  Load(){
                     this.options = _def.options();
                  },
                  Load1(){
                     this.$refs.sel.bind_options(_def.options(),!this.auto_drowdown);
                  }
               }, 
            }
         };
         return _obj;
    },
    'BTS_GrpFiled 整合'() {
      var x_ops = _def.ops();
      var options = _def.options();
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
             template: `
                <div>
                   ${_note}
                   <bts-grp-filed 
                    label="應用型" 
                    >
                    <vue-selectize v-model="value" :options="options"  :selectize_ops="x_ops"></vue-selectize>
                    </bts-grp-filed>
                </div>
                `,
             data(){
               return {
                  value:'',
                  options,
                  x_ops
               }
             } 
          }
       };
       return _obj;
    },
    //'vue-selectize-grp_1'
    std1() {
         var x_ops = _def.ops();
         var options = _def.options();

         var _note = `
           <pre>
           </pre>
           `;
         var _obj = {
           _vue: {
              template: `
                 <div>
                    ${_note}
                    [readonly] <input type=checkbox v-model="readonly" />
                    [query_when_filterd_zero] <input type=checkbox v-model="query_when_filterd_zero" />
                    <div>[value]{{value}}</div>
                    <vue-selectize-dynquery v-model="value" 
                     :options="options"  
                     :selectize_ops="x_ops"
                     :readonly="readonly"
                     :query_when_filterd_zero="query_when_filterd_zero"
                     ></vue-selectize-dynquery>
                 </div>
                 `,
                 data(){
                  return {
                     value:'123',
                     options,
                     x_ops,
                     readonly:true,
                     query_when_filterd_zero:true
                  }
                } 
           }
        };
        return _obj;
     },
}

window.sample = { 
  Views ,
  Vue_Prd
  ,def:'std1' 
};
