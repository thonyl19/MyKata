(function () {
	debugger
	var arr = [
		'lodash',
		'require'
	];
	var fn = {
		add(x, y){
			return x + y;
		},
		test(){
			console.log(_);
		}
	}
	define(arr, (_)=>{
		return fn;
	});
}());



