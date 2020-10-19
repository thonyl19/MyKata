var __fn = ($, _, styled, Vue, VueFroala) => {
	let _setup ={
		_VueFroala:false,
		VueFroala(){
			if (!_setup._VueFroala){
				Vue.use(VueFroala.default);
				Vue.config.productionTip = false;
				_setup._VueFroala = true;
			}
		}
	}
  	let Views = {
		std1() {
			debugger
			_setup.VueFroala();
			var _obj = {
			_vue: {
			template: `
				<div>
					<froala id="edit" :tag="'textarea'" :config="config" v-model="froalaData"></froala>
				</div>
				`,
			data() {
				return {
				froalaData: "Edit Your Content Here!",
				config: {
					events: {
					initialized: function () {
						console.log("initialized");
					},
					},
				},
				};
			},
			},
		};
		return _obj;
		},
  };
  return { Views };
};
(function () {
	var cfg = {
		paths: {
			'vue-froala-wysiwyg':"https://cdn.jsdelivr.net/npm/vue-froala-wysiwyg@3.0.6/dist/vue-froala.min"
		},
		shim:{
			'vue-froala-wysiwyg':{deps: ['vue'
				,"css!https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css"
				]}
		}
	};
	var arr = ["jquery", "lodash", "styled", "vue"
		,"vue-froala-wysiwyg"
	];
	define({arr,cfg, __fn});
})();
