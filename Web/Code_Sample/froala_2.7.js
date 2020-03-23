let Views = {
    std1() {
        const VueFroala = window['vue-froala-wysiwyg'].default;
        Vue.use(VueFroala)
        Vue.config.productionTip = false
        var _obj = {
           _vue:{
              template: `
              <div>
                <froala id="edit" :tag="'textarea'" :config="config" v-model="froalaData"></froala>
              </div>
              `,
              data(){
                  return {
                    froalaData: 'Edit Your Content Here!',
                    config: {
                      events: {
                        initialized: function () {
                          console.log('initialized')
                        }
                      }
                    }
                  }
              }
           }};
        return _obj;
     }  
}
window.sample = {  Views ,def:'std1'}