var __fn = (_,layer)=>{
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
	define(arr, __fn );
}());


