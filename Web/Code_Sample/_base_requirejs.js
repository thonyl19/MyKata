debugger

require.config({
	  	paths: {
				jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		  	},
		});
		
		alert('test');
require(["jquery"], function ($) {
	debugger
	let Views = {
		std1() {
		var _note = `
				<pre>
				</pre>
				`;
		var _obj = {
			_vue: {
			template: `
					<div>
						${_note}
					</div>
					`,
			data() {
				return {};
			},
			},
		};
		return _obj;
		},
	};

	window.sample = {
		Views,
	};
});
