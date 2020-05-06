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
};

window.sample = { 
  Views 
};
