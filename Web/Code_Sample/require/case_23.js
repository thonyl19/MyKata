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
	define(require => {
		debugger
		const fn1 = require("https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock-min.js");
		const fn2 = require("https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js");
	
		let count = 0;
		const test = () => {
			count = 0;
			console.log("Count is reset.");
		};
	
		return {
			fn1,
			fn2,
			test
		};
	});
	 
}());


