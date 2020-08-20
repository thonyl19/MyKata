var arr = [
	'bts45',
	/*
		第一次試驗這一段並沒有成功 ,主要是因為 下面的路徑不正確
		'https://www.jsdelivr.com/package/npm/mock-js'
		再取另一個來測試時發現,是可以這樣做  動態 載入的,
			但與寫在 require.config 中不同的地方在於,
			這裡就必須要加 .js 的副檔名,
			才能正確work ,連 css 也可使用.
	*/
	'https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
	'css!https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css'
];

define(arr
	,function (bts45,moment) {
		debugger
		var fn = {
			add(x, y){
				return x + y;
			},
			test(){
				alert(moment);
				console.log(moment);
			}
		}
		return fn;
});
