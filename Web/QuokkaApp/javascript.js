/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/

import * as _ from "lodash";
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
	"_"(){
		
	},
	物件複製() {
		var A = { a: 1, b: 2 };
		var B = { A, c: 3 };
		var C = Object.assign({}, B);
		return JSON.stringify(C, null, 2);
	},
	addEventListener() {
		/*
			Ref:https://jsfiddle.net/Linusborg/39ues2rx/
			未完成
			<input type="text">
			<button id="A">Test</button>
			const btn = document.getElementById('A')
			btn.addEventListener('mouseenter', evt => {alert('test')})
			*/
	},
	"模擬 MVVM 雙向綁定機制"() {
		/*
			https://jsfiddle.net/gary75952/edkrwx4q/28/?utm_source=website&utm_medium=embed&utm_campaign=edkrwx4q
			*/
		var model = {};
		let value = undefined;

		Object.defineProperty(model, "value", {
		get() {
			return value;
		},
		set(newVal) {
			value = newVal;
			document.getElementById("input").value = newVal;
			document.getElementById("display").innerHTML = newVal;
		},
		});

		document
		.getElementById("input")
		.addEventListener("keyup", function (event) {
			model.value = event.target.value;
			console.log("綁定的資料異動:", model.value);
		});
	},
	resizable() {
		//https://jsfiddle.net/Linusborg/xzjfw8gm/
	},
  	"call , apply , bind , Arrow Function"() {
    //https://medium.com/@realdennis/javascript-%E8%81%8A%E8%81%8Acall-apply-bind%E7%9A%84%E5%B7%AE%E7%95%B0%E8%88%87%E7%9B%B8%E4%BC%BC%E4%B9%8B%E8%99%95-2f82a4b4dd66
		class TestClass {
		constructor(name) {
			this.name = name;
		}
		Base() {
			return this.name;
		}

		Case1() {
			return (function () {
			//因為取不到值會跳err,所以特別包 try/catch
			try {
				return this.name;
			} catch (error) {
				return error;
			}
			})();
		}
		Case2() {
			return (() => {
				return this.name;
			})();
		}
		Case3() {
			return (function(){
				return this.name;
			}).bind(this)();
		}
		Case4() {
			return (function(){
				return this.name;
			}).call(this);
		}
		Case5() {
			return (function(){
				return this.name;
			}).apply(this);
		}
		}
		let boo = new TestClass("fongki");
		var _Test1 = {
		正常應該回應的this: boo.Base(),
		"一般 使用函數的用法": boo.Case1(),
		"ArrowFunction 的用法": boo.Case2(),
		"bind 的用法": boo.Case3(),
		"call 的用法": boo.Case4(),
		"apply 的用法": boo.Case5(),
		};
		//_Test1
		/*
		_Test2 是試驗性的寫法,目的是測試如何簡化試例
		*/
		var _Test2 = {
			thisValue: "This Value",
			get 正常應該回應的this() {
				return this.thisValue;
			},
			"一般 使用函數的用法1"(){
				/*
					與 _Test1 案例不同處在於 ,json 物件在本身內, 
						是沒辦法使用 {A,B:this.A} 的方式取值,
						但原本 認知是 因為在 程式編譯到 B 時 , 物件還沒成立 ,
						所以不會有 this 這個東西. 
					經此試例得證,即便是 物件己成立後,
						在函數內依然是不能直接使用 this ,
						即便是使用 ArrowFunction 也一樣不行,
						也因此後續的案例,才都以 get 方式實作
					*/
				try {
					return this.thisValue;
				} catch (error) {
				return error;
				}
			},
			"一般 使用函數的用法2":()=>{
				try {
					return this.thisValue;
				} catch (error) {
				return error;
				}
			},
			
			get "ArrowFunction 的用法"() {
				return (() => {
					return this.thisValue;
				})();
			},
			
			/*
			以下皆為試驗過,無效的作法
			"_self 的用法":function(){
				return this.name;
				return (function(){
				})();
			}.bind(this),
			
			"_self 的用法":(()=>{
				return (function(){
					return this.name;
				})();
			}),
			*/

		};
		var _r = {};
		_.each(_Test2, (el, key) => {
		if (_.isFunction(el)) {
			_r[key] = el();
		} else {
			_r[key] = _Test2[key];
		}
		});
		_r;
		 ;   // Hello I am  fongki
    //   boo.Case1(); // (1 sec...) Hi!, I am undefined
	},
	"物件觀念A"(){
		/*
		這是某次面試碰到題目,當下是解錯了, 特此誌之 , 當下不解的是,
			為何 最後的結果會是 a,b 不同,明明 式2時, a,b 是同步等價的(傳址),
			為何會出現 式3 的結果
		但最後想通了,在 js 的架構中,物件是以址 的形式存在於變數,
			所以 物件內的變動,對 a,b 而言,都還是取到同一個 址(以式2為例),
		但是,以另一個 object 指給變數 a 時, 當下 a 所記錄的,就是新物件的址,
			也因此就跟 b 脫勾了(以式4為例)
		所以,才會出現 式3的結果
		*/
		//式1
		var a = {N:1};
		var b = a;
		a
		b
		//式2
		b.z = "1";
		a
		b
		//式3
		a.x = a = {N:2};
		a

		//式4
		var c = a;
		a = {N:3};
		a
		c
		b
	},
	"物件觀念B"(){
		var a = "abc"
		var fn = ()=>{
			var b="cde";
			console.log(`${a} - ${b}`);
		}
		fn();
		console.log(`${a} - ${b}`);
	},
	isEmptyObj() {
		//_.isEmpty({});
		//$.isEmptyObject(obj)
		//Object.keys(obj).length === 0
	},
	"get/set"() {
		var r = {
		A: "A",
		get B() {
			return this.A;
		},
		set B(val) {
			this.A = val;
		},
		/*
				Mozilla 限定
				https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E6%96%B0%E7%89%A9%E4%BB%B6%E7%9A%84%E5%BB%BA%E7%AB%8B/Getter_%E5%92%8C_Setter_%E7%9A%84%E5%AE%9A%E7%BE%A9
				'b' getter:function () {
					return this.a + 1;
				},
				*/
		};
		console.log(r.A);
		r.B;
		console.log(r.B);
		r.B = "test";
		console.log(r.B);
	},

	"*?"(){
		var x ={
			A:{
				A1:"x"
			}
		}
		console.log(x.A.A1);
		//console.log(x.A.['A2']||'X');
		var x = true ^ false;
		var a = [
			1 ^ 1
			,1 ^ 0
			,0 ^ 1
			,0 ^ 0
		]
		a
	}
};

_.each(fn, (e, k) => {
  if (k.substr(0, 1) == "*") {
    e();
  }
});
