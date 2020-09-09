/*
[Ref]
https://www.npmjs.com/package/v8n
*/
import * as _ from 'lodash';
import v8n from "v8n";
import path from "path";
(()=>{
    var fn = {
        'base'(){ 
            var r = v8n()
                .string()
                .minLength(5)
                .first("H")
                .last("o")
                .test("Hello");
                r 
            var r1 = 
                v8n()
                //判斷是不為 陣列
                .array()
                //是否都為 數字 
                .every.number()
                //不可有負數
                .not.some.negative()
                .test([1, 2, -3 ]); 
                r1
        },
        '將檢查程序封裝成可複用程序'(){
            function foo() {
                return value => value === "bar";
              }
            v8n.extend({ foo });
            var r = v8n()
                .string()
                .foo()
                .test("bar");
                r 
        },
        '檢查物件結構'(){
            const myData = { id: "fe03" };
 
            var _r = v8n()
                .schema({
                    id: v8n().string()
                })
                .test(myData);
            _r
        },
        '取得檢核程序錯在那一段'(){
            /*
            必須使用 check API 才會有 err 可 catch
            */
            try {
                var _r = v8n()
                    .string()
                    .first("b")
                    //.check("foo")
                    .test("foo")
                    ;
                _r
            } catch (err) {
                var _x = err.rule.name;
                _x
            }

        },
        '_執行完全部的驗証,一次回傳錯誤'(){
            var _r = v8n()
            //判斷是不為 陣列
            .array()
            //是否都為 數字 
            .every.number()
            //不可有負數
            .not.some.negative()
            .testAll([1, 2, -3 ,"A" ]);
            _r;
        }
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()