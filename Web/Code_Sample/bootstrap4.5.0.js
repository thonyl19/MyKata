/*
https://bootstrap.hexschool.com/
*/

let Grid = {
   'Order classes'() {
      var _note = `
         <pre>
            使用 .order- class 來控制內容中 可見的內容 順序,
            1.依據 order-? 決定顯示的順序
            2. order-last , order-first 直接改變顯示位置
         </pre>
         `;
      var _obj = {
         _vue: {
            template: `
               <div>
                  ${_note}
                  <div class="container">
                     <div class="row">
                        <div class="col">
                           First, but unordered
                        </div>
                        <div class="col order-12">
                           Second, but last
                        </div>
                        <div class="col order-1">
                           Third, but first
                        </div>
                     </div>
                  </div>
               </div>
               `,
            data(){
               return {
              }
            } 
         }
      };
      return _obj;
   },
   'Margin 通用類別'() {
      var _note = `
         <pre>
         </pre>
         `;
      var _obj = {
         _vue: {
            template: `
               <div  >
                  ${_note}
                  <div class="container mk">
                  <div class="row">
                    <div class="col-md-4">.col-md-4</div>
                    <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
                  </div>
                  <div class="row">
                    <div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
                    <div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
                  </div>
                  <div class="row">
                    <div class="col-auto mr-auto">.col-auto .mr-auto</div>
                    <div class="col-auto">.col-auto</div>
                  </div>
                </div>
               </div>
               `
         }
      };
      return _obj;
   },
};
let 元件 ={
   'Alert'() {
      var _note = `
         <pre>
            這裡是透過 jq plugin 來處理,所以目前試不出來.
         </pre>
         `;
      var _obj = {
         _vue: {
            template: `
               <div>
                  ${_note}
                  <div class="alert alert-primary" role="alert">
                     A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                  </div>
               </div>
               `,
               mounted() {
                  $('.alert').alert()
               },
         }
      };
      return _obj;
   },
}
let utilities = {
   '*Border'() {
      var _note = `
         <pre>
         1.border 讓 el 產生邊框
         2.border-{top|right|top|bottom} 消除 el 邊框
         3.border-{primary...} 加上色彩
         </pre>
         `;
      var _obj = {
         _vue: {
            template: `
               <div>
                  ${_note}
                  <div class="mk block">
                     <span class="border">border</span>
                     <span class="border-top">border-top</span>
                     <span class="border-right">border-right</span>
                     <span class="border-bottom">border-bottom</span>
                     <span class="border-left">border-left</span>
                     <BR/><br/>
                     <span class="border border-0">border-0</span>
                     <span class="border border-top-0">border-top-0</span>
                     <span class="border border-right-0">border-right-0</span>
                     <span class="border border-bottom-0">border-bottom-0</span>
                     <span class="border border-left-0">border-left-0</span>
                     <br/><br/>
                     <span v-for="item in color" class="border" :class="['border-'+item]">{{item}}</span>
                     <br/><br/>
                     <span v-for="item in rounded" class="border"  :class="['rounded'+(item==''?'':'-'+item)]">rounded-{{item==''?'':item}}</span>

                  </div>
 
               </div>
               `,
            data(){
               return {
                  color:["primary",
                  "secondary",
                  "success",
                  "danger",
                  "warning",
                  "info",
                  "light",
                  "dark",
                  "white"],
                  rounded:["",
                     "top",
                     "right",
                     "bottom",
                     "left",
                     "circle",
                     "pill",
                     "0",
                  ]
               }
            }
            
         }
      };
      return _obj;
   },

}
window.sample = { 
   Grid ,元件 , utilities
};
