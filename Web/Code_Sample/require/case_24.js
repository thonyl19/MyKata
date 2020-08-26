 
(function () {
	var _req = require.config({
		//避免緩存
		urlArgs: "bust=" + new Date().getTime(),
		paths: {
			moment:"https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min",
		},
		map: {
			"*": {
				css: "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.10/css.min.js",
			},
		},
	})
	/*
	這段程序試出了以下重點
	1. z 為 undf , 不會有值
	2. 'moment' 吃到是 本地的 config 
	3. 'jquery' 則是吃到父層的 config
	*/
	var z = _req(['jquery','moment'],($,moment)=>{
		debugger
		define({$,moment});
	});
	debugger
	// define([
	// 	'require',
	// 	'moment'
	// ], function(require, factory) {
	// 	debugger
	// 	return {test(){}}
	// });
	
}());


