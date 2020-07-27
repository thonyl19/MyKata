seajs.config({

	paths: {
		jquery: "https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min",
		vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue",
		"ELEMENT": "https://unpkg.com/element-ui@2.13.0/lib/index",
		"eui-css": "https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index",
		"lodash": 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min',
		//示範載入
		'_data': "./_tmpData",
		//https://cdn.jsdelivr.net/npm/seajs-css@1.0.5/dist/seajs-css.js
		"bts45":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min",
		"bts45-css":"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min",
	},
  
	// 设置别名，方便调用
	alias: {
	  'class': 'arale/class/1.0.0/class',
	  'jquery': 'jquery/jquery/1.10.1/jquery'
	}
  
  });