


var arr = [
	'lodash',
	'require'
];

define(arr,function (_,require) {
	debugger
	var cfg = {
		paths: {
			d3:"https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
			c3:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
			c3_css:"https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min"
		},
		shim: {
			c3: { deps: ['d3', 'css!c3_css'] },
		}
	}
	require(cfg,(d3,c3) => {
		debugger
		fn.test();
	});
	 
	 
	return fn;
});
