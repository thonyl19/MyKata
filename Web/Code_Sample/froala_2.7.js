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
	/*
	vue-froala-wysiwyg  這個 KeyWord 的字段一定要完全符合,
		後續程序才有辦法 run
	*/
	var arr = ["jquery", "lodash", "styled", "vue"
		,"vue-froala-wysiwyg"
	];
	if (typeof define === "function" && define.amd) {
		define(arr, __fn);
	}else{
		let {jQuery,lodash,styled,Vue}= window;
		window.sample = __fn
			(jQuery,lodash,styled,Vue,
			window["vue-froala-wysiwyg"]
			);
	}
})();
