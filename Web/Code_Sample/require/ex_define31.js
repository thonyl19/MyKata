/*
3.1 版,結構上較前一版更為簡練
*/
var __fn = (_, req) => {
  debugger;
  return {
    add(x, y) {
      return x + y;
    },
    test() {
      console.log(_);
      alert("執行成功！！");
    },
  };
};
(function () {
  	var cfg = {
		paths: {
			d3: "https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min",
			c3: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
			c3_css: "https://cdn.jsdelivr.net/npm/c3@0.7.15/c3.min",
		},
		shim: {
			c3: { deps: ["d3", "css!c3_css"] },
		},
  	};
 	debugger;
  	require(cfg, ($, ex_define21) => {
    	debugger;
  	});
})();
