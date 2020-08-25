var _req = require;
var __fn = (_,layer)=>{
	_req;
	debugger
	return{
		test(){
			console.log(layer);
			alert('執行成功！！')
		}
	}
}
(function () {
	debugger
	var arr = [
		'lodash',
		"https://cdnjs.cloudflare.com/ajax/libs/layer/2.3/layer.js",
	];

	/*
	會獲得一個 localRequire ,但不知道它要怎應用
	*/
	var z = require(arr,__fn);
	return {z}
	//define(arr, __fn );
}());


