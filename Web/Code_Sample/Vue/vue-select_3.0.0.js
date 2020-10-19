/*
https://vue-select.org/
*/

Vue.component('v-select', VueSelect.VueSelect);
let Views = {
  Base() {
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
   },
   std1() {
       var _note = `
          <pre>
          </pre>
          `;
       var _obj = {
          _vue: {
             template: `
                <div >
                   ${_note}
                  
                  <div class="x-vue-selectize-grp input-group">
                     <div class="input-group-addon"  >
                        <i class="fa fa-search" aria-hidden="true" ></i>
                     </div>
                     <div  >
                        <v-select :options="options"></v-select>
                     </div>
                     <span class="input-group-btn"   readonly>
                        <span class="btn"  ></span>
                     </span>
                  </div >
                </div>
                `,
             data(){
                return {
                  options: [
                     'foo',
                     'bar',
                     'baz'
                   ]
               }
             } 
          }
       };
       return _obj;
    },
};

window.sample = { 
  Views 
  ,def:'std1' 
};
