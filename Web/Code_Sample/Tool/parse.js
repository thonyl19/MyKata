var __fn = ($,_,Vue,himalaya)=>{
	//https://github.com/andrejewski/himalaya/
	let Himalaya = {
		'*Base'() {
			var _note = ``
			var _obj = {
				_note,
				_vue: {
					template: `
					<el-row>
					<el-col :span="12">
					<el-input type='textarea' 
								v-model="s_input" 
								clearable="true"
								debounce="700"></el-input>
					</el-col>
					<el-col :span="12">
					<el-input type='textarea' 
								v-model="s_parse" 
								clearable="true"
								></el-input>
					</el-col>
					</el-row>
				`,
					data(){
						return {
							s_input:'',
							s_parse:'',
						}
					},
					watch:{
						s_input(){
							this.x();
						}
					},
					methods: {
						x(){
							var _json = himalaya.parse(this.s_input);
							this.s_parse = JSON.stringify(_json,null,4);
						},
					},
				}
			};
			return _obj;
		},
 	};

	return  {
		Himalaya
	};
}

(function () {
	var arr = ["jquery", "lodash", "vue"
		,"https://cdn.jsdelivr.net/npm/himalaya@1.1.0/docs/dist/himalaya.js"
	];
	if (typeof define === 'function' && define.amd) {
		define({arr, __fn});
	}else{
		window.sample = __fn(window.$,window._,window.Vue,window.layer);
	}
})();