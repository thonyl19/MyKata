//Vue.use('vue-tinymce',VueTinymce);
Vue.use(VueTinymce)

let Views = {
  std1_() {
    debugger
      var _obj = {
         _vue:{
            template: `
            <div>
            <editor
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
     />
            </div>
            `,
            components: {
              'editor': Editor // <- Important part
            },
         }};
      return _obj;
   },
   std1() {
      var _note =`<pre>[Ref] https://github.com/panhezeng/vue-tinymce
      當前的配置己經能讓畫面正常的顯示出來了,不過, script 的來源是用
        https://cdn.jsdelivr.net/combine/npm/vue@~2/dist/vue.min.js,npm/tinymce@~5/tinymce.min.js,npm/@panhezeng/vue-tinymce@latest/dist/vue-tinymce.min.js
      
        </pre>`
       var _obj = {
          _vue:{
             template: `
              <div>
              <vue-tinymce  :content.sync="content" :config="config" />
              </div>
             `,
             data() {
              return {
                content: "init content",
                show: true,
                locale: ""
              };
            },
            // 不需要
            //components: {VueTinymce},
            computed: {
              config() {
                let language = {};
                if (this.locale === "en") {
                  language = { language: "en_US" };
                }
                return language;
              }
            },
          }};
       return _obj;
    }

};

window.sample = { 
  Views 
  ,def:'std1' 
};
