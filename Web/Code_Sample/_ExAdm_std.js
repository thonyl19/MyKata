var __fn = (
	$, _ , styled, Vue
)=> 
{
	var 基本應用 ={
 	}
 	return { 基本應用};
}
(function () {
	var arr = [
		"jquery","lodash","styled","vue"
	 ];
	if (typeof define === 'function' && define.amd) {
		define({arr, __fn});
	}else{
		window.sample = __fn();
	}
}());
 
