/*
第三版,結構上較前一版更為簡練
*/

debugger
var __fn = (_,req)=>{
	debugger
	return{
		add(x, y){
			return x + y;
		},
		test(){
			console.log(_);
			alert('執行成功！！')
		}
	}
}
(function () {
	debugger
	var arr = [
		'lodash',
		'require'
	];
	define(arr, __fn );
}());



