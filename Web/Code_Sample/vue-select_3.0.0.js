Vue.component('v-select', VueSelect.VueSelect);
let Views = {
  std1() {
      var _obj = {
         _vue:{
            template: `
            <div>
               <v-select :options="options"></v-select>
            </div>
            `,
            data(){
               return  {
                  options: [
                    'foo',
                    'bar',
                    'baz'
                  ]
                }
            }
         }};
      return _obj;
   }
};

window.sample = { 
  Views 
  ,def:'std1' 
};
