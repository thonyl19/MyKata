/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/

import * as _ from "lodash";
import { extend } from "lodash";
import { abort } from "process";
var list_number = [
  "100.11",
  "100",
  "-100",
  "-100.1",
  "-100.11",
  "$100.11",
  "-$100.11",
  ".11",
  "10%",
  "10.1%",
  "-10%",
  "-10.1%",
];
var fn = {
	ObjA:{
		base:'A',
		get _base(){
			return this.base;
		}
	},
	ObjA1(exten={}){
		var _r = {
			base:'A1',
			get _base(){
				return this.base;
			},
			funA(){}
		}
		return _.merge(_r,exten);
	},
	ObjB:{
		base:'B',
		funB(){},
		get Get1(){
			return `ObjB-${this.base}`;
		},
		get Get2(){
			return 'ObjB-Get2'
		}
			
	},
	ObjB1(exten={}){
		var _r = {
			base:'B1',
			get Get1(){
				return `ObjB1-${this.base}`;
			},
			Get2:'ObjB1-Get2'
		}
		return  _.merge(_r,exten);
		
	},
	'* A01-繼承時,get 取值的問題'(){
		/*
		按理 ,階層式的繼承下來, t._base 的值理應是 B , 但實際上 卻仍是 A ,
			這個 問題在 進一步確認後發現,原來是 merge 的程序中 ,
			在最前面用了 {} , 這會導到於 後面併入的 Getter 存取式 ,
			直接 變成 屬性, 所以才會造成這個問題
			但這裡有個難題 ,就是如果不加上 {} , 就會造成 ObjA 直接被覆寫成 ObjB ,
			產生覆用的問題 ,這個問題 即便使用 let 方式,依然是無解 ,
			只能用 ObjA1 的 方式來解決

		*/
		//var t = _.merge(fn.ObjA,fn.ObjB);
		var t = _.merge({},fn.ObjA,fn.ObjB);
		var z = t._base;
		z
		console.log(t);
		console.log(fn.ObjA);

		let {ObjA,ObjB} = fn;
		var t = _.extend({},ObjA,ObjB);
		var z = t._base;
		z
		console.log(t);
		console.log(fn.ObjA);

 
	},
	'* A02-繼承時,get 取值的問題'(){
		/*
		A01 的問題 , 只能用 ObjA1 的 方式來解決 , 
		但 這理引發了一個 智能開發上的問題 ,
			就是 t1.funA 可能被 ref 到
			但 t1.funB 卻無取得
		*/
		var t1 = fn.ObjA1(fn.ObjB);
		var t2 = fn.ObjA1({});
		console.log({t1,t2});
		t1.funA();
		t1.funB();

		/*
		但很神奇的是 ,利用這樣方式,就可以讓智能提示 正確的 ref 到 funB
		*/
		var t3 = fn.ObjB;
		t3= fn.ObjA1(fn.ObjB);
		t3.funB();


	},
	'* A03-繼承時,Get 的怪像'(){
		/*
		在 ObjB1 繼承 ObjB 的情形下 ,理論上 Get1 的值應該是 ObjB-B 的字樣
			但 出來的結果仍然是 ObjB1 的原來值 ,
			合理的推論是 , 在 merge 時 get/set 的權重大於 屬性,

		*/
		var t = fn.ObjB;
		t = fn.ObjB1(fn.ObjB);
		console.log(t)
		t.funB();
		var z = t.Get1;
		z
	}


};

_.each(fn, (e, k) => {
  if (k.substr(0, 1) == "*") {
    e();
  }
});
