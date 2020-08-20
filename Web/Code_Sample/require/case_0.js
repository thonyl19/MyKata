alert('_base_requirejs_case1.js');
require.config({
  	//避免緩存
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		"bts45":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.min",
		"bts45-css":"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min",
	},
	map: {
		"*": {
			css:"https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
		},
	},
	//依賴
    shim: {
        'bts45':{deps: ['css!bts45-css']},
    }
});
require(["bts45"], (bts45)=> {
	debugger
});
