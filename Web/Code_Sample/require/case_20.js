(function () {
	debugger
	var arr = [
		'lodash',
		'require'
	];
	define(arr, (_)=>{
		var fn = {
			add(x, y){
				return x + y;
			},
			test(){
				console.log(_);
			}
		}
		return fn;
	});
}());



