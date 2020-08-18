(function () {
	debugger
	var arr = [
		'lodash',
		'styled',
		'vue',
	];
	var fn = {
		add(x, y){
			return x + y;
		},
		test(){
			console.log(_);
		}
	}
	define(arr, (_,styled,vue)=>{
		return fn;
	});
}());

 
