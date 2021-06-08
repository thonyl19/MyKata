import * as _ from 'lodash';
var x = {
    '*轉換相對路徑'(){
    
		var target = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\";

		var src = "D:\\A\\Code\\github\\MyKata\\MyKata_Web\\Web\\tpl_ejsyaml\\mvc_gti\\_InjectTest\\_part.ejs.log";
		var targetArr = target.split('\\');
		var srcArr = src.split('\\');
		var relate = "./";
		targetArr.forEach(el=>{
			let [idx0] = srcArr;
			if (el == idx0){
				srcArr.shift();
			}else if (idx0 == null){}
			else{
				relate += "../";
			}
		})
		var z = `${relate}${srcArr.join('/')}`;
		z
        return "123"
	},
	'取得即有的資料置換成的'(){
		var s =`
		var _cfg = 
		//#_Cfg
		{
			"Html_Code":"vue-selectize.ejs"
		}
		//@#
		var _cfg = {
			"Html_Code":"$.resolvePath('./vue-selectize.ejs')}",
		};
		`
		var [match] = s.match(/\/\/#_(\s\S|[^##])+\/\/@#/g);
		match = match.replace(/(^\/\/#_Cfg|\/\/@#$)/g,"");
		match
		var z  = JSON.parse(match.toString());
		z
	},
	'*'(){
		var _cfg = {
			"Html_Code":"vue-selectize.ejs"
		}
		_.each(_cfg,(v,k)=>{
			_cfg[k]=v;
		}) 
	}

}


_.each([x],fn=>{
	_.each(fn,(e,k)=>{
		if (k.substr(0,1)=="*"){
			e();
		}
	})
})
